import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | Hoodlums Country Club",
  description:
    "Browse the full Hoodlums Country Club collection — tees, hoodies, hats, accessories, and more.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
