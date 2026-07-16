"use client";

import { useState } from "react";

export default function AITestPage() {
  const [loading, setLoading] = useState(false);

  const [prompt, setPrompt] = useState(
    "Should I buy Samsung Galaxy S25 Ultra?"
  );

  const [response, setResponse] = useState("");

  const [error, setError] = useState("");

  async function runAI() {
    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await fetch("/api/ai", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Unknown error"
        );
      }

      setResponse(data.response);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950">

      <div className="mx-auto max-w-5xl px-6 py-12">

        <h1 className="text-5xl font-bold">
          🤖 AI Test Console
        </h1>

        <p className="mt-3 text-gray-500">
          Test your OpenAI integration before using it
          across the website.
        </p>

        <div className="mt-10 rounded-2xl border bg-white p-8 shadow dark:border-zinc-800 dark:bg-zinc-900">

          <label className="mb-3 block font-semibold">
            Prompt
          </label>

          <textarea
            rows={8}
            value={prompt}
            onChange={(e) =>
              setPrompt(e.target.value)
            }
            className="w-full rounded-xl border p-4 dark:border-zinc-700 dark:bg-zinc-800"
          />

          <button
            onClick={runAI}
            disabled={loading}
            className="mt-6 rounded-xl bg-indigo-600 px-8 py-4 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading
              ? "Thinking..."
              : "Ask AI"}
          </button>

        </div>

        {error && (

          <div className="mt-8 rounded-xl bg-red-100 p-6 text-red-700">

            <h2 className="mb-2 text-xl font-bold">
              Error
            </h2>

            {error}

          </div>

        )}

        {response && (

          <div className="mt-8 rounded-2xl border bg-white p-8 shadow dark:border-zinc-800 dark:bg-zinc-900">

            <h2 className="mb-5 text-2xl font-bold">
              AI Response
            </h2>

            <pre className="whitespace-pre-wrap leading-8">
              {response}
            </pre>

          </div>

        )}

      </div>

    </main>
  );
}