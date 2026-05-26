# Agent 10 — Tees Batch 2 Audit

Audited 2 tee mockup files from the HOODLUMS COUNTRY CLUB regular shop catalog.
(`hoodie-from-the-dirt.jpg` was already audited by another agent and is skipped per instructions.)

Brand palette reference: Bonfire Black `#0A0A0A`, Antique Gold `#C9A227`, Creek Cream `#F5F0E1`, Tobacco Olive `#4B5320`. No pure white.

---

## 1. `public/images/products/printful/tee-bold-statement.jpg`

**Product:** Bold Statement Tee (`tee-bold-statement`, prod_011)
**Brief:** Oversized washed black tee (Bella + Canvas 4810). Massive HOODLUM impact font with gold drop-shadow, tiny country club cursive above.

| Field | Value |
|---|---|
| `showsFullGarment` | full |
| `whiteRectangleDefect` | none |
| `printScale` | correct |
| `printPlacement` | correct |
| `garmentColorMatchesBrief` | match |
| `paletteCompliance` | clean |
| `verdict` | **ship** |
| `verdictReason` | On-brief: oversized washed-black tee, massive cream "HOODLUM" with antique-gold 3D drop-shadow, "country-club" gold cursive above-left, slight downward tilt reads as intentional design. Cream face is warm (Creek Cream), not pure white. Palette is clean, no rectangle artifact, mockup is well-lit and fully showing the garment. |

**Notes:**
- The cream face of the letters could be misread as white at thumbnail size — at full resolution it's clearly the warm Creek Cream tone, so palette compliance holds. If sitewide concerns about thumbnail legibility arise this could be a near-miss flag, but it ships as-is.
- Scale matches the "massive HOODLUM impact font" callout — fills roughly 60% of the chest width.
- Gold drop-shadow is rich antique gold, not the harsh metallic-yellow seen on some early Printful gold renders.

---

## 2. `public/images/products/printful/tee-anonymous-hoodlum.jpg`

**Product:** Anonymous Hoodlum Tee (`tee-anonymous-hoodlum`, prod_027)
**Brief:** Limited drop. Garment-dyed heavyweight black tee (Comfort Colors 1717). Hooded figure in a Guy Fawkes mask in front of a wall of matrix-green code monitors — with a tiny gold HCC monogram tucked in the corner. If you know, you know.

| Field | Value |
|---|---|
| `showsFullGarment` | full |
| `whiteRectangleDefect` | none |
| `printScale` | correct |
| `printPlacement` | correct |
| `garmentColorMatchesBrief` | match |
| `paletteCompliance` | clean |
| `verdict` | **re-render** |
| `verdictReason` | Brief mismatch — the figure is the HCC skull-cowboy mascot (cowboy hat + gold grillz), NOT a Guy Fawkes mask. "BAD DECISIONS · GOOD TIMES" tagline is not in the brief and looks lifted from the golf line. The matrix-green code is present but it's a single monitor not "a wall of monitors", and the "tiny gold HCC monogram in the corner" is missing. Garment, palette, scale, placement, and mockup quality are all fine — concept is wrong. |

**Notes:**
- The intended drop is the *Anonymous* Hoodlum — explicitly a Guy Fawkes mask (the iconic Anonymous/V-for-Vendetta reference). That cultural reference is the whole point of the "If you know, you know" tagline in the description, and it's totally absent.
- What's shipped instead is a recycled skull-cowboy graphic that overlaps thematically with `tee-skull-country` (prod_008) and the golf-line `Skull Caddy Tee` (prod_029). It dilutes the catalog by duplicating an existing visual lane.
- The "BAD DECISIONS · GOOD TIMES" tagline currently appears on `tee-golf-scorecard` (prod_034) and `tee-golf-cart-bandits` (prod_035). It is not in the Anonymous Hoodlum brief and shouldn't be there.
- Garment-side execution is solid (full garment, no white rectangle, clean palette, Comfort Colors tag visible at neckline) — the rebuild is purely about getting the right artwork on it.
- Special-focus check from instructions: no white rectangular border around the figure, no low-res rasterization. The complex graphic renders cleanly. The defect is conceptual, not technical.

---

## Summary

| File | Verdict |
|---|---|
| `tee-bold-statement.jpg` | **ship** — on-brief, clean palette, scale correct |
| `tee-anonymous-hoodlum.jpg` | **re-render** — wrong figure (skull-cowboy instead of Guy Fawkes mask), wrong tagline, missing HCC corner monogram |

**Batch totals:** 1 ship, 1 re-render, 0 kill.

The Bold Statement Tee is production-ready. The Anonymous Hoodlum Tee needs the artwork regenerated to match the brief — the cultural Guy Fawkes reference is the *entire concept* of the drop, and dropping it for a recycled skull-cowboy means this SKU has no reason to exist separately from `tee-skull-country` or `tee-golf-skull-caddy`. The garment, mockup quality, and palette compliance are all fine; this is purely an artwork-content problem.
