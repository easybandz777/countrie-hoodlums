#!/usr/bin/env node
/**
 * Printful mockup-only pipeline.
 *
 *   node scripts/printful-mockup-only.mjs
 *
 * For each slug below, calls Printful's mockup-generator with the public
 * artwork URL at https://thecountriehoodlums.com/artwork/{slug}.png,
 * waits for the task to complete, downloads the front mockup JPG to
 * public/images/products/printful/{slug}.jpg, and rewrites the matching
 * product's `image` field in src/lib/mock-data.ts to point at it.
 *
 * Skips slugs whose mockup file already exists locally (idempotent).
 *
 * No sync product creation here — that's still in printful-setup.mjs.
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PF_BASE = "https://api.printful.com";
const ARTWORK_BASE = "https://thecountriehoodlums.com/artwork";

// Slug → (catalog product id, color name). All Comfort Colors 1717 Black.
const JOBS = [
  { slug: "tee-anonymous-hoodlum", productId: 586, color: "Black" },
  { slug: "tee-golf-crossed-clubs", productId: 586, color: "Black" },
  { slug: "tee-golf-skull-caddy", productId: 586, color: "Black" },
  { slug: "tee-golf-bad-lies", productId: 586, color: "Black" },
  { slug: "tee-golf-18th-hole", productId: 586, color: "Black" },
  { slug: "tee-golf-emblem", productId: 586, color: "Black" },
  { slug: "tee-golf-scorecard", productId: 586, color: "Black" },
  { slug: "tee-golf-cart-bandits", productId: 586, color: "Black" },
];

async function loadEnv() {
  const text = await fs.readFile(path.join(ROOT, ".env.local"), "utf8");
  for (const line of text.split("\n")) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

async function pf(p, init = {}) {
  const res = await fetch(`${PF_BASE}${p}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      "X-PF-Store-Id": process.env.PRINTFUL_STORE_ID,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  const body = await res.json();
  if (!res.ok || (body.code && body.code >= 400)) {
    throw new Error(
      `Printful ${init.method ?? "GET"} ${p} -> ${res.status}: ${
        body.error?.message ?? JSON.stringify(body).slice(0, 200)
      }`
    );
  }
  return body;
}

async function pickBlackVariantIds(productId, colorName) {
  const out = [];
  let offset = 0;
  for (;;) {
    const b = await pf(
      `/v2/catalog-products/${productId}/catalog-variants?limit=100&offset=${offset}`
    );
    out.push(...b.data);
    if (out.length >= b.paging.total) break;
    offset += 100;
  }
  return out.filter((v) => v.color === colorName).map((v) => v.id);
}

async function getPrintArea(productId, variantId, placement) {
  const spec = await pf(`/mockup-generator/printfiles/${productId}`);
  const vp = spec.result.variant_printfiles.find(
    (v) => v.variant_id === variantId
  );
  const pfId = vp?.placements?.[placement];
  if (!pfId) throw new Error(`No '${placement}' placement on variant ${variantId}`);
  const printfile = spec.result.printfiles.find((p) => p.printfile_id === pfId);
  if (!printfile) throw new Error(`Printfile ${pfId} not found`);
  return { width: printfile.width, height: printfile.height };
}

async function generateMockup(productId, variantIds, imageUrl) {
  const area = await getPrintArea(productId, variantIds[0], "front");
  const task = await pf(`/mockup-generator/create-task/${productId}`, {
    method: "POST",
    body: JSON.stringify({
      variant_ids: variantIds,
      format: "jpg",
      files: [
        {
          placement: "front",
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
  });
  const taskKey = task.result.task_key;
  for (let i = 0; i < 90; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    const polled = await pf(`/mockup-generator/task?task_key=${taskKey}`);
    if (polled.result.status === "completed") return polled.result.mockups;
    if (polled.result.status === "failed") {
      throw new Error(
        `Mockup task failed: ${JSON.stringify(polled.result).slice(0, 200)}`
      );
    }
  }
  throw new Error("Mockup task timed out");
}

async function download(url, destAbs) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(destAbs), { recursive: true });
  await fs.writeFile(destAbs, buf);
}

async function patchImage(slug, newRelPath) {
  const file = path.join(ROOT, "src/lib/mock-data.ts");
  let src = await fs.readFile(file, "utf8");
  const re = new RegExp(
    `(slug:\\s*"${slug}"[\\s\\S]*?image:\\s*")[^"]+(",)`
  );
  if (re.test(src)) {
    src = src.replace(re, `$1${newRelPath}$2`);
    await fs.writeFile(file, src);
    return true;
  }
  return false;
}

async function processSlug(job) {
  const destAbs = path.join(
    ROOT,
    "public/images/products/printful",
    `${job.slug}.jpg`
  );
  try {
    await fs.access(destAbs);
    console.log(`  SKIP existing: ${job.slug}`);
    return { slug: job.slug, status: "skipped" };
  } catch {}

  const imageUrl = `${ARTWORK_BASE}/${job.slug}.png`;
  console.log(`\n=== ${job.slug} ===`);
  console.log(`  artwork: ${imageUrl}`);

  console.log(`  1/3 picking ${job.color} variants on product ${job.productId}...`);
  const variantIds = await pickBlackVariantIds(job.productId, job.color);
  console.log(`      ${variantIds.length} variants`);

  console.log(`  2/3 generating mockup...`);
  const mockups = await generateMockup(job.productId, variantIds, imageUrl);
  const front = mockups[0];
  const mockupUrl = front?.mockup_url;
  if (!mockupUrl) throw new Error("No mockup URL in result");
  await download(mockupUrl, destAbs);
  console.log(`      saved ${path.relative(ROOT, destAbs)}`);

  console.log(`  3/3 patching mock-data...`);
  const ok = await patchImage(job.slug, `/images/products/printful/${job.slug}.jpg`);
  console.log(`      ${ok ? "patched" : "NOT FOUND in mock-data"}`);

  return { slug: job.slug, status: "ok" };
}

async function main() {
  await loadEnv();
  if (!process.env.PRINTFUL_API_KEY) throw new Error("PRINTFUL_API_KEY missing");
  console.log(`Processing ${JOBS.length} slugs through Printful mockup generator`);
  const results = [];
  for (let i = 0; i < JOBS.length; i++) {
    const j = JOBS[i];
    try {
      results.push(await processSlug(j));
    } catch (e) {
      // On 429 rate limit, sleep the requested seconds and retry once.
      const m = e.message.match(/try again after (\d+) seconds/);
      if (m) {
        const wait = Math.min(parseInt(m[1], 10) + 5, 90);
        console.log(`  rate-limited, sleeping ${wait}s then retrying...`);
        await new Promise((r) => setTimeout(r, wait * 1000));
        try {
          results.push(await processSlug(j));
          continue;
        } catch (e2) {
          console.error(`  ERROR (retry): ${e2.message}`);
          results.push({ slug: j.slug, status: "error", error: e2.message });
          continue;
        }
      }
      console.error(`  ERROR: ${e.message}`);
      results.push({ slug: j.slug, status: "error", error: e.message });
    }
    // Pace between requests to stay under the per-minute mockup limit.
    if (i < JOBS.length - 1) {
      console.log(`  waiting 35s before next slug...`);
      await new Promise((r) => setTimeout(r, 35000));
    }
  }
  console.log(`\n${"=".repeat(50)}\nSummary\n${"=".repeat(50)}`);
  for (const r of results) {
    console.log(`  ${r.status.padEnd(8)} ${r.slug}${r.error ? "  " + r.error : ""}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
