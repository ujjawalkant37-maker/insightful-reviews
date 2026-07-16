"use client";

import { useEffect, useState } from "react";
import { askAI } from "@/lib/ai";

type Props = {
  products: {
    name: string;
    summary?: string;
    aiScore?: number;
    price?: string | number;
  }[];
};

export default function AICompare({
  products,
}: Props) {
  const [loading, setLoading] = useState(true);

  const [comparison, setComparison] =
    useState("");

  useEffect(() => {
    if (products.length >= 2) {
      compareProducts();
    } else {
      setLoading(false);
    }
  }, [products]);

  async function compareProducts() {
    try {
      setLoading(true);

      const prompt = `
You are an expert product reviewer.

Compare these products.

${products
  .map(
    (product, index) => `
Product ${index + 1}

Name:
${product.name}

AI Score:
${product.aiScore ?? "Unknown"}

Price:
${product.price ?? "Unknown"}

Summary:
${product.summary ?? ""}
`
  )
  .join("\n")}

Return your answer in this format:

OVERVIEW

KEY DIFFERENCES

WINNER FOR CAMERA

WINNER FOR PERFORMANCE

WINNER FOR BATTERY

WINNER FOR VALUE

WHO SHOULD BUY EACH

FINAL WINNER

Keep the answer under 350 words.

Remain unbiased.
`;

      const response = await askAI(prompt);

      setComparison(response);
    } catch (error) {
      console.error(error);

      setComparison(
        "Unable to generate AI comparison."
      );
    }

    setLoading(false);
  }

  if (products.length < 2) {
    return (
      <section className="rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

        <h2 className="text-3xl font-bold">
          🤖 AI Product Comparison
        </h2>

        <p className="mt-6 text-gray-500">
          Select at least two products to
          generate an AI comparison.
        </p>

      </section>
    );
  }

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex items-center justify-between">

        <div>

          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            🤖 AI Comparison
          </span>

          <h2 className="mt-5 text-3xl font-bold">
            AI Product Comparison
          </h2>

        </div>

        <button
          onClick={compareProducts}
          className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Compare Again
        </button>

      </div>

      {loading ? (

        <div className="py-20 text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>

          <p className="mt-5">
            AI is comparing products...
          </p>

        </div>

      ) : (

        <div className="mt-8 whitespace-pre-wrap rounded-2xl bg-slate-50 p-6 leading-8 dark:bg-zinc-800">

          {comparison}

        </div>

      )}

    </section>
  );
}