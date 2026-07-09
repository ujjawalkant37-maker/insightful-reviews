import React from "react";

type Props = {
  score: number;
};

export default function AIVerdict({ score }: Props) {
  let verdict = "Avoid";
  let color = "bg-red-600";

  if (score >= 85) {
    verdict = "Buy";
    color = "bg-green-600";
  } else if (score >= 70) {
    verdict = "Worth Considering";
    color = "bg-yellow-500";
  }

  return (
    <section className="mt-8 rounded-xl border bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900">

      <h2 className="text-2xl font-bold">
        🤖 AI Verdict
      </h2>

      <div className="mt-5 flex items-center justify-between">

        <div>

          <div className="text-5xl font-bold">
            {score}%
          </div>

          <p className="mt-2 text-gray-500">
            AI Confidence Score
          </p>

        </div>

        <span
          className={`rounded-xl px-6 py-3 text-lg font-bold text-white ${color}`}
        >
          {verdict}
        </span>

      </div>

      <div className="mt-6">

        <div className="mb-2 font-semibold">
          AI Recommendation
        </div>

        <ul className="list-disc space-y-2 pl-5 text-gray-700 dark:text-gray-300">

          <li>Excellent overall product quality.</li>

          <li>Recommended for most buyers.</li>

          <li>Compare prices before purchasing.</li>

          <li>Read verified user reviews.</li>

        </ul>

      </div>

    </section>
  );
}