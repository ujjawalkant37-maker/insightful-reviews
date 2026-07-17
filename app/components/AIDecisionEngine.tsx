"use client";

import { useEffect, useState } from "react";
import { askAI } from "@/lib/ai";

type Props = {
  productName: string;
  category?: string;
  price?: number | string;
  aiScore?: number;
  trustScore?: number;
  summary?: string;
};

export default function AIDecisionEngine({
  productName,
  category = "",
  price,
  aiScore,
  trustScore,
  summary = "",
}: Props) {
  const [loading, setLoading] = useState(true);
  const [decision, setDecision] = useState("");

  useEffect(() => {
    generateDecision();
  }, [productName]);

  async function generateDecision() {
    try {
      setLoading(true);

      const prompt = `
You are the AI Decision Engine for a trusted product review platform.

Analyze the following product.

Product:
${productName}

Category:
${category}

Current Price:
₹${price ?? "Unknown"}

AI Score:
${aiScore ?? "Unknown"}

Trust Score:
${trustScore ?? "Unknown"}

Summary:
${summary}

Rules:

• Be unbiased.
• Use ONLY the available information.
• If information is insufficient, clearly mention that.
• Never invent specifications.
• Keep the answer under 450 words.

Return EXACTLY in this format.

======================

FINAL DECISION

(BUY / WAIT / AVOID)

AI CONFIDENCE

(0-100)

WHY THIS DECISION

VALUE FOR MONEY

MAIN STRENGTHS

MAIN WEAKNESSES

BEST FOR

WHO SHOULD AVOID

RISK FACTORS

FINAL VERDICT

======================
`;

      const response = await askAI(prompt);

      setDecision(response);
    } catch (error) {
      console.error(error);

      setDecision(
        "Unable to generate AI decision."
      );
    }

    setLoading(false);
  }

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex items-center justify-between">

        <div>

          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            🧠 AI Decision Engine
          </span>

          <h2 className="mt-5 text-4xl font-bold">
            Buy • Wait • Avoid
          </h2>

          <p className="mt-4 text-gray-500">
            Our AI combines product analysis,
            trust score, pricing context and
            overall product quality to provide
            a final buying recommendation.
          </p>

        </div>

        <button
          onClick={generateDecision}
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading
            ? "Analyzing..."
            : "Run AI Again"}
        </button>

      </div>

      {loading ? (

        <div className="py-24 text-center">

          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>

          <p className="mt-6 text-lg">
            AI is evaluating this product...
          </p>

        </div>

      ) : (

        <div className="mt-10 whitespace-pre-wrap rounded-2xl bg-slate-50 p-8 leading-8 dark:bg-zinc-800">

          {decision}

        </div>

      )}

      <div className="mt-12 grid gap-6 md:grid-cols-4">

        <InfoCard
          title="Product"
          value={productName}
        />

        <InfoCard
          title="Category"
          value={category || "--"}
        />

        <InfoCard
          title="Price"
          value={`₹${price ?? "--"}`}
        />

        <InfoCard
          title="Trust Score"
          value={
            trustScore !== undefined
              ? `${trustScore}/100`
              : "--"
          }
        />

      </div>

      <div className="mt-10 rounded-2xl border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-900 dark:bg-indigo-950/20">

        <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
          How the AI Decision Engine Works
        </h3>

        <ul className="mt-5 space-y-3 text-gray-700 dark:text-gray-300">

          <li>• AI analyzes the available product information.</li>

          <li>• Trust Score contributes to reliability assessment.</li>

          <li>• Price and value influence the buying recommendation.</li>

          <li>• The engine weighs strengths, weaknesses, and potential risks.</li>

          <li>• If available information is limited, the AI states that explicitly instead of guessing.</li>

        </ul>

      </div>

    </section>
  );
}

function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5 text-center dark:bg-zinc-800">

      <div className="text-sm text-gray-500">
        {title}
      </div>

      <div className="mt-3 text-xl font-bold">
        {value}
      </div>

    </div>
  );
}