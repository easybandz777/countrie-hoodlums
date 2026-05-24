import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { MOCK_PRODUCTS, type Product } from "@/lib/mock-data";
import ImageGallery from "@/components/shop/image-gallery";
import ProductInfo from "./product-info";
import ProductCard from "@/components/shop/product-card";

/* ---------- helpers ---------- */

function getProduct(slug: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}

function getRelatedProducts(product: Product): Product[] {
  return MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  )
    .concat(MOCK_PRODUCTS.filter((p) => p.id !== product.id))
    .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
    .slice(0, 4);
}

/* ---------- SEO ---------- */

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return { title: "Product Not Found | Hoodlums Country Club" };
  }

  return {
    title: `${product.name} | Hoodlums Country Club`,
    description: product.description,
    openGraph: {
      title: `${product.name} | Hoodlums Country Club`,
      description: product.description,
      type: "website",
    },
  };
}

/* ---------- Page ---------- */

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product);

  const galleryImages = [product.image, product.cartoonImage];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-gold transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-gold transition-colors">
          Shop
        </Link>
        <span>/</span>
        <span className="text-foreground truncate">{product.name}</span>
      </nav>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left column: Image gallery */}
        <ImageGallery images={galleryImages} alt={product.name} />

        {/* Right column: Product info (client component for interactivity) */}
        <ProductInfo product={product} />
      </div>

      {/* Accordion sections */}
      <div className="mt-16 border-t border-border pt-8">
        <AccordionSection title="Details">
          <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm leading-relaxed">
            <li>Premium heavyweight 6.5 oz cotton</li>
            <li>Screen-printed graphics with soft-hand ink</li>
            <li>Preshrunk and garment-dyed</li>
            <li>Ribbed crew neck collar</li>
            <li>Double-needle stitching on sleeves and hem</li>
            <li>Hoodlums Country Club woven label at hem</li>
          </ul>
        </AccordionSection>

        <AccordionSection title="Sizing">
          <div className="text-muted-foreground text-sm leading-relaxed space-y-3">
            <p>
              All measurements are approximate and taken flat. We recommend
              ordering your usual size for a regular fit, or sizing up for an
              oversized look.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 pr-6 text-foreground font-semibold">
                      Size
                    </th>
                    <th className="py-2 pr-6 text-foreground font-semibold">
                      Chest
                    </th>
                    <th className="py-2 pr-6 text-foreground font-semibold">
                      Length
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-6">S</td>
                    <td className="py-2 pr-6">18&quot;</td>
                    <td className="py-2 pr-6">27&quot;</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-6">M</td>
                    <td className="py-2 pr-6">20&quot;</td>
                    <td className="py-2 pr-6">28&quot;</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-6">L</td>
                    <td className="py-2 pr-6">22&quot;</td>
                    <td className="py-2 pr-6">29&quot;</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-6">XL</td>
                    <td className="py-2 pr-6">24&quot;</td>
                    <td className="py-2 pr-6">30&quot;</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 pr-6">2XL</td>
                    <td className="py-2 pr-6">26&quot;</td>
                    <td className="py-2 pr-6">31&quot;</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-6">3XL</td>
                    <td className="py-2 pr-6">28&quot;</td>
                    <td className="py-2 pr-6">32&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </AccordionSection>

        <AccordionSection title="Shipping Info">
          <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm leading-relaxed">
            <li>Free shipping on orders over $75</li>
            <li>Standard shipping: 5-7 business days ($5.99)</li>
            <li>Expedited shipping: 2-3 business days ($12.99)</li>
            <li>Orders placed before 2 PM CT ship same day</li>
            <li>
              International shipping available (rates calculated at checkout)
            </li>
            <li>
              Returns accepted within 30 days of delivery, unworn with tags
              attached
            </li>
          </ul>
        </AccordionSection>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-[family-name:var(--font-display)] uppercase tracking-wide mb-8">
            YOU MAY ALSO LIKE
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {related.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* ---------- Accordion (server component) ---------- */

function AccordionSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group border-b border-border">
      <summary className="flex items-center justify-between cursor-pointer py-5 text-foreground font-semibold uppercase tracking-wide text-sm select-none list-none [&::-webkit-details-marker]:hidden">
        {title}
        <span className="text-muted-foreground transition-transform duration-300 group-open:rotate-45 text-xl leading-none">
          +
        </span>
      </summary>
      <div className="pb-6">{children}</div>
    </details>
  );
}
