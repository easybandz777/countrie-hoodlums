import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Countrie Hoodlums",
  description:
    "How Countrie Hoodlums collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <h1>PRIVACY POLICY</h1>
      <p className="!text-[#999] !text-xs uppercase tracking-wider !mb-10">
        Last updated: May 2026
      </p>

      <h2>Information We Collect</h2>
      <p>
        When you make a purchase or interact with our site, we may collect the
        following information:
      </p>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Shipping address</li>
        <li>
          Payment information (processed securely through Stripe — we never
          store your card details)
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <h3>Order Fulfillment</h3>
      <p>
        We use your name, email, and shipping address to process and deliver
        your orders, send order confirmations, and provide shipping updates.
      </p>

      <h3>Marketing</h3>
      <p>
        With your consent, we may send promotional emails about new products,
        drops, and exclusive offers. You can unsubscribe at any time by
        clicking the link in any marketing email.
      </p>

      <h2>Cookies</h2>
      <p>
        We use cookies to improve your browsing experience, remember your cart
        contents, and analyze site traffic. You can manage cookie preferences
        through your browser settings.
      </p>

      <h2>Third Parties</h2>
      <p>
        We share your information only with trusted third parties necessary to
        operate our business:
      </p>
      <ul>
        <li>
          <strong className="text-white">Stripe</strong> — payment processing
        </li>
        <li>
          <strong className="text-white">Shipping carriers</strong> — order
          delivery (USPS, UPS, FedEx)
        </li>
      </ul>
      <p>
        We do not sell, trade, or rent your personal information to third
        parties for marketing purposes.
      </p>

      <h2>Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access the personal data we hold about you</li>
        <li>Request correction of inaccurate information</li>
        <li>Request deletion of your data</li>
        <li>Opt out of marketing communications</li>
      </ul>

      <h2>Data Retention</h2>
      <p>
        We retain your personal information for as long as necessary to fulfill
        orders, resolve disputes, and comply with legal obligations. If you
        request deletion, we will remove your data within 30 days unless we are
        legally required to retain it.
      </p>

      <h2>Contact Us</h2>
      <p>
        For privacy-related questions or to exercise your rights, contact us
        at{" "}
        <a
          href="mailto:privacy@thecountriehoodlums.com"
          className="text-[#C8A84B] underline hover:text-white transition-colors"
        >
          privacy@thecountriehoodlums.com
        </a>
        .
      </p>
    </>
  );
}
