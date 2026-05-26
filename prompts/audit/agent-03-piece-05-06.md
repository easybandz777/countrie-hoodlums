# Agent 03 Audit — Pieces 05 & 06

**Capsule:** HOODLUMS COUNTRY CLUB / DIRT ROAD HEIRLOOMS / VOL. 01
**Auditor:** Agent 03
**Files audited:**
1. `public/images/products/capsule-01/piece-05-hoodlums-only.jpg` — Piece 05 mockup
2. `artwork/capsule-01/piece-05-hood.png` — Piece 05 hood-top artwork
3. `public/images/products/capsule-01/piece-06-quiet-hoodlum.jpg` — Piece 06 mockup
4. `artwork/capsule-01/piece-06-front.png` — Piece 06 chest artwork

---

## PIECE 05 — "HOODLUMS ONLY" (Comfort Colors 1567 Hoodie, $158)

**Brief recap:** Pepper (washed-black) pullover hoodie. The "HOODLUMS / ONLY" blackletter lockup belongs on the **HOOD TOP** — 4" tall, antique gold #B8860B with 2mm cream inline shadow, slight downward arc, only visible when hood is up. Chest carries only a tiny 2.25" circular CH members-club crest in antique gold. Back is completely clean. The entire psychology is interactive: hood-down whispers, hood-up shouts.

### Mockup — `public/images/products/capsule-01/piece-05-hoodlums-only.jpg`

| Field | Value |
|---|---|
| `showsFullGarment` | full |
| `whiteRectangleDefect` | severe |
| `printScale` | too-large |
| `printPlacement` | wrong-location |
| `garmentColorMatchesBrief` | off |
| `paletteCompliance` | has-pure-white |
| `consistencyWithCapsule` | inconsistent |
| `pngTransparency` | N/A |
| `verdict` | re-render |
| `verdictReason` | "HOODLUMS / ONLY" lockup is plastered on the CHEST inside a giant pure-white rectangle, when brief explicitly puts it on the hood crown with a small CH crest at chest; entire interactive premise of the piece is destroyed. |

**Notes:**
- The hood is shown DOWN in the photo, which means even if the print were correctly placed on the hood top, we couldn't audit that placement here. The mockup angle does not match the brief's mockup prompt (3/4 front, hood pulled fully up).
- Hoodie body color reads as warm dark olive / charcoal — Pepper washed-black should be a near-black grey with neutral undertone, not the warm-grey shown here.
- The white print background is an obvious Printful/AI artifact (PNG transparency failure baked into the mockup). It is so loud it would arguably be worse than just deleting the artwork entirely.
- There is no chest crest visible. The brief requires a 2.25" circular CH "MEMBERS CLUB" crest on the left chest as the hood-down signal — this is missing entirely.

### Hood Artwork — `artwork/capsule-01/piece-05-hood.png`

| Field | Value |
|---|---|
| `showsFullGarment` | artwork-only |
| `whiteRectangleDefect` | none |
| `printScale` | N/A |
| `printPlacement` | N/A |
| `garmentColorMatchesBrief` | N/A |
| `paletteCompliance` | clean |
| `consistencyWithCapsule` | match |
| `pngTransparency` | transparent |
| `verdict` | ship |
| `verdictReason` | Blackletter HOODLUMS / ONLY lockup in antique gold with cream offset shadow, slight downward arc, heavy 50-washes distress; reads exactly as the brief specifies. |

**Notes:**
- Type system: heavy Western-gothic blackletter, all caps, tight tracking. Matches HOOD_PROMPT.
- Color: gold body with cream inline-shadow offset lower-right — both colors look correct against palette (antique gold #B8860B + Creek Cream #F5F0E1).
- Distress: ink-starved edges, micro-cracks, halftone speckle throughout. Looks 50-washes-old as briefed.
- Layout: "HOODLUMS" larger on top, "ONLY" smaller below — correct hierarchy.
- Background is transparent (no white rectangle present in the source PNG itself). The white rectangle in the mockup is therefore a Printful generator artifact, not an artwork problem.
- This artwork is sound. The failure is purely in how it was placed/composited into the mockup.

---

## PIECE 06 — "The Quiet Hoodlum" (Lane Seven LS16001GD Oversized Hoodie, $178)

**Brief recap:** Bonfire Black (or cream Burro) oversized hoodie. The whole concept is **stealth-wealth restraint**: a TINY 1.75" bullion-stitch embroidered crest at center chest of JUST the skull's head — cowboy hat, bandana pulled up over the lower jaw so **only the top two grillz teeth peek out**, one eye socket catching a thin gold glint, no text, no shoulders, no crossed weapons. From 10 feet it reads as an abstract crest; from 2 feet you catch the grin. Micro tonal hem stamp "HOODLUMS · MMXXIV · 1 OF 200" charcoal on black. Back is completely blank. The brief warns explicitly: "the minimalist pieces (6, 8, 7) MUST stay quiet — protect them from designers who get nervous about empty space."

### Mockup — `public/images/products/capsule-01/piece-06-quiet-hoodlum.jpg`

| Field | Value |
|---|---|
| `showsFullGarment` | full |
| `whiteRectangleDefect` | severe |
| `printScale` | too-large |
| `printPlacement` | wrong-location |
| `garmentColorMatchesBrief` | off |
| `paletteCompliance` | has-pure-white |
| `consistencyWithCapsule` | inconsistent |
| `pngTransparency` | N/A |
| `verdict` | kill |
| `verdictReason` | A massive maximalist skull illustration in a pure-white rectangle dominates the chest — this is the exact opposite of the "tiny bullion-stitch crest, restraint is the flex" brief; the entire $178 price point evaporates and this piece becomes indistinguishable from a $19 Redbubble graphic hoodie. |

**Notes:**
- This is the single most important piece to get right in the capsule's stealth-wealth quadrant, and this mockup obliterates the concept. The brief literally calls out failure mode #1: "Graphic fatigue. If more than 5 of the 9 pieces have heavy front-and-back hits, the rack reads as a graphic-tee dump." This mockup turns piece 06 into another loud graphic.
- The print is roughly 8-10 inches tall in the mockup. The brief is 1.75". This is approximately 5x too large.
- The bandana sits LOW on the neck — the lower jaw and a full row of grillz are showing. Brief: "bandana pulled up over the jaw (covers grillz halfway — only top two gold teeth peek out)." The entire wink of the piece (insiders nod, civilians miss it) requires the bandana to hide most of the teeth. It doesn't.
- Garment color is tan/khaki — closer to a sandstone or camel than the spec'd Bonfire Black, and even compared to the optional Pigment Burro cream, it reads too warm/orange.
- Pure-white print background is severe and obvious. Capsule rule: "No piece uses pure white. Every 'white' is Creek Cream #F5F0E1." This violates that rule in the most visible way possible.
- This piece is positioned as the most expensive of the non-flagship/non-tie-dye lineup at $178 BECAUSE of restraint. A buyer cannot rationalize $178 for what currently looks like a generic skull-cowboy graphic hoodie. Either the mockup gets fixed or the piece itself collapses commercially.

### Chest Artwork — `artwork/capsule-01/piece-06-front.png`

| Field | Value |
|---|---|
| `showsFullGarment` | artwork-only |
| `whiteRectangleDefect` | none |
| `printScale` | N/A |
| `printPlacement` | N/A |
| `garmentColorMatchesBrief` | N/A |
| `paletteCompliance` | has-other-violation |
| `consistencyWithCapsule` | inconsistent |
| `pngTransparency` | has-white-bg |
| `verdict` | re-render |
| `verdictReason` | Illustration concept is workable but the bandana is too low (multiple grillz visible instead of just top two), the style reads as digital tattoo-flash rather than bullion-stitch embroidery reference, and the source has a white background where the brief requires transparent PNG. |

**Notes:**
- Bandana coverage: the brief is surgical — "only top two gold teeth peek out from the top edge of the bandana." This artwork shows the entire row of upper teeth plus most of the lower jaw line, with multiple grillz visible across the full grin. Wrong.
- Eye sockets: brief says one hollow, one catching a thin gold glint. This shows both sockets dark with a small star/spark in each — close, but not the asymmetric brief.
- Hat brim: brief says "downturned." This shows the classic upturned-brim cowboy hat shape. Wrong.
- Style: the illustration is a full-rendered color cartoon (think Etsy clipart). Brief calls for "Western-gothic line work, hand-drawn vintage tattoo-flash aesthetic" and the file is meant to be a reference for bullion + satin-stitch embroidery, not a finished print graphic. The current art has no way to translate cleanly to embroidery thread.
- Background: appears to be white (or a soft cream gradient), not transparent. If Printful auto-strips it the cutout will be ragged around the bandana fringe.
- Color: bandana olive is plausible against the washed sage spec; skull cream tone is slightly too warm/yellow versus Creek Cream; hatband gold reads correct.
- Even at correct scale this artwork doesn't serve the stealth-wealth thesis. It needs to be re-rendered as a tonal, line-driven crest icon suitable for embroidery — not a full-color illustrative skull.

---

## SUMMARY

| File | Verdict | One-line |
|---|---|---|
| `public/images/products/capsule-01/piece-05-hoodlums-only.jpg` | **re-render** | HOOD print pasted on CHEST inside huge white rectangle — wrong location, wrong scale, wrong everything; hood-up payoff is the whole piece and it's invisible here. |
| `artwork/capsule-01/piece-05-hood.png` | **ship** | Blackletter HOODLUMS/ONLY artwork itself is on-brief — gold + cream offset, distressed, arced, transparent bg. The artwork is fine; the mockup just used it wrong. |
| `public/images/products/capsule-01/piece-06-quiet-hoodlum.jpg` | **kill** | Maximalist skull graphic in pure-white rectangle on a tan hoodie — destroys the entire stealth-wealth thesis that justifies the $178 price; this is the loudest version of the piece that was supposed to be the quietest. |
| `artwork/capsule-01/piece-06-front.png` | **re-render** | Concept exists but bandana sits too low (full grin showing instead of just 2 teeth peeking), style is cartoon clipart not embroidery reference, and background isn't transparent. |

### Capsule-level findings

1. **Two of the four files violate the no-pure-white rule** at the mockup level — both are Printful generator artifacts where the print's transparent area renders as a solid white rectangle. This is a systemic capsule-wide problem and likely affects other pieces too. The fix is at the mockup-generation step, not the artwork.
2. **Piece 06 is the highest-priority kill in this batch.** Every other defect in this audit is a re-render — fix scale, fix placement, fix transparency, ship. Piece 06's mockup is conceptually wrong even if you fixed every technical defect: a giant chest graphic of a fully-rendered skull is the OPPOSITE piece from "the tiny stitched icon that whispers." It needs to be regenerated from scratch with a tonal, embroidery-grade, 1.75" crest at true scale.
3. **The brief's failure-mode prediction came true.** Failure mode #1 ("graphic fatigue — the minimalist pieces MUST stay quiet — protect them from designers who get nervous about empty space") is exactly what happened here. Whoever or whatever generated piece 06's mockup got nervous about empty space and filled the chest with a maximalist graphic. That is the precise failure the strategist warned against in writing.
4. **Piece 05's hood artwork is the only clean win in this batch.** Use it as the reference for what a passing artwork file looks like (transparent bg, on-palette, properly distressed, scale-appropriate composition).
