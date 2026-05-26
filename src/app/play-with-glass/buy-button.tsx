"use client";

import { useState } from "react";
import { useCartStore } from "@/stores/cart-store";

const EXPERIENCE_ID = "exp-play-with-glass";

interface Props {
  price: number;
  large?: boolean;
}

export default function BuyButton({ price, large = false }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const items = useCartStore((s) => s.items);
  const [justAdded, setJustAdded] = useState(false);

  const alreadyInCart = items.some((i) => i.productId === EXPERIENCE_ID);

  const handleClaim = () => {
    if (alreadyInCart) {
      openCart();
      return;
    }
    addItem({
      id: `${EXPERIENCE_ID}-${Date.now()}`,
      productId: EXPERIENCE_ID,
      name: "Play 18 with Glass",
      price,
      size: "Charter Spot",
      quantity: 1,
      image: "/images/crew/glass.webp",
      slug: "play-with-glass",
    });
    setJustAdded(true);
    setTimeout(() => {
      openCart();
      setJustAdded(false);
    }, 600);
  };

  const baseClasses = large
    ? "inline-flex items-center justify-center px-12 py-6 text-base"
    : "inline-flex items-center justify-center px-10 py-5 text-sm";

  return (
    <button
      type="button"
      onClick={handleClaim}
      className={`${baseClasses} bg-accent hover:bg-accent-hover text-background font-display font-bold uppercase tracking-widest rounded transition-colors duration-200 disabled:opacity-50`}
    >
      {justAdded
        ? "Added →"
        : alreadyInCart
          ? "In cart — review →"
          : `Claim a spot · $${price}`}
    </button>
  );
}
