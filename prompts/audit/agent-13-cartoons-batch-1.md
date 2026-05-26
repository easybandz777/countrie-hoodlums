# Agent 13 — Cartoon Variants Batch 1 Audit

Audit of the 5 "cartoon variant" hover-swap images used on product cards. These are the alternate images that appear when a buyer hovers a product tile — they should still let the buyer recognize *what they are about to buy*, not just sell vibe.

Date: 2026-05-26
Auditor: Agent 13
Scope: 5 hoodie cartoon variants (cartoon side of the Printful real-photo / cartoon hover pair)

---

## 1. `hoodie-heritage-cartoon.webp`

Wired to: `prod_001` Heritage Hoodie (Black, Independent IND4000, HOODLUMS COUNTRY CLUB wordmark + skull-cowboy chest hit)

| Field | Value |
|---|---|
| `showsFullGarment` | partial — torso + sleeves of a black hoodie are clearly drawn, hood up, kangaroo pocket visible. Character wears it, but cropped at the waist. |
| `whiteRectangleDefect` | none |
| `garmentColorMatchesRealProduct` | match — black hoodie matches the real Heritage black. |
| `paletteCompliance` | clean — antique gold + black + neutral dark gray background. No pure white, no neon gold. |
| `consistencyAcrossCartoonLine` | inconsistent — mid-range stylistically. The skull face is rendered tighter and cleaner than `crew` and `camo-crossover`, looser than `live-each-day`. |
| `purpose` | shows-vibe-not-product — and this is the killer: the cartoon hoodie has a **completely different chest print** than the real product. Real product = HOODLUMS COUNTRY CLUB stacked wordmark + cowboy-skull. Cartoon chest = a small gold sunburst/medallion graphic that does not exist on the actual hoodie. The hover swap actively misleads the buyer about what the print looks like. |
| `verdict` | re-render |
| `verdictReason` | Garment shape and color are right, but the chest graphic on the cartoon hoodie does not match the real Heritage chest print — buyer sees one logo on hover, gets a different one in the box. |

---

## 2. `hoodie-crew-cartoon.webp`

Wired to: `prod_004` Crew Zip Hoodie (Black full-zip, Independent SS4500Z, circular biker-patch crest on back: crossed shotgun + fishing rod, EST. 2024 arc)

| Field | Value |
|---|---|
| `showsFullGarment` | artwork-only — character is cropped tight to the chest with crossed weapons floating across the body. The "garment" is just an indistinct dark hoodie-like mass behind the rifles. No zipper is shown (real product is a *full-zip*), no kangaroo pocket, no defined hood, no back crest. It reads as a t-shirt-style emblem illustration, not a product render. |
| `whiteRectangleDefect` | none |
| `garmentColorMatchesRealProduct` | match in hue (dark/black) but the silhouette doesn't communicate "full-zip hoodie" at all. |
| `paletteCompliance` | clean — warm wood-brown rifles, gold accents, dark cracked-wall background. No pure white. |
| `consistencyAcrossCartoonLine` | inconsistent — this one is the most aggressive in tone: gritty cracked-stone background, heavier outlines, weapons-forward. Reads more like a death-metal merch decal than the warmer cartoon style of `heritage` / `live-each-day` / `from-the-dirt`. |
| `purpose` | shows-vibe-not-product — buyer hovers expecting to see the actual full-zip with the round biker patch on the back. They get a skull holding two rifles. The signature design element of this product (the circular crest) is not shown. |
| `verdict` | re-render |
| `verdictReason` | Garment is unreadable — no zipper, no back crest, no hoodie silhouette. The hover swap fails to communicate that this is a full-zip with a circular back patch. |

---

## 3. `hoodie-live-each-day-cartoon.webp`

Wired to: `prod_002` "Live Each Day" Hoodie (Black, Comfort Colors 1467, full-back sunset-and-dirt-road print with the mantra arched in cream and gold)

| Field | Value |
|---|---|
| `showsFullGarment` | partial — character is shown from waist up wearing what appears to be a long-sleeve top with a v-neck/collar opening. It does not read as a hoodie (no hood, no kangaroo pocket, no drawstrings). |
| `whiteRectangleDefect` | none |
| `garmentColorMatchesRealProduct` | **off — the cartoon garment is olive/sage gray-green. Real product is BLACK.** Direct color mismatch. |
| `paletteCompliance` | clean — sunset orange + olive + warm tones. No pure white. |
| `consistencyAcrossCartoonLine` | inconsistent — this one is the most "narrative scene" of the five. Wider environment (truck, road, sky, trees), softer linework, smaller character relative to frame. Closer to a `tee-country-raised` storytelling vibe than the chest-up product portraits of `heritage` / `from-the-dirt`. |
| `purpose` | shows-vibe-not-product — the cartoon recreates the *artwork* of the print (sunset + truck on dirt road) but does not show the garment carrying that artwork. The buyer cannot tell from this image that this is a black hoodie with a framed back panel print. Worse, the character's top is the wrong color so the swap actively contradicts the real photo. |
| `verdict` | re-render |
| `verdictReason` | Garment is not a hoodie (no hood/drawstring/pocket), and it's the wrong color (olive instead of black). The hover swap teaches the buyer the wrong product attributes. |

---

## 4. `hoodie-from-the-dirt-cartoon.webp`

Wired to: `prod_005` From the Dirt Hoodie (Alpine Green, Independent SS4500, golden tree-of-life with HOODLUMS roots / COUNTRY CLUB branches)

| Field | Value |
|---|---|
| `showsFullGarment` | partial — torso + sleeves of a green hoodie are clearly drawn, hood up, drawstrings visible, kangaroo pocket area visible. Best garment read of the five. |
| `whiteRectangleDefect` | none — the tree graphic sits directly on the green fabric, no white plate. |
| `garmentColorMatchesRealProduct` | match — deep forest/alpine green is the right ballpark. |
| `paletteCompliance` | mostly clean — antique gold leaves, green fabric, brown branches. Background is a warm cream/parchment which is **not pure white** but is close to off-white. Worth confirming it doesn't trip a #FFFFFF check, but visually reads as warm tone. |
| `consistencyAcrossCartoonLine` | inconsistent — closest match in style/composition to `heritage` (chest-up portrait, simple bg). The branch-sprouting-from-behind-the-shoulders motif is a one-off concept not echoed elsewhere. |
| `purpose` | clearly-shows-product — chest features a tree graphic in roughly the right area where the real print sits. Color is right, garment shape is right, motif is right (tree-of-life). The real product's tree is much more graphically developed (wordmark integrated into roots and branches), and this cartoon version simplifies it heavily — but the spirit and category of the design carries. |
| `verdict` | ship |
| `verdictReason` | Only one of the five that does the job a hover swap is supposed to do: shows the right garment color, the right garment silhouette, and a chest motif aligned with the real product. |

---

## 5. `hoodie-camo-crossover-cartoon.webp`

Wired to: `prod_003` Liquid Gold Hoodie (Army olive solid, Independent SS4500, dripping liquid-gold HOODLUMS COUNTRY CLUB wordmark)

| Field | Value |
|---|---|
| `showsFullGarment` | partial — character is shown chest-up in a hoodie with the hood up. Visible garment, but cropped. |
| `whiteRectangleDefect` | none |
| `garmentColorMatchesRealProduct` | **off — the cartoon garment is full digital-camo (green/brown/tan camo print). The real Liquid Gold Hoodie is a SOLID army olive with no camo pattern at all.** This is a hard mismatch — the buyer is being shown a camo hoodie that does not exist in this product. |
| `paletteCompliance` | clean — olive, tan, dark green camo + gold accents on the hat patch, eyes, and grillz. No pure white. |
| `consistencyAcrossCartoonLine` | inconsistent — this one is the most stylistically divergent: glowing yellow eyes, gold grillz, paisley bandana over the mouth, heaviest outlines, most aggressive/menacing tone. Reads like a different illustrator. Closer to street/trap aesthetic than the warmer cartoon-Western vibe of the others. |
| `purpose` | unclear — the cartoon doesn't show the dripping-gold wordmark that *is* the entire identity of the Liquid Gold Hoodie. So even if a buyer were okay with the camo discrepancy, they'd still get no sense of the actual chest print. The filename `camo-crossover-cartoon` also suggests this asset was made for a *different* camo product entirely and miswired to Liquid Gold. |
| `verdict` | kill |
| `verdictReason` | Wrong garment (camo vs solid olive), wrong chest print (no dripping wordmark shown), and stylistically the odd one out. Filename suggests this was intended for a different product. Do not ship this as the Liquid Gold hover swap. |

---

## Summary

**Ship-rate: 1 out of 5.** This batch is failing the basic purpose of a hover-swap alt image — letting the buyer see the same product in a stylized way.

### Pattern of failures

1. **Print mismatch (3 of 5).** `heritage`, `crew`, and `camo-crossover` all draw a cartoon hoodie with a chest graphic that does not correspond to the real product's print. The hover swap teaches the buyer the wrong thing about the design.

2. **Garment-color mismatch (2 of 5).** `live-each-day` (olive cartoon vs black real) and `camo-crossover` (camo cartoon vs solid olive real) put the cartoon garment in the wrong color/pattern. The hover swap actively contradicts the real photo.

3. **Garment silhouette failure (2 of 5).** `crew` doesn't show a full-zip and hides the body of the garment behind crossed rifles. `live-each-day` shows a long-sleeve that is not recognizably a hoodie (no hood, no drawstring, no pocket).

4. **Art-style inconsistency (line-wide).** Three distinct stylistic registers across five images:
   - Warm Western cartoon (`heritage`, `from-the-dirt`)
   - Cinematic narrative scene (`live-each-day`)
   - Aggressive street/menace tone (`crew`, `camo-crossover`)

   The hover swap should feel like a unified cartoon-line treatment. Right now it feels like five separate illustrators with five different briefs.

5. **Likely miswiring.** `hoodie-camo-crossover-cartoon.webp` is wired as the cartoon for `prod_003` Liquid Gold (army olive, dripping gold wordmark). The filename, garment pattern, and missing wordmark all suggest this asset was generated for a different camo-themed product and got attached to Liquid Gold by mistake. Check `mock-data.ts` line 81 and re-attribute.

### Verdicts at a glance

| File | Verdict |
|---|---|
| `hoodie-heritage-cartoon.webp` | re-render (chest print doesn't match) |
| `hoodie-crew-cartoon.webp` | re-render (no zip, no back crest, garment hidden) |
| `hoodie-live-each-day-cartoon.webp` | re-render (wrong color, not a hoodie silhouette) |
| `hoodie-from-the-dirt-cartoon.webp` | ship (the only one that works) |
| `hoodie-camo-crossover-cartoon.webp` | kill (wrong product, almost certainly miswired) |

### Recommendations

- **Re-brief the cartoon line as a unified set.** Lock the style (line weight, palette, framing, background treatment, character pose) so all hover swaps share an authorial voice. `from-the-dirt` is the closest to a usable house style — chest-up portrait, character wearing the actual garment in the correct color, motif from the real print appearing on the chest.
- **Each cartoon must show the real garment color and the real print motif.** That's the entire job of a hover-swap on a product card. If the cartoon hoodie is olive when the real product is black, the swap is teaching buyers a lie.
- **Audit `mock-data.ts` for miswirings**, especially the `camo-crossover` → Liquid Gold edge. There may be a missing `hoodie-camo-crossover` product that this asset belongs to.
- **Until re-renders land, consider disabling the hover swap on the four failing products** so buyers only see the Printful real photo. A bad hover image is worse than no hover image.
