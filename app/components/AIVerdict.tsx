"use client";

import { useCallback, useEffect, useState } from "react";
import { askAI } from "@/lib/ai";

type Props = {
  productName: string;
  aiScore: number;
  summary?: string;
};

function fallbackVerdict(aiScore: number) {
  if (aiScore >= 90) return "BUY";
  if (aiScore >= 78) return "WAIT";
  return "AVOID";
}

function fallbackConfidence(aiScore: number) {
  return Math.max(60, Math.min(95, aiScore));
}

function buildFallbackVerdict(
  productName: string,
  aiScore: number,
  summary?: string,
) {
  const verdict = fallbackVerdict(aiScore);
  const confidence = fallbackConfidence(aiScore);

  return `VERDICT:
${verdict}

CONFIDENCE:
${confidence}

FINAL OPINION:
Live AI analysis is temporarily unavailable. This preliminary verdict for ${productName} is based on the existing Insightful Reviews score${summary ? " and available product summary" : ""}.`;
}

export default function AIVerdict({
  productName,
  aiScore,
  summary,
}: Props) {
  /*
   * Keep the initial render deterministic on both server and client.
   * This prevents React hydration mismatches caused by an initial
   * loading=true state being rendered differently during hydration.
   */
  const [loading, setLoading] = useState(false);
  const [verdict, setVerdict] = useState("");
  const [liveAI, setLiveAI] = useState(false);

  const generateVerdict = useCallback(async () => {
    setLoading(true);

    try {
      const prompt = `You are an expert product buying advisor.

Product: ${productName}
AI Score: ${aiScore}/100
Summary: ${summary ?? ""}

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
One short paragraph.`;

      const response = await askAI(prompt);

      if (!response || !response.trim()) {
        throw new Error("AI returned an empty response.");
      }

      setVerdict(response.trim());
      setLiveAI(true);
    } catch (error) {
      console.error(
        "Live AI unavailable; using product-score fallback.",
        error,
      );

      setVerdict(
        buildFallbackVerdict(productName, aiScore, summary),
      );
      setLiveAI(false);
    } finally {
      setLoading(false);
    }
  }, [productName, aiScore, summary]);

  /*
   * Generate only after hydration has completed.
   * The server and first client render therefore produce identical HTML.
   */
  useEffect(() => {
    let cancelled = false;

    const timer = window.setTimeout(() => {
      if (!cancelled) {
        void generateVerdict();
      }
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [generateVerdict]);

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            🤖 AI Buying Verdict
          </span>

          <h2 className="mt-5 text-3xl font-bold">
            Buy • Wait • Avoid
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              liveAI
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {liveAI ? "Live AI" : "Score-based fallback"}
          </span>

          <button
            type="button"
            onClick={() => void generateVerdict()}
            disabled={Boolean(loading)}
            className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Generating..." : "Regenerate"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />

          <p className="mt-5">
            Preparing your buying verdict...
          </p>
        </div>
      ) : (
        <div className="mt-8 whitespace-pre-wrap rounded-2xl bg-slate-50 p-6 leading-8 dark:bg-zinc-800">
          {verdict || (
            <div className="text-slate-600 dark:text-slate-300">
              Preparing your buying verdict...
            </div>
          )}
        </div>
      )}
    </section>
  );
}