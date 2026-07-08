import React from 'react';
import CompareClient from './CompareClient';

export default function ComparePage() {
  return (
    <React.Suspense fallback={
      <div className="container py-12">
        <h1 className="text-2xl font-semibold">Compare Products</h1>
        <p className="mt-4 text-sm text-gray-600 dark:text-zinc-300">Loading comparison…</p>
      </div>
    }>
      <CompareClient />
    </React.Suspense>
  );
}
