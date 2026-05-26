#!/usr/bin/env node
/**
 * Printful mockup generator for CAPSULE 01: DIRT ROAD HEIRLOOMS / VOL. 01.
 *
 * For each (piece × placement) in PIECES below:
 *   1. Upload artwork PNG to Printful /files via public URL on thecountriehoodlums.com
 *   2. Wait for file processing
 *   3. Call /mockup-generator/create-task for the locked variant ID + placement
 *   4. Poll task until completed
 *   5. Download mockup JPG to public/images/products/capsule-01/<slug>.jpg
 *
 * Re-running is safe: each upload creates a new file id but Printful is
 * idempotent about mockup generation. Output files are overwritten.
 *
 * Usage:
 *   node scripts/printful-mockup-capsule01.mjs               # all configured pieces
 *   node scripts/printful-mockup-capsule01.mjs --piece 1    # single piece
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC_BASE = "https://thecountriehoodlums.com";

async function loadEnv() {
  const text = await fs.readFile(path.join(ROOT, ".env.local"), "utf8");
  for (const line of text.split("\n")) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

// Only the 3 pieces we have artwork for, with their locked variant + placement.
// Variant picked: a typical mid-size (M or L) for the mockup hero image.
const PIECES = [
  {
    number: 1,
    slug: "piece-01-member-001",
    artworkFile: "piece-01-back.png",
    catalogProductId: 586,
    variantId: 17695, // CC 1717 Pepper, L
    placement: "back",
    label: "Member 001 Tee (CC 1717 Pepper, back charter crest)",
  },
  {
    number: 2,
    slug: "piece-02-patron-saint",
    artworkFile: "piece-02-front.png",
    catalogProductId: 713,
    variantId: 17580, // AS Colour 5082 Faded Bone, L
    placement: "front",
    label: "Patron Saint Tee (AS Colour 5082 Faded Bone, front santo)",
  },
  {
    number: 4,
    slug: "piece-04-order-flagship",
    artworkFile: "piece-04-back.png",
    catalogProductId: 542,
    variantId: 13665, // Independent PRM4500 Pigment Black, L
    // Blank is embroidery-only; the brief's screenprinted back shield can
    // only be fulfilled off-platform (LA Apparel / SOS From Texas). For
    // the marketing preview, use embroidery_large_center so the shield
    // shows on the front center as a placeholder until off-platform
    // mockups are commissioned.
    placement: "embroidery_large_center",
    label: "Order of the Hoodlum FLAGSHIP (PRM4500 Black, embroidery preview — off-platform back-print pending)",
  },
  {
    number: 3,
    slug: "piece-03-last-light",
    artworkFile: "piece-03-back.png",
    catalogProductId: 515,
    variantId: 12959, // Shaka SHHTDS Black/White tie-dye, L
    // Blank only supports embroidery placements on Printful. Brief's
    // discharge-print-on-tie-dye back is off-platform fulfillment;
    // use embroidery_large_center for the marketing preview.
    placement: "embroidery_large_center",
    label: "Last Light Tie-Dye Tee (Shaka SHHTDS, embroidery preview — off-platform discharge pending)",
  },
  {
    number: 6,
    slug: "piece-06-quiet-hoodlum",
    artworkFile: "piece-06-front.png",
    catalogProductId: 975,
    variantId: 34366, // Lane Seven LS16001GD Pigment Burro, L
    placement: "front",
    label: "Quiet Hoodlum Oversized Hoodie (LS16001GD Pigment Burro, chest icon)",
  },
  {
    number: 9,
    slug: "piece-09-homecoming-24",
    artworkFile: "piece-09-front.png",
    catalogProductId: 318,
    variantId: 9661, // Champion S149 Black, L
    placement: "front",
    label: "Homecoming '24 Crew (Champion S149 Black, tackle-twill 24 front)",
  },
  {
    number: 5,
    slug: "piece-05-hoodlums-only",
    artworkFile: "piece-05-hood.png",
    catalogProductId: 970,
    variantId: 24852, // CC 1567 Pepper, L
    placement: "front",
    label: "HOODLUMS ONLY Hoodie (CC 1567 Pepper, chest print preview — hood-top placement not in Printful)",
  },
  {
    number: 7,
    slug: "piece-07-chapter-01",
    artworkFile: "piece-07-front.png",
    catalogProductId: 839,
    variantId: 21982, // CC 1566 Pepper, L
    placement: "front",
    label: "Chapter 01 Pocket Crest Crewneck (CC 1566 Pepper, front crest)",
  },
];

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

async function pfJson(p, init, retries = 3) {
  for (let attempt = 0; ; attempt++) {
    const res = await pfFetch(p, init);
    const body = await res.json();
    if (res.status === 429 && attempt < retries) {
      const msg = body.error?.message ?? "";
      const m = msg.match(/after (\d+) seconds/);
      const waitSec = m ? Number(m[1]) + 2 : 30;
      console.log(`    rate-limited — waiting ${waitSec}s (attempt ${attempt + 1}/${retries})`);
      await new Promise((r) => setTimeout(r, waitSec * 1000));
      continue;
    }
    if (!res.ok || (body.code && body.code >= 400)) {
      throw new Error(
        `Printful ${init?.method ?? "GET"} ${p} -> ${res.status}: ${
          body.error?.message ?? JSON.stringify(body).slice(0, 300)
        }`
      );
    }
    return body;
  }
}

async function uploadFile(artworkUrl) {
  console.log(`    uploading: ${artworkUrl}`);
  const body = await pfJson("/files", {
    method: "POST",
    body: JSON.stringify({ type: "default", url: artworkUrl }),
  });
  const file = body.result;
  // Poll until processed
  for (let i = 0; i < 30; i++) {
    if (file.status === "ok") return file;
    if (file.status === "failed") throw new Error("File upload failed");
    await new Promise((r) => setTimeout(r, 2000));
    const polled = await pfJson(`/files/${file.id}`);
    Object.assign(file, polled.result);
  }
  throw new Error("File upload timed out");
}

async function getPrintArea(productId, variantId, placement) {
  const spec = await pfJson(`/mockup-generator/printfiles/${productId}`);
  const r = spec.result;
  const vp = r.variant_printfiles.find((v) => v.variant_id === variantId);
  const pfId = vp?.placements?.[placement];
  if (!pfId) {
    const available = Object.keys(vp?.placements ?? {});
    throw new Error(
      `Product ${productId} variant ${variantId} has no '${placement}' placement. Available: ${available.join(", ") || "(none)"}`
    );
  }
  const pf = r.printfiles.find((p) => p.printfile_id === pfId);
  if (!pf) throw new Error(`Printfile ${pfId} not found`);
  return { width: pf.width, height: pf.height };
}

async function generateMockup(catalogProductId, variantId, placement, imageUrl) {
  const area = await getPrintArea(catalogProductId, variantId, placement);
  console.log(`    print area: ${area.width} x ${area.height} @ ${placement}`);
  const task = await pfJson(`/mockup-generator/create-task/${catalogProductId}`, {
    method: "POST",
    body: JSON.stringify({
      variant_ids: [variantId],
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
  });
  const taskKey = task.result.task_key;
  console.log(`    task_key: ${taskKey} — polling...`);
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 2500));
    const polled = await pfJson(`/mockup-generator/task?task_key=${taskKey}`);
    const status = polled.result.status;
    if (status === "completed") return polled.result.mockups;
    if (status === "failed") {
      throw new Error(
        `Mockup task failed: ${JSON.stringify(polled.result).slice(0, 300)}`
      );
    }
    if (i % 4 === 0) console.log(`      ...${status} (${i * 2.5 + 2.5}s)`);
  }
  throw new Error("Mockup task timed out after 150s");
}

async function downloadMockup(url, destAbs) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(destAbs), { recursive: true });
  await fs.writeFile(destAbs, buf);
}

async function processPiece(p) {
  console.log(`\n${"=".repeat(60)}\n  Piece ${p.number}: ${p.label}\n${"=".repeat(60)}`);

  const artworkUrl = `${PUBLIC_BASE}/artwork/capsule-01/${p.artworkFile}`;
  console.log(`  1/4 uploading artwork`);
  const file = await uploadFile(artworkUrl);
  console.log(`      file id ${file.id}`);

  console.log(`  2/4 generating mockup`);
  const mockups = await generateMockup(
    p.catalogProductId,
    p.variantId,
    p.placement,
    artworkUrl
  );

  const mockup = mockups[0];
  const heroUrl = mockup?.mockup_url;
  if (!heroUrl) throw new Error("No mockup_url returned");

  console.log(`  3/4 downloading mockup`);
  const destRel = `images/products/capsule-01/${p.slug}.jpg`;
  await downloadMockup(heroUrl, path.join(ROOT, "public", destRel));
  console.log(`      saved /public/${destRel}`);

  console.log(`  4/4 done`);
  return { slug: p.slug, number: p.number, mockupRelPath: `/${destRel}` };
}

async function main() {
  const args = process.argv.slice(2);
  const onlyPiece = args.includes("--piece")
    ? Number(args[args.indexOf("--piece") + 1])
    : null;

  await loadEnv();
  if (!process.env.PRINTFUL_API_KEY) throw new Error("PRINTFUL_API_KEY not set");

  const targets = onlyPiece ? PIECES.filter((p) => p.number === onlyPiece) : PIECES;
  if (targets.length === 0) {
    throw new Error(`No pieces match filter (--piece ${onlyPiece})`);
  }

  console.log(
    `Processing ${targets.length} piece(s): ${targets.map((p) => p.number).join(", ")}`
  );

  const results = [];
  for (const [i, p] of targets.entries()) {
    if (i > 0) {
      await new Promise((r) => setTimeout(r, 5000));
    }
    try {
      results.push(await processPiece(p));
    } catch (err) {
      console.error(`  ERROR: ${err.message}`);
      results.push({ slug: p.slug, number: p.number, error: err.message });
    }
  }

  console.log(`\n${"=".repeat(60)}\nSummary\n${"=".repeat(60)}`);
  for (const r of results) {
    if (r.error) console.log(`  FAIL  ${r.slug}  ${r.error}`);
    else console.log(`  OK    ${r.slug}  -> ${r.mockupRelPath}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
