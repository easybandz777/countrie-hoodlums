# Capsule 01 — /shop UI spec

> How the 11 DIRT ROAD HEIRLOOMS / VOL. 01 pieces should behave once they
> land in `MOCK_PRODUCTS` and start appearing alongside the standard
> Hoodlums Country Club catalog at `/shop`.
>
> Scope: shop listing only. PDPs, cart, checkout, and the Charter Roll
> registry are referenced but spec'd elsewhere.

---

## TL;DR

- **Show Capsule 01 pieces on `/shop` from T-7 onward** in a "Coming Soon"
  state with no add-to-cart, a clear `CAPSULE 01` overline, and a
  `View capsule →` CTA that deep-links to the relevant card on `/capsule-01`.
  The capsule already has its own narrative page; the shop's job is
  cross-discovery, not the whole story.
- **Differentiation is overline + treatment, not a new grid.** Capsule cards
  keep the existing aspect ratio and column behavior. The premium read comes
  from a small `CAPSULE 01 · NO. ___` overline, an antique-gold left border,
  the existing `FLAGSHIP` chip on Piece 4, and edition-count microcopy in
  the price area. No second grid system.
- **Add a single "Capsule 01" filter pill** to `ProductFilters` (sits next
  to `All / Tees / Hoodies / Hats / Accessories / Stickers`). Do **not**
  hide capsule pieces from category filters — a tee in the capsule is
  still a tee. Anyone clicking the pill gets the curated 11-piece view in
  brief-defined order (5, 0a, 1, 9, 7, 3 / 4, 6, 2, 8, 0b).
- **Three drop states (`coming-soon` / `live` / `sold-out`) live on a new
  `dropState` field on `Product`,** with `editionsRemaining`/`editionCap`
  driving the "23 of 200 left" microcopy. State transitions are
  manual-flag in mock data now; wire to Stripe webhook + Printful stock
  later. The Charter Roll buyer→number registry stays separate.
- **The 30-min waitlist gate is a server concern, not a shop visual.**
  Treat it as a Next.js route handler check (signed `?w=` token tied to
  the waitlist email) that gates the `live` state for non-waitlist
  visitors during the head-start window. The shop card UI is identical
  either way — only the click destination's response code differs.

---

## Recommended decisions

### 1. Should Capsule 01 pieces show on `/shop` at all before the drop?

**Recommendation: (b) Show with a clear `CAPSULE 01` overline and a
"Coming Soon" state, no add-to-cart, CTA jumps to `/capsule-01`.**
Begin showing T-7 (week-of-drop, aligned with the launch agent's
"daily piece reveals" cadence in the brief, T-1).

**Alternatives evaluated:**

- **(a) Don't show until live.** Cleanest, but the shop is the highest-
  trafficked surface in the funnel (every product card the brand has
  ever pushed an ad to leads here). Hiding 11 hand-numbered heirlooms
  from people already in buying mode is a missed warm-audience pass.
  Also: it makes `/shop` and `/capsule-01` feel like separate brands.
- **(c) Show only after Wave I, add Wave II later.** Half-measure. Wave II
  is the money (FLAGSHIP, Quiet Hoodlum, Patron Saint, Club Issue No. 24
  — 4 of the 5 highest-margin pieces). Sitting them out of `/shop` for
  two extra weeks throws away their pre-built scarcity narrative on the
  audience most likely to convert.

**Reasoning:**

The capsule's whole pitch is *patina, restraint, premium tier*. If a
visitor lands on `/shop` from a paid ad and sees only the standard $38
catalog tees, they have no reason to suspect a $248 hand-numbered hoodie
exists three clicks away. Surfacing the capsule pieces inside the
existing catalog grid does two things at once: (1) demonstrates range
without forcing a navigation, and (2) sets a price-anchor that makes the
standard catalog feel like the value tier instead of the only tier.

The `Coming Soon` state (no add-to-cart) protects the drop mechanic.
Click-through goes to `/capsule-01` (the storytelling page) until
T+0, at which point the same card transitions to live add-to-cart and
the click goes to the PDP. Same component, state-driven render.

---

### 2. Visual differentiation

**Recommendation:** Keep the existing card chrome, add four small
treatments. In priority order:

1. **`CAPSULE 01 · NO. 4` overline** — uppercase, tracked
   `[0.3em]`, antique-gold `#C9A227`, 10px. Sits above the product name
   inside the existing `<div className="p-4 ...">` info block. This is
   the load-bearing signal — it tells the eye "this is from the capsule"
   before anything else registers.

2. **Antique-gold 1px left border** on the card (`border-l-2
   border-l-accent/60`) — the existing card already has
   `border border-border`, so this is a quiet upgrade. Pairs with the
   existing gold hover ring (`hover:border-gold`) without competing.

3. **`FLAGSHIP` chip on Piece 4 only** — translate the existing
   `/capsule-01` page treatment directly: small antique-gold pill,
   black text, top-right corner of the image area. Mutually exclusive
   with the `NEW` chip (capsule pieces should not show `NEW` — capsule
   *is* their badge).

4. **Edition microcopy in the price block**, replacing the lone price line:

   - **Coming Soon:** "Edition of 200 · Drops Friday 7pm CT"
   - **Live:** "23 of 200 left" (red `#E66767` once count is below 25% of cap)
   - **Sold Out:** "All 200 claimed" (muted)

   Microcopy is 10px, uppercase, tracked. Sits under the bold price.
   Mirrors the `/capsule-01` `PieceCard` lower band exactly so a buyer
   sees the same number language across surfaces.

**Decisions on the longer list:**

- **Per-card edition number?** No. Edition number is assigned at
  checkout (the order matters — see "1 of 200" lore). Showing
  `NO. 047 OF 200` on the shop card implies you can pick one, which
  undermines the "numbers go out in checkout order, full stop" CS
  posture. On the PDP, show `Editions assigned in checkout order`.
- **Hand-numbered count remaining.** Yes — but as the
  edition-microcopy line described above, not a separate chip. Two
  badges on one card is graphic-tee-dump energy; capsule discipline
  says *one signal does the work.*
- **Wave I vs Wave II grouping.** Not in the default
  `featured`-sorted grid (would scatter Wave II at the bottom and read
  as "out of stock"). Surface waves only inside the capsule filter
  view as section headers — same `WaveSection` rhythm as the capsule
  page, just scaled to the shop grid.
- **Different aspect ratio.** No. Keep the existing `aspect-square`.
  Breaking the grid grid means breaking the comparison frame, and the
  point is that capsule pieces *belong on the rack* and stand out
  through quality of mark, not size of footprint.
- **Antique-gold vs gold "NEW" treatment.** The existing `NEW` badge
  uses `bg-gold text-background` (warm filled chip). Capsule pieces use
  no chip in the image area (except FLAGSHIP). Differentiation comes
  from the overline above the name. This keeps the hover state — image
  swap to cartoon, gold ring — readable for both tiers.
- **Photo → cartoon hover swap.** Capsule pieces should
  **opt out of the cartoon hover.** The capsule's emotional register is
  "heirloom / restraint / patina"; a cartoon cross-fade torpedoes that.
  When `dropState !== undefined`, render only `product.image` and skip
  the `cartoonImage` layer. Easy to gate inside `ProductCard`.

---

### 3. Filter integration

**Recommendation: Add a single `Capsule 01` pill to `ProductFilters`,
left of `All`.** Pill renders in antique gold when inactive
(`text-accent border-accent/40`) instead of the existing muted style,
so it reads as a curated collection. Active state matches the existing
gold-filled pattern.

Do **not**:

- Route to a separate `/shop/capsule-01` URL — adds a navigation
  ambiguity (`/capsule-01` is the marketing page, `/shop/capsule-01`
  would be the filtered catalog, users can't tell them apart from URL
  alone). The existing `/capsule-01` is the canonical drop page; the
  filter pill is a view, not a destination.
- Add a `Heirlooms` tag separate from `Capsule 01`. The brief locks
  this capsule as **DIRT ROAD HEIRLOOMS / VOL. 01**. "Heirlooms" alone
  is too generic and pre-sells the name for VOL. 02 differently. Use
  the literal capsule name; future capsules get future pills (`Capsule
  02`, etc.) or a collapsing `Capsules ▼` once there are more than two.

When the `Capsule 01` filter is active:

- **Header changes** from `SHOP ALL` to `CAPSULE 01 — DIRT ROAD
  HEIRLOOMS`, with a one-line subhead (`Built to outlast the night that
  earned it.`) and a `Read the full capsule →` link to `/capsule-01`.
- **Sort options** collapse to two: `Curated` (default, brief order)
  and `Wave` (groups Wave I above Wave II with a section break). Hide
  price-asc / price-desc / newest — those defeat the curatorial intent
  for this view.
- **Standard category filters** are hidden in this view (no
  `Tees / Hoodies / Hats` row). Replaced with the single pill row
  active and a single link out to `/capsule-01`.

When `All` or any standard category is active, capsule pieces of that
category appear inline with their `CAPSULE 01` overline. A user filtering
by `Hoodies` sees the standard hoodies *and* Piece 4, 5, 6, 8. This
keeps the capsule integrated, not ghettoized.

---

### 4. State machine — three states per piece

**Recommendation:** Add a `dropState` field to `Product`. Three string
literals. State lives in `mock-data.ts` (the existing source of truth)
so the shop never reaches into `capsule-01-data.ts`; capsule data stays
the marketing/spec source of truth, mock-data stays the storefront
source of truth.

```ts
// Append to Product interface in src/lib/mock-data.ts
dropState?: "coming-soon" | "live" | "sold-out";
editionCap?: number;          // e.g. 200
editionsRemaining?: number;   // e.g. 23
dropDate?: string;            // ISO; only used when dropState === "coming-soon"
capsule?: "capsule-01";       // future-proofs for VOL. 02; absence = standard catalog
waveAssignment?: "I" | "II";
isFlagship?: boolean;         // true only for Piece 4
```

**Render contract:**

| State | Card image | Image overlay | Hover swap | CTA on hover | Price block | Click goes to |
|---|---|---|---|---|---|---|
| `coming-soon` | Static product image | None | Disabled | `View capsule →` (gold) | `$248` + `Edition of 200 · Drops Fri 7pm CT` | `/capsule-01#piece-4` |
| `live` | Static product image | `LIVE` micro-chip top-left, gold dot | Disabled | `Add to cart` (gold, existing) | `$248` + `23 of 200 left` (turns red below 25%) | `/shop/[slug]` (PDP) |
| `sold-out` | Static product image, 60% opacity, slight desaturate | `SOLD OUT` chip (existing red, repurposed) | Disabled | `Join waitlist for VOL. 02` (outline) | `$248` + `All 200 claimed` (muted) | `/shop/[slug]` (PDP, read-only) |

A piece without `dropState` (standard catalog) renders exactly as today
— no behavior change for any of the existing 26 products.

**On the PDP** (`/shop/[slug]`, out of scope here but worth flagging):
PDP shows the same state but with longer-form treatment — full
COHERENCE_RULES displayed, size selector disabled in `coming-soon`,
edition-assignment-in-checkout-order explainer, link back to
`/capsule-01` and `/charter-roll`. Stripe handoff lives on PDP, not
shop card.

**Why `dropState` on `Product` instead of a flag on `CapsulePiece`:**

The shop component already imports `Product` from `mock-data.ts`. Reaching
across to `capsule-01-data.ts` adds an import dependency and creates
two sources of truth for stock. Better: when a piece is "added to
MOCK_PRODUCTS" (the user's stated trigger), it gets the capsule fields
inline. `capsule-01-data.ts` remains the marketing/spec source of
truth (waves, fulfillment paths, levers, IG hooks); `mock-data.ts`
remains the storefront source of truth (price, image, slug, stock).
The single overlap is `editionsRemaining`, and stock-state always
belongs to the storefront.

---

### 5. Waitlist-first 30-minute window

**Recommendation:** Out of scope for the shop card visuals — the card
renders identically for waitlist and public visitors during the
30-minute head-start window. The gate is server-side, implemented at
two checkpoints:

1. **`GET /shop` and `GET /shop/[slug]` route handlers** read a
   signed `?w=<token>` query param (sent in the waitlist email's drop
   link), verify against the waitlist signature, and set a
   `hcc_waitlist=<expires_at>` HTTP-only cookie if valid. The cookie
   has a 31-min TTL — covers the head-start window plus a buffer.

2. **The `dropState` value returned to the client is computed
   server-side per request:**

   ```
   if now < dropTime: "coming-soon"
   else if now < dropTime + 30min AND !waitlistCookie: "coming-soon"
   else if editionsRemaining > 0: "live"
   else: "sold-out"
   ```

This means a non-waitlist visitor at `dropTime + 5min` still sees the
card in `coming-soon` state with the existing `View capsule →` CTA.
Waitlist visitors see `live` with `Add to cart`. Same component, same
markup tree, different `dropState` value injected at the page level.

**Why not cookie/session alone:** Cookies break across devices —
someone who joined the waitlist on mobile but opens the email link on
desktop loses access. Token in URL fixes that.

**Why not "just trust the email link":** A bare link with no token is
sharable on Discord/Twitter in 90 seconds. Signed token (HMAC of email
+ drop date + secret) makes the link buyer-specific without storing
state server-side.

**Implementation pointer:** This is a Next.js server-component +
middleware concern, not a `ProductCard` concern. Spec it separately;
flag here only so the data flow into the card is understood.

---

### 6. Sold-out / live-count messaging

**Recommendation:** Single source of truth — a `editionsRemaining`
counter that lives in Postgres (or KV/Redis for hot path) and decrements
on Stripe `checkout.session.completed` webhook. Bootstrapped from
`editionCap` at drop time. **Do not pull from Printful.**

**Why not Printful's stock API:**

- Printful only fulfills Piece 7 (Path B in the brief). The other 10
  pieces are off-platform (in-house numbering / LA Apparel cut-and-sew
  / Champion specialty embroiderer / etc.). Printful stock would be
  authoritative for 1 of 11 pieces and wrong for the other 10.
- The capsule's whole point is a hard cap. Printful's stock is a
  rolling number tied to their inventory swings; it can't enforce
  "exactly 200 ever."

**Why webhook-driven counter:**

- Single integer per SKU, atomic decrement.
- Survives Printful changing capacities.
- Mirrors the in-house stamping ledger from the brief
  (`prompts/capsule-01-dirt-road-heirlooms.md`, "scan-to-ship station"
  section — every numbered piece has a paper tag scanned at pack-out).
- Public counter on PDP becomes a one-line `GET /api/edition-stock/
  [slug]` returning `{ remaining, cap, sold_out: bool }` — cached at
  the edge with 5-second revalidation. Shop card reads the same field.

**Manual override:** Yes — the operator can write `editionsRemaining`
directly in the admin (or Airtable, per the brief's "numbering ledger"
play). Useful for retiring numbers on returns (per the brief's CS
playbook: "Returns close the number"). Operator-side; not a shop
concern.

**Display tier:**

- **`> 50%` of cap remaining:** `Edition of 200` (no decrement shown
  yet — keeps the launch feeling abundant for first hour or two).
- **`25–50%` remaining:** `87 of 200 left` (muted accent gold).
- **`< 25%` remaining:** `23 of 200 left` (`#E66767` red — the
  scarcity bell).
- **`= 0`:** `All 200 claimed` muted, sold-out state engages.

The "honest sell-through counter" line from the brief sits at the
capsule-page level, not on every product card; the shop card shows
proximity, not aggregate sell-through.

---

## Implementation pointers

Files that need changes (none of which are written here):

### `src/lib/mock-data.ts`
Extend the `Product` interface with the optional capsule fields
listed under question 4. The 11 capsule pieces get appended to
`MOCK_PRODUCTS` with `dropState`, `editionCap`, `capsule:
"capsule-01"`, `waveAssignment`, and `isFlagship` set on Piece 4.
Slugs follow the existing pattern: `capsule-01-piece-1-member-001`,
`capsule-01-piece-4-order-flagship`, etc. (slug prefix locks them to
the capsule namespace for future PDP routing).

### `src/components/shop/product-card.tsx`
- Gate cartoon hover behind `!product.dropState`.
- Add overline render block above `product.name` when `dropState` is
  set. Format: `CAPSULE 01 · NO. ${piece.number}` (number sourced from
  `capsule-01-data.ts` lookup by slug, OR mirror the `pieceNumber`
  field onto the Product itself — pick whichever doesn't tangle the
  imports).
- Add antique-gold left border via `border-l-2 border-l-accent/60`
  conditional on `dropState`.
- Replace `handleAddToCart` no-op'd button with state-dependent CTA:
  - `coming-soon` → `<Link href="/capsule-01#piece-N">View capsule →</Link>`
  - `live` → existing add-to-cart
  - `sold-out` → outline link to PDP, "Sold Out" chip already exists in
    component, reuse.
- Add edition-microcopy line under price (`${editionsRemaining} of
  ${editionCap} left` formatted per the tiers in question 6).
- Add `FLAGSHIP` chip when `product.isFlagship === true`, mutually
  exclusive with `NEW`. New badge component or extend the existing
  badge block.

### `src/components/shop/product-filters.tsx`
- Prepend `"Capsule 01"` to `CATEGORIES` array.
- Update `CategoryFilter` type union.
- Style: when the active filter is `"Capsule 01"`, use
  `bg-accent text-black border-accent` for the active state, and use
  `text-accent border-accent/40` for the inactive state (so it visually
  separates from the standard category pills).

### `src/app/shop/page.tsx`
- Branch the filter logic: `if (activeFilter === "Capsule 01")` →
  `products.filter(p => p.capsule === "capsule-01")` instead of the
  category-key filter.
- When `activeFilter === "Capsule 01"`:
  - Swap the `SHOP ALL` `<h1>` for `CAPSULE 01 — DIRT ROAD HEIRLOOMS`.
  - Render the tagline subhead and `Read the full capsule →` link.
  - Reduce sort options to `Curated` (uses brief order) and `Wave`.
- Sort `Curated`: maintain explicit order from
  `[5, 0a, 1, 9, 7, 3, 4, 6, 2, 8, 0b]` (Wave I heroes first, Wave II
  after, accessory-tier bookend at end — per the brief's PDP order +
  the curatorial logic of accessory at fold-bottom).
- Sort `Wave`: section-grouped, Wave I block then Wave II block with a
  visual divider.

### `src/lib/capsule-01-data.ts`
No structural changes required. The `CapsulePiece` schema already
carries everything the spec page needs. The shop simply doesn't import
from this file at all — `mock-data.ts` is the storefront's source of
truth, this stays the marketing/spec source.

### `src/components/shop/product-grid.tsx`
No changes — the grid stays generic. If `Wave` sort is selected, the
`page.tsx` passes either a flat array (`Curated`) or a sectioned
shape; `ProductGrid` can stay flat and rely on a new sibling component
`<WaveSectionedGrid>` only if the `Wave` sort variant is implemented.
If `Wave` is dropped from MVP, no new component needed.

### New (server) — `src/app/api/edition-stock/[slug]/route.ts`
Returns `{ remaining, cap, soldOut }`. Reads from Postgres /
KV / Redis depending on infra choice. Decremented by Stripe webhook
handler at `src/app/api/stripe-webhook/route.ts` (likely already exists
— audit before adding). Edge-cached `s-maxage=5, stale-while-revalidate=10`.

### New (server) — `src/middleware.ts` or
`src/app/shop/[slug]/page.tsx` server check
Verifies the `?w=` waitlist token, sets the `hcc_waitlist` cookie,
and computes `dropState` per request. Out of scope for this UI spec
but shop card behavior depends on the computed value.

---

## Open questions

1. **Pieces 0a (Bullion CH Cap) and 0b (Pin Set + Member Card) — do
   they get individual shop cards, or is 0b bundled as a free-with-$200
   gift unwrap moment only?** The brief mentions "free-with-$200 or
   standalone" for the pin set. If standalone, both 0a and 0b appear
   on the shop grid as their own cards. If only as gift-with-purchase,
   they show only on the capsule page. Recommend: treat both as
   standalone shop cards — 0b at $24 is the cheapest entry-point to
   the Charter Roll and the brief explicitly names it a "sub-$50
   entry."

2. **PDP route — `/shop/[slug]` vs `/capsule-01/[slug]`?** The current
   shop pattern is `/shop/[slug]`. Putting capsule pieces under
   `/shop/[slug]` keeps the routing simple but means the PDP has to
   render two visual languages (standard vs capsule-tier). Putting
   them under `/capsule-01/[slug]` keeps them inside the capsule
   namespace but means a click from `/shop` jumps to a different URL
   root. Recommend `/shop/[slug]` with `dropState` gating the visual
   treatment — preserves consistent product URL conventions and
   simplifies the cart's `slug` references.

3. **Cartoon hover swap on capsule cards** — confirmed off in this
   spec, but the capsule pieces in `MOCK_PRODUCTS` will still need a
   `cartoonImage` field (it's non-optional on `Product`). Either
   relax the field to optional, or fill with the same value as
   `image` (the swap will be invisible). Recommend: relax the field
   to optional with `cartoonImage?: string`.

4. **Drop-state transitions in production** — how does
   `coming-soon → live` happen at exactly 7pm CT on Friday? Options:
   (a) cron job flips the flag in DB at the moment, (b) server
   computes `live` based on `dropDate` field at request time, (c)
   manual admin click. Option (b) is the cleanest — no race
   conditions, no operator gating — but requires `dropDate` accuracy
   to the second on every piece. Recommend (b), with (c) as
   override-in-case-of-issue. Flag for ops.

5. **Wave II pieces in `Coming Soon` state alongside live Wave I
   pieces.** Between T+0 and T+14, Wave I is `live` and Wave II is
   still `coming-soon` with `dropDate = T+14`. The shop grid would
   show a mix of live and coming-soon capsule cards. Is that the
   intended read, or should Wave II hide from `/shop` entirely until
   their own T-1? Recommend: keep them visible in `coming-soon` —
   the brief's "Wave I trains the customer base and seeds the
   lookbook on real people before the heroes drop" strategy is
   actively undermined if Wave II disappears from the catalog. The
   `coming-soon` chip on a Wave II hoodie next to a `live` Wave I tee
   is the marketing message.

6. **Sold-out behavior post-drop** — does a sold-out capsule piece
   stay on `/shop` forever (a museum piece, "this happened"), or
   does it eventually move to a `/archive` or `/vault` view? The
   brief insists on "no restocks, ever," so the answer is probably
   "leave them, faded, forever, as proof." But there's a UX tradeoff:
   after VOL. 04, the shop has 40+ sold-out cards muddying the live
   catalog. Recommend: keep them on `/shop` for 30 days post-drop,
   then move to a permanent `/vault` route. The Charter Roll links
   to the vault for each member's purchased piece. Flag for product
   decision.

7. **Mobile order in `Curated` sort.** On a 2-column phone grid, the
   eleven-piece sequence `[5, 0a, 1, 9, 7, 3, 4, 6, 2, 8, 0b]` puts
   the FLAGSHIP (Piece 4) at position 7 — below the fold by 2-3
   scrolls. Is that intentional (Wave II below the Wave I block) or
   should the FLAGSHIP get prioritized to row 1 even when other
   capsule pieces are technically Wave I? Recommend: keep the
   wave-order discipline. The capsule page already puts FLAGSHIP at
   the top of Wave II, and a shopper landing on the capsule filter
   from `/shop` is browsing for context, not impulse — wave order
   does the storytelling job. Flag for the founder's gut check.

---

*Spec written against the codebase as of 2026-05-26.
References: `src/app/shop/page.tsx`, `src/components/shop/product-card.tsx`,
`src/components/shop/product-filters.tsx`, `src/components/shop/product-grid.tsx`,
`src/lib/mock-data.ts`, `src/lib/capsule-01-data.ts`,
`src/app/capsule-01/page.tsx`, `prompts/capsule-01-dirt-road-heirlooms.md`.*
