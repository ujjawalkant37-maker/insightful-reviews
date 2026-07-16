"use client";

import { useEffect, useState } from "react";
import { askAI } from "@/lib/ai";

type Props = {
  productName: string;
  category?: string;
  summary?: string;
};

export default function AISummary({
  productName,
  category,
  summary,
}: Props) {
  const [loading, setLoading] = useState(true);

  const [aiSummary, setAiSummary] = useState("");

  useEffect(() => {
    generateSummary();
  }, [productName]);

  async function generateSummary() {
    try {
      setLoading(true);

      const prompt = `
You are a professional product reviewer.

Product:
${productName}

Category:
${category ?? "Unknown"}

Existing Summary:
${summary ?? ""}

Write an AI buying summary.

Return:

• Overview
• Major strengths
• Weaknesses
• Who should buy
• Final verdict

Maximum 180 words.

Be unbiased.
`;

      const response = await askAI(prompt);

      setAiSummary(response);
    } catch (err) {
      console.error(err);

      setAiSummary(
        summary ??
          "Unable to generate AI summary."
      );
    }

    setLoading(false);
  }

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex items-center justify-between">

        <div>

          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            🤖 AI Generated Summary
          </span>

          <h2 className="mt-5 text-3xl font-bold">
            Product Overview
          </h2>

        </div>

        <button
          onClick={generateSummary}
          className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Regenerate
        </button>

      </div>

      {loading ? (

        <div className="py-20 text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>

          <p className="mt-5 text-lg">
            AI is analyzing this product...
          </p>

        </div>

      ) : (

        <div className="mt-8 whitespace-pre-wrap leading-8 text-gray-700 dark:text-gray-300">

          {aiSummary}

        </div>

      )}

    </section>
  );
}