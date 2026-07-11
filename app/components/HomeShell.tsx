"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import HeroSection from "./HeroSection";
import FeaturedCategories from "./FeaturedCategories";
import HomeCatalog from "./HomeCatalog";
import FeaturedProducts from "./FeaturedProducts";
import ExpertReviews from "./ExpertReviews";
import UserReviews from "./UserReviews";
import CTA from "./CTA";
import WriteReviewButton from "@/components/WriteReviewButton";

export default function HomeShell() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(search: string) {
    const trimmed = search.trim();

    if (!trimmed) return;

    router.push(`/products?search=${encodeURIComponent(trimmed)}`);
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950">

      {/* Hero */}
      <HeroSection
        value={query}
        onChange={setQuery}
        onSearch={handleSearch}
      />

      {/* Categories */}
      <section className="container py-12">
        <FeaturedCategories />
      </section>

      {/* Trending Products */}
      <section className="container py-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              🔥 Trending Products
            </h2>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Most searched and highest-rated products this week.
            </p>
          </div>
        </div>

        <HomeCatalog query={query} />
      </section>

      {/* Editor's Picks */}
      <section className="container py-12">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">
            ⭐ Editor's Choice
          </h2>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Products recommended after expert analysis.
          </p>
        </div>

        <FeaturedProducts />
      </section>

      {/* Expert Reviews */}
      <section className="container py-12">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">
            🧠 Latest Expert Reviews
          </h2>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Professional opinions from industry experts.
          </p>
        </div>

        <ExpertReviews />
      </section>

      {/* User Reviews */}
      <section className="container py-12">
        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-3xl font-bold">
              💬 Latest User Reviews
            </h2>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Genuine experiences shared by verified users.
            </p>
          </div>

          <WriteReviewButton />
        </div>

        <UserReviews />
      </section>

      {/* Why Trust Us */}
      <section className="container py-16">
        <div className="rounded-2xl bg-white p-10 shadow-sm dark:bg-zinc-900">

          <h2 className="text-center text-3xl font-bold">
            Why Choose Insightful Reviews?
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-4">

            <div className="text-center">
              <div className="text-5xl">🤖</div>

              <h3 className="mt-4 font-semibold">
                AI Summary
              </h3>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Instant product summaries powered by AI.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl">📊</div>

              <h3 className="mt-4 font-semibold">
                Trust Score
              </h3>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                AI calculates product reliability using reviews.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl">⚖️</div>

              <h3 className="mt-4 font-semibold">
                Compare Products
              </h3>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Side-by-side comparison with AI recommendations.
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl">🛡️</div>

              <h3 className="mt-4 font-semibold">
                Fake Review Detection
              </h3>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Helping users identify suspicious reviews.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA />

    </main>
  );
}