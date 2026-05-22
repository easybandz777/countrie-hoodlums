export type ProductCategory =
  | "tees"
  | "hoodies"
  | "hats"
  | "accessories"
  | "stickers";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  description: string;
  images: string[];
  sizes: string[];
  isNew?: boolean;
  isSoldOut?: boolean;
  tags?: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
  slug: string;
}
