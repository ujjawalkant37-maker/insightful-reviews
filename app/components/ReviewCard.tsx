import React from "react";

export default function ReviewCard({ author, title, snippet, rating }: { author: string; title: string; snippet: string; rating: number; }) {
  return (
    <article className="rounded-md border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-zinc-50">{title}</h4>
          <p className="mt-1 text-xs text-gray-600 dark:text-zinc-300">by {author}</p>
        </div>
        <div className="text-yellow-500">{'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}</div>
      </div>
      <p className="mt-3 text-sm text-gray-600 dark:text-zinc-300">{snippet}</p>
    </article>
  );
}
