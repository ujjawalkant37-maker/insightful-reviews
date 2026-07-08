"use client";
import React, { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function setParam(params: URLSearchParams, key: string, value?: string | null) {
  if (value === undefined || value === null || value === '') {
    params.delete(key);
  } else {
    params.set(key, value);
  }
}

export default function ProductFilters({ categories }: { categories: { id: string; name: string }[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = useMemo(() => new URLSearchParams(searchParams?.toString() ?? ''), [searchParams]);

  const [localSearch, setLocalSearch] = useState(params.get('search') ?? '');
  const [localPriceMin, setLocalPriceMin] = useState(params.get('priceMin') ?? '');
  const [localPriceMax, setLocalPriceMax] = useState(params.get('priceMax') ?? '');

  const apply = (updates: Record<string, string | undefined | null>) => {
    const next = new URLSearchParams(params.toString());
    Object.entries(updates).forEach(([k, v]) => setParam(next, k, v));
    router.replace(`${pathname}?${next.toString()}`);
  };

  const clearAll = () => {
    const next = new URLSearchParams(params.toString());
    ['category', 'search', 'priceMin', 'priceMax', 'aiMin', 'minRating', 'sort'].forEach((k) => next.delete(k));
    setLocalSearch('');
    setLocalPriceMin('');
    setLocalPriceMax('');
    router.replace(`${pathname}?${next.toString()}`);
  };

  const removeFilter = (key: string) => {
    const next = new URLSearchParams(params.toString());
    next.delete(key);
    router.replace(`${pathname}?${next.toString()}`);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <form
            onSubmit={(e) => { e.preventDefault(); apply({ search: localSearch || undefined }); }}
            className="flex items-center gap-1"
          >
            <input
              type="text"
              placeholder="Search products…"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="rounded-l-md border p-2 bg-white dark:bg-zinc-900 text-sm w-40"
            />
            <button type="submit" className="rounded-r-md bg-indigo-600 px-3 py-2 text-white text-sm hover:bg-indigo-700">Search</button>
          </form>
          <select
            value={params.get('category') ?? ''}
            onChange={(e) => apply({ category: e.target.value || undefined })}
            className="rounded-md border p-2 bg-white dark:bg-zinc-900 text-sm"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Min $"
            value={localPriceMin}
            onChange={(e) => setLocalPriceMin(e.target.value)}
            onBlur={() => apply({ priceMin: localPriceMin || undefined })}
            className="rounded-md border p-2 w-24 bg-white dark:bg-zinc-900 text-sm"
          />
          <input
            type="number"
            placeholder="Max $"
            value={localPriceMax}
            onChange={(e) => setLocalPriceMax(e.target.value)}
            onBlur={() => apply({ priceMax: localPriceMax || undefined })}
            className="rounded-md border p-2 w-24 bg-white dark:bg-zinc-900 text-sm"
          />

          <input
            type="number"
            placeholder="Min AI %"
            value={params.get('aiMin') ?? ''}
            onChange={(e) => apply({ aiMin: e.target.value || undefined })}
            className="rounded-md border p-2 w-28 bg-white dark:bg-zinc-900 text-sm"
          />

          <select
            value={params.get('minRating') ?? ''}
            onChange={(e) => apply({ minRating: e.target.value || undefined })}
            className="rounded-md border p-2 bg-white dark:bg-zinc-900 text-sm"
          >
            <option value="">Any rating</option>
            <option value="1">1★+</option>
            <option value="2">2★+</option>
            <option value="3">3★+</option>
            <option value="4">4★+</option>
            <option value="5">5★</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={params.get('sort') ?? ''}
            onChange={(e) => apply({ sort: e.target.value || undefined })}
            className="rounded-md border p-2 bg-white dark:bg-zinc-900 text-sm"
          >
            <option value="">Sort</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="highest_rated">Highest Rated</option>
            <option value="highest_ai">Highest AI Score</option>
            <option value="newest">Newest</option>
          </select>

          <button onClick={clearAll} className="text-sm px-3 py-1 rounded-md border">Clear All Filters</button>
        </div>
      </div>

      {/* active chips */}
      <div className="mt-3 flex items-center gap-2 flex-wrap">
        {Array.from(params.entries()).map(([k, v]) => {
          if (!['category','search','priceMin','priceMax','aiMin','minRating'].includes(k)) return null;
          return (
            <div key={k} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-sm">
              <span className="font-medium">{k}:</span>
              <span>{v}</span>
              <button onClick={() => removeFilter(k)} className="ml-2 text-xs">✕</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
