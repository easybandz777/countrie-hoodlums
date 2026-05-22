"use client";

import { useState, useMemo } from "react";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import ProductGrid from "@/components/shop/product-grid";
import ProductFilters, {
  type CategoryFilter,
} from "@/components/shop/product-filters";

type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const filteredAndSorted = useMemo(() => {
    let products = [...MOCK_PRODUCTS];

    // Filter by category
    if (activeFilter !== "All") {
      const categoryKey = activeFilter.toLowerCase();
      products = products.filter((p) => p.category === categoryKey);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "featured":
      default:
        // Keep original order
        break;
    }

    return products;
  }, [activeFilter, sortBy]);

  return (
    <section className="px-4 md:px-8 lg:px-12 py-12 max-w-[1400px] mx-auto">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 font-[family-name:var(--font-display)]">
        SHOP ALL
      </h1>

      {/* Filters and Sort bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <ProductFilters
          activeFilter={activeFilter}
          onChange={setActiveFilter}
        />

        {/* Sort dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="bg-card border border-border text-foreground text-sm rounded-lg px-4 py-2 focus:border-gold focus:ring-1 focus:ring-gold outline-none cursor-pointer min-w-[160px]"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Product grid */}
      <ProductGrid products={filteredAndSorted} />
    </section>
  );
}
