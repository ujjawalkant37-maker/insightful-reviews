"use client";

import { useEffect, useState } from "react";
import { askAI } from "@/lib/ai";

type Props = {
  productName: string;
  category?: string;
  launchYear?: string | number;
  summary?: string;
};

export default function AIProductTimeline({
  productName,
  category = "",
  launchYear,
  summary = "",
}: Props) {
  const [loading, setLoading] = useState(true);
  const [timeline, setTimeline] = useState("");

  useEffect(() => {
    generateTimeline();
  }, [productName]);

  async function generateTimeline() {
    try {
      setLoading(true);

      const prompt = `
You are an expert technology analyst.

Product:
${productName}

Category:
${category}

Launch Year:
${launchYear ?? "Unknown"}

Summary:
${summary}

Using ONLY the available information and general lifecycle guidance,
generate a product lifecycle timeline.

If exact dates are unknown, clearly state that they are estimates.

Return EXACTLY in this format.

PRODUCT OVERVIEW

CURRENT LIFECYCLE STAGE

LAUNCH PERIOD

MAJOR IMPROVEMENTS

EXPECTED SOFTWARE SUPPORT

EXPECTED HARDWARE RELEVANCE

WHEN TO UPGRADE

LIKELY SUCCESSOR

FINAL ADVICE

Keep the answer under 350 words.
Never invent specific facts.
`;

      const result = await askAI(prompt);

      setTimeline(result);
    } catch (error) {
      console.error(error);

      setTimeline(
        "Unable to generate the product timeline."
      );
    }

    setLoading(false);
  }

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex items-center justify-between">

        <div>

          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            🕒 AI Product Timeline
          </span>

          <h2 className="mt-5 text-3xl font-bold">
            Product Lifecycle
          </h2>

          <p className="mt-3 text-gray-500">
            Understand where this product stands in its
            lifecycle and whether it's still a good time
            to buy or upgrade.
          </p>

        </div>

        <button
          onClick={generateTimeline}
          disabled={loading}
          className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Refresh"}
        </button>

      </div>

      {loading ? (

        <div className="py-20 text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-violet-600 border-t-transparent"></div>

          <p className="mt-5">
            AI is building the product timeline...
          </p>

        </div>

      ) : (

        <div className="mt-10 whitespace-pre-wrap rounded-2xl bg-slate-50 p-6 leading-8 dark:bg-zinc-800">

          {timeline}

        </div>

      )}

      <div className="mt-10 grid gap-6 md:grid-cols-3">

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

        <div className="rounded-2xl bg-orange-50 p-5 dark:bg-orange-950/20">

          <div className="text-sm text-gray-500">
            Launch Year
          </div>

          <div className="mt-2 text-lg font-bold">
            {launchYear ?? "--"}
          </div>

        </div>

      </div>

    </section>
  );
}