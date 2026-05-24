import { MOCK_PRODUCTS } from "@/lib/mock-data";

export function getPrintfulVariantId(
  productId: string,
  size: string
): number | null {
  const product = MOCK_PRODUCTS.find((p) => p.id === productId);
  if (!product?.printfulVariantIds) return null;
  return product.printfulVariantIds[size] ?? null;
}
