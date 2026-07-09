"use client";

import { useState } from "react";
import StarRating from "@/components/StarRating";

export default function WriteReviewPage() {
  const [rating, setRating] = useState(5);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">

      <h1 className="mb-8 text-4xl font-bold">
        Write a Review
      </h1>

      <div className="rounded-xl border bg-white p-8 shadow">

        <div className="mb-6">
          <label className="mb-2 block font-semibold">
            Product Name
          </label>

          <input
            type="text"
            placeholder="Samsung Galaxy S24 Ultra"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-semibold">
            Overall Rating
          </label>

          <StarRating
            value={rating}
            onChange={setRating}
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-semibold">
            Review Title
          </label>

          <input
            type="text"
            placeholder="Amazing flagship phone"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-semibold">
            Pros
          </label>

          <textarea
            rows={3}
            placeholder="Camera, Display, Battery..."
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block font-semibold">
            Cons
          </label>

          <textarea
            rows={3}
            placeholder="Price, Weight..."
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="mb-8">
          <label className="mb-2 block font-semibold">
            Detailed Review
          </label>

          <textarea
            rows={8}
            placeholder="Share your complete experience..."
            className="w-full rounded-lg border p-3"
          />
        </div>

        <button
          className="w-full rounded-xl bg-indigo-600 py-4 text-lg font-semibold text-white hover:bg-indigo-700"
        >
          Submit Review
        </button>

      </div>

    </main>
  );
}