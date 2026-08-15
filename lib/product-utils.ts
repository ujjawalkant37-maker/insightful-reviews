import type { DatabaseProduct } from "@/lib/getProducts";
import type { Product } from "@/types/models";

export const PRODUCT_IMAGE_FALLBACK = "/placeholder.svg";

function finiteNumber(value: unknown, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function clampRating(value: unknown): number {
  return Math.min(5, Math.max(0, finiteNumber(value, 0)));
}

export function clampAiScore(value: unknown): number {
  return Math.round(Math.min(100, Math.max(0, finiteNumber(value, 0))));
}

export function cleanText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function isRealProductImage(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const image = value.trim();
  if (!image) return false;
  return /^https?:\/\//i.test(image) || image.startsWith("/");
}

export function cleanImages(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return [...new Set(
    value
      .filter(isRealProductImage)
      .map((item) => item.trim()),
  )];
}

export function formatProductPrice(value: unknown): string {
  const price = finiteNumber(value, 0);
  if (price <= 0) return "Price unavailable";
  return `₹${Math.round(price).toLocaleString("en-IN")}`;
}

export function mapDatabaseProduct(product: DatabaseProduct): Product {
  return {
    id: String(product.id),
    slug: cleanText(product.slug),
    name: cleanText(product.name) || "Unnamed product",
    categoryId: String(product.category_id),
    price: formatProductPrice(product.price),
    rating: clampRating(product.rating),
    aiScore: clampAiScore(product.ai_score),
    summary: cleanText(product.summary) || "Product information is being verified.",
    specs: product.specifications ?? {},
    pros: Array.isArray(product.pros) ? product.pros : [],
    cons: Array.isArray(product.cons) ? product.cons : [],
    expertSummary: cleanText(product.description),
    buyUrl: cleanText(product.buy_url),
    images: cleanImages(product.images),
  };
}
