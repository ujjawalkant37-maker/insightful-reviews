import React from "react";

type Props = {
  score: number;
};

function getVerdict(score: number) {
  if (score >= 95) {
    return {
      verdict: "BUY",
      color: "bg-green-600",
      confidence: 98,
      risk: "Very Low",
      value: 97,
      reliability: 98,
      description:
        "Outstanding product with excellent long-term value and reliability.",
    };
  }

  if (score >= 90) {
    return {
      verdict: "BUY",
      color: "bg-green-500",
      confidence: 95,
      risk: "Low",
      value: 94,
      reliability: 95,
      description:
        "Highly recommended for most buyers with very few compromises.",
    };
  }

  if (score >= 82) {
    return {
      verdict: "WAIT",
      color: "bg-yellow-500",
      confidence: 87,
      risk: "Medium",
      value: 86,
      reliability: 88,
      description:
        "Good overall product. Consider buying during sales or after price drops.",
    };
  }

  return {
    verdict: "AVOID",
    color: "bg-red-600",
    confidence: 72,
    risk: "High",
    value: 65,
    reliability: 68,
    description:
      "Better alternatives are available in the current market.",
  };
}

function Meter({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div>

      <div className="mb-2 flex justify-between text-sm">

        <span>{label}</span>

        <span className="font-semibold">
          {value}/100
        </span>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-gray-200 dark:bg-zinc-700">

        <div
          className={`${color} h-full rounded-full`}
          style={{ width: `${value}%` }}
        />

      </div>

    </div>
  );
}

export default function AIVerdict({
  score,
}: Props) {
  const ai = getVerdict(score);

  return (
    <section className="mt-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            🤖 AI Buying Recommendation
          </span>

          <h2 className="mt-5 text-3xl font-bold">
            Buy • Wait • Avoid
          </h2>

          <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
            Our AI analysed specifications,
            expert reviews,
            user feedback,
            reliability,
            long-term ownership,
            and value for money.
          </p>

        </div>

        <div className="text-center">

          <div className="text-6xl font-extrabold text-indigo-600">
            {score}
          </div>

          <div className="text-lg text-gray-500">
            AI Score
          </div>

          <div
            className={`mt-5 rounded-full px-8 py-3 text-xl font-bold text-white ${ai.color}`}
          >
            {ai.verdict}
          </div>

        </div>

      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">

        <div className="space-y-6">

          <Meter
            label="AI Confidence"
            value={ai.confidence}
            color="bg-indigo-600"
          />

          <Meter
            label="Value For Money"
            value={ai.value}
            color="bg-green-600"
          />

          <Meter
            label="Long-Term Reliability"
            value={ai.reliability}
            color="bg-blue-600"
          />

        </div>

        <div className="rounded-2xl bg-gray-50 p-6 dark:bg-zinc-800">

          <h3 className="text-xl font-bold">
            Decision Summary
          </h3>

          <p className="mt-4 leading-7 text-gray-600 dark:text-gray-300">
            {ai.description}
          </p>

          <div className="mt-8 space-y-4">

            <div className="flex justify-between">

              <span>Risk Level</span>

              <span className="font-bold">
                {ai.risk}
              </span>

            </div>

            <div className="flex justify-between">

              <span>AI Confidence</span>

              <span className="font-bold">
                {ai.confidence}%
              </span>

            </div>

            <div className="flex justify-between">

              <span>Overall Recommendation</span>

              <span className="font-bold text-indigo-600">
                {ai.verdict}
              </span>

            </div>

          </div>

        </div>

      </div>

      <div className="mt-10 rounded-2xl bg-indigo-50 p-6 dark:bg-zinc-800">

        <h3 className="font-bold text-indigo-700 dark:text-indigo-300">
          AI Advice
        </h3>

        <ul className="mt-4 space-y-3 text-gray-700 dark:text-gray-300">

          <li>✅ Compare this product with similar alternatives before buying.</li>

          <li>✅ Check the latest price history for better deals.</li>

          <li>✅ Read verified user reviews for real-world experiences.</li>

          <li>✅ Consider warranty, service availability and software support.</li>

        </ul>

      </div>

    </section>
  );
}