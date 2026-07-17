"use client";

import { useState } from "react";
import { askAI } from "@/lib/ai";

type Props = {
  productName: string;
  summary?: string;
  reviews?: string[];
};

export default function AIQuestionAnswer({
  productName,
  summary = "",
  reviews = [],
}: Props) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function askQuestion() {
    if (!question.trim()) {
      alert("Please enter a question.");
      return;
    }

    try {
      setLoading(true);

      const prompt = `
You are an expert product advisor.

Product:
${productName}

Product Summary:
${summary}

Customer Reviews:
${reviews.join("\n")}

User Question:
${question}

Instructions:

- Answer ONLY using the available information.
- If the information is insufficient, clearly say so.
- Do NOT invent specifications or experiences.
- Be balanced and unbiased.
- Keep the answer under 250 words.
- End with a short recommendation if appropriate.
`;

      const result = await askAI(prompt);

      setAnswer(result);
    } catch (error) {
      console.error(error);

      setAnswer(
        "Sorry, I couldn't answer your question at the moment."
      );
    }

    setLoading(false);
  }

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div>

        <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
          🤖 Ask AI
        </span>

        <h2 className="mt-5 text-3xl font-bold">
          Ask Anything About This Product
        </h2>

        <p className="mt-3 text-gray-500">
          Ask questions about features, performance,
          value, or suitability, and AI will answer
          using the available product information.
        </p>

      </div>

      <div className="mt-8">

        <textarea
          rows={4}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Example: Is this laptop good for programming and video editing?"
          className="w-full rounded-2xl border p-4 outline-none focus:ring-2 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-800"
        />

      </div>

      <div className="mt-6 flex flex-wrap gap-3">

        <button
          type="button"
          onClick={() =>
            setQuestion("Is this product worth buying?")
          }
          className="rounded-full border px-4 py-2 text-sm hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          Worth buying?
        </button>

        <button
          type="button"
          onClick={() =>
            setQuestion("Who should buy this product?")
          }
          className="rounded-full border px-4 py-2 text-sm hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          Who should buy it?
        </button>

        <button
          type="button"
          onClick={() =>
            setQuestion("What are its biggest drawbacks?")
          }
          className="rounded-full border px-4 py-2 text-sm hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          Biggest drawbacks
        </button>

      </div>

      <button
        onClick={askQuestion}
        disabled={loading}
        className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {loading && (

        <div className="py-16 text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>

          <p className="mt-5">
            AI is preparing your answer...
          </p>

        </div>

      )}

      {!loading && answer && (

        <div className="mt-10 rounded-2xl bg-slate-50 p-6 dark:bg-zinc-800">

          <h3 className="mb-4 text-xl font-bold">
            AI Answer
          </h3>

          <div className="whitespace-pre-wrap leading-8">
            {answer}
          </div>

        </div>

      )}

    </section>
  );
}