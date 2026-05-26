import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Charter Roll | Hoodlums Country Club",
  description:
    "Every buyer's edition number, locked against their name in a members-only registry that lives on this site forever. New for VOL. 01.",
  openGraph: {
    title: "The Charter Roll — Hoodlums Country Club",
    description:
      "Every buyer's edition number, locked against their name in a members-only registry that lives on this site forever. New for VOL. 01.",
  },
};

// Sample preview rows — these are illustrative, not real members yet.
const PREVIEW_ROWS = [
  { number: "001", initial: "W.B.", piece: "Order of the Hoodlum", date: "—" },
  { number: "002", initial: "—", piece: "Order of the Hoodlum", date: "—" },
  { number: "003", initial: "—", piece: "Order of the Hoodlum", date: "—" },
  { number: "047", initial: "—", piece: "Order of the Hoodlum", date: "—" },
  { number: "200", initial: "—", piece: "Order of the Hoodlum", date: "—" },
];

export default function CharterRollPage() {
  return (
    <div className="flex flex-col">
      {/* ============ HERO ============ */}
      <section
        className="relative flex items-center justify-center min-h-[55vh] px-4 py-20 overflow-hidden"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 40px, #C9A227 40px, #C9A227 41px)",
            }}
          />
        </div>

        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-12 bg-accent/40" />
            <span className="font-display text-accent text-xs sm:text-sm tracking-[0.4em] uppercase">
              Members-Only Registry
            </span>
            <span className="h-px w-12 bg-accent/40" />
          </div>

          <h1
            className="font-display font-bold uppercase tracking-tighter leading-[0.85]"
            style={{
              fontSize: "clamp(3.5rem, 13vw, 11rem)",
              background: "linear-gradient(180deg, #F5F0E1 0%, #5A5A5A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            The
            <br />
            Charter Roll
          </h1>

          <p className="mt-10 font-body text-xl sm:text-2xl text-foreground/85 italic max-w-xl mx-auto leading-snug">
            The number is the proof you were here.
          </p>
        </div>
      </section>

      {/* ============ EXPLAINER ============ */}
      <section
        className="relative py-24 px-4"
        style={{ backgroundColor: "#111111" }}
      >
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="flex items-center gap-4 mb-12">
            <span className="h-px flex-1 bg-accent/30" />
            <span className="font-display text-accent text-sm tracking-[0.3em] uppercase">
              What it is
            </span>
            <span className="h-px flex-1 bg-accent/30" />
          </div>

          <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/85">
            Every piece in CAPSULE 01 ships with a hand-stamped edition number on
            the inside neck label. <span className="text-accent">Your number</span>{" "}
            is logged in the Charter Roll the moment your order ships — alongside
            your name (or chosen handle), the piece, and the date.
          </p>

          <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/85">
            The Roll lives on this page forever. Buyer #001 of any piece stays #001
            for as long as this brand exists.{" "}
            <span className="text-accent">No buyer ever gets the same number twice.</span>{" "}
            If a piece is returned, the number retires — it doesn&apos;t go back
            into the pool.
          </p>

          <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/85">
            That&apos;s why we call it a Charter Roll, not an order list. The
            limited-edition framing isn&apos;t marketing copy. It&apos;s a contract
            we keep, in public.
          </p>
        </div>
      </section>

      {/* ============ PREVIEW TABLE ============ */}
      <section
        className="relative py-24 px-4"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground uppercase">
              The Roll
            </h2>
            <div className="mt-4 mx-auto h-1 w-16 bg-accent rounded-full" />
            <p className="mt-6 font-body text-muted-foreground italic">
              Opens with VOL. 01. This is what your row will look like.
            </p>
          </div>

          <div
            className="rounded-lg border border-border/60 overflow-hidden"
            style={{ backgroundColor: "#111" }}
          >
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-4 sm:px-6 py-4 border-b border-border/60 font-display text-[10px] sm:text-xs uppercase tracking-[0.25em] text-muted-foreground">
              <div className="col-span-2 sm:col-span-2">Edition</div>
              <div className="col-span-3 sm:col-span-3">Member</div>
              <div className="col-span-5 sm:col-span-5">Piece</div>
              <div className="col-span-2 sm:col-span-2 text-right">Date</div>
            </div>

            {/* Rows */}
            {PREVIEW_ROWS.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-12 gap-4 px-4 sm:px-6 py-5 border-b border-border/40 last:border-b-0 font-body text-sm sm:text-base text-foreground/85 hover:bg-cream/[0.02] transition-colors"
              >
                <div className="col-span-2 font-display text-accent font-bold">
                  No. {row.number}
                </div>
                <div className="col-span-3 text-muted-foreground">
                  {row.initial}
                </div>
                <div className="col-span-5">{row.piece}</div>
                <div className="col-span-2 text-right text-muted-foreground">
                  {row.date}
                </div>
              </div>
            ))}

            {/* Placeholder pulse */}
            <div className="px-6 py-10 text-center bg-black/40">
              <p className="font-display text-accent text-xs tracking-[0.3em] uppercase mb-3">
                Coming with VOL. 01
              </p>
              <p className="font-body text-muted-foreground text-sm">
                The Roll opens Friday, 7pm CT on drop day. Every shipped piece
                writes a new row.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ RULES ============ */}
      <section
        className="relative py-24 px-4"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground uppercase">
              How it works
            </h2>
            <div className="mt-4 mx-auto h-1 w-16 bg-accent rounded-full" />
          </div>

          <ol className="space-y-6">
            <RollRule
              n="01"
              text="Numbers are assigned in checkout order, per SKU. First to buy gets the lowest available number. No requests honored. The only fair system is the one nobody can game."
            />
            <RollRule
              n="02"
              text="Two-person verification at the stamping station. Number stamp matches the paper tag on the garment. Photo logged before shipping label prints."
            />
            <RollRule
              n="03"
              text="Returned pieces retire the number permanently. The Charter Roll marks them RETIRED with date. Numbers are never re-issued."
            />
            <RollRule
              n="04"
              text="At checkout you choose how to appear on the Roll: full name, first name + last initial, or a chosen handle. You can change it once, anytime."
            />
            <RollRule
              n="05"
              text="The Roll is members-only after your first purchase. Anyone can see the totals (047 of 200 sold); only members see the names."
            />
          </ol>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section
        className="relative py-24 px-4"
        style={{ backgroundColor: "#111111" }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground uppercase">
            Get on the Roll
          </h2>
          <div className="mt-4 mx-auto h-1 w-16 bg-accent rounded-full" />
          <p className="mt-8 font-body text-lg text-foreground/85 leading-relaxed">
            The Roll opens with VOL. 01. The only way on is through the drop.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            <Link
              href="/capsule-01"
              className="inline-block bg-accent hover:bg-accent-hover text-black font-display font-bold text-sm uppercase tracking-widest px-10 py-5 rounded transition-colors duration-200"
            >
              See Capsule 01
            </Link>
            <Link
              href="/capsule-01#waitlist"
              className="inline-block border border-accent text-accent hover:bg-accent/10 font-display font-bold text-sm uppercase tracking-widest px-10 py-5 rounded transition-colors duration-200"
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function RollRule({ n, text }: { n: string; text: string }) {
  return (
    <li
      className="flex gap-6 items-start p-6 rounded-lg border border-border/60"
      style={{ backgroundColor: "#0D0D0D" }}
    >
      <span
        className="flex-shrink-0 font-display text-2xl font-bold text-accent leading-none"
        style={{ minWidth: "2rem" }}
      >
        {n}
      </span>
      <p className="font-body text-base md:text-lg text-foreground/90 leading-relaxed pt-0.5">
        {text}
      </p>
    </li>
  );
}
