#!/usr/bin/env node
/**
 * Printful end-to-end setup.
 *
 *   node scripts/printful-setup.mjs                # process every product
 *   node scripts/printful-setup.mjs --slug hoodie-heritage  # single product
 *   node scripts/printful-setup.mjs --dry-run      # show what would happen
 *
 * For each product it:
 *   1. Verifies ./artwork/<slug>.png exists
 *   2. Uploads the PNG to Printful /files
 *   3. Looks up catalog variants matching the chosen color, keeps the sizes
 *      already declared on the product
 *   4. Generates real photo mockups via the mockup generator, downloads
 *      them into public/images/products/printful/
 *   5. Creates a sync product in our Printful store with one sync variant
 *      per size
 *   6. Patches src/lib/mock-data.ts:
 *      - image points at the freshly downloaded front mockup
 *      - printfulVariantIds is filled in per size
 *
 * Re-running on a product whose sync product already exists is safe: the
 * script detects the duplicate, skips creation, and re-syncs IDs from the
 * existing sync product.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// Load env from .env.local (no dotenv dependency)
async function loadEnv() {
  const text = await fs.readFile(path.join(ROOT, ".env.local"), "utf8");
  for (const line of text.split("\n")) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const PF_BASE = "https://api.printful.com";

function pfFetch(p, init = {}) {
  return fetch(`${PF_BASE}${p}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      "X-PF-Store-Id": process.env.PRINTFUL_STORE_ID,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}

async function pfJson(p, init) {
  const res = await pfFetch(p, init);
  const body = await res.json();
  if (!res.ok || (body.code && body.code >= 400)) {
    throw new Error(
      `Printful ${init?.method ?? "GET"} ${p} -> ${res.status}: ${
        body.error?.message ?? JSON.stringify(body)
      }`
    );
  }
  return body;
}

async function pfPaginated(p) {
  const out = [];
  let offset = 0;
  for (;;) {
    const sep = p.includes("?") ? "&" : "?";
    const body = await pfJson(`${p}${sep}limit=100&offset=${offset}`);
    const items = body.data ?? body.result ?? [];
    out.push(...items);
    const total = body.paging?.total;
    if (total == null || out.length >= total) return out;
    offset += 100;
  }
}

// Extract Printful-relevant product config from mock-data.ts.
async function loadProductManifest() {
  const src = await fs.readFile(
    path.join(ROOT, "src/lib/mock-data.ts"),
    "utf8"
  );
  const blocks = src.split(/\{\s*\n\s*id:\s*"prod_/).slice(1);
  const products = [];
  for (const block of blocks) {
    const idMatch = block.match(/^([0-9]+)"/);
    const get = (key) => {
      const dq = block.match(new RegExp(`${key}:\\s*"([^"]+)"`));
      if (dq) return dq[1];
      const sq = block.match(new RegExp(`${key}:\\s*'([^']+)'`));
      return sq?.[1];
    };
    const getNum = (key) =>
      Number(block.match(new RegExp(`${key}:\\s*(\\d+)`))?.[1]);
    const sizesMatch = block.match(/sizes:\s*\[([^\]]*)\]/);
    const sizes = sizesMatch
      ? sizesMatch[1].match(/"([^"]+)"/g)?.map((s) => s.replace(/"/g, "")) ?? []
      : [];
    const productId = block.match(/printfulProductId:\s*(\d+)/)?.[1];
    if (!productId) continue;
    products.push({
      id: `prod_${idMatch[1]}`,
      name: get("name"),
      slug: get("slug"),
      price: getNum("price"),
      sizes,
      productId: Number(productId),
      color: block.match(/printfulColor:\s*"([^"]+)"/)?.[1],
    });
  }
  return products;
}

async function uploadFile(slug, absPath) {
  const base = process.env.PRINTFUL_ARTWORK_URL_BASE;
  if (!base) {
    throw new Error(
      "PRINTFUL_ARTWORK_URL_BASE not set. Printful /files requires a publicly-fetchable URL. " +
        "Start a tunnel (e.g. cloudflared) pointing at a local server serving ./artwork, " +
        "then export PRINTFUL_ARTWORK_URL_BASE=https://your-tunnel.example."
    );
  }
  // Touch the file so we fail fast if it's missing
  await fs.access(absPath);
  const body = await pfJson("/files", {
    method: "POST",
    body: JSON.stringify({
      type: "default",
      url: `${base.replace(/\/$/, "")}/${slug}.png`,
    }),
  });
  const file = body.result;
  // Wait for file processing
  for (let i = 0; i < 30; i++) {
    if (file.status === "ok") break;
    await new Promise((r) => setTimeout(r, 2000));
    const polled = await pfJson(`/files/${file.id}`);
    Object.assign(file, polled.result);
    if (file.status === "failed") {
      throw new Error(`File upload failed for ${slug}`);
    }
  }
  return file;
}

async function pickVariants(productId, colorName, wantedSizes) {
  const all = await pfPaginated(
    `/v2/catalog-products/${productId}/catalog-variants`
  );
  const matches = all.filter(
    (v) => v.color === colorName && wantedSizes.includes(v.size)
  );
  if (matches.length === 0) {
    throw new Error(
      `No variants found for product ${productId} color "${colorName}"`
    );
  }
  return matches;
}

async function getPrintArea(productId, variantId, placement) {
  const spec = await pfJson(`/mockup-generator/printfiles/${productId}`);
  const r = spec.result;
  const vp = r.variant_printfiles.find((v) => v.variant_id === variantId);
  const pfId = vp?.placements?.[placement];
  if (!pfId) {
    throw new Error(
      `Product ${productId} has no '${placement}' placement for variant ${variantId}`
    );
  }
  const pf = r.printfiles.find((p) => p.printfile_id === pfId);
  if (!pf) throw new Error(`Printfile ${pfId} not found in spec`);
  return { width: pf.width, height: pf.height };
}

async function generateMockups(productId, imageUrl, variantIds, placement) {
  const area = await getPrintArea(productId, variantIds[0], placement);
  const task = await pfJson(
    `/mockup-generator/create-task/${productId}`,
    {
      method: "POST",
      body: JSON.stringify({
        variant_ids: variantIds,
        format: "jpg",
        files: [
          {
            placement,
            image_url: imageUrl,
            position: {
              area_width: area.width,
              area_height: area.height,
              width: area.width,
              height: area.height,
              top: 0,
              left: 0,
            },
          },
        ],
      }),
    }
  );
  const taskKey = task.result.task_key;
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    const polled = await pfJson(
      `/mockup-generator/task?task_key=${taskKey}`
    );
    if (polled.result.status === "completed") return polled.result.mockups;
    if (polled.result.status === "failed") {
      throw new Error(`Mockup task failed for product ${productId}`);
    }
  }
  throw new Error(`Mockup task timed out after 120s`);
}

async function downloadMockup(url, destAbs) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(destAbs), { recursive: true });
  await fs.writeFile(destAbs, buf);
}

async function findExistingSyncProduct(externalId) {
  const list = await pfJson(`/store/products?status=all`);
  return list.result.find((p) => p.external_id === externalId);
}

async function createOrFetchSyncProduct({
  slug,
  name,
  price,
  catalogProductId,
  variants,
  fileId,
  mockupUrl,
  placement,
}) {
  const externalId = `ch-${slug}`;
  const existing = await findExistingSyncProduct(externalId);
  if (existing) {
    const detail = await pfJson(`/store/products/${existing.id}`);
    return detail.result;
  }
  const created = await pfJson("/store/products", {
    method: "POST",
    body: JSON.stringify({
      sync_product: {
        external_id: externalId,
        name,
        thumbnail: mockupUrl,
      },
      sync_variants: variants.map((v) => ({
        external_id: `${externalId}-${v.size}`,
        retail_price: price.toFixed(2),
        variant_id: v.id,
        files: [{ id: fileId, placement }],
      })),
    }),
  });
  // POST returns a flat summary; fetch full nested structure (sync_product + sync_variants)
  const newId = created.result?.sync_product?.id ?? created.result?.id;
  if (!newId) {
    throw new Error(
      `Unexpected POST /store/products response: ${JSON.stringify(created).slice(0, 500)}`
    );
  }
  const detail = await pfJson(`/store/products/${newId}`);
  return detail.result;
}

async function patchMockData({ slug, imageRelPath, variantIdsBySize }) {
  const file = path.join(ROOT, "src/lib/mock-data.ts");
  let src = await fs.readFile(file, "utf8");
  const blockRe = new RegExp(
    `(slug:\\s*"${slug}"[\\s\\S]*?)(image:\\s*")[^"]+(",)`
  );
  src = src.replace(blockRe, `$1$2${imageRelPath}$3`);
  // Replace or insert printfulVariantIds in the matching block
  const productBlockRe = new RegExp(
    `(slug:\\s*"${slug}"[\\s\\S]*?printfulColor:\\s*"[^"]+",)([\\s\\S]*?)(\\n\\s*\\},)`
  );
  const m = src.match(productBlockRe);
  if (!m) {
    console.warn(`  (could not locate block for ${slug} to patch variant IDs)`);
  } else {
    const ids = Object.entries(variantIdsBySize)
      .map(([s, id]) => `      ${JSON.stringify(s)}: ${id}`)
      .join(",\n");
    const newField = `\n    printfulVariantIds: {\n${ids},\n    },`;
    const cleaned = m[2].replace(/\n\s*printfulVariantIds:[\s\S]*?\},/, "");
    src = src.replace(productBlockRe, `${m[1]}${cleaned}${newField}${m[3]}`);
  }
  await fs.writeFile(file, src);
}

async function processProduct(p, opts) {
  console.log(`\n${"=".repeat(60)}\n  ${p.name}  (${p.slug})\n${"=".repeat(60)}`);

  const artworkPath = path.join(ROOT, "artwork", `${p.slug}.png`);
  try {
    await fs.access(artworkPath);
  } catch {
    console.log(`  SKIP: no artwork at artwork/${p.slug}.png`);
    return { slug: p.slug, status: "no-artwork" };
  }

  if (opts.dryRun) {
    console.log(`  DRY: would upload, mockup, sync product for color ${p.color}`);
    return { slug: p.slug, status: "dry-run" };
  }

  console.log(`  1/5 uploading artwork...`);
  const file = await uploadFile(p.slug, artworkPath);
  console.log(`      file id ${file.id}`);

  console.log(`  2/5 picking ${p.color} variants in sizes ${p.sizes.join(",")}...`);
  const variants = await pickVariants(p.productId, p.color, p.sizes);
  console.log(`      matched ${variants.length} variants`);

  const placement = opts.placement ?? "front";
  console.log(`  3/5 generating mockups (placement: ${placement})...`);
  const artworkUrl = `${process.env.PRINTFUL_ARTWORK_URL_BASE.replace(/\/$/, "")}/${p.slug}.png`;
  const mockups = await generateMockups(
    p.productId,
    artworkUrl,
    variants.map((v) => v.id),
    placement
  );
  const front = mockups[0];
  const mockupUrl = front?.mockup_url;
  if (!mockupUrl) throw new Error("Mockup generator returned no images");
  const destRel = `images/products/printful/${p.slug}.jpg`;
  await downloadMockup(mockupUrl, path.join(ROOT, "public", destRel));
  console.log(`      saved /public/${destRel}`);

  console.log(`  4/5 creating sync product...`);
  const sync = await createOrFetchSyncProduct({
    slug: p.slug,
    name: p.name,
    price: p.price,
    catalogProductId: p.productId,
    variants,
    fileId: file.id,
    mockupUrl,
    placement,
  });
  const variantIdsBySize = {};
  for (const sv of sync.sync_variants ?? []) {
    const size = sv.size ?? sv.name?.match(/\(([^)]+)\)/)?.[1];
    if (size) variantIdsBySize[size] = sv.id;
  }
  console.log(`      sync product id ${sync.sync_product.id}, ${Object.keys(variantIdsBySize).length} sizes`);

  console.log(`  5/5 patching mock-data.ts...`);
  await patchMockData({
    slug: p.slug,
    imageRelPath: `/${destRel}`,
    variantIdsBySize,
  });
  console.log(`      done`);

  return {
    slug: p.slug,
    status: "ok",
    syncProductId: sync.sync_product.id,
    variantIdsBySize,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const slugArg = args.includes("--slug")
    ? args[args.indexOf("--slug") + 1]
    : null;
  const placementArg = args.includes("--placement")
    ? args[args.indexOf("--placement") + 1]
    : "front";
  const dryRun = args.includes("--dry-run");

  await loadEnv();
  if (!process.env.PRINTFUL_API_KEY) {
    throw new Error("PRINTFUL_API_KEY not set");
  }

  const all = await loadProductManifest();
  const targets = slugArg ? all.filter((p) => p.slug === slugArg) : all;
  if (targets.length === 0) {
    throw new Error(`No products to process (slug filter: ${slugArg ?? "none"})`);
  }

  console.log(`Processing ${targets.length} product(s)${dryRun ? " [dry run]" : ""}`);
  const results = [];
  for (const p of targets) {
    try {
      results.push(await processProduct(p, { dryRun, placement: placementArg }));
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
      results.push({ slug: p.slug, status: "error", error: err.message });
    }
  }

  console.log(`\n${"=".repeat(60)}\nSummary\n${"=".repeat(60)}`);
  for (const r of results) {
    console.log(`  ${r.status.padEnd(11)} ${r.slug}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
