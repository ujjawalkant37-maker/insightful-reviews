"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Link from "next/link";
import DatabaseReviewCard from "./DatabaseReviewCard";
import { getReviews, DatabaseReview } from "@/lib/getReviews";

type SortKey = "most-recent" | "highest" | "lowest";

export default function Reviews({
  productId,
}: {
  productId: string;
}) {
  const [reviews, setReviews] = useState<DatabaseReview[]>([]);
  const [loading, setLoading] = useState(true);

  const [sortKey, setSortKey] =
    useState<SortKey>("most-recent");

  const loadReviews = useCallback(async () => {
   const data = await getReviews(Number(productId));

  setReviews(data);

  setLoading(false);
}, [productId]);

useEffect(() => {
  loadReviews();
}, [loadReviews]);

useEffect(() => {
  const interval = setInterval(() => {
    loadReviews();
  }, 5000);

  return () => clearInterval(interval);
}, [loadReviews]);

  const sorted = useMemo(() => {
    const copy = [...reviews];

    switch (sortKey) {
      case "highest":
        copy.sort((a, b) => b.rating - a.rating);
        break;

      case "lowest":
        copy.sort((a, b) => a.rating - b.rating);
        break;

      default:
        copy.sort(
          (a, b) =>
            +new Date(b.created_at) -
            +new Date(a.created_at)
        );
    }

    return copy;
  }, [reviews, sortKey]);

  const average =
    reviews.length === 0
      ? 0
      : reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        ) / reviews.length;

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
            Real experiences from verified users.
          </p>

        </div>

        <Link
          href="/write-review"
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Write Review
        </Link>

      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-4">

        <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 p-6 text-white">

          <div className="text-6xl font-bold">
            {average ? average.toFixed(1) : "—"}
          </div>

          <div className="mt-2 text-indigo-100">
            Average Rating
          </div>

          <div className="mt-4 text-2xl">
            {"★".repeat(Math.round(average))}
          </div>

          <div className="mt-6 border-t border-white/20 pt-6">

            <div className="text-3xl font-bold">
              {reviews.length}
            </div>

            <div className="text-indigo-100">
              Total Reviews
            </div>

          </div>

        </div>

        <div className="lg:col-span-3">

          <div className="mb-8 flex items-center justify-between">

            <div className="font-semibold">
              {reviews.length} Reviews
            </div>

            <select
              value={sortKey}
              onChange={(e) =>
                setSortKey(e.target.value as SortKey)
              }
              className="rounded-xl border px-4 py-2"
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

          {loading ? (

            <div className="py-16 text-center">
              Loading Reviews...
            </div>

          ) : reviews.length === 0 ? (

            <div className="rounded-2xl border border-dashed p-12 text-center">

              <div className="text-6xl">
                ⭐
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                No Reviews Yet
              </h3>

              <p className="mt-3 text-gray-500">
                Be the first to review this product.
              </p>

            </div>

          ) : (

            <div className="space-y-6">

              {sorted.map((review) => (

                <DatabaseReviewCard
                  key={review.id}
                  review={review}
                  onVote={loadReviews}
                />
              ))}

            </div>

          )}

        </div>

      </div>

    </section>
  );
}