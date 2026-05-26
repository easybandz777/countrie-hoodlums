# Agent 15 — Cartoon Variants Batch 3 Audit

Auditor: Agent 15
Date: 2026-05-26
Scope: 4 cartoon hover-swap variants

---

## 1. `public/images/products/tee-bold-statement-cartoon.webp`

**Product context (prod_011 — Bold Statement Tee):** Oversized **washed black** tee (Bella + Canvas 4810). Massive HOODLUM impact font with gold drop-shadow, tiny country club cursive above.

**What the image actually shows:** A skull-cowboy mascot character (head, hat, bandana, arms) wearing a dark brown/charcoal tee with a centered gold-skull graphic and a barely-legible distressed gold text block underneath. Olive-green flat background. Body is cropped at the waist.

| Field | Value |
|---|---|
| `showsFullGarment` | **partial** (waist-cropped torso wearing a tee — garment is visible but isn't the subject, the character is) |
| `whiteRectangleDefect` | **none** |
| `garmentColorMatchesRealProduct` | **off** (tee is muddy dark brown, not washed black) |
| `paletteCompliance` | **clean** (no pure white, no wrong gold — gold reads as antique gold) |
| `consistencyAcrossCartoonLine` | **inconsistent** (this is a character bust on olive; the crewneck-vintage cartoon is a full-body character on cream; the hat cartoons are product-only on solid color — no shared treatment) |
| `purpose` | **shows-vibe-not-product** (you cannot see the actual Bold Statement design — no HOODLUM impact font, no gold drop-shadow, no country club cursive; it's just a mascot wearing *some* skull tee) |
| `verdict` | **re-render** |
| `verdictReason` | The tee graphic on the mascot is illegible and doesn't match the real product's massive HOODLUM impact font — kills the hover-swap's purpose of teasing the design. |

---

## 2. `public/images/products/crewneck-vintage-cartoon.webp`

**Product context (prod_016 — Vintage Crewneck):** Garment-dyed **Pepper (washed gray) crewneck** (Comfort Colors 1466). Retro collegiate HOODLUMS COUNTRY CLUB in cream with gold outline.

**What the image actually shows:** A full-body skull-cowboy character standing on a cream background, wearing an **army-green hoodie** (drawstrings + kangaroo pocket visible) over green pants and yellow sneakers, with a skull patch graphic centered on the chest. Sunglasses, cowboy hat, gold chain.

| Field | Value |
|---|---|
| `showsFullGarment` | **partial** (a garment is shown on the character, but it's the wrong garment type — hoodie not crewneck) |
| `whiteRectangleDefect` | **none** |
| `garmentColorMatchesRealProduct` | **off** (army green hoodie vs. washed gray crewneck — wrong color *and* wrong silhouette: drawstrings + pouch pocket = hoodie, not crewneck) |
| `paletteCompliance` | **clean** (no pure white, no wrong gold) |
| `consistencyAcrossCartoonLine` | **inconsistent** (full-body character on cream; the bold-statement cartoon is bust-only on olive; hats are product-only — three different treatments across four images) |
| `purpose` | **unclear** (shows the wrong garment with the wrong graphic — there's no retro collegiate HOODLUMS COUNTRY CLUB type, no cream-with-gold-outline lettering, no washed gray crewneck silhouette) |
| `verdict` | **kill** |
| `verdictReason` | Wrong garment category entirely (hoodie not crewneck) and wrong color — this would actively mislead shoppers hovering on a gray crewneck. |

---

## 3. `public/images/products/hat-leather-mascot-skull-cartoon.webp`

**Product context (prod_021 — Mascot Patch Hat):** Richardson 112 **all-black** with a **laser-engraved veg-tanned leather patch** — HOODLUMS COUNTRY CLUB arched at the top, skull-cowboy mascot centered, EST. 2024 at the bottom.

**What the image actually shows:** A cartoon baseball cap, 3/4 front view. Black crown with a large gold skull (no cowboy hat on the skull, no arched HOODLUMS COUNTRY CLUB text, no EST. 2024). **Gold/tan brim** with concentric ring detailing — but a Richardson 112 all-black has a **black brim**. Tan flat background. Small dark side patch visible.

| Field | Value |
|---|---|
| `showsFullGarment` | **full** (whole hat visible, 3/4 front) |
| `whiteRectangleDefect` | **none** |
| `garmentColorMatchesRealProduct` | **off** (brim is gold/tan, not black — Richardson 112 *all-black* means black brim; also the patch is just a generic gold skull with no text and no cowboy hat, so the "mascot patch" identity is gone) |
| `paletteCompliance` | **clean** (gold reads as antique gold, no pure white) |
| `consistencyAcrossCartoonLine` | **match** (consistent with hat-leather-crossed-arms-cartoon: cartoon hat on solid-color flat background, same illustration style) |
| `purpose` | **shows-vibe-not-product** (it's a black cap with a gold skull — but it's missing the leather-patch tell, the arched HOODLUMS COUNTRY CLUB text, the cowboy-hat-on-skull, and EST. 2024; brim is the wrong color too) |
| `verdict` | **re-render** |
| `verdictReason` | Brim color is wrong (gold vs. black) and the patch lacks every distinguishing element of the real product — the arched HCC text, the cowboy hat on the skull, and EST. 2024. |

---

## 4. `public/images/products/hat-leather-crossed-arms-cartoon.webp`

**Product context (prod_022 — Crew Crest Patch Hat):** Richardson 112 **all-black** with a laser-engraved veg-tanned leather patch — HOODLUMS COUNTRY CLUB arched at the top, **crossed shotgun + fishing rod** with a **cowboy hat** at the intersection, EST. 2024 along the bottom.

**What the image actually shows:** A cartoon baseball cap in **dark olive-green** (not black), with a centered patch showing **two crossed shotguns** (no fishing rod, no cowboy hat at the intersection, no arched HOODLUMS COUNTRY CLUB text). Orange/amber flat background. Small unreadable side patch on the right panel.

| Field | Value |
|---|---|
| `showsFullGarment` | **full** (whole hat visible, 3/4 front) |
| `whiteRectangleDefect` | **none** |
| `garmentColorMatchesRealProduct` | **off** (dark olive-green cap, but product is Richardson 112 all-black; design is two crossed shotguns instead of crossed shotgun + fishing rod with cowboy hat) |
| `paletteCompliance` | **clean** (no pure white, no wrong gold) |
| `consistencyAcrossCartoonLine` | **match** (consistent illustration style with hat-leather-mascot-skull-cartoon: same cartoon hat treatment, solid-color flat background) |
| `purpose` | **shows-vibe-not-product** (vaguely outdoorsy "crossed weapons" vibe but it's the wrong design and the wrong cap color) |
| `verdict` | **re-render** |
| `verdictReason` | Cap is olive-green not black, and the patch is two shotguns instead of the crossed shotgun + fishing rod with a cowboy hat at the intersection — both the color and the crest identity are wrong. |

---

## Summary

**Verdicts:**
- `tee-bold-statement-cartoon.webp` — **re-render**
- `crewneck-vintage-cartoon.webp` — **kill**
- `hat-leather-mascot-skull-cartoon.webp` — **re-render**
- `hat-leather-crossed-arms-cartoon.webp` — **re-render**

**Ship count: 0 of 4.** None of these are shippable as-is.

**Systemic issues across the batch:**

1. **Garment color drift.** Three of four images have the wrong color: the bold-statement tee renders as muddy brown instead of washed black, the crewneck-vintage shows an army-green hoodie instead of a washed-gray crewneck, and both hats have wrong brim/crown colors despite the real products being Richardson 112 **all-black**. This is the worst category of defect because color is the single thing a hover-swap is supposed to confirm.

2. **Wrong garment category.** The crewneck-vintage cartoon shows a *hoodie* — drawstrings and a kangaroo pouch are visible. A "crewneck" by definition has neither. This isn't a touch-up problem, it's the wrong product class.

3. **Missing design IDs.** None of the four cartoons reproduce the actual design elements that distinguish the product: no HOODLUM impact font, no retro collegiate HCC lettering, no arched HOODLUMS COUNTRY CLUB on either hat patch, no cowboy-hat-on-skull, no EST. 2024, no fishing rod in the "crossed arms" crest. The hats also lose the leather-patch tell — they read as embroidery or printed graphics, not the veg-tanned leather patches that are the entire selling point of this hat line.

4. **Inconsistent treatment within the batch.** The two apparel cartoons (tee, crewneck) are character-illustration style on flat backgrounds, while the two hat cartoons are product-only on flat backgrounds. The two character cartoons aren't even consistent with *each other* — one is a waist-up bust on olive, the other is a full-body figure on cream. There is no unified hover-swap art direction.

5. **White-rectangle defect: none.** This was the one clean dimension across the batch — no white-box artifacts, no transparent-PNG-on-white fallback junk.

**Recommendation:** Re-render three (both hats + bold-statement tee) with strict color and design-element specs. Kill the crewneck-vintage cartoon and start over with a correct gray-crewneck silhouette. Before re-rendering, lock down a single art-direction spec for the entire cartoon line (product-only vs. character, background color, palette tokens, required design elements per product) — the current batch shows what happens without one.
