"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";
import type { Product } from "@/lib/mock-data";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const size = product.sizes[0] || "OS";
    addItem({
      id: `${product.id}-${size}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      size,
      quantity: 1,
      image: product.image,
      slug: product.slug,
    });
    openCart();
  };

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group relative flex flex-col rounded-lg border border-border bg-card overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:border-gold hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
    >
      {/* Image area */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        {product.isNew && !product.isSoldOut && (
          <span className="absolute top-3 left-3 bg-gold text-background text-xs font-bold uppercase px-2 py-1 rounded">
            NEW
          </span>
        )}
        {product.isSoldOut && (
          <span className="absolute top-3 left-3 bg-destructive text-foreground text-xs font-bold uppercase px-2 py-1 rounded">
            SOLD OUT
          </span>
        )}

        {/* Add to cart button - appears on hover */}
        {!product.isSoldOut && (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-0 left-0 right-0 bg-gold text-background font-bold text-sm uppercase tracking-wider py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-gold-dark"
          >
            ADD TO CART
          </button>
        )}
      </div>

      {/* Product info */}
      <div className="p-4 flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-foreground truncate group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground font-medium">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
