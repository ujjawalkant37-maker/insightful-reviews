import React from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from '@/types/models';

const trending: Product[] = [
  { id: 'aurora-x2-pro', slug: 'aurora-x2-pro', name: 'Aurora X2 Pro', categoryId: 'smartphones', price: '$999', rating: 5, aiScore: 94, summary: 'Flagship smartphone — excellent camera', specs: {}, images: [] },
  { id: 'breeze-14', slug: 'breeze-14', name: 'Breeze 14', categoryId: 'laptops', price: '$799', rating: 4, aiScore: 89, summary: 'Lightweight laptop with long battery', specs: {}, images: [] },
  { id: 'vista-qled-55', slug: 'vista-qled-55', name: 'Vista QLED 55"', categoryId: 'tvs', price: '$1199', rating: 4, aiScore: 92, summary: 'Outstanding HDR and color', specs: {}, images: [] },
  { id: 'homecool-3000', slug: 'homecool-3000', name: 'HomeCool 3000', categoryId: 'appliances', price: '$499', rating: 4, aiScore: 88, summary: 'Quiet and efficient dishwasher', specs: {}, images: [] },
];

export default function Trending() {
  return (
    <section id="trending" className="container py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-zinc-50">Trending Products</h2>
        <a href="#trending" className="text-sm text-indigo-600">See all</a>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {trending.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
