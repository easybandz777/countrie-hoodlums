# Capsule 01 — Gap Audit (brief vs. shipped)

Source-of-truth diff: `prompts/capsule-01-dirt-road-heirlooms.md` (851-line master brief) + `prompts/capsule-01-onepager.md` against everything actually wired into the codebase as of 2026-05-26.

---

## Executive summary

1. **Zero of the 11 pieces are purchasable.** No Capsule 01 row exists in `src/lib/mock-data.ts`. The site has a beautiful coming-soon page; the shop has nothing. Pieces 0a (hat) and 0b (pin set) aren't even in `prompts/capsule-01-printful-sync.json` — they exist only in the data file and on the marketing page.
2. **The accent token is the wrong gold.** `globals.css` declares `--accent: #D4AF37`. The brief's locked Antique Gold is `#C9A227`. Every "gold" element on `/capsule-01`, `/charter-roll`, the announcement bar, and the "NEW" badge is rendering the wrong color — a brand-coherence violation across the entire site, not just the capsule.
3. **`text-white` / `bg-white` is everywhere.** 30+ Tailwind matches across `src/app/loading.tsx`, `not-found.tsx`, `admin/orders/page.tsx`, `policies/{privacy,shipping,terms,returns}/*.tsx`, `size-guide/page.tsx`, `checkout/{page,success/page}.tsx`, `components/ui/{badge,toast,button,input,modal}.tsx`, `components/home/email-capture.tsx`, and even the Capsule 01 waitlist input itself (`waitlist-form.tsx:51`). Coherence Rule #5 ("no pure white anywhere") is presently violated site-wide.
4. **Charter Roll has no backend.** `src/app/charter-roll/page.tsx` is a static marketing page with five hardcoded `PREVIEW_ROWS`. There is no DB, no shipping webhook, no number-assignment service, no "retire on return" logic. The brief's "single biggest opportunity" is currently a brochure.
5. **Newsletter persistence is an in-memory `Set`.** `src/app/api/newsletter/route.ts:12` uses `new Set<string>()` that resets on every server restart. No Resend audience, no DB, no waitlist-vs-newsletter separation. The 30-min-early gating mechanism does not exist.
6. **8 of 9 numbered pieces route off-platform with zero supplier confirmed.** The brief lists LA Apparel, SOS From Texas, Stoked On Printing, Real Thread, Jakprints, Stahls', Wilcox, Penn Emblem, Bayside, Royal Apparel as candidates. None are contracted; none are quoted in real dollars; nothing exists in code or `prompts/`.
7. **Tier B unboxing infrastructure (Arka box + dust bag + letterpress reveal + foil hangtag + woven side-seam label) — none of this is sourced.** The brief gives line-item costs ($11.92/Tier B), suppliers (Jukebox Print, Mama's Sauce, Dutch Label Shop), and a tool (Reiner B6K). Nothing has been ordered or quoted live.
8. **No `dropAt` field, no countdown, no waitlist headstart gating.** The page hardcodes "Friday · 7pm CT" and "Two Fridays later · 7pm CT" as strings. There's no scheduled-launch primitive, no waitlist token check, no 30-min-early link.

---

## 1. The 5 Coherence Rules

The rules live as a `COHERENCE_RULES` string array in `src/lib/capsule-01-data.ts:308-314` and surface as a numbered list on `/capsule-01` (lines 174-192). They are **prose only** — not enforced as data on the pieces themselves.

| # | Rule | Enforced in data? | Surfaced in UI? | Violated by current shipped surface? |
|---|------|-------------------|-----------------|----------------------------------------|
| 1 | Hand-stamped edition number, matte gold, every piece | No (no `editionNumber` / `stampingPath` field on `CapsulePiece`) | Listed on `/capsule-01`, narrated on `/charter-roll` | N/A — operational, not visual |
| 2 | Antique Gold `#C9A227` on every piece | No (palette is a hex array, not per-piece) | Listed | YES — the site's accent token is `#D4AF37`, not `#C9A227` (see `globals.css:14`) |
| 3 | Side-seam label every premium piece | No (no `sideSeamLabel: boolean`) | Listed | Cannot be — Printful doesn't support it (brief lines 587-588). Brief's recommended path: relax for sub-$100 tees, require for 4 premium pieces. **No code reflects this.** |
| 4 | Kraft hangtag + waxed olive cord + foil monogram | No | Listed | Nothing ordered — Jukebox Print / Mama's Sauce un-contracted |
| 5 | No pure white anywhere — every "white" is Creek Cream `#F5F0E1` | No | Listed | YES — see Section 8. `text-white` is everywhere, including `WaitlistForm` on the Capsule 01 page itself |

**Brand-wide audit needed:** the non-capsule catalog in `MOCK_PRODUCTS` describes "Vintage White" (`prod_007`) and "cream" callouts in descriptions but the rendered chrome around them is mostly `text-white` and `bg-gold` (`#D4AF37`). Existing products predate the locked palette; nothing visible flags them as pre-Capsule.

---

## 2. The 11 pieces — implementation status

| # | Concept | In `CAPSULE_01_PIECES`? | Product mockup file? | Print-ready artwork at `artwork/capsule-01/`? | In `MOCK_PRODUCTS` (purchasable)? | Printful variant IDs? | Off-platform supplier locked? |
|---|---------|--------------------------|----------------------|------------------------------------------------|-----------------------------------|------------------------|--------------------------------|
| 0a | Bullion CH Cap | YES | NO | NO | NO | N/A — off-platform custom | NO |
| 0b | Pin Set + Member Card | YES | NO | NO | NO | N/A | NO |
| 1 | Member Number 001 Tee | YES | YES (`piece-01-member-001.jpg`) | Partial — back only (`piece-01-back.png`); **no hem-front file** | NO | YES (PID 586, 6 sizes) | NO (off-platform per `printful-sync.json:20`) |
| 2 | Patron Saint Tee | YES | YES (`piece-02-patron-saint.jpg`) | Partial — front only (`piece-02-front.png`); **no nape-back file** | NO | YES (PID 713, 6 sizes) | NO |
| 3 | Last Light Tie-Dye | YES | NO (preview is raw `piece-03-back.png` artwork) | Partial — back only; **no front chest tag file** | NO | YES (PID 515, 5 sizes; no 3XL) | NO |
| 4 | Order of the Hoodlum (FLAGSHIP) | YES | NO (preview is raw `piece-04-back.png` artwork) | Partial — back only; **no chest-embroidery file** | NO | YES (PID 542, 6 sizes) | NO |
| 5 | HOODLUMS ONLY | YES | YES (`piece-05-hoodlums-only.jpg`) | Partial — hood only (`piece-05-hood.png`); **no chest crest file** | NO | YES (PID 970, 6 sizes) | NO — hood-top print requires pre-assembly panel screenprinting (Bayside / Royal Apparel) |
| 6 | Quiet Hoodlum | YES | YES (`piece-06-quiet-hoodlum.jpg`) | Partial — front only; **no hem file** | NO | YES (PID 975, 6 sizes — **Pigment Burro**, not Bonfire Black per blank availability) | NO — bullion-stitch requires Wilcox / Penn Emblem |
| 7 | Chapter 01 Crew | YES | YES (`piece-07-chapter-01.jpg`) | Partial — front only; **no nape back file** | NO | YES (PID 839, 6 sizes) — the **only piece** designated Path B (Printful + finishing) | N/A — runs on Printful with in-house stamping |
| 8 | Club Issue No. 24 | YES | NO (preview is raw `piece-08-front.png` artwork) | Front only (chest only, no back called for) | NO | YES (PID 464, 5 sizes; no 3XL) | NO — tonal embroidery on tie-dye |
| 9 | Homecoming '24 Crew | YES | YES (`piece-09-homecoming-24.jpg`) | Partial — front only; **no alumni back file** | NO | YES (PID 318, 5 sizes; no 3XL) — colorway locked to **Black** per Printful availability (brief lines 709-714) | NO — tackle-twill requires Stahls' or local letterman shop |

**Summary:** 9 of 11 pieces have data rows; 7 have a product mockup JPG; 9 have at least one print-ready PNG but **no piece has the complete artwork set** (front + back/secondary placement). Zero are purchasable.

---

## 3. Packaging-tier infrastructure

Brief lines 577-597. None of this is in code; none of it is contracted.

- **Tier A (tees, sub-$150):** EcoEnclose kraft mailer, $5.03/unit — **not ordered**. No supplier PO. No SKU.
- **Tier B (premium hoodies 2, 4, 5, 6, 8 + cap 0a):** Arka rigid kraft box + 2" Antique Gold foil CH on lid corner + cotton dust bag + letterpress inside-lid reveal card. $11.92/unit. **Not ordered.** This is a hard blocker — Arka lead time is 15 days per the brief, and design files for the foil block don't exist.
- **Hangtag:** French Paper Speckletone Kraft 100C + Kurz Luxor 356 Antique Gold foil + waxed olive cotton twine + antique brass eyelet, $0.62/unit, supplier Jukebox Print or Mama's Sauce (10-day lead time). **Not ordered.**
- **Woven inside neck label:** Tobacco Olive ground + Antique Gold thread + Creek Cream stamping panel, Dutch Label Shop, 14-day lead time, $0.48/unit. **Not ordered.**
- **Stamping station:** Reiner B6K six-band numbering machine x2 ($360) + VersaCraft Real Gold ink + StazOn Gold ink + photo backdrop + softbox. **Not procured.**
- **Hand-stamping operator:** Brief offers two options: founder + 1 helper (~13 hrs for 200 flagship units) OR ShipMonk Texas ($0.85/piece). **Not chosen, not staffed.**
- **Authenticity card** + **5-sticker pack** (CH monogram, capsule mark, mascot, EST 2024 oval, holographic gold CH): **not designed, not produced.**

---

## 4. Drop mechanics

Brief: Wave I Friday 7pm CT; Wave II two Fridays later 7pm CT; waitlist 30-min headstart; public sell-through counter; 4500 units total cap.

- **`dropAt` field:** does not exist on `CapsulePiece`. The page renders "Friday · 7pm CT" as a plain string at `page.tsx:217-218`. No actual scheduled date.
- **Waitlist 30-min headstart:** no token, no signed URL, no gated route. `WaitlistForm` posts to `/api/newsletter`, which adds the email to an in-memory `Set` (`route.ts:12`). There is no separate `waitlist_capsule_01` audience, no headstart link generator, no time-based unlock.
- **Public sell-through counter:** the "Sell-through counter / Public" stat at `page.tsx:238-243` is the literal string "Public", not a counter. No `unitsSold` query, no inventory binding.
- **"Total units, ever: 4500":** hardcoded as `CAPSULE_01_META.totalUnits` at `capsule-01-data.ts:17`. Not tied to a Shopify/Printful inventory feed.
- **Hard caps per piece:** present as `cap: number` on each piece (e.g. 200 for piece 4), but with no `unitsSold` counterpart and no inventory enforcement.
- **Account-required checkout** for flagship (brief failure-mode #3): no auth gate exists on the site.

---

## 5. Charter Roll

`/charter-roll/page.tsx`:

- 5 hardcoded preview rows (line 16-22), one with "W.B." initial for piece 4 No. 001.
- "Lives on this site forever": **no implementation path.** No database, no Neon schema, no Sanity dataset, no API route.
- "Two-person verification at the stamping station": described in `<RollRule n="02">`, not built.
- "Returned pieces retire the number permanently": described, not built. No webhook from Stripe or Printful to mark a number RETIRED.
- "Anyone sees totals; members see names": no auth tiering exists.
- **Right-to-be-forgotten / privacy:** `policies/privacy/page.tsx` does not mention the Charter Roll, the public-name-on-the-Roll consent, or how a member exercises deletion against a registry that the brief promises "lives forever." This is a real GDPR/CCPA exposure surface and a future "Bonfire Hill" lawyer-call.

---

## 6. Marketing / IG copy

- **`igHook` field:** present on every piece in `CAPSULE_01_PIECES` (lines 80, 97, 117, 137, 157, 177, 197, 217, 237, 257 and the two add-ons). **Not rendered anywhere on the site.** Only `designSummary` and `lever` surface on the piece cards (`page.tsx:423-429`). The hooks are pre-written social copy sitting unused.
- **Announcement bar marquee** (`announcement-bar.tsx:62-74`): three repeating segments — "CAPSULE 01 — Dirt Road Heirlooms / Vol. 01 — Coming Soon" / "Hand-Numbered. No Restocks Ever." / "Free Shipping on Orders $75+". Good. None of the per-piece hooks appear.
- **Email capture:** `WaitlistForm` posts to `/api/newsletter`. `email.ts:1` imports Resend, but the API key is hardcoded as `"re_build_placeholder_key"` if env var is missing. `console.log(\`[Newsletter] New subscriber: ${normalizedEmail}\`)` is the only persistence. No Resend audience ID. No segmentation between general newsletter and Capsule 01 waitlist.
- **10 drafted emails** (brief line 560 — sleeper / 48hr / go-live / etc.): copy lives only in the brief, not wired to any sender.
- **30-post IG calendar + 10 TikTok concepts** (brief lines 565-567): not in any tracked artifact in the repo.

---

## 7. Cross-cutting concerns

- **`/capsule-01` SEO:** `metadata` in `page.tsx:10-20` has title, description, and an `openGraph` block with title+description+type. **Missing:** `openGraph.images`, `twitter` card block, canonical URL. Same gaps on `/charter-roll`.
- **Sitemap:** `src/app/sitemap.ts` does **not** include `/capsule-01` or `/charter-roll`. Easy fix; small but real SEO gap.
- **Robots:** `src/app/robots.ts` allows `/` and disallows `/api/`, `/checkout/`, `/cart`. `/capsule-01` and `/charter-roll` are crawlable — good.
- **Structured data:** no `Product` / `ItemList` / `Event` JSON-LD on either page.
- **Mobile experience:** Tailwind responsive breakpoints look complete on both pages (`sm:`, `md:`, `lg:` are present). One specific risk: the hero `clamp(3.5rem, 13vw, 11rem)` on `/capsule-01:58` and `/charter-roll:54` will overflow on extra-narrow viewports (<320px Galaxy Fold) — not blocking, but flag.

---

## 8. Brand-violation surface area

- **`globals.css:14`** declares `--accent: #D4AF37`. **The brief locks Antique Gold to `#C9A227`** (master brief line 26, one-pager line 58). Every gold pixel on the site is currently the wrong gold. This affects `/capsule-01`, `/charter-roll`, the announcement bar (`bg-accent`), every CTA button, every "New" badge, the cart count, focus rings, scrollbar thumb, selection color, and the gradient utility. **Single-token fix; site-wide visual impact.**
- **Pure white usage** (Tailwind `text-white` / `bg-white`):
  - `src/app/loading.tsx:9` — global loading screen
  - `src/app/not-found.tsx:6, 9` — 404
  - `src/app/admin/orders/page.tsx:54, 68, 110, 124, 132`
  - `src/app/policies/{privacy,shipping,terms,returns}/page.tsx` — multiple `<strong className="text-white">`
  - `src/app/policies/layout.tsx:8` — every `<h1>` and `<h2>` in policy pages is `text-white`
  - `src/app/size-guide/page.tsx:44, 57, 85, 113, 139, 150`
  - `src/app/checkout/page.tsx:55` (`bg-white text-black`) and `checkout/success/page.tsx:38, 65, 72, 85`
  - `src/components/ui/badge.tsx:13` — sale badge `text-white`
  - `src/components/ui/{button,input,modal,toast}.tsx` — multiple `text-white`
  - `src/components/home/email-capture.tsx:34`
  - `src/app/capsule-01/waitlist-form.tsx:51` — **on the Capsule 01 page itself**
- **"New" badge** at `src/components/shop/product-card.tsx:58` uses `bg-gold` which maps to `#D4AF37` (off-brand). Same gold problem; consolidate fix with token change.
- **Existing catalog**: `MOCK_PRODUCTS` includes Vintage White (`prod_007`, Bella+Canvas 4810), Charcoal Heather (`prod_009`), Alpine Green (`prod_005`) — these predate the locked palette. They do not violate the *Capsule 01* palette (they're outside the capsule) but they undercut the brief's larger "discipline IS the product" claim if the entire brand catalog is to coexist with the capsule on `/shop`.

---

## 9. Promised but un-built (brief's own TODOs)

From the brief's "TOP 3 RED FLAGS" (lines 767-773), "WHAT'S STILL NEEDED" (lines 685-691), and "Not deployed (intentionally)" (lines 842-847):

1. **Discharge print commitment — 7-day deadline.** Verify Printful's 2026 capability via support ticket; if no, commit Path C for 6 RED pieces.
2. **Piece 5 hood-top print — 14-day deadline.** Source from Bayside or Royal Apparel (pre-construction panel printer) OR drop the hood-top print signature.
3. **Piece 9 tackle-twill — 14-day deadline.** Lock Stahls' (or local letterman shop) at $18–28/garment, 4–6 week lead, 200+ MOQ.
4. **Production feasibility audit** of Printful (discharge, tackle-twill, bullion, hood-top, side-seam label) — partially completed in brief addendum but not turned into a Printful support ticket.
5. **Pre-mortem + CS playbook** — copy exists in brief lines 779-823; not wired into a help-desk system or saved-replies.
6. **Printful sync product JSON** — `prompts/capsule-01-printful-sync.json` exists and is locked, but cannot be pushed until artwork PNGs exist.
7. **Functional Charter Roll database** — explicitly listed as not-deployed.
8. **Email automation sequences** — drafted in brief, not in Klaviyo/Resend.
9. **Hand-stamping fulfillment workflow** — operational, not built.
10. **The single system to build pre-launch** (brief line 826): Airtable + iPad scan-to-ship station with photo log + two-person verification. The brief calls this "the only thing that prevents duplicate #047." Nothing exists.

---

## Recommended sequencing

If shipping is the constraint, attack these in order:

**Top 3 — must finish before any other work:**

1. **Fix the gold token + purge pure white.** Change `--accent` in `globals.css:14` from `#D4AF37` to `#C9A227`. Add `--creek-cream: #F5F0E1` and a Tailwind alias. Sweep the 30+ `text-white` / `bg-white` matches to `text-foreground` / `bg-cream` or equivalent palette-correct values. This is a few hours of work and unblocks every other shipped surface from being brand-violating on day one.
2. **Stand up the Charter Roll backend.** Pick a store (Neon Postgres looks already-configured in MCP); design schema `charter_entry(id, piece_number, edition_number, customer_email, display_name, purchased_at, retired_at NULLABLE)`; wire a Stripe webhook that assigns the lowest-available `edition_number` per piece on `payment_intent.succeeded`; replace the `PREVIEW_ROWS` array on `/charter-roll` with a server component pulling from DB; add a "retire on refund" handler. This is the single biggest source of capsule risk per the brief (duplicate #047) and the single biggest differentiator.
3. **Resolve discharge + tackle-twill + hood-top vendor decisions and contact 3 suppliers each.** Stoked On Printing / Real Thread / Jakprints (discharge); Stahls' / local letterman shop (tackle-twill); Bayside / Royal Apparel (pre-construction hood-top). These have 4–6 week lead times. Without supplier confirmations the launch date is fiction.

**Next tier (parallelizable once Top 3 are unblocked):**

4. Render `igHook` on piece cards (one-line component change; high-leverage marketing surface).
5. Add `/capsule-01` and `/charter-roll` to `sitemap.ts`. Add `openGraph.images` + Twitter card meta.
6. Replace the in-memory `Set` in `/api/newsletter` with Resend audience + a separate `capsule-01-waitlist` audience.
7. Add a `dropAt: Date` field to each piece + a real countdown component.
8. Procure packaging: Arka box (15-day lead), Dutch Label Shop (14-day lead), Jukebox Print hangtag (10-day lead).
9. Complete the missing artwork PNGs (4 of 9 pieces missing front; 4 of 9 missing back/secondary placement).
10. Build the Airtable scan-to-ship station — physical infrastructure, not code.

---

## Risks (what could blow up the drop)

- **Duplicate edition numbers.** No technical interlock exists between Stripe webhooks and a numbering ledger. Brief calls this out as the one promise that, if broken, destroys the entire capsule premise. **Severity: catastrophic. Mitigation: build the scan-to-ship station + DB-backed Charter Roll.**
- **Supplier lead-time miss.** Arka 15 days + Dutch Label 14 days + Stahls' tackle-twill 4–6 weeks + bullion embroidery 3–4 weeks + screenprinter 2–3 weeks. If launch is set Friday-of-next-month, several of these are already late. **Severity: drop-killer. Mitigation: send POs this week.**
- **Brand violation lands at 7pm CT.** If the gold token and `text-white` sweep aren't done before the drop, the press articles screenshot a "no pure white anywhere" capsule on a site that is technically full of white pixels. **Severity: PR-narrative damage ("rich kid larping country culture" per brief line 798). Mitigation: 4-hour cleanup pass.**
- **Newsletter persistence resets on every deploy.** Vercel cold starts wipe the in-memory `Set`. Real waitlist signups are being silently lost between deploys. **Severity: data loss + 30-min-headstart is impossible to enforce. Mitigation: Resend audience or DB row.**
- **Printful blank availability changes mid-launch** (brief failure-mode #6). Piece 9 already had to flip Forest Green → Black because the variant didn't exist. **Severity: medium. Mitigation: email Printful account manager 14 days pre-launch to reserve the run.**
- **Wave I doesn't sell out** (brief failure-mode #4). Narrative damage > revenue. **Severity: brand-equity. Mitigation: tighten Wave I caps now (already done on paper for pieces 2, 6); never publish aggregate-units claim.**
- **Charter Roll right-to-be-forgotten conflict.** Brief promises names live "forever"; privacy policy promises deletion within 30 days. These will collide the first time a member emails `privacy@`. **Severity: legal. Mitigation: amend `/policies/privacy` to carve out the Roll with explicit consent at checkout + define what "retire" means under deletion.**
