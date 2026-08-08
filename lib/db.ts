import type { Category, Product } from "@/types/models";
import {
  getCategories as getDatabaseCategories,
} from "@/lib/getCategories";
import {
  getProductBySlug as getDatabaseProductBySlug,
  getProducts as getDatabaseProducts,
} from "@/lib/getProducts";

/**
 * Compatibility layer for older imports.
 *
 * The application now uses Supabase as the single source of truth.
 * This file intentionally does not read data/*.json.
 */

function mapProduct(product: Awaited<ReturnType<typeof getDatabaseProducts>>[number]): Product {
  return {
    id: String(product.id),
    slug: product.slug,
    name: product.name,
    categoryId: String(product.category_id),
    price: `₹${product.price.toLocaleString("en-IN")}`,
    rating: product.rating,
    aiScore: product.ai_score,
    summary: product.summary,
    specs: product.specifications ?? {},
    pros: product.pros ?? [],
    cons: product.cons ?? [],
    expertSummary: product.description,
    buyUrl: product.buy_url ?? "",
    images: product.images ?? [],
  };
}

export async function getCategories(): Promise<Category[]> {
  const categories = await getDatabaseCategories();

  return categories.map((category) => ({
    id: String(category.id),
    name: category.name,
    slug: category.slug,
    description: undefined,
  }));
}

export async function getProducts(): Promise<Product[]> {
  const products = await getDatabaseProducts();
  return products.map(mapProduct);
}

export async function getProductBySlug(
  slug: string
): Promise<Product | undefined> {
  const product = await getDatabaseProductBySlug(slug);
  return product ? mapProduct(product) : undefined;
}

export async function searchProducts(
  query?: string,
  categoryId?: string
): Promise<Product[]> {
  let products = await getProducts();

  if (categoryId) {
    products = products.filter(
      (product) => product.categoryId === categoryId
    );
  }

  if (query?.trim()) {
    const q = query.toLowerCase().trim();

    products = products.filter(
      (product) =>
        product.name.toLowerCase().includes(q) ||
        product.summary.toLowerCase().includes(q)
    );
  }

  return products;
}
