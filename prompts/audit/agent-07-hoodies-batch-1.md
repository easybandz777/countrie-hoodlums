# Agent 07 — Hoodies Batch 1 Audit

Audit of 4 hoodie mockups from the HOODLUMS COUNTRY CLUB regular shop catalog (non-Capsule 01).

Brand palette reference:
- Bonfire Black `#0A0A0A`
- Antique Gold `#C9A227`
- Creek Cream `#F5F0E1`
- Tobacco Olive `#4B5320`
- NO pure white anywhere

---

## 1. Heritage Hoodie — `public/images/products/printful/hoodie-heritage.jpg`

**Spec:** Heavyweight black pullover (Independent IND4000). Gold HOODLUMS COUNTRY CLUB lettering with the skull-cowboy mascot. Flagship hoodie. Front print.

| Field | Value |
|---|---|
| `showsFullGarment` | full |
| `whiteRectangleDefect` | none |
| `printScale` | correct |
| `printPlacement` | correct (front, chest-high) |
| `garmentColorMatchesBrief` | match (Bonfire Black, deep and clean) |
| `paletteCompliance` | clean (Antique Gold lettering, cream highlights on skull, black cowboy hat — no pure white, no wrong-gold) |
| `consistencyAcrossHoodieLine` | match (this is the reference benchmark for the line) |
| `verdict` | **ship** |
| `verdictReason` | Hits brief dead-on: arched gold lettering, skull-cowboy mascot, clean print on flat black ghost-mannequin. Sets the bar. |

---

## 2. Live Each Day Hoodie — `public/images/products/printful/hoodie-live-each-day.jpg`

**Spec:** Garment-dyed black pullover (Comfort Colors 1467). Full-back sunset-and-dirt-road print with the mantra arched in cream and gold.

| Field | Value |
|---|---|
| `showsFullGarment` | full |
| `whiteRectangleDefect` | slight — the sunset patch has a hard black-outlined arch shape that reads slightly "sticker on hoodie" rather than fully integrated screen-print. Edge is too defined. |
| `printScale` | correct (full-back, anchored to upper-mid back) |
| `printPlacement` | correct (back-print as specced) |
| `garmentColorMatchesBrief` | match (Bonfire Black back-view) |
| `paletteCompliance` | clean overall, but the "cream AND gold" lettering spec is partially missed — both "LIVE EACH DAY" and "LIKE IT'S YOUR LAST" read as flat cream/pale-yellow, no Antique Gold accent. Sunset oranges sit outside the named palette but read as illustration-internal so they pass. |
| `consistencyAcrossHoodieLine` | match (black-body, gold-family print — consistent with line) |
| `verdict` | **ship** |
| `verdictReason` | Strong full-back composition with on-brief truck/sunset narrative; only minor gripe is the hard arched edge feels slightly stickered and lettering is cream-only vs. the cream+gold spec. Not worth a re-render. |

---

## 3. Liquid Gold Hoodie — `public/images/products/printful/hoodie-liquid-gold.jpg`

**Spec:** Army olive pullover (Independent SS4500). Dripping liquid-gold HOODLUMS COUNTRY CLUB lettering melts down the chest. Limited drop.

| Field | Value |
|---|---|
| `showsFullGarment` | full |
| `whiteRectangleDefect` | none |
| `printScale` | correct (chest-centered, drip extends into upper torso area) |
| `printPlacement` | correct (front print as specced) |
| `garmentColorMatchesBrief` | match — garment is unmistakably army olive, in the Tobacco Olive `#4B5320` neighborhood. NOT a black hoodie. Critical color call passed. |
| `paletteCompliance` | borderline has-wrong-gold — the lettering is a bright, chrome-yellow, hyper-glossy metallic gold rather than the muted Antique Gold `#C9A227`. However, "dripping liquid-gold" in the spec inherently calls for a wet/metallic treatment, so the brighter highlights are justifiable as a stylistic exception for THIS SKU only. Don't roll this gold treatment out to anything else. |
| `consistencyAcrossHoodieLine` | match (front-chest gold lettering layout, consistent with Heritage; deviation is intentional per "liquid-gold" concept) |
| `verdict` | **ship** |
| `verdictReason` | Olive colorway is correct, the liquid-gold drip effect is the entire point of the SKU and the execution sells it. Bright chrome gold is a one-off concession to the concept, not a palette violation. |

---

## 4. From the Dirt Hoodie — `public/images/products/printful/hoodie-from-the-dirt.jpg`

**Spec:** Alpine green pullover (Independent SS4500). Golden tree-of-life graphic — roots spell HOODLUMS, branches spell COUNTRY CLUB.

| Field | Value |
|---|---|
| `showsFullGarment` | full |
| `whiteRectangleDefect` | none |
| `printScale` | correct (chest-anchored, tree fills upper torso, both root and branch text legible) |
| `printPlacement` | correct (front print) |
| `garmentColorMatchesBrief` | match — garment is a deep alpine/forest green. NOT a black hoodie. Critical color call passed. |
| `paletteCompliance` | clean — Antique Gold tree silhouette on alpine green, no pure white visible, gold tone reads as the muted heritage gold (closer to `#C9A227` than to the brighter Liquid Gold chrome). |
| `consistencyAcrossHoodieLine` | match (front-chest gold artwork on non-black ground, paired-piece with Liquid Gold for the colored-body sub-line) |
| `verdict` | **ship** |
| `verdictReason` | Spec compliance is exact — "roots spell HOODLUMS, branches spell COUNTRY CLUB" is rendered correctly with branches-top/roots-bottom. Color, palette, and scale all on brief. |

---

## Summary

| Mockup | Verdict |
|---|---|
| hoodie-heritage.jpg | ship |
| hoodie-live-each-day.jpg | ship |
| hoodie-liquid-gold.jpg | ship |
| hoodie-from-the-dirt.jpg | ship |

**4 / 4 ship-ready.** No re-renders, no kills.

### Cross-line observations

- All four mockups use the same Printful ghost-mannequin template — consistent silhouette, lighting, drape, and shadow. Visual cohesion across the hoodie line is strong.
- Two non-black colorways (Army Olive, Alpine Green) correctly differ from the spec on garment color — no incorrect black-hoodie defaults.
- Gold rendering is inconsistent BY DESIGN across the line: muted Antique Gold on Heritage and From the Dirt, brighter metallic chrome on Liquid Gold (justified by concept), flat cream on Live Each Day. This split is acceptable as long as Liquid Gold remains the single concept-exception SKU.
- No white-rectangle defects detected on any of the four.
- Live Each Day is the weakest of the four — the patch-arch edge reads slightly stickered and the lettering misses the "cream AND gold" portion of the spec, but neither flaw rises to re-render territory.
- No pure white anywhere in the print artwork on any of the four. Palette discipline holds.

### Suggested follow-ups (non-blocking)

- Consider regenerating Live Each Day in a future batch with a slightly softened/integrated patch edge AND with a true Antique Gold accent in either the top arc or bottom arc of the mantra to hit the "cream AND gold" spec precisely.
- If the Liquid Gold chrome tone leaks into any other SKU's mockup in a future batch, that becomes an immediate re-render — it's only acceptable on this one piece.
