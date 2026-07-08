"use client";
import React from "react";
import Link from "next/link";
import type { Product } from '@/types/models';
import { useCompare } from './useCompare';

export default function ProductCard({ product }: { product?: Product }) {
  if (!product) {
    return (
      <div className="rounded-md border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
        <div className="text-sm text-gray-600 dark:text-zinc-300">Product data unavailable</div>
      </div>
    );
  }

  const { isCompared, toggleCompare } = useCompare();

  return (
    <div className="block">
      <Link href={`/products/${product.slug}`} className="no-underline">
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
      </Link>

      <div className="mt-2 flex items-center gap-2">
        <button
          onClick={() => toggleCompare(product.id)}
          className={`text-sm px-3 py-1 rounded-md border ${isCompared(product.id) ? 'bg-green-600 text-white border-green-600' : 'bg-white dark:bg-zinc-900 text-gray-700 dark:text-zinc-200'}`}
        >
          {isCompared(product.id) ? 'Remove from compare' : 'Add to compare'}
        </button>
      </div>
    </div>
  );
}
