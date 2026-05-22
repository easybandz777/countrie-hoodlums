import Hero from "@/components/home/hero";
import FeaturedProducts from "@/components/home/featured-products";
import BrandManifesto from "@/components/home/brand-manifesto";
import InstagramFeed from "@/components/home/instagram-feed";
import EmailCapture from "@/components/home/email-capture";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <FeaturedProducts />
      <BrandManifesto />
      <InstagramFeed />
      <EmailCapture />
    </div>
  );
}
