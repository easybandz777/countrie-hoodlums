# Audit — Agent 04 — Pieces 07, 08, 09

**Auditor scope:** Pieces 7 (Chapter 01 Pocket Crest crew), 8 (Club Issue No. 24 hoodie), 9 (Class of '24 Homecoming crew). Mockups + artwork PNGs.

**Reference brief:** `prompts/capsule-01-dirt-road-heirlooms.md`, sections 7–9.
**Locked palette:** Bonfire Black `#0A0A0A` · Antique Gold `#C9A227` · Creek Cream `#F5F0E1` · Tobacco Olive `#4B5320`. Pure white is forbidden anywhere in the capsule.

---

## PIECE 07 — "Chapter 01 Pocket Crest" — Comfort Colors 1566 Crewneck

### MOCKUP — `public/images/products/capsule-01/piece-07-chapter-01.jpg`

| Field | Verdict |
|---|---|
| `showsFullGarment` | full |
| `whiteRectangleDefect` | **severe** |
| `printScale` | **too-large** |
| `printPlacement` | **wrong-location** |
| `garmentColorMatchesBrief` | match (Pepper washed near-black reads correctly) |
| `paletteCompliance` | **has-pure-white** (the rectangular print panel surrounding the shield is pure `#FFFFFF`, not Creek Cream, and there's no excuse for it because the shield's own backdrop already contains cream linework) |
| `consistencyWithCapsule` | **inconsistent** |
| `pngTransparency` | N/A (mockup is JPEG composite) |
| `verdict` | **kill** |
| `verdictReason` | Catastrophic on three independent axes — centered (brief demands off-center right chest), surrounded by a pure-white rectangle, and scaled like a billboard rather than a 5.5"×4" breast-pocket crest. Nothing about this mockup is salvageable. |

**Detail notes:**
- **Placement is the headline failure.** The brief is unusually explicit: "Right chest, off-center… mirrors vintage workwear breast-pocket position… Pulling the crest 4.5" off-center breaks the symmetry the eye expects; brain registers 'this was art-directed' before it can name why." A centered hit deletes the entire design thesis. This isn't a near-miss — it's the design's whole differentiation lever, and the mockup throws it in the trash.
- **The white rectangle is severe.** A bright pure-white rectangle frames the shield on all four sides. On a "no pure white anywhere in the capsule" brief, this is the single most visible palette violation possible. Capsule failure mode #2 in the brief literally names this: *"A single piece in burgundy, navy, or pure white kills the entire capsule's coherence in the lookbook."* This is that piece.
- **Scale.** The shield reads ~10–11" tall on the garment. Brief calls for 5.5"×4". The print panel + crest together cover roughly 40% of the chest panel. Reads like a graphic tee, not the quiet breast-pocket signal the brief specifies.
- **Cream chapter ribbon banner reads cream-correct on its own, but is drowned by the surrounding white background.**
- **Consistency.** The rest of Capsule 01 (where audits exist) uses flat-lay on barnwood with proper transparent prints. This mockup uses an isolated ghost-mannequin against a flat background — different format energy, but more critically the white-rectangle defect makes the print look like a screenprint shop slammed a transfer over the chest.

### ARTWORK — `artwork/capsule-01/piece-07-front.png`

| Field | Verdict |
|---|---|
| `showsFullGarment` | artwork-only |
| `whiteRectangleDefect` | N/A (artwork itself, but see transparency) |
| `printScale` | N/A |
| `printPlacement` | N/A |
| `garmentColorMatchesBrief` | N/A |
| `paletteCompliance` | **has-pure-white** (background is `#FFFFFF`, not transparent and not Creek Cream — see below) |
| `consistencyWithCapsule` | inconsistent (because of the format problem) |
| `pngTransparency` | **has-white-bg** |
| `verdict` | **re-render** |
| `verdictReason` | The crest design itself is on-brief — shield shape, CH blackletter monogram in gold, cream outer ring text, "CHAPTER 01 · MMXXVI" banner. But the file is a JPEG (RGB, no alpha) saved with a `.png` extension on a pure-white background, which is exactly why the mockup printed a giant white rectangle on the chest. The artwork must be re-exported as a real RGBA PNG with a transparent background. |

**Detail notes:**
- File header inspection: `JPEG image data, JFIF standard 1.01… 1696x2528, components 3` — this is a JPEG masquerading as a PNG by extension. Corner pixels sample at ~`RGB(254,254,252)` / `RGB(255,255,255)` — pure white, not transparent, not Creek Cream.
- The design is otherwise solid: Western-gothic CH monogram with the small "01" tucked into the H's negative space (as specced), shield border, "HOODLUMS COUNTRY CLUB" / "BAD DECISIONS · GOOD TIMES" ring text, ribbon banner. Gold reads close to Antique Gold `#C9A227`. Distress treatment is present though slightly cleaner than "50 washes" calls for.
- Print size in pixels (1696×2528) is also short of the brief's 4500×4500. At 300 DPI that's ~5.65"×8.43" — only enough for ~5.5" print on the long axis. Border-line; would prefer the full 4500-pixel resolution for a 5.5" final at 300 DPI to leave bleed/safety.
- Re-render must (a) export as transparent RGBA PNG, (b) match 4500×4500 minimum, (c) verify gold hex hits `#C9A227` not the more orange `#B8860B` the brief uses interchangeably for the front-prompt (the brief is inconsistent here — production should standardize on the capsule-locked `#C9A227`).

---

## PIECE 08 — "Club Issue No. 24" — Champion GDS101 Reverse Weave Tie-Dye

### MOCKUP

**No mockup exists yet.** Per brief, this is one of two flagship-tier pieces ($248, 150-unit cap, most expensive blank in the capsule). Mockup must be commissioned before the audit can complete.

### ARTWORK — `artwork/capsule-01/piece-08-front.png`

| Field | Verdict |
|---|---|
| `showsFullGarment` | artwork-only |
| `whiteRectangleDefect` | N/A |
| `printScale` | N/A |
| `printPlacement` | N/A |
| `garmentColorMatchesBrief` | N/A |
| `paletteCompliance` | **has-pure-white** (background is pure `#FFFFFF`, see transparency) |
| `consistencyWithCapsule` | inconsistent (format problem) |
| `pngTransparency` | **has-white-bg** |
| `verdict` | **re-render** |
| `verdictReason` | This is the brief's most demanding piece — a tonal embroidered medallion that's supposed to "appear and disappear as fabric bunches" because the thread is *one shade off* the darkest tie-dye zones. A flat 2D illustration on a white background cannot evaluate that effect. File is also a JPEG saved as `.png` with a pure-white background — same problem as piece 07. Re-render as proper transparent RGBA PNG AND commission a tie-dye-bunched render so the tonal-thread illusion can actually be assessed. |

**Detail notes:**
- File header: `JPEG image data… 2816x1536, components 3`. Saved with `.png` extension. Pure-white corners. Not actually a PNG.
- Aspect ratio is *horizontal* (2816×1536 ≈ 1.83:1), but the brief specs a circular medallion at 3.25"×3.5" — the file dimensions don't match a circle-in-square embroidery file. The crest appears to occupy roughly the center-vertical band with a lot of horizontal whitespace. This is either a thumbnail/preview crop or it was misexported.
- Design itself reads on-brief from what I can see: ring text "HOODLUMS COUNTRY CLUB / CHARTER MEMBER · EST · MMXXIV", interlocked CH blackletter monogram, "No. 024" hairline edition mark beneath. Bronze + charcoal palette appears within range, though hard to evaluate tonal-on-tie-dye performance without the actual Storm tie-dye behind it.
- **Critical brief warning:** This medallion specifically needs to be threads "ONE SHADE OFF darkest tie-dye zones." A flat-art PNG cannot prove that. The embroidery sample needs to be rendered or photographed against actual Storm tie-dye fabric before this piece can ship.
- Same hex inconsistency note as piece 07: the brief's CHEST_PROMPT names bronze `#8C7853` and charcoal `#36454F` for thread — confirm at production that the embroidery house got those exact codes, not approximate substitutions.

---

## PIECE 09 — "Class of '24 — Homecoming Crew" — Champion S149 Reverse Weave

### MOCKUP — `public/images/products/capsule-01/piece-09-homecoming-24.jpg`

| Field | Verdict |
|---|---|
| `showsFullGarment` | full |
| `whiteRectangleDefect` | **severe** |
| `printScale` | **too-large** (the white print panel is enormous; the "24" itself is roughly scale-correct but is drowned by the surrounding white block) |
| `printPlacement` | correct (centered chest — this piece is supposed to be centered, unlike piece 07) |
| `garmentColorMatchesBrief` | **off** — garment is rendered as black/Bonfire Black, NOT forest green `#2E4A36`. Brief explicitly specs Forest Green `#2E4A36` colorway ("directly on-palette, classic small-college athletics"). Black is wrong. |
| `paletteCompliance` | **has-pure-white** (entire rectangular print panel is `#FFFFFF`) **AND has-other-violation** (wrong garment color — forest green missing from a piece named for it) |
| `consistencyWithCapsule` | **inconsistent** (see model violation below) |
| `pngTransparency` | N/A (mockup is JPEG composite) |
| `verdict` | **kill** |
| `verdictReason` | Three independent capsule-killing failures: (1) garment is black, not the specced Forest Green that's half the design's logic — the "Bonfire Hill alumni association" small-college fiction needs forest green to read; (2) severe pure-white print panel framing the tackle-twill — palette violation; (3) shown on a human male model when every other piece in the capsule is flat-lay/ghost mannequin. You called this out and you're right — even if the print quality were perfect, the model-vs-flatlay inconsistency alone breaks the lookbook grid. |

**Detail notes:**
- **Model violation.** Every other Capsule 01 mockup I've inspected (and per brief, every MOCKUP_PROMPT for pieces 1, 2, 7, 8, 9) specifies *flat-lay on weathered oak floorboards/barnwood, no model, no mannequin* — except piece 3 (tie-dye, "shown from the back on a 6'2" male model") and piece 5 (hooded model). Piece 9's brief says: *"flat lay on weathered oak floorboards, shot directly from above… No model, no mannequin."* This mockup violates the spec and is the only ghost/model render in the flat-lay group. Lookbook grid breaks immediately.
- **Wrong garment color.** Brief: *"Colorway: Forest Green (`#2E4A36` — directly on-palette, classic small-college athletics)."* Mockup: Bonfire Black. Forest Green is one of the four palette colors and is *the* color that sells the "small-college Bonfire Hill alumni" fiction — small-college athletics is forest green / maroon / navy, not black. Black makes the piece read as generic varsity merch and loses the entire collegiate nostalgia hook.
- **White rectangle.** Same defect as piece 07 — pure-white framing block where Creek Cream should be (or, more correctly, nothing at all because the artwork was supposed to be transparent). The "24" tackle-twill is supposed to *be* cream-felt against forest green; instead it's cream-felt against pure white against black, which is three layers of color all fighting.
- **Scale on the "24" itself** would be roughly correct (8.5" tall as specced) if the white panel were stripped away. But that's not the version that exists.
- **HOODLUMS COUNTRY CLUB arch** reads correctly in antique gold chain-stitch effect.
- **Back not shown** — back is half the design ("ALUMNI ASSOCIATION / Bonfire Hill / EST · MMXXIV"). Cannot audit what isn't there. Re-render needs both faces.

### ARTWORK — `artwork/capsule-01/piece-09-front.png`

| Field | Verdict |
|---|---|
| `showsFullGarment` | artwork-only |
| `whiteRectangleDefect` | N/A |
| `printScale` | N/A |
| `printPlacement` | N/A |
| `garmentColorMatchesBrief` | N/A |
| `paletteCompliance` | **has-pure-white** (background is pure `#FFFFFF`) |
| `consistencyWithCapsule` | inconsistent (format problem) |
| `pngTransparency` | **has-white-bg** |
| `verdict` | **re-render** |
| `verdictReason` | Same defect as 07 and 08 — this one is actually a PNG by format (good!) but it's saved as RGB mode with no alpha channel, on a pure-white background. The forest-green drop shadow underlay is also missing — the "24" reads cream-on-white-on-gold-outline, but the brief specs *"forest green `#2E4A36` drop shadow underlay (¼" offset bottom-right)."* That drop shadow is what gives the tackle-twill its dimensionality. Re-render must include the forest-green drop shadow AND be exported with proper alpha transparency. |

**Detail notes:**
- File: `PNG image data, 1254 x 1254, 8-bit/color RGB, non-interlaced` — real PNG format, but RGB mode (3 channels), not RGBA (4 channels). No alpha = no transparency = white-background defect on every mockup it composites into.
- 1254×1254 also undersized — brief calls for 4500×4500 at 300 DPI. At 1254 pixels, you've only got ~4" at 300 DPI for an 8.5" final, so the print would be upscaled and lose edge crispness on the chain-stitch outline.
- **Missing forest-green drop shadow.** The brief is specific: *"forest green `#2E4A36` drop shadow underlay (¼" offset bottom-right)."* I see cream felt + gold chain-stitch outline + cream-on-white. I don't see the forest green underlay. On a forest green garment that wouldn't matter as much (the shadow IS the garment), but on the wrong-color-black mockup that was used, the shadow's absence is glaring. Either way, the artwork file is missing a specced design element.
- "24" typography reads 1970s collegiate block with slab terminals — on-brief.
- "HOODLUMS COUNTRY CLUB" arch in gold chain-stitch — on-brief.

---

## SUMMARY

| Piece | Asset | Verdict | One-line reason |
|---|---|---|---|
| 07 | `public/images/products/capsule-01/piece-07-chapter-01.jpg` | **kill** | Crest is dead-center (brief demands off-center right chest), surrounded by a pure-white rectangle, scaled too large — all three of the design's discriminating moves are deleted. |
| 07 | `artwork/capsule-01/piece-07-front.png` | **re-render** | JPEG masquerading as PNG; pure-white background instead of transparent alpha. Design itself is on-brief — just needs proper RGBA export at 4500×4500. |
| 08 | (no mockup) | — | Not yet produced. Cannot audit. Commission a Storm-tie-dye flat-lay with tonal embroidery rendered against actual fabric folds. |
| 08 | `artwork/capsule-01/piece-08-front.png` | **re-render** | JPEG masquerading as PNG; pure-white background; wrong aspect ratio for a circular medallion. The "thread one shade off tie-dye" effect literally cannot be verified from a flat white-bg JPEG — must render against actual Storm tie-dye. |
| 09 | `public/images/products/capsule-01/piece-09-homecoming-24.jpg` | **kill** | Wrong garment color (black instead of specced Forest Green), pure-white print panel, and shown on a human model when the rest of the capsule is flat-lay — three independent capsule-killing failures stacked on one image. |
| 09 | `artwork/capsule-01/piece-09-front.png` | **re-render** | Real PNG but RGB mode (no alpha), pure-white background, undersized at 1254×1254, and missing the specced forest-green drop shadow underlay. |

### Overall finding

**Five of five live assets fail.** Two mockups are unsalvageable kills (07 and 09). Three artwork files share an identical underlying defect: **none of them is a proper transparent RGBA PNG.** Two are JPEGs with `.png` extensions (07, 08); one is RGB-mode PNG with no alpha channel (09). This is the root cause of the severe white-rectangle defect propagating downstream into every mockup that composites them.

**Root-cause fix before re-rendering any mockups:**
1. Re-export all three artwork files as true 32-bit RGBA PNGs (or transparent TIFFs) at 4500×4500 minimum, 300 DPI, with the canvas background actually transparent — not a white pixel layer underneath.
2. Verify alpha channel exists by checking file headers (`PNG image data… 8-bit/color RGBA` — not `RGB`).
3. Standardize on the capsule-locked Antique Gold `#C9A227` — the brief's per-piece prompts inconsistently use `#B8860B` and `#C9A227` interchangeably; production should pick one and lock it.
4. For piece 09 specifically, add the missing forest-green `#2E4A36` drop shadow underlay before re-export.

**Mockup-level fixes (after artwork is re-exported):**
- Piece 07: re-render with crest at off-center right chest, scaled to 5.5"×4", flat-lay on barnwood per MOCKUP_PROMPT.
- Piece 09: re-render on **forest green** Champion S149 (not black), as flat-lay (not on a model), and include the back panel showing the "Bonfire Hill alumni" discharge print.
- Piece 08: commission the first mockup with tonal embroidery rendered against Storm tie-dye fabric.

**Capsule-coherence risk if shipped as-is:** Brief's Failure Mode #2 — *"A single piece in burgundy, navy, or pure white kills the entire capsule's coherence in the lookbook."* Three out of nine pieces currently have a pure-white print rectangle. Rack reads as merch, not heirloom. Hard stop on all three.
