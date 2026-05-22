import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart | Countrie Hoodlums",
  description: "View your shopping cart and proceed to checkout.",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
