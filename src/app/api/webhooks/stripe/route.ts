import { NextResponse } from "next/server";
import type Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { stripe } = await import("@/lib/stripe/client");
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleCheckoutCompleted(session);
      break;
    }
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { stripe } = await import("@/lib/stripe/client");

  const full = await stripe.checkout.sessions.retrieve(session.id, {
    expand: ["line_items.data.price.product", "collected_information"],
  });

  const shipping = full.collected_information?.shipping_details;
  if (!shipping?.address) {
    console.error(`[printful] No shipping address on session ${session.id}`);
    return;
  }

  const { getPrintfulVariantId } = await import(
    "@/lib/printful/variant-mapping"
  );

  const lineItems = full.line_items?.data ?? [];
  const printfulItems: Array<{
    sync_variant_id: number;
    quantity: number;
    retail_price: string;
  }> = [];
  const skipped: Array<{ name: string; reason: string }> = [];

  for (const li of lineItems) {
    const product = li.price?.product as Stripe.Product | undefined;
    const productId = product?.metadata?.productId;
    const size = product?.metadata?.size;
    const name = product?.name ?? li.description ?? "unknown";

    if (!productId || !size) {
      skipped.push({ name, reason: "missing productId/size metadata" });
      continue;
    }

    const variantId = getPrintfulVariantId(productId, size);
    if (!variantId) {
      skipped.push({
        name,
        reason: `no Printful variant mapped for ${productId}/${size}`,
      });
      continue;
    }

    const unitAmount = li.price?.unit_amount ?? 0;
    printfulItems.push({
      sync_variant_id: variantId,
      quantity: li.quantity ?? 1,
      retail_price: (unitAmount / 100).toFixed(2),
    });
  }

  if (skipped.length > 0) {
    console.warn(`[printful] Skipped ${skipped.length} item(s):`, skipped);
  }

  if (printfulItems.length === 0) {
    console.log(
      `[printful] No fulfillable items on session ${session.id}; skipping order creation`
    );
    return;
  }

  const { createDraftOrder, PrintfulError } = await import(
    "@/lib/printful/client"
  );

  try {
    const order = await createDraftOrder({
      external_id: session.id,
      recipient: {
        name: shipping.name,
        address1: shipping.address.line1 ?? "",
        address2: shipping.address.line2 ?? undefined,
        city: shipping.address.city ?? "",
        state_code: shipping.address.state ?? "",
        country_code: shipping.address.country ?? "",
        zip: shipping.address.postal_code ?? "",
        email: full.customer_details?.email ?? "",
        phone: full.customer_details?.phone ?? undefined,
      },
      items: printfulItems,
      retail_costs: {
        currency: full.currency?.toUpperCase() ?? "USD",
        subtotal: ((full.amount_subtotal ?? 0) / 100).toFixed(2),
        shipping: ((full.shipping_cost?.amount_total ?? 0) / 100).toFixed(2),
        tax: ((full.total_details?.amount_tax ?? 0) / 100).toFixed(2),
        total: ((full.amount_total ?? 0) / 100).toFixed(2),
      },
    });

    console.log(
      `[printful] Draft order ${order.id} created for session ${session.id}`
    );
  } catch (err) {
    if (err instanceof PrintfulError) {
      console.error(
        `[printful] API error (${err.status}) for session ${session.id}: ${err.message}`
      );
    } else {
      console.error(
        `[printful] Unexpected error for session ${session.id}:`,
        err
      );
    }
  }
}
