import React from "react";
import Link from "next/link";
import type { Product } from '@/types/models';

export default function ProductCard({ product }: { product?: Product }) {
  if (!product) {
    return (
      <div className="rounded-md border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
        <div className="text-sm text-gray-600 dark:text-zinc-300">Product data unavailable</div>
      </div>
    );
  }

  return (
    <a href={`/products/${product.slug}`} className="block">
      <div className="rounded-md border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 hover:shadow transition">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-zinc-50">{product.name}</h4>
            <p className="mt-1 text-xs text-gray-600 dark:text-zinc-300">{product.summary}</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900 dark:text-zinc-50">{product.price}</div>
            <div className="mt-1 text-xs text-yellow-500">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</div>
          </div>
        </div>
      </div>
    </a>
  );
}
