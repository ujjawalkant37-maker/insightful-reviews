"use client";

import { useState } from "react";
import StarRating from "./StarRating";
import {
  DatabaseReview,
  markHelpful,
  markNotHelpful,
} from "@/lib/getReviews";

type Props = {
  review: DatabaseReview;
  onVote?: () => void;
};

export default function DatabaseReviewCard({
  review,
  onVote,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function handleHelpful() {
    if (loading) return;

    try {
      setLoading(true);

      await markHelpful(review.id);

      onVote?.();
    } finally {
      setLoading(false);
    }
  }

  async function handleNotHelpful() {
    if (loading) return;

    try {
      setLoading(true);

      await markNotHelpful(review.id);

      onVote?.();
    } finally {
      setLoading(false);
    }
  }

  const initials =
    review.user_id?.substring(0, 2).toUpperCase() ?? "U";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
            {initials}
          </div>

          <div>

            <h3 className="font-semibold">
              Verified User
            </h3>

            <div className="mt-1 flex items-center gap-2">

              <StarRating value={review.rating} />

              <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                ✓ Verified
              </span>

            </div>

          </div>

        </div>

        <div className="text-sm text-gray-500">
          {new Date(
            review.created_at
          ).toLocaleDateString()}
        </div>

      </div>

      <h2 className="mt-6 text-xl font-semibold">
        {review.title}
      </h2>

      <p className="mt-3 whitespace-pre-wrap text-gray-700 dark:text-gray-300">
        {review.review}
      </p>

      {(review.pros || review.cons) && (

        <div className="mt-6 grid gap-6 md:grid-cols-2">

          {review.pros && (

            <div>

              <h4 className="mb-2 font-semibold text-green-600">
                Pros
              </h4>

              <p className="text-gray-700 dark:text-gray-300">
                {review.pros}
              </p>

            </div>

          )}

          {review.cons && (

            <div>

              <h4 className="mb-2 font-semibold text-red-600">
                Cons
              </h4>

              <p className="text-gray-700 dark:text-gray-300">
                {review.cons}
              </p>

            </div>

          )}

        </div>

      )}

      <div className="mt-8 flex flex-wrap gap-3">

        <button
          disabled={loading}
          onClick={handleHelpful}
          className="rounded-xl border px-4 py-2 hover:bg-green-50 disabled:opacity-50"
        >
          👍 Helpful ({review.helpful ?? 0})
        </button>

        <button
          disabled={loading}
          onClick={handleNotHelpful}
          className="rounded-xl border px-4 py-2 hover:bg-red-50 disabled:opacity-50"
        >
          👎 Not Helpful ({review.not_helpful ?? 0})
        </button>

        <button
          className="rounded-xl border px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          🚩 Report
        </button>

      </div>

    </div>
  );
}