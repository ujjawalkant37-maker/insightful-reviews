"use client";

import { useState } from "react";
import { askAI } from "@/lib/ai";

type Props = {
  productName: string;
  currentPrice: number | string;
  aiScore?: number;
};

export default function PricePrediction({
  productName,
  currentPrice,
  aiScore,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState("");

  async function predictPrice() {
    try {
      setLoading(true);

      const prompt = `
You are an expert pricing analyst.

Product:
${productName}

Current Price:
₹${currentPrice}

AI Score:
${aiScore ?? "Unknown"}

Based on market behaviour, seasonal sales,
flagship launches and historical pricing patterns,
predict whether the customer should buy now or wait.

Return your answer in this format.

BUY NOW / WAIT

EXPECTED PRICE TREND

EXPECTED DISCOUNT

BEST TIME TO BUY

REASONING

FINAL ADVICE

Keep the answer below 250 words.
`;

      const result = await askAI(prompt);

      setPrediction(result);
    } catch (error) {
      console.error(error);

      setPrediction(
        "Unable to generate price prediction."
      );
    }

    setLoading(false);
  }

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex items-center justify-between">

        <div>

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            📈 AI Price Prediction
          </span>

          <h2 className="mt-5 text-3xl font-bold">
            Buy Now or Wait?
          </h2>

          <p className="mt-3 text-gray-500">
            AI estimates whether this is the right
            time to buy based on pricing trends,
            seasonal discounts and market behaviour.
          </p>

        </div>

        <button
          onClick={predictPrice}
          disabled={loading}
          className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
        >
          {loading
            ? "Analyzing..."
            : "Predict Price"}
        </button>

      </div>

      {loading && (

        <div className="py-20 text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>

          <p className="mt-5">
            AI is analyzing price trends...
          </p>

        </div>

      )}

      {!loading && prediction && (

        <div className="mt-10 rounded-2xl bg-slate-50 p-6 whitespace-pre-wrap leading-8 dark:bg-zinc-800">

          {prediction}

        </div>

      )}

      <div className="mt-10 grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-green-50 p-5 dark:bg-green-950/20">

          <h3 className="font-bold text-green-700">
            Current Price
          </h3>

          <div className="mt-3 text-3xl font-bold">
            ₹{currentPrice}
          </div>

        </div>

        <div className="rounded-2xl bg-blue-50 p-5 dark:bg-blue-950/20">

          <h3 className="font-bold text-blue-700">
            AI Score
          </h3>

          <div className="mt-3 text-3xl font-bold">
            {aiScore ?? "--"}
          </div>

        </div>

        <div className="rounded-2xl bg-yellow-50 p-5 dark:bg-yellow-950/20">

          <h3 className="font-bold text-yellow-700">
            Recommendation
          </h3>

          <div className="mt-3 text-2xl font-bold">
            AI Generated
          </div>

        </div>

      </div>

    </section>
  );
}