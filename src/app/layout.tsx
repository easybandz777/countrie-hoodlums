import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

import AnnouncementBar from "@/components/layout/announcement-bar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CartDrawer from "@/components/cart/cart-drawer";

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Hoodlums Country Club | Bad Decisions · Good Times",
  description:
    "Official Hoodlums Country Club merch — tees, hoodies, hats. Country grit, hood soul, zero apologies. HCC.",
  openGraph: {
    siteName: "Hoodlums Country Club",
    title: "Hoodlums Country Club | Bad Decisions · Good Times",
    description:
      "Official Hoodlums Country Club merch — tees, hoodies, hats. Country grit, hood soul, zero apologies. HCC.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
