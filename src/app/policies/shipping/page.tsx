import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Policy | Hoodlums Country Club",
  description:
    "Learn about Hoodlums Country Club shipping times, rates, and delivery options.",
};

export default function ShippingPolicyPage() {
  return (
    <>
      <h1>SHIPPING POLICY</h1>

      <h2>Processing Time</h2>
      <p>
        All orders are processed within 3-5 business days after payment is
        confirmed. Orders placed on weekends or holidays will begin processing
        the next business day.
      </p>

      <h2>Shipping Options</h2>
      <ul>
        <li>
          <strong className="text-white">Standard Shipping:</strong> 5-7
          business days after processing
        </li>
        <li>
          <strong className="text-white">Express Shipping:</strong> 2-3
          business days after processing
        </li>
      </ul>

      <h2>Free Shipping</h2>
      <p>
        We offer free standard shipping on all orders over $75. This is
        automatically applied at checkout when your order qualifies.
      </p>

      <h2>Shipping Coverage</h2>
      <p>
        We currently ship within the United States only. We plan to expand
        internationally in the future — stay tuned.
      </p>
      <p>PO Box addresses are accepted for all shipments.</p>

      <h2>Order Tracking</h2>
      <p>
        Once your order ships, you will receive a confirmation email with a
        tracking number. You can use this number to track your package through
        the carrier&apos;s website.
      </p>

      <h2>Questions?</h2>
      <p>
        If you have any questions about shipping or need help with your order,
        reach out to us at{" "}
        <a
          href="mailto:support@thehoodlumscountryclub.com"
          className="text-[#C8A84B] underline hover:text-white transition-colors"
        >
          support@thehoodlumscountryclub.com
        </a>
        .
      </p>
    </>
  );
}
