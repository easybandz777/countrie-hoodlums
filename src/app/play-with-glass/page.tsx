import type { Metadata } from "next";
import Image from "next/image";
import BuyButton from "./buy-button";

// Update DROP_DATE when the actual round is locked in. Keep it as a
// human string for now — when scheduling lands, swap to an ISO date and
// drive the display from that.
const DROP_DATE = "Date locked in soon — buyers get the call first.";
const TOTAL_SPOTS = 8;
const PRICE_USD = 150;

export const metadata: Metadata = {
  title: "Play 18 with Glass | Hoodlums Country Club",
  description:
    "$150 buy-in. Eight spots. A day of laughter and fun with Glass and the Hoodlums Country Club crew.",
  openGraph: {
    title: "Play 18 with Glass — Hoodlums Country Club",
    description:
      "$150 buy-in. Eight spots. A day of laughter and fun with Glass and the Hoodlums Country Club crew.",
    type: "website",
  },
};

export default function PlayWithGlassPage() {
  return (
    <div className="flex flex-col">
      {/* ============ HERO ============ */}
      <section
        className="relative flex items-center min-h-[90vh] overflow-hidden px-4 pt-16 pb-24"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent, transparent 60px, #C9A227 60px, #C9A227 61px)",
            }}
          />
        </div>

        <div className="relative z-10 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center max-w-6xl mx-auto w-full">
          {/* Left: copy */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-accent/40" />
              <span className="font-display text-accent text-xs sm:text-sm tracking-[0.4em] uppercase">
                Limited Experience · 8 Spots
              </span>
            </div>

            <h1
              className="font-display font-bold uppercase tracking-tighter leading-[0.88]"
              style={{
                fontSize: "clamp(3rem, 9vw, 7.5rem)",
                background:
                  "linear-gradient(180deg, #F5F0E1 0%, #6A6258 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Play 18
              <br />
              with Glass
            </h1>

            <p className="mt-10 font-body text-xl sm:text-2xl text-foreground/90 italic max-w-xl leading-snug">
              A day of laughter and fun, on us.
            </p>

            <p className="mt-6 font-body text-base sm:text-lg text-foreground/75 max-w-xl leading-relaxed">
              Eighteen holes. Eight buyers. One guaranteed-good day on the
              course with Glass — the crew member who, if it&apos;s broken,
              probably did it on purpose.
            </p>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-10 max-w-md">
              <Stat label="Buy-in" value={`$${PRICE_USD}`} />
              <Stat label="Spots" value={`${TOTAL_SPOTS}`} />
              <Stat label="Restock" value="Never" />
            </div>

            <div className="mt-12">
              <BuyButton price={PRICE_USD} />
              <p className="mt-4 font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">
                {DROP_DATE}
              </p>
            </div>
          </div>

          {/* Right: portrait */}
          <div className="relative aspect-square w-full max-w-md mx-auto lg:mx-0 lg:ml-auto rounded-lg overflow-hidden border border-accent/30 shadow-2xl shadow-black/60">
            <Image
              src="/images/crew/glass.webp"
              alt="Glass — Hoodlums Country Club crew"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 450px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
              <p className="font-display text-accent text-xs uppercase tracking-[0.35em] mb-2">
                Your host
              </p>
              <p className="font-display text-cream text-2xl font-bold uppercase tracking-tight">
                Glass
              </p>
              <p className="font-body text-foreground/85 text-sm italic mt-1">
                If it&apos;s broken, he probably did it — on purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ THE PITCH ============ */}
      <section className="relative py-24 px-4" style={{ backgroundColor: "#111" }}>
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-4 mb-12">
            <span className="h-px flex-1 bg-accent/30" />
            <span className="font-display text-accent text-sm tracking-[0.3em] uppercase">
              What you&apos;re buying
            </span>
            <span className="h-px flex-1 bg-accent/30" />
          </div>

          <p className="font-body text-xl md:text-2xl leading-relaxed text-foreground/90">
            Not a clinic. Not a tournament.{" "}
            <span className="text-accent">A day off the grid</span> with the
            crew that built Hoodlums Country Club.
          </p>

          <p className="mt-6 font-body text-lg md:text-xl leading-relaxed text-foreground/80">
            Show up. Tee off. Lose some balls. Win some bets. Tell the kind of
            stories that don&apos;t make it onto Instagram. Drive home with a
            sunburn and a number locked into the Charter Roll — buyer
            number-something-of-eight, written down forever.
          </p>

          <p className="mt-6 font-body text-lg md:text-xl leading-relaxed text-foreground/80">
            That&apos;s it. That&apos;s the offer.
          </p>
        </div>
      </section>

      {/* ============ CLOSING / BUY ============ */}
      <section
        id="claim"
        className="relative py-28 px-4 scroll-mt-20"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground uppercase">
            Eight spots. That&apos;s it.
          </h2>
          <div className="mt-4 mx-auto h-1 w-16 bg-accent rounded-full" />
          <p className="mt-8 font-body text-lg md:text-xl text-foreground/85 leading-relaxed">
            When they&apos;re gone, they&apos;re gone. We&apos;ll email the
            eight buyers with the date, the course, and the meet-up details
            the morning after sell-through.
          </p>

          <div className="mt-12">
            <BuyButton price={PRICE_USD} large />
            <p className="mt-6 font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">
              ${PRICE_USD} · One spot per checkout · No refunds after the
              date is published
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-2xl sm:text-3xl font-bold text-accent">
        {value}
      </p>
      <p className="mt-1 font-body text-[10px] sm:text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
