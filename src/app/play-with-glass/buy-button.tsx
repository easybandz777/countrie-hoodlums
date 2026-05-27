"use client";

import { useEffect, useState } from "react";
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
  const [remaining, setRemaining] = useState<number | null>(null);

  const alreadyInCart = items.some((i) => i.productId === EXPERIENCE_ID);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/play-with-glass/spots-remaining", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const json = (await res.json()) as { remaining: number };
        if (!cancelled) setRemaining(json.remaining);
      } catch {
        // Keep null → optimistic enabled state
      }
    }
    load();
    const interval = setInterval(load, 30_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const soldOut = remaining !== null && remaining <= 0;

  const handleClaim = () => {
    if (soldOut) return;
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

  const label = soldOut
    ? "All claimed"
    : justAdded
      ? "Added →"
      : alreadyInCart
        ? "In cart — review →"
        : `Claim a spot · $${price}`;

  const colorClasses = soldOut
    ? "bg-muted text-muted-foreground cursor-not-allowed"
    : "bg-accent hover:bg-accent-hover text-background";

  return (
    <button
      type="button"
      onClick={handleClaim}
      disabled={soldOut}
      className={`${baseClasses} ${colorClasses} font-display font-bold uppercase tracking-widest rounded transition-colors duration-200`}
    >
      {label}
    </button>
  );
}
