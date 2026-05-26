export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#0A0A0A]">
      <div className="relative flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="w-10 h-10 border-2 border-neutral-700 border-t-[#C9A227] rounded-full animate-spin" />

        {/* Brand name with pulse */}
        <h1 className="font-display text-xl md:text-2xl font-bold text-cream tracking-[0.3em] animate-pulse">
          HOODLUMS COUNTRY CLUB
        </h1>
      </div>
    </div>
  );
}
