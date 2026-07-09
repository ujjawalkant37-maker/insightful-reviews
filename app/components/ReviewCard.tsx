"use client";

import React, { useState } from "react";
import StarRating from "./StarRating";

type ReviewCardProps = {
  name: string;
  rating: number;
  title: string;
  review: string;
  pros?: string[];
  cons?: string[];
  verified?: boolean;
  date?: string;
};

export default function ReviewCard({
  name,
  rating,
  title,
  review,
  pros = [],
  cons = [],
  verified = false,
  date = "Today",
}: ReviewCardProps) {
  const [helpful, setHelpful] = useState(0);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
            {name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3 className="font-semibold">{name}</h3>

            <div className="flex items-center gap-2">
              <StarRating value={rating} />

              {verified && (
                <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700">
                  ✓ Verified
                </span>
              )}
            </div>
          </div>

        </div>

        <span className="text-sm text-gray-500">
          {date}
        </span>

      </div>

      <h2 className="mt-5 text-lg font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-gray-700 dark:text-gray-300">
        {review}
      </p>

      {(pros.length > 0 || cons.length > 0) && (

        <div className="mt-6 grid gap-4 md:grid-cols-2">

          <div>

            <h4 className="mb-2 font-semibold text-green-600">
              Pros
            </h4>

            <ul className="list-disc pl-5">

              {pros.map((item) => (
                <li key={item}>{item}</li>
              ))}

            </ul>

          </div>

          <div>

            <h4 className="mb-2 font-semibold text-red-600">
              Cons
            </h4>

            <ul className="list-disc pl-5">

              {cons.map((item) => (
                <li key={item}>{item}</li>
              ))}

            </ul>

          </div>

        </div>

      )}

      <div className="mt-6 flex items-center gap-4">

        <button
          onClick={() => setHelpful(helpful + 1)}
          className="rounded-lg border px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          👍 Helpful ({helpful})
        </button>

        <button
          className="rounded-lg border px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          Report
        </button>

      </div>

    </div>
  );
}