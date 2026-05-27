import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/client";

// Limit hardcoded for now — when the Charter Roll backend exists, this
// should come from a config row.
const TOTAL_SPOTS = 8;
// We match by line-item description (Stripe caps `expand` at 4 levels,
// so reaching `data.line_items.data.price.product.metadata` fails;
// description is set from the product name during checkout creation and
// is uniquely identifying for this SKU).
const EXPERIENCE_NAME = "Play 18 with Glass";

// Recompute on every request — Stripe's API is fast and the page only
// renders a few times a minute. Avoids stale counter weirdness on a
// hot drop.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  // No real Stripe key configured → return the optimistic full count.
  // Used during local dev and on Vercel previews without prod creds.
  if (
    !process.env.STRIPE_SECRET_KEY ||
    process.env.STRIPE_SECRET_KEY === "sk_test_placeholder"
  ) {
    return NextResponse.json({
      total: TOTAL_SPOTS,
      taken: 0,
      remaining: TOTAL_SPOTS,
      stripeConfigured: false,
    });
  }

  try {
    // Pull recent checkout sessions. 100 is the Stripe page max; we cap
    // there because we never expect more than 8 successful sessions for
    // this SKU anyway (and any wider audit would happen against a DB).
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      expand: ["data.line_items"],
    });

    let taken = 0;
    for (const session of sessions.data) {
      // Only count fully paid sessions — open/expired sessions don't
      // hold a spot.
      if (session.payment_status !== "paid") continue;

      const lineItems = session.line_items?.data ?? [];
      for (const item of lineItems) {
        if (item.description === EXPERIENCE_NAME) {
          taken += item.quantity ?? 1;
        }
      }
    }

    const remaining = Math.max(0, TOTAL_SPOTS - taken);
    return NextResponse.json({
      total: TOTAL_SPOTS,
      taken,
      remaining,
      stripeConfigured: true,
    });
  } catch (err) {
    console.error("[spots-remaining] Stripe query failed:", err);
    // Fail-open to the optimistic count rather than break the page.
    return NextResponse.json({
      total: TOTAL_SPOTS,
      taken: 0,
      remaining: TOTAL_SPOTS,
      stripeConfigured: true,
      error: "stripe-query-failed",
    });
  }
}
