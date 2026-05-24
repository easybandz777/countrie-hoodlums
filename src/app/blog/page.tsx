import type { Metadata } from "next";
import BlogContent from "./blog-content";

export const metadata: Metadata = {
  title: "Blog | Hoodlums Country Club",
  description:
    "Stories, drops, and the real behind the Hoodlums Country Club brand.",
};

export default function BlogPage() {
  return <BlogContent />;
}
