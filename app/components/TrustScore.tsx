"use client";

import { useMemo } from "react";

type Props = {
  aiScore: number;
  expertRating: number;
  userRating: number;
  verifiedReviewPercentage: number;
  fakeReviewPercentage: number;
  totalReviews: number;
};

export default function TrustScore({
  aiScore,
  expertRating,
  userRating,
  verifiedReviewPercentage,
  fakeReviewPercentage,
  totalReviews,
}: Props) {
  const trustScore = useMemo(() => {
    const score =
      aiScore * 0.35 +
      (expertRating * 20) * 0.20 +
      (userRating * 20) * 0.20 +
      verifiedReviewPercentage * 0.15 +
      (100 - fakeReviewPercentage) * 0.10;

    return Math.max(0, Math.min(100, Math.round(score)));
  }, [
    aiScore,
    expertRating,
    userRating,
    verifiedReviewPercentage,
    fakeReviewPercentage,
  ]);

  const verdict = useMemo(() => {
    if (trustScore >= 90)
      return {
        text: "Exceptional",
        color: "text-green-600",
        bg: "bg-green-100",
      };

    if (trustScore >= 80)
      return {
        text: "Highly Trusted",
        color: "text-green-600",
        bg: "bg-green-100",
      };

    if (trustScore >= 70)
      return {
        text: "Trusted",
        color: "text-blue-600",
        bg: "bg-blue-100",
      };

    if (trustScore >= 60)
      return {
        text: "Average",
        color: "text-yellow-700",
        bg: "bg-yellow-100",
      };

    return {
      text: "Low Trust",
      color: "text-red-600",
      bg: "bg-red-100",
    };
  }, [trustScore]);

  const circumference = 2 * Math.PI * 70;
  const offset =
    circumference -
    (trustScore / 100) * circumference;

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex justify-center">

          <div className="relative h-48 w-48">

            <svg
              className="-rotate-90"
              width="192"
              height="192"
            >
              <circle
                cx="96"
                cy="96"
                r="70"
                stroke="#E5E7EB"
                strokeWidth="14"
                fill="none"
              />

              <circle
                cx="96"
                cy="96"
                r="70"
                stroke="#4F46E5"
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <div className="text-5xl font-bold">
                {trustScore}
              </div>

              <div className="text-gray-500">
                Trust Score
              </div>

            </div>

          </div>

        </div>

        <div className="flex-1">

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${verdict.bg} ${verdict.color}`}
          >
            {verdict.text}
          </span>

          <h2 className="mt-5 text-3xl font-bold">
            Overall Product Trust
          </h2>

          <p className="mt-3 leading-8 text-gray-500">
            This Trust Score combines AI
            analysis, expert ratings, user
            ratings, verified purchase reviews,
            and fake review detection into a
            single score from 0 to 100.
          </p>

        </div>

      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3 lg:grid-cols-6">

        <Metric
          label="AI Score"
          value={`${aiScore}/100`}
        />

        <Metric
          label="Expert Rating"
          value={`${expertRating}/5`}
        />

        <Metric
          label="User Rating"
          value={`${userRating}/5`}
        />

        <Metric
          label="Verified"
          value={`${verifiedReviewPercentage}%`}
        />

        <Metric
          label="Fake Reviews"
          value={`${fakeReviewPercentage}%`}
        />

        <Metric
          label="Reviews"
          value={totalReviews.toString()}
        />

      </div>

      <div className="mt-10 rounded-2xl bg-slate-50 p-6 dark:bg-zinc-800">

        <h3 className="text-xl font-bold">
          Trust Score Breakdown
        </h3>

        <ul className="mt-5 space-y-3 text-gray-700 dark:text-gray-300">

          <li>• AI Product Analysis — 35%</li>

          <li>• Expert Reviews — 20%</li>

          <li>• User Ratings — 20%</li>

          <li>• Verified Purchases — 15%</li>

          <li>• Fake Review Detection — 10%</li>

        </ul>

      </div>

    </section>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5 text-center dark:bg-zinc-800">

      <div className="text-sm text-gray-500">
        {label}
      </div>

      <div className="mt-3 text-2xl font-bold">
        {value}
      </div>

    </div>
  );
}