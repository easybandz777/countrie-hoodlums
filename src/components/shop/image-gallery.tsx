"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Placeholder colors for visual distinction when no real images exist
  const placeholderColors = [
    "bg-[#1A1A1A]",
    "bg-[#1E1E1E]",
    "bg-[#222222]",
    "bg-[#262626]",
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* Main image display */}
      <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-border">
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            placeholderColors[selectedIndex % placeholderColors.length]
          )}
        >
          {images[selectedIndex] ? (
            <span className="text-muted-foreground text-sm uppercase tracking-wider">
              {images[selectedIndex]}
            </span>
          ) : (
            <svg
              className="w-16 h-16 text-muted-foreground/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Thumbnail row */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 transition-all duration-200",
                selectedIndex === index
                  ? "border-gold shadow-[0_0_8px_rgba(212,175,55,0.3)]"
                  : "border-border hover:border-muted-foreground"
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center",
                  placeholderColors[index % placeholderColors.length]
                )}
              >
                <span className="text-muted-foreground text-[9px] uppercase tracking-wider">
                  {index + 1}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
