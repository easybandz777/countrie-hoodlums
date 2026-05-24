import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Hoodlums Country Club",
  description:
    "The story behind Hoodlums Country Club — where country meets hood and comedy meets real life.",
  openGraph: {
    title: "About | Hoodlums Country Club",
    description:
      "The story behind Hoodlums Country Club — where country meets hood and comedy meets real life.",
  },
};

const crewMembers = [
  { name: "Gregory", tagline: "The mastermind. Quiet until he ain't.", image: "/images/crew/gregory.webp" },
  { name: "Glass", tagline: "If it's broken, he probably did it — on purpose.", image: "/images/crew/glass.webp" },
  { name: "Gary", tagline: "The one your mama warned you about.", image: "/images/crew/gary.webp" },
  { name: "Bobby", tagline: "Loud, wrong, and confident about it.", image: "/images/crew/bobby.webp" },
  { name: "Willie", tagline: "Smooth talk, dirt road walk.", image: "/images/crew/willie.webp" },
  { name: "Bubba", tagline: "Built different. Eats different too.", image: "/images/crew/bubba.webp" },
  { name: "Krissy", tagline: "The boss. Everybody knows it.", image: "/images/crew/krissy.webp" },
  { name: "LuLu", tagline: "Chaos with a smile.", image: "/images/crew/lulu.webp" },
];

const socials = [
  {
    name: "Facebook",
    href: "https://facebook.com/people/Countrie-Hoodlums/61585880894365/",
    icon: (
      <svg
        className="w-7 h-7"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.99 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* ====== HERO ====== */}
      <section
        className="relative flex items-center justify-center min-h-[60vh] overflow-hidden"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        {/* Decorative diagonal lines */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 40px, #D4AF37 40px, #D4AF37 41px)",
            }}
          />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1
            className="font-display text-[clamp(4rem,15vw,12rem)] font-bold leading-none tracking-tighter"
            style={{
              background:
                "linear-gradient(180deg, #FAFAFA 0%, #8A8A8A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            OUR STORY
          </h1>
          <div className="mt-6 mx-auto h-1 w-24 bg-accent rounded-full" />
        </div>
      </section>

      {/* ====== BRAND ORIGIN ====== */}
      <section
        className="relative py-24 px-4"
        style={{ backgroundColor: "#111111" }}
      >
        <div className="mx-auto max-w-3xl space-y-10">
          {/* Gold top border accent */}
          <div className="flex items-center gap-4 mb-16">
            <span className="h-px flex-1 bg-accent/30" />
            <span className="font-display text-accent text-sm tracking-[0.3em] uppercase">
              Where it all started
            </span>
            <span className="h-px flex-1 bg-accent/30" />
          </div>

          <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/90">
            We ain&apos;t your typical brand. Hoodlums Country Club was born from
            the dirt roads and the block &mdash; where country meets hood and
            comedy meets real life.
          </p>

          <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/90">
            What started as a group of friends making each other laugh turned
            into a movement. Gregory, Glass, Gary, Bobby, Willie, Bubba,
            Krissy, LuLu &mdash; we live each day like it&apos;s our last, and
            we want you to ride with us.
          </p>

          <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/90">
            Every piece of merch we drop carries that energy. It&apos;s not just
            clothing &mdash; it&apos;s a lifestyle. It&apos;s waking up on a
            dirt road and choosing to be legendary.
          </p>
        </div>
      </section>

      {/* ====== THE CREW ====== */}
      <section
        className="relative py-24 px-4"
        style={{ backgroundColor: "#0D0D0D" }}
      >
        <div className="mx-auto max-w-6xl">
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground">
              THE CREW
            </h2>
            <div className="mt-4 mx-auto h-1 w-16 bg-accent rounded-full" />
            <p className="mt-6 font-body text-muted-foreground text-lg max-w-xl mx-auto">
              The faces behind the brand. Eight people who turned everyday life
              into something worth watching.
            </p>
          </div>

          {/* Crew grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-10">
            {crewMembers.map((member) => (
              <div key={member.name} className="group flex flex-col items-center text-center">
                {/* Circular cartoon portrait */}
                <div className="relative mb-4">
                  <div
                    className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundColor: "#1A1A1A" }}
                  >
                    <Image
                      src={member.image}
                      alt={`${member.name} — ${member.tagline}`}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                  {/* Gold ring on hover */}
                  <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-accent transition-colors duration-300 pointer-events-none" />
                </div>

                {/* Name */}
                <h3 className="font-display text-lg md:text-xl font-semibold tracking-wide text-foreground">
                  {member.name}
                </h3>

                {/* Tagline */}
                <p className="mt-1 font-body text-sm text-muted-foreground leading-snug max-w-[180px]">
                  {member.tagline}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FOLLOW THE JOURNEY ====== */}
      <section
        className="relative py-24 px-4"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        {/* Gold divider at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-accent/60 to-transparent" />

        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            FOLLOW THE JOURNEY
          </h2>
          <div className="mt-4 mx-auto h-1 w-16 bg-accent rounded-full" />
          <p className="mt-6 font-body text-muted-foreground text-lg max-w-xl mx-auto">
            New content, new drops, new chaos. Stay locked in.
          </p>

          {/* Social links */}
          <div className="mt-12 flex items-center justify-center gap-8">
            {socials.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3"
              >
                <div
                  className="flex items-center justify-center w-16 h-16 rounded-full border border-border text-muted-foreground transition-all duration-300 group-hover:border-accent group-hover:text-accent group-hover:scale-110"
                  style={{ backgroundColor: "#1A1A1A" }}
                >
                  {social.icon}
                </div>
                <span className="font-body text-sm text-muted-foreground group-hover:text-accent transition-colors duration-300">
                  {social.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
