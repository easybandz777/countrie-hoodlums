"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const shopLinks = [
  { label: "All Products", href: "/shop" },
  { label: "Tees", href: "/shop/tees" },
  { label: "Hoodies", href: "/shop/hoodies" },
  { label: "Hats", href: "/shop/hats" },
  { label: "Accessories", href: "/shop/accessories" },
];

const infoLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Size Guide", href: "/size-guide" },
  { label: "Blog", href: "/blog" },
];

const policyLinks = [
  { label: "Shipping", href: "/policies/shipping" },
  { label: "Returns", href: "/policies/returns" },
  { label: "Privacy Policy", href: "/policies/privacy" },
  { label: "Terms of Service", href: "/policies/terms" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com/people/Countrie-Hoodlums/61585880894365/",
    icon: FacebookIcon,
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#2A2A2A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <h2 className="text-cream text-xl font-bold tracking-widest uppercase font-display">
              HOODLUMS COUNTRY CLUB
            </h2>
            <p className="text-[#8A8A8A] text-sm leading-relaxed">
              Bad Decisions &middot; Good Times
            </p>
            <div className="flex items-center gap-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-[#8A8A8A] hover:text-cream transition-colors duration-200"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h3 className="text-cream text-sm font-semibold uppercase tracking-wider mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#8A8A8A] hover:text-cream text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Info */}
          <div>
            <h3 className="text-cream text-sm font-semibold uppercase tracking-wider mb-4">
              Info
            </h3>
            <ul className="space-y-3">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#8A8A8A] hover:text-cream text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Policies + Newsletter */}
          <div className="space-y-8">
            <div>
              <h3 className="text-cream text-sm font-semibold uppercase tracking-wider mb-4">
                Policies
              </h3>
              <ul className="space-y-3">
                {policyLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#8A8A8A] hover:text-cream text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-cream text-sm font-semibold uppercase tracking-wider mb-3">
                Newsletter
              </h3>
              <p className="text-[#8A8A8A] text-xs mb-3">
                Get updates on drops and exclusives.
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex items-center gap-2"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 bg-[#1A1A1A] border border-[#2A2A2A] rounded px-3 py-2 text-sm text-cream placeholder:text-[#5A5A5A] focus:outline-none focus:border-[#C9A227] transition-colors duration-200"
                />
                <button
                  type="submit"
                  className="bg-[#C9A227] hover:bg-[#D4B95F] text-black px-3 py-2 rounded transition-colors duration-200"
                  aria-label="Subscribe to newsletter"
                >
                  <Mail size={16} />
                </button>
              </form>
              {subscribed && (
                <p className="text-[#C9A227] text-xs mt-2">
                  Thanks for subscribing!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2A2A2A]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8A8A8A] text-xs">
            &copy; 2026 Hoodlums Country Club. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {/* Payment method icon placeholders */}
            {["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"].map(
              (method) => (
                <span
                  key={method}
                  className="text-[#5A5A5A] text-[10px] uppercase tracking-wider border border-[#2A2A2A] rounded px-2 py-1"
                >
                  {method}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
