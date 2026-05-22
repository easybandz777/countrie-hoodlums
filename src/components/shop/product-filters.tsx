"use client";

const CATEGORIES = [
  "All",
  "Tees",
  "Hoodies",
  "Hats",
  "Accessories",
  "Stickers",
] as const;

export type CategoryFilter = (typeof CATEGORIES)[number];

interface ProductFiltersProps {
  activeFilter: CategoryFilter;
  onChange: (category: CategoryFilter) => void;
}

export default function ProductFilters({
  activeFilter,
  onChange,
}: ProductFiltersProps) {
  return (
    <div className="overflow-x-auto scrollbar-thin pb-2">
      <div className="flex gap-2 min-w-max">
        {CATEGORIES.map((category) => {
          const isActive = activeFilter === category;
          return (
            <button
              key={category}
              onClick={() => onChange(category)}
              className={`px-5 py-2 text-sm font-semibold uppercase tracking-wider rounded-full border transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? "bg-gold text-background border-gold"
                  : "bg-transparent text-muted-foreground border-border hover:border-gold hover:text-foreground"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
