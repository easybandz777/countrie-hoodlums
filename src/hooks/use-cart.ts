"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/stores/cart-store";
import type { CartItem } from "@/types/product";

const EMPTY_CART: CartItem[] = [];

export function useCart() {
  const [hydrated, setHydrated] = useState(false);

  const items = useCartStore((state) => state.items);
  const isOpen = useCartStore((state) => state.isOpen);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const openCart = useCartStore((state) => state.openCart);
  const closeCart = useCartStore((state) => state.closeCart);
  const totalItems = useCartStore((state) => state.totalItems);
  const totalPrice = useCartStore((state) => state.totalPrice);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const cartItems = hydrated ? items : EMPTY_CART;
  const cartCount = hydrated ? totalItems() : 0;
  const cartTotal = hydrated ? totalPrice() : 0;
  const isCartEmpty = cartItems.length === 0;

  return {
    items: cartItems,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    cartCount,
    cartTotal,
    isCartEmpty,
    hydrated,
  };
}
