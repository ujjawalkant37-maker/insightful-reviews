"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createReview } from "@/lib/reviews";
import StarRating from "@/components/StarRating";
import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function WriteReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = searchParams.get("productId");

  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!productId) {
      alert("Invalid product.");
      return;
    }

    if (!title.trim() || !review.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await createReview({
        product_id: Number(productId),
        rating,
        title,
        review,
        pros,
        cons,
      });

      alert("Review submitted successfully.");

      router.back();
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Unable to submit review.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtectedRoute>

      <main className="mx-auto max-w-3xl px-6 py-10">

        <h1 className="mb-2 text-4xl font-bold">
          Write Review
        </h1>

        <p className="mb-8 text-gray-500">
          Share your genuine experience to help other buyers.
        </p>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border bg-white p-8 shadow dark:border-zinc-800 dark:bg-zinc-900"
        >

          <div className="mb-8">

            <label className="mb-2 block font-semibold">
              Rating
            </label>

            <StarRating
              value={rating}
              editable
              onChange={setRating}
            />

          </div>

          <div className="mb-8">

            <label className="mb-2 block font-semibold">
              Review Title
            </label>

            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border p-3 dark:border-zinc-700 dark:bg-zinc-800"
              placeholder="Summarize your experience"
            />

          </div>

          <div className="mb-8">

            <label className="mb-2 block font-semibold">
              Pros
            </label>

            <textarea
              rows={3}
              value={pros}
              onChange={(e) => setPros(e.target.value)}
              className="w-full rounded-lg border p-3 dark:border-zinc-700 dark:bg-zinc-800"
              placeholder="What did you like?"
            />

          </div>

          <div className="mb-8">

            <label className="mb-2 block font-semibold">
              Cons
            </label>

            <textarea
              rows={3}
              value={cons}
              onChange={(e) => setCons(e.target.value)}
              className="w-full rounded-lg border p-3 dark:border-zinc-700 dark:bg-zinc-800"
              placeholder="What could be improved?"
            />

          </div>

          <div className="mb-8">

            <label className="mb-2 block font-semibold">
              Detailed Review
            </label>

            <textarea
              required
              rows={8}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full rounded-lg border p-3 dark:border-zinc-700 dark:bg-zinc-800"
              placeholder="Write your complete experience..."
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-4 text-lg font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>

        </form>

      </main>

    </ProtectedRoute>
  );
}