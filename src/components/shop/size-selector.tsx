"use client";

import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  onSelect: (size: string) => void;
  unavailableSizes?: string[];
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSelect,
  unavailableSizes = [],
}: SizeSelectorProps) {
  if (sizes.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        Size
      </span>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const isUnavailable = unavailableSizes.includes(size);
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              onClick={() => !isUnavailable && onSelect(size)}
              disabled={isUnavailable}
              className={cn(
                "min-w-[3rem] px-3 py-2 text-sm font-semibold uppercase tracking-wide rounded-md border transition-all duration-200",
                isSelected &&
                  "bg-gold text-black border-gold shadow-[0_0_10px_rgba(212,175,55,0.2)]",
                !isSelected &&
                  !isUnavailable &&
                  "border-border text-white hover:border-gold hover:text-gold",
                isUnavailable &&
                  "border-border text-muted-foreground line-through opacity-50 cursor-not-allowed"
              )}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
