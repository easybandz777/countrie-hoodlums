import type { Metadata } from "next";
import Link from "next/link";
import {
  CAPSULE_01_META,
  CAPSULE_01_PIECES,
  COHERENCE_RULES,
} from "@/lib/capsule-01-data";
import WaitlistForm from "./waitlist-form";

export const metadata: Metadata = {
  title: "CAPSULE 01 — DIRT ROAD HEIRLOOMS / VOL. 01 | Hoodlums Country Club",
  description:
    "Built to outlast the night that earned it. 11 hand-numbered pieces. Two-wave Friday drop. No restocks, ever.",
  openGraph: {
    title: "CAPSULE 01 — DIRT ROAD HEIRLOOMS / VOL. 01",
    description:
      "Built to outlast the night that earned it. 11 hand-numbered pieces. Two-wave Friday drop. No restocks, ever.",
    type: "website",
  },
};

const waveIPieces = CAPSULE_01_PIECES.filter((p) => p.wave === "I");
const waveIIPieces = CAPSULE_01_PIECES.filter((p) => p.wave === "II");

export default function Capsule01Page() {
  return (
    <div className="flex flex-col">
      {/* ============ HERO ============ */}
      <section
        className="relative flex items-center justify-center min-h-[85vh] overflow-hidden px-4 pt-12 pb-20"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        {/* Decorative diagonal gold lines */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent, transparent 60px, #C9A227 60px, #C9A227 61px)",
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          {/* Pre-title */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-12 bg-accent/40" />
            <span className="font-display text-accent text-xs sm:text-sm tracking-[0.4em] uppercase">
              Capsule 01 — Coming Soon
            </span>
            <span className="h-px w-12 bg-accent/40" />
          </div>

          {/* Massive title */}
          <h1
            className="font-display font-bold uppercase tracking-tighter leading-[0.85]"
            style={{
              fontSize: "clamp(3.5rem, 13vw, 11rem)",
              background: "linear-gradient(180deg, #FAFAFA 0%, #5A5A5A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            DIRT ROAD
            <br />
            HEIRLOOMS
          </h1>

          {/* Volume mark */}
          <div className="mt-6 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-accent/60" />
            <span className="font-display text-accent text-base sm:text-lg tracking-[0.5em] uppercase">
              {CAPSULE_01_META.volume}
            </span>
            <span className="h-px w-8 bg-accent/60" />
          </div>

          {/* Tagline */}
          <p className="mt-10 font-body text-xl sm:text-2xl lg:text-3xl text-foreground/90 italic max-w-2xl mx-auto leading-snug">
            {CAPSULE_01_META.tagline}
          </p>

          {/* Quick stats */}
          <div className="mt-12 grid grid-cols-3 gap-4 sm:gap-12 max-w-xl mx-auto">
            <Stat label="Pieces" value={CAPSULE_01_META.totalPieces.toString()} />
            <Stat label="Hand-numbered" value="Every one" />
            <Stat label="Restocks" value="Never" />
          </div>

          {/* CTA */}
          <div className="mt-14">
            <a
              href="#waitlist"
              className="inline-block bg-accent hover:bg-accent-hover text-black font-display font-bold text-sm uppercase tracking-widest px-10 py-5 rounded transition-colors duration-200"
            >
              Claim a spot →
            </a>
          </div>
        </div>
      </section>

      {/* ============ THESIS ============ */}
      <section className="relative py-24 px-4" style={{ backgroundColor: "#111111" }}>
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="flex items-center gap-4 mb-12">
            <span className="h-px flex-1 bg-accent/30" />
            <span className="font-display text-accent text-sm tracking-[0.3em] uppercase">
              The Thesis
            </span>
            <span className="h-px flex-1 bg-accent/30" />
          </div>

          <p className="font-body text-xl md:text-2xl leading-relaxed text-foreground/90">
            The most expensive thing isn&apos;t new — it&apos;s{" "}
            <span className="text-accent">earned</span>.
          </p>

          <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/80">
            This is the gear you wear the morning after — the funeral, the fight,
            the bonfire that went too long, the run that finally paid out. It&apos;s
            the jacket your daddy left in the truck and you never gave back. It&apos;s
            the hoodie that smells like creek water and gasoline and still hangs in
            the closet ten years later because you can&apos;t throw away the night
            it remembers.
          </p>

          <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/80">
            Every piece in VOL. 01 is designed to look like it already has a story
            before it leaves the box. The blanks are heavyweight, the dyes are
            washed, the embroidery sits like it&apos;s been there a season. We
            aren&apos;t selling clothing. We&apos;re selling artifacts from a life
            the buyer wants to have lived.
          </p>

          <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/80">
            The through-line is <span className="text-accent">patina</span> —
            visual, emotional, material. Nothing in this capsule looks new. Nothing
            looks like it&apos;s trying. That&apos;s the flex.
          </p>
        </div>
      </section>

      {/* ============ WAVE I ============ */}
      <WaveSection
        wave="I"
        title="Wave I"
        subtitle="The everyday heirlooms"
        pieces={waveIPieces}
        bg="#0D0D0D"
      />

      {/* ============ WAVE II ============ */}
      <WaveSection
        wave="II"
        title="Wave II"
        subtitle="The heavy ones"
        pieces={waveIIPieces}
        bg="#111111"
      />

      {/* ============ COHERENCE RULES ============ */}
      <section className="relative py-24 px-4" style={{ backgroundColor: "#0A0A0A" }}>
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground uppercase">
              The Five Rules
            </h2>
            <div className="mt-4 mx-auto h-1 w-16 bg-accent rounded-full" />
            <p className="mt-6 font-body text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
              Every piece in VOL. 01 carries every one. No exceptions.
            </p>
          </div>

          <ol className="space-y-6">
            {COHERENCE_RULES.map((rule, i) => (
              <li
                key={i}
                className="flex gap-6 items-start p-6 rounded-lg border border-border/60"
                style={{ backgroundColor: "#0D0D0D" }}
              >
                <span
                  className="flex-shrink-0 font-display text-3xl font-bold text-accent leading-none"
                  style={{ minWidth: "2.5rem" }}
                >
                  0{i + 1}
                </span>
                <p className="font-body text-base md:text-lg text-foreground/90 leading-relaxed pt-1">
                  {rule}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ DROP MECHANICS ============ */}
      <section className="relative py-24 px-4" style={{ backgroundColor: "#0D0D0D" }}>
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground uppercase">
              How it drops
            </h2>
            <div className="mt-4 mx-auto h-1 w-16 bg-accent rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DropCard
              wave="I"
              tagline="The everyday heirlooms"
              when="Friday · 7pm CT"
              pieceCount={waveIPieces.length}
              units={waveIPieces.reduce((s, p) => s + p.cap, 0)}
            />
            <DropCard
              wave="II"
              tagline="The heavy ones"
              when="Two Fridays later · 7pm CT"
              pieceCount={waveIIPieces.length}
              units={waveIIPieces.reduce((s, p) => s + p.cap, 0)}
            />
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded border border-border/60" style={{ backgroundColor: "#111" }}>
              <p className="font-display text-3xl font-bold text-accent">
                {CAPSULE_01_META.totalUnits.toLocaleString()}
              </p>
              <p className="mt-2 font-body text-sm uppercase tracking-wider text-muted-foreground">
                Total units, ever
              </p>
            </div>
            <div className="p-6 rounded border border-border/60" style={{ backgroundColor: "#111" }}>
              <p className="font-display text-3xl font-bold text-accent">Zero</p>
              <p className="mt-2 font-body text-sm uppercase tracking-wider text-muted-foreground">
                Restocks
              </p>
            </div>
            <div className="p-6 rounded border border-border/60" style={{ backgroundColor: "#111" }}>
              <p className="font-display text-3xl font-bold text-accent">Public</p>
              <p className="mt-2 font-body text-sm uppercase tracking-wider text-muted-foreground">
                Sell-through counter
              </p>
            </div>
          </div>

          <p className="mt-12 max-w-2xl mx-auto text-center font-body text-base md:text-lg text-muted-foreground italic leading-relaxed">
            Waitlist members get the link 30 minutes before public. That&apos;s the
            only edge we&apos;re handing out.
          </p>
        </div>
      </section>

      {/* ============ CHARTER ROLL TEASE ============ */}
      <section className="relative py-24 px-4" style={{ backgroundColor: "#0A0A0A" }}>
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-block px-4 py-2 mb-8 rounded border border-accent/30">
            <span className="font-display text-accent text-xs tracking-[0.4em] uppercase">
              New for Vol. 01
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground uppercase">
            The Charter Roll
          </h2>
          <div className="mt-4 mx-auto h-1 w-16 bg-accent rounded-full" />

          <p className="mt-8 font-body text-lg md:text-xl text-foreground/85 leading-relaxed">
            Every buyer&apos;s edition number, locked against their name in a
            members&#8209;only registry that lives on this site forever. Buyer #001
            of Piece 1 stays #001 forever, publicly attributed. The number is the
            proof you were here.
          </p>

          <Link
            href="/charter-roll"
            className="inline-block mt-10 font-display text-sm uppercase tracking-[0.3em] text-accent hover:text-accent-hover transition-colors"
          >
            Read the Charter Roll →
          </Link>
        </div>
      </section>

      {/* ============ WAITLIST ============ */}
      <section
        id="waitlist"
        className="relative py-28 px-4 scroll-mt-20"
        style={{ backgroundColor: "#111111" }}
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground uppercase">
            Get the link first
          </h2>
          <div className="mt-4 mx-auto h-1 w-16 bg-accent rounded-full" />
          <p className="mt-8 font-body text-lg md:text-xl text-foreground/85 leading-relaxed">
            Waitlist members get the drop link 30 minutes before public. One email.
            One shot.
          </p>

          <div className="mt-12 relative">
            <WaitlistForm />
          </div>

          <p className="mt-10 font-body text-xs uppercase tracking-[0.3em] text-muted-foreground">
            No spam. No referrals. No fluff. The drop, and then quiet.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ---------------- helpers ---------------- */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-display text-xl sm:text-2xl font-bold text-accent">{value}</p>
      <p className="mt-1 font-body text-[10px] sm:text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

function WaveSection({
  wave,
  title,
  subtitle,
  pieces,
  bg,
}: {
  wave: "I" | "II";
  title: string;
  subtitle: string;
  pieces: typeof CAPSULE_01_PIECES;
  bg: string;
}) {
  return (
    <section className="relative py-24 px-4" style={{ backgroundColor: bg }}>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="font-display text-accent text-sm tracking-[0.4em] uppercase">
            Wave {wave}
          </span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground uppercase">
            {title}
          </h2>
          <div className="mt-4 mx-auto h-1 w-16 bg-accent rounded-full" />
          <p className="mt-6 font-body text-muted-foreground text-base md:text-lg max-w-xl mx-auto italic">
            {subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pieces.map((p) => (
            <PieceCard key={p.number} piece={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PieceCard({ piece }: { piece: (typeof CAPSULE_01_PIECES)[number] }) {
  const isFlagship = piece.number === "4";
  return (
    <article
      className={`relative flex flex-col rounded-lg border p-6 transition-colors duration-300 ${
        isFlagship
          ? "border-accent/40 hover:border-accent/70"
          : "border-border/60 hover:border-accent/40"
      }`}
      style={{ backgroundColor: isFlagship ? "#141008" : "#0D0D0D" }}
    >
      {isFlagship && (
        <span className="absolute -top-3 left-6 bg-accent text-black font-display text-[10px] font-bold uppercase tracking-[0.25em] px-2 py-1 rounded z-10">
          Flagship
        </span>
      )}

      {piece.previewImage && (
        <div
          className="relative -mx-6 -mt-6 mb-5 aspect-square overflow-hidden rounded-t-lg"
          style={{
            backgroundColor: piece.previewIsProductMockup ? "#1A1A1A" : "#F5F0E1",
          }}
        >
          {/* Use plain img — local /public assets, no need for next/image optimization */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={piece.previewImage}
            alt={`${piece.conceptName} — ${piece.previewIsProductMockup ? "product mockup" : "design artwork"}`}
            loading="lazy"
            className={`absolute inset-0 w-full h-full ${
              piece.previewIsProductMockup ? "object-cover" : "object-contain p-6"
            }`}
          />
          {!piece.previewIsProductMockup && (
            <span className="absolute bottom-2 right-2 bg-black/80 text-accent font-display text-[9px] uppercase tracking-[0.3em] px-2 py-1 rounded">
              Design preview
            </span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <span className="font-display text-accent text-xs tracking-[0.4em] uppercase">
          No. {piece.number}
        </span>
        <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">
          {piece.type}
        </span>
      </div>

      <h3 className="font-display text-2xl font-bold text-foreground leading-tight">
        {piece.conceptName}
      </h3>

      <p className="mt-2 font-body text-xs text-muted-foreground uppercase tracking-wider">
        {piece.blankBrand} {piece.blankModel} · {piece.colorway}
      </p>

      <p className="mt-4 font-body text-sm text-foreground/80 leading-relaxed flex-1">
        {piece.designSummary}
      </p>

      <p className="mt-4 font-body text-xs italic text-muted-foreground border-l-2 border-accent/40 pl-3 leading-relaxed">
        {piece.lever}
      </p>

      <div className="mt-6 flex items-end justify-between pt-4 border-t border-border/40">
        <div>
          <p className="font-display text-3xl font-bold text-foreground">
            ${piece.retail}
          </p>
          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-1">
            Edition of {piece.cap.toLocaleString()}
          </p>
        </div>
        <span className="font-display text-[10px] uppercase tracking-[0.3em] text-accent px-2 py-1 border border-accent/30 rounded">
          Coming Soon
        </span>
      </div>
    </article>
  );
}

function DropCard({
  wave,
  tagline,
  when,
  pieceCount,
  units,
}: {
  wave: "I" | "II";
  tagline: string;
  when: string;
  pieceCount: number;
  units: number;
}) {
  return (
    <div
      className="p-8 rounded-lg border border-border/60"
      style={{ backgroundColor: "#111" }}
    >
      <p className="font-display text-accent text-xs tracking-[0.4em] uppercase">
        Wave {wave}
      </p>
      <h3 className="mt-2 font-display text-3xl font-bold text-foreground">
        {tagline}
      </h3>
      <p className="mt-6 font-body text-base text-foreground/85">{when}</p>
      <div className="mt-6 flex gap-8 text-sm">
        <div>
          <p className="font-display text-2xl font-bold text-accent">
            {pieceCount}
          </p>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Pieces
          </p>
        </div>
        <div>
          <p className="font-display text-2xl font-bold text-accent">
            {units.toLocaleString()}
          </p>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Units
          </p>
        </div>
      </div>
    </div>
  );
}
