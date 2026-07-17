"use client";

import {
  Printer,
  Download,
  ShieldCheck,
  Brain,
  IndianRupee,
  BadgeCheck,
} from "lucide-react";

type Props = {
  productName: string;
  category?: string;
  image?: string;

  decision: "BUY" | "WAIT" | "AVOID";

  confidence: number;

  trustScore: number;

  aiScore: number;

  currentPrice?: number;

  reasons: string[];

  buyingGuide?: string;

  pricePrediction?: string;

  pros?: string[];

  cons?: string[];

  timeline?: string;

  qa?: {
    question: string;
    answer: string;
  }[];
};

export default function AIProductReport({
  productName,
  category,
  image,
  decision,
  confidence,
  trustScore,
  aiScore,
  currentPrice,
  reasons,
  buyingGuide,
  pricePrediction,
  pros = [],
  cons = [],
  timeline,
  qa = [],
}: Props) {
  function printReport() {
    window.print();
  }

  const decisionColor =
    decision === "BUY"
      ? "text-green-600"
      : decision === "WAIT"
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <section className="mx-auto max-w-7xl space-y-8 rounded-3xl bg-white p-8 shadow-lg dark:bg-zinc-900">

      {/* HEADER */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-6">

          {image && (
            <img
              src={image}
              alt={productName}
              className="h-36 w-36 rounded-2xl object-cover border"
            />
          )}

          <div>

            <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
              🤖 AI Product Report
            </span>

            <h1 className="mt-5 text-5xl font-bold">
              {productName}
            </h1>

            <p className="mt-2 text-lg text-gray-500">
              {category}
            </p>

          </div>

        </div>

        <div className="flex gap-4">

          <button
            onClick={printReport}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            <Printer size={18} />

            Print Report
          </button>

          <button
            className="flex items-center gap-2 rounded-xl border px-5 py-3 font-semibold hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            <Download size={18} />

            PDF (Coming Soon)
          </button>

        </div>

      </div>

      {/* EXECUTIVE SUMMARY */}

      <div className="rounded-3xl border bg-slate-50 p-8 dark:bg-zinc-800">

        <h2 className="text-3xl font-bold">
          Executive Summary
        </h2>

        <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">

          This report combines AI analysis,
          Trust Score,
          Buying Guide,
          Price Prediction,
          Product Timeline,
          Pros & Cons
          and customer insights
          into a single decision report.

        </p>

      </div>

      {/* SUMMARY CARDS */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

        <SummaryCard
          icon={<BadgeCheck size={28} />}
          title="Decision"
          value={decision}
          color={decisionColor}
        />

        <SummaryCard
          icon={<Brain size={28} />}
          title="AI Confidence"
          value={`${confidence}%`}
        />

        <SummaryCard
          icon={<ShieldCheck size={28} />}
          title="Trust Score"
          value={`${trustScore}/100`}
        />

        <SummaryCard
          icon={<Brain size={28} />}
          title="AI Score"
          value={`${aiScore}/100`}
        />

        <SummaryCard
          icon={<IndianRupee size={28} />}
          title="Current Price"
          value={
            currentPrice
              ? `₹${currentPrice.toLocaleString("en-IN")}`
              : "--"
          }
        />

      </div>

      {/* AI REASONS */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">
          Why AI Reached This Decision
        </h2>

        <ul className="mt-6 space-y-4">

          {reasons.map((reason, index) => (

            <li
              key={index}
              className="flex gap-4"
            >

              <span className="mt-1 text-green-600">
                ✔
              </span>

              <span>{reason}</span>

            </li>

          ))}

        </ul>

      </div>
            {/* BUYING GUIDE */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">
          🤖 AI Buying Guide
        </h2>

        <div className="mt-6 whitespace-pre-wrap leading-8 text-gray-700 dark:text-gray-300">

          {buyingGuide || "Buying guide unavailable."}

        </div>

      </div>

      {/* PRICE PREDICTION */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">
          📈 Price Prediction
        </h2>

        <div className="mt-6 whitespace-pre-wrap leading-8 text-gray-700 dark:text-gray-300">

          {pricePrediction || "Price prediction unavailable."}

        </div>

      </div>

      {/* PROS & CONS */}

      <div className="grid gap-8 lg:grid-cols-2">

        <div className="rounded-3xl border bg-green-50 p-8 dark:bg-green-950/20">

          <h2 className="text-3xl font-bold text-green-700">
            ✅ Pros
          </h2>

          <ul className="mt-6 space-y-4">

            {pros.length === 0 ? (

              <li>No advantages available.</li>

            ) : (

              pros.map((item, index) => (

                <li
                  key={index}
                  className="flex gap-3"
                >
                  <span>✔</span>

                  <span>{item}</span>

                </li>

              ))

            )}

          </ul>

        </div>

        <div className="rounded-3xl border bg-red-50 p-8 dark:bg-red-950/20">

          <h2 className="text-3xl font-bold text-red-700">
            ❌ Cons
          </h2>

          <ul className="mt-6 space-y-4">

            {cons.length === 0 ? (

              <li>No disadvantages available.</li>

            ) : (

              cons.map((item, index) => (

                <li
                  key={index}
                  className="flex gap-3"
                >
                  <span>✖</span>

                  <span>{item}</span>

                </li>

              ))

            )}

          </ul>

        </div>

      </div>

      {/* PRODUCT TIMELINE */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">
          🕒 Product Timeline
        </h2>

        <div className="mt-6 whitespace-pre-wrap leading-8 text-gray-700 dark:text-gray-300">

          {timeline || "Timeline unavailable."}

        </div>

      </div>

      {/* QUICK REPORT */}

      <div className="grid gap-6 md:grid-cols-4">

        <QuickStat
          title="Decision"
          value={decision}
        />

        <QuickStat
          title="Confidence"
          value={`${confidence}%`}
        />

        <QuickStat
          title="Trust Score"
          value={`${trustScore}/100`}
        />

        <QuickStat
          title="AI Score"
          value={`${aiScore}/100`}
        />

      </div>
            {/* QUESTIONS & ANSWERS */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">
          🤖 AI Questions & Answers
        </h2>

        {qa.length === 0 ? (

          <p className="mt-6 text-gray-500">
            No questions available.
          </p>

        ) : (

          <div className="mt-8 space-y-8">

            {qa.map((item, index) => (

              <div
                key={index}
                className="rounded-2xl bg-slate-50 p-6 dark:bg-zinc-800"
              >

                <h3 className="font-bold text-indigo-600">
                  Q. {item.question}
                </h3>

                <p className="mt-4 leading-8">
                  {item.answer}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* FINAL RECOMMENDATION */}

      <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-8 dark:border-indigo-900 dark:bg-indigo-950/20">

        <h2 className="text-4xl font-bold">
          Final Recommendation
        </h2>

        <div className="mt-6 text-2xl font-bold">

          {decision === "BUY" && (
            <span className="text-green-600">
              🟢 BUY
            </span>
          )}

          {decision === "WAIT" && (
            <span className="text-yellow-600">
              🟡 WAIT
            </span>
          )}

          {decision === "AVOID" && (
            <span className="text-red-600">
              🔴 AVOID
            </span>
          )}

        </div>

        <p className="mt-6 leading-8 text-gray-700 dark:text-gray-300">

          This recommendation combines Trust Score,
          AI analysis, review quality,
          pricing context,
          product strengths,
          weaknesses,
          and available buying signals.

        </p>

      </div>

      {/* DISCLAIMER */}

      <div className="rounded-2xl border bg-yellow-50 p-6 dark:bg-yellow-950/20">

        <h3 className="font-bold">
          Disclaimer
        </h3>

        <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">

          AI recommendations are generated using the
          available information at the time of analysis.
          They are intended to assist decision-making,
          not replace independent research. Always verify
          important specifications, pricing, warranty,
          and availability before purchasing.

        </p>

      </div>

      {/* REPORT FOOTER */}

      <div className="border-t pt-8 text-center text-gray-500">

        <p className="font-semibold">
          Generated by AI Product Report
        </p>

        <p className="mt-2">
          © Insightful Reviews • AI Decision Engine
        </p>

      </div>

    </section>

  );
}

function SummaryCard({
  icon,
  title,
  value,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 text-center shadow-sm dark:bg-zinc-800">

      <div className="flex justify-center">
        {icon}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        {title}
      </div>

      <div
        className={`mt-3 text-2xl font-bold ${
          color ?? ""
        }`}
      >
        {value}
      </div>

    </div>
  );
}

function QuickStat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-6 text-center dark:bg-zinc-800">

      <div className="text-sm text-gray-500">
        {title}
      </div>

      <div className="mt-3 text-2xl font-bold">
        {value}
      </div>

    </div>
  );
}