import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | Countrie Hoodlums",
  description:
    "Browse the full Countrie Hoodlums collection — tees, hoodies, hats, accessories, and more.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
