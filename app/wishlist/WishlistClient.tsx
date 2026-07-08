"use client";
import React from 'react';
import { useWishlist } from '@/components/WishlistContext';
import productsData from '@/data/products.json';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/types/models';

export default function WishlistClient() {
  const { items, clear } = useWishlist();
  const products = productsData as unknown as Product[];
  const selected = items.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[];

  if (selected.length === 0) {
    return (
      <div className="container py-12">
        <h1 className="text-2xl font-semibold">Your Wishlist</h1>
        <p className="mt-4 text-sm text-gray-600 dark:text-zinc-300">You haven't added any favorites yet.</p>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your Wishlist</h1>
        <div>
          <button onClick={() => clear()} className="px-3 py-1 rounded-md border">Clear</button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {selected.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
