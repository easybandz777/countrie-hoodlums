"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MOCK_POSTS, type BlogPost } from "@/lib/mock-blog";

type CategoryFilter = "All" | "Culture" | "Drops" | "Behind The Scenes";

const CATEGORIES: CategoryFilter[] = [
  "All",
  "Culture",
  "Drops",
  "Behind The Scenes",
];

function categoryToKey(
  category: CategoryFilter
): BlogPost["category"] | null {
  switch (category) {
    case "Culture":
      return "culture";
    case "Drops":
      return "drops";
    case "Behind The Scenes":
      return "behind-the-scenes";
    default:
      return null;
  }
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogContent() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("All");

  const filteredPosts = useMemo(() => {
    if (activeFilter === "All") return MOCK_POSTS;
    const key = categoryToKey(activeFilter);
    return MOCK_POSTS.filter((post) => post.category === key);
  }, [activeFilter]);

  return (
    <section className="px-4 md:px-8 lg:px-12 py-12 max-w-[1400px] mx-auto">
      {/* Header */}
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 font-[family-name:var(--font-display)]">
        FROM THE BLOCK
      </h1>
      <p className="text-muted-foreground mb-8 text-lg">
        Stories, drops, and the real behind the brand.
      </p>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === cat
                ? "bg-gold text-black"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-gold/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group block bg-card border border-border rounded-lg overflow-hidden hover:border-gold/50 transition-colors"
          >
            {/* Placeholder Image */}
            <div className="aspect-video bg-muted relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-muted-foreground text-sm uppercase tracking-wider">
                  {post.category.replace("-", " ")}
                </span>
              </div>
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors" />
            </div>

            {/* Card Content */}
            <div className="p-5">
              <span className="text-xs uppercase tracking-wider text-gold font-medium">
                {post.category.replace("-", " ")}
              </span>
              <h2 className="text-lg font-bold mt-1 mb-2 font-[family-name:var(--font-display)] group-hover:text-gold transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {formatDate(post.date)}
                </span>
                <span className="text-sm text-gold font-medium group-hover:translate-x-1 transition-transform inline-block">
                  Read More &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            No posts in this category yet. Check back soon.
          </p>
        </div>
      )}
    </section>
  );
}
