"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative h-[90vh] min-h-screen flex items-end justify-center overflow-hidden"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* Background — HCC logo (replaces the gang cartoon) */}
      <Image
        src="/images/logo-hcc.webp"
        alt="Hoodlums Country Club"
        fill
        priority
        sizes="100vw"
        className="object-contain object-center z-0 opacity-0 animate-fade-up"
        style={{ animationDelay: "0.1s" }}
      />

      {/* Bottom fade for CTA contrast and scroll handoff */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/3 z-[1]"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.85) 40%, rgba(10,10,10,0) 100%)",
        }}
      />

      {/* CTAs */}
      <div
        className="relative z-[3] flex flex-col items-center pb-24 px-6 opacity-0 animate-fade-up"
        style={{ animationDelay: "0.6s" }}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest bg-accent text-background rounded hover:bg-accent-hover transition-colors duration-200"
          >
            Shop Now
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest border-2 border-cream text-cream rounded hover:bg-cream hover:text-background transition-colors duration-200"
          >
            Our Story
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-1 opacity-0 animate-fade-up"
        style={{ animationDelay: "1.0s" }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-body">
          Scroll
        </span>
        <div className="animate-bounce">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
    </section>
  );
}
