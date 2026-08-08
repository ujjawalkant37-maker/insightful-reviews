"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import ProtectedRoute from "@/app/components/ProtectedRoute";
import { supabase } from "@/lib/supabase";
import { updateReview } from "@/lib/reviews";
import StarRating from "@/components/StarRating";

function EditReviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const reviewId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");

  const loadReview = useCallback(async () => {
    if (!reviewId) {
      router.push("/my-reviews");
      return;
    }

    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("id", Number(reviewId))
      .single();

    if (error || !data) {
      router.push("/my-reviews");
      return;
    }

    setRating(data.rating);
    setTitle(data.title);
    setReview(data.review);
    setLoading(false);
  }, [reviewId, router]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadReview();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadReview]);

  async function saveReview(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!reviewId) {
      router.push("/my-reviews");
      return;
    }

    setSaving(true);

    try {
      await updateReview(Number(reviewId), {
        rating,
        title,
        review,
      });

      alert("Review updated successfully.");

      router.push("/my-reviews");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Unable to update review.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="rounded-2xl border bg-white p-8 text-gray-500 shadow dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          Loading Review...
        </div>
      </main>
    );
  }

  return (
    <ProtectedRoute>
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="mb-8 text-4xl font-bold">
          Edit Review
        </h1>

        <form
          onSubmit={saveReview}
          className="rounded-2xl border bg-white p-8 shadow dark:border-zinc-800 dark:bg-zinc-900"
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
              className="mb-3 block font-semibold"
            >
              Title
            </label>

            <input
              id="review-title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full rounded-lg border p-3 dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="review-content"
              className="mb-3 block font-semibold"
            >
              Review
            </label>

            <textarea
              id="review-content"
              rows={8}
              value={review}
              onChange={(e) =>
                setReview(e.target.value)
              }
              className="w-full rounded-lg border p-3 dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-indigo-600 py-4 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>
        </form>
      </main>
    </ProtectedRoute>
  );
}

export default function EditReviewPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-3xl px-6 py-10">
          <div className="rounded-2xl border bg-white p-8 text-gray-500 shadow dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            Loading Review...
          </div>
        </main>
      }
    >
      <EditReviewContent />
    </Suspense>
  );
}