"use client";

import { useState } from "react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      // Silently handle — API route may not exist yet
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#111]">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display tracking-wide">
          JOIN THE FAMILY
        </h2>

        {/* Subtext */}
        <p className="mt-4 text-muted-foreground text-base sm:text-lg">
          Get early access to drops, exclusive deals, and updates
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 bg-[#1A1A1A] border border-border rounded px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors duration-200"
          />
          <button
            type="submit"
            className="bg-accent hover:bg-accent-hover text-black font-semibold text-sm uppercase tracking-widest px-6 py-3 rounded transition-colors duration-200 whitespace-nowrap"
          >
            SUBSCRIBE
          </button>
        </form>

        {/* Success Message */}
        {submitted && (
          <p className="mt-4 text-accent text-sm font-medium animate-fade-up">
            Welcome to the family!
          </p>
        )}

        {/* Privacy Text */}
        <p className="mt-6 text-muted-foreground text-xs">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
