"use client";

import { useMemo, useState } from "react";
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

  const totalVotes =
    (review.helpful ?? 0) +
    (review.not_helpful ?? 0);

  const helpfulPercent = useMemo(() => {
    if (totalVotes === 0) return 100;

    return Math.round(
      ((review.helpful ?? 0) / totalVotes) * 100
    );
  }, [review.helpful, review.not_helpful, totalVotes]);

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
    review.user_id?.substring(0, 2).toUpperCase() || "U";

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
            {initials}
          </div>

          <div>

            <div className="flex items-center gap-2">

              <h3 className="font-semibold">
                Verified User
              </h3>

              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                ✓ Verified
              </span>

            </div>

            <div className="mt-2">
              <StarRating value={review.rating} />
            </div>

          </div>

        </div>

        <div className="text-right">

          <div className="text-sm text-gray-500">
            {new Date(
              review.created_at
            ).toLocaleDateString()}
          </div>

          <div className="mt-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
            {review.rating}/5
          </div>

        </div>

      </div>

      <h2 className="mt-6 text-xl font-bold">
        {review.title}
      </h2>

      <p className="mt-4 whitespace-pre-wrap leading-7 text-gray-700 dark:text-gray-300">
        {review.review}
      </p>

      {(review.pros || review.cons) && (

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          {review.pros && (

            <div className="rounded-xl bg-green-50 p-4 dark:bg-green-950/30">

              <h4 className="mb-2 font-semibold text-green-700">
                👍 Pros
              </h4>

              <p>{review.pros}</p>

            </div>

          )}

          {review.cons && (

            <div className="rounded-xl bg-red-50 p-4 dark:bg-red-950/30">

              <h4 className="mb-2 font-semibold text-red-700">
                👎 Cons
              </h4>

              <p>{review.cons}</p>

            </div>

          )}

        </div>

      )}

      <div className="mt-8">

        <div className="mb-2 flex items-center justify-between text-sm">

          <span>
            Community Helpful Score
          </span>

          <span>
            {helpfulPercent}%
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-gray-200">

          <div
            className="h-full rounded-full bg-green-500"
            style={{
              width: `${helpfulPercent}%`,
            }}
          />

        </div>

      </div>

      <div className="mt-8 flex flex-wrap gap-3">

        <button
          disabled={loading}
          onClick={handleHelpful}
          className="rounded-xl border px-4 py-2 transition hover:bg-green-50 disabled:opacity-50"
        >
          👍 Helpful ({review.helpful ?? 0})
        </button>

        <button
          disabled={loading}
          onClick={handleNotHelpful}
          className="rounded-xl border px-4 py-2 transition hover:bg-red-50 disabled:opacity-50"
        >
          👎 Not Helpful ({review.not_helpful ?? 0})
        </button>

        <button
          className="rounded-xl border px-4 py-2 transition hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          🚩 Report
        </button>

      </div>

    </article>
  );
}