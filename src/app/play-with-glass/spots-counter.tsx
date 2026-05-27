"use client";

import { useEffect, useState } from "react";

interface SpotsData {
  total: number;
  taken: number;
  remaining: number;
}

interface Props {
  fallbackTotal: number;
}

export default function SpotsCounter({ fallbackTotal }: Props) {
  const [data, setData] = useState<SpotsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/play-with-glass/spots-remaining", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`status ${res.status}`);
        const json = (await res.json()) as SpotsData;
        if (!cancelled) setData(json);
      } catch {
        // Silent fallback — the UI still renders fallbackTotal as
        // "remaining" so the page doesn't break.
        if (!cancelled)
          setData({
            total: fallbackTotal,
            taken: 0,
            remaining: fallbackTotal,
          });
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    // Refresh every 30s so the counter stays close to live without
    // hammering Stripe.
    const interval = setInterval(load, 30_000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [fallbackTotal]);

  const remaining = data?.remaining ?? fallbackTotal;
  const total = data?.total ?? fallbackTotal;
  const soldOut = !loading && remaining <= 0;

  return (
    <div className="inline-flex items-baseline gap-3">
      <span
        className={`font-display text-2xl sm:text-3xl font-bold ${
          soldOut ? "text-destructive" : "text-accent"
        }`}
      >
        {loading ? (
          <span className="inline-block w-8 h-7 bg-muted/60 rounded animate-pulse" />
        ) : soldOut ? (
          "0"
        ) : (
          remaining
        )}
      </span>
      <span className="font-body text-sm uppercase tracking-[0.2em] text-muted-foreground">
        of {total} left
      </span>
    </div>
  );
}
