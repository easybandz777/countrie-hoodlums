import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart | Hoodlums Country Club",
  description: "View your shopping cart and proceed to checkout.",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
