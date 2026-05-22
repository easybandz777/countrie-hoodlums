"use client";

import { useEffect, useRef, useState } from "react";

export default function BrandManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 bg-background"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Gold accent line top */}
        <div
          className={`mx-auto h-px w-16 bg-accent mb-10 transition-all duration-700 ${
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
        />

        {/* Heading */}
        <h2
          className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground uppercase tracking-tight transition-all duration-700 delay-200 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          The Movement
        </h2>

        {/* Manifesto body */}
        <div
          className={`mt-8 space-y-6 transition-all duration-700 delay-400 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-5"
          }`}
        >
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-body">
            Where the dirt road meets the block. We&apos;re not one thing &mdash;
            we&apos;re the collision of country grit and hood soul, stitched together
            with comedy, culture, and zero apologies.
          </p>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-body">
            Countrie Hoodlums is more than merch. It&apos;s a mindset. It&apos;s
            for the ones who fish in the morning and hit the studio at night. The
            ones who rep both sides because both sides raised us.
          </p>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-body">
            Every piece we drop carries that energy &mdash; authentic,
            unapologetic, and loud as hell. This ain&apos;t fashion. This is a
            lifestyle.
          </p>
        </div>

        {/* Gold accent line bottom */}
        <div
          className={`mx-auto h-px w-16 bg-accent mt-10 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
        />
      </div>
    </section>
  );
}
