import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Countrie Hoodlums",
  description:
    "The story behind Countrie Hoodlums — where country meets hood and comedy meets real life.",
  openGraph: {
    title: "About | Countrie Hoodlums",
    description:
      "The story behind Countrie Hoodlums — where country meets hood and comedy meets real life.",
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
    name: "Instagram",
    href: "https://instagram.com/countriehoodlums",
    icon: (
      <svg
        className="w-7 h-7"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@countriehoodlums",
    icon: (
      <svg
        className="w-7 h-7"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@countriehoodlums",
    icon: (
      <svg
        className="w-7 h-7"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 01-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 01-1.768-1.768C2 15.255 2 12 2 12s0-3.255.418-4.814a2.507 2.507 0 011.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418zM15.194 12 10 15V9l5.194 3z"
          clipRule="evenodd"
        />
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
            We ain&apos;t your typical brand. Countrie Hoodlums was born from
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
