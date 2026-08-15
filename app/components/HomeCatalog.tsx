"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import ProductGallery from "@/components/ProductGallery";
import type { Product } from "@/types/models";
import {
  getProducts,
  type DatabaseProduct,
} from "@/lib/getProducts";
import { getCategories } from "@/lib/getCategories";

function mapProduct(product: DatabaseProduct): Product {
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
    images: product.images ?? (product.image_url ? [product.image_url] : []),
    imageSource: product.image_source,
  };
}

export default function HomeCatalog({
  query,
}: {
  query?: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const timer = window.setTimeout(() => {
      void Promise.all([getProducts(), getCategories()])
        .then(([databaseProducts, categories]) => {
          if (!active) return;

          const nextCategoryMap: Record<string, string> = {};

          categories.forEach((category) => {
            nextCategoryMap[String(category.id)] = category.name;
          });

          setCategoryMap(nextCategoryMap);
          setProducts(databaseProducts.map(mapProduct));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Unable to load homepage catalogue:", error);

          if (active) {
            setProducts([]);
            setLoading(false);
          }
        });
    }, 0);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    if (!query?.trim()) {
      return products;
    }

    const q = query.toLowerCase().trim();

    return products.filter((product) =>
      [
        product.name,
        product.summary,
        categoryMap[product.categoryId] ?? product.categoryId,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [categoryMap, products, query]);

  return (
    <section className="py-10">
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 dark:bg-red-900 dark:text-red-300">
            🔥 Trending Now
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900 dark:text-white">
            Product Catalogue
          </h2>

          <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
            Browse products with catalogue data, community ratings and AI analysis where available.
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-indigo-600 px-6 font-semibold text-white transition hover:bg-indigo-700"
        >
          View All Products
        </Link>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center text-gray-500 dark:border-zinc-800 dark:bg-zinc-900">
          Loading products...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500 dark:border-zinc-700 dark:bg-zinc-900">
          No products found.
        </div>
      ) : (
        <ProductGallery
          products={filteredProducts}
          categoryMap={categoryMap}
        />
      )}

      <div className="mt-12 rounded-2xl border border-dashed border-gray-300 bg-white p-6 text-sm text-gray-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-gray-400">
        Ratings, AI scores and review counts are shown from the current catalogue and community data available to Insightful Reviews.
      </div>
    </section>
  );
}
