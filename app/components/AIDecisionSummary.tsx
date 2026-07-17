"use client";

type Props = {
  decision: "BUY" | "WAIT" | "AVOID";
  confidence: number;
  trustScore: number;
  aiScore: number;
  price?: number | string;
  reasons: string[];
};

export default function AIDecisionSummary({
  decision,
  confidence,
  trustScore,
  aiScore,
  price,
  reasons,
}: Props) {
  const config = getDecisionConfig(decision);

  return (
    <section
      className={`rounded-3xl border p-8 shadow-sm ${config.bg}`}
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${config.badge}`}
          >
            🤖 AI Executive Summary
          </span>

          <h2 className="mt-5 text-4xl font-bold">
            {config.icon} {decision}
          </h2>

          <p className="mt-3 max-w-2xl leading-8 text-gray-700 dark:text-gray-300">
            This summary combines AI analysis,
            Trust Score, product quality,
            available review data and buying
            signals into one quick recommendation.
          </p>

        </div>

        <div
          className={`rounded-3xl border p-8 text-center ${config.card}`}
        >

          <div className="text-sm text-gray-500">
            AI Confidence
          </div>

          <div className="mt-3 text-5xl font-bold">
            {confidence}%
          </div>

        </div>

      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-4">

        <Metric
          label="Trust Score"
          value={`${trustScore}/100`}
        />

        <Metric
          label="AI Score"
          value={`${aiScore}/100`}
        />

        <Metric
          label="Decision"
          value={decision}
        />

        <Metric
          label="Current Price"
          value={
            price !== undefined
              ? `₹${price}`
              : "--"
          }
        />

      </div>

      <div className="mt-10 rounded-2xl bg-white/60 p-6 backdrop-blur dark:bg-zinc-900/50">

        <h3 className="text-xl font-bold">
          Why did AI reach this decision?
        </h3>

        <ul className="mt-5 space-y-3">

          {reasons.map((reason, index) => (

            <li
              key={index}
              className="flex gap-3"
            >
              <span>✔</span>

              <span>{reason}</span>

            </li>

          ))}

        </ul>

      </div>

      <div
        className={`mt-10 rounded-2xl border p-6 ${config.card}`}
      >

        <h3 className="text-2xl font-bold">
          Final Recommendation
        </h3>

        <p className="mt-4 leading-8">

          {decision === "BUY" &&
            "The available information strongly supports purchasing this product. It offers good overall value and reliability based on current data."}

          {decision === "WAIT" &&
            "The product appears promising, but waiting for a better price, additional reviews, or future updates may be beneficial."}

          {decision === "AVOID" &&
            "Current information suggests caution. Consider alternatives or gather more reliable information before making a purchase."}

        </p>

      </div>

    </section>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 text-center shadow-sm dark:bg-zinc-800">

      <div className="text-sm text-gray-500">
        {label}
      </div>

      <div className="mt-3 text-2xl font-bold">
        {value}
      </div>

    </div>
  );
}

function getDecisionConfig(
  decision: "BUY" | "WAIT" | "AVOID"
) {
  switch (decision) {
    case "BUY":
      return {
        icon: "🟢",
        bg: "bg-green-50 dark:bg-green-950/20",
        badge:
          "bg-green-100 text-green-700",
        card:
          "border-green-200 bg-green-100/40 dark:border-green-800",
      };

    case "WAIT":
      return {
        icon: "🟡",
        bg: "bg-yellow-50 dark:bg-yellow-950/20",
        badge:
          "bg-yellow-100 text-yellow-700",
        card:
          "border-yellow-200 bg-yellow-100/40 dark:border-yellow-800",
      };

    default:
      return {
        icon: "🔴",
        bg: "bg-red-50 dark:bg-red-950/20",
        badge:
          "bg-red-100 text-red-700",
        card:
          "border-red-200 bg-red-100/40 dark:border-red-800",
      };
  }
}