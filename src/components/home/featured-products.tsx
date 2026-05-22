"use client";

import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";

const products = [
  { id: "classic-hood-tee", slug: "classic-hood-tee", name: "Classic Hood Tee", price: 38 },
  { id: "country-life-hoodie", slug: "country-life-hoodie", name: "Country Life Hoodie", price: 75 },
  { id: "hoodlum-dad-hat", slug: "hoodlum-dad-hat", name: "Hoodlum Dad Hat", price: 32 },
  { id: "sticker-pack", slug: "sticker-pack", name: "Sticker Pack", price: 12 },
];

export default function FeaturedProducts() {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleAddToCart = (product: (typeof products)[number]) => {
    addItem({
      id: `${product.id}-one-size`,
      productId: product.id,
      name: product.name,
      price: product.price,
      size: "One Size",
      quantity: 1,
      image: "",
      slug: product.slug,
    });
    openCart();
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display tracking-wide">
            LATEST DROP
          </h2>
          <div className="mt-3 mx-auto w-16 h-1 bg-accent rounded-full" />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-card border border-border rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-accent hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
            >
              {/* Placeholder Image */}
              <div className="aspect-square bg-muted flex items-center justify-center">
                <span className="text-muted-foreground text-sm uppercase tracking-wider">
                  Image
                </span>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <h3 className="text-white font-medium text-sm uppercase tracking-wide">
                  {product.name}
                </h3>
                <p className="text-accent font-bold text-lg font-display">
                  ${product.price}
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-accent hover:bg-accent-hover text-black font-semibold text-xs uppercase tracking-widest py-3 rounded transition-colors duration-200"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Shop All Link */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-accent hover:text-white font-semibold text-sm uppercase tracking-widest transition-colors duration-200"
          >
            SHOP ALL
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
