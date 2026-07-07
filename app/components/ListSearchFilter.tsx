"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ListSearchFilter({ categories }: { categories: { id: string; name: string }[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const initialQ = params.get('q') ?? '';
  const initialCategory = params.get('category') ?? '';
  const [q, setQ] = useState(initialQ);
  const [category, setCategory] = useState(initialCategory);

  function apply() {
    const search = new URLSearchParams();
    if (q) search.set('q', q);
    if (category) search.set('category', category);
    const query = search.toString();
    router.push(`/products${query ? `?${query}` : ''}`);
  }

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" className="rounded-l-md border border-gray-200 px-3 py-2" />
        <button onClick={apply} className="rounded-r-md bg-indigo-600 px-3 py-2 text-white">Search</button>
      </div>

      <div className="flex items-center gap-2">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-gray-200 rounded px-3 py-2">
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button onClick={() => { setQ(''); setCategory(''); router.push('/products'); }} className="text-sm text-gray-600">Clear</button>
      </div>
    </div>
  );
}
