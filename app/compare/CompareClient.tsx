"use client";
import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import productsData from '@/data/products.json';
import { useCompare } from '@/components/useCompare';
import type { Product } from '@/types/models';
import Link from 'next/link';

const products = productsData as unknown as Product[];

function parsePrice(price?: string) {
  if (!price) return Number.POSITIVE_INFINITY;
  const n = price.replace(/[^0-9.\-]/g, '');
  const parsed = parseFloat(n);
  return Number.isFinite(parsed) ? parsed : Number.POSITIVE_INFINITY;
}

export default function CompareClient() {
  const searchParams = useSearchParams();
  const { compareIds, remove, clear, merge } = useCompare();

  const querySlugs = useMemo(() => {
    const raw = searchParams.get('products') ?? '';
    return raw.split(',').map((slug) => slug.trim()).filter(Boolean);
  }, [searchParams]);

  const queryIds = useMemo(() => {
    return Array.from(new Set(querySlugs.map((slug) => products.find((p) => p.slug === slug)?.id).filter(Boolean) as string[]));
  }, [querySlugs]);

  useEffect(() => {
    if (queryIds.length === 0) return;
    merge(queryIds);
  }, [queryIds, merge]);

  const selectedIds = useMemo(() => Array.from(new Set([...compareIds, ...queryIds])), [compareIds, queryIds]);
  const selected = selectedIds.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];

  if (selected.length === 0) {
    return (
      <div className="container py-12">
        <h1 className="text-2xl font-semibold">Compare Products</h1>
        <p className="mt-4 text-sm text-gray-600 dark:text-zinc-300">No products selected. Browse products to add up to 5 items for comparison.</p>
        <div className="mt-4">
          <Link href="/products" className="px-4 py-2 rounded-md bg-indigo-600 text-white">Browse products</Link>
        </div>
      </div>
    );
  }

  // gather all spec keys
  const specKeys = Array.from(new Set(selected.flatMap((p) => Object.keys(p.specs ?? {}))));

  // determine best value (lowest price)
  const prices = selected.map((p) => parsePrice(p.price));
  const minPrice = Math.min(...prices);

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Compare Products</h1>
        <div className="flex gap-2">
          <button onClick={() => clear()} className="px-3 py-1 rounded-md border">Clear</button>
          <Link href="/products" className="px-3 py-1 rounded-md bg-indigo-600 text-white">Add more</Link>
        </div>
      </div>

      <div className="mt-6 overflow-auto">
        <div className="min-w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {selected.map((p) => (
              <div key={p.id} className="rounded-md border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-50">{p.name}</h3>
                    <p className="mt-1 text-xs text-gray-600 dark:text-zinc-300">{p.summary}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${parsePrice(p.price) === minPrice ? 'text-green-700 dark:text-green-400' : 'text-gray-900 dark:text-zinc-50'}`}>{p.price}</div>
                    <div className="mt-1 text-xs text-yellow-500">{'★'.repeat(Math.round(p.rating))}{'☆'.repeat(5 - Math.round(p.rating))}</div>
                  </div>
                </div>

                <div className="mt-3 text-sm text-gray-600 dark:text-zinc-300">AI score: <span className="font-medium">{p.aiScore}%</span></div>

                <div className="mt-4 flex gap-2">
                  <Link href={`/products/${p.slug}`} className="px-3 py-1 rounded-md border">View</Link>
                  <button onClick={() => remove(p.id)} className="px-3 py-1 rounded-md border text-sm">Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium">Specifications</h3>
            <div className="mt-2 overflow-auto">
              <table className="min-w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="px-3 py-2 text-sm text-gray-600 dark:text-zinc-300">Spec</th>
                    {selected.map((p) => (
                      <th key={p.id} className="px-3 py-2 text-sm text-gray-600 dark:text-zinc-300">{p.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {specKeys.map((k) => (
                    <tr key={k} className="border-t">
                      <td className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-zinc-300">{k}</td>
                      {selected.map((p) => (
                        <td key={p.id + k} className={`px-3 py-2 text-sm ${p.specs?.[k] ? 'text-gray-900 dark:text-zinc-50' : 'text-gray-500 dark:text-zinc-400'}`}>{p.specs?.[k] ?? '—'}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
