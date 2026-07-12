"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  DatabaseReview,
  getUserReviews,
  deleteReview,
} from "@/lib/getReviews";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import ReviewCard from "@/components/ReviewCard";

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState<DatabaseReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const data = await getUserReviews(user.id);

    setReviews(data);

    setLoading(false);
  }

  async function handleDelete(id: number) {
    const ok = window.confirm(
      "Delete this review?"
    );

    if (!ok) return;

    await deleteReview(id);

    setReviews((current) =>
      current.filter((review) => review.id !== id)
    );
  }

  const average =
    reviews.length === 0
      ? 0
      : (
          reviews.reduce(
            (sum, review) =>
              sum + review.rating,
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
                Manage your submitted reviews.
              </p>

            </div>

          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">

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
                0
              </div>

            </div>

          </div>

          {loading ? (

            <div className="py-20 text-center">
              Loading Reviews...
            </div>

          ) : reviews.length === 0 ? (

            <div className="mt-12 rounded-2xl border border-dashed bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">

              <div className="text-6xl">
                ⭐
              </div>

              <h2 className="mt-6 text-3xl font-bold">
                No Reviews Yet
              </h2>

              <p className="mt-4 text-gray-500">
                You haven't written any reviews.
              </p>

            </div>

          ) : (

            <div className="mt-12 space-y-8">

              {reviews.map((review) => (

                <div
                  key={review.id}
                  className="rounded-2xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >

                  <ReviewCard
                    review={{
                      id: String(review.id),
                      productId: String(review.product_id),
                      name: "You",
                      rating: review.rating,
                      title: review.title,
                      text: review.review,
                      date: review.created_at,
                    }}
                  />

                  <div className="mt-6 flex gap-3">

                    <Link
                      href={`/edit-review?id=${review.id}`}
                      className="rounded-xl bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(review.id)
                      }
                      className="rounded-xl bg-red-600 px-5 py-2 text-white"
                    >
                      Delete
                    </button>

                    <Link
                      href={`/products`}
                      className="rounded-xl border px-5 py-2"
                    >
                      View Product
                    </Link>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>

    </ProtectedRoute>
  );
}