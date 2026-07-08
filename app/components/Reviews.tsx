"use client";
import React, { useMemo, useState } from 'react';
import reviewsData from '@/data/reviews.json';
import ReviewCard from './ReviewCard';
import type { Review } from '@/types/models';

type SortKey = 'most-recent' | 'highest' | 'lowest';

export default function Reviews({ productId }: { productId: string }) {
  const all = reviewsData as unknown as Review[];
  const initial = useMemo(() => all.filter((r) => r.productId === productId), [all, productId]);
  const [sortKey, setSortKey] = useState<SortKey>('most-recent');

  const sorted = useMemo(() => {
    const copy = [...initial];
    if (sortKey === 'highest') {
      copy.sort((a, b) => b.rating - a.rating || +new Date(b.date) - +new Date(a.date));
    } else if (sortKey === 'lowest') {
      copy.sort((a, b) => a.rating - b.rating || +new Date(b.date) - +new Date(a.date));
    } else {
      copy.sort((a, b) => +new Date(b.date) - +new Date(a.date));
    }
    return copy;
  }, [initial, sortKey]);

  const total = initial.length;
  const average = total === 0 ? 0 : initial.reduce((s, r) => s + r.rating, 0) / total;

  const distribution = useMemo(() => {
    const counts = [0, 0, 0, 0, 0];
    for (const r of initial) {
      const idx = Math.max(0, Math.min(4, 5 - r.rating));
      counts[idx] += 1;
    }
    return counts; // index 0 => 5★, index 4 => 1★
  }, [initial]);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold">User Reviews</h2>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-zinc-50">{average ? average.toFixed(1) : '—'}</div>
              <div className="text-sm text-gray-600 dark:text-zinc-300">{total} review{total !== 1 ? 's' : ''}</div>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 dark:text-zinc-300">Sort:</label>
              <select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)} className="rounded-md border p-1 bg-white dark:bg-zinc-900">
                <option value="most-recent">Most recent</option>
                <option value="highest">Highest rating</option>
                <option value="lowest">Lowest rating</option>
              </select>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {sorted.length === 0 ? (
              <div className="text-sm text-gray-600 dark:text-zinc-300">No reviews yet. Be the first to write one!</div>
            ) : (
              sorted.map((r) => <ReviewCard key={r.id} review={r} />)
            )}
          </div>
        </div>

        <aside className="rounded-md border border-gray-100 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900">
          <h3 className="text-sm font-medium">Rating distribution</h3>
          <div className="mt-3 space-y-2">
            {[5,4,3,2,1].map((star, idx) => {
              const count = distribution[idx];
              const percent = total === 0 ? 0 : Math.round((count / total) * 100);
              return (
                <div key={star} className="flex items-center gap-2">
                  <div className="w-10 text-sm text-gray-700 dark:text-zinc-300">{star}★</div>
                  <div className="flex-1 bg-gray-100 dark:bg-zinc-800 rounded-full h-3 overflow-hidden">
                    <div className="h-3 bg-yellow-500 rounded-full" style={{ width: `${percent}%` }} />
                  </div>
                  <div className="w-8 text-right text-sm text-gray-600 dark:text-zinc-300">{count}</div>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
