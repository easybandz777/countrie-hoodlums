import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Size Guide | Hoodlums Country Club",
  description:
    "Find your perfect fit with the Hoodlums Country Club size guide. Measurements for tees, hoodies, and hats.",
  openGraph: {
    title: "Size Guide | Hoodlums Country Club",
    description:
      "Find your perfect fit with the Hoodlums Country Club size guide. Measurements for tees, hoodies, and hats.",
  },
};

export default function SizeGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
