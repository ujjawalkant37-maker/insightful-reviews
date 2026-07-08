import React from 'react';
import type { Review } from '@/types/models';

export default function ReviewCard({ review }: { review: Review }) {
  const date = new Date(review.date).toLocaleDateString();
  return (
    <div className="rounded-md border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold text-gray-900 dark:text-zinc-50">{review.name}</div>
          <div className="mt-1 text-xs text-gray-600 dark:text-zinc-300">{review.title}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
          <div className="mt-1 text-xs text-gray-500 dark:text-zinc-400">{date}</div>
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-700 dark:text-zinc-300">{review.text}</p>
    </div>
  );
}
