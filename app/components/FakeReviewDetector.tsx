"use client";

import { useState } from "react";
import { askAI } from "@/lib/ai";

type Props = {
  review: string;
};

export default function FakeReviewDetector({
  review,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [analysis, setAnalysis] = useState("");

  async function analyzeReview() {
    if (!review.trim()) {
      alert("Please write a review first.");
      return;
    }

    try {
      setLoading(true);

      const prompt = `
You are an AI Fake Review Detection System.

Analyze the following review.

Review:

${review}

Return your answer ONLY in the following format.

--------------------------------

AUTHENTICITY SCORE:
/100

CLASSIFICATION:
GENUINE
or
SUSPICIOUS

CONFIDENCE:
/100

RED FLAGS

• ...

• ...

POSITIVE SIGNALS

• ...

• ...

FINAL VERDICT

One short paragraph.

Do not invent information.
`;

      const result = await askAI(prompt);

      setAnalysis(result);

    } catch (error) {
      console.error(error);

      setAnalysis(
        "Unable to analyze the review."
      );
    }

    setLoading(false);
  }

  return (
    <section className="mt-8 rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex items-center justify-between">

        <div>

          <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
            🛡 AI Fake Review Detector
          </span>

          <h2 className="mt-5 text-3xl font-bold">
            Review Authenticity Check
          </h2>

          <p className="mt-3 text-gray-500">
            AI checks whether a review appears
            genuine or potentially manipulated.
          </p>

        </div>

        <button
          onClick={analyzeReview}
          disabled={loading}
          className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
        >
          {loading
            ? "Analyzing..."
            : "Analyze Review"}
        </button>

      </div>

      {loading && (

        <div className="py-20 text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>

          <p className="mt-5">
            AI is checking authenticity...
          </p>

        </div>

      )}

      {!loading && analysis && (

        <div className="mt-8 rounded-2xl bg-slate-50 p-6 whitespace-pre-wrap leading-8 dark:bg-zinc-800">

          {analysis}

        </div>

      )}

    </section>
  );
}