"use client";

import Link from "next/link";

export default function WriteReviewButton() {
  return (
    <div className="my-8 flex justify-center">
      <Link
        href="/write-review"
        className="rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700"
      >
        ✍️ Write a Review
      </Link>
    </div>
  );
}