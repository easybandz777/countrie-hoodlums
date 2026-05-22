import type { Metadata } from "next";
import BlogContent from "./blog-content";

export const metadata: Metadata = {
  title: "Blog | Countrie Hoodlums",
  description:
    "Stories, drops, and the real behind the Countrie Hoodlums brand.",
};

export default function BlogPage() {
  return <BlogContent />;
}
