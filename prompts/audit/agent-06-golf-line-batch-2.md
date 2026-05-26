# Agent 06 — Golf Line Batch 2 + Polo Audit

**Date:** 2026-05-26
**Scope:** 4 shop products — 3 Golf Line tees + 1 "polo" entry
**Brand palette reference:** Bonfire Black `#0A0A0A`, Antique Gold `#C9A227`, Creek Cream `#F5F0E1`. NO pure white anywhere.

---

## 1. `public/images/products/printful/tee-golf-emblem.jpg` — Country Club Emblem Tee (`prod_032`, slug `tee-golf-emblem`)

| Field | Value |
|---|---|
| `showsFullGarment` | full |
| `whiteRectangleDefect` | slight |
| `printScale` | correct |
| `printPlacement` | correct |
| `garmentColorMatchesBrief` | match |
| `paletteCompliance` | clean |
| `consistencyAcrossGolfLine` | match |
| `verdict` | ship |
| `verdictReason` | Strong Printful-style flat-lay; full Comfort Colors black tee with neck-tag visible; oval gold emblem with skull-cowboy, crossed clubs, EST. 2024, HOODLUMS / COUNTRY CLUB reads cleanly at the right chest-to-waist scale. A faint print-area rectangle outline is barely visible around the artwork (typical Printful preview artifact, not a render bug). Gold reads antique, not yellow. Cream interior of the emblem matches Creek Cream. No pure white. Ship as-is. |

**Notes:**
- Faint translucent rectangle around the print is a Printful preview ghost — call it "slight" but it does not warrant a re-render. Real Printful production output won't show this.
- Skull-cowboy black cowboy hat reads correctly against the cream emblem field.
- Comfort Colors neck label is present and legible — adds authenticity.

---

## 2. `public/images/products/printful/tee-golf-scorecard.jpg` — Vintage Scorecard Tee (`prod_034`, slug `tee-golf-scorecard`)

| Field | Value |
|---|---|
| `showsFullGarment` | full |
| `whiteRectangleDefect` | none |
| `printScale` | too-small |
| `printPlacement` | correct (centered upper-chest) but reads small |
| `garmentColorMatchesBrief` | match |
| `paletteCompliance` | has-wrong-gold |
| `consistencyAcrossGolfLine` | inconsistent |
| `verdict` | re-render |
| `verdictReason` | The scorecard panel itself is well-designed (cream parchment, 18-hole grid, HCC arched + BAD DECISIONS · GOOD TIMES bottom rule), but the typography is rendered in a dull bronze/coffee brown rather than Antique Gold `#C9A227`. Side-by-side with `tee-golf-emblem.jpg` and `tee-golf-cart-bandits.jpg` the gold reads visibly browner — breaks Golf Line consistency. Also: the scorecard rectangle is too small for the chest area, giving the tee an underprinted "tag" look instead of a hero graphic. Re-render at ~1.4x scale and shift the type color into true antique gold. |

**Notes:**
- Numbers 1–18 + "0" hole readable but the trailing "0" after 9 is awkward — likely intended as a 10-cell row that misaligns with the second row labeled 10–18. Minor design issue, not a rendering one. Worth flagging to art.
- No pure white — cream is correct.
- Tee body color, neck label, and silhouette are consistent with the emblem mockup.

---

## 3. `public/images/products/printful/tee-golf-cart-bandits.jpg` — Cart Path Bandits Tee (`prod_035`, slug `tee-golf-cart-bandits`)

| Field | Value |
|---|---|
| `showsFullGarment` | full |
| `whiteRectangleDefect` | none |
| `printScale` | correct |
| `printPlacement` | correct |
| `garmentColorMatchesBrief` | match |
| `paletteCompliance` | has-wrong-gold (green grass strip is off-palette) |
| `consistencyAcrossGolfLine` | inconsistent |
| `verdict` | re-render |
| `verdictReason` | Composition is strong — HOODLUMS COUNTRY CLUB top arc, skull-cowboy driving a cart, BAD DECISIONS · GOOD TIMES bottom arc. Gold reads as antique gold and matches the emblem tee. BUT the artwork introduces a bright green grass strip beneath the cart that isn't in the brief or in any other Golf Line piece. The brand palette is strictly black / antique gold / creek cream — no green. Green pulls the eye, cheapens the badge, and breaks visual consistency with the emblem + scorecard tees. Re-render with the grass strip removed or rendered in cream/gold tonal value only. |

**Notes:**
- Skull-cowboy mascot is on-model with the emblem version (cowboy hat, exposed jaw).
- Cart silhouette legible at thumbnail scale — good thumbnail performance once green is removed.
- Comfort Colors neck label present.

---

## 4. `public/images/products/tee-golf-mono.webp` — HCC Country Club Polo (`prod_033`, slug `polo-hcc-mono`)

| Field | Value |
|---|---|
| `showsFullGarment` | artwork-only |
| `whiteRectangleDefect` | severe (entire background is pure white) |
| `printScale` | N/A (no garment) |
| `printPlacement` | N/A (no garment) |
| `garmentColorMatchesBrief` | N/A |
| `paletteCompliance` | has-pure-white |
| `consistencyAcrossGolfLine` | inconsistent (no garment shown while every other Golf Line item shows a real tee) |
| `verdict` | kill |
| `verdictReason` | **This is not a polo mockup. It is the raw print artwork on a pure-white background.** The product page sells a $58 "HCC Country Club Polo" but the buyer sees a floating logo — no collar, no buttons, no fabric, no garment color, nothing that says "polo." This is the worst kind of mockup failure: it lies to the customer about what they're buying. The `mock-data.ts` description even confesses it: *"Currently shown with the print artwork."* The product entry has no `printfulProductId` and no `printfulColor` — so it's also not actually fulfillable through the current Printful wire-up. Pure-white background separately violates the project's no-pure-white rule. Two options: (a) pull the product from the shop until a real embroidered-polo Printful blank is wired and a true mockup is generated; (b) at minimum, place the logo on a Bonfire Black or Antique Gold polo flat-lay so the page shows a shirt. **Recommend kill until a real polo mockup exists.** |

**Notes:**
- Both `image` and `cartoonImage` point at the same `.webp` — there's no fallback to a different garment view.
- File is the smallest of the four (90 KB) and has the visual weight of a logo PNG, not a product photo.
- The HCC + crossed-clubs lockup itself is well-designed and on-brand — the artwork is fine; only its use as a product mockup is broken.

---

## Summary

| File | Verdict | One-line reason |
|---|---|---|
| `tee-golf-emblem.jpg` | **ship** | Clean Printful-style flat-lay, palette-compliant, only a faint preview-ghost rectangle. |
| `tee-golf-scorecard.jpg` | **re-render** | Type color is bronze/brown instead of antique gold + scorecard prints too small. |
| `tee-golf-cart-bandits.jpg` | **re-render** | Off-palette green grass strip breaks brand and Golf Line consistency. |
| `tee-golf-mono.webp` | **kill** | Not a polo mockup at all — pure-white background showing raw logo artwork; selling a $58 polo with no polo visible. |

**Headline issues for the Golf Line as a whole:**
1. **Color drift across the gold.** The emblem tee and cart-bandits tee land near Antique Gold `#C9A227`; the scorecard tee drifts brown. Lock the gold spec at the art stage before re-rendering scorecard.
2. **Stray green in cart-bandits** breaks the strict 3-color palette. Brief says nothing else.
3. **The polo is the single most damaging mockup on the shop.** Customers clicking through to a $58 polo product page currently see a logo on white — there is no garment to evaluate, no color to choose visually, no shape that signals "polo." This is a checkout-killer. Either gate the product behind a "Coming Soon" badge until a real Hanes/Port Authority Printful polo blank is wired, or temporarily hide it.
4. The three real golf tees share silhouette, neck label, and lighting — strong baseline consistency once the gold and green issues are fixed. The polo will need its own dedicated mockup pipeline (different garment, different Printful blank).
