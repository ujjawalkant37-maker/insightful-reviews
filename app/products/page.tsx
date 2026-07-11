import React from "react";
import type { Metadata } from "next";
import type { Product, Category } from "@/types/models";

import ProductGallery from "@/components/ProductGallery";
import ProductFilters from "@/components/ProductFilters";

import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";

const products = productsData as unknown as Product[];
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

function parseProductPrice(price?: string): number {
  if (!price) return Infinity;

  const n = parseFloat(price.replace(/[^0-9.-]/g, ""));

  return Number.isFinite(n) ? n : Infinity;
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

  let filteredProducts = [...products];

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
        categoryMap[p.categoryId] ?? p.categoryId,
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
      (p) => parseProductPrice(p.price) >= minPrice
    );
  }

  if (maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(
      (p) => parseProductPrice(p.price) <= maxPrice
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
          parseProductPrice(a.price) -
          parseProductPrice(b.price)
      );
      break;

    case "price_desc":
      filteredProducts.sort(
        (a, b) =>
          parseProductPrice(b.price) -
          parseProductPrice(a.price)
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