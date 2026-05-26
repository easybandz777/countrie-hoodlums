# Rendering Context Audit

**Agent 20 — end-user-perspective QA. What does a real buyer see across `/`, `/shop`, `/capsule-01`, and `/shop/[slug]`?**

This audit is not about whether the source files exist. It is about whether, when a buyer scrolls each page, the visual that arrives at their eyes makes them want to give us money. Most of these mockups currently do not.

---

## How the defects manifest

Five distinct defect classes, each tied to one or more render paths. For every defect I name (a) the source file, (b) the component that puts it on screen, (c) what container styling either masks or amplifies the problem, and (d) what the buyer actually sees.

### Defect 1 — The white-rectangle "sticker on a hoodie" in Capsule 01 product mockups

**Affected files (all rendered through `<PieceCard>` in `src/app/capsule-01/page.tsx:381`):**

| File | Piece | What buyer sees |
|---|---|---|
| `public/images/products/capsule-01/piece-01-member-001.jpg` | No. 1 — Member Number 001 ($78) | Pepper tee with a **solid white rectangle** the size of a sheet of paper floating on the back, gold "HOODLUMS" wordmark inside it. The print is not on the garment — it sits *on top of* the garment. |
| `public/images/products/capsule-01/piece-02-patron-saint.jpg` | No. 2 — Patron Saint ($88) | Faded-bone tee with the gorgeous santo-card framed by a **white rectangle that is brighter than the "bone" of the tee itself**. The frame looks like masking tape. |
| `public/images/products/capsule-01/piece-04-order-flagship.jpg` | No. 4 — Order of the Hoodlum **(FLAGSHIP, $248)** | Charcoal hoodie with a **3-inch white square in the chest position**, and inside that square — a *tiny, low-resolution, indecipherable* navy shield. The most expensive piece in the capsule looks like someone stuck a Polaroid to a hoodie. |
| `public/images/products/capsule-01/piece-05-hoodlums-only.jpg` | No. 5 — HOODLUMS ONLY hoodie ($148) | Pepper hoodie with the gold blackletter wordmark slapped on a **white rectangle the size of a notebook**. The "interactive hood-up reveal" lever is dead — there's nothing to reveal because the print is on the chest of a generic stock photo. |
| `public/images/products/capsule-01/piece-06-quiet-hoodlum.jpg` | No. 6 — Quiet Hoodlum ($168, the stealth-wealth piece) | Tan/burro hoodie with a **giant white box containing the skull-cowboy artwork**. This piece's entire thesis ("tiny bullion-stitch chest icon — if you know, you know") is destroyed: instead of a 1.5" tonal embroidery, the buyer sees a 12" sticker. The lever ("Status + Scarcity weaponized through *omission*") is unrecognizable. |
| `public/images/products/capsule-01/piece-07-chapter-01.jpg` | No. 7 — Chapter 01 Crew ($118) | Pepper crew with the heritage shield artwork inside a **white rectangle** instead of the spec'd "off-center right chest" placement. The asymmetry that was the entire visual lever ("art-direction vs. center is for everybody else") is gone — it's centered, in a white box. |
| `public/images/products/capsule-01/piece-09-homecoming-24.jpg` | No. 9 — Homecoming Crew ($148) | Black crew with the "24" tackle-twill artwork inside a **white rectangle** that visually reads as a printed iron-on patch rather than the spec'd cream wool felt + chain-stitch outline. The entire "real-deal varsity" lever collapses. |

**Why the container amplifies the defect:** the `<PieceCard>` image block at `src/app/capsule-01/page.tsx:381-403` sets `backgroundColor: piece.previewIsProductMockup ? "#1A1A1A" : "#F5F0E1"`. The intent is good — a near-black frame for product mockups, cream for raw artwork. But the white rectangle inside the mockup itself is the same value as a Creek Cream paper, so against the `#1A1A1A` dark gray container, **the white rectangle pops harder than the garment does**. The buyer's eye locks onto the white box first, the garment second. The artifact becomes the focal point of the image. On `/capsule-01`, the page where buyers decide whether $78 to $248 is worth the click, the dominant visual signal is "sticker not garment."

This is the same defect Agent 1 / Agent 2 / Agent 3 / Agent 4 flagged from the generation side. The rendering context confirms it: the dark Capsule 01 frame doesn't hide the defect — it spotlights it.

### Defect 2 — Raw PNG artwork shown on cream paper (Pieces 3, 4, 6, 8)

**Affected pieces** (per `src/lib/capsule-01-data.ts`, `previewIsProductMockup: false`):
- Piece 3 — Last Light, County Line ($84) → `/artwork/capsule-01/piece-03-back.png` (the cinematic Pavement Ends sunset/truck/bonfire scene)
- Piece 4 — Order of the Hoodlum ($248 flagship) → `/artwork/capsule-01/piece-04-back.png` (Countrie Hoodlums shield with skull/bottle/horseshoe)
- Piece 6 — Quiet Hoodlum ($168) → `/artwork/capsule-01/piece-06-front.png` (skull-cowboy with bandana — small isolated icon)
- Piece 8 — Club Issue No. 24 ($218) → `/artwork/capsule-01/piece-08-front.png` (round embroidered "Hoodlums Country Club / Charter Member" patch on cream backing)

**What the buyer sees on `/capsule-01`:** these four pieces render with `object-contain p-6` on a `#F5F0E1` Creek Cream square, with a tiny "Design preview" pill bottom-right. Next to the seven pieces that show *some* form of garment mockup (even with the white-rectangle defect), the cream-tile pieces feel like a **placeholder collage**. Specifically:

- The page promises "11 hand-numbered pieces." The buyer scrolls and sees **a grid where the items disagree about what they are**. Some show dark-garment-on-dark-frame. Some show floating artwork on what looks like watercolor paper. The grid loses rhythm.
- The "Design preview" pill is honest but reinforces the wrong message: it tells buyers *this is not the real product*. On a coming-soon page where the whole point is to build pre-launch lust, the disclaimer creates the opposite of FOMO.
- The Flagship — Piece 4 at $248, the highest-priced piece in the capsule and the linchpin of the "Order of the Hoodlum" tribal-identity lever — currently has **no garment mockup at all** on the live page. It is the single most important piece and it is rendered as a floating shield illustration. The buyer cannot see a hoodie. There is also a staged `piece-04-order-flagship.jpg` on disk that has the white-rectangle defect — neither version is acceptable, but the data file points to the worse of the two (no garment at all).
- Piece 6 — same problem — is the *stealth-wealth* piece, the $168 cream pullover. The "Quiet Hoodlum" name is the entire pitch. On the live page the buyer sees a 2-inch skull-cowboy icon hovering on a cream square. There is no hoodie. The "quiet" reading is impossible because there is nothing for the bullion icon to be quiet *against*.

### Defect 3 — `image === cartoonImage` (hover-swap is dead)

The shop card (`src/components/shop/product-card.tsx:38-54`) layers two `<Image>` tags — `product.image` visible by default, `product.cartoonImage` revealed on `group-hover:opacity-100`. The intent: a photo→cartoon swap that telegraphs the brand's tone. When the two paths are identical, the buyer hovers and **nothing happens**. The interaction is invisible. Both the home `<FeaturedProducts>` grid and the `/shop` `<ProductCard>` grid use the same component pattern. Full list in the table below.

### Defect 4 — The polo problem

`prod_033` ("HCC Country Club Polo", $58) is listed under `category: "tees"` but is described as a polo blank. Both `image` and `cartoonImage` point to `tee-golf-mono.webp` — and that file is **a flat HCC + crossed-clubs logo on transparent/white**. There is no polo in the file. There is no garment of any kind in the file. The buyer who clicks through to `/shop/polo-hcc-mono` and lands in `<ImageGallery>` sees a logo. They do not see a polo. They cannot tell whether they're buying a print, a sticker, a logo file, or a piece of clothing. The product description even confesses: *"Currently shown with the print artwork. Needs a Printful polo blank wired in (Hanes/Port Authority) before fulfillment."* This is a $58 product page that, by its own admission, cannot be ordered.

### Defect 5 — "Artwork-only" cards (logo without garment) on the shop card

Beyond the polo, there are other products where the `image` field points to artwork rather than a garment mockup, so the shop card displays a logo floating on a card background instead of a wearable piece. The leather hat line is a borderline case: `hat-leather-bonfire-country.webp` is a *real* hat photo (laser-engraved leather patch on a Richardson 112) — that one renders fine. The break-cases are the products where the `.webp` is a flat artwork file.

---

## Products with broken hover-swap (image === cartoonImage)

Identified by direct path comparison in `src/lib/mock-data.ts`. These products have hover-swap configured but both image slots point to the same file — so the buyer hovers and gets a zero-state interaction.

| Product | id | image | cartoonImage | Severity |
|---|---|---|---|---|
| HCC Country Club Polo | `prod_033` | `tee-golf-mono.webp` | `tee-golf-mono.webp` | **Critical** — also has no actual polo in the file (see Polo section) |
| Sunset Highway Patch Hat | `prod_023` | `hat-leather-sunset-highway.webp` | `hat-leather-sunset-highway.webp` | Low — image is a real hat photo; the buyer just doesn't get a cartoon reveal |
| Tree of Hoodlums Patch Hat | `prod_024` | `hat-leather-tree-of-hoodlums.webp` | `hat-leather-tree-of-hoodlums.webp` | Low — real hat photo, dead hover |
| Bonfire Country Patch Hat | `prod_025` | `hat-leather-bonfire-country.webp` | `hat-leather-bonfire-country.webp` | Low — real hat photo, dead hover |
| Compass Heritage Patch Hat | `prod_026` | `hat-leather-compass-heritage.webp` | `hat-leather-compass-heritage.webp` | Low — real hat photo, dead hover |
| Anonymous Hoodlum Tee | `prod_027` | `tee-anonymous-hoodlum.jpg` (printful) | `tee-anonymous-hoodlum.webp` | **High** — `.webp` is the *raw artwork* (logo-on-transparent, no garment). When the buyer hovers, the tee they were just looking at **disappears** and is replaced by a free-floating logo. Worse than no hover — the hover *destroys* the product preview. |
| Crossed Clubs Crest Tee | `prod_028` | `tee-golf-crossed-clubs.jpg` (printful) | `tee-golf-crossed-clubs.webp` | **High** — same pattern: hovering over a clean black tee mockup reveals a logo file. The "cartoon" is supposed to feel like *another version of the same product*, not a flat illustration. |
| Skull Caddy Tee | `prod_029` | printful jpg | `tee-golf-skull-caddy.webp` | **High** — same |
| Bad Lies, Good Times Tee | `prod_030` | printful jpg | `tee-golf-bad-lies.webp` | **High** — same |
| 18th Hole Tee | `prod_031` | printful jpg | `tee-golf-18th-hole.webp` | **High** — same |
| Country Club Emblem Tee | `prod_032` | printful jpg | `tee-golf-emblem.webp` | **High** — same |
| Vintage Scorecard Tee | `prod_034` | printful jpg | `tee-golf-scorecard.webp` | **High** — same |
| Cart Path Bandits Tee | `prod_035` | printful jpg | `tee-golf-cart-bandits.webp` | **High** — same |

**Pattern across the entire 8-piece golf line:** the photo state is a real Printful tee mockup, the "cartoon" state is just the artwork file. Hovering doesn't reveal *a stylized version of the product*; it reveals *the printable file*. From a buyer's psychology angle this is worse than no hover: it tells them "the thing you were just considering was just a logo we slapped on stock photography." It punctures the illusion the photo creates.

---

## The polo problem

`prod_033` — "HCC Country Club Polo" — is the single most broken product on the site, judged by the gap between *what it promises* and *what the buyer sees*.

**What the listing promises:**
- $58 polo
- Embroidered chest hit
- "HCC + crossed-clubs left-chest hit"
- Categorized alongside tees, branded as the golf-line capstone

**What the buyer actually sees:**
- Shop card (`<ProductCard>`): A square image displaying a **stacked black-and-gold HCC + crossed-clubs logo floating on white/transparent**. No collar, no buttons, no polo shape, no garment of any kind.
- PDP (`/shop/polo-hcc-mono` via `<ImageGallery>`): Same image, blown up larger. Same flat logo. Still no polo.
- Hover state: Same image (broken hover-swap). The buyer cannot escape the logo.
- Product description (after they scroll): *"Currently shown with the print artwork. Needs a Printful polo blank wired in (Hanes/Port Authority) before fulfillment."*

**Buyer's plausible mental sequence:**
1. Scrolls golf line. Sees a logo file next to actual tee mockups.
2. Concludes: "This is a sticker pack? An art print? Why is it $58?"
3. Either clicks through to investigate or skips entirely. The skip rate on this card is approaching 100% relative to the rest of the golf line.
4. If they click, they hit a PDP that confirms it's not a real product — the description literally says fulfillment isn't wired.

**Does the buyer ever see an actual polo? No.** Not on the shop card, not on the PDP, not on hover, not in any thumbnail. The product is a $58 listing for an unillustrated, unfulfillable garment. It should either be (a) hidden from the catalog until a polo mockup exists, or (b) replaced with a real polo render. Leaving it live is a slow tax on shop credibility — every visitor who scrolls the golf line absorbs "they don't have their inventory together" as a free impression.

---

## Revenue-weighted priority

I'm ranking by **(buyer impact per impression) × (impression count)**. The hierarchy is:

1. **Home page `/` featured products** = highest impression count. `FeaturedProducts` in `src/components/home/featured-products.tsx:8` slices `MOCK_PRODUCTS.filter(p => p.isNew).slice(0, 4)` — i.e., the first 4 NEW products. By current order in `mock-data.ts` that's `prod_001` Heritage Hoodie, `prod_002` Live Each Day Hoodie, `prod_003` Liquid Gold Hoodie, `prod_004` Crew Zip Hoodie. **None of these have broken hover-swaps**, but they are also not Capsule 01 — Capsule 01 currently gets zero home-page exposure.
2. **`/capsule-01`** = highest *intent* per impression. This is the page where the brand thesis lives. Every buyer who lands here is a soft lead.
3. **PDPs** = highest *conversion* per impression. Buyer is one click from purchase.
4. **`/shop` catalog cards** = highest *traffic* per impression on the catalog side, but lowest individual stake.

Combining the two, here is the actual fix order to maximize sales recovered per fix-hour:

### P0 — Fix today

| # | Item | Why | Where it hurts |
|---|---|---|---|
| 1 | **Piece 04 — Order of the Hoodlum flagship ($248)** | The single highest-priced piece in the entire site. Currently renders as a free-floating shield on cream. Capsule 01 narrative collapses without a hero garment shot for the flagship. | `/capsule-01` Wave II section + the entire pre-launch waitlist conversion funnel. |
| 2 | **Piece 06 — Quiet Hoodlum ($168)** | The stealth-wealth pitch is the brand's most defensible premium lever. Currently shows a 2-inch icon floating on cream. The pitch ("if you know, you know — small chest embroidery") is literally invisible. | `/capsule-01` Wave II — and the Quiet Hoodlum is the piece that justifies the $168 price point for the whole capsule's positioning. |
| 3 | **Polo `prod_033`** | Active broken listing. Buyer sees a logo file at $58. Every shop visitor scrolls past it. | `/shop` golf cluster + `/shop/polo-hcc-mono` PDP. |

### P1 — Fix this week

| # | Item | Why | Where it hurts |
|---|---|---|---|
| 4 | **Regenerate the 5 white-rectangle Capsule 01 mockups (pieces 01, 02, 05, 07, 09)** | These render as "sticker on garment." Five of the cleanest, most marketable Capsule 01 pieces are visually disqualified. Pieces 02 (Patron Saint, $88) and 05 (Hoodlums Only, $148) are the *most Instagram-shareable* concepts in the capsule — they're the IG-hook content. Currently they look amateur. | `/capsule-01` — primary capsule page conversion. Also feeds future IG/email assets. |
| 5 | **Pieces 03 and 08 — replace cream-paper artwork-only previews with real garment mockups** | Piece 03 (Last Light, $84) and Piece 08 (Club Issue No. 24, $218) currently render as floating artwork. They're not as broken as the white-rectangle pieces because they at least show the *design*, but the grid feels inconsistent. | `/capsule-01` grid rhythm. Piece 08 is a Wave II $218 hoodie — Wave II only has 5 pieces, every one of them matters. |
| 6 | **Fix the 8-product golf line hover-swap (prods 027–032, 034, 035)** | Hovering currently *destroys* the product visual by replacing the mockup with the print file. The whole golf line is 8 of the 10 most recent products. Conservatively this is 20–40% of catalog page impressions. | `/shop` golf cluster — affects every browse session. |

### P2 — Polish

| # | Item | Why | Where it hurts |
|---|---|---|---|
| 7 | **4 leather-hat dead hovers (prods 023–026)** | Real hat photos in both slots — the hover is just a no-op. Not destructive, just lifeless. | `/shop` hats cluster — minor missed delight. |
| 8 | **Wire Capsule 01 piece previews into home featured grid** | Currently the home page features hoodies 001–004 from generic mock-data. Capsule 01 — the explicit pre-launch narrative — gets zero home-page real estate. Once mockups are good, Piece 01 ($78 tee) and Piece 04 ($248 flagship) belong in the LATEST DROP grid. | `/` home page — recapture the funnel that currently never reaches `/capsule-01`. |

### Where the lost revenue lives, in plain English

The single largest revenue gap on the site right now is **Piece 04, the $248 flagship hoodie that has no garment mockup on the page where it is meant to be sold**. The second largest is **Piece 06, the $168 stealth-wealth hoodie that depends entirely on a "tiny chest embroidery" reading that is impossible to perceive when the chest is a 2-inch icon floating on cream paper**. Together those two pieces are the entire Wave II revenue ceiling for the capsule's premium tier.

The third largest is **the 8 golf-line products with destructive hover-swaps**, because they touch every shop visitor, not just Capsule 01 leads.

The polo is a smaller absolute number but the *highest credibility tax per impression* — anyone who scrolls past it absorbs "amateur" as a free impression about the brand.

---

## Summary

**Three rendering paths, five defect classes, one consistent failure mode:** the user is being asked to imagine a garment from a presentation that breaks the imagination.

- On `/capsule-01`, 5 of the 7 product mockups render the print as a literal white rectangle pasted on the garment — the dark `#1A1A1A` container amplifies rather than masks this. 4 more pieces (3, 4, 6, 8) bail out entirely and show flat artwork on cream paper, with a "Design preview" disclaimer that kills FOMO at the exact moment the page is trying to manufacture it.
- On `/shop` and PDPs, the entire 8-piece golf line has a hover-swap that *destroys* the product preview by replacing the tee mockup with the raw print file. This is worse than no hover — it punctures the illusion the static photo creates.
- The polo (`prod_033`) is a $58 listing showing a flat logo file. There is no polo anywhere in its rendering pipeline. The product description admits fulfillment isn't wired.
- The flagship of the entire capsule (Piece 04, $248) has no garment mockup on the live page — only a free-floating shield illustration. The single most expensive piece is also the worst-presented.

**The smallest fix-set with the largest revenue lift:** P0 — Piece 04 mockup, Piece 06 mockup, polo de-listed-or-rebuilt. Total: 3 assets. Estimated impact: re-opens the entire Wave II premium tier and removes one persistent credibility tax from the shop.

**Honest verdict:** the source files exist for most of this, the brand voice exists, the design specs are world-class. What's missing is the last 5% — the layer where the spec lands as a believable garment in front of a buyer's eyes. Until that layer is fixed, every dollar spent on traffic to `/capsule-01` is leaking out at the mockup-rendering stage.
