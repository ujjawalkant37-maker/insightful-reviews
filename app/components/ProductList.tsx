import React from 'react';
import type { Product } from '../../types/models';
import ProductCard from './ProductCard';

export default function ProductList({ products }: { products: Product[] }) {
  if (!products.length) {
    return <div className="text-gray-600 dark:text-zinc-300">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
