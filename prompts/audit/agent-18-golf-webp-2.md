# Agent 18 — Golf Line .webp Audit (Batch 2)

**Date:** 2026-05-26
**Scope:** 4 .webp files used as `cartoonImage` fields in `src/lib/mock-data.ts` — 3 Golf Line tee artworks + 1 leather-patch hat photo (which doubles as both `image` and `cartoonImage` because no cartoon variant exists).
**Brand palette reference:** Bonfire Black `#0A0A0A`, Antique Gold `#C9A227`, Creek Cream `#F5F0E1`. NO pure white anywhere.

---

## 1. `public/images/products/tee-golf-emblem.webp` — Country Club Emblem Tee (`prod_032`, slug `tee-golf-emblem`)

| Field | Value |
|---|---|
| `showsFullGarment` | artwork-only |
| `whiteRectangleDefect` | none |
| `paletteCompliance` | clean |
| `purpose` | shows-print-only |
| `consistencyWithJpgCounterpart` | match |
| `verdict` | ship |
| `verdictReason` | Tight, transparent-background oval emblem — gold ring, cream center, skull-cowboy with black hat, crossed driver + putter, EST. 2024, HOODLUMS arched top, COUNTRY CLUB arched bottom. Gold reads true Antique Gold and matches `printful/tee-golf-emblem.jpg` exactly. No stray pure-white pixels, no rectangle frame, no off-palette colors. Clean cartoon/companion asset for the printful flat-lay. |

**Notes:**
- Background is transparent (not a white rectangle) — passes the no-pure-white rule.
- Perfect 1:1 visual match with the jpg's printed emblem; this is essentially the source artwork.

---

## 2. `public/images/products/tee-golf-scorecard.webp` — Vintage Scorecard Tee (`prod_034`, slug `tee-golf-scorecard`)

| Field | Value |
|---|---|
| `showsFullGarment` | artwork-only |
| `whiteRectangleDefect` | none |
| `paletteCompliance` | has-wrong-gold |
| `purpose` | shows-print-only |
| `consistencyWithJpgCounterpart` | match |
| `verdict` | re-render |
| `verdictReason` | The scorecard panel (cream parchment, rounded rectangle, 18-hole grid, HOODLUMS COUNTRY CLUB header, BAD DECISIONS · GOOD TIMES footer) renders all typography and grid lines in a dull bronze/coffee brown rather than Antique Gold `#C9A227`. It is consistent with its jpg counterpart (same off-palette gold) so the failure is in the source artwork, not the mockup pipeline. Side-by-side with `tee-golf-emblem.webp` the brown shift is obvious. Re-render the type and grid strokes in true antique gold; once fixed, regenerate the printful jpg from the corrected artwork. |

**Notes:**
- Grid still shows the "0" hanging off the end of the top row from the jpg audit — confirmed art-side issue, not a rendering artifact.
- Background is transparent; no white rectangle defect.
- Cream fill of the parchment is correct (matches Creek Cream).

---

## 3. `public/images/products/tee-golf-cart-bandits.webp` — Cart Path Bandits Tee (`prod_035`, slug `tee-golf-cart-bandits`)

| Field | Value |
|---|---|
| `showsFullGarment` | artwork-only |
| `whiteRectangleDefect` | none |
| `paletteCompliance` | has-wrong-gold (green grass strip is off-palette) |
| `purpose` | shows-print-only |
| `consistencyWithJpgCounterpart` | match |
| `verdict` | re-render |
| `verdictReason` | Composition is strong — HOODLUMS COUNTRY CLUB top arc in antique gold, skull-cowboy mascot driving a golf cart, BAD DECISIONS · GOOD TIMES bottom arc. Gold tones read correctly here. BUT the artwork still includes the bright green grass strip beneath the cart that breaks the strict black/gold/cream palette — same defect as the jpg. The .webp matches the jpg, so the consistency check passes, but the underlying artwork is off-brief. Re-render with the green strip removed or converted to a tonal cream/gold value. |

**Notes:**
- Transparent background — no rectangle defect.
- Skull-cowboy mascot on-model with the emblem version (cowboy hat, exposed jaw).
- Once the green is killed, this asset and the emblem.webp will be perfectly stylistically aligned.

---

## 4. `public/images/products/hat-leather-sunset-highway.webp` — Sunset Highway Patch Hat (`prod_023`, slug `hat-leather-sunset-highway`)

| Field | Value |
|---|---|
| `showsFullGarment` | full |
| `whiteRectangleDefect` | none |
| `paletteCompliance` | clean |
| `purpose` | clearly-shows-product |
| `consistencyWithJpgCounterpart` | N/A (no jpg pair for the hat) |
| `verdict` | ship |
| `verdictReason` | Real-photo product shot of a Richardson 112 all-black trucker — six-panel black crown, black mesh back, flat brim — with a veg-tanned leather laser-engraved patch riveted at four corners. Patch reads HOODLUMS COUNTRY CLUB arched on top, sunset disc behind a silhouetted lifted truck on a dirt road, LIVE EACH DAY along the bottom. Lit by warm golden-hour sunset, hat sits on weathered wood. No pure white anywhere — the background is a soft sunset gradient (warm orange/amber bokeh). Palette is on-brand (warm gold sunset + black hat + tan leather). Hat is recognizable from thumbnail, every detail of the patch is legible. This is exactly what the customer is buying. Ship as the unified image for both `image` and `cartoonImage` slots. |

**Notes:**
- Same file is referenced for both `image` and `cartoonImage` in `mock-data.ts` (line 473–474) — by design, since the hat line has no cartoon variant.
- The leather-tan + dirt-road sepia tones diverge from the strict cream/gold/black tee palette, but hats are explicitly a separate non-Printful product family with their own visual treatment; the description in `mock-data.ts` (`"laser-engraved leather patch"`) is faithfully rendered.
- Composition is consistent with the other `hat-leather-*` shots in the line — same Richardson 112 silhouette, same wood-surface placement, same warm rim-lighting.

---

## Summary

| File | Verdict | One-line reason |
|---|---|---|
| `tee-golf-emblem.webp` | **ship** | Clean transparent-bg oval emblem, palette-compliant, 1:1 with jpg counterpart. |
| `tee-golf-scorecard.webp` | **re-render** | Bronze/brown typography instead of antique gold — source-art color drift (mirrors jpg defect). |
| `tee-golf-cart-bandits.webp` | **re-render** | Off-palette green grass strip persists from the source artwork (mirrors jpg defect). |
| `hat-leather-sunset-highway.webp` | **ship** | Real-photo styled product shot — leather patch + Richardson 112 + sunset; on-brand and legible at thumbnail scale. |

**Headline issues for this batch:**
1. **The .webp artworks faithfully mirror the jpg flat-lays.** That is good for consistency — but it means fixing color defects has to happen at the source-art level (Illustrator/raster source), not just at the Printful mockup step. Re-rendering only the jpg without updating the .webp would create cartoonImage/image drift on the live page.
2. **Scorecard gold and cart-bandits green are the two known art-side bugs.** Lock the antique-gold spec at `#C9A227` and remove the green grass strip before re-rendering either.
3. **The sunset-highway hat is the clean exception** — it's a photo, not artwork, and it doubles correctly as both image and cartoonImage. No action needed.
4. **No white-rectangle defects in this batch.** All three tee artworks use transparent backgrounds; the hat uses a sunset bokeh. The persistent "white box" problem from earlier Capsule 01 audits is absent here.
