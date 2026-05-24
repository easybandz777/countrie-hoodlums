"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[90vh] min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background — Hoodlums Country Club cartoon gang */}
      <Image
        src="/images/hero-gang.webp"
        alt="The Hoodlums Country Club crew"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center z-0"
      />

      {/* Dark gradient overlays on top of image so text stays readable */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 20%, rgba(212, 175, 55, 0.08) 0%, transparent 60%),
            linear-gradient(to bottom, rgba(10, 10, 10, 0.55) 0%, rgba(10, 10, 10, 0.4) 40%, rgba(10, 10, 10, 0.75) 80%, rgba(10, 10, 10, 0.98) 100%)
          `,
        }}
      />

      {/* Extra bottom fade for scroll handoff */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-[3] flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        {/* Logo */}
        <div
          className="opacity-0 animate-fade-up w-full max-w-md md:max-w-lg lg:max-w-xl"
          style={{ animationDelay: "0.2s" }}
        >
          <Image
            src="/images/logo-hcc.webp"
            alt="Hoodlums Country Club"
            width={720}
            height={720}
            priority
            className="w-full h-auto"
          />
        </div>

        {/* Tagline */}
        <p
          className="mt-4 text-accent text-base md:text-lg lg:text-xl uppercase tracking-[0.3em] font-display font-bold opacity-0 animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          Bad Decisions &middot; Good Times
        </p>

        {/* CTA Buttons */}
        <div
          className="mt-10 flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-up"
          style={{ animationDelay: "0.8s" }}
        >
          <Link
            href="/shop"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest bg-accent text-background rounded hover:bg-accent-hover transition-colors duration-200"
          >
            Shop Now
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-widest border-2 border-white text-white rounded hover:bg-white hover:text-background transition-colors duration-200"
          >
            Our Story
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2 opacity-0 animate-fade-up"
        style={{ animationDelay: "1.2s" }}
      >
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-body">
          Scroll
        </span>
        <div className="animate-bounce">
          <svg
            width="24"
            height="24"
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
