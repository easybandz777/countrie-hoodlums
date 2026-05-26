# Agent 12 — Hats Batch 2 Audit

Audited 3 hat mockups from the HOODLUMS COUNTRY CLUB catalog against the brand brief in `src/lib/mock-data.ts`.

---

## 1. Bonfire Country Patch Hat
**File:** `public/images/products/hat-leather-bonfire-country.webp`
**Slug:** `hat-leather-bonfire-country` (prod_025)
**Brief:** Richardson 112 all-black with a laser-engraved veg-tanned leather patch — HOODLUMS COUNTRY CLUB arched at the top, a country bonfire flanked by pine silhouettes, EST. 2024 along the bottom.

| Field | Verdict |
|---|---|
| `showsFullGarment` | full |
| `whiteRectangleDefect` | none |
| `printScale` | correct |
| `printPlacement` | correct |
| `hatColorMatchesBrief` | match |
| `embellishmentAuthenticity` | looks-fake |
| `paletteCompliance` | clean |
| `consistencyWithHatLine` | inconsistent |
| `verdict` | re-render |
| `verdictReason` | Bonfire flames render in full color (orange/red/yellow), but laser-engraved veg-tan leather is monochromatic burn — breaks the established leather-patch hat line and reads as printed-on, not engraved. |

**Notes:** Front-facing shot, hat fully visible, patch is correctly positioned and well-scaled with all the brief elements present (arched lockup, bonfire, twin pines, EST. 2024). Black trucker body matches Bonfire Black `#0A0A0A`. The execution problem is purely the colored flames — the rest of the patch (lettering, pines, frame) reads as authentic laser burn. A mono-burn re-render of just the flame element fixes this.

---

## 2. Compass Heritage Patch Hat
**File:** `public/images/products/hat-leather-compass-heritage.webp`
**Slug:** `hat-leather-compass-heritage` (prod_026)
**Brief:** Richardson 112 all-black with a laser-engraved veg-tanned leather patch — an 8-point compass rose with HOODLUMS COUNTRY CLUB wrapping the outer ring and the skull-cowboy mascot at the compass center.

| Field | Verdict |
|---|---|
| `showsFullGarment` | full |
| `whiteRectangleDefect` | none |
| `printScale` | too-small |
| `printPlacement` | correct |
| `hatColorMatchesBrief` | match |
| `embellishmentAuthenticity` | looks-real |
| `paletteCompliance` | clean |
| `consistencyWithHatLine` | match |
| `verdict` | re-render |
| `verdictReason` | Skull-cowboy mascot at compass center is too small to read — registers as an indistinct blob rather than the signature mascot. The compass rose itself is authentic but the focal mascot fails legibility. |

**Notes:** Three-quarter angle, full hat visible, black trucker body matches the leather-patch hat line. Patch frame, compass rose linework, and "HOODLUMS / COUNTRY CLUB" wrap-around lettering all read as legitimate laser engraving on veg-tan leather. Issue is purely scale: the mascot needs to occupy a larger share of the compass-center disc, or the compass needs an inner ring that gives the mascot more breathing room. Lifestyle background (vintage map) is a nice prop choice and on-brief.

---

## 3. Hoodlum Dad Hat
**File:** `public/images/products/hat-dad-hat.webp`
**Slug:** `hat-dad-hat` (prod_014)
**Brief:** Richardson 320 olive drab unstructured. Minimal gold skull-cowboy embroidery, brass-buckle strap back.

| Field | Verdict |
|---|---|
| `showsFullGarment` | full |
| `whiteRectangleDefect` | none |
| `printScale` | correct |
| `printPlacement` | correct |
| `hatColorMatchesBrief` | match |
| `embellishmentAuthenticity` | looks-real |
| `paletteCompliance` | clean |
| `consistencyWithHatLine` | match |
| `verdict` | ship |
| `verdictReason` | Olive drab body sits in Tobacco Olive territory as briefed, gold skull-cowboy embroidery is legible at correct dad-hat scale, no defects. |

**Notes:** Front-facing three-quarter, full hat visible including soft unstructured crown and curved bill. Color reads as Tobacco Olive `#4B5320` adjacent — proper olive drab, not black. Skull-cowboy embroidery is well-centered on the front panel, gold thread reads as Antique Gold `#C9A227`. Brass-buckle strap back not visible in this angle but not required for the front-facing mockup. Clean, on-brief, ready to ship.

---

## Summary

| Mockup | Verdict |
|---|---|
| Bonfire Country Patch Hat | **re-render** — colored flames break leather-engraving authenticity |
| Compass Heritage Patch Hat | **re-render** — center mascot too small to read |
| Hoodlum Dad Hat | **ship** — clean execution, on-brief |

**Batch verdict:** 1 ship, 2 re-render, 0 kill.

Both re-render hats have correct hat-body color, correct patch placement, correct scale of the patch frame itself, and clean palette compliance. Failures are confined to specific elements *inside* the patch artwork (flame coloration on Bonfire, mascot scale on Compass) — both fixable with targeted artwork edits without re-shooting the hat or re-positioning the patch.

The Dad Hat is the strongest of the three and the only non-leather-patch piece in the batch; it validates that the olive-drab Richardson 320 sourcing direction is on-brief.
