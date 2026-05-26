# Agent 19 — Raw Artwork PNG Transparency Audit

**Scope:** Audit the 9 raw artwork PNGs in `artwork/capsule-01/` to determine whether the "white rectangle around every print" defect observed in the existing Capsule 01 mockup JPGs is generator-side (mockups baked the white frame in) or artwork-side (source PNGs themselves have opaque white backgrounds).

**Method:**
1. Visual inspection via `Read` tool (rendered preview).
2. Programmatic inspection via PIL: dump `mode`, `size`, alpha-channel presence, and corner-pixel RGB(A) values for every file.

**Master verdict short version:** Every PNG is `RGB` (no alpha channel) with corner pixels at ~`(255,255,255)` — i.e., **opaque pure-white backgrounds**. The white-rectangle defect is **NOT** purely a generator-side issue. The source artwork itself must be re-saved (or re-rendered) with transparency before any Printful mockup can be defect-free.

---

## piece-01-back.png — Piece 01 ("Member Number 001") back panel

- **PIL:** `mode=RGB  size=(1254, 1254)  has_alpha_channel=False`
- **Corner RGB:** all corners ~`(254,254,254)` — pure white
- **transparency:** opaque-white-background
- **artworkOnlyOrIncludesGarment:** artwork-only (typographic charter crest, no garment depicted)
- **paletteCompliance:** has-pure-white (the *background* is `#FEFEFE`, which itself violates the "no pure white" capsule rule — the type-on-cream/black should be on a transparent canvas, not on a white sheet)
- **matchesBriefSpec:** match — "CHARTER MEMBER · BAD DECISIONS · GOOD TIMES · HOODLUMS · SINCE TWO THOUSAND TWENTY-FOUR · NO. 001 OF THE FIRST EDITION" all present in distressed gold-on-cream, no illustration, type-only saloon-charter energy as specified.
- **verdict:** minor-revision
- **verdictReason:** Composition is correct; background just needs to be keyed out to alpha so the print sits on the Pepper tee rather than on a white card.
- **observed:** Typographic crest matching the brief verbatim — "CHARTER MEMBER" arch, "HOODLUMS" blackletter centerpiece in gold, hairline rule, two cream serif lines beneath. The artwork itself is print-ready; only the canvas background is wrong.

---

## piece-02-front.png — Piece 02 ("Patron Saint of Bad Decisions") front

- **PIL:** `mode=RGB  size=(1024, 1536)  has_alpha_channel=False`
- **Corner RGB:** all corners ~`(253,253,253)` — pure white
- **transparency:** opaque-white-background
- **artworkOnlyOrIncludesGarment:** artwork-only (no garment, no body — santo portrait inside lasso cartouche)
- **paletteCompliance:** has-pure-white (background is `#FDFDFD`; rest of palette — gold, cream, black, bronze — looks on-spec)
- **matchesBriefSpec:** match — cowboy-skull saint head, hat-brim shadow, gold grillz, halo with radiating rays terminating in tiny silhouettes (bonfire, truck headlights, fishing hook, shotgun visible), lasso-rope oval cartouche, "PATRON SAINT" Old English arch top, "of bad decisions" script banner bottom.
- **verdict:** minor-revision
- **verdictReason:** Illustration is excellent; only the white canvas needs to become alpha.
- **observed:** Strong santo-card illustration with all key brief elements present — halo, cowboy hat with cross/gold band, bandana, grillz, rope cartouche, Old English top arch, script bottom banner. Discharge-print texture reads as specified. Background is the only problem.

---

## piece-03-back.png — Piece 03 ("Last Light, County Line") back

- **PIL:** `mode=RGB  size=(1024, 1536)  has_alpha_channel=False`
- **Corner RGB:** all corners ~`(254,254,254)` — pure white
- **transparency:** opaque-white-background
- **artworkOnlyOrIncludesGarment:** artwork-only (the scene sits inside a defined frame shape; no tie-dye garment surrounds it in the PNG)
- **paletteCompliance:** has-pure-white (background outside the framed scene is white)
- **matchesBriefSpec:** partial — most brief elements present (lifted truck on ridge, tailgate, two figures, bonfire to left, massive oak right with branches over top, power lines upper third, sunset gradient, "WHERE THE PAVEMENT ENDS" arch, "& the good times start." script). The brief specifies a **solid matte-black rectangle** containing the scene (to "defeat the tie-dye"); the rendered art uses a **scalloped/shield-shaped frame with rounded top**, not a clean rectangle. This is a meaningful deviation because the rectangular black quarantine panel was the whole technical premise of the design (the tie-dye chaos needed a hard rectangular "matte frame" — a curved shape undermines that grammar).
- **verdict:** minor-revision
- **verdictReason:** Background needs alpha **and** the scene boundary should be a true rectangle, not a scalloped Western frame, per brief.
- **observed:** Beautifully rendered sunset scene with truck/tailgate/figures/bonfire/oak/power-lines/sun. Visual hierarchy works. But the framing shape diverges from the brief's "solid matte-black rectangle" — the rendered shape is a Western shield with curved scalloped top, decorative corners, and an embellished ribbon banner.

---

## piece-04-back.png — Piece 04 ("Order of the Hoodlum") flagship back

- **PIL:** `mode=RGB  size=(1254, 1254)  has_alpha_channel=False`
- **Corner RGB:** all corners ~`(253,253,253)` — pure white
- **transparency:** opaque-white-background
- **artworkOnlyOrIncludesGarment:** artwork-only (shield crest standalone, no hoodie)
- **paletteCompliance:** has-pure-white (background); interior palette of cream/gold/forest-green/black matches brief
- **matchesBriefSpec:** match — shield silhouette with gold rope border, "COUNTRIE HOODLUMS" blackletter top, "BAD DECISIONS · GOOD TIMES" bottom, crossed longneck-bottle + horseshoe X centered in gold, gold rising-sun rays behind, skull-cowboy face above the X, "EST 2024" ribbon scroll below, four corner stars, "CAPSULE 01 · NO. 037 OF 200" sub-line. Every brief element checks.
- **verdict:** minor-revision
- **verdictReason:** Background needs alpha. Rest is on-spec.
- **observed:** The most complete brief-execution of the nine — every iconographic element listed in the brief is present and correctly arranged. Distress and halftone read as 50-washes-old. Only the white canvas blocks print-readiness.

---

## piece-05-hood.png — Piece 05 ("HOODLUMS ONLY") hood-top

- **PIL:** `mode=RGB  size=(3584, 1184)  has_alpha_channel=False`
- **Corner RGB:** all corners `(255,255,255)` — pure white
- **transparency:** opaque-white-background
- **artworkOnlyOrIncludesGarment:** artwork-only (just the lettering)
- **paletteCompliance:** has-pure-white (background); foreground gold + cream-inline-shadow reads on-spec
- **matchesBriefSpec:** match — "HOODLUMS" stacked above "ONLY" in heavy Western-gothic blackletter, antique gold with cream inline shadow lower-right, heavy distress, horizontal layout proportions consistent with the brief's "4" tall × 11" wide" hood-crown placement.
- **verdict:** minor-revision
- **verdictReason:** Background needs alpha. Letterforms and palette are clean.
- **observed:** Clean two-line blackletter wordmark in distressed antique gold with cream inline. Slight downward arc (per spec) is more subtle than the brief implies but acceptable. Only the white background is wrong.

---

## piece-06-front.png — Piece 06 ("The Quiet Hoodlum") chest icon

- **PIL:** `mode=RGB  size=(1254, 1254)  has_alpha_channel=False`
- **Corner RGB:** all corners ~`(254,254,254)` — pure white
- **transparency:** opaque-white-background
- **artworkOnlyOrIncludesGarment:** artwork-only (head-only mascot, no garment)
- **paletteCompliance:** has-pure-white (background); skull + hat + bandana use brief colors (bronze/charcoal/sage/gold)
- **matchesBriefSpec:** match — skull-cowboy head ONLY (no shoulders), cowboy hat with downturned brim, bandana pulled up over jaw with two gold grillz teeth peeking above the bandana edge, hollow eye sockets, one with a gold glint, sage-green bandana, no text inside icon. All brief notes for the embroidery file are honored.
- **verdict:** minor-revision
- **verdictReason:** Background needs alpha. Iconography and color discipline are correct.
- **observed:** Tight, restrained head-only crest exactly per brief. Looks like a vintage tattoo-flash icon. The hidden-grillz-under-bandana detail is the in-group wink the brief specifies. Only the white canvas blocks print.

---

## piece-07-front.png — Piece 07 ("Chapter 01 Pocket Crest") right-chest crest

- **PIL:** `mode=RGB  size=(1696, 2528)  has_alpha_channel=False`
- **Corner RGB:** all corners ~`(253,253,253)` — pure white
- **transparency:** opaque-white-background
- **artworkOnlyOrIncludesGarment:** artwork-only (vertical shield crest, no garment)
- **paletteCompliance:** has-pure-white (background); cream-and-gold-on-charcoal palette inside the crest is on-spec
- **matchesBriefSpec:** match — vertical shield with thin double-line Western serif border, "HOODLUMS COUNTRY CLUB" curved top, "BAD DECISIONS · GOOD TIMES" curved bottom, big gold blackletter CH monogram with "01" tucked into lower-right H negative space, faint crossed shotgun + fishing rod X behind, "CHAPTER 01 · MMXXVI" ribbon banner at bottom.
- **verdict:** minor-revision
- **verdictReason:** Background needs alpha. All other brief specs are met.
- **observed:** Strong heraldic shield with proper hierarchy and on-palette inks. The crossed-X behind the monogram is appropriately subtle (rewards close look). Only the white canvas blocks print.

---

## piece-08-front.png — Piece 08 ("Club Issue No. 24") chest crest

- **PIL:** `mode=RGB  size=(2816, 1536)  has_alpha_channel=False`
- **Corner RGB:** all corners `(255,255,255)` — pure white
- **transparency:** opaque-white-background
- **artworkOnlyOrIncludesGarment:** **includes-garment-simulation** — this PNG depicts a **finished embroidered patch with three-dimensional satin-stitch border, light-and-shadow shading, and what looks like a felt backing**, plus a hand-script "No. 024" label *outside* the patch on the white background. This is a *render of the finished embroidery*, not a flat 2D embroidery file. The brief explicitly says: "Flat 2D illustration on a fully transparent background … ready for tonal embroidery on Storm tie-dye blank." The Printful embroidery pipeline expects flat vector-style art, not a photorealistic patch mockup.
- **paletteCompliance:** has-pure-white (background) AND has-other-violation — the brief specifies **bronze + charcoal thread only, tonal embroidery on tie-dye, no high contrast** so the crest "appears and disappears" against Storm dapple. This rendered patch shows cream/ivory fabric inside the patch and prominent dark grey border — i.e., the crest is high-contrast, not tonal, and is rendered as a separate cream patch instead of stitches directly into the garment.
- **matchesBriefSpec:** off — wrong file type (rendered patch, not flat 2D embroidery file), wrong fill (cream fabric interior instead of letting tie-dye show through openwork), wrong contrast (high-contrast outer ring instead of tonal-bronze-and-charcoal).
- **verdict:** re-render
- **verdictReason:** This file cannot be used for tonal embroidery on tie-dye. It needs to be regenerated as a flat 2D illustration on transparent background, with the interior negative space empty (no cream felt fill) so the tie-dye fabric shows through the openwork — which is the entire design trick.
- **observed:** A photorealistic mockup of a finished round embroidered patch sitting on a white surface, with hand-script "No. 024" beneath. Looks gorgeous as a product photo, but is the wrong artifact: Printful needs a flat ring-and-monogram vector, not a finished patch render — and the "tonal disappears-against-tie-dye" design intent has been replaced with a high-contrast cream patch.

---

## piece-09-front.png — Piece 09 ("Homecoming Crew") chest

- **PIL:** `mode=RGB  size=(1254, 1254)  has_alpha_channel=False`
- **Corner RGB:** all corners ~`(254,254,254)` — pure white
- **transparency:** opaque-white-background
- **artworkOnlyOrIncludesGarment:** artwork-only (the "24" + arched "HOODLUMS COUNTRY CLUB" lockup, no garment)
- **paletteCompliance:** has-pure-white (background); cream felt body + gold chain-stitch outline + forest-green drop shadow inside the artwork is on-spec
- **matchesBriefSpec:** match — chunky 1970s collegiate "24" in cream with antique-gold chain-stitch outline and forest-green drop shadow offset to lower-right; arched "HOODLUMS COUNTRY CLUB" in gold chain-stitch above. Reads as alumni-yearbook tackle-twill simulation per brief.
- **verdict:** minor-revision
- **verdictReason:** Background needs alpha. Composition and palette match the brief.
- **observed:** Clean collegiate "24" lockup with arched club name above. Drop-shadow direction and chain-stitch effect read correctly. Only the white canvas blocks print.

---

## SUMMARY

**Are all 9 artwork PNGs transparent and artwork-only?** **NO.**

**The original hypothesis is REFUTED.** The "white rectangle around every print" visible in the existing Capsule 01 mockup JPGs is **NOT** purely a generator-side artifact — it is baked into the source artwork itself.

**Findings:**

| # | File | Transparency | Artwork-Only | Verdict |
|---|---|---|---|---|
| 1 | piece-01-back.png | opaque-white (RGB, no alpha) | yes | minor-revision |
| 2 | piece-02-front.png | opaque-white (RGB, no alpha) | yes | minor-revision |
| 3 | piece-03-back.png | opaque-white (RGB, no alpha) | yes | minor-revision (also: frame shape diverges from brief) |
| 4 | piece-04-back.png | opaque-white (RGB, no alpha) | yes | minor-revision |
| 5 | piece-05-hood.png | opaque-white (RGB, no alpha) | yes | minor-revision |
| 6 | piece-06-front.png | opaque-white (RGB, no alpha) | yes | minor-revision |
| 7 | piece-07-front.png | opaque-white (RGB, no alpha) | yes | minor-revision |
| 8 | piece-08-front.png | opaque-white (RGB, no alpha) | **no — includes patch render** | **re-render** |
| 9 | piece-09-front.png | opaque-white (RGB, no alpha) | yes | minor-revision |

**ZERO of the 9 PNGs are saved with an alpha channel.** All are PIL `mode=RGB` (3 channels, no transparency support). Every corner pixel samples to `(252–255, 252–255, 252–255)` — i.e., opaque pure white. None of these files can be sent to Printful's mockup generator as-is and produce a clean print: every one of them will paint a literal white rectangle of the canvas onto whatever garment they're applied to.

**Severity breakdown:**

- **8 of 9 are "minor-revision":** The actual artwork inside the white canvas is correct and matches the brief well. These can be fixed in minutes per file by keying out the white in Photoshop / a background-removal tool and re-exporting as PNG with transparency. **No re-prompting or re-rendering needed.** Critical caveat: the white-key needs to be done carefully because every piece uses cream `#F5F0E1` as a print color — a naive "delete all near-white pixels" pass will eat the cream into the alpha mask and destroy the type. The fix needs an interactive mask, not a tolerance-based magic-wand.
- **1 of 9 is "re-render" (piece-08):** This PNG is fundamentally the wrong artifact — a photorealistic rendered patch instead of a flat 2D embroidery file. Even alpha-keying won't save it. It needs a re-prompt that produces a flat tonal ring-and-monogram on transparent background, with no interior felt fill so tie-dye shows through openwork.
- **1 of 9 has a secondary brief-deviation (piece-03):** The "matte-black rectangle quarantines the artwork from tie-dye chaos" design grammar is currently rendered as a scalloped Western shield, not a clean rectangle. This is a judgment call — the rendered art is beautiful and may actually work better as a piece of art, but it abandons the technical premise the brief built around tie-dye handling. Flag for product-direction decision; not a blocker for the transparency fix.

**Cost to fix:**

- **Best case (alpha-key the 8 minor-revision files only):** ~1–2 hours of careful Photoshop work, or run all 8 through a tool that masks-by-luminance with manual cleanup. Mockups can be re-run through Printful the same day.
- **Worst case (re-render piece-08 from scratch + alpha-key the rest + re-render piece-03 with rectangular frame):** ~1 day total — one Gemini Nano Banana 2 or ChatGPT image-gen session per re-render plus the masking pass.

**Decision for the program:**

The mockup-generation defect requires **both** (a) re-keying the artwork files to transparent backgrounds **and** (b) re-running Printful mockups. Re-running mockups alone will reproduce the same white-rectangle defect because the source files themselves carry the white. **This is a 1-day fix, not weeks of work** — the artwork composition does not need to be redone for 8 of 9 pieces; only the alpha channel does. Piece-08 is the one exception that needs a full re-render.
