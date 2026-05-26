import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Return & Exchange Policy | Hoodlums Country Club",
  description:
    "Our 30-day return and exchange policy for Hoodlums Country Club merchandise.",
};

export default function ReturnsPolicyPage() {
  return (
    <>
      <h1>RETURN &amp; EXCHANGE POLICY</h1>

      <h2>30-Day Return Window</h2>
      <p>
        We want you to be satisfied with your purchase. If something isn&apos;t
        right, you have 30 days from the date of delivery to request a return
        or exchange.
      </p>

      <h2>Return Conditions</h2>
      <p>To be eligible for a return, items must be:</p>
      <ul>
        <li>Unworn and unwashed</li>
        <li>In original condition with all tags attached</li>
        <li>In the original packaging (if applicable)</li>
      </ul>

      <h2>Custom &amp; Final Sale Items</h2>
      <p>
        Custom-made or personalized items are final sale and cannot be returned
        or exchanged. Any items marked as &quot;Final Sale&quot; at checkout are
        also non-returnable.
      </p>

      <h2>Exchanges</h2>
      <p>
        Got the wrong size? We offer free exchanges. Simply reach out and
        we&apos;ll get you the correct size shipped out as soon as your return
        is received.
      </p>

      <h2>Return Shipping</h2>
      <p>
        Customers are responsible for return shipping costs unless the item is
        defective or we made an error with your order. In those cases, we will
        provide a prepaid return label.
      </p>

      <h2>Refund Processing</h2>
      <p>
        Once we receive and inspect your return, refunds are processed within
        5-7 business days. The refund will be issued to your original payment
        method. Please allow an additional 3-5 days for your bank or card
        issuer to reflect the credit.
      </p>

      <h2>How to Initiate a Return</h2>
      <p>
        To start a return or exchange, email us at{" "}
        <a
          href="mailto:support@thehoodlumscountryclub.com"
          className="text-[#C9A227] underline hover:text-cream transition-colors"
        >
          support@thehoodlumscountryclub.com
        </a>{" "}
        with your order number and the reason for the return. We&apos;ll get
        back to you with instructions within 1-2 business days.
      </p>
    </>
  );
}
