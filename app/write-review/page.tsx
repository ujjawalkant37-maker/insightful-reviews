"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { createReview } from "@/lib/reviews";
import StarRating from "@/components/StarRating";
import ProtectedRoute from "@/app/components/ProtectedRoute";

function WriteReviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productId = searchParams.get("productId");

  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!productId) {
      alert("Invalid product.");
      return;
    }

    const numericProductId = Number(productId);

    if (!Number.isInteger(numericProductId) || numericProductId <= 0) {
      alert("Invalid product.");
      return;
    }

    if (!title.trim() || !review.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    if (rating < 1 || rating > 5) {
      alert("Please select a rating between 1 and 5.");
      return;
    }

    try {
      setLoading(true);

      await createReview({
        product_id: numericProductId,
        rating,
        title: title.trim(),
        review: review.trim(),
        pros: pros.trim(),
        cons: cons.trim(),
      });

      alert("Review submitted successfully.");

      router.back();
      router.refresh();
    } catch (err) {
      console.error("Review submission failed:", err);

      const message =
        err instanceof Error
          ? err.message
          : "Unable to submit review.";

      alert(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Write a Review
          </h1>

          <p className="mt-2 text-gray-500">
            Share your genuine experience to help other buyers.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="mb-8">
            <label className="mb-3 block font-semibold">
              Rating
            </label>

            <StarRating
              value={rating}
              editable
              onChange={setRating}
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="review-title"
              className="mb-2 block font-semibold"
            >
              Review Title
            </label>

            <input
              id="review-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border p-3 outline-none focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-800"
              placeholder="Summarize your experience"
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="review-pros"
              className="mb-2 block font-semibold"
            >
              Pros
            </label>

            <textarea
              id="review-pros"
              rows={3}
              value={pros}
              onChange={(e) => setPros(e.target.value)}
              className="w-full rounded-lg border p-3 outline-none focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-800"
              placeholder="What did you like?"
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="review-cons"
              className="mb-2 block font-semibold"
            >
              Cons
            </label>

            <textarea
              id="review-cons"
              rows={3}
              value={cons}
              onChange={(e) => setCons(e.target.value)}
              className="w-full rounded-lg border p-3 outline-none focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-800"
              placeholder="What could be improved?"
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="review-content"
              className="mb-2 block font-semibold"
            >
              Detailed Review
            </label>

            <textarea
              id="review-content"
              required
              rows={8}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full rounded-lg border p-3 outline-none focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-800"
              placeholder="Write your complete experience..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </main>
    </ProtectedRoute>
  );
}

export default function WriteReviewPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-3xl px-4 py-12">
          <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
            Loading Review...
          </div>
        </main>
      }
    >
      <WriteReviewContent />
    </Suspense>
  );
}