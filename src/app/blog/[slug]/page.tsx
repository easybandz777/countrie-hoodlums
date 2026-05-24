import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts, MOCK_POSTS } from "@/lib/mock-blog";
import ShareButtons from "./share-buttons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found | Hoodlums Country Club" };
  return {
    title: `${post.title} | Hoodlums Country Club`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  return MOCK_POSTS.map((post) => ({ slug: post.slug }));
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug);
  const paragraphs = post.content.split("\n\n");

  return (
    <article className="px-4 md:px-8 lg:px-12 py-12 max-w-[900px] mx-auto">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-8 text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
        Back to Blog
      </Link>

      {/* Feature Image Placeholder */}
      <div className="aspect-video bg-muted rounded-lg mb-8 flex items-center justify-center overflow-hidden">
        <span className="text-muted-foreground text-sm uppercase tracking-wider">
          Featured Image
        </span>
      </div>

      {/* Category Badge */}
      <span className="inline-block text-xs uppercase tracking-wider text-gold font-medium bg-gold/10 px-3 py-1 rounded-full mb-4">
        {post.category.replace("-", " ")}
      </span>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 font-[family-name:var(--font-display)]">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10 pb-8 border-b border-border">
        <span>{formatDate(post.date)}</span>
        <span className="w-1 h-1 rounded-full bg-muted-foreground" />
        <span>By {post.author}</span>
      </div>

      {/* Body Content */}
      <div className="space-y-6 mb-12">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-foreground/90 text-base md:text-lg leading-relaxed font-[family-name:var(--font-body)]"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Share Buttons */}
      <div className="border-t border-border pt-8 mb-12">
        <h3 className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
          Share this post
        </h3>
        <ShareButtons title={post.title} slug={post.slug} />
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="border-t border-border pt-10">
          <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-6">
            MORE FROM THE BLOCK
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                href={`/blog/${related.slug}`}
                className="group block bg-card border border-border rounded-lg overflow-hidden hover:border-gold/50 transition-colors"
              >
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-xs uppercase tracking-wider">
                    {related.category.replace("-", " ")}
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="font-bold font-[family-name:var(--font-display)] group-hover:text-gold transition-colors">
                    {related.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                    {related.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
