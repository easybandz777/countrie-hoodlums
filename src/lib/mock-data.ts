export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: "tees" | "hoodies" | "hats" | "accessories" | "stickers";
  isNew: boolean;
  isSoldOut: boolean;
  description: string;
  sizes: string[];
  image: string;
  cartoonImage: string;
}

export const MOCK_PRODUCTS: Product[] = [
  // ---------- HOODIES ----------
  {
    id: "prod_001",
    name: "Heritage Hoodie",
    slug: "hoodie-heritage",
    price: 78,
    category: "hoodies",
    isNew: true,
    isSoldOut: false,
    description:
      "Heavyweight black pullover with gold embroidered chest logo and skull-cowboy badge. The flagship hoodie.",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    image: "/images/products/hoodie-heritage.webp",
    cartoonImage: "/images/products/hoodie-heritage-cartoon.webp",
  },
  {
    id: "prod_002",
    name: '"Live Each Day" Hoodie',
    slug: "hoodie-live-each-day",
    price: 82,
    category: "hoodies",
    isNew: true,
    isSoldOut: false,
    description:
      "Oversized washed charcoal pullover. Full-back sunset-and-dirt-road print with the mantra arched in cream and gold.",
    sizes: ["S", "M", "L", "XL", "2XL"],
    image: "/images/products/hoodie-live-each-day.webp",
    cartoonImage: "/images/products/hoodie-live-each-day-cartoon.webp",
  },
  {
    id: "prod_003",
    name: "Camo Crossover Hoodie",
    slug: "hoodie-camo-crossover",
    price: 85,
    category: "hoodies",
    isNew: true,
    isSoldOut: false,
    description:
      "Heavyweight 450gsm forest-camo pullover with dripping liquid-gold chest type. Limited drop.",
    sizes: ["S", "M", "L", "XL", "2XL"],
    image: "/images/products/hoodie-camo-crossover.webp",
    cartoonImage: "/images/products/hoodie-camo-crossover-cartoon.webp",
  },
  {
    id: "prod_004",
    name: "Crew Zip Hoodie",
    slug: "hoodie-crew",
    price: 88,
    category: "hoodies",
    isNew: false,
    isSoldOut: false,
    description:
      "Full-zip with biker-patch crest on the back: crossed shotgun and fishing rod, EST. 2024 arc. YKK metal zipper.",
    sizes: ["S", "M", "L", "XL", "2XL"],
    image: "/images/products/hoodie-crew.webp",
    cartoonImage: "/images/products/hoodie-crew-cartoon.webp",
  },
  {
    id: "prod_005",
    name: "From the Dirt Hoodie",
    slug: "hoodie-from-the-dirt",
    price: 78,
    category: "hoodies",
    isNew: false,
    isSoldOut: false,
    description:
      "Forest green oversized pullover with a golden tree-of-life graphic. Roots spell COUNTRIE, branches spell HOODLUMS.",
    sizes: ["S", "M", "L", "XL", "2XL"],
    image: "/images/products/hoodie-from-the-dirt.webp",
    cartoonImage: "/images/products/hoodie-from-the-dirt-cartoon.webp",
  },

  // ---------- TEES ----------
  {
    id: "prod_006",
    name: "OG Logo Tee",
    slug: "tee-og-logo",
    price: 38,
    category: "tees",
    isNew: true,
    isSoldOut: false,
    description:
      "Garment-dyed heavyweight black tee. Stacked cream-gold COUNTRIE HOODLUMS with cracked vintage print texture.",
    sizes: ["S", "M", "L", "XL", "2XL"],
    image: "/images/products/tee-og-logo.webp",
    cartoonImage: "/images/products/tee-og-logo-cartoon.webp",
  },
  {
    id: "prod_007",
    name: '"Country Raised, Hood Paid" Tee',
    slug: "tee-country-raised",
    price: 42,
    category: "tees",
    isNew: true,
    isSoldOut: false,
    description:
      "Off-white oversized cotton. Burnout-truck illustration with the dual-identity slogan in gold-outlined brown.",
    sizes: ["S", "M", "L", "XL", "2XL"],
    image: "/images/products/tee-country-raised.webp",
    cartoonImage: "/images/products/tee-country-raised-cartoon.webp",
  },
  {
    id: "prod_008",
    name: "Skull & Country Tee",
    slug: "tee-skull-country",
    price: 42,
    category: "tees",
    isNew: false,
    isSoldOut: false,
    description:
      "Tattoo-style cowboy skull with gold grillz, crossed fishing rods, and blackletter brand arc on premium black cotton.",
    sizes: ["S", "M", "L", "XL", "2XL"],
    image: "/images/products/tee-skull-country.webp",
    cartoonImage: "/images/products/tee-skull-country-cartoon.webp",
  },
  {
    id: "prod_009",
    name: '"Property Of" Tee',
    slug: "tee-property-of",
    price: 38,
    category: "tees",
    isNew: false,
    isSoldOut: false,
    description:
      "Heather gray varsity print. PROPERTY OF · COUNTRIE HOODLUMS · ATHLETIC DEPT. with cracked vintage screenprint.",
    sizes: ["S", "M", "L", "XL", "2XL"],
    image: "/images/products/tee-property-of.webp",
    cartoonImage: "/images/products/tee-property-of-cartoon.webp",
  },
  {
    id: "prod_010",
    name: "Scenic Back Tee",
    slug: "tee-scenic-back",
    price: 44,
    category: "tees",
    isNew: false,
    isSoldOut: false,
    description:
      "Premium black tee with framed bonfire-at-night back print in warm gold tones. Small CH front chest hit.",
    sizes: ["S", "M", "L", "XL", "2XL"],
    image: "/images/products/tee-scenic-back.webp",
    cartoonImage: "/images/products/tee-scenic-back-cartoon.webp",
  },
  {
    id: "prod_011",
    name: "Bold Statement Tee",
    slug: "tee-bold-statement",
    price: 38,
    category: "tees",
    isNew: false,
    isSoldOut: false,
    description:
      "Washed vintage-black oversized fit. Massive HOODLUM impact font with gold drop-shadow, tiny countrie cursive above.",
    sizes: ["S", "M", "L", "XL", "2XL"],
    image: "/images/products/tee-bold-statement.webp",
    cartoonImage: "/images/products/tee-bold-statement-cartoon.webp",
  },

  // ---------- HATS ----------
  {
    id: "prod_012",
    name: "Classic Trucker",
    slug: "hat-classic-trucker",
    price: 34,
    category: "hats",
    isNew: true,
    isSoldOut: false,
    description:
      "Richardson 112 — black twill front, woodland camo mesh back, gold rope-style embroidered logo.",
    sizes: ["One Size"],
    image: "/images/products/hat-classic-trucker.webp",
    cartoonImage: "/images/products/hat-classic-trucker-cartoon.webp",
  },
  {
    id: "prod_013",
    name: "Leather Patch Trucker",
    slug: "hat-leather-patch",
    price: 38,
    category: "hats",
    isNew: false,
    isSoldOut: false,
    description:
      "Richardson 112 all-black with laser-engraved CH genuine leather patch. Handcrafted small-batch feel.",
    sizes: ["One Size"],
    image: "/images/products/hat-leather-patch.webp",
    cartoonImage: "/images/products/hat-leather-patch-cartoon.webp",
  },
  {
    id: "prod_014",
    name: "Hoodlum Dad Hat",
    slug: "hat-dad-hat",
    price: 32,
    category: "hats",
    isNew: false,
    isSoldOut: false,
    description:
      "Richardson 320 olive drab unstructured. Minimal gold skull-cowboy embroidery, brass-buckle strap back.",
    sizes: ["One Size"],
    image: "/images/products/hat-dad-hat.webp",
    cartoonImage: "/images/products/hat-dad-hat-cartoon.webp",
  },
  {
    id: "prod_015",
    name: "Gold Brim Snapback",
    slug: "hat-snapback",
    price: 36,
    category: "hats",
    isNew: false,
    isSoldOut: false,
    description:
      "Richardson 511 flat brim. Black panels with metallic gold brim and 3D puff CH monogram.",
    sizes: ["One Size"],
    image: "/images/products/hat-snapback.webp",
    cartoonImage: "/images/products/hat-snapback-cartoon.webp",
  },

  // ---------- CREWNECKS (grouped under hoodies) ----------
  {
    id: "prod_016",
    name: "Vintage Crewneck",
    slug: "crewneck-vintage",
    price: 68,
    category: "hoodies",
    isNew: true,
    isSoldOut: false,
    description:
      "Washed sage green brushed fleece. Retro collegiate COUNTRIE HOODLUMS in cream with gold outline.",
    sizes: ["S", "M", "L", "XL", "2XL"],
    image: "/images/products/crewneck-vintage.webp",
    cartoonImage: "/images/products/crewneck-vintage-cartoon.webp",
  },
  {
    id: "prod_017",
    name: "Chain-Stitch Crewneck",
    slug: "crewneck-embroidered",
    price: 75,
    category: "hoodies",
    isNew: false,
    isSoldOut: false,
    description:
      "Heavyweight 450gsm black crewneck. Minimal gold chain-stitch Countrie Hoodlums script on the left chest.",
    sizes: ["S", "M", "L", "XL", "2XL"],
    image: "/images/products/crewneck-embroidered.webp",
    cartoonImage: "/images/products/crewneck-embroidered-cartoon.webp",
  },
  {
    id: "prod_018",
    name: "Compass Crewneck",
    slug: "crewneck-graphic",
    price: 70,
    category: "hoodies",
    isNew: false,
    isSoldOut: false,
    description:
      "Charcoal heather crewneck with a golden compass-rose graphic and dirt-road horizon at the center.",
    sizes: ["S", "M", "L", "XL", "2XL"],
    image: "/images/products/crewneck-graphic.webp",
    cartoonImage: "/images/products/crewneck-graphic-cartoon.webp",
  },

  // ---------- ACCESSORIES ----------
  {
    id: "prod_019",
    name: "The Collection Sticker Pack",
    slug: "collection-flatlay",
    price: 12,
    category: "accessories",
    isNew: true,
    isSoldOut: false,
    description:
      "Six die-cut vinyl stickers featuring the full Countrie Hoodlums collection. Waterproof and weatherproof.",
    sizes: [],
    image: "/images/products/collection-flatlay.webp",
    cartoonImage: "/images/products/collection-flatlay-cartoon.webp",
  },
  {
    id: "prod_020",
    name: "Mood Board Pin Set",
    slug: "lifestyle-moodboard",
    price: 18,
    category: "accessories",
    isNew: true,
    isSoldOut: false,
    description:
      "Four enamel pins capturing the brand mood: hoodie, hat, lantern stack, bonfire cooler. Gold edges throughout.",
    sizes: [],
    image: "/images/products/lifestyle-moodboard.webp",
    cartoonImage: "/images/products/lifestyle-moodboard-cartoon.webp",
  },
];
