import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Hoodlums Country Club",
  description:
    "Terms and conditions for using the Hoodlums Country Club website and purchasing our products.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <h1>TERMS OF SERVICE</h1>
      <p className="!text-[#999] !text-xs uppercase tracking-wider !mb-10">
        Last updated: May 2026
      </p>

      <h2>Acceptance of Terms</h2>
      <p>
        By accessing and using the Hoodlums Country Club website, you agree to be
        bound by these Terms of Service. If you do not agree with any part of
        these terms, please do not use our website or purchase our products.
      </p>

      <h2>Use of Website</h2>
      <p>
        You agree to use this website for lawful purposes only. You may not use
        our site in any way that could damage, disable, or impair the site or
        interfere with other users&apos; access. You must be at least 18 years
        old to make a purchase.
      </p>

      <h2>Product Descriptions</h2>
      <p>
        We strive to display our products as accurately as possible. However,
        colors may vary slightly depending on your device&apos;s display
        settings. We do not guarantee that product descriptions, pricing, or
        other content is error-free. We reserve the right to correct any errors
        and update information at any time.
      </p>

      <h2>Pricing &amp; Payment</h2>
      <p>
        All prices are listed in US dollars and are subject to change without
        notice. Payment is processed securely through Stripe. By completing a
        purchase, you represent that you are authorized to use the payment
        method provided.
      </p>
      <p>
        We reserve the right to refuse or cancel orders at our discretion,
        including cases of suspected fraud or pricing errors.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on this website — including but not limited to designs,
        logos, graphics, text, images, and product names — is the exclusive
        property of Hoodlums Country Club and is protected by copyright and
        trademark laws.
      </p>
      <p>
        You may not reproduce, distribute, modify, or create derivative works
        from any content on this site without our express written permission.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        Hoodlums Country Club shall not be liable for any indirect, incidental,
        special, or consequential damages arising from your use of this website
        or purchase of our products. Our total liability for any claim shall
        not exceed the amount you paid for the specific product in question.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms shall be governed by and construed in accordance with the
        laws of the United States. Any disputes arising from these terms or
        your use of our website shall be resolved in the appropriate courts.
      </p>

      <h2>Modifications to Terms</h2>
      <p>
        We reserve the right to update or modify these Terms of Service at any
        time. Changes will be posted on this page with an updated &quot;Last
        updated&quot; date. Your continued use of the website after changes are
        posted constitutes acceptance of the revised terms.
      </p>

      <h2>Contact</h2>
      <p>
        If you have questions about these terms, contact us at{" "}
        <a
          href="mailto:support@thehoodlumscountryclub.com"
          className="text-[#C9A227] underline hover:text-cream transition-colors"
        >
          support@thehoodlumscountryclub.com
        </a>
        .
      </p>
    </>
  );
}
