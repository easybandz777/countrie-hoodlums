"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";

export default function CartSummary() {
  const totalPrice = useCartStore((s) => s.totalPrice);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = totalPrice();
  const freeShippingThreshold = 75;
  const shippingCost = subtotal >= freeShippingThreshold ? 0 : 7.99;
  const taxRate = 0.0825;
  const estimatedTax = subtotal * taxRate;
  const total = subtotal + shippingCost + estimatedTax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim()) {
      // Promo code validation would go here
      setPromoApplied(true);
    }
  };

  return (
    <div className="bg-[#111] border border-border p-6 space-y-5">
      <h3 className="font-display text-lg uppercase tracking-wider text-foreground">
        Order Summary
      </h3>

      {/* Line Items */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground">
            {shippingCost === 0 ? (
              <span className="text-accent font-semibold">FREE</span>
            ) : (
              `$${shippingCost.toFixed(2)}`
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Estimated Tax</span>
          <span className="text-foreground">${estimatedTax.toFixed(2)}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Total */}
      <div className="flex justify-between items-center">
        <span className="font-display text-base uppercase tracking-wide text-foreground">
          Total
        </span>
        <span className="font-display text-xl text-foreground">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Promo Code */}
      <form onSubmit={handleApplyPromo} className="flex gap-2">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Promo code"
          className="flex-1 bg-background border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors"
          disabled={promoApplied}
        />
        <button
          type="submit"
          disabled={!promoCode.trim() || promoApplied}
          className="px-4 py-2 border border-accent text-accent text-sm font-display uppercase tracking-wider hover:bg-accent hover:text-background disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {promoApplied ? "Applied" : "Apply"}
        </button>
      </form>
      {promoApplied && (
        <p className="text-xs text-accent">Promo code applied!</p>
      )}

      {/* Checkout Button */}
      <Link
        href="/checkout"
        className="block w-full bg-accent hover:bg-accent-hover text-background font-display uppercase text-sm tracking-wider text-center py-4 transition-colors"
      >
        Proceed to Checkout
      </Link>

      {/* Free Shipping Note */}
      {subtotal < freeShippingThreshold && (
        <p className="text-xs text-center text-muted-foreground">
          Add{" "}
          <span className="text-accent font-semibold">
            ${(freeShippingThreshold - subtotal).toFixed(2)}
          </span>{" "}
          more for free shipping
        </p>
      )}
    </div>
  );
}
