import React from "react";

export default function ProductCard({ title, subtitle, price, rating }: { title: string; subtitle?: string; price?: string; rating?: number; }) {
  return (
    <div className="rounded-md border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-zinc-50">{title}</h4>
          {subtitle && <p className="mt-1 text-xs text-gray-600 dark:text-zinc-300">{subtitle}</p>}
        </div>
        <div className="text-right">
          {price && <div className="text-sm font-medium text-gray-900 dark:text-zinc-50">{price}</div>}
          {rating !== undefined && (
            <div className="mt-1 text-xs text-yellow-500">{'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}</div>
          )}
        </div>
      </div>
    </div>
  );
}
