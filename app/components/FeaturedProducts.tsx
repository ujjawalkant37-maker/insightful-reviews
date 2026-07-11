import React from "react";
import Link from "next/link";

const aiPicks = [
  {
    title: "Samsung Galaxy S25 Ultra",
    badge: "🏆 Editor's Choice",
    verdict: "BUY",
    score: 98,
    rating: 5,
    price: "₹1,29,999",
    desc: "Excellent camera, battery, display and long software support.",
    color: "bg-green-100 text-green-700",
  },
  {
    title: "iPhone 16 Pro",
    badge: "🔥 Premium Pick",
    verdict: "WAIT",
    score: 94,
    rating: 5,
    price: "₹1,19,900",
    desc: "Outstanding performance but expected festive discounts.",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "OnePlus 13",
    badge: "💰 Best Value",
    verdict: "BUY",
    score: 96,
    rating: 5,
    price: "₹69,999",
    desc: "Flagship performance with excellent value for money.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Sony Bravia OLED",
    badge: "🎬 Best TV",
    verdict: "BUY",
    score: 97,
    rating: 5,
    price: "₹1,59,990",
    desc: "Reference-level picture quality for movies and gaming.",
    color: "bg-purple-100 text-purple-700",
  },
];

function Card({
  title,
  badge,
  verdict,
  score,
  rating,
  price,
  desc,
  color,
}: {
  title: string;
  badge: string;
  verdict: string;
  score: number;
  rating: number;
  price: string;
  desc: string;
  color: string;
}) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex items-center justify-between">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${color}`}
        >
          {badge}
        </span>

        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
          AI {score}
        </span>

      </div>

      <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-white">
        {title}
      </h3>

      <div className="mt-2 text-yellow-500 text-lg">
        {"★".repeat(rating)}
      </div>

      <div className="mt-4 text-3xl font-bold text-indigo-600">
        {price}
      </div>

      <p className="mt-4 text-gray-600 dark:text-gray-400">
        {desc}
      </p>

      <div className="mt-6 flex items-center justify-between">

        <span
          className={`rounded-full px-4 py-2 text-sm font-bold ${
            verdict === "BUY"
              ? "bg-green-100 text-green-700"
              : verdict === "WAIT"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {verdict}
        </span>

        <Link
          href="/products"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          View
        </Link>

      </div>
    </div>
  );
}

export default function FeaturedProducts() {
  return (
    <section className="container py-16">

      <div className="mb-10 text-center">

        <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
          AI Recommended
        </span>

        <h2 className="mt-5 text-4xl font-bold text-gray-900 dark:text-white">
          Editor's Choice
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-gray-600 dark:text-gray-400">
          Products carefully selected using AI analysis,
          expert reviews, user ratings,
          reliability and long-term value.
        </p>

      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

        {aiPicks.map((item) => (
          <Card
            key={item.title}
            {...item}
          />
        ))}

      </div>

      <div className="mt-14 rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-10 text-center text-white">

        <h3 className="text-3xl font-bold">
          Let AI Choose the Best Product For You
        </h3>

        <p className="mx-auto mt-4 max-w-2xl text-blue-100">
          Our AI compares thousands of reviews,
          specifications, expert opinions and prices
          to recommend the best product for your budget.
        </p>

        <Link
          href="/products"
          className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-bold text-indigo-700 transition hover:scale-105"
        >
          Explore AI Picks
        </Link>

      </div>

    </section>
  );
}