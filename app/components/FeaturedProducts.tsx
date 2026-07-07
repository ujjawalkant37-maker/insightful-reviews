import React from "react";

const products = [
  { title: "Aurora X2 Pro", subtitle: "Flagship smartphone — excellent camera", price: "$999", rating: 5 },
  { title: "Breeze 14", subtitle: "Lightweight laptop with long battery", price: "$799", rating: 4 },
  { title: "Vista QLED 55\"", subtitle: "Outstanding HDR and color", price: "$1199", rating: 4 },
  { title: "HomeCool 3000", subtitle: "Quiet and efficient dishwasher", price: "$499", rating: 4 },
];

function ProductCard({ title, subtitle, price, rating }: { title: string; subtitle: string; price: string; rating: number }) {
  return (
    <div className="rounded-md border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-zinc-50">{title}</h4>
          <p className="mt-1 text-xs text-gray-600 dark:text-zinc-300">{subtitle}</p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900 dark:text-zinc-50">{price}</div>
          <div className="mt-1 text-xs text-yellow-500">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  return (
    <section id="trending" className="container py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-zinc-50">Trending Products</h2>
        <a href="#trending" className="text-sm text-indigo-600">See all</a>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.title} {...product} />
        ))}
      </div>
    </section>
  );
}
