"use client";

import { useEffect, useState } from "react";
import { askAI } from "@/lib/ai";

type Props = {
  productName: string;
  summary?: string;
  reviews?: string[];
};

export default function AIProsCons({
  productName,
  summary = "",
  reviews = [],
}: Props) {
  const [loading, setLoading] = useState(true);
  const [pros, setPros] = useState<string[]>([]);
  const [cons, setCons] = useState<string[]>([]);

  useEffect(() => {
    generateProsCons();
  }, [productName]);

  async function generateProsCons() {
    try {
      setLoading(true);

      const prompt = `
You are an expert product analyst.

Product:
${productName}

Summary:
${summary}

Reviews:
${reviews.join("\n")}

Generate balanced Pros and Cons.

Rules:

- Only use available information.
- Do not invent facts.
- Maximum 6 Pros.
- Maximum 6 Cons.
- Keep every point under 12 words.

Return EXACTLY in this format.

PROS
- item
- item
- item

CONS
- item
- item
- item
`;

      const response = await askAI(prompt);

      const lines = response
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      const prosList: string[] = [];
      const consList: string[] = [];

      let mode: "pros" | "cons" | null = null;

      for (const line of lines) {
        const upper = line.toUpperCase();

        if (upper === "PROS") {
          mode = "pros";
          continue;
        }

        if (upper === "CONS") {
          mode = "cons";
          continue;
        }

        if (line.startsWith("-")) {
          const item = line.replace("-", "").trim();

          if (mode === "pros") {
            prosList.push(item);
          }

          if (mode === "cons") {
            consList.push(item);
          }
        }
      }

      setPros(prosList);
      setCons(consList);

    } catch (error) {
      console.error(error);

      setPros(["Unable to generate pros."]);
      setCons(["Unable to generate cons."]);
    }

    setLoading(false);
  }

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex items-center justify-between">

        <div>

          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            🤖 AI Pros & Cons
          </span>

          <h2 className="mt-5 text-3xl font-bold">
            Strengths & Weaknesses
          </h2>

          <p className="mt-3 text-gray-500">
            AI summarizes the most important advantages and disadvantages.
          </p>

        </div>

        <button
          onClick={generateProsCons}
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Regenerate"}
        </button>

      </div>

      {loading ? (

        <div className="py-20 text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>

          <p className="mt-5">
            AI is analyzing reviews...
          </p>

        </div>

      ) : (

        <div className="mt-10 grid gap-8 md:grid-cols-2">

          <div className="rounded-2xl bg-green-50 p-6 dark:bg-green-950/20">

            <h3 className="mb-5 text-2xl font-bold text-green-700">
              ✅ Pros
            </h3>

            <ul className="space-y-3">

              {pros.map((item, index) => (

                <li
                  key={index}
                  className="flex gap-3"
                >
                  <span>✔</span>

                  <span>{item}</span>

                </li>

              ))}

            </ul>

          </div>

          <div className="rounded-2xl bg-red-50 p-6 dark:bg-red-950/20">

            <h3 className="mb-5 text-2xl font-bold text-red-700">
              ❌ Cons
            </h3>

            <ul className="space-y-3">

              {cons.map((item, index) => (

                <li
                  key={index}
                  className="flex gap-3"
                >
                  <span>✖</span>

                  <span>{item}</span>

                </li>

              ))}

            </ul>

          </div>

        </div>

      )}

    </section>
  );
}