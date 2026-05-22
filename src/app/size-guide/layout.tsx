import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Size Guide | Countrie Hoodlums",
  description:
    "Find your perfect fit with the Countrie Hoodlums size guide. Measurements for tees, hoodies, and hats.",
  openGraph: {
    title: "Size Guide | Countrie Hoodlums",
    description:
      "Find your perfect fit with the Countrie Hoodlums size guide. Measurements for tees, hoodies, and hats.",
  },
};

export default function SizeGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
