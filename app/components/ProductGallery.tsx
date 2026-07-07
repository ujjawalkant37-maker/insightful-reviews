import React from "react";
import type { Product } from '../../types/models';

function StarRating({ rating }: { rating: number }) {
  return <span className="text-yellow-500">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>;
}

export default function ProductGallery({ products, categoryMap }: { products: Product[]; categoryMap: Record<string, string>; }) {
  return (
    <section className="container py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-zinc-50">Product catalog</h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-zinc-300">Search across the catalog and compare recommendations at a glance.</p>
        </div>
        <div className="text-sm text-gray-600 dark:text-zinc-300">{products.length} products</div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="rounded-xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 dark:bg-zinc-800">
              <img src={product.images?.[0] ?? '/placeholder.svg'} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-600">{categoryMap[product.categoryId] ?? product.categoryId}</p>
                <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-zinc-50">{product.name}</h3>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900 dark:text-zinc-50">{product.price}</p>
                <p className="text-xs text-gray-500 dark:text-zinc-400">AI score {product.aiScore}%</p>
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-600 dark:text-zinc-300">{product.summary}</div>
            <div className="mt-4 flex items-center justify-between gap-3 text-sm">
              <StarRating rating={product.rating} />
              <a
                href={`/products/${product.slug}`}
                className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
              >
                View Details
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
