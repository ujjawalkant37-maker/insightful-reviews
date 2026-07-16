"use client";

import { useState } from "react";
import { askAI } from "@/lib/ai";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function AIReviewWriter({
  value,
  onChange,
}: Props) {
  const [loading, setLoading] = useState(false);

  async function improveReview() {
    if (!value.trim()) {
      alert("Write your review first.");
      return;
    }

    try {
      setLoading(true);

      const prompt = `
You are an expert review editor.

Improve the following product review.

Rules:

- Keep it honest.
- Do NOT invent facts.
- Correct grammar.
- Improve readability.
- Make it SEO friendly.
- Keep the same meaning.
- Return only the improved review.

Review:

${value}
`;

      const improved = await askAI(prompt);

      onChange(improved);

    } catch (error) {
      console.error(error);

      alert("Unable to improve review.");
    }

    setLoading(false);
  }

  async function shortenReview() {
    if (!value.trim()) return;

    try {
      setLoading(true);

      const result = await askAI(`
Shorten this review while keeping all important information.

${value}
`);

      onChange(result);

    } finally {
      setLoading(false);
    }
  }

  async function expandReview() {
    if (!value.trim()) return;

    try {
      setLoading(true);

      const result = await askAI(`
Expand this review into a detailed product review.

Do not invent facts.

${value}
`);

      onChange(result);

    } finally {
      setLoading(false);
    }
  }

  async function fixGrammar() {
    if (!value.trim()) return;

    try {
      setLoading(true);

      const result = await askAI(`
Correct grammar and punctuation only.

Do not change meaning.

${value}
`);

      onChange(result);

    } finally {
      setLoading(false);
    }
  }

  async function makeProfessional() {
    if (!value.trim()) return;

    try {
      setLoading(true);

      const result = await askAI(`
Rewrite this review professionally.

Do not invent information.

${value}
`);

      onChange(result);

    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-8 rounded-3xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            🤖 AI Review Assistant
          </span>

          <h2 className="mt-4 text-2xl font-bold">
            Improve Your Review
          </h2>

        </div>

        {loading && (
          <div className="font-medium text-indigo-600">
            AI is writing...
          </div>
        )}

      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">

        <button
          type="button"
          disabled={loading}
          onClick={improveReview}
          className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          ✨ Improve
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={expandReview}
          className="rounded-xl border px-5 py-3 hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-800 disabled:opacity-50"
        >
          📖 Expand
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={shortenReview}
          className="rounded-xl border px-5 py-3 hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-800 disabled:opacity-50"
        >
          ✂ Shorten
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={fixGrammar}
          className="rounded-xl border px-5 py-3 hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-800 disabled:opacity-50"
        >
          ✅ Grammar
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={makeProfessional}
          className="rounded-xl border px-5 py-3 hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-800 disabled:opacity-50"
        >
          💼 Professional
        </button>

      </div>

      <p className="mt-6 text-sm text-gray-500">
        AI only improves writing quality. It should never add experiences
        you didn't actually have.
      </p>

    </section>
  );
}