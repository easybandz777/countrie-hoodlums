# Capsule 01 — Cart / Checkout / Stripe spec

> How edition-numbered SKUs flow from "Add to Cart" through Stripe Checkout, fulfillment routing (Printful vs. off-platform), and the Charter Roll write — without ever shipping #047 to two different buyers.

> Scope: the 11 numbered pieces of DIRT ROAD HEIRLOOMS / VOL. 01 (0a, 0b, 1–9). General-catalog merch (the existing `MOCK_PRODUCTS` array in `src/lib/mock-data.ts`) is unaffected — it keeps the simple guest-checkout flow that already exists today.

---

## TL;DR

- **Edition numbers are reserved on cart-add (10-min hold) and *committed* in the Stripe `checkout.session.completed` webhook** under a per-SKU advisory lock in Neon Postgres. The reservation absorbs the race; the commit absorbs payment failure. We do **not** pre-create 200 Stripe SKUs.
- **One Postgres database (Neon, MCP already wired) is the single source of truth** for inventory counts ("47 of 200 claimed"), edition assignment, the Charter Roll, and the audit log. Stripe is the payment rail; Printful is one of two fulfillment lanes; neither owns inventory.
- **Fulfillment routes off `fulfillmentPath` on each line item** (already declared in `src/lib/capsule-01-data.ts`). The webhook fans out: `printful-with-finishing` (pieces 1, 7) goes to the existing `createDraftOrder` path with a finishing-station flag; `off-platform` (everything else) writes an ops queue row instead of calling Printful.
- **Display name + drop-timing are enforced by the `/api/checkout` route, not the cart.** A buyer can have pieces in their cart any time; the API call that creates the Stripe Session rejects until `now ≥ dropAt - 30min` (waitlist-token holders) or `now ≥ dropAt` (everyone else).
- **Returns retire the edition number** ("RETIRED — [date]" on the Charter Roll). Numbers never re-enter the pool. This is a non-negotiable from `prompts/capsule-01-dirt-road-heirlooms.md` §"Returns policy (numbered editions)".

---

## 1. Architecture diagram (text)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  SHOP / CAPSULE-01 PAGE                                                      │
│  src/app/capsule-01/page.tsx · src/components/shop/product-card.tsx          │
│                                                                              │
│  Renders 11 pieces from CAPSULE_01_PIECES (capsule-01-data.ts)               │
│  Each card shows: "47 of 200 claimed" ◄── fetched from /api/capsule/inventory│
│                   "Drops Fri 7pm CT"   ◄── from piece.dropAt (NEW field)     │
└──────────────────────────────────────────────────────────────────────────────┘
                                  │ click
                                  ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│  PDP — /capsule-01/[slug]/page.tsx (NEW route, see PDP spec)                 │
│                                                                              │
│  Shows live counter, size selector, display-name preference (initials default),
│  AddToCart button (gated on dropAt + waitlist token + ≥1 unit remaining)     │
└──────────────────────────────────────────────────────────────────────────────┘
                                  │ click "Add to Cart"
                                  ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│  CART STORE (Zustand, persisted localStorage)                                │
│  src/stores/cart-store.ts                                                    │
│                                                                              │
│  CartItem extended with: capsulePieceNumber, fulfillmentPath,                │
│                          displayNamePreference, reservationId, reservedUntil │
│                                                                              │
│  On add(): POST /api/capsule/reserve  ◄── server reserves 1 edition slot     │
│  10-min TTL · slot returns to pool if cart abandoned or quantity decremented │
└──────────────────────────────────────────────────────────────────────────────┘
                                  │ checkout click
                                  ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│  /api/checkout — src/app/api/checkout/route.ts (EXTENDS existing route)      │
│                                                                              │
│  1. Validate cart with zod (existing)                                        │
│  2. For each Capsule 01 line item:                                           │
│       - Verify reservationId still valid (not expired, not committed elsewhere)
│       - Verify piece.dropAt has passed (or waitlist token present + ≥dropAt-30m)
│       - Re-extend reservation TTL to 30 min (Stripe Checkout session lifetime)
│  3. Pull display-name preference from cart item → store on Stripe Session metadata
│  4. Build line items WITH capsule metadata (pieceNumber, reservationId, fulfillmentPath)
│  5. Call createCheckoutSession() — passes through to Stripe                  │
│                                                                              │
│  REJECTIONS: drop not open · reservation expired · cap reached · invalid waitlist
└──────────────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│  STRIPE CHECKOUT (hosted)                                                    │
│                                                                              │
│  Existing fields: shipping address, payment, email                           │
│  NEW custom field: "Display name on the Charter Roll" (text, optional)       │
│    → defaults to initials of full billing name if blank                      │
│                                                                              │
│  Session metadata carries: { capsule: "01",                                  │
│                              items: [{ pieceNumber, reservationId, ... }] } │
└──────────────────────────────────────────────────────────────────────────────┘
                                  │
                ┌─────────────────┴────────────────┐
                ▼                                  ▼
       success_url                        cancel_url
   /checkout/success                        /cart
   (page reads session                    (reservation
    via /api/checkout/session              is left intact
    — route does not exist yet)            for TTL window)
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│  STRIPE WEBHOOK — src/app/api/webhooks/stripe/route.ts (EXTENDS existing)    │
│  Event: checkout.session.completed                                           │
│                                                                              │
│  TRANSACTION (Postgres):                                                     │
│  for each capsule line item, IN A SINGLE SQL TRANSACTION:                    │
│    BEGIN                                                                     │
│      SELECT … FOR UPDATE on capsule_inventory WHERE piece_number=…           │
│      Verify reservationId matches and is unexpired                           │
│      Mutate reservation row → "committed", stamp edition_number              │
│      INSERT INTO charter_roll (edition_number, piece_number, display_name,    │
│                                stripe_session_id, ordered_at)                │
│      INSERT INTO fulfillment_queue with fulfillmentPath flag                  │
│    COMMIT                                                                    │
│                                                                              │
│  AFTER COMMIT (idempotent, retry-safe):                                      │
│    if fulfillmentPath = "printful-with-finishing":                           │
│       → existing createDraftOrder() (already in webhook today)               │
│       → ALSO insert finishing_task row (hand-stamp + side-seam label)        │
│    if fulfillmentPath = "off-platform":                                      │
│       → SKIP Printful entirely                                                │
│       → send internal ops email via Resend with fulfillment slip             │
│       → fulfillment_queue row stays "pending" until ops marks shipped         │
│                                                                              │
│  Also: send buyer confirmation email with edition number(s)                  │
└──────────────────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│  CHARTER ROLL — /charter-roll/page.tsx (EXTENDS existing static preview)     │
│                                                                              │
│  Becomes a Server Component that queries Neon:                               │
│    SELECT edition_number, piece_number, display_name, ordered_at,             │
│           status (active | retired)                                          │
│      FROM charter_roll ORDER BY piece_number, edition_number                 │
│                                                                              │
│  Public counts: "47 of 200 sold" always visible.                             │
│  Names: visible to logged-in members only (post-purchase auth cookie).       │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Decision-point summary:**

| Decision | Where it lives |
|---|---|
| Drop-time gate | `/api/checkout/route.ts` (server) — *not* the cart |
| Waitlist headstart enforcement | `/api/checkout/route.ts` — JWT or signed token compared to `dropAt - 30min` |
| Reservation create | `/api/capsule/reserve` (new) — called from `add-to-cart.tsx` |
| Reservation TTL re-extend | `/api/checkout` (on session create) |
| Edition number assignment | Stripe webhook `checkout.session.completed`, inside SQL transaction with `SELECT … FOR UPDATE` |
| Inventory count read | `/api/capsule/inventory` (cached 5s) — used by PDP and shop card |
| Fulfillment route | Webhook reads `fulfillmentPath` from line-item metadata |
| Display name capture | Stripe Checkout custom field (`type: text`, `optional: true`) |
| Charter Roll write | Webhook, same transaction as edition assignment |
| Number retirement (returns) | Admin action that updates `charter_roll.status` — never returns the number to pool |

---

## 2. Recommendations — answers to the 7 questions

### Q1 — Edition number assignment

**Recommend (a) + reservation hold:** assign the *final* edition number in the `checkout.session.completed` webhook, but use a **per-SKU advisory lock** plus an explicit `reservation` row created at cart-add time to absorb the race.

**Why not the alternatives:**
- **(b) Assign at cart-creation** — too eager. The buyer who reserves #047 but never pays leaks numbers and creates dead rows on the Charter Roll. Solvable with TTLs, but you still have the "two buyers both think they hold #047 in their cart" UX problem because Zustand is local.
- **(c) Stripe-managed inventory** — Stripe Inventory is per-SKU `available_quantity`, not "give me item #N." It can decrement a counter atomically, but it cannot *tell* you which sequential number the buyer got. You would still need a second system to assign numbers, and Stripe Inventory would only redundantly enforce the cap.
- **(d) Pre-create 200 SKUs (`piece-04-of-200-001` ... `-200`)** — works technically but creates 11 × cap = ~4,500 Stripe Products. The buyer also has to *pick* a number on the PDP, which violates the spec rule: *"Numbers are assigned in checkout order, full stop"* (`capsule-01-dirt-road-heirlooms.md` line 815). Reject.

**Why (a) with reservation + advisory lock is right:**
- Stripe webhook is the only "this payment really happened" signal. Assigning before then risks orphan numbers on `checkout.session.expired`.
- The reservation row (TTL 10 min on cart-add, extended to 30 min when Stripe Session is created) gives the buyer a "you have this slot" guarantee for the duration of the actual checkout flow without committing the number yet.
- `SELECT … FOR UPDATE` inside the webhook transaction serializes simultaneous webhooks for the same piece. The advisory lock is at the **piece** level (one lock per `piece_number`), so Piece 4 and Piece 6 checkouts run in parallel — only checkouts for the *same* piece serialize.
- Number assignment is `SELECT COALESCE(MAX(edition_number), 0) + 1 FROM charter_roll WHERE piece_number = $1 AND status = 'active'` — uses MAX, not row count, so retired numbers are skipped and never reused.

**Race conditions handled:**
- Two buyers add the last unit to cart simultaneously → reservation row uses `INSERT … ON CONFLICT DO NOTHING` against a unique partial index on `(piece_number)` where `status = 'reserved'` AND `expires_at > now()`. Second insert returns 0 rows; that buyer gets "sold out" immediately.
- Two webhooks fire near-simultaneously for the same piece (e.g., Stripe retry + delayed first) → the row update is keyed by `stripe_session_id`. Second handler sees row already committed and no-ops (idempotency).
- Buyer pays but webhook is delayed by 5 minutes (Stripe SLA is best-effort): the reservation is held for 30 min from session create, so the webhook always succeeds. If it ever doesn't, ops gets a paging alert and assigns by hand.

### Q2 — Inventory data source

**Recommend: Neon Postgres, one table (`capsule_inventory`) per piece + a derived view.**

There's already a `mcp__neon__` tool surface in this environment, and the Vercel-Neon integration is the standard low-friction path. Stripe API is too slow and rate-limited to be the source of truth for a public counter on the shop card. Printful API is irrelevant for inventory (we only push orders, never pull stock). Static JSON commits would require a redeploy on every sale — unacceptable on drop night.

**Tables (DDL sketch — DO NOT implement here, code in implementation pass):**

```
TABLE capsule_pieces (
  piece_number      text PRIMARY KEY,    -- "0a", "0b", "1"..."9"
  name              text NOT NULL,
  cap               int NOT NULL,
  retail_cents      int NOT NULL,
  fulfillment_path  text NOT NULL,       -- "printful-with-finishing" | "off-platform"
  packaging_tier    text NOT NULL,       -- "A" | "B"
  wave              text NOT NULL,       -- "I" | "II" | "drop-in"
  drop_at           timestamptz NOT NULL,
  printful_product_id int                -- nullable for off-platform
)

TABLE capsule_reservations (
  id                uuid PRIMARY KEY,
  piece_number      text REFERENCES capsule_pieces,
  size              text,                -- "S", "M", ... "OS"
  status            text NOT NULL,       -- "reserved" | "committed" | "expired" | "cancelled"
  expires_at        timestamptz NOT NULL,
  stripe_session_id text,
  display_name      text,
  created_at        timestamptz DEFAULT now()
)
-- Partial unique index keeps the cap honest during cart phase:
CREATE UNIQUE INDEX ON capsule_reservations (piece_number, edition_lock_key)
  WHERE status IN ('reserved', 'committed');
-- edition_lock_key is a generated column = id when status='reserved', 'committed-<n>' when committed

TABLE charter_roll (
  id                uuid PRIMARY KEY,
  piece_number      text REFERENCES capsule_pieces,
  edition_number    int NOT NULL,
  display_name      text NOT NULL,
  status            text NOT NULL,       -- "active" | "retired"
  ordered_at        timestamptz NOT NULL,
  retired_at        timestamptz,
  stripe_session_id text NOT NULL,
  size              text,
  buyer_email_hash  text                  -- hashed for member auth, never exposed
)
CREATE UNIQUE INDEX ON charter_roll (piece_number, edition_number);

TABLE fulfillment_queue (
  id                uuid PRIMARY KEY,
  charter_roll_id   uuid REFERENCES charter_roll,
  piece_number      text,
  fulfillment_path  text,                -- mirrors capsule_pieces.fulfillment_path
  status            text NOT NULL,       -- "pending" | "in_finishing" | "shipped" | "blocked"
  printful_order_id text,                -- nullable
  shipping_json     jsonb,
  notes             text,
  created_at        timestamptz DEFAULT now(),
  shipped_at        timestamptz
)
```

The PDP / shop card reads from a view `capsule_inventory_v` that aggregates: `cap`, `sold` (committed count), `reserved` (active reservations with future `expires_at`). Counter shows `sold` only — reservations are hidden until they commit, so the counter never goes backwards.

**Cache layer:** `/api/capsule/inventory` is `force-dynamic`, but wraps results in a 5-second in-memory cache. Drop traffic spikes are bursty within the same second; 5s of staleness on a counter is acceptable, hammering Neon at 7:00:00 CT is not.

### Q3 — Off-platform fulfillment routing

**Recommend: cart line items carry `fulfillmentPath` AS METADATA on the Stripe Product, fed into webhook line-item processing.**

The existing webhook (lines 81–107 of `src/app/api/webhooks/stripe/route.ts`) already pulls `productId` and `size` off `product.metadata`. Extending this to also carry `fulfillmentPath`, `pieceNumber`, and `reservationId` is a one-line change in `src/lib/stripe/checkout.ts` and a few lines in the webhook switch.

**Routing logic in the webhook:**

```
for each line item:
  if metadata.fulfillmentPath === "printful-with-finishing":
      → push to printfulItems[]   (existing path — Pieces 1 + 7)
      → ALSO insert fulfillment_queue row with status="in_finishing"
        (because pieces 1 + 7 still need hand-stamping after Printful prints,
         per packaging spec — they are NOT pure Printful-direct-to-customer)
  if metadata.fulfillmentPath === "off-platform":
      → SKIP Printful entirely
      → insert fulfillment_queue row with status="pending"
      → send ops fulfillment-slip email via Resend
      → ops fulfills from LA Apparel / SOS From Texas stock + hand-finishing
      → ops marks shipped via /admin route (NEW), which triggers buyer
        shipping email
```

The existing webhook's `[printful] Skipped` log path will naturally absorb off-platform line items — they're "skipped" from Printful's perspective. We just need to also write the queue row before that skip so ops sees them.

**Why not split into different Stripe products with explicit flags:** they *already* are different Stripe products (one per `piece_number × size`). The metadata flag on the existing product is the cleanest signal — no proliferation of product types.

### Q4 — Charter Roll write

**Recommend: Neon Postgres, queried by `/charter-roll` page rendered as a Server Component.**

The Charter Roll already exists as a static preview at `src/app/charter-roll/page.tsx`. Convert it from a static rows array to a Server Component that calls Neon. Cache invalidation: tag the query with `next.tags = ['charter-roll']` and call `revalidateTag('charter-roll')` from the webhook after each commit. This gives near-realtime updates without per-request DB hits on a public page.

**Why not the alternatives:**
- **Static JSON committed to repo** — requires a deploy on every sale. Hard no during a Friday-night drop.
- **Stripe customer metadata + on-demand SSR query** — Stripe's API is rate-limited at ~100 r/s. A `/charter-roll` page that lists 4,500 rows would need to scan 4,500 customer objects. Unworkable.
- **Vercel KV / Edge Config** — works but is a second data store for the same data already in Neon. Adds sync complexity for no win.

The `charter_roll` table from Q2 carries everything the page renders: edition number, display name, piece, date, status. Member auth (showing names only to logged-in buyers) uses the `buyer_email_hash` column — a buyer's session cookie carries a signed JWT whose `sub` is the same hash, and the page filters/reveals accordingly. The cookie is set by the success page after first purchase confirms.

### Q5 — Display name collection

**Recommend: Stripe Checkout custom field, optional, defaulted to initials of full billing name when blank.**

Stripe Checkout supports `custom_fields` (text/numeric/dropdown). Use a single text field labeled "Display name on the Charter Roll" with placeholder "W.B." and optional flag = true. The webhook reads `full.custom_fields[]` and stores the value on `charter_roll.display_name`; if blank, server-side derive initials from `full.customer_details.name` (`"William Beltz"` → `"W.B."`).

**Sub-recommendation:** also expose a "change handle" page at `/charter-roll/me` for logged-in members — supports the spec's rule 04 *"You can change it once, anytime"* (`capsule-01-dirt-road-heirlooms.md` line 198). This is post-launch nice-to-have, not drop-day blocking.

**Why not collect on the PDP:** the PDP is where the buyer is deciding to spend $248. Asking them to also pick a handle creates one more friction step. Stripe's custom field is shown alongside shipping/payment where the buyer is already filling in fields.

**Why not derive from email:** emails are private; many buyers use Gmail aliases. Billing name is the cleanest universal default.

### Q6 — Two-wave drop mechanics

**Recommend: server-side guard in `/api/checkout/route.ts`, keyed on `piece.dropAt` (new field on `CapsulePiece`) and a waitlist-token cookie.**

**The cart route does not gate.** A buyer can have a Capsule 01 piece in their persisted cart at any time — including before the drop. This is desirable: pre-drop traffic hovers on the PDP, and adding to cart pre-drop creates urgency. The reservation row is created on add, but the reservation is allowed to be `pre-drop` (a separate status). At drop time, pre-drop reservations re-validate.

**The checkout API gates:**
```
const waitlistToken = request.cookies.get('hcc-waitlist')?.value
const isWaitlist = waitlistToken && verifyJwt(waitlistToken).valid
const earliestAllowed = isWaitlist ? piece.dropAt - 30min : piece.dropAt

if now < earliestAllowed:
  return 403 "This piece drops at <ISO>. Check back then."
```

**What happens to a buyer who hits `/api/checkout` early:**
- `403` with the dropAt timestamp in the body
- The client (`src/app/checkout/page.tsx`) renders a "Drops at 7:00 PM CT — come back" countdown screen
- Their reservation is preserved (it's a `pre-drop` slot, expires at `dropAt + 10min`, becomes a normal reservation at `dropAt`)
- This is a feature: they came back to find what they reserved still in their cart

**Waitlist token issuance:** the existing `src/app/capsule-01/waitlist-form.tsx` already collects emails. Extend it to also write a `waitlist_signups` row in Neon. T-2 days before drop, a job emails every waitlist member a signed JWT (24-hr expiry) embedded in a unique URL. The URL sets the `hcc-waitlist` cookie on visit. Cookie carries `iss=hcc`, `exp=dropAt+24h`, signed with `WAITLIST_JWT_SECRET`.

**Drop time:** in spec is "Friday 7pm CT" — store `dropAt` as a TZ-aware ISO timestamp, not a wall-clock string. Server compares against `new Date()`. Daylight savings is *not* a concern in late October if WAVE I lands the week the spec hints at (mid-late November), but `America/Chicago` should be authoritative.

### Q7 — Packaging tier indicator

**Recommend: `packagingTier: "A" | "B"` field on `CapsulePiece`, surfaced in three places.**

The packaging cost differential ($5.03 vs. $11.92 per unit) is significant on a 4,500-unit run. The system must:

1. **PDP shows it as a feature** — for Tier B pieces, render a "Premium presentation: Arka rigid kraft box, foil monogram, cotton dust bag, letterpress reveal card" callout above the Add to Cart button. This is the buyer-facing justification for $148+ price points; hiding it leaves money on the table.
2. **Webhook routes it as a fulfillment flag** — `packagingTier` is set on Stripe product metadata; webhook copies it to `fulfillment_queue.packaging_tier`. Ops sees the tier on the pack slip.
3. **Cost accounting** — the row also drives the unit-cost calculation in the admin dashboard (existing `/admin/orders` per `.env.example` line 25). Margins per piece are tracked correctly.

**Per the spec** (lines 580–581 + the locked piece table on line 638+), tier mapping is:
- **Tier A (mailer, $5.03):** 0b, 1, 3, 7, 9
- **Tier B (rigid box, $11.92):** 0a (cap is Tier B per spec), 2, 4, 5, 6, 8

Note: the spec is slightly ambiguous about the cap (0a) — the question states "premium hoodies 2, 4, 5, 6, 8 + cap" which puts 0a in Tier B. Confirm with brand before locking, but encode Tier B as the conservative default.

**Should the buyer see the tier label?** Yes for Tier B (it's a feature). For Tier A pieces don't display tier — silence reads premium when the alternative is "TIER A SHIPPING," which screams enterprise CRM.

---

## 3. Race conditions and edge cases

### Double-buy of last edition

**Scenario:** Piece 4 has 1 unit remaining. Two buyers complete Stripe Checkout within 200 ms of each other.

**Resolution:** Both Stripe Sessions were created successfully (the reservation step on cart-add was the first guard; both buyers reserved different rows when there were still 2 slots — they each had a valid reservation). When the second webhook fires:
- It opens its transaction
- It tries to `SELECT … FOR UPDATE` on `capsule_pieces WHERE piece_number = '4'`
- The first webhook holds the lock, finishes, commits — sold count is now `cap` (200)
- Second webhook acquires the lock, checks: it has a valid reservation → commit succeeds → edition_number = 200

This is fine because the original cart-add reservation check enforced that only `cap` reservations could exist simultaneously (the partial unique index). The race was won at cart-add, not at checkout. If a third buyer tries to reserve when 200 active reservations exist, the `ON CONFLICT DO NOTHING` returns 0 rows and the front end says "sold out."

**Edge case within edge case:** what if Buyer A reserves but Buyer B is faster through Stripe Checkout? Both complete payment. Buyer A's webhook fires second.
- This is fine: the partial unique index counts both `reserved` and `committed`. So at the moment both reservations exist, the pool was already at 200/200. The third buyer never got a reservation. A and B both had legitimate slots; they both get edition numbers (one becomes 199, the other 200, in webhook arrival order).

### Refund handling

**Per spec (line 821):** "Returns close the number. When a numbered piece is returned outside a size exchange (defect, refund), that edition number retires permanently."

**Resolution:** the `charter_roll.status` flips from `active` to `retired`. The number does NOT free up. The next sale (if cap was reached) doesn't happen — caps are hard. If the cap was *not* yet reached, the next sale gets the next sequential number (MAX + 1), skipping the retired one. The Charter Roll page renders retired rows as `RETIRED · <date>`.

**Size exchanges** are explicitly NOT retirements (spec line 820). The exchange flow keeps the same `edition_number`, swaps the `size` field, and logs a note.

### Cart abandonment + edition reservation timeout

**Default TTL:** 10 minutes from cart-add. If the buyer doesn't reach `/api/checkout` within 10 min, the reservation row's `expires_at` passes; a Vercel Cron job (every 60s) sweeps `WHERE status = 'reserved' AND expires_at < now()` and flips them to `expired`. The slot returns to the pool.

**During checkout:** when `/api/checkout` is hit, the reservation is extended to 30 min (Stripe Session lifetime is configurable but defaults to 24 hours — we explicitly set a shorter window via `expires_at` on the session). If the buyer abandons mid-Stripe-Checkout, Stripe sends `checkout.session.expired` after the session lifetime; we add a handler for this event that flips the reservation to `expired`.

**Cart store cleanup:** the client-side Zustand store doesn't know the reservation expired. On `/cart` page load and on `add-to-cart` add, the client calls `/api/capsule/validate-reservations` with its current reservation IDs; the API returns which are still valid. Stale items get a "reservation expired" badge and a "Re-reserve" button.

### Payment failure mid-checkout

**Stripe behavior:** `checkout.session.completed` fires only on payment success. Failed payment (card declined) does NOT fire the success event; the buyer stays in Stripe Checkout to retry with a new card.

**Our behavior:** nothing happens server-side until success. Reservation stays alive until its TTL. If the buyer fully abandons after multiple declines, `checkout.session.expired` (or our 60s TTL sweep) returns the slot.

**Async payments (bank transfers, Klarna, etc.):** Stripe Checkout supports these; they go to `checkout.session.completed` with `payment_status: "unpaid"` and then later fire `checkout.session.async_payment_succeeded`. **Don't assign an edition number until `payment_status === 'paid'`.** Existing webhook does not currently filter on this — must add the check.

### Webhook delivery failure / retry

**Stripe retries failed webhooks for up to 72 hours.** Our handler must be idempotent. The `charter_roll` table has `UNIQUE(piece_number, edition_number)` and the webhook checks `WHERE stripe_session_id = $1` before inserting. Second delivery = no-op.

### Pre-drop traffic spike

7pm CT Friday will be the highest concurrent load this site has ever seen. The PDP needs to render without DB calls on the critical path. Use ISR with a 5-second revalidate on `/capsule-01` and `/capsule-01/[slug]`; the inventory counter hits `/api/capsule/inventory` from the client *after* paint. Cart adds hit `/api/capsule/reserve` synchronously — this is the bottleneck. Neon's serverless pooler can handle 10k+ connections; the actual constraint is the `INSERT … ON CONFLICT` round-trip latency. Co-locate the DB in `us-east-1` (Vercel default for Functions).

### Two waves, one piece per cart

The spec doesn't explicitly limit cart contents. Sensible default: a buyer can have multiple pieces in cart simultaneously, but `/api/checkout` enforces that *every* piece in the cart has had its drop time reached. So a buyer with Piece 1 (Wave I) + Piece 4 (Wave II) in their cart on Wave I's Friday gets 403 until Wave II drops. The front end should warn them at cart-load.

**Counter-recommendation:** force-clear Wave II items from cart at Wave I open until Wave II drops. Less confusing UX.

### Waitlist token forwarding / sharing

Waitlist JWTs are bearer tokens — anyone with the URL can use them. Mitigation: the JWT carries the recipient's email; the cookie set step also requires a one-time `?token=<email-validated-jwt>` exchange that issues a new short-lived cookie tied to a browser fingerprint or just the IP. Realistically for a 30-minute window, light validation is fine — even if a token leaks, you cap purchases at 1 per email anyway.

---

## 4. Implementation pointers

### Files that change

| File | Change |
|---|---|
| `src/lib/capsule-01-data.ts` | Add `dropAt: string` (ISO), `packagingTier: "A" | "B"` to each `CapsulePiece`. Wave I dropAt = `2026-11-13T19:00:00-06:00` (placeholder), Wave II = +14d. |
| `src/stores/cart-store.ts` | Extend `CartItem` with `capsulePieceNumber?: string`, `reservationId?: string`, `reservedUntil?: string`, `displayNamePreference?: string`. `addItem` for Capsule 01 items hits `/api/capsule/reserve` *before* writing to store. |
| `src/components/shop/add-to-cart.tsx` | For Capsule 01 products, call reserve API; surface "sold out" + "reservation expired" states. Existing non-capsule logic untouched. |
| `src/lib/stripe/checkout.ts` | Extend `createCheckoutSession` to: (a) accept a richer cart item shape with `pieceNumber`/`reservationId`/`fulfillmentPath`/`packagingTier`/`displayName`; (b) include those in `product_data.metadata`; (c) add `custom_fields` array with the display-name field; (d) set `expires_at` to 30 min from now. |
| `src/app/api/checkout/route.ts` | Add: validate every Capsule 01 line item's reservation, check drop time + waitlist cookie, re-extend reservation TTL. |
| `src/app/api/webhooks/stripe/route.ts` | Add transactional block for Capsule 01 items (commit reservations, write `charter_roll`, write `fulfillment_queue`). Honor `payment_status === 'paid'`. Handle `checkout.session.expired` + `checkout.session.async_payment_succeeded` + `charge.refunded`. Existing Printful logic stays for Printful-path pieces. |
| `src/app/checkout/success/page.tsx` | After the order panel, show buyer's edition numbers fetched from a new `/api/charter-roll/by-session` route. Set member auth cookie. |
| `src/app/charter-roll/page.tsx` | Convert to Server Component; pull rows from Neon; mask names for non-members. |

### New API routes

| Route | Purpose |
|---|---|
| `POST /api/capsule/reserve` | Body: `{ pieceNumber, size }`. Creates reservation row, returns `{ reservationId, expiresAt }`. |
| `POST /api/capsule/release` | Body: `{ reservationId }`. Releases reservation early (cart remove). |
| `POST /api/capsule/validate-reservations` | Body: `{ reservationIds: string[] }`. Returns which are still valid. |
| `GET /api/capsule/inventory` | Returns `[{ pieceNumber, cap, sold, dropAt }]`. 5s in-memory cache. |
| `GET /api/checkout/session?id=...` | Already referenced by success page (line 19 of success/page.tsx) but **does not yet exist**. Implement: return `{ customerEmail, amountTotal, editionNumbers: [...] }`. |
| `GET /api/charter-roll/by-session?id=...` | Returns edition numbers for a session — used by success page. |
| `POST /api/admin/charter-roll/retire` | Admin route gated by `ADMIN_KEY`. Body: `{ chartRollId, reason }`. Flips status to `retired`. |
| `POST /api/admin/fulfillment/mark-shipped` | Admin route. Body: `{ fulfillmentQueueId, trackingNumber }`. Triggers buyer shipping email. |

### New scheduled jobs (Vercel Cron)

| Job | Schedule | What it does |
|---|---|---|
| `POST /api/cron/sweep-reservations` | `* * * * *` (every minute) | Flip expired reservations to `expired`. |
| `POST /api/cron/waitlist-tokens` | One-shot, T-2 days × 2 waves | Email signed waitlist tokens to opted-in users. |

### New DB tables (Neon)

Already specified under Q2. Migration files go in `src/lib/db/migrations/` (new directory) with `0001_capsule_01.sql` as the first.

### Environment variables to add

| Var | Purpose |
|---|---|
| `DATABASE_URL` | Neon Postgres pooled connection (Vercel-Neon integration auto-provisions). |
| `DATABASE_URL_UNPOOLED` | For migrations / cron jobs. |
| `WAITLIST_JWT_SECRET` | HMAC secret for waitlist token signing. |
| `MEMBER_COOKIE_SECRET` | HMAC secret for the post-purchase member auth cookie. |
| `OPS_FULFILLMENT_EMAIL` | Inbox that gets off-platform fulfillment slips. |

Existing vars (already in `.env.example`) reused: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `RESEND_API_KEY`, `PRINTFUL_API_KEY`, `ADMIN_KEY`, `NEXT_PUBLIC_SITE_URL`.

### Stripe configuration changes (not code — done in Stripe Dashboard or via API setup script)

- Enable `checkout.session.async_payment_succeeded` and `checkout.session.expired` webhook events
- Enable `charge.refunded` webhook event (for number retirement)
- Confirm Radar thresholds raised for AOV > $200 (per spec pre-mortem line 783)
- Enable 3DS for >$200 transactions

---

## 5. Open questions / dependencies

### Depends on the **PDP spec**

- **Where is the size selector placed?** Reservation API needs `size` at the moment of add. If PDP uses a "select size before add" gate (best), then `add-to-cart.tsx` already has size in scope. If PDP defers size selection until cart, the reservation must be re-keyed at /cart.
- **How does the live counter render?** Polling vs. SSE vs. ISR. This spec assumes polling /api/capsule/inventory with 5s cache. SSE would be smoother but adds infra.
- **PDP gating language pre-drop:** what does the page show before `dropAt`? Disabled button + countdown? Email-capture-only? This spec assumes disabled add-to-cart + visible countdown.

### Depends on the **Shop UI spec**

- **Where does Capsule 01 surface alongside general catalog?** The existing `src/app/shop/*` and `src/lib/mock-data.ts` show general products. Does the shop card grid include the 11 capsule pieces, or does Capsule 01 stay siloed at `/capsule-01`? This spec is agnostic — the reserve flow works either way — but the inventory API contract changes (one endpoint for capsule-only vs. unified).
- **"Sold out" treatment:** does a sold-out card stay visible (the spec hints yes — "Public honest sell-through counter" line 474) or disappear? Assume stays visible with a `SOLD OUT — 200/200` badge.

### Depends on the **Charter Roll spec**

- **Members-only auth model:** is there an account system (sign-up / password) or is it cookie-only based on prior-purchase token? This spec assumes the latter (email-hash-signed cookie set on `checkout/success`). If the brand wants Shopify-style accounts, much of the cookie flow gets replaced.
- **Public counters vs. private names:** the spec says (line 201) "Anyone can see the totals; only members see the names." Implementation: same page, two render branches. Confirm logged-out experience still shows the table with names masked vs. just totals.
- **Founder seed rows:** the existing `/charter-roll` preview shows `W.B. — Order of the Hoodlum — No. 001`. Is this aspirational, or is the founder reserving #001 for himself? If reserved: insert a permanent row at deploy time via migration seed.

### Other open questions

- **Cap shop-card vs. capsule-page parity:** does the existing `/shop` route surface Capsule 01 pieces, or is `/capsule-01` the *only* path to buy them? Material to the URL structure of inventory API and the reservation flow.
- **Hand-stamping ordering for Printful pieces:** pieces 1 + 7 are Printful + finishing. The spec (line 656) says "ShipMonk Texas kitting service ($0.85/piece) accepts manual SOPs at this volume." Does the Printful order ship to ShipMonk, who hand-stamps, then forwards to the customer? Or does Printful ship to the customer with a separately-mailed numbered hangtag? Operations-only question, but affects whether `fulfillment_queue.status` should track an intermediate `in_finishing` state for Printful items. This spec assumes yes.
- **Display-name PII storage policy:** if the buyer chooses "Bobby T. from Lubbock" as their handle, that data lives in `charter_roll` indefinitely. Right-to-erasure under GDPR/CCPA: deletion needs to swap the row to a placeholder (`charter_roll.display_name = 'WITHDRAWN'`) without removing the row itself, because edition number sequencing relies on the row's continued existence. Document this in the privacy policy before launch.
- **Tax & shipping calc:** existing checkout creates a basic Stripe Session with `shipping_address_collection` and no tax handling. Capsule 01 at $248/unit may push individual orders past $1000 — confirm Stripe Tax is enabled before drop. Off-platform fulfillment also needs a real shipping cost model (not just Printful's auto-calculated rate). Out of scope for this spec but a hard prerequisite.
- **Inventory leaks via failed webhooks:** if Stripe fires `checkout.session.completed` and our endpoint is down for 5+ min, Stripe keeps retrying — fine. But during that window, our public counter shows the unit as "available" because the commit hasn't happened. Acceptable for inventory but not for edition assignment (the buyer sees their email confirmation from Stripe and expects a number). Mitigation: surface "edition number coming within 24 hours" on the success page; only display the number once the webhook commits.

---

*Generated against `src/app/cart/page.tsx`, `src/app/checkout/page.tsx`, `src/app/checkout/success/page.tsx`, `src/app/api/checkout/route.ts`, `src/app/api/webhooks/stripe/route.ts`, `src/lib/mock-data.ts`, `src/lib/capsule-01-data.ts`, `src/components/shop/add-to-cart.tsx`, `src/stores/cart-store.ts`, `src/app/charter-roll/page.tsx`, and `prompts/capsule-01-dirt-road-heirlooms.md`. No code was modified.*
