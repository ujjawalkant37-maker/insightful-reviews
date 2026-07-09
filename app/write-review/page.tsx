"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StarRating from "@/components/StarRating";
import { createReview } from "@/lib/reviews";

export default function WriteReviewPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [productName, setProductName] = useState("");
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [review, setReview] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!productName || !title || !review) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await createReview({
        product_name: productName,
        rating,
        title,
        pros,
        cons,
        review,
      });

      alert("✅ Review submitted successfully.");

      router.push("/");
    } catch (err: any) {
      alert(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">

      <h1 className="mb-8 text-4xl font-bold">
        Write a Review
      </h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border bg-white p-8 shadow"
      >

        <div className="mb-6">
          <label className="mb-2 block font-semibold">
            Product Name *
          </label>

          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="mb-6">

          <label className="mb-2 block font-semibold">
            Rating
          </label>

          <StarRating
            value={rating}
            editable
            onChange={setRating}
          />

        </div>

        <div className="mb-6">

          <label className="mb-2 block font-semibold">
            Title *
          </label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

        </div>

        <div className="mb-6">

          <label className="mb-2 block font-semibold">
            Pros
          </label>

          <textarea
            rows={3}
            value={pros}
            onChange={(e) => setPros(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

        </div>

        <div className="mb-6">

          <label className="mb-2 block font-semibold">
            Cons
          </label>

          <textarea
            rows={3}
            value={cons}
            onChange={(e) => setCons(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

        </div>

        <div className="mb-8">

          <label className="mb-2 block font-semibold">
            Detailed Review *
          </label>

          <textarea
            rows={8}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full rounded-lg border p-3"
          />

        </div>

        <button
          disabled={loading}
          className="w-full rounded-xl bg-indigo-600 py-4 text-lg font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>

      </form>

    </main>
  );
}