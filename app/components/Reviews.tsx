"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import reviewsData from "@/data/reviews.json";
import ReviewCard from "./ReviewCard";
import type { Review } from "@/types/models";

type SortKey =
  | "most-recent"
  | "highest"
  | "lowest";

export default function Reviews({
  productId,
}: {
  productId: string;
}) {
  const reviews =
    reviewsData as unknown as Review[];

  const [sortKey, setSortKey] =
    useState<SortKey>("most-recent");

  const filtered = useMemo(
    () =>
      reviews.filter(
        (review) =>
          review.productId === productId
      ),
    [reviews, productId]
  );

  const sorted = useMemo(() => {
    const copy = [...filtered];

    switch (sortKey) {
      case "highest":
        copy.sort(
          (a, b) => b.rating - a.rating
        );
        break;

      case "lowest":
        copy.sort(
          (a, b) => a.rating - b.rating
        );
        break;

      default:
        copy.sort(
          (a, b) =>
            +new Date(b.date) -
            +new Date(a.date)
        );
    }

    return copy;
  }, [filtered, sortKey]);

  const average =
    filtered.length === 0
      ? 0
      : filtered.reduce(
          (sum, review) =>
            sum + review.rating,
          0
        ) / filtered.length;

  return (
    <section className="mt-12 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            ⭐ Community Reviews
          </span>

          <h2 className="mt-5 text-3xl font-bold">
            Verified User Reviews
          </h2>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Real experiences from verified
            users and product owners.
          </p>

        </div>

        <Link
          href="/write-review"
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          Write Review
        </Link>

      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-4">

        {/* Summary */}

        <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 p-6 text-white">

          <div className="text-6xl font-bold">
            {average
              ? average.toFixed(1)
              : "—"}
          </div>

          <div className="mt-2 text-indigo-100">
            Average Rating
          </div>

          <div className="mt-4 text-2xl">
            {"★".repeat(
              Math.round(average)
            )}
          </div>

          <div className="mt-6 border-t border-white/20 pt-6">

            <div className="text-3xl font-bold">
              {filtered.length}
            </div>

            <div className="text-indigo-100">
              Total Reviews
            </div>

          </div>

        </div>

        {/* Reviews */}

        <div className="lg:col-span-3">

          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

            <div className="font-semibold">
              Showing {sorted.length} Review
              {sorted.length !== 1 && "s"}
            </div>

            <select
              value={sortKey}
              onChange={(e) =>
                setSortKey(
                  e.target
                    .value as SortKey
                )
              }
              className="rounded-xl border border-gray-300 px-4 py-2 dark:border-zinc-700 dark:bg-zinc-900"
            >
              <option value="most-recent">
                Most Recent
              </option>

              <option value="highest">
                Highest Rating
              </option>

              <option value="lowest">
                Lowest Rating
              </option>

            </select>

          </div>

          {sorted.length === 0 ? (

            <div className="rounded-2xl border border-dashed border-gray-300 p-12 text-center">

              <div className="text-5xl">
                ⭐
              </div>

              <h3 className="mt-5 text-2xl font-bold">
                No Reviews Yet
              </h3>

              <p className="mt-3 text-gray-500">
                Become the first user to
                share your experience.
              </p>

              <Link
                href="/write-review"
                className="mt-8 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white"
              >
                Write First Review
              </Link>

            </div>

          ) : (

            <div className="space-y-8">

              {sorted.map((review) => (

                <div
                  key={review.id}
                  className="rounded-2xl border border-gray-200 p-6 shadow-sm dark:border-zinc-800"
                >
                  <ReviewCard
                    review={review}
                  />
                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </section>
  );
}