# Agent 16 — Miscellaneous Image Audit

Audits the orphan / suspect non-Printful images currently wired as primary or cartoon images in `src/lib/mock-data.ts`. These are not part of the Capsule 01 sequence — they are the leftover mismatched assets that mock-data still references.

---

## 1. `public/images/products/hat-dad-hat-cartoon.webp`

**Wired to:** `prod_014` Hoodlum Dad Hat — used as `cartoonImage` (primary `image` is `/images/products/hat-dad-hat.webp`).
**Brief from mock-data:** "Richardson 320 olive drab unstructured. Minimal gold skull-cowboy embroidery, brass-buckle strap back."

| Field | Value |
|---|---|
| `showsFullGarment` | artwork-only |
| `whiteRectangleDefect` | none (cream/tan illustration background, not a print-on-tee crop) |
| `printScale` | N/A |
| `printPlacement` | N/A |
| `garmentColorMatchesBrief` | off — no hat garment visible at all; brief calls for olive drab dad hat with *minimal* gold embroidery, this is a full-color illustration with green hat, olive cowboy hat, drawn skull |
| `paletteCompliance` | clean — uses olive-green + cream + a warm khaki-gold (no pure-white, no neon yellow) |
| `purpose` | shows-vibe-not-product — it's an editorial illustration of a skull wearing a cowboy hat, not the Richardson 320 dad hat the product is selling |
| `verdict` | re-render |
| `verdictReason` | Brief promises an olive Richardson 320 dad hat with subtle gold embroidered skull; this image shows a cartoon skull-in-cowboy-hat on cream background with no actual cap garment, and includes a stray "Driftek"-style scribbled signature bottom-right. Wrong asset class. |

---

## 2. `public/images/products/hoodie-camo-crossover.webp`

**Wired to:** `prod_003` Liquid Gold Camo Hoodie — used as `cartoonImage` (primary `image` is `/images/products/printful/hoodie-liquid-gold.jpg`).
**Brief from mock-data context:** Realtree-style camo pullover hoodie, "COUNTRIE HOODLUMS" in gold drip lettering across the chest, Army colorway.

| Field | Value |
|---|---|
| `showsFullGarment` | full |
| `whiteRectangleDefect` | none (black studio background, not a cropped print) |
| `printScale` | correct — chest text is sized appropriately and reads at thumbnail size |
| `printPlacement` | correct — centered on chest |
| `garmentColorMatchesBrief` | match — Realtree-style brown/green woodland camo on Army-coded pullover hoodie |
| `paletteCompliance` | clean — drip text is a warm metallic gold (not cyber/electric yellow), camo earth tones, no pure-white anywhere |
| `purpose` | clearly-shows-product |
| `verdict` | ship |
| `verdictReason` | Strong full-garment moody studio shot; camo reads true, gold drip text scales legibly, mood matches the Liquid Gold story. Best of the four in this batch. |

---

## 3. `public/images/products/tee-anonymous-hoodlum.webp`

**Wired to:** `prod_027` Anonymous Hoodlum Tee — used as `cartoonImage` (primary `image` is `/images/products/printful/tee-anonymous-hoodlum.jpg`).
**Brief from mock-data:** "Garment-dyed heavyweight black tee (Comfort Colors 1717). Hooded figure in a Guy Fawkes mask in front of a wall of matrix-green code monitors — with a tiny gold HCC monogram tucked in the corner."

| Field | Value |
|---|---|
| `showsFullGarment` | artwork-only |
| `whiteRectangleDefect` | severe — solid white background, the entire image is the bare print graphic with no garment, no shadow, no mockup framing |
| `printScale` | N/A (no garment to compare against) |
| `printPlacement` | N/A |
| `garmentColorMatchesBrief` | off — there is no black Comfort Colors 1717 tee visible at all |
| `paletteCompliance` | has-pure-white (background) — also: the brief calls for a **Guy Fawkes mask**, but this artwork depicts a **skull with a cowboy hat**, which is a totally different character. Matrix-green monitors and "BAD DECISIONS · GOOD TIMES" banner are present though not specified in this product's brief. |
| `purpose` | unclear — it's neither the promised product shot nor even the promised artwork (wrong character) |
| `verdict` | kill |
| `verdictReason` | Two-layer defect: (a) artwork-only on pure white instead of garment mockup, and (b) the artwork itself shows a skull-in-cowboy-hat, not the Guy Fawkes-masked hooded figure the product description explicitly promises. This is a different product's design, miswired. |

---

## 4. `public/images/products/tee-golf-mono.webp`

**Wired to:** `prod_033` HCC Country Club Polo — used as **both** `image` AND `cartoonImage` (this is the primary product image — there is no Printful mockup).
**Brief from mock-data:** "The compact HCC + crossed-clubs left-chest hit. Designed for an embroidered polo — needs a Printful polo blank wired in (Hanes/Port Authority) before fulfillment. Currently shown with the print artwork."

| Field | Value |
|---|---|
| `showsFullGarment` | artwork-only |
| `whiteRectangleDefect` | severe — pure white background, the entire frame is the standalone logo lockup with zero garment, zero shadow, zero shirt context |
| `printScale` | N/A |
| `printPlacement` | N/A |
| `garmentColorMatchesBrief` | off — there is no polo, no shirt, no garment whatsoever; product page is selling a $58 polo and showing only a logo |
| `paletteCompliance` | has-pure-white (background) — gold is a desaturated khaki-gold (acceptable, not the cyber-yellow variant) |
| `purpose` | unclear — buyers see a logo, not a polo; mock-data even admits "Currently shown with the print artwork" because no Printful polo blank exists yet |
| `verdict` | kill |
| `verdictReason` | This is the worst offender in the batch by intent. It is the **primary** product image for a $58 polo SKU and shows literally only a logo on white. Until a Printful polo blank (Hanes/Port Authority) is wired in and a proper embroidered-left-chest mockup is rendered, this product cannot ship — buyers have no way to evaluate the actual garment they would receive. Pull from inventory or move to draft. |

---

## Summary

| File | Verdict | Severity |
|---|---|---|
| `hat-dad-hat-cartoon.webp` | re-render | Medium — wrong asset class (illustration vs. cap mockup); secondary role (cartoonImage) so the printful jpg may still carry the listing, but cartoon is meant to convey the vibe and it conveys the wrong vibe (full-color cowboy skull, not minimal embroidered cap) |
| `hoodie-camo-crossover.webp` | ship | None — solid, on-brief, full-garment, gold-drip text reads correctly |
| `tee-anonymous-hoodlum.webp` | kill | High — pure-white background AND wrong character (skull vs. Guy Fawkes); this is a miswired asset that should be replaced, not patched |
| `tee-golf-mono.webp` | kill | **Critical** — this is the **primary** image for a $58 polo SKU showing only a logo on pure white. The product description itself admits the polo blank isn't wired. The polo is effectively unsellable as currently presented. |

### Pattern noticed across the batch

Three of four images (#1, #3, #4) suffer from the same root defect: **standalone artwork being used where a garment mockup is required**. Image #1 is a vibe-illustration substituting for a cap mockup. Image #3 is a print graphic substituting for a tee mockup. Image #4 is a logo lockup substituting for a polo mockup AND it is the *primary* listing image, not a fallback.

Only #2 (`hoodie-camo-crossover.webp`) was produced as an actual garment mockup and consequently is the only one fit to ship.

### Recommended actions (no edits made — audit only)

1. **`tee-golf-mono.webp` / prod_033** — Highest priority. Either (a) source a Printful polo blank and render a proper left-chest embroidered mockup, or (b) mark prod_033 `isSoldOut: true` / remove from catalog until a real polo image exists. As-is it damages buyer trust on a premium-priced SKU.
2. **`tee-anonymous-hoodlum.webp` / prod_027** — Re-render the cartoonImage so it (a) shows on a black Comfort Colors 1717 tee mockup and (b) actually depicts a Guy Fawkes mask as the brief says, not a cowboy skull. (The primary `image` from Printful may already be correct — verify separately.)
3. **`hat-dad-hat-cartoon.webp` / prod_014** — Re-render as an illustration of the *Richardson 320 olive cap itself* with the gold skull-cowboy embroidery patch on the crown, not as a portrait-style cartoon of a skull wearing a cowboy hat. Drop the stray signature scribble.
4. **`hoodie-camo-crossover.webp` / prod_003** — No action required. Keep.
