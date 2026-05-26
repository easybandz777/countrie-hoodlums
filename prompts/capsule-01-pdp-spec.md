# Capsule 01 — Product Detail Page (PDP) spec

> Scope: how `/shop/[slug]` should treat a piece flagged as Capsule 01. Standard MOCK_PRODUCTS items keep the current PDP; Capsule 01 pieces get a forked layout that inherits the dark, gold-rule aesthetic of `/capsule-01` and `/charter-roll`. Written as a design contract for the next implementation pass — no code in this document.

---

## TL;DR

- **Fork the PDP**: detect `product.isCapsule01 === true` server-side and render `CapsuleProductInfo` + capsule accordion stack instead of the standard right column. Keep the same `/shop/[slug]` route — capsule pieces live in the shop, they just look different once you click in.
- **Edition number is the hero metric, not a footnote.** Show a live "`047 of 200 claimed`" counter directly under the price, with the format matching the inside-neck-label stamp (`VOL. 01 / 047 of 200`). The buyer's actual stamped number is assigned at checkout and shown on the order confirmation, not on the PDP.
- **The PDP has three modes**: `preview` (pre-drop, waitlist CTA), `live` (drop window open, ADD TO CART), `closed` (sold out / wave ended, link to Charter Roll row). The mode is computed from `dropAt`, `claimed`, and `cap`.
- **All sizing data moves off the PDP file** into `src/lib/size-charts.ts` keyed by `blankBrand + blankModel`. The hardcoded S–3XL table in `page.tsx` is wrong for half the capsule and needs to go regardless of capsule shipping.
- **The Charter Roll opt-in is part of the cart line item, not the PDP.** PDP only discloses the contract ("Your name + edition number locks into the public Charter Roll"). Display-name selection + anonymize toggle live in checkout, surfaced as a required step before payment.

---

## Recommendations

### 1. Edition-number display

**Recommendation: Live "claimed" counter under the price, paired with the format that matches the physical stamp.**

```
$248                                    047 of 200 claimed
                                        VOL. 01 / 048 will be yours
```

Two-line treatment, gold accent on the numerals, kerned in the display font. The first line is the live counter (server-rendered from `claimed` field, no client polling needed — refetch on add-to-cart success). The second line previews what the buyer's stamp *would* read if they bought right now — pulled from `claimed + 1`, formatted exactly as the inside-neck-label stamp will appear (`VOL. 01 / 048 of 200`). This previews the deliverable.

The actual assigned number locks at checkout (FIFO per SKU per Charter Roll rule 01). The PDP shows a *projected* number, not a promise. Add micro-copy below the second line: *"Number locks when you check out. First to pay gets the lowest available."*

**Alternatives considered:**
- *Static "Edition of 200"*: Too quiet. The capsule's whole thesis is that the number is the proof — burying it as ad copy throws away the lever.
- *Hand-stamped only at checkout*: The buyer needs the scarcity pressure on the PDP, not three clicks deep. The checkout-only treatment kills urgency and obscures sell-through.
- *Big single counter ("47/200 SOLD")*: Too obvious. The two-line treatment (claimed count + projected stamp) does double-duty: scarcity *and* product preview. The buyer reads what their physical garment will say.

**Edge case — high-demand spikes:** Two buyers add-to-cart simultaneously and see the same projected number. That's fine. The contract is "lowest available at *checkout time*," not at "add to cart." The cart line item should display *"Number assigned at checkout"* without a specific projection to avoid setting an expectation that gets broken if the buyer drags their feet.

### 2. Capsule-specific PDP layout

**Recommendation: Three-region layout with a forked right column and a capsule-only accordion stack.**

```
┌────────────────────────────┬──────────────────────────────┐
│                            │  WAVE I  ·  COMING SOON       │
│                            │  ─────────────                │
│                            │  ORDER OF THE HOODLUM         │
│                            │  No. 4 · DIRT ROAD HEIRLOOMS  │
│      Image gallery         │                              │
│      (full-bleed,          │  $248      047 of 200 claimed │
│      no thumbnail border   │             VOL. 01 / 048 ... │
│      crop on capsule —     │                              │
│      let the cream blanks  │  [Design summary, 2-3 lines] │
│      breathe)              │                              │
│                            │  ── pull quote (ig hook) ──   │
│                            │  "Only 200 get inducted.      │
│                            │   The rest just hear about    │
│                            │   it."                        │
│                            │                              │
│                            │  Size selector (per-piece)    │
│                            │  ADD TO CART (or countdown)   │
│                            │                              │
│                            │  Linkback: ← Back to Capsule  │
│                            │  Linkback: → See Charter Roll │
└────────────────────────────┴──────────────────────────────┘

Capsule accordion stack (full width, below the fold):
  + THE PIECE          (technique, blank model, colorway, cap context)
  + FIT & SIZING       (per-piece chart from size-charts.ts)
  + FROM THE CAPSULE   (COHERENCE_RULES — the 5 rules collapsed in)
  + FULFILLMENT        (timeline + finishing studio language)
  + CHARTER ROLL       (the contract — what gets recorded, opt-in disclosure)

Related: ONLY other Capsule 01 pieces, ordered by Wave then number.
```

Specific decisions inside the layout:

- **Wave I/II label**: Top-of-column, small caps with gold rule (matches `/capsule-01` Wave section header treatment). Pair with status badge to the right (`COMING SOON` / `LIVE NOW` / `SOLD OUT` / `WAVE CLOSED`).
- **Countdown vs. live cart**: When `now < dropAt`, the ADD TO CART button is replaced by `<DropCountdown />` — a ticking `DROPS FRIDAY 7PM CT · 2d 14h 22m` block in gold with a disabled-state button below reading `WAITLIST FOR EARLY ACCESS` that links to `/capsule-01#waitlist`. When `dropAt <= now < dropAt + window`, show the live ADD TO CART. When `claimed >= cap`, replace the button with `SOLD OUT · SEE THE CHARTER ROLL` linking to that piece's roll filter.
- **`designSummary` placement**: Directly under the price block, replacing the generic `product.description`. Two- to three-line max. It's the most concrete sentence about the piece — promote it.
- **`lever` (psychology)**: Hide entirely on the PDP. This is internal sales-strategy copy ("Tribal Identity weaponized through omission"). The buyer should *feel* the lever, not read it. Putting it on the front is the brand explaining its own joke. Keep it in `capsule-01-data.ts` for editorial/PR use; don't render it.
- **`igHook` as pull quote**: Yes — large italic, antique gold rule on the left, between the description and the size selector. This *is* the brand voice and is written to be read aloud. Worth the prominence.
- **`COHERENCE_RULES` placement**: An accordion section titled `FROM THE CAPSULE`. Buyer expands it to see the 5 rules ("Hand-stamped edition number," "Antique Gold appears on every piece," etc.) — same treatment as the numbered list on `/capsule-01`, just compressed into a `<details>`. Default-collapsed; it's the *receipt* of the contract, not the pitch.
- **Linkbacks**: Two small text links at the bottom of the right column, kerned tight in gold: `← BACK TO THE CAPSULE` and `→ SEE THE CHARTER ROLL`. The capsule link returns the buyer to the lookbook; the Charter Roll link previews where their number will live.
- **Related-products carousel**: **Capsule pieces only**, ordered by Wave then number, current piece excluded. Falling back to category would mix capsule pieces with $38 OG Logo Tees and crater the price perception. The carousel should be its own section header — `MORE FROM DIRT ROAD HEIRLOOMS / VOL. 01` — not `YOU MAY ALSO LIKE`.

**Alternatives considered:**
- *Same layout, capsule fields appended*: Tempting because it's smaller diff, but the `designSummary` / pull-quote / coherence-rules treatment is fundamentally a different editorial register from the standard PDP and trying to share a single client component creates branch-heavy JSX. Cleaner to fork.
- *Capsule PDP as its own route (`/capsule-01/[slug]`)*: Considered. Rejected because the cart, checkout, and order systems already key off `/shop/[slug]` and forking the URL forks twice as much code. Fork the *component*, not the route.

### 3. Sizing for capsule

**Recommendation: Replace the hardcoded sizing table with a `src/lib/size-charts.ts` map keyed by `blankBrand + blankModel`. Move the per-piece size availability into `CapsulePiece.availableSizes` (already implied by `PRINTFUL_VARIANT_MAP`, but make it explicit on the capsule data).**

The current PDP has a hardcoded S–3XL table with hardcoded chest/length. This is wrong for at least three reasons:

1. **Sizes shown ≠ sizes orderable.** Piece 3 (Shaka SHHTDS) and Piece 8 (Champion GDS101) cap at 2XL per `PRINTFUL_VARIANT_MAP`. The PDP currently invites buyers to order 3XL of a piece that doesn't ship 3XL.
2. **Measurements differ by blank.** A Comfort Colors 1717 22" chest at L is not the same as a Lane Seven LS16001GD 22" chest at L. The blanks have different drape (1717 is boxy garment-dyed; LS16001GD is heavyweight oversized). Posting a single table across all capsule pieces lies to the buyer.
3. **Hat / accessory pieces (0a, 0b) have no S–3XL anything.** Piece 0b (pin set + member card) has size `—`. The current table is offensive to that piece.

**Where the data lives:**

- New file: `src/lib/size-charts.ts`. Export a record keyed by `${blankBrand}-${blankModel}` (e.g., `"Comfort Colors-1717"`, `"Lane Seven-LS16001GD"`) → `{ unit: "in", rows: SizeRow[] }`. One entry per unique blank across the catalog.
- `CapsulePiece` gains `availableSizes: string[]` (explicit, derived from `PRINTFUL_VARIANT_MAP` for Printful pieces; manually entered for off-platform pieces).
- For pieces with no sizing (hat, pins), `availableSizes: ["One Size"]` and the size-chart lookup returns `null` → the sizing accordion either renders a hat-circumference table (for caps) or is omitted entirely (for accessories).
- For consistency with current shop, mirror `availableSizes` into `Product.sizes` so checkout + cart don't need to special-case capsule.

**For non-capsule products**: keep the existing hardcoded table as a fallback, but ideally migrate every product to `size-charts.ts` lookup over time. The size-chart map is universally useful; only the migration scope is in question.

**Alternatives considered:**
- *Embed size chart inside `Product` directly*: Bloats every product entry with a 6-row table even though most products share the same Comfort Colors 1717 chart. Lookup-by-blank dedupes the data.
- *Pull from Printful API at build time*: Best for the long term but blocked by the off-platform pieces (Path C — LA Apparel, SOS From Texas, Champion) which don't have Printful sizing data. The blank-keyed map is the path that handles both fulfillment paths.

### 4. Fulfillment-path disclosure

**Recommendation: Yes, the buyer sees different shipping messaging — but framed as craft, not delay.**

The two paths have materially different timelines (Printful-with-finishing is roughly 5-10 business days; off-platform with hand-finishing studio is realistically 14-21 business days because the side-seam label install + hand-stamping is sequential after the blank prints). The buyer needs to know, and the brand benefits from saying it out loud.

**Two copy registers, both reading as flex:**

- **Path B (Printful + finishing)**: *"Printed and finished in our hand-stamping studio. Ships in 5–10 business days. Edition number applied before your order leaves the floor."*
- **Path C (Off-platform)**: *"Cut, sewn, and hand-finished off-platform — side-seam label installed, edition number hand-stamped, kraft hangtag tied with waxed olive cord. Ships in 14–21 business days. Worth the wait."*

The 14-21-day language is paired with the brand's existing "Built to outlast the night that earned it" register — slow because the work is real. Don't apologize, don't offer expedited (there's no expedited path for hand-finishing).

**Placement on PDP:**
- One-line teaser in the right column directly above the ADD TO CART button: *"Hand-finished. Ships in 14–21 business days."* (or 5-10 for Path B).
- Full prose in the `FULFILLMENT` accordion section.
- For Wave II pieces (which sell out fastest based on the cap structure), include in the accordion: *"Wave II pieces are hand-finished as orders are placed. The number you see at checkout is yours from the moment payment clears."*

**Alternatives considered:**
- *Same generic "5-7 business days" for both*: Lies to half the catalog and trains the buyer to be angry at week 2.
- *Tracking-number-style live updates*: Out of scope for this PDP spec; depends on fulfillment-pipeline tooling not yet built. Surface it later as a Charter-Roll-row state if needed.
- *Hide path entirely and let the order confirmation explain*: Surfacing it pre-purchase reduces refund/chargeback pressure and reinforces the artifact-not-product framing.

### 5. Charter Roll opt-in

**Recommendation: PDP discloses the contract; checkout collects the display name. Default opt-in to the Roll, but with display-name choice (legal name, first + last initial, or chosen handle — per Charter Roll Rule 04).**

Putting the display-name field on the PDP is wrong because:
- The buyer hasn't decided to commit yet — asking for their name on the product page is presumptuous.
- The name field gets in the way of the conversion-critical ADD TO CART button.
- One buyer can purchase multiple capsule pieces; the name choice should be made once at checkout, not re-entered on every PDP.

**PDP responsibility (disclosure only):**

In the `CHARTER ROLL` accordion section, render:

> When you check out, your name (or a chosen handle) locks into the Charter Roll alongside your edition number. The Roll is public for total counts; member names are visible to other charter members only. Your number is yours forever — if you return the piece, the number retires permanently.
>
> *You'll choose how you appear (full name / first + last initial / handle) at checkout.*

This is verbatim-ish from the existing `/charter-roll` rules — keep the language consistent.

**Checkout responsibility (collection):**

- Display-name picker as a required step (default selection: first name + last initial, derived from the shipping address name).
- "Make me anonymous" option = appear as `—` on public Roll, but the underlying record still keys to the buyer (for retire-on-return enforcement).
- One change permitted post-purchase via account page (per Roll Rule 04).

**Alternatives considered:**
- *Opt-in checkbox on the PDP*: Friction killer at the worst possible step. Reject.
- *Default anonymous, opt-in to be named*: Inverts the brand thesis — the Roll *is* the product. Defaulting people out of it would be like defaulting people out of receiving the hangtag.
- *No anonymize option*: Some buyers (gift recipients, low-key folks) genuinely don't want their name on a public ledger. Anonymize is necessary; making it the default is wrong.

### 6. Pre-drop state UI

**Recommendation: The PDP exists pre-drop as a preview with a countdown, an `igHook` pull quote, and a waitlist CTA — no ADD TO CART, no size selector, no cart state at all.**

Pre-drop state composition:

```
Right column:
  WAVE I · COMING SOON           [status pill in gold-on-black]
  ─────────────
  ORDER OF THE HOODLUM
  No. 4 · DIRT ROAD HEIRLOOMS

  $248                Edition of 200 · zero claimed yet
                      Drops Friday · 7pm CT

  [designSummary, 2-3 lines]

  ── pull quote (igHook) ──
  "Only 200 get inducted. The rest just hear about it."

  [DropCountdown — 2d 14h 22m]
  [WAITLIST FOR EARLY ACCESS →]   (links to /capsule-01#waitlist)

  ← Back to the Capsule
  → See the Charter Roll
```

Specific calls:

- **No size selector pre-drop.** The buyer doesn't choose a size yet; surfacing the size grid before they can act on it teases something the page can't deliver.
- **No claimed/projected number** pre-drop. Replace the counter line with *"Edition of 200 · zero claimed yet · Drops Friday 7pm CT"*. The projected stamp line returns when the drop opens.
- **DropCountdown ticks live (client component).** When the countdown hits zero, the page should re-render with the live `ADD TO CART` block. Cleanest implementation: countdown component triggers a `router.refresh()` on hitting zero so the server re-evaluates `mode = computeMode(now, dropAt, claimed, cap)`. Don't try to flip from preview to live without a re-fetch — stale cart state is a worse outcome than a 1-second flicker.
- **Waitlist CTA**: Reuse the existing `WaitlistForm` from `/capsule-01`. Decision: render the form inline on the PDP, OR send the buyer back to `/capsule-01#waitlist`. **Recommendation: link back to the capsule page**, because (a) the waitlist is one global list, not per-piece, and (b) keeping the form in one place reduces drift and form-state-confusion. The PDP CTA is a button, not an inline form.
- **Comments / engagement**: Out of scope for this spec, but the pre-drop preview is the natural surface for "X people on the waitlist for this piece" social proof if/when it exists.

**Closed state (post-sellout or post-wave-window) composition:**

```
Right column:
  WAVE I · SOLD OUT              [status pill in muted gold]
  ─────────────
  ORDER OF THE HOODLUM
  No. 4 · DIRT ROAD HEIRLOOMS

  $248                200 of 200 claimed · Wave I closed

  [designSummary]

  ── pull quote ──

  [Disabled button: SOLD OUT — NO RESTOCKS, EVER]
  [→ See your charter row]   (links to /charter-roll?piece=4)

  ← Back to the Capsule
```

The closed state is the proof. Keep the page indexable and beautiful — these PDPs become marketing pages after the drop closes, and the "200 of 200 claimed" line is the receipt of the contract.

**Alternatives considered:**
- *Single PDP with a disabled ADD TO CART pre-drop*: Less code, but the grey button trains the buyer that the page is broken. The dedicated countdown + waitlist CTA reads as intentional.
- *Inline waitlist form on every PDP*: Duplicates the form, multiplies the surface area to fix later, and creates per-piece form state when the underlying mailing list is per-capsule.

---

## New Product fields needed

**Two changes**: a few additions to the base `Product` interface, plus a new `CapsuleProduct extends Product` that adds the capsule-specific surface.

### Additions to `Product` (backward-compatible)

```ts
export interface Product {
  // ... existing fields ...

  /** Discriminator. When true, PDP renders the CapsuleProductInfo fork. */
  isCapsule01?: boolean;

  /** Optional override of the standard sizing-table lookup.
   *  Format: `${blankBrand}-${blankModel}`, e.g. "Comfort Colors-1717".
   *  Resolved against the src/lib/size-charts.ts map. */
  sizeChartKey?: string;
}
```

`isCapsule01` is the discriminator the server PDP uses to pick its component tree. Default `undefined`/`false` for the existing 30+ MOCK_PRODUCTS. Setting `true` requires the rest of the capsule fields to be populated (TypeScript discriminated union enforces this — see below).

### New `CapsuleProduct extends Product`

```ts
export type Wave = "I" | "II" | "drop-in";

export type FulfillmentPath = "printful-with-finishing" | "off-platform";

export interface CapsuleProduct extends Product {
  isCapsule01: true;

  /** Capsule piece number — "0a", "0b", "1"–"9". Mirrors CapsulePiece.number. */
  capsuleNumber: string;

  /** Which wave the piece belongs to. Drives Wave badge + drop date logic. */
  wave: Wave;

  /** ISO timestamp of the drop opening. Used by computeMode + DropCountdown. */
  dropAt: string;

  /** Total edition cap. Fixed at launch; never changes. */
  editionCap: number;

  /** Number of edition slots taken (assigned at checkout). Server-rendered;
   *  consumed by the live counter + projected-stamp preview. */
  editionClaimed: number;

  /** Number of edition slots permanently retired (returns).
   *  Public count = editionCap - retired; cap stays at 200 visually. */
  editionRetired: number;

  /** Concept name from CapsulePiece. Used in linkbacks, related, breadcrumbs. */
  conceptName: string;

  /** Two-to-three-line product description — replaces generic Product.description
   *  on the capsule PDP. From CapsulePiece.designSummary. */
  designSummary: string;

  /** The pull-quote rendered between description and size selector.
   *  From CapsulePiece.igHook. */
  igHook: string;

  /** Routes fulfillment-disclosure copy. */
  fulfillmentPath: FulfillmentPath;

  /** Blank descriptors for the FROM THE PIECE accordion and size-chart lookup. */
  blankBrand: string;
  blankModel: string;
  colorway: string;
  technique: string;

  /** Explicit available sizes for this piece. Mirrors Product.sizes but is
   *  the source of truth — Product.sizes is derived from this. Pieces without
   *  sizing use ["One Size"]; the pin set uses []. */
  availableSizes: string[];
}
```

**Discriminated-union usage** at the PDP boundary:

```ts
function isCapsuleProduct(p: Product): p is CapsuleProduct {
  return p.isCapsule01 === true;
}

// inside the PDP:
if (isCapsuleProduct(product)) {
  return <CapsuleProductInfo product={product} mode={mode} />;
}
return <ProductInfo product={product} />;
```

Note: the existing `CAPSULE_01_PIECES` in `capsule-01-data.ts` already carries most of these fields. The migration is to either (a) merge capsule pieces into `MOCK_PRODUCTS` with `isCapsule01: true` set and the additional fields populated, or (b) keep `CAPSULE_01_PIECES` separate and have `getProduct(slug)` fall through to the capsule data when no MOCK_PRODUCTS match. Option (b) is cleaner because it preserves the editorial separation (capsule data is its own narrative-shaped file with `lever`, `igHook`, etc., that the standard catalog doesn't need).

**New module: `src/lib/size-charts.ts`**

```ts
export interface SizeRow {
  size: string;
  chestIn: number;
  lengthIn: number;
  sleeveIn?: number; // long sleeves only
}

export interface SizeChart {
  unit: "in" | "cm";
  rows: SizeRow[];
  fitNote?: string; // "Runs oversized — size down for regular fit."
}

export const SIZE_CHARTS: Record<string, SizeChart> = {
  "Comfort Colors-1717": { /* ... */ },
  "Comfort Colors-1567": { /* ... */ },
  "Lane Seven-LS16001GD": { /* ... oversized fit note ... */ },
  "Independent Trading Co.-PRM4500": { /* ... */ },
  "Champion-GDS101": { /* ... */ },
  "Champion-S149": { /* ... */ },
  "AS Colour-5082": { /* ... */ },
  "Shaka Wear-SHHTDS": { /* ... */ },
  "Comfort Colors-1566": { /* ... */ },
};

export function getSizeChart(p: Product): SizeChart | null {
  const key = p.sizeChartKey 
    ?? (isCapsuleProduct(p) ? `${p.blankBrand}-${p.blankModel}` : null);
  return key ? SIZE_CHARTS[key] ?? null : null;
}
```

**New module: `src/lib/drop-mode.ts`**

```ts
export type PdpMode = "preview" | "live" | "sold-out" | "wave-closed";

export function computeMode(
  now: Date,
  dropAt: Date,
  claimed: number,
  cap: number,
  waveEndAt?: Date
): PdpMode {
  if (now < dropAt) return "preview";
  if (claimed >= cap) return "sold-out";
  if (waveEndAt && now > waveEndAt) return "wave-closed";
  return "live";
}
```

The mode is computed in the server component (`src/app/shop/[slug]/page.tsx`) and passed into `CapsuleProductInfo` so the right column knows whether to render countdown, ADD TO CART, or sold-out state.

---

## Implementation pointers

The following files change. None of this is code in this spec — pointer only.

- `src/lib/mock-data.ts` — extend `Product` with `isCapsule01?` and `sizeChartKey?`. Do not migrate capsule pieces in here; keep them in their own file.
- `src/lib/capsule-01-data.ts` — promote `CapsulePiece` to `CapsuleProduct` shape (add `slug`, `editionClaimed`, `editionRetired`, `dropAt`, `availableSizes`, mirror Product fields like `id`, `name`, `price`, `image`, `cartoonImage`, `isNew`, `isSoldOut`). Add a `getCapsuleBySlug(slug)` helper.
- `src/app/shop/[slug]/page.tsx` — modify `getProduct(slug)` to also check `CAPSULE_01_PIECES`. After resolving the product, check `isCapsule01` and branch the right-column render to either the existing `ProductInfo` or a new `CapsuleProductInfo`. Replace the hardcoded sizing accordion with a `<SizingAccordion product={product} />` that reads from `size-charts.ts`. For capsule products, append the additional accordion sections: `THE PIECE`, `FROM THE CAPSULE`, `FULFILLMENT`, `CHARTER ROLL`. Replace the related-products query with capsule-only filter when `isCapsule01`.
- `src/app/shop/[slug]/product-info.tsx` — leave as-is. This is the standard PDP right column.
- `src/app/shop/[slug]/capsule-product-info.tsx` (new) — the forked right column. Takes `product: CapsuleProduct` and `mode: PdpMode`. Renders the layout described in Recommendation 2, with conditional ADD TO CART / DropCountdown / SOLD OUT block based on mode.
- `src/app/shop/[slug]/drop-countdown.tsx` (new) — client component. Ticks down to `dropAt`, calls `router.refresh()` on zero. Reuses the gold-accent typography from `/capsule-01`.
- `src/lib/size-charts.ts` (new) — the blank-keyed size-chart map. One entry per unique blank in MOCK_PRODUCTS + CAPSULE_01_PIECES.
- `src/lib/drop-mode.ts` (new) — `computeMode` + `PdpMode` type.
- `src/components/shop/image-gallery.tsx` — minor: for capsule pieces, switch the background fill of the main image container from `bg-muted` to `bg-creek-cream` (the cream blanks need a sympathetic background; the muted grey reads as a stock-photo placeholder). Gated on a new `variant?: "default" | "capsule"` prop.
- `src/components/shop/related-products.tsx` (new — extract from page.tsx) — accepts a filter strategy (`"capsule-only"` | `"category"`). Currently this logic is inline in `page.tsx`; extracting it makes the capsule fork cleaner.

Pages NOT touched by this spec:
- `src/app/capsule-01/page.tsx` — already presents the pieces correctly. The PDP just needs to feel like a continuation.
- `src/app/charter-roll/page.tsx` — already presents the contract. The PDP links to it; the Roll page itself is not modified by this spec.
- `src/components/shop/add-to-cart.tsx`, `size-selector.tsx` — these are reusable; capsule PDP wires them up but doesn't modify them.

---

## Open questions / dependencies

The following points are blocked or partially blocked by other specs being decided first. Flag them so the implementation pass doesn't unblock them by accident with bad defaults.

1. **`dropAt` is currently nowhere in the data.** The capsule data file has `wave: "I" | "II"` but no actual timestamp. Wave I drops Friday 7pm CT; Wave II drops two Fridays later, same time. Once the drop date is fixed, populate `dropAt` per piece. Until then, the PDP cannot render the live mode at all — it'll be stuck in preview forever, which is fine for now but breaks the moment a date is set without populating the field. **Depends on: launch-date decision.**

2. **`editionClaimed` needs a real data source.** Right now this is `0` for every piece because the drop hasn't happened. Once checkout writes to the Charter Roll, `editionClaimed` becomes a derived field — likely a server-side aggregation over completed orders per SKU. The data flow (database, cache invalidation, re-render strategy) is **dependent on the checkout spec** being defined first. Until then, hardcode `editionClaimed = 0` and surface a TODO comment at the field site.

3. **`editionRetired` requires return-flow tooling.** The Charter Roll Rule 03 says returned pieces retire the number permanently. The system that flips a row's status to RETIRED is part of the order-management spec, not the PDP. **Depends on: returns + order-management spec.** For the PDP, treat `editionRetired` as read-only — display logic only needs to subtract it from `editionCap` for the "max available" math.

4. **Charter Roll display-name picker UX in checkout.** This spec defers the picker to checkout but doesn't define the field layout, validation rules (handle uniqueness? profanity filter?), or how the "change once, anytime" flow is surfaced post-purchase. **Depends on: checkout spec + account-page spec.**

5. **The "30 minutes early waitlist link" mechanic.** `/capsule-01` promises waitlist members get the link 30 minutes before public. The PDP itself doesn't enforce this — presumably the URL is publicly accessible but the ADD TO CART button is gated on a session/auth check during the early window. This is **dependent on the shop-UI spec** answering: do we have auth/sessions before the drop? Or is it an email-link mechanism where the buyer arrives at the PDP via a tokenized URL that flips the mode to live early? This spec assumes mode is purely time-based (`now >= dropAt`) and leaves the early-access mechanism out of scope.

6. **Sticky pricing across the PDP.** For long PDPs (especially Wave II flagships with full accordion stacks), the price + ADD TO CART block should probably stick on scroll past a threshold. This is a UI nicety, not a contract — **depends on shop-UI scroll-behavior decisions** being made at the shop level.

7. **Capsule pieces in `/shop` listing**. Whether capsule pieces appear in the main `/shop` index alongside the regular catalog, in a separate `/shop?filter=capsule-01` view, or are only reachable via `/capsule-01` linkthroughs. This spec assumes they're reachable at `/shop/[slug]` directly (because the URL pattern is set), but doesn't dictate listing behavior. **Depends on: shop-UI spec.**

8. **Size-chart data accuracy.** The blank-keyed size-chart map needs real measurements per blank (Comfort Colors 1717, AS Colour 5082, Lane Seven LS16001GD, etc.). Currently the spec proposes the data structure but not the values — values must come from manufacturer spec sheets, not inferred. **Depends on: someone (production team) compiling the spec sheets.**

9. **Cartoon image on capsule pieces.** The standard PDP gallery shows `[product.image, product.cartoonImage]`. Capsule pieces have premium photographic imagery (lookbook + product mockups) and the cartoon aesthetic doesn't belong on a stealth-wealth $248 hoodie. Either: (a) suppress `cartoonImage` for capsule pieces, or (b) make `cartoonImage` optional on `CapsuleProduct` and treat its presence as opt-in. **Defaults to (a) for safety**, but flag for review during the lookbook delivery — the lookbook may produce alt-views per piece that go in the gallery slot where `cartoonImage` currently sits.

---

*End of spec.*
