export const SITE_CONFIG = {
  name: "Countrie Hoodlums",
  description:
    "Premium streetwear rooted in culture. Rep where you come from with gear that speaks for itself.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://thecountriehoodlums.com",
  socials: {
    instagram: "https://instagram.com/countriehoodlums",
    tiktok: "https://tiktok.com/@countriehoodlums",
    youtube: "https://youtube.com/@countriehoodlums",
    facebook: "https://facebook.com/countriehoodlums",
  },
  freeShippingThreshold: 75,
  email: "info@thecountriehoodlums.com",
} as const;

export const NAV_LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const PRODUCT_CATEGORIES = [
  { value: "tees", label: "T-Shirts" },
  { value: "hoodies", label: "Hoodies" },
  { value: "hats", label: "Hats" },
  { value: "bottoms", label: "Bottoms" },
  { value: "accessories", label: "Accessories" },
  { value: "outerwear", label: "Outerwear" },
] as const;

export const SIZES = ["S", "M", "L", "XL", "2XL", "3XL"] as const;
