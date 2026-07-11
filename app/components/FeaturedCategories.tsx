import React from "react";
import Link from "next/link";

const categories = [
  {
    id: "smartphones",
    title: "Smartphones",
    emoji: "📱",
    count: "120+ Products",
    desc: "AI-powered smartphone reviews, comparisons and buying guides.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "laptops",
    title: "Laptops",
    emoji: "💻",
    count: "80+ Products",
    desc: "Performance, gaming, battery life and productivity analysis.",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "tvs",
    title: "Smart TVs",
    emoji: "📺",
    count: "60+ Products",
    desc: "OLED, QLED, Mini LED and smart TV comparisons.",
    color: "from-red-500 to-orange-500",
  },
  {
    id: "appliances",
    title: "Home Appliances",
    emoji: "🏠",
    count: "90+ Products",
    desc: "Reliable reviews for refrigerators, washing machines and ACs.",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "audio",
    title: "Audio",
    emoji: "🎧",
    count: "70+ Products",
    desc: "Headphones, earbuds, speakers and premium sound systems.",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "wearables",
    title: "Smart Watches",
    emoji: "⌚",
    count: "55+ Products",
    desc: "Fitness tracking, battery life and smartwatch comparisons.",
    color: "from-cyan-500 to-blue-600",
  },
];

export default function FeaturedCategories() {
  return (
    <section
      id="categories"
      className="container py-16"
    >
      <div className="text-center">

        <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
          Browse Categories
        </span>

        <h2 className="mt-5 text-4xl font-bold text-gray-900 dark:text-white">
          Explore Product Categories
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-gray-600 dark:text-gray-400">
          Browse products across multiple categories with
          AI-powered reviews, expert recommendations,
          price tracking and genuine user experiences.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {categories.map((category) => (

          <Link
            key={category.id}
            href={`/products?category=${category.id}`}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          >

            <div
              className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${category.color}`}
            />

            <div className="flex items-center justify-between">

              <div className="text-6xl">
                {category.emoji}
              </div>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-zinc-800 dark:text-zinc-300">
                {category.count}
              </span>

            </div>

            <h3 className="mt-6 text-2xl font-bold text-gray-900 transition group-hover:text-indigo-600 dark:text-white">
              {category.title}
            </h3>

            <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
              {category.desc}
            </p>

            <div className="mt-8 flex items-center justify-between">

              <span className="text-sm font-semibold text-indigo-600">
                Explore Category
              </span>

              <span className="text-2xl transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>

            </div>

          </Link>

        ))}

      </div>

      <div className="mt-16 rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-10 text-center text-white shadow-xl">

        <h3 className="text-3xl font-bold">
          Can't Decide What to Buy?
        </h3>

        <p className="mx-auto mt-4 max-w-2xl text-blue-100">
          Use our AI Decision Engine to compare products,
          analyse expert opinions,
          read verified reviews and discover whether you should
          Buy, Wait or Avoid.
        </p>

        <Link
          href="/products"
          className="mt-8 inline-flex rounded-xl bg-white px-8 py-4 font-bold text-indigo-700 transition hover:scale-105"
        >
          Explore All Products
        </Link>

      </div>

    </section>
  );
}