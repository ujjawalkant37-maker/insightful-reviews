"use client";

import { useState } from "react";
import { askAI } from "@/lib/ai";

const categories = [
  "Smartphones",
  "Laptops",
  "Televisions",
  "Audio",
  "Home Appliances",
  "Wearables",
];

const priorities = [
  "Camera",
  "Battery",
  "Gaming",
  "Performance",
  "Display",
  "Value for Money",
  "Software Support",
];

export default function AIRecommendation() {
  const [category, setCategory] = useState("Smartphones");
  const [budget, setBudget] = useState("50000");
  const [priority, setPriority] = useState("Camera");

  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState("");

  async function generateRecommendation() {
    try {
      setLoading(true);

      const prompt = `
You are an expert product buying advisor.

Recommend products based on the following.

Category:
${category}

Budget:
₹${budget}

Priority:
${priority}

Return your answer using this structure.

TOP RECOMMENDATION

WHY IT IS BEST

ALTERNATIVE OPTIONS

WHAT TO AVOID

BUYING TIPS

FINAL VERDICT

Keep the answer below 300 words.

Remain unbiased.
`;

      const response = await askAI(prompt);

      setResult(response);
    } catch (error) {
      console.error(error);

      setResult(
        "Unable to generate recommendations."
      );
    }

    setLoading(false);
  }

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div>

        <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
          🤖 AI Product Recommender
        </span>

        <h2 className="mt-5 text-3xl font-bold">
          Find Your Perfect Product
        </h2>

        <p className="mt-3 text-gray-500">
          Tell AI your budget and priorities.
          We'll recommend the best products.
        </p>

      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">

        <div>

          <label className="mb-2 block font-semibold">
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full rounded-xl border p-3 dark:border-zinc-700 dark:bg-zinc-800"
          >
            {categories.map((item) => (
              <option key={item}>
                {item}
              </option>
            ))}
          </select>

        </div>

        <div>

          <label className="mb-2 block font-semibold">
            Budget (₹)
          </label>

          <input
            type="number"
            value={budget}
            onChange={(e) =>
              setBudget(e.target.value)
            }
            className="w-full rounded-xl border p-3 dark:border-zinc-700 dark:bg-zinc-800"
          />

        </div>

        <div>

          <label className="mb-2 block font-semibold">
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
            className="w-full rounded-xl border p-3 dark:border-zinc-700 dark:bg-zinc-800"
          >
            {priorities.map((item) => (
              <option key={item}>
                {item}
              </option>
            ))}
          </select>

        </div>

      </div>

      <button
        onClick={generateRecommendation}
        disabled={loading}
        className="mt-8 rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading
          ? "Generating..."
          : "Get AI Recommendation"}
      </button>

      {loading && (

        <div className="py-16 text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>

          <p className="mt-5">
            AI is finding the best products...
          </p>

        </div>

      )}

      {!loading && result && (

        <div className="mt-10 rounded-2xl bg-slate-50 p-6 whitespace-pre-wrap leading-8 dark:bg-zinc-800">

          {result}

        </div>

      )}

    </section>
  );
}