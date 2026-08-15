import React from "react";
import type { Metadata } from "next";

import ProductGallery from "@/components/ProductGallery";
import ProductFilters from "@/components/ProductFilters";

import {
  getProducts,
  type DatabaseProduct,
} from "@/lib/getProducts";

import { getCategories } from "@/lib/getCategories";

export const metadata: Metadata = {
  title: "Products - Insightful Reviews",
  description: "Browse the full product catalog.",
};

function parseNum(value?: string): number | undefined {
  if (!value) {
    return undefined;
  }

  const number = parseFloat(value);

  return Number.isFinite(number) ? number : undefined;
}

function priceToNumber(price: string): number {
  return Number(price.replace(/[^0-9.]/g, ""));
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
    priceMin?: string;
    priceMax?: string;
    aiMin?: string;
    minRating?: string;
    sort?: string;
  }>;
}) {
  const {
    category,
    search,
    priceMin,
    priceMax,
    aiMin,
    minRating,
    sort,
  } = await searchParams;

  const databaseProducts = await getProducts();

  const categories = await getCategories();

  const categoryMap: Record<string, string> = {};

  const categorySlugMap: Record<string, string> = {};

  categories.forEach((category) => {
    categoryMap[String(category.id)] = category.name;

    categorySlugMap[category.slug] = String(category.id);
  });

  let filteredProducts = databaseProducts.map(
    (product: DatabaseProduct) => ({
      id: String(product.id),

      supabaseId: product.id,

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

      images: product.images ?? (product.image_url ? [product.image_url] : []),

      imageSource: product.image_source,
    })
  );

  /* -------------------------------------------------- */
  /* Category Filter                                    */
  /* -------------------------------------------------- */

  if (category) {
    const dbCategory =
      categorySlugMap[category] ?? category;

    filteredProducts = filteredProducts.filter(
      (product) =>
        product.categoryId === dbCategory
    );
  }

  /* -------------------------------------------------- */
  /* Search Filter                                      */
  /* -------------------------------------------------- */

  if (search) {
    const query = search.toLowerCase().trim();

    filteredProducts = filteredProducts.filter(
      (product) =>
        [
          product.name,
          product.summary,
          categoryMap[product.categoryId] ?? "",
        ]
          .join(" ")
          .toLowerCase()
          .includes(query)
    );
  }

  /* -------------------------------------------------- */
  /* Price Filters                                      */
  /* -------------------------------------------------- */

  const minPrice = parseNum(priceMin);

  const maxPrice = parseNum(priceMax);

  if (minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        priceToNumber(product.price) >= minPrice
    );
  }

  if (maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        priceToNumber(product.price) <= maxPrice
    );
  }

  /* -------------------------------------------------- */
  /* AI Score Filter                                    */
  /* -------------------------------------------------- */

  const minimumAIScore = parseNum(aiMin);

  if (minimumAIScore !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.aiScore >= minimumAIScore
    );
  }

  /* -------------------------------------------------- */
  /* Rating Filter                                      */
  /* -------------------------------------------------- */

  const minimumRating = parseNum(minRating);

  if (minimumRating !== undefined) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.rating >= minimumRating
    );
  }

  /* -------------------------------------------------- */
  /* Sorting                                            */
  /* -------------------------------------------------- */

  switch (sort) {
    case "price_asc":
      filteredProducts.sort(
        (a, b) =>
          priceToNumber(a.price) -
          priceToNumber(b.price)
      );
      break;

    case "price_desc":
      filteredProducts.sort(
        (a, b) =>
          priceToNumber(b.price) -
          priceToNumber(a.price)
      );
      break;

    case "highest_rated":
      filteredProducts.sort(
        (a, b) =>
          b.rating - a.rating
      );
      break;

    case "highest_ai":
      filteredProducts.sort(
        (a, b) =>
          b.aiScore - a.aiScore
      );
      break;

    default:
      break;
  }

  /* -------------------------------------------------- */
  /* Render                                              */
  /* -------------------------------------------------- */

  return (
    <div className="container py-6">
      <React.Suspense
        fallback={
          <div className="py-6 text-center text-gray-500">
            Loading Filters...
          </div>
        }
      >
        <ProductFilters
          categories={categories}
        />
      </React.Suspense>

      <ProductGallery
        products={filteredProducts}
        categoryMap={categoryMap}
      />
    </div>
  );
}