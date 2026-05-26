# Agent 08 — Hoodies Batch 2 Audit

Audited 2026-05-26. Files reviewed: `hoodie-crew.jpg`, `crewneck-vintage.jpg`, `tee-og-logo.jpg`.

---

## 1. Crew Zip Hoodie — `public/images/products/printful/hoodie-crew.jpg`

Spec (mock-data.ts): "Black full-zip hoodie (Independent SS4500Z). Biker-patch crest on the back: crossed shotgun and fishing rod, EST. 2024 arc."

| Field | Value |
|---|---|
| `showsFullGarment` | full (model torso, front view) |
| `whiteRectangleDefect` | none |
| `printScale` | correct (badge ~5–6" wide, sits roughly between chest and waist) |
| `printPlacement` | **wrong — biker-patch crest is on the FRONT, spec says BACK** |
| `garmentColorMatchesBrief` | match (Bonfire Black) |
| `paletteCompliance` | clean (antique gold + cream on black, no pure white, no wrong gold) |
| `consistencyAcrossShopLine` | inconsistent — front-printed circular crest collides with the zipper, splitting the artwork down the middle |
| `verdict` | **re-render** |
| `verdictReason` | Crest is in the wrong location AND the front placement is broken by the zip line bisecting the badge — the back is the correct (and only logically printable) surface for a circular crest on a full-zip blank. |

**Additional notes:** The zipper runs straight through the middle of the badge, cutting the shotgun + fishing rod artwork in half. Even if the placement were intentional (it isn't, per spec), front-printing a unified circular crest on a full-zip is a fundamental garment-construction mistake. The crest must move to the back. Front can stay blank or get a small left-chest mark in a future revision — but that is out of scope; the fix here is back placement.

---

## 2. Vintage Crewneck — `public/images/products/printful/crewneck-vintage.jpg`

Spec (mock-data.ts): "Garment-dyed Pepper (washed gray) crewneck (Comfort Colors 1466). Retro collegiate HOODLUMS COUNTRY CLUB in cream with gold outline."

| Field | Value |
|---|---|
| `showsFullGarment` | full (flat product shot, front view) |
| `whiteRectangleDefect` | none |
| `printScale` | correct (chest-width collegiate lockup, well-balanced) |
| `printPlacement` | correct (centered front chest) |
| `garmentColorMatchesBrief` | match (washed Pepper gray, Comfort Colors neck tag visible) |
| `paletteCompliance` | clean (cream fill + antique gold outline, no pure white) |
| `consistencyAcrossShopLine` | match |
| `verdict` | **ship** |
| `verdictReason` | Collegiate HOODLUMS COUNTRY CLUB with "Live Each Day Like It's Your Last" tag — cream-and-gold on Pepper, clean palette, correct garment, correct placement. |

**Note:** Includes a small italic tagline ("Live Each Day Like It's Your Last") that isn't in the spec description but is on-brand and doesn't conflict — leave it.

---

## 3. OG Logo Tee — `public/images/products/printful/tee-og-logo.jpg`

Spec (mock-data.ts): "Garment-dyed heavyweight black tee (Comfort Colors 1717). Stacked cream-gold HOODLUMS COUNTRY CLUB with cracked vintage print texture."

| Field | Value |
|---|---|
| `showsFullGarment` | full (flat product shot, front view) |
| `whiteRectangleDefect` | none |
| `printScale` | correct (stacked lockup spans most of chest width, well-proportioned) |
| `printPlacement` | correct (centered front chest) |
| `garmentColorMatchesBrief` | match (Bonfire Black, Comfort Colors 1717 neck tag visible) |
| `paletteCompliance` | clean (cream + antique gold, cracked vintage texture, no pure white) |
| `consistencyAcrossShopLine` | match |
| `verdict` | **ship** |
| `verdictReason` | Stacked HOODLUMS / COUNTRY CLUB / EST. 2024 in cream-and-gold with cracked print texture — exactly the spec. Black Comfort Colors blank. |

---

## Summary

- **1 ship:** Vintage Crewneck — palette, placement, garment color all correct.
- **1 ship:** OG Logo Tee — palette, placement, garment color all correct.
- **1 re-render:** Crew Zip Hoodie — the biker-patch crest is printed on the FRONT, with the zipper bisecting the circular badge. Spec is unambiguous: back placement. The current mockup is unshippable as a full-zip front print on a circular crest is geometrically broken regardless of brand intent.

**Action required:** Re-render `hoodie-crew.jpg` with the crossed-shotgun + fishing-rod EST. 2024 patch on the BACK (full-back center, between shoulder blades). Front of hoodie should remain blank or carry only a small clean left-chest hit at most. Do not ship the current front-print version.

**Palette compliance across the batch:** All three mockups stay within the Bonfire Black / Creek Cream / Antique Gold range. No pure white detected. No wrong-gold (no yellow or brass tones outside the antique-gold target). Tobacco Olive is not used in this batch but is not required by any of these three specs.

**Consistency across shop line:** The two ship-grade pieces (Vintage Crewneck, OG Logo Tee) sit naturally next to other Capsule pieces — flat product shots, on-brand palette, clean centered front prints. The Crew Zip Hoodie's model-on-figure shot is fine compositionally but the artwork placement breaks the rhythm of the line.
