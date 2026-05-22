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
