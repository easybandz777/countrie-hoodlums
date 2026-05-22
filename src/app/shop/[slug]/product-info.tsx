"use client";

import { useState } from "react";
import type { Product } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import SizeSelector from "@/components/shop/size-selector";
import AddToCart from "@/components/shop/add-to-cart";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null
  );

  // Example of unavailable sizes (can be dynamic in future)
  const unavailableSizes: string[] = [];

  return (
    <div className="flex flex-col gap-6">
      {/* Product name */}
      <div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground font-[family-name:var(--font-display)] uppercase tracking-tight leading-tight">
          {product.name}
        </h1>
        {product.isNew && (
          <span className="inline-block mt-2 bg-gold text-black text-xs font-bold uppercase px-2 py-1 rounded">
            NEW
          </span>
        )}
      </div>

      {/* Price */}
      <p className="text-2xl sm:text-3xl font-bold text-gold font-[family-name:var(--font-display)]">
        {formatPrice(product.price)}
      </p>

      {/* Description */}
      <p className="text-muted-foreground text-base leading-relaxed">
        {product.description}
      </p>

      {/* Sold out notice */}
      {product.isSoldOut && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-md px-4 py-3">
          <p className="text-destructive font-semibold text-sm uppercase tracking-wide">
            SOLD OUT
          </p>
        </div>
      )}

      {/* Size selector */}
      {product.sizes.length > 0 && (
        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSelect={setSelectedSize}
          unavailableSizes={unavailableSizes}
        />
      )}

      {/* Add to cart / Buy now */}
      <AddToCart product={product} selectedSize={selectedSize} />
    </div>
  );
}
