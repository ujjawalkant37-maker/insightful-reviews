"use client";

import React from "react";
import Link from "next/link";
import { useWishlist } from "@/components/WishlistContext";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products.json";
import type { Product } from "@/types/models";

export default function WishlistClient() {
  const { items, clear } = useWishlist();

  const products = productsData as Product[];

  const selected = products.filter((product) =>
    items.includes(product.id)
  );

  if (selected.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-zinc-950">

        <div className="container mx-auto px-4 py-16">

          <div className="mx-auto max-w-2xl rounded-3xl border bg-white p-12 text-center shadow dark:border-zinc-800 dark:bg-zinc-900">

            <div className="text-8xl">
              ❤️
            </div>

            <h1 className="mt-6 text-4xl font-bold">
              Your Wishlist is Empty
            </h1>

            <p className="mt-4 text-lg text-gray-500">
              Save products you love and compare them
              later before making your purchase.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-block rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white transition hover:bg-indigo-700"
            >
              Explore Products
            </Link>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950">

      <div className="container mx-auto px-4 py-10">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
              ❤️ Saved Products
            </span>

            <h1 className="mt-5 text-4xl font-bold">
              My Wishlist
            </h1>

            <p className="mt-3 text-gray-500">
              {selected.length} product
              {selected.length > 1 ? "s" : ""} saved for later.
            </p>

          </div>

          <div className="flex gap-3">

            <Link
              href="/products"
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Continue Shopping
            </Link>

            <button
              onClick={() => clear()}
              className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Clear Wishlist
            </button>

          </div>

        </div>

        {/* Statistics */}

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow dark:bg-zinc-900">

            <div className="text-sm text-gray-500">
              Saved Products
            </div>

            <div className="mt-3 text-4xl font-bold text-indigo-600">
              {selected.length}
            </div>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow dark:bg-zinc-900">

            <div className="text-sm text-gray-500">
              Wishlist Status
            </div>

            <div className="mt-3 text-2xl font-bold text-green-600">
              Active
            </div>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow dark:bg-zinc-900">

            <div className="text-sm text-gray-500">
              Ready to Compare
            </div>

            <div className="mt-3 text-2xl font-bold text-orange-600">
              Yes
            </div>

          </div>

        </div>

        {/* Products */}

        <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">

          {selected.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </div>

    </main>
  );
}