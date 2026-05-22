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
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod_001",
    name: "Classic Hood Tee",
    slug: "classic-hood-tee",
    price: 38,
    category: "tees",
    isNew: true,
    isSoldOut: false,
    description:
      "The original Countrie Hoodlums tee. Premium heavyweight cotton with screen-printed logo.",
    sizes: ["S", "M", "L", "XL", "2XL"],
    image: "/products/classic-hood-tee.jpg",
  },
  {
    id: "prod_002",
    name: "Country Life Hoodie",
    slug: "country-life-hoodie",
    price: 75,
    category: "hoodies",
    isNew: true,
    isSoldOut: false,
    description:
      "Heavyweight fleece hoodie with embroidered front logo and back print. Double-lined hood.",
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    image: "/products/country-life-hoodie.jpg",
  },
  {
    id: "prod_003",
    name: "Hoodlum Dad Hat",
    slug: "hoodlum-dad-hat",
    price: 32,
    category: "hats",
    isNew: false,
    isSoldOut: false,
    description:
      "Unstructured dad hat with embroidered Countrie Hoodlums script. Adjustable strap back.",
    sizes: ["One Size"],
    image: "/products/hoodlum-dad-hat.jpg",
  },
  {
    id: "prod_004",
    name: "Sticker Pack",
    slug: "sticker-pack",
    price: 12,
    category: "accessories",
    isNew: false,
    isSoldOut: false,
    description:
      "Pack of 6 die-cut vinyl stickers. Waterproof and weatherproof for laptops, bottles, and bumpers.",
    sizes: [],
    image: "/products/sticker-pack.jpg",
  },
  {
    id: "prod_005",
    name: '"Live Each Day" Tee',
    slug: "live-each-day-tee",
    price: 38,
    category: "tees",
    isNew: false,
    isSoldOut: false,
    description:
      'Comfort-fit tee with "Live Each Day" graphic on back. Garment-dyed for a vintage wash feel.',
    sizes: ["S", "M", "L", "XL", "2XL"],
    image: "/products/live-each-day-tee.jpg",
  },
  {
    id: "prod_006",
    name: "Countrie Zip-Up",
    slug: "countrie-zip-up",
    price: 85,
    category: "hoodies",
    isNew: false,
    isSoldOut: false,
    description:
      "Full-zip heavyweight hoodie with chenille patch logo. Metal zipper with branded pull.",
    sizes: ["S", "M", "L", "XL", "2XL"],
    image: "/products/countrie-zip-up.jpg",
  },
  {
    id: "prod_007",
    name: "Snapback Cap",
    slug: "snapback-cap",
    price: 35,
    category: "hats",
    isNew: false,
    isSoldOut: false,
    description:
      "Structured snapback with flat brim. 3D puff embroidered logo on front, flag patch on side.",
    sizes: ["One Size"],
    image: "/products/snapback-cap.jpg",
  },
  {
    id: "prod_008",
    name: "Phone Case",
    slug: "phone-case",
    price: 28,
    category: "accessories",
    isNew: false,
    isSoldOut: false,
    description:
      "Slim-fit phone case with Countrie Hoodlums branding. Impact-resistant TPU with matte finish.",
    sizes: ["iPhone 14", "iPhone 15", "iPhone 16", "Samsung S24"],
    image: "/products/phone-case.jpg",
  },
];
