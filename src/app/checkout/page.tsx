"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore, type CartStore } from "@/stores/cart-store";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state: CartStore) => state.items);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      router.replace("/shop");
      return;
    }

    const createSession = async () => {
      try {
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to create checkout session");
        }

        const { url } = await response.json();

        if (url) {
          window.location.href = url;
        } else {
          throw new Error("No checkout URL returned");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong"
        );
      }
    };

    createSession();
  }, [items, router]);

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <p className="text-red-400 text-lg">{error}</p>
          <button
            onClick={() => router.push("/cart")}
            className="px-6 py-2 bg-cream text-black font-bold uppercase text-sm hover:bg-neutral-200 transition-colors"
          >
            Return to Cart
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-2 border-cream border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-neutral-400 text-lg">
          Redirecting to checkout...
        </p>
      </div>
    </main>
  );
}
