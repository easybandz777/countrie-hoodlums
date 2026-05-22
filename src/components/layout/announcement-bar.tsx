"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const DISMISSED_KEY = "ch-announcement-dismissed";

export default function AnnouncementBar() {
  const [isDismissed, setIsDismissed] = useState(true); // default hidden to avoid flash

  useEffect(() => {
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (dismissed !== "true") {
      setIsDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem(DISMISSED_KEY, "true");
  };

  if (isDismissed) return null;

  return (
    <div className="relative w-full h-8 bg-accent overflow-hidden z-[51] flex items-center">
      {/* Marquee content */}
      <div className="flex animate-marquee whitespace-nowrap">
        <MarqueeContent />
        <MarqueeContent />
      </div>

      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-black/70 hover:text-black transition-colors"
        aria-label="Dismiss announcement"
      >
        <X size={14} strokeWidth={2.5} />
      </button>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}

function MarqueeContent() {
  return (
    <span className="inline-flex items-center gap-8 px-4 text-xs font-semibold uppercase tracking-wider text-black">
      <span>Free Shipping on Orders $75+</span>
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-black/40" />
      <span>New Drop Coming Soon</span>
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-black/40" />
      <span>Countrie Hoodlums</span>
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-black/40" />
      <span>Free Shipping on Orders $75+</span>
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-black/40" />
      <span>New Drop Coming Soon</span>
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-black/40" />
      <span>Countrie Hoodlums</span>
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-black/40" />
    </span>
  );
}
