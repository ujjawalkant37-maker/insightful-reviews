"use client";

import React from "react";
import type { Product } from "@/types/models";
import { useCompare } from "./useCompare";
import ProductImage from "./ProductImage";

function StarRating({ rating }: { rating: number }) {
  const safe = Math.min(5, Math.max(0, Math.round(Number(rating) || 0)));
  return (
    <span className="text-yellow-500" aria-label={`${safe} out of 5 stars`}>
      {"★".repeat(safe)}
      {"☆".repeat(5 - safe)}
    </span>
  );
}

export default function ProductGallery({
  products,
  categoryMap,
}: {
  products: Product[];
  categoryMap: Record<string, string>;
}) {
  const { add, isCompared } = useCompare();

  return (
    <section className="container py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-zinc-50">
            Product catalog
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-zinc-300">
            Browse products and compare the available catalogue information.
          </p>
        </div>
        <div className="text-sm text-gray-600 dark:text-zinc-300">
          {products.length} products
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product, index) => (
          <article
            key={product.id}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 dark:bg-zinc-800">
              <ProductImage
                src={product.images?.[0]}
                alt={product.name}
                slug={product.slug}
                imageSource={product.imageSource}
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="h-full w-full object-cover"
                priority={index === 0}
              />
            </div>

            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-600">
                  {categoryMap[product.categoryId] ?? product.categoryId}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-zinc-50">
                  {product.name}
                </h3>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900 dark:text-zinc-50">
                  {product.price}
                </p>
                <p className="text-xs text-gray-500 dark:text-zinc-400">
                  AI score {product.aiScore}/100
                </p>
              </div>
            </div>

            <div className="mt-3 line-clamp-3 text-sm text-gray-600 dark:text-zinc-300">
              {product.summary}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 text-sm">
              <StarRating rating={product.rating} />
              <a
                href={`/products/${product.slug}`}
                className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
              >
                View Details
              </a>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={() => add(product.id)}
                disabled={isCompared(product.id)}
                className={`w-full rounded-md px-4 py-2 text-sm ${
                  isCompared(product.id)
                    ? "border border-green-600 bg-green-600 text-white"
                    : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:bg-zinc-900 dark:text-zinc-200"
                }`}
              >
                {isCompared(product.id) ? "Added to compare" : "Add to compare"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
