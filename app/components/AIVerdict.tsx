"use client";

import { useEffect, useState } from "react";
import { askAI } from "@/lib/ai";

type Props = {
  productName: string;
  aiScore: number;
  summary?: string;
};

export default function AIVerdict({
  productName,
  aiScore,
  summary,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [verdict, setVerdict] = useState("");

  useEffect(() => {
    generateVerdict();
  }, [productName]);

  async function generateVerdict() {
    try {
      setLoading(true);

      const prompt = `
You are an expert product buying advisor.

Product:
${productName}

AI Score:
${aiScore}/100

Summary:
${summary ?? ""}

Give your answer in exactly this format:

VERDICT:
BUY / WAIT / AVOID

CONFIDENCE:
0-100

PROS:
- ...

CONS:
- ...

FINAL OPINION:
One short paragraph.

`;

      const response = await askAI(prompt);

      setVerdict(response);
    } catch (error) {
      console.error(error);

      setVerdict(
        "Unable to generate AI verdict at the moment."
      );
    }

    setLoading(false);
  }

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex items-center justify-between">

        <div>

          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            🤖 AI Buying Verdict
          </span>

          <h2 className="mt-5 text-3xl font-bold">
            Buy • Wait • Avoid
          </h2>

        </div>

        <button
          onClick={generateVerdict}
          className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Regenerate
        </button>

      </div>

      {loading ? (

        <div className="py-20 text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>

          <p className="mt-5">
            AI is evaluating this product...
          </p>

        </div>

      ) : (

        <div className="mt-8 whitespace-pre-wrap rounded-2xl bg-slate-50 p-6 leading-8 dark:bg-zinc-800">

          {verdict}

        </div>

      )}

    </section>
  );
}