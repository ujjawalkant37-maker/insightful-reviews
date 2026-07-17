"use client";

import { useEffect, useState } from "react";
import { askAI } from "@/lib/ai";

type Props = {
  productName: string;
  category?: string;
  summary?: string;
  price?: number | string;
};

export default function AIBuyingGuide({
  productName,
  category = "",
  summary = "",
  price,
}: Props) {
  const [guide, setGuide] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateGuide();
  }, [productName]);

  async function generateGuide() {
    try {
      setLoading(true);

      const prompt = `
You are an expert buying advisor.

Generate a practical buying guide.

Product:
${productName}

Category:
${category}

Price:
₹${price ?? "Unknown"}

Summary:
${summary}

Rules:

- Be honest and unbiased.
- Use only the available information.
- Never invent specifications.
- Keep the guide under 400 words.

Return EXACTLY in this format.

OVERVIEW

BEST FOR

NOT IDEAL FOR

TOP REASONS TO BUY

THINGS TO CONSIDER

BETTER ALTERNATIVES (if applicable)

BUY NOW OR WAIT

FINAL RECOMMENDATION
`;

      const response = await askAI(prompt);

      setGuide(response);
    } catch (error) {
      console.error(error);

      setGuide(
        "Unable to generate the AI buying guide."
      );
    }

    setLoading(false);
  }

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex items-center justify-between">

        <div>

          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            🤖 AI Buying Guide
          </span>

          <h2 className="mt-5 text-3xl font-bold">
            Smart Buying Guide
          </h2>

          <p className="mt-3 text-gray-500">
            AI summarizes who should buy this product,
            who should avoid it, and whether it offers
            good value for money.
          </p>

        </div>

        <button
          onClick={generateGuide}
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Regenerate"}
        </button>

      </div>

      {loading ? (

        <div className="py-20 text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>

          <p className="mt-5">
            AI is preparing your buying guide...
          </p>

        </div>

      ) : (

        <div className="mt-10 whitespace-pre-wrap rounded-2xl bg-slate-50 p-6 leading-8 dark:bg-zinc-800">

          {guide}

        </div>

      )}

      <div className="mt-10 grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl bg-blue-50 p-5 dark:bg-blue-950/20">

          <div className="text-sm text-gray-500">
            Product
          </div>

          <div className="mt-2 text-lg font-bold">
            {productName}
          </div>

        </div>

        <div className="rounded-2xl bg-green-50 p-5 dark:bg-green-950/20">

          <div className="text-sm text-gray-500">
            Category
          </div>

          <div className="mt-2 text-lg font-bold">
            {category || "--"}
          </div>

        </div>

        <div className="rounded-2xl bg-yellow-50 p-5 dark:bg-yellow-950/20">

          <div className="text-sm text-gray-500">
            Price
          </div>

          <div className="mt-2 text-lg font-bold">
            ₹{price ?? "--"}
          </div>

        </div>

        <div className="rounded-2xl bg-purple-50 p-5 dark:bg-purple-950/20">

          <div className="text-sm text-gray-500">
            Powered By
          </div>

          <div className="mt-2 text-lg font-bold">
            GPT AI
          </div>

        </div>

      </div>

    </section>
  );
}