# Capsule 01 — Charter Roll persistence + UI spec

> Design spec for turning `/charter-roll` from a static preview page into a real, writable members registry, fed by Stripe checkout events and rendered for the public-facing site.
>
> This document does NOT include implementation code. It defines the persistence layer, schema, write/read paths, UI behavior, privacy posture, and the edge cases that must be handled before a single row is written. Decisions here are load-bearing for the brand promise: "Buyer #001 of any piece stays #001 forever."

---

## 1. TL;DR

- **Persistence layer: Neon Postgres** (provisioned fresh under the existing `org-dawn-leaf-32050933` Neon org). Free tier comfortably absorbs the maximum lifetime row count (~4,500 across 11 pieces); the `@neondatabase/serverless` driver runs in Next.js Route Handlers and React Server Components without a connection-pool footgun. No DB libraries are currently installed in `package.json`, so the choice is greenfield.
- **Edition assignment is the contract, not a marketing label.** The atomic `INSERT … RETURNING` against a `UNIQUE (piece_id, edition_number)` constraint on a serialized counter is the only acceptable way to assign numbers. Race conditions on flagship Piece 4 are otherwise inevitable (200 units of $248, sub-60-second sellout per the pre-mortem).
- **Write path lives inside the existing `checkout.session.completed` Stripe webhook handler at `src/app/api/webhooks/stripe/route.ts`.** Edition number is assigned + persisted *before* the Printful draft order is created. If Printful subsequently fails, the row stays — the number is committed to the buyer, fulfillment retries via reconciliation job.
- **UI replaces `PREVIEW_ROWS` with per-piece scrollable rolls + a flagship "Order of the Hoodlum" default view + a search-by-number + "find your row" deep-link.** Page reads via a server component with a 60-second `revalidate` window; live counts refresh on a separate uncached endpoint for the public sell-through counter.
- **Privacy posture: anonymize on request, do not delete.** Edition number is the contract; display name is the disclosable PII. A GDPR "right to be forgotten" request flips the row to `display_name = '—'` and `is_anonymized = true` — the number, piece, and date stay. Documented in returns policy + privacy policy.

---

## 2. Architecture

### Write flow

```
[Buyer completes Stripe Checkout]
            │
            ▼
[Stripe → POST /api/webhooks/stripe]
            │
            ▼
  ┌────────────────────────────────────────────────────────┐
  │  handleCheckoutCompleted(session)                       │
  │                                                          │
  │  1. Verify Stripe signature ✔ (already implemented)     │
  │  2. Expand line_items, customer_details, shipping       │
  │  3. For each line_item:                                  │
  │       a. Resolve piece_id from product metadata          │
  │       b. BEGIN tx                                        │
  │            INSERT INTO charter_roll                      │
  │              (piece_id, edition_number, …)               │
  │              SELECT $piece_id,                           │
  │                     COALESCE(MAX(edition_number),0)+1,   │
  │                     …                                     │
  │              FROM charter_roll                           │
  │              WHERE piece_id = $piece_id                  │
  │              FOR UPDATE          ← row-locking pattern   │
  │              RETURNING edition_number;                   │
  │          COMMIT                                          │
  │       c. Stamp edition_number into Printful order        │
  │          external_id metadata (for ops sheet sync)       │
  │  4. createDraftOrder(...) ← existing Printful path       │
  │  5. (background) email buyer "you got #047/200"          │
  └────────────────────────────────────────────────────────┘
            │
            ▼
[Stripe receives 200 OK]
```

Race-safety note: the `FOR UPDATE` lock on `WHERE piece_id = X` is the cheap-and-correct way to serialize concurrent webhook deliveries against a per-piece counter. A `UNIQUE (piece_id, edition_number)` index is the belt-and-suspenders — if two webhooks somehow race past the lock (e.g., during a Neon failover), one of them gets a unique-violation and the handler retries one slot up.

### Read flow

```
[Visitor → GET /charter-roll]
            │
            ▼
[Next.js Server Component (default RSC)]
   export const revalidate = 60;          ← 60s ISR window
            │
            ▼
  ┌────────────────────────────────────────────────────────┐
  │  loadCharterRoll(piece_id?: string, cursor?: number)    │
  │                                                          │
  │  SELECT edition_number, display_name, piece_id,         │
  │         purchased_at, is_retired, is_anonymized         │
  │  FROM charter_roll                                       │
  │  WHERE piece_id = $piece_id                              │
  │  ORDER BY edition_number ASC                             │
  │  LIMIT 100 OFFSET $cursor;                               │
  │                                                          │
  │  SELECT piece_id, COUNT(*) AS sold                       │
  │  FROM charter_roll                                       │
  │  WHERE is_retired = false                                │
  │  GROUP BY piece_id;                                      │
  └────────────────────────────────────────────────────────┘
            │
            ▼
[Render rolls + sell-through totals]
            │
            ▼
[Client: search box + jumpdown to row #N (no extra DB hit)]
```

Live sell-through counter on `/capsule-01` PDP grid hits a separate uncached `GET /api/charter-roll/counts` route (`export const dynamic = "force-dynamic"`) so the "47 of 200 sold" badges don't lie for up to 60s during the drop.

---

## 3. Recommendations (per question)

### Q1 — Persistence layer

**Recommendation: (b) Neon Postgres.**

Reasoning:
- **Stack fit.** The user's Neon MCP tool surface confirms an active Neon org (`WILLIAM`, `org-dawn-leaf-32050933`) with 15+ existing projects across other sites. New project provisioning takes ~30 seconds. No vendor onboarding cost.
- **Row count is trivial for Postgres.** ~4,500 lifetime rows across 11 pieces is below the Neon free-tier ceiling (~190 GB storage, 0.5 CPU-hour/day compute). Even with VOL. 02–05 multipliers this stays inside the free tier for years.
- **Concurrency model is correct.** Stripe webhooks fire as parallel POSTs on big drops (Piece 4 sub-60-second sellout is forecast in the pre-mortem). Postgres row-locking is the textbook way to assign monotonic counters under concurrency. Vercel KV / Edge Config have no real transactional primitive — you'd be hand-rolling a counter with `INCR` and praying.
- **Single-developer ops budget.** Neon's branching means staging/preview environments get a free DB branch per Vercel preview. Backups are automatic, point-in-time-restore covers the "I wrote 4,500 to the wrong table" disaster.
- **The `@neondatabase/serverless` HTTP driver is built for serverless Next.js.** No connection-pool exhaustion, no `pg-bouncer` ceremony, no cold-start penalty. Drop the `DATABASE_URL` into Vercel env and import — same pattern used in `hobbspeak`, `bridgepointe`, and other live projects.

Alternatives considered:
- **(a) Static JSON in repo.** Disqualified by the write path requirement. Every successful Stripe webhook would need to push a commit. Race conditions are catastrophic. Brand promise ("the Roll lives forever") implies durability that a `git push` workflow can't credibly offer.
- **(c) Vercel KV / Edge Config.** Edge Config is read-optimized and not built for transactional writes. KV could work via `INCR` but you lose SQL-level introspection ("show me every retired number across all pieces"), and pricing past free tier is per-command-count — bad shape for a public read-heavy page.
- **(d) Supabase.** Strictly redundant if Neon is already in stack. Auth/Storage features unused. Extra dashboard to babysit.
- **(e) On-demand Stripe API.** Clean from a "no DB" perspective, but `stripe.checkout.sessions.list` over the lifetime of the project becomes a multi-minute pagination job. Caching the result locally just reinvents (b) with worse ergonomics. Also: a refund or returned-piece doesn't naturally express "RETIRED" in Stripe — you'd need supplementary metadata anyway.

**Provisioning step (out of scope here, but for reference):** create one Neon project named `countrie-hoodlums`, default branch `main`, region `aws-us-east-1` (matches all other William-org projects). Database name `hoodlums`. Pooled connection string into Vercel as `DATABASE_URL`.

### Q2 — Schema

See the SQL DDL in section 5 below. Key design decisions:

- **`charter_roll` is the single table.** No separate `members`/`users` table — Capsule 01 has no account system, identity is per-purchase. If/when accounts arrive, `customer_id` foreign-keys back.
- **`edition_number` is a plain `INTEGER`, not `SERIAL`.** Per-piece sequences would require dynamic SQL or 11 sequence objects. Locking `MAX(edition_number)+1` inside a transaction is simpler and matches the audit story ("show me how #047 was assigned").
- **`display_name` is the public-facing string.** Stored separately from `billing_name` (PII, optional storage) and `email` (PII, optional storage, only kept for support resolution).
- **`piece_id` is a `TEXT` enum referencing `capsule-01-data.ts` piece numbers** (`"0a"`, `"0b"`, `"1"`–`"9"`). A CHECK constraint enforces the set. Keeping it `TEXT` rather than int-FK to a `pieces` table is fine — the piece set is small, static, and lives in code already.
- **Index on `(piece_id, edition_number)` is `UNIQUE`** — this is the contract. A second index on `(display_name)` supports the "search by name" UI but is loose (case-insensitive trigram if we want fuzzy).
- **`is_retired` boolean** for the returns-close-the-number rule. Retired rows stay in the table and render with strikethrough; counter excludes them from sell-through.
- **`is_anonymized` boolean + nullable display_name** for GDPR opt-outs.

### Q3 — Display name normalization

**Recommendation:** Three-tier preference set at checkout, with a sensible default.

Flow:
1. Stripe Checkout's `custom_fields` collects a single optional 32-char text field: *"How should you appear on the Charter Roll?"* with helper text *"Leave blank to show as initials. Type a single dash (—) to stay anonymous."*
2. Webhook handler normalizes:
   - Trim, collapse whitespace, strip control chars.
   - If empty → derive initials from `customer_details.name` (e.g., "William Beltz" → "W.B."). This matches the existing preview row convention.
   - If `"-"` or `"—"` → store `"—"`, set `is_anonymized = true`.
   - Otherwise store the user's string capped at 32 chars.
3. Profanity filter: run through a deny-list at write time. The list lives in `src/lib/charter-roll/profanity.ts` and contains an obvious-slurs core (50–100 entries, lowercase + leetspeak variants). On match, fall back to initials and log a moderation event — do not block the purchase. Numbers get assigned, the buyer just doesn't get the name they wanted. This is the only acceptable failure mode: moderation must never delay a Stripe webhook 200-OK.
4. One-time edit: a future authenticated `/charter-roll/me` page (post-launch) lets the buyer change their display name once. Spec'd here, not built in Phase 1.

Alternatives considered:
- **Free-text only.** Invites homophobic-slur-as-Member-#001 attack. Hard pass.
- **Defaulting to billing-name initials.** Used as fallback only; defaulting "publicly" without consent is a PII surprise. Buyer must explicitly enter something to be named-named.
- **Full moderation queue with manual review.** Overkill for 4,500 lifetime rows. Deny-list + log is sufficient; if a slur slips, the one-time edit feature reverses it.

### Q4 — Page UI when real data exists

**Recommendation:** Per-piece tabs, default to flagship Piece 4, with a global search.

Specifics:
- **Tab/segment control** at the top of "The Roll" section: `Order of the Hoodlum (4) · Member 001 (1) · Patron Saint (2) · …`. Tab labels include piece number + concept name, with the sold-count badge: *"Order of the Hoodlum · 047/200"*.
- **Default selected tab is Piece 4** ("Order of the Hoodlum") — it's the flagship, the lowest-cap piece (200), and the one that creates the most "I'm #007 of 200" social moment.
- **Search bar** above the active table: searches `display_name` (case-insensitive substring) AND `edition_number` (exact match if user types a number). One input, two behaviors.
- **"Find your row" CTA on order confirmation email** deep-links to `/charter-roll?piece=4&row=47#row-47` — page auto-scrolls to and highlights the buyer's row.
- **Pagination: cursor-based, 100 rows per page.** Within a single piece this means at most 7 pages for the largest cap (Piece 1, 700). Cursor is the last `edition_number` on the page, not an offset — survives concurrent inserts during the drop.
- **Retired rows** render with a struck-through edition number and a small "RETIRED · 2026-06-12" tag. Counter shows `047/200 sold (2 retired)`.
- **Anonymized rows** render `display_name` as `—` exactly like the current preview convention.
- **The five existing preview rows are deleted from the page** — once real data exists, the preview-only mode is gone. Keep one fallback: if `count(*) = 0` for a piece (pre-drop), show the existing "Coming with VOL. 01" placeholder block.

### Q5 — Write path

**Recommendation:** Single webhook handler, transactional assign-and-insert, post-write side effects (email, Printful) outside the transaction.

Specifics:
- **Edition assignment happens before the Printful call.** The current handler at `src/app/api/webhooks/stripe/route.ts:56` creates a Printful draft order first; this needs to flip so charter-roll insert is line 1 of `handleCheckoutCompleted`. Reasoning: Printful API failures are recoverable (manual draft order creation, retry job). A charter-roll race condition is not — once two buyers think they're #047, the trust contract is broken.
- **Each line item in the checkout session becomes one row.** A cart with the flagship + the pin set produces two rows (one in Piece 4's roll, one in Piece 0b's roll). The webhook iterates `full.line_items.data`, resolves `piece_id` from `product.metadata.productId`, and inserts one row per item.
- **Quantity > 1 in one line item.** Discouraged by checkout rules ("1 per SKU per account" per the pre-mortem) but if it happens, insert `quantity` consecutive rows. Each gets its own edition number.
- **Atomic block per row:**
  ```
  BEGIN;
  SELECT piece_id, COALESCE(MAX(edition_number),0)+1 AS next
    FROM charter_roll WHERE piece_id = $1 FOR UPDATE;
  INSERT INTO charter_roll (...) VALUES (..., $next, ...) RETURNING *;
  COMMIT;
  ```
  On `UNIQUE` violation (extreme race past the lock), retry once with `next+1`.
- **Write failure after charge:** if the DB write fails (Neon outage, etc.), the webhook handler returns a 5xx to Stripe. Stripe automatically retries the webhook for 3 days with exponential backoff. This is the right backstop — the buyer was charged, the row is owed, Stripe will pester us until we accept it.
- **Reconciliation job (Phase 2):** a nightly Vercel Cron route at `/api/cron/reconcile-charter-roll` queries `stripe.checkout.sessions.list` for the past 72 hours, cross-references against `charter_roll`, and flags any session_id present in Stripe but missing in the roll. Sends a Resend email to the operator. Phase 1 ships without the cron; Stripe's built-in retry is enough for launch.

### Q6 — Read path

**Recommendation:** Server component with 60-second ISR, plus an uncached counts endpoint for live sell-through.

Specifics:
- **`/charter-roll` is a default RSC** with `export const revalidate = 60;`. Cache invalidates every 60 seconds. During the drop, this means the page can be up to 60s stale — acceptable for a registry, brand promise is "your number stays forever" not "your number appears in real-time."
- **`/api/charter-roll/counts` is `dynamic = "force-dynamic"`** and returns `{ piece_id: string, sold: number, cap: number }[]`. Called by the `/capsule-01` PDP grid for live sell-through counters. Cheap query (`GROUP BY piece_id`), small payload, no caching.
- **`revalidatePath("/charter-roll")` is fired from the webhook** after a successful insert, so the page invalidates on every new write rather than purely on the 60s timer. This is the strict version of "revalidate-on-write" — Phase 1 nice-to-have, can defer if it complicates the webhook.
- **No static-generate.** The capsule launch traffic is bursty but bounded. ISR with 60s window absorbs the peak.

### Q7 — Privacy / GDPR / right-to-be-forgotten

**Recommendation:** Anonymize, do not delete. Two-tier process documented in the privacy policy.

Specifics:
- **Default policy (in privacy + returns policy):** *"Your edition number is part of the public Charter Roll for the life of the brand. You may request to be anonymized at any time — your name is replaced with a dash (—). The number, piece, and date remain visible. The number itself is the artifact; the name is the courtesy."*
- **Hard-delete path (GDPR-strict):** for EU/UK buyers who invoke Article 17 ("right to erasure"), do a hard `UPDATE` that:
  1. Sets `display_name = NULL`, `billing_name = NULL`, `email = NULL`, `stripe_customer_id = NULL`, `is_anonymized = true`, `anonymized_at = NOW()`.
  2. Keeps `edition_number`, `piece_id`, `purchased_at`, `stripe_session_id` (the session ID is a Stripe identifier, not a person identifier, but argue this position with counsel if challenged).
  3. Logs the action in a separate `charter_roll_audit` table that is NOT user-facing.
- **Why not full row delete:** breaks the "no number is ever re-issued" contract. The row holding edition #047 must exist forever to prevent a future buyer from being assigned #047. The retired/anonymized states are the only legal ways to break the buyer-row coupling without breaking the contract.
- **Two-person verification on anonymization requests** — same operational pattern as the stamping station. Email comes in, operator confirms identity, second operator approves the UPDATE. Anonymization is irreversible.
- **Returns ≠ anonymization.** A return retires the number (sets `is_retired = true`), but the name stays unless the buyer also requests anonymization. The returns policy already covers this: *"Your place on the Charter Roll does not change."*

### Q8 — The two off-platform-only pieces (0a, 0b)

**Recommendation:** Same table, same `charter_roll` schema. Piece 0a (hat, cap 300) and Piece 0b (pin set, cap 1000) get their own counters under `piece_id = "0a"` and `piece_id = "0b"`.

Specifics:
- **Pin set IS on the Charter Roll.** The capsule brief explicitly frames it as *"$24 entry to the Charter Roll"* (line 626 of `prompts/capsule-01-dirt-road-heirlooms.md`). Without a row on the Roll, the $24 entry-point pitch collapses.
- **Hat IS on the Charter Roll.** Same logic — hand-stamped edition number on the sweatband (line 625 of the prompts file) implies a corresponding registry entry.
- **One roll, separated by `piece_id`.** No separate "hat roll" / "pin roll" — that would fragment the contract. The UI already paginates by piece; this is just two more tabs.
- **Caps in the UI:** Piece 0a tab reads *"Bullion CH Cap · 047/300"*. Piece 0b tab reads *"Pin Set + Member Card · 247/1000"*.
- **The pin set's 1000-cap matters for UI density.** A 1000-row roll is the longest single tab; the cursor-based pagination at 100/page (10 pages) is the right call here.

---

## 4. Schema (PostgreSQL DDL)

```sql
-- Capsule 01 Charter Roll. One row per purchased numbered piece.
-- Edition numbers are monotonic per piece_id, assigned at Stripe webhook time.

CREATE TABLE charter_roll (
  -- Surrogate primary key
  id                  BIGSERIAL PRIMARY KEY,

  -- The contract: piece_id + edition_number is the buyer's permanent receipt
  piece_id            TEXT NOT NULL
    CHECK (piece_id IN ('0a', '0b', '1', '2', '3', '4', '5', '6', '7', '8', '9')),
  edition_number      INTEGER NOT NULL CHECK (edition_number >= 1),

  -- Public display
  display_name        TEXT NOT NULL DEFAULT '—'
    CHECK (char_length(display_name) <= 32),

  -- PII (stored separately, never rendered on the public page)
  billing_name        TEXT,                        -- full name as charged
  email               TEXT,                        -- support contact
  stripe_customer_id  TEXT,                        -- Stripe ref, NOT user-facing
  stripe_session_id   TEXT NOT NULL UNIQUE,        -- idempotency anchor

  -- Timestamps
  purchased_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  shipped_at          TIMESTAMPTZ,                 -- backfilled from Printful webhook (future)

  -- State machine
  is_retired          BOOLEAN NOT NULL DEFAULT false,
  retired_at          TIMESTAMPTZ,
  retired_reason      TEXT
    CHECK (retired_reason IS NULL OR retired_reason IN ('refund', 'defect', 'fraud', 'other')),

  is_anonymized       BOOLEAN NOT NULL DEFAULT false,
  anonymized_at       TIMESTAMPTZ,

  -- Audit
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- The contract: a piece's edition number is unique. Belt-and-suspenders for
  -- the FOR UPDATE pattern in the assignment query.
  UNIQUE (piece_id, edition_number)
);

-- Read-path indexes
CREATE INDEX charter_roll_piece_edition_idx
  ON charter_roll (piece_id, edition_number);

CREATE INDEX charter_roll_display_name_idx
  ON charter_roll (lower(display_name) text_pattern_ops)
  WHERE is_anonymized = false;

CREATE INDEX charter_roll_purchased_at_idx
  ON charter_roll (purchased_at DESC);

-- Trigger to keep updated_at fresh
CREATE OR REPLACE FUNCTION touch_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER charter_roll_touch_updated_at
  BEFORE UPDATE ON charter_roll
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();

-- Separate audit log for anonymization / retirement events.
-- Not user-facing; ops-only.
CREATE TABLE charter_roll_audit (
  id              BIGSERIAL PRIMARY KEY,
  charter_roll_id BIGINT NOT NULL REFERENCES charter_roll(id),
  action          TEXT NOT NULL
    CHECK (action IN ('insert', 'anonymize', 'retire', 'unretire', 'rename')),
  actor           TEXT NOT NULL,                   -- 'webhook' | 'ops:williambeltz' | …
  before_data     JSONB,
  after_data      JSONB,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX charter_roll_audit_charter_roll_id_idx
  ON charter_roll_audit (charter_roll_id, created_at DESC);
```

TypeScript companion type (for the app code, not the DB):

```ts
// src/lib/charter-roll/types.ts (Phase 1 will create this file)
export interface CharterRollRow {
  id: number;
  pieceId:
    | "0a"
    | "0b"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9";
  editionNumber: number;
  displayName: string;
  // Privacy: billingName, email, stripeCustomerId are NEVER serialized to
  // the client. They live behind a server-only data accessor.
  purchasedAt: string; // ISO
  shippedAt: string | null;
  isRetired: boolean;
  retiredAt: string | null;
  retiredReason: "refund" | "defect" | "fraud" | "other" | null;
  isAnonymized: boolean;
}

export interface PublicCharterRollRow {
  pieceId: CharterRollRow["pieceId"];
  editionNumber: number;
  displayName: string; // already normalized (— if anonymized)
  purchasedAt: string;
  isRetired: boolean;
}
```

---

## 5. Edge cases

| Case | Handling |
|---|---|
| **Two webhooks deliver concurrently for the same piece** | `FOR UPDATE` lock on the per-piece subset serializes them. If somehow both pass the lock (Neon failover mid-tx), the `UNIQUE (piece_id, edition_number)` constraint forces the second insert to error; handler catches, retries with `next+1`. |
| **Stripe retries the same webhook (network blip)** | `UNIQUE (stripe_session_id)` blocks the duplicate insert. Handler treats `unique_violation` on `stripe_session_id` as success and returns 200 — the row already exists from the previous delivery. |
| **Refund issued in Stripe → row should retire** | Listen for `charge.refunded` in the same webhook handler. Update matching row by `stripe_session_id`: `is_retired = true`, `retired_at = NOW()`, `retired_reason = 'refund'`. Log to audit table. Counter updates on next page revalidate. |
| **Partial refund (one item in a multi-item cart)** | Stripe's `charge.refunded` doesn't natively map to which line item was refunded. Phase 1: operator manually issues the retire via an internal `/api/admin/charter-roll/retire` endpoint with `{ stripe_session_id, piece_id, reason }`. Phase 2: parse `refund.metadata` if we start tagging line items. |
| **Buyer returns piece for a size exchange** | NOT a retire. The exchange is fulfilled with the *same* edition number (re-stamped on the new garment per the returns policy at line 821 of the capsule brief). No DB write needed; this is an ops-only event. |
| **Buyer purchases two of the same piece in one cart** | Two rows. Two consecutive edition numbers. The receipt + email tell them which is which. If `quantity > 1`, the webhook loops `quantity` times inside the transaction. |
| **Display name collides (two buyers both pick "WB")** | Allowed. Edition number is the unique anchor, not the name. UI shows both, sorted by edition number. |
| **Buyer entered a profanity** | Profanity filter at write time falls back to initials, logs `moderation_event` to the audit table. Number is assigned normally. Buyer can request a rename via support. |
| **Buyer's billing name has no spaces (initials derivation fails)** | Fallback to first 2 chars uppercase ("Cher" → "CH"). Failing that, "—". |
| **`customer_details.name` is null (Stripe doesn't always collect)** | Default to "—" and flag the row for ops follow-up. Stripe Checkout config should require name collection on launch-day Checkout sessions — verify in checkout spec. |
| **Webhook arrives for a piece_id not in the CHECK list (typo, future capsule mistake)** | Insert errors with `check_violation`. Handler logs, returns 5xx, Stripe retries. Operator investigates. Better to error loud than write a garbage row. |
| **The 200th sale of Piece 4 races with the 199th** | Both succeed. The 201st (oversold) would also succeed at the DB layer — caps are enforced at *checkout/inventory*, not at the Charter Roll. The Roll is a faithful record; the checkout system is the gate. Note this in the implementation pointers below. |
| **Buyer requests anonymization** | Two-person ops process. UPDATE sets the four PII columns to NULL, `is_anonymized = true`, `anonymized_at = NOW()`. Audit row written. Page revalidates on next 60s window. |
| **Buyer requests full deletion (Article 17 absolutist)** | Anonymize first. If they push for hard delete: legal call. Default position is "the row stays, the PII is gone." Document the position in the privacy policy explicitly. |
| **A piece_id we forgot in the CHECK list, e.g., a Capsule 02 piece reusing the same table** | Future migration: drop the CHECK, replace with a `pieces` table + FK. Phase 1 hard-codes the Capsule 01 set because the set is final and locked. |

---

## 6. Implementation pointers

**Files that change:**

- `src/app/api/webhooks/stripe/route.ts` — add charter-roll insert *before* the existing Printful call inside `handleCheckoutCompleted`. Add a new `charge.refunded` event case that retires the matching row.
- `src/app/charter-roll/page.tsx` — replace the static `PREVIEW_ROWS` const with a server-side fetch from the new data accessor. Add per-piece tab control, search input, "find your row" anchor scroll behavior. Keep the existing hero + explainer + rules + CTA sections intact.
- `src/app/capsule-01/page.tsx` — wire the live sell-through counts (currently the `<Stat label="Restocks" value="Never" />` block) to the new `/api/charter-roll/counts` endpoint.
- `src/lib/capsule-01-data.ts` — no changes. The piece set is the source of truth for the CHECK constraint and the UI tab labels.

**Files that are new (not in scope for this spec, listed for the implementation prompt):**

- `src/lib/db/client.ts` — single `neon()` client export. Pattern matches existing `src/lib/stripe/client.ts`.
- `src/lib/charter-roll/queries.ts` — server-only data accessor: `getCharterRollByPiece`, `getCharterRollCounts`, `assignEditionNumber`, `retireEdition`, `anonymizeRow`.
- `src/lib/charter-roll/normalize.ts` — display name normalization (trim, collapse, initials fallback, profanity check).
- `src/lib/charter-roll/profanity.ts` — deny-list (start with 50–100 entries, lowercase + obvious leetspeak).
- `src/lib/charter-roll/types.ts` — TS interfaces (sample in section 4 above).
- `src/app/api/charter-roll/counts/route.ts` — uncached `GET` for live sell-through.
- `db/migrations/0001_charter_roll.sql` — the DDL from section 4. Run via `psql` against Neon at deploy time. No migration framework needed for one table; if Capsule 02 brings more tables, adopt `drizzle-kit` then.

**New env vars (add to Vercel + `.env.local.example`):**

- `DATABASE_URL` — Neon pooled connection string.
- `DATABASE_URL_UNPOOLED` — Neon direct connection string (for the rare migration script that needs `LISTEN/NOTIFY` or transaction-pool-incompatible features). Optional in Phase 1.

**New packages to install (none currently in `package.json`):**

- `@neondatabase/serverless` (^0.10.x) — the HTTP driver. Tiny, edge-runtime safe, no `pg` ceremony.

That's it. No `drizzle-orm`, no `prisma`, no `@vercel/postgres` (which is just the Neon driver in a Vercel wrapper). Phase 1 writes raw parameterized SQL through `@neondatabase/serverless`. If table count grows past ~3 in future capsules, evaluate Drizzle then.

**Stripe Checkout config dependency (out of scope here, lives in checkout spec):**

- Add a `custom_fields` entry on the Checkout Session for the display-name preference (32-char max, optional, helper text per Q3). The webhook reads `session.custom_fields[0].text.value` and feeds it into the normalizer.
- Ensure `billing_address_collection = "required"` and `phone_number_collection.enabled = false` (no need for phone, less PII surface).

**Vercel deployment:**

- Push to `master` per the universal rules (auto-deploy is restored). Verify with `gh api users/easybandz777` first if anything seems off.
- Set `DATABASE_URL` in Vercel project env BEFORE first deploy or the build will succeed and the webhook will 500 in production. The check: if `process.env.DATABASE_URL` is unset, the data accessor module should throw at import time, not at runtime — fail loud at boot.

---

## 7. Open questions

These depend on specs not yet written. Flagging here so the implementer doesn't get stuck.

1. **Checkout spec — `custom_fields` for display name preference.** The Stripe Checkout Session creation lives in `src/lib/stripe/checkout.ts` (unread in this spec). Whoever writes the checkout spec must add the `custom_fields` array entry described in Q3. If they don't, the webhook handler should still function — it'll fall back to billing-name initials for every row, which is acceptable but loses the buyer-chosen-handle feature.

2. **PDP spec — per-piece sell-through badges.** The `/capsule-01` page currently shows "Coming Soon" pills on every piece card. The PDP spec needs to add a live `{sold}/{cap}` rendered from `/api/charter-roll/counts`. Format and placement are PDP-spec decisions; the data shape (`{ piece_id, sold, cap }[]`) is locked here.

3. **Account system — does Phase 2 introduce buyer accounts?** If yes, the `members-only after first purchase` rule from `/charter-roll/page.tsx` line 200 (`The Roll is members-only after your first purchase`) becomes enforceable. Currently the page is fully public; this spec assumes the page stays fully public for Phase 1. If a future spec adds auth, the read-path query needs a `WHERE` clause that hides display names from non-members.

4. **Operator UI — how does the operator retire / anonymize a row?** Spec'd here as `/api/admin/charter-roll/retire` + `/api/admin/charter-roll/anonymize` endpoints, but the actual UI (admin dashboard? Slack slash command? raw SQL via Neon console?) is an ops-tooling decision out of scope. Phase 1 viable answer: raw SQL via the Neon console, gated by the operator's Neon account. Slower but adequate for a side project.

5. **Print-shipped status integration.** The `shipped_at` column exists in the schema but is never populated in this spec. When the Printful (or off-platform fulfillment) returns a shipped event, the webhook should update the matching row. That's a Printful-webhook spec, not a Charter-Roll spec — flagged for whoever writes it.

6. **Future-capsule reuse.** Capsule 02 will need a `vol_number` column (`'01'`, `'02'`) added to the schema so the unique constraint becomes `(vol_number, piece_id, edition_number)`. Phase 1 implicitly assumes `vol_number = '01'` — either bake it in as a column with a default of `'01'` now, or accept a Phase-2 migration later. **Recommendation: bake it in now.** Trivial cost, future-proofs the contract.

---

*End of spec. Implementation prompts should reference this document by path: `prompts/capsule-01-charter-roll-spec.md`.*
