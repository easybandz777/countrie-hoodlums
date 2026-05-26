"use client";

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const posts = Array.from({ length: 6 }, (_, i) => ({ id: i + 1 }));

export default function InstagramFeed() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cream font-display tracking-wide">
            FOLLOW THE MOVEMENT
          </h2>
          <a
            href="https://instagram.com/hoodlumscountryclub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 text-accent hover:text-cream text-sm font-medium transition-colors duration-200"
          >
            @hoodlumscountryclub
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square bg-muted rounded-md overflow-hidden cursor-pointer"
            >
              {/* Placeholder content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-muted-foreground text-xs uppercase tracking-wider">
                  Post {post.id}
                </span>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-cream">
                  <InstagramIcon />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-10">
          <a
            href="https://instagram.com/hoodlumscountryclub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-black font-semibold text-sm uppercase tracking-widest px-8 py-3 rounded transition-colors duration-200"
          >
            Follow us @hoodlumscountryclub
          </a>
        </div>
      </div>
    </section>
  );
}
