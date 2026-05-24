import type { CartItem } from "@/types/product";
import { stripe } from "./client";

// Stripe requires absolute https URLs for both line-item images and the
// success/cancel URLs. Default to the live HCC origin when the env isn't
// set (e.g. on Vercel previews where NEXT_PUBLIC_SITE_URL isn't wired).
function siteOrigin() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (raw && /^https?:\/\//.test(raw) && !raw.startsWith("http://localhost")) {
    return raw.replace(/\/$/, "");
  }
  return "https://thecountriehoodlums.com";
}

function absolutize(origin: string, path: string) {
  if (!path) return null;
  if (/^https?:\/\//.test(path)) return path;
  return `${origin}${path.startsWith("/") ? "" : "/"}${path}`;
}

export async function createCheckoutSession(items: CartItem[]) {
  const origin = siteOrigin();

  const lineItems = items.map((item) => {
    const absImage = absolutize(origin, item.image);
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          ...(absImage ? { images: [absImage] } : {}),
          metadata: {
            productId: item.productId,
            size: item.size,
            slug: item.slug,
          },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "GB", "AU"],
    },
  });

  return session;
}
