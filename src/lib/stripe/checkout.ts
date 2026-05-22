import type { CartItem } from "@/types/product";
import { stripe } from "./client";

export async function createCheckoutSession(items: CartItem[]) {
  const lineItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        images: item.image ? [item.image] : [],
        metadata: {
          productId: item.productId,
          size: item.size,
          slug: item.slug,
        },
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/cart`,
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "AU"],
    },
  });

  return session;
}
