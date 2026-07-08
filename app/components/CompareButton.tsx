"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import useCompare from './useCompare';
import productsData from '@/data/products.json';
import type { Product } from '@/types/models';

const products = productsData as unknown as Product[];

export default function CompareButton({ id, slug }: { id: string; slug: string }) {
  const router = useRouter();
  const { compareIds, add, isCompared } = useCompare();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    const already = isCompared(id);
    if (!already && compareIds.length >= 5) {
      try {
        window.alert('You already have 5 products selected for comparison. Remove one to add another.');
      } catch (err) {
        // ignore
      }
      return;
    }

    // ensure the clicked product is in the compare list
    if (!already) add(id);

    // build slugs list from stored compare ids plus this one (deduped)
    const combinedIds = Array.from(new Set([...compareIds, id]));
    const slugs = combinedIds
      .map((pid) => products.find((p) => p.id === pid)?.slug)
      .filter(Boolean) as string[];

    const q = new URLSearchParams();
    if (slugs.length) q.set('products', slugs.join(','));

    router.push(`/compare?${q.toString()}`);
  };

  return (
    <button
      onClick={handleClick}
      className="flex-1 text-center px-4 py-2 rounded-md border border-gray-200"
      aria-pressed={isCompared(id)}
    >
      Compare
    </button>
  );
}
