"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";
import CartItem from "./cart-item";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const totalItems = useCartStore((s) => s.totalItems);
  const totalPrice = useCartStore((s) => s.totalPrice);

  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        closeCart();
        return;
      }

      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    },
    [isOpen, closeCart]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const itemCount = totalItems();
  const subtotal = totalPrice();
  const freeShippingThreshold = 75;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 z-50 w-full max-w-md h-full bg-[#111] flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 className="font-display text-lg uppercase tracking-wider text-foreground">
            Your Cart
            {itemCount > 0 && (
              <span className="ml-2 text-sm text-muted-foreground font-body">
                ({itemCount} {itemCount === 1 ? "item" : "items"})
              </span>
            )}
          </h2>
          <button
            ref={closeButtonRef}
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <svg
              className="w-16 h-16 text-muted-foreground mb-4"
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
            <p className="font-display text-lg uppercase text-foreground mb-2">
              Your cart is empty
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Looks like you haven&apos;t added anything yet.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="inline-block bg-accent hover:bg-accent-hover text-background font-display uppercase text-sm tracking-wider px-8 py-3 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <>
            {/* Scrollable items */}
            <div className="flex-1 overflow-y-auto px-6">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border px-6 py-5 space-y-4">
              {/* Free shipping progress */}
              {remainingForFreeShipping > 0 ? (
                <p className="text-xs text-center text-muted-foreground">
                  Spend{" "}
                  <span className="text-accent font-semibold">
                    ${remainingForFreeShipping.toFixed(2)}
                  </span>{" "}
                  more for free shipping
                </p>
              ) : (
                <p className="text-xs text-center text-accent font-semibold">
                  You qualify for free shipping!
                </p>
              )}

              {/* Subtotal */}
              <div className="flex items-center justify-between">
                <span className="font-display uppercase text-sm tracking-wide text-foreground">
                  Subtotal
                </span>
                <span className="font-display text-lg text-foreground">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="block w-full bg-accent hover:bg-accent-hover text-background font-display uppercase text-sm tracking-wider text-center py-3.5 transition-colors"
              >
                Checkout
              </Link>

              {/* Continue Shopping */}
              <button
                onClick={closeCart}
                className="block w-full text-center text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
