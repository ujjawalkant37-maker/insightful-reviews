"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/types/models";
import { getProducts } from "@/lib/getProducts";
import { mapDatabaseProduct } from "@/lib/product-utils";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let active = true;
    void getProducts().then((rows) => {
      if (!active) return;
      setProducts(
        [...rows]
          .sort((a, b) => b.ai_score - a.ai_score || b.rating - a.rating)
          .slice(0, 4)
          .map(mapDatabaseProduct),
      );
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="container py-16">
      <div className="mb-10 text-center">
        <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
          Catalogue Highlights
        </span>
        <h2 className="mt-5 text-4xl font-bold text-gray-900 dark:text-white">
          Featured Products
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-gray-600 dark:text-gray-400">
          Products currently scoring highest in the catalogue&apos;s AI decision data. Scores are not presented as expert or user ratings.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-10 text-center text-gray-500">
          Catalogue highlights are temporarily unavailable.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <article key={product.id} className="rounded-2xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                AI score {product.aiScore}/100
              </div>
              <h3 className="mt-4 text-xl font-bold">{product.name}</h3>
              <div className="mt-2 text-amber-500">{"★".repeat(Math.round(product.rating))}</div>
              <div className="mt-4 text-2xl font-bold text-indigo-600">{product.price}</div>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600 dark:text-gray-400">{product.summary}</p>
              <Link href={`/products/${product.slug}`} className="mt-6 block rounded-xl bg-indigo-600 px-4 py-3 text-center font-semibold text-white hover:bg-indigo-700">
                View Details
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
