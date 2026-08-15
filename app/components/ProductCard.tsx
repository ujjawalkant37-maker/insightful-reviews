"use client";

import React from "react";
import Link from "next/link";
import type { Product } from "@/types/models";
import { useCompare } from "./useCompare";
import WishlistButton from "./WishlistButton";
import ProductImage from "./ProductImage";

function createProductSlug(product: Product): string {
  if (product.slug?.trim()) {
    return product.slug.trim().toLowerCase();
  }

  return product.name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProductCard({ product }: { product?: Product }) {
  const { isCompared, toggleCompare } = useCompare();

  if (!product) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        Product unavailable
      </div>
    );
  }

  const compared = isCompared(product.id);
  const productUrl = `/products/${createProductSlug(product)}`;
  const rating = Math.min(5, Math.max(0, Number(product.rating) || 0));
  const aiScore = Math.min(100, Math.max(0, Number(product.aiScore) || 0));

  return (
    <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
      <Link href={productUrl}>
        <div className="relative h-60 overflow-hidden bg-gray-100 dark:bg-zinc-800">
          <ProductImage
            src={product.images?.[0]}
            alt={product.name}
            slug={product.slug}
            imageSource={product.imageSource}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute left-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white">
            AI {aiScore}
          </div>

          <div className="absolute right-3 top-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-black">
            ★ {rating.toFixed(1)}
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-600">
          {product.categoryId}
        </div>

        <Link href={productUrl}>
          <h3 className="line-clamp-2 text-xl font-bold text-gray-900 transition group-hover:text-indigo-600 dark:text-white">
            {product.name}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
          {product.summary}
        </p>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span>AI Trust Score</span>
            <span className="font-bold">{aiScore}/100</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-zinc-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
              style={{ width: `${aiScore}%` }}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Price</div>
            <div className="text-2xl font-bold text-indigo-600">
              {product.price}
            </div>
          </div>

          <div className="text-lg text-yellow-500" aria-label={`${rating} out of 5 stars`}>
            {"★".repeat(Math.round(rating))}
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            href={productUrl}
            className="flex-1 rounded-xl bg-indigo-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-indigo-700"
          >
            View Details
          </Link>

          <WishlistButton id={product.id} />
        </div>

        <button
          type="button"
          onClick={() => toggleCompare(product.id)}
          className={`mt-3 w-full rounded-xl px-4 py-3 font-semibold transition ${
            compared
              ? "bg-green-600 text-white"
              : "border border-gray-300 bg-white hover:bg-gray-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          }`}
        >
          {compared ? "✓ Added to Compare" : "Compare Product"}
        </button>

        {product.buyUrl && (
          <a
            href={product.buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block rounded-xl bg-orange-500 px-4 py-3 text-center font-semibold text-white transition hover:bg-orange-600"
          >
            Buy Now
          </a>
        )}
      </div>
    </div>
  );
}
