# Agent 05 — Golf Line Batch 1 Mockup Audit

**Scope:** 4 Hoodlums Country Club Golf Line tees (regular shop products, not Capsule 01).
**Blank:** Comfort Colors 1717, Black, garment-dyed heavyweight.
**Brief palette:** Bonfire Black `#0A0A0A`, Antique Gold `#C9A227`, Creek Cream `#F5F0E1`. No pure white.
**Date:** 2026-05-26

---

## 1. `tee-golf-crossed-clubs.jpg` — Crossed Clubs Crest Tee

| Field | Value |
|---|---|
| `showsFullGarment` | full |
| `whiteRectangleDefect` | none |
| `printScale` | correct |
| `printPlacement` | correct (front-center, chest-down) |
| `garmentColorMatchesBrief` | match |
| `paletteCompliance` | clean |
| `consistencyAcrossGolfLine` | match |
| `verdict` | ship |
| `verdictReason` | Genuine Printful Comfort Colors 1717 mockup with clean two-color print (antique gold linework, cream golf ball) directly on the fabric — no white-box defect, no rogue colors, art is well-scaled and on-axis. |

Notes: The print reads as ink-on-fabric — you can see the cotton texture come through the design and no halo/rectangle is visible around the artwork. "HOODLUMS COUNTRY CLUB" arched copy and "EST. 2024" all in spec. Golf ball is rendered in cream, not pure white. Visible Comfort Colors neck tag confirms the blank.

---

## 2. `tee-golf-skull-caddy.jpg` — Skull Caddy Tee

| Field | Value |
|---|---|
| `showsFullGarment` | full |
| `whiteRectangleDefect` | none |
| `printScale` | correct |
| `printPlacement` | correct (front-center) |
| `garmentColorMatchesBrief` | match |
| `paletteCompliance` | has-wrong-color (introduces green turf + clay-red flags — see notes) |
| `consistencyAcrossGolfLine` | match (consistent with 18th Hole which also uses red + green) |
| `verdict` | ship |
| `verdictReason` | Real Printful render, no white-rectangle defect, mascot reads clearly. The green turf and red flags are an intentional spec callout in the description, so they're an additive accent — not a brand-palette violation. |

Notes: Skull-cowboy, gold grillz teeth (visible warm tone), cream bandana/jaw, three small clay-red flags planted in a green turf patch. "BAD LIES · GOOD TIMES" arched in gold with cream fill underneath. No pure white anywhere — the cream skin tone reads warm. Green/red are scoped to spec illustration elements (turf, flags), not chrome. Comfort Colors tag visible.

One flag: the description says "three clay-red flags" — image delivers three. Mascot pose isn't a full mid-swing but more of a club-raised pose; close enough to ship.

---

## 3. `tee-golf-bad-lies.jpg` — "Bad Lies, Good Times" Tee

| Field | Value |
|---|---|
| `showsFullGarment` | full |
| `whiteRectangleDefect` | none |
| `printScale` | correct (massive stacked condensed type as specified) |
| `printPlacement` | correct |
| `garmentColorMatchesBrief` | match |
| `paletteCompliance` | clean |
| `consistencyAcrossGolfLine` | match |
| `verdict` | ship |
| `verdictReason` | Spec calls for "massive stacked condensed Western type — cream with thick antique-gold metallic outline" — that's exactly what's printed. No white-box, ink-on-fabric texture is visible, tiny clay-red flag accent in the corner is present. |

Notes: This is the strongest typographic execution of the four. The gold outline + cream fill double-print reads as the antique-gold-and-creek-cream brand pairing. The thin gold rule between BAD LIES and GOOD TIMES is clean. The small clay-red flag in the lower-right corner is present per spec. No pure white — cream is warm.

---

## 4. `tee-golf-18th-hole.jpg` — 18th Hole Tee

| Field | Value |
|---|---|
| `showsFullGarment` | full |
| `whiteRectangleDefect` | none |
| `printScale` | correct |
| `printPlacement` | correct |
| `garmentColorMatchesBrief` | match |
| `paletteCompliance` | has-wrong-color (clay-red flag + green turf are spec, but the small ball at the cup reads near-white — see notes) |
| `consistencyAcrossGolfLine` | match |
| `verdict` | re-render |
| `verdictReason` | The bone-cream golf ball at the cup is rendered too light/cool and reads as pure white against the green turf. Spec says "bone-cream ball" — needs a warmer cream pass. Everything else (clay-red pennant flag with stitched copy, gold "EST. 2024 · 18 HOLES") is in spec. |

Notes: This is the only one of the four that flirts with the pure-white violation. The golf ball in the cup is the offender — it's a tiny element but it reads white-ish rather than `#F5F0E1` cream. Otherwise: clay-red wavy pennant flag with cream "HOODLUMS COUNTRY CLUB" reversed text, green turf mound, gold lower copy. Print is ink-on-fabric (no white rectangle), placement and scale are correct. If the ball were a clear cream tone this would be a clean ship.

---

## Summary — Golf Line Batch 1 Consistency

**Overall verdict:** 3 ship, 1 re-render (cosmetic — small ball asset).

| Slug | Verdict |
|---|---|
| tee-golf-crossed-clubs | ship |
| tee-golf-skull-caddy | ship |
| tee-golf-bad-lies | ship |
| tee-golf-18th-hole | re-render (bone-cream ball reads white) |

**Golf-line consistency assessment:** Strong. All four are clearly the same product line — same Comfort Colors 1717 black blank, same Printful mockup angle and lighting, same antique-gold + creek-cream print palette, same Western-vernacular typography (arched HOODLUMS COUNTRY CLUB lockup repeats across crossed-clubs, skull-caddy, and 18th-hole). The skull-caddy and 18th-hole both introduce the clay-red + green turf accent as a deliberate "course" sub-palette — that's a feature, not inconsistency. The bad-lies tee is the pure-type expression of the same gold/cream system. Sitewide-grade output.

**White-rectangle defect check:** None of the four exhibit the white-rectangle / sticker-on-shirt defect. All prints are integrated into the garment with visible fabric texture coming through. This is what the rest of the catalog should look like.

**Pure-white violations:** Only one — the small golf ball at the cup in `tee-golf-18th-hole.jpg`. Everywhere else, the "white" elements are properly toned to creek cream `#F5F0E1`.

**Out-of-palette accents (red/green):** Present in skull-caddy and 18th-hole. These are intentional per the mock-data descriptions ("clay-red flags," "turf green") and form a coherent secondary palette within the golf line. Not flagged as a defect.

**Recommendation:** Ship 3 immediately. Send `tee-golf-18th-hole.jpg` back for a re-render with the ball recolored to warm cream `#F5F0E1` — everything else on that mockup is fine, so a localized art tweak (not a full Printful re-mock) should resolve it.
