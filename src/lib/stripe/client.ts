import Stripe from "stripe";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key === "sk_test_placeholder") {
    // Return a mock-safe instance during build or when no key is set
    return new Stripe("sk_test_placeholder", {
      typescript: true,
    });
  }
  return new Stripe(key, {
    typescript: true,
  });
}

export const stripe = getStripe();
