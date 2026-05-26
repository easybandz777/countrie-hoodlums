"use client";

import { useState } from "react";
import { Minus, Plus, Check } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import type { Product } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface AddToCartProps {
  product: Product;
  selectedSize: string | null;
}

export default function AddToCart({ product, selectedSize }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const needsSize = product.sizes.length > 0;
  const canAdd = !product.isSoldOut && (!needsSize || selectedSize !== null);

  const handleAddToCart = () => {
    if (!canAdd) return;

    const size = selectedSize || "OS";
    addItem({
      id: `${product.id}-${size}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      size,
      quantity,
      image: product.image,
      slug: product.slug,
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    openCart();
  };

  const handleBuyNow = () => {
    if (!canAdd) return;

    const buySize = selectedSize || "OS";
    addItem({
      id: `${product.id}-${buySize}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      size: buySize,
      quantity,
      image: product.image,
      slug: product.slug,
    });

    // Navigate to checkout (placeholder for now)
    window.location.href = "/checkout";
  };

  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const increment = () => setQuantity((q) => Math.min(10, q + 1));

  return (
    <div className="flex flex-col gap-4">
      {/* Quantity selector */}
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Quantity
        </span>
        <div className="inline-flex items-center border border-border rounded-md w-fit">
          <button
            onClick={decrement}
            disabled={quantity <= 1}
            className="p-3 text-foreground hover:text-gold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="min-w-[3rem] text-center text-foreground font-semibold text-sm tabular-nums">
            {quantity}
          </span>
          <button
            onClick={increment}
            disabled={quantity >= 10}
            className="p-3 text-foreground hover:text-gold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add to Cart button */}
      <button
        onClick={handleAddToCart}
        disabled={!canAdd}
        className={cn(
          "w-full py-4 font-bold text-sm uppercase tracking-widest rounded-md transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          showSuccess
            ? "bg-green-600 text-cream"
            : "bg-gold text-black hover:bg-gold-dark active:scale-[0.98]"
        )}
      >
        <span className="inline-flex items-center justify-center gap-2">
          {showSuccess ? (
            <>
              <Check className="w-4 h-4" />
              ADDED TO CART
            </>
          ) : needsSize && !selectedSize ? (
            "SELECT A SIZE"
          ) : (
            "ADD TO CART"
          )}
        </span>
      </button>

      {/* Buy Now button */}
      <button
        onClick={handleBuyNow}
        disabled={!canAdd}
        className="w-full py-4 font-bold text-sm uppercase tracking-widest rounded-md border border-gold text-cream hover:bg-gold/10 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        BUY NOW
      </button>
    </div>
  );
}
