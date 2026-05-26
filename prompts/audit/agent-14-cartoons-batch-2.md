# Agent 14 — Cartoon Variants Batch 2 Audit

Audited 5 cartoon hover-swap variants from the HOODLUMS COUNTRY CLUB regular tee catalog. These are the alternates that pair with each real Printful product photo on the shop card hover state.

Brand palette reference: Bonfire Black `#0A0A0A`, Antique Gold `#C9A227`, Creek Cream `#F5F0E1`, Tobacco Olive `#4B5320`. No pure white. Real product photos live at `/images/products/printful/tee-*.jpg`.

A cartoon variant is doing its job when it (a) clearly reads as the *same product* the customer just hovered, and (b) keeps the palette and vibe consistent across the line so the hover state feels like a coherent secondary view, not a random mood board.

---

## 1. `public/images/products/tee-og-logo-cartoon.webp`

**Pairs with:** OG Logo Tee (`tee-og-logo`, prod_006)
**Real product:** Garment-dyed heavyweight BLACK tee (Comfort Colors 1717) with stacked cream-gold HOODLUMS COUNTRY CLUB lettering and cracked vintage print.

| Field | Value |
|---|---|
| `showsFullGarment` | artwork-only |
| `whiteRectangleDefect` | none |
| `garmentColorMatchesRealProduct` | off |
| `paletteCompliance` | clean |
| `consistencyAcrossCartoonLine` | match |
| `purpose` | shows-vibe-not-product |
| `verdict` | **re-render** |
| `verdictReason` | Bust portrait of the skull-cowboy mascot in a tan cowboy hat against a dark wood-plank background. No tee is shown. The figure wears what reads as a dark hoodie/collar with a paisley bandana — it does not communicate "OG Logo Tee" in any way. The mascot's stacked HOODLUMS COUNTRY CLUB wordmark, the cracked-vintage print texture, and the cream-gold flagship logo treatment that *define* this SKU are all absent. Palette is clean (tan/gold/cream/black, no pure white), and the art quality is fine, but it's a generic mascot portrait — not a hover-state for the OG Logo Tee. |

**Notes:**
- This SKU is the brand's flagship OG logo tee. The single most important thing the cartoon must show is the *logo* — and the logo is nowhere on it.
- The figure is wearing a dark jacket/hoodie, which conflates this with the Heritage Hoodie hover state. Customer confusion is the cost.
- If the line strategy is "every cartoon is a mascot portrait against a textured background regardless of product," that's a strategy choice — but it abdicates the cartoon's only real job, which is to reinforce the specific product the user is looking at.

---

## 2. `public/images/products/tee-country-raised-cartoon.webp`

**Pairs with:** "Country Raised, Hood Paid" Tee (`tee-country-raised`, prod_007)
**Real product:** Oversized garment-dyed VINTAGE WHITE tee (Bella + Canvas 4810). Burnout-truck illustration with the dual-identity slogan in gold-outlined brown.

| Field | Value |
|---|---|
| `showsFullGarment` | artwork-only |
| `whiteRectangleDefect` | none |
| `garmentColorMatchesRealProduct` | off |
| `paletteCompliance` | clean |
| `consistencyAcrossCartoonLine` | match |
| `purpose` | clearly-shows-product |
| `verdict` | **ship** |
| `verdictReason` | Skull-cowboy driving a lifted truck through dust clouds, pine silhouettes, harvest moon behind. This *is* the Country Raised concept — the burnout-truck illustration is on-brief and the scene reads as the print artwork rendered out as a hero illustration. Background is olive-grey (consistent with the cartoon line) rather than vintage-white, but since this is an artwork showcase not a garment view, the bg color choice is a line-wide stylistic decision. No white rectangle, palette is clean (tan, brown, antique gold, olive, cream — no pure white), mascot is on-model. |

**Notes:**
- The single strongest cartoon in this batch — it's the only one where the cartoon directly mirrors the *actual print artwork* on the real product, which is exactly what a hover-state should do.
- "Vintage White" garment color isn't represented here because no garment is shown. If the line standard is "no garment, just artwork on a colored card," this is fine. If the line standard is "show the garment color," this fails.
- Mascot pose, truck design, and dust composition are all dynamic — best of the batch in pure illustration terms.

---

## 3. `public/images/products/tee-skull-country-cartoon.webp`

**Pairs with:** Skull & Country Tee (`tee-skull-country`, prod_008)
**Real product:** Garment-dyed BLACK tee (Comfort Colors 1717). Tattoo-style cowboy skull with gold grillz, crossed fishing rods, and blackletter brand arc.

| Field | Value |
|---|---|
| `showsFullGarment` | artwork-only |
| `whiteRectangleDefect` | none |
| `garmentColorMatchesRealProduct` | off |
| `paletteCompliance` | clean |
| `consistencyAcrossCartoonLine` | match |
| `purpose` | clearly-shows-product |
| `verdict` | **ship** |
| `verdictReason` | Skull-cowboy with cowboy hat, crossed fishing rods behind, paisley bandana around the neck — this is the Skull & Country brief executed as a cartoon. Gold grillz are present (yellow teeth tone), crossed fishing rods are present (though stylized more like spears than rods), bandana is present. Olive-grey background is consistent with the line. Brand arc / blackletter wordmark from the real artwork is missing — this is the *element list* not the *composition*. Palette clean, no white rectangle. |

**Notes:**
- Reads as a clear sibling to `tee-country-raised-cartoon.webp` (same olive bg, same mascot style) — good line consistency.
- The "crossed fishing rods" read more like javelins/spears at thumbnail size. At hover sizes that's probably fine but a re-render could sharpen the rod-and-reel detail.
- Missing the blackletter HOODLUMS COUNTRY CLUB arc that defines the real tee. The cartoon is essentially showing the *centerpiece* without the *typography frame* — acceptable for a hover state.

---

## 4. `public/images/products/tee-property-of-cartoon.webp`

**Pairs with:** "Property Of" Tee (`tee-property-of`, prod_009)
**Real product:** Premium CHARCOAL HEATHER tee (Cotton Heritage MC1086). PROPERTY OF · HOODLUMS COUNTRY CLUB · ATHLETIC DEPT. varsity print with cracked vintage texture.

| Field | Value |
|---|---|
| `showsFullGarment` | artwork-only |
| `whiteRectangleDefect` | none |
| `garmentColorMatchesRealProduct` | off |
| `paletteCompliance` | clean |
| `consistencyAcrossCartoonLine` | inconsistent |
| `purpose` | shows-vibe-not-product |
| `verdict` | **re-render** |
| `verdictReason` | Bust portrait of the skull-cowboy in a sheriff/military uniform with gold stars and a yellow cowboy hat, set inside a heart/badge shape on a distressed CREAM background. None of the actual tee defines this graphic: no "PROPERTY OF" text, no "HOODLUMS COUNTRY CLUB" arc, no "ATHLETIC DEPT." varsity treatment, no cracked-vintage texture on the *type* (the cracked texture is on the background, not the print). Background is cream, breaking the olive-grey consistency of the other 4 cartoons in this batch. The sheriff/military uniform also veers into a different brand lane (law enforcement / military) that isn't in the brief. |

**Notes:**
- The "Property Of · HOODLUMS COUNTRY CLUB · ATHLETIC DEPT." varsity hit is the entire identity of this SKU — and it's missing.
- The cream background is a hard outlier in the line — every other cartoon (1, 2, 3, 5) sits on olive-grey. This will look misplaced in a shop grid where customers see all hover states in sequence.
- The sheriff stars + uniform suggest a different concept (something like a Property-of-the-County or HCC-Sheriff drop). If that's a future SKU, save this artwork for it. For *this* product, re-render.
- The yellow on the hat and stars is on the harsh-marigold side of gold — borderline `has-wrong-gold`. Reads as clean only because there's also rich antique-gold in the surround.

---

## 5. `public/images/products/tee-scenic-back-cartoon.webp`

**Pairs with:** Scenic Back Tee (`tee-scenic-back`, prod_010)
**Real product:** Garment-dyed BLACK tee (Comfort Colors 1717). Framed bonfire-at-night back print in warm gold tones. Small CH front chest hit.

| Field | Value |
|---|---|
| `showsFullGarment` | artwork-only |
| `whiteRectangleDefect` | none |
| `garmentColorMatchesRealProduct` | off |
| `paletteCompliance` | clean |
| `consistencyAcrossCartoonLine` | match |
| `purpose` | clearly-shows-product |
| `verdict` | **ship** |
| `verdictReason` | Skull-cowboy seated cross-legged at a bonfire, framed inside a gold-bordered panel — this directly mirrors the "framed bonfire-at-night back print in warm gold tones" brief. Pine silhouettes, night sky with stars, bonfire warm-gold/orange flame, gold rectangular frame — every element of the back-print concept is rendered. Olive-grey card background matches the rest of the cartoon line. Palette clean: gold frame, warm orange flame, pine green, cream/tan mascot. No pure white. No white rectangle. |

**Notes:**
- Together with `tee-country-raised-cartoon.webp` this is the best of the batch — the framed bonfire vignette is *the* visual concept of this SKU and the cartoon captures it.
- Mascot is wearing a tee (visible short sleeves) on this one, which is the only cartoon in the batch that even hints at the tee garment itself. Nice touch.
- The mascot wears a dark tee here — the real product is also dark/black. Coincidental garment-color match, but it lands.

---

## Summary

| File | Verdict |
|---|---|
| `tee-og-logo-cartoon.webp` | **re-render** — mascot portrait, missing the actual OG logo wordmark that defines the flagship SKU |
| `tee-country-raised-cartoon.webp` | **ship** — directly mirrors the burnout-truck print, strong dynamic illustration |
| `tee-skull-country-cartoon.webp` | **ship** — on-concept skull + crossed rods + bandana, missing blackletter arc but acceptable for a hover state |
| `tee-property-of-cartoon.webp` | **re-render** — wrong concept (sheriff/military bust), cream bg breaks line consistency, missing varsity "PROPERTY OF" wordmark |
| `tee-scenic-back-cartoon.webp` | **ship** — framed bonfire scene directly mirrors the back-print brief |

**Batch totals:** 3 ship, 2 re-render, 0 kill.

**Cross-cutting findings:**

1. **None of these are garment views.** Every cartoon in this batch is artwork-only (or mascot portrait) on a colored card background. The `garmentColorMatchesRealProduct` field is therefore "off" across the board — *not* because the cartoons got the garment color wrong, but because no garment is shown to compare. This is a line-wide choice, not a per-image defect, and probably an intentional cartoon-vs-photo contrast strategy.
2. **Olive-grey is the line standard.** 4 of 5 cartoons sit on the olive-grey card background. The Property Of cartoon is the lone cream-background outlier and that alone makes it look out of place in the catalog grid — separate from its concept problems.
3. **The ship-worthy cartoons mirror the actual print artwork.** Country Raised (truck/dust), Skull & Country (skull + rods + bandana), and Scenic Back (framed bonfire) all render the *real product's print concept* as their cartoon. The re-render candidates (OG Logo, Property Of) instead show generic mascot portraits that don't relate to their SKU's defining graphic.
4. **The pattern is clear for re-renders:** swap the generic mascot bust for an illustrated version of the actual print concept. For OG Logo, that means rendering the stacked HOODLUMS COUNTRY CLUB wordmark in cracked-vintage cream-gold. For Property Of, that means rendering the PROPERTY OF · ATHLETIC DEPT. varsity hit. Keep the olive-grey card background to stay consistent with the line.
5. **No technical defects.** Zero white rectangles, zero pure-white leaks, zero wrong-gold violations across all 5 files. Failures here are conceptual (wrong subject matter), not technical.
