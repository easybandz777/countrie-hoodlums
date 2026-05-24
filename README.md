# Countrie Hoodlums - Official Merch Store

E-commerce storefront for Countrie Hoodlums merchandise.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Payments:** Stripe Checkout
- **Email:** Resend (order confirmations, shipping updates)
- **Analytics:** Google Analytics
- **Deployment:** Vercel

## Setup

```bash
# Install dependencies
npm install

# Copy environment variables and fill in your keys
cp .env.example .env.local

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start development server           |
| `npm run build`   | Create production build            |
| `npm run start`   | Start production server            |
| `npm run lint`    | Run ESLint                         |

## Environment Variables

See `.env.example` for the full list of required variables. Key integrations:

- **Stripe** - payment processing (test keys for development)
- **Resend** - transactional email delivery
- **Google Analytics** - site analytics
- **Printful** - print-on-demand fulfillment (see below)
- **ADMIN_KEY** - gates `/admin/orders?key=...` for reviewing Printful drafts

## Printful Integration

Orders flow: customer pays via Stripe → `checkout.session.completed` webhook → a **draft** order is created in Printful with the customer's shipping address. You review and confirm each order manually in the Printful dashboard before production starts.

### One-time setup

1. Create a Printful account at [printful.com](https://www.printful.com) and add a store (pick "Manual / API platform").
2. Generate an API token at Settings → API Tokens (full access) and put it in `.env.local` as `PRINTFUL_API_KEY`.
3. In Printful, create a sync product for each apparel item — pick the blank (hoodie, tee, crewneck), upload your design files, and save. Each size becomes a "sync variant" with its own ID.
4. Backfill the variant IDs into [src/lib/mock-data.ts](src/lib/mock-data.ts) under `printfulVariantIds`, keyed by size:
   ```ts
   printfulVariantIds: { S: 4012345, M: 4012346, L: 4012347, ... }
   ```
   Products without `printfulVariantIds` (leather patch hats, pins, stickers) are skipped — those need a different vendor.

### Reviewing orders

Visit `/admin/orders?key=<ADMIN_KEY>` to see draft orders and jump straight to Printful for confirm/cancel.

### Webhook setup

Point Stripe's `checkout.session.completed` webhook at `https://yourdomain.com/api/webhooks/stripe` and put the signing secret in `STRIPE_WEBHOOK_SECRET`. Locally, use `stripe listen --forward-to localhost:3000/api/webhooks/stripe`.
