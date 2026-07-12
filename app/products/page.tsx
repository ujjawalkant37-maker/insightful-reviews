import React from "react";
import type { Metadata } from "next";
import type { Category } from "@/types/models";

import ProductGallery from "@/components/ProductGallery";
import ProductFilters from "@/components/ProductFilters";

import categoriesData from "@/data/categories.json";
import {
  getProducts,
  DatabaseProduct,
} from "@/lib/getProducts";

const categories = categoriesData as Category[];

const categoryMap: Record<string, string> = categories.reduce(
  (map, category) => {
    map[category.id] = category.name;
    return map;
  },
  {} as Record<string, string>
);

export const metadata: Metadata = {
  title: "Products - Insightful Reviews",
  description: "Browse the full product catalog.",
};

function parseNum(v?: string): number | undefined {
  if (!v) return undefined;

  const n = parseFloat(v);

  return Number.isFinite(n) ? n : undefined;
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
      images: product.images ?? [],
    }))
  );

  if (category) {
    filteredProducts = filteredProducts.filter(
      (p) => p.categoryId === category
    );
  }

  if (search) {
    const query = search.toLowerCase();

    filteredProducts = filteredProducts.filter((p) =>
      [
        p.name,
        p.summary,
        categoryMap[p.categoryId] ?? "",
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }

  const minPrice = parseNum(priceMin);
  const maxPrice = parseNum(priceMax);

  if (minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        Number(
          p.price.replace(/[^0-9]/g, "")
        ) >= minPrice
    );
  }

  if (maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        Number(
          p.price.replace(/[^0-9]/g, "")
        ) <= maxPrice
    );
  }

  const aiScore = parseNum(aiMin);

  if (aiScore !== undefined) {
    filteredProducts = filteredProducts.filter(
      (p) => p.aiScore >= aiScore
    );
  }

  const rating = parseNum(minRating);

  if (rating !== undefined) {
    filteredProducts = filteredProducts.filter(
      (p) => p.rating >= rating
    );
  }

  switch (sort) {
    case "price_asc":
      filteredProducts.sort(
        (a, b) =>
          Number(a.price.replace(/[^0-9]/g, "")) -
          Number(b.price.replace(/[^0-9]/g, ""))
      );
      break;

    case "price_desc":
      filteredProducts.sort(
        (a, b) =>
          Number(b.price.replace(/[^0-9]/g, "")) -
          Number(a.price.replace(/[^0-9]/g, ""))
      );
      break;

    case "highest_rated":
      filteredProducts.sort(
        (a, b) => b.rating - a.rating
      );
      break;

    case "highest_ai":
      filteredProducts.sort(
        (a, b) => b.aiScore - a.aiScore
      );
      break;
  }

  return (
    <div className="container py-6">

      <React.Suspense
        fallback={<div>Loading Filters...</div>}
      >
        <ProductFilters categories={categories} />
      </React.Suspense>

      <ProductGallery
        products={filteredProducts}
        categoryMap={categoryMap}
      />

    </div>
  );
}