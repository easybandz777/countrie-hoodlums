"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/capsule-01", label: "Capsule 01" },
  { href: "/play-with-glass", label: "Play with Glass" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://instagram.com/hoodlumscountryclub", label: "Instagram" },
  { href: "https://tiktok.com/@hoodlumscountryclub", label: "TikTok" },
  { href: "https://youtube.com/@hoodlumscountryclub", label: "YouTube" },
  { href: "https://facebook.com/hoodlumscountryclub", label: "Facebook" },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // Lock body scroll when nav is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <nav
        className={`fixed top-0 left-0 z-[70] h-full w-[300px] max-w-[85vw] bg-[#0A0A0A] border-r border-border transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        {/* Close button */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <span className="font-display text-lg font-bold tracking-wide text-foreground uppercase">
            Menu
          </span>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Main nav links */}
        <div className="flex flex-col px-5 py-6">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="py-4 text-xl font-display font-semibold uppercase tracking-wide text-foreground hover:text-accent transition-colors border-b border-border/50"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Social links */}
        <div className="absolute bottom-0 left-0 right-0 px-5 py-6 border-t border-border">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
            Follow Us
          </p>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
