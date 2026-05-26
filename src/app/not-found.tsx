import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="font-display text-[8rem] md:text-[12rem] font-bold text-cream/10 leading-none select-none">
        404
      </h1>
      <h2 className="font-display text-2xl md:text-4xl font-bold text-cream tracking-wider -mt-6">
        PAGE NOT FOUND
      </h2>
      <p className="text-neutral-400 mt-4 text-lg max-w-md">
        Looks like you wandered off the dirt road.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
        <Link
          href="/"
          className="px-8 py-3 bg-[#C9A227] text-black font-display font-bold text-sm tracking-wider hover:bg-[#D4B962] transition-colors"
        >
          BACK TO HOME
        </Link>
        <Link
          href="/shop"
          className="text-[#C9A227] font-display font-bold text-sm tracking-wider hover:text-[#D4B962] transition-colors underline underline-offset-4"
        >
          SHOP NOW
        </Link>
      </div>
    </div>
  );
}
