"use client";

import { useState } from "react";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("You're on the list. Watch your inbox.");
        setEmail("");
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setMessage(data.message || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Try again in a minute.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-stretch gap-3 max-w-lg mx-auto"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={status === "loading" || status === "success"}
        className="flex-1 bg-[#1A1A1A] border border-border rounded px-4 py-4 text-base text-cream placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="bg-accent hover:bg-accent-hover text-black font-display font-bold text-sm uppercase tracking-widest px-8 py-4 rounded transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
      >
        {status === "loading"
          ? "ADDING..."
          : status === "success"
            ? "ON THE LIST"
            : "CLAIM A SPOT"}
      </button>
      {message && (
        <p
          className={`absolute mt-20 text-sm font-medium animate-fade-up ${
            status === "success" ? "text-accent" : "text-destructive"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
