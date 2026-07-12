"use client";

import { useMemo } from "react";
import Link from "next/link";
import reviewsData from "@/data/reviews.json";
import ReviewCard from "@/components/ReviewCard";
import type { Review } from "@/types/models";
import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function MyReviewsPage() {
  const reviews = useMemo(
    () => reviewsData as Review[],
    []
  );

  const average =
    reviews.length === 0
      ? 0
      : (
          reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / reviews.length
        ).toFixed(1);

  return (
    <ProtectedRoute>

      <main className="min-h-screen bg-slate-50 dark:bg-zinc-950">

        <div className="container mx-auto px-4 py-10">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
                ⭐ Community Contributions
              </span>

              <h1 className="mt-5 text-4xl font-bold">
                My Reviews
              </h1>

              <p className="mt-3 text-gray-500">
                Manage every review you've written.
              </p>

            </div>

            <Link
              href="/write-review"
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              Write New Review
            </Link>

          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-4">

            <div className="rounded-2xl bg-white p-6 shadow dark:bg-zinc-900">

              <div className="text-sm text-gray-500">
                Reviews Written
              </div>

              <div className="mt-3 text-4xl font-bold text-indigo-600">
                {reviews.length}
              </div>

            </div>

            <div className="rounded-2xl bg-white p-6 shadow dark:bg-zinc-900">

              <div className="text-sm text-gray-500">
                Average Rating
              </div>

              <div className="mt-3 text-4xl font-bold text-yellow-500">
                {average}
              </div>

            </div>

            <div className="rounded-2xl bg-white p-6 shadow dark:bg-zinc-900">

              <div className="text-sm text-gray-500">
                Helpful Votes
              </div>

              <div className="mt-3 text-4xl font-bold text-green-600">
                248
              </div>

            </div>

            <div className="rounded-2xl bg-white p-6 shadow dark:bg-zinc-900">

              <div className="text-sm text-gray-500">
                Reviewer Rank
              </div>

              <div className="mt-3 text-4xl font-bold text-red-500">
                Gold
              </div>

            </div>

          </div>

          <div className="mt-12 space-y-8">

            {reviews.length === 0 ? (

              <div className="rounded-2xl border border-dashed bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">

                <div className="text-7xl">
                  ⭐
                </div>

                <h2 className="mt-6 text-3xl font-bold">
                  No Reviews Yet
                </h2>

                <p className="mt-4 text-gray-500">
                  Start helping other buyers by writing your first review.
                </p>

                <Link
                  href="/write-review"
                  className="mt-8 inline-block rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white hover:bg-indigo-700"
                >
                  Write Review
                </Link>

              </div>

            ) : (

              reviews.map((review) => (

                <div
                  key={review.id}
                  className="rounded-2xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >

                  <ReviewCard review={review} />

                  <div className="mt-6 flex flex-wrap gap-3">

                    <button className="rounded-xl bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700">
                      Edit
                    </button>

                    <button className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700">
                      Delete
                    </button>

                    <button className="rounded-xl border px-5 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800">
                      Share
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </main>

    </ProtectedRoute>
  );
}