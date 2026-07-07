import React from "react";

const categories = [
  { id: 'smartphones', title: 'Smartphones', emoji: '📱', desc: 'Comprehensive hands-on analysis for the latest phones.' },
  { id: 'laptops', title: 'Laptops', emoji: '💻', desc: 'Performance, battery life and portability breakdowns.' },
  { id: 'tvs', title: 'TVs', emoji: '📺', desc: 'Picture quality and smart features compared.' },
  { id: 'appliances', title: 'Appliances', emoji: '🔌', desc: 'Durability and energy efficiency reviews.' },
];

export default function Categories() {
  return (
    <section id="categories" className="container py-12">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-zinc-50">Featured Categories</h2>
      <p className="mt-2 text-sm text-gray-600 dark:text-zinc-300">Curated coverage across popular product types.</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <a key={cat.id} href={`#${cat.id}`} className="group block rounded-lg border border-gray-100 dark:border-zinc-800 p-4 hover:shadow-md bg-white dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{cat.emoji}</div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-50">{cat.title}</h3>
                <p className="mt-1 text-xs text-gray-600 dark:text-zinc-300">{cat.desc}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
