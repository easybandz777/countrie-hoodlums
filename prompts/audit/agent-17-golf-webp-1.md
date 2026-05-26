# Agent 17 — Golf-Line .webp Audit (Batch 1)

Audit of 4 golf-line `.webp` files used as `cartoonImage` (hover-swap alternate on product cards) in `src/lib/mock-data.ts`.

**Key question:** When a buyer hovers a golf-tee product card, do they see a sensible variant of the same product, or do they see a logo on a cream/white background?

---

## 1. `tee-golf-crossed-clubs.webp`

Referenced by `prod_028` ("Crossed Clubs Crest Tee", slug `tee-golf-crossed-clubs`). Pairs with `printful/tee-golf-crossed-clubs.jpg`.

**Observed:** Raw print artwork floating on a pure white background. Black-and-gold heritage crest: HOODLUMS / COUNTRY CLUB banner up top, crossed driver and putter with a cream golf ball at the intersection inside a gold ring, EST. 2024 banner at the bottom. No garment, no fabric, no mockup framing.

| Field | Value |
|---|---|
| `showsFullGarment` | artwork-only |
| `whiteRectangleDefect` | severe (entire canvas is pure white) |
| `paletteCompliance` | has-pure-white (background is #FFFFFF, brand calls for bone-cream) |
| `purpose` | shows-print-only |
| `consistencyWithJpgCounterpart` | inconsistent (the `.jpg` is a black-tee Printful mockup; this is naked artwork — hover-swap collapses the product to a floating logo) |
| `verdict` | re-render |
| `verdictReason` | Raw print art on a pure white background is not a product card image — needs to be a back/angle/lifestyle mockup of the same black tee so the hover swap stays on-product. |

---

## 2. `tee-golf-skull-caddy.webp`

Referenced by `prod_029` ("Skull Caddy Tee", slug `tee-golf-skull-caddy`). Pairs with `printful/tee-golf-skull-caddy.jpg`.

**Observed:** Raw print artwork on pure white. Skull-cowboy mascot mid-swing (cowboy hat, bandana, gold grillz, golf club drawn back behind the head), HOODLUMS / COUNTRY CLUB cream banner under the figure, three small red flags planted on a green turf patch, BAD LIES · GOOD TIMES in antique gold arched along the bottom. The artwork itself is on-brand and well-executed — but it's not a garment.

| Field | Value |
|---|---|
| `showsFullGarment` | artwork-only |
| `whiteRectangleDefect` | severe (entire canvas is pure white) |
| `paletteCompliance` | has-pure-white (background is #FFFFFF; cream/gold/red palette inside the art is fine) |
| `purpose` | shows-print-only |
| `consistencyWithJpgCounterpart` | inconsistent (the `.jpg` is a black-tee mockup; this is the bare print file with no shirt) |
| `verdict` | re-render |
| `verdictReason` | The art itself is the strongest of the four (full mascot + flag turf + arched tag), but it's still a floating logo on white — needs to be wrapped on a tee mockup before it can ship as a hover image. |

---

## 3. `tee-golf-bad-lies.webp`

Referenced by `prod_030` (`"Bad Lies, Good Times" Tee`, slug `tee-golf-bad-lies`). Pairs with `printful/tee-golf-bad-lies.jpg`.

**Observed:** Raw print artwork on pure white, and tightly cropped. Two stacked condensed Western caps lockups — BAD LIES over a thin horizontal rule over GOOD TIMES — in cream with a thick antique-gold metallic outline. Tiny clay-red flag tucked in the bottom-right. The crop is so tight it reads as a sticker/logo file rather than a print proof, and the canvas is much smaller and squarer than the other three (the image renders quite small).

| Field | Value |
|---|---|
| `showsFullGarment` | artwork-only |
| `whiteRectangleDefect` | severe (entire canvas is pure white; tight crop makes it look like a logomark file) |
| `paletteCompliance` | has-pure-white (background is #FFFFFF) |
| `purpose` | shows-print-only |
| `consistencyWithJpgCounterpart` | inconsistent (the `.jpg` is a black-tee mockup; on hover the buyer drops from a shirt to a small floating wordmark) |
| `verdict` | re-render |
| `verdictReason` | Floating typography lockup on white with a tight crop — reads as a logo asset, not a product image. Re-render at the same canvas size as the other three, ideally on a tee mockup. |

---

## 4. `tee-golf-18th-hole.webp`

Referenced by `prod_031` ("18th Hole Tee", slug `tee-golf-18th-hole`). Pairs with `printful/tee-golf-18th-hole.jpg`.

**Observed:** Raw print artwork on pure white. A single clay-red pennant flag on a black pole planted in a green turf disc, HOODLUMS / COUNTRY CLUB stitched in cream on the flag (with little dashed stitching detail along the flag's edge), a bone-cream golf ball next to the cup with a short motion-line, EST. 2024 · 18 HOLES in antique gold underneath. Art is on-brand and matches the description in `mock-data.ts` exactly — but again, no garment.

| Field | Value |
|---|---|
| `showsFullGarment` | artwork-only |
| `whiteRectangleDefect` | severe (entire canvas is pure white) |
| `paletteCompliance` | has-pure-white (background is #FFFFFF; flag-red / turf-green / cream / gold inside the art are fine) |
| `purpose` | shows-print-only |
| `consistencyWithJpgCounterpart` | inconsistent (the `.jpg` is a black-tee mockup; this is the bare print file) |
| `verdict` | re-render |
| `verdictReason` | Same systemic defect as the other three: the artwork is fine but the canvas is a pure white background with no shirt, so hover swap takes the buyer off the product. |

---

## Summary

All four `.webp` files are **raw print artwork on pure white backgrounds**, not garment mockups. Every one of them is miscategorized as `cartoonImage` (hover-swap product card image) — they were probably the Printful-upload print files, not alternate product photography.

**Systemic defects shared by all 4:**
- `showsFullGarment` = **artwork-only** across the board (0/4 show a tee)
- `whiteRectangleDefect` = **severe** across the board (the entire canvas is #FFFFFF; this is the worst possible case of the rubric's "white rectangle" failure mode)
- `paletteCompliance` = **has-pure-white** across the board (brand background should be bone-cream, not pure white)
- `purpose` = **shows-print-only** across the board (these are print proofs, not lifestyle/product imagery)
- `consistencyWithJpgCounterpart` = **inconsistent** across the board (the `.jpg`s are real Printful black-tee mockups; the `.webp`s are floating logos)

**UX impact:** When a buyer hovers any of the four golf-tee product cards, the card collapses from "garment-dyed black tee with print" to "logo floating on a white square." That's the exact defect mode flagged in the rubric — a logo on a cream/white background, not a sensible product variant.

**Verdict counts:** ship 0 / re-render 4 / kill 0.

**Recommendation:** Re-render all four as either (a) back-view or lifestyle mockups of the same black Comfort Colors 1717 tee, (b) a flat-lay alternate angle, or (c) a "cartoon" stylized illustration of the tee being worn (matching the convention used by `hoodie-heritage-cartoon.webp` and the other `*-cartoon.webp` siblings — note that these four are the only golf SKUs whose `cartoonImage` lacks the `-cartoon` suffix, which is itself a tell that they were never proper cartoon/alt assets to begin with).

**Note on `prod_032`–`prod_035`:** Not in this batch, but worth flagging: `tee-golf-emblem.webp`, `tee-golf-scorecard.webp`, `tee-golf-cart-bandits.webp`, and `tee-golf-mono.webp` (which is *also* the primary `image` for `polo-hcc-mono`) likely have the same defect pattern — recommend auditing them in the next batch.
