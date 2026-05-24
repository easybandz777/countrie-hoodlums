export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: "culture" | "drops" | "behind-the-scenes";
  featured: boolean;
}

export const MOCK_POSTS: BlogPost[] = [
  {
    id: "post_001",
    title: "The Story Behind Hoodlums Country Club",
    slug: "the-story-behind-countrie-hoodlums",
    excerpt:
      "From a small town with big dreams to a movement that speaks for the culture. Here's how Hoodlums Country Club came to life.",
    content: `We never set out to build a brand. We set out to tell a story — our story. Growing up where country roads meet hood blocks, we lived in two worlds that most people think don't mix. But they do. They always have.

Hoodlums Country Club was born from late nights, empty pockets, and a refusal to let our zip code define our potential. We saw the culture in the dirt roads and the driveways. We heard the music in the cicadas and the bass. We found our people in the in-between.

The name itself came from a joke — somebody called us "country hoodlums" like it was an insult. We took that and turned it into armor. That's what this brand is: taking what they throw at you and wearing it like a crown.

Every piece we drop carries that energy. The designs aren't just graphics — they're chapters of a story that's still being written. When you wear Hoodlums Country Club, you're repping a lifestyle, a mindset, a community that refuses to be boxed in.

This is just the beginning. The block raised us. The brand carries us forward.`,
    date: "2026-05-10",
    author: "The Crew",
    category: "culture",
    featured: true,
  },
  {
    id: "post_002",
    title: "Summer Drop 2026 Preview",
    slug: "summer-drop-2026-preview",
    excerpt:
      "New heat incoming. Get an exclusive first look at what's dropping this summer — tees, hoodies, and pieces you won't find anywhere else.",
    content: `Summer 2026 is about to be different. We've been locked in for months, working on pieces that push the Hoodlums Country Club aesthetic further than ever before.

This drop features heavyweight cut-and-sew tees in colorways inspired by our roots — burnt orange sunsets, deep pine greens, and the cream of gravel backroads. Every piece is designed in-house and produced in limited quantities. Once they're gone, they're gone.

The centerpiece of the collection is the "Two Worlds" hoodie — a split design that represents the duality of our culture. One side country, one side hood, all authentic. Premium fleece, embroidered details, and a fit that hits different.

We're also introducing our first accessories line: dad hats, beanies for the fall preview, and a collaboration piece we can't reveal yet. Just know it's going to shake things up.

Mark your calendars. The Summer Drop 2026 goes live June 15th at noon CST. No restocks. No exceptions.

Sign up for our text list to get early access 30 minutes before the public drop.`,
    date: "2026-05-18",
    author: "The Crew",
    category: "drops",
    featured: true,
  },
  {
    id: "post_003",
    title: "A Day in the Life with the Crew",
    slug: "a-day-in-the-life-with-the-crew",
    excerpt:
      "Pull up behind the scenes. From sunrise studio sessions to late-night design reviews — this is what building Hoodlums Country Club really looks like.",
    content: `People see the drops and the posts, but they don't see the 5 AM wake-ups. They don't see the arguments over colorways or the trips to the screen printer at midnight. This is what a day in our world actually looks like.

Morning starts early. We hit the studio space — which is really just a converted garage with good lighting and too many samples hanging on racks. Coffee's on, music's playing, and we're reviewing mock-ups from the night before. Half of them get scrapped. That's the process.

By noon, we're shooting content. Product flats, fit pics, reels for socials. Nothing is outsourced. Every photo, every video, every caption comes from us. When you see it on the page, that's our hands, our vision.

Afternoons are for the business side — inventory counts, shipping logistics, customer messages. We read every single DM. Every order gets packed by hand with a handwritten note. That won't change no matter how big this gets.

Evenings are when the creative energy hits hardest. New designs come alive after dark. We sketch, we argue, we iterate. Sometimes a piece goes through twenty versions before it feels right. We don't rush it.

By midnight, we're back to our separate spots but the group chat stays lit. Ideas flying. Screenshots of inspiration. Plans for the next move.

This isn't a side hustle. This is the mission. Every day, all day.`,
    date: "2026-05-20",
    author: "The Crew",
    category: "behind-the-scenes",
    featured: false,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return MOCK_POSTS.find((post) => post.slug === slug);
}

export function getRelatedPosts(currentSlug: string): BlogPost[] {
  return MOCK_POSTS.filter((post) => post.slug !== currentSlug).slice(0, 2);
}
