import React from "react";
import ProductCard from "./ProductCard";

const trending = [
  { title: 'Aurora X2 Pro', subtitle: 'Flagship smartphone — excellent camera', price: '$999', rating: 5 },
  { title: 'Breeze 14', subtitle: 'Lightweight laptop with long battery', price: '$799', rating: 4 },
  { title: 'Vista QLED 55"', subtitle: 'Outstanding HDR and color', price: '$1199', rating: 4 },
  { title: 'HomeCool 3000', subtitle: 'Quiet and efficient dishwasher', price: '$499', rating: 4 },
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
          <ProductCard key={p.title} title={p.title} subtitle={p.subtitle} price={p.price} rating={p.rating} />
        ))}
      </div>
    </section>
  );
}
