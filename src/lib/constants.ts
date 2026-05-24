export const SITE_CONFIG = {
  name: "Hoodlums Country Club",
  shortName: "HCC",
  tagline: "Bad Decisions · Good Times",
  description:
    "Hoodlums Country Club — country grit, hood soul, zero apologies. Premium merch for the ones who live each day like it's their last.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://thehoodlumscountryclub.com",
  socials: {
    facebook: "https://facebook.com/people/Countrie-Hoodlums/61585880894365/",
  },
  freeShippingThreshold: 75,
  email: "info@thehoodlumscountryclub.com",
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
