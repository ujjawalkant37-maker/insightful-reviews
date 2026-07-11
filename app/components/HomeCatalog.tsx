"use client";

import React, { useMemo } from "react";
import Link from "next/link";

import ProductGallery from "@/components/ProductGallery";
import type { Product } from "@/types/models";

import rawProducts from "@/data/products.json";
import categories from "@/data/categories.json";

const products = rawProducts as Product[];

const categoryMap: Record<string, string> = categories.reduce(
  (map, category) => {
    map[category.id] = category.name;
    return map;
  },
  {} as Record<string, string>
);

function normalizeSearchText(product: Product) {
  return [
    product.name,
    product.summary,
    categoryMap[product.categoryId] ?? product.categoryId,
  ]
    .join(" ")
    .toLowerCase();
}

export default function HomeCatalog({
  query,
}: {
  query?: string;
}) {
  const filteredProducts = useMemo(() => {
    if (!query?.trim()) return products;

    const q = query.toLowerCase();

    return products.filter((product) =>
      normalizeSearchText(product).includes(q)
    );
  }, [query]);

  return (
    <section className="container py-16">

      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 dark:bg-red-900 dark:text-red-300">
            🔥 Trending Now
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900 dark:text-white">
            Most Popular Products
          </h2>

          <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
            Explore the highest-rated products based on
            AI analysis, expert opinions and genuine user reviews.
          </p>

        </div>

        <Link
          href="/products"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-indigo-600 px-6 font-semibold text-white transition hover:bg-indigo-700"
        >
          View All Products
        </Link>

      </div>

      <ProductGallery
        products={filteredProducts}
        categoryMap={categoryMap}
      />

      <div className="mt-16 grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">

          <div className="text-4xl">⭐</div>

          <div className="mt-4 text-3xl font-bold">
            4.8+
          </div>

          <div className="mt-2 text-gray-600 dark:text-gray-400">
            Average Product Rating
          </div>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">

          <div className="text-4xl">🤖</div>

          <div className="mt-4 text-3xl font-bold">
            AI
          </div>

          <div className="mt-2 text-gray-600 dark:text-gray-400">
            AI Decision Engine
          </div>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">

          <div className="text-4xl">🛡️</div>

          <div className="mt-4 text-3xl font-bold">
            100%
          </div>

          <div className="mt-2 text-gray-600 dark:text-gray-400">
            Trust Score Analysis
          </div>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-zinc-900">

          <div className="text-4xl">📈</div>

          <div className="mt-4 text-3xl font-bold">
            Live
          </div>

          <div className="mt-2 text-gray-600 dark:text-gray-400">
            Price Tracking
          </div>

        </div>

      </div>

    </section>
  );
}