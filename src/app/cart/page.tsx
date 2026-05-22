"use client";

import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";
import CartItem from "@/components/cart/cart-item";
import CartSummary from "@/components/cart/cart-summary";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const totalItems = useCartStore((s) => s.totalItems);
  const clearCart = useCartStore((s) => s.clearCart);

  const itemCount = totalItems();

  if (items.length === 0) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <svg
          className="w-20 h-20 text-muted-foreground mb-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <h1 className="font-display text-3xl uppercase text-foreground mb-3">
          Your Cart is Empty
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Looks like you haven&apos;t added anything to your cart yet. Browse our collection and find something you love.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-accent hover:bg-accent-hover text-background font-display uppercase text-sm tracking-wider px-10 py-4 transition-colors"
        >
          Shop Now
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl sm:text-4xl uppercase text-foreground">
          Your Cart
          <span className="ml-3 text-lg text-muted-foreground font-body">
            ({itemCount} {itemCount === 1 ? "item" : "items"})
          </span>
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-muted-foreground hover:text-destructive transition-colors underline underline-offset-4"
        >
          Clear Cart
        </button>
      </div>

      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left: Cart Items */}
        <div className="lg:col-span-2">
          <div className="divide-y divide-border">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Continue Shopping */}
          <div className="mt-8">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <CartSummary />
          </div>
        </div>
      </div>
    </section>
  );
}
