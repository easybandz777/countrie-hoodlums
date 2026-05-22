import { NextResponse } from "next/server";
import { z } from "zod";
import { createCheckoutSession } from "@/lib/stripe/checkout";

const CartItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  name: z.string(),
  price: z.number().positive(),
  size: z.string(),
  quantity: z.number().int().positive(),
  image: z.string(),
  slug: z.string(),
});

const CheckoutRequestSchema = z.object({
  items: z.array(CartItemSchema).min(1, "Cart cannot be empty"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = CheckoutRequestSchema.parse(body);

    const session = await createCheckoutSession(items);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid cart data", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Checkout session error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
