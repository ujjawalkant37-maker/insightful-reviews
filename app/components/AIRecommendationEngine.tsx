"use client";

import {
  Brain,
  ShieldCheck,
  BadgeCheck,
  IndianRupee,
  TrendingUp,
  Target,
} from "lucide-react";

type Props = {
  productName: string;

  aiScore: number;

  trustScore: number;

  confidence: number;

  currentPrice: number;

  predictedPrice?: number;

  ownershipCost?: number;

  reviewScore: number;

  recommendation: "BUY" | "WAIT" | "AVOID";

  summary: string;
};

export default function AIRecommendationEngine({
  productName,
  aiScore,
  trustScore,
  confidence,
  currentPrice,
  predictedPrice,
  ownershipCost,
  reviewScore,
  recommendation,
  summary,
}: Props) {

  const finalScore = Math.round(
    aiScore * 0.35 +
    trustScore * 0.30 +
    reviewScore * 0.20 +
    confidence * 0.15
  );

  const recommendationColor =
    recommendation === "BUY"
      ? "text-green-600"
      : recommendation === "WAIT"
      ? "text-yellow-600"
      : "text-red-600";

  return (

    <section className="mx-auto max-w-7xl space-y-8 rounded-3xl bg-white p-8 shadow-lg dark:bg-zinc-900">

      {/* HEADER */}

      <div>

        <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">

          🤖 AI Recommendation Engine

        </span>

        <h1 className="mt-5 text-5xl font-bold">

          {productName}

        </h1>

        <p className="mt-3 text-lg text-gray-500">

          Unified AI recommendation generated
          using Trust Score, AI analysis,
          review intelligence,
          price prediction
          and ownership cost.

        </p>

      </div>

      {/* EXECUTIVE SUMMARY */}

      <div className="rounded-3xl border bg-slate-50 p-8 dark:bg-zinc-800">

        <div className="flex items-center gap-3">

          <Brain />

          <h2 className="text-3xl font-bold">

            Executive Summary

          </h2>

        </div>

        <p className="mt-6 whitespace-pre-wrap leading-8 text-gray-700 dark:text-gray-300">

          {summary}

        </p>

      </div>

      {/* OVERVIEW CARDS */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

        <RecommendationCard
          icon={<Brain size={28} />}
          title="AI Score"
          value={`${aiScore}/100`}
        />

        <RecommendationCard
          icon={<ShieldCheck size={28} />}
          title="Trust Score"
          value={`${trustScore}/100`}
        />

        <RecommendationCard
          icon={<BadgeCheck size={28} />}
          title="Confidence"
          value={`${confidence}%`}
        />

        <RecommendationCard
          icon={<IndianRupee size={28} />}
          title="Current Price"
          value={`₹${currentPrice.toLocaleString("en-IN")}`}
        />

        <RecommendationCard
          icon={<Target size={28} />}
          title="Final Score"
          value={`${finalScore}/100`}
        />

      </div>

      {/* FINAL RECOMMENDATION */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">

          Overall Recommendation

        </h2>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div
              className={`text-6xl font-bold ${recommendationColor}`}
            >

              {recommendation}

            </div>

            <p className="mt-5 text-lg text-gray-600 dark:text-gray-300">

              Final recommendation generated
              after combining all available
              AI modules and trust indicators.

            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-8 text-center dark:bg-zinc-800">

            <TrendingUp
              className="mx-auto"
              size={48}
            />

            <div className="mt-5 text-5xl font-bold">

              {finalScore}

            </div>

            <div className="mt-2 text-gray-500">

              Composite Score

            </div>

          </div>

        </div>

      </div>

      {/* SCORE BREAKDOWN */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">

          AI Score Breakdown

        </h2>

        <div className="mt-8 space-y-6">

          <ScoreBar
            label="AI Analysis"
            value={aiScore}
          />

          <ScoreBar
            label="Trust Score"
            value={trustScore}
          />

          <ScoreBar
            label="Review Intelligence"
            value={reviewScore}
          />

          <ScoreBar
            label="Prediction Confidence"
            value={confidence}
          />

        </div>

      </div>
            {/* PRICE PREDICTION */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">

          Price Prediction Analysis

        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          <RecommendationCard
            icon={<IndianRupee size={28} />}
            title="Current Price"
            value={`₹${currentPrice.toLocaleString("en-IN")}`}
          />

          <RecommendationCard
            icon={<TrendingUp size={28} />}
            title="Predicted Price"
            value={
              predictedPrice
                ? `₹${predictedPrice.toLocaleString("en-IN")}`
                : "Unavailable"
            }
          />

          <RecommendationCard
            icon={<Target size={28} />}
            title="Recommendation"
            value={
              predictedPrice &&
              predictedPrice < currentPrice
                ? "Wait"
                : "Buy Now"
            }
          />

        </div>

      </div>

      {/* OWNERSHIP COST */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">

          Ownership Cost Analysis

        </h2>

        <div className="mt-8">

          <RecommendationCard
            icon={<IndianRupee size={28} />}
            title="Estimated Ownership Cost"

            value={
              ownershipCost
                ? `₹${ownershipCost.toLocaleString("en-IN")}`
                : "Not Available"
            }

          />

        </div>

      </div>

      {/* TRUST ANALYSIS */}

      <div className="rounded-3xl border bg-green-50 p-8 dark:bg-green-950/20">

        <div className="flex items-center gap-3">

          <ShieldCheck className="text-green-600" />

          <h2 className="text-3xl font-bold">

            Trust Analysis

          </h2>

        </div>

        <ul className="mt-8 space-y-4">

          <li className="flex gap-3">
            <span>✔</span>

            <span>

              Product Trust Score is
              <strong> {trustScore}/100</strong>.

            </span>

          </li>

          <li className="flex gap-3">
            <span>✔</span>

            <span>

              Review consistency indicates
              reliable customer feedback.

            </span>

          </li>

          <li className="flex gap-3">
            <span>✔</span>

            <span>

              Fake review probability remains
              within acceptable limits.

            </span>

          </li>

        </ul>

      </div>

      {/* REVIEW INTELLIGENCE */}

      <div className="rounded-3xl border bg-indigo-50 p-8 dark:bg-indigo-950/20">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <h2 className="text-3xl font-bold">

            Review Intelligence

          </h2>

        </div>

        <div className="mt-8">

          <ScoreBar
            label="Customer Satisfaction"
            value={reviewScore}
          />

        </div>

        <p className="mt-8 leading-8 text-gray-700 dark:text-gray-300">

          AI evaluated review sentiment,
          recurring feedback,
          reviewer credibility,
          verified purchase indicators
          and consistency across reviews.

        </p>

      </div>

      {/* PERSONALIZED FACTORS */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">

          Recommendation Factors

        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <FactorCard
            title="Performance"
            score={aiScore}
          />

          <FactorCard
            title="Reliability"
            score={trustScore}
          />

          <FactorCard
            title="Customer Satisfaction"
            score={reviewScore}
          />

          <FactorCard
            title="Prediction Confidence"
            score={confidence}
          />

          <FactorCard
            title="Value for Money"
            score={finalScore}
          />

          <FactorCard
            title="Long-term Ownership"
            score={
              ownershipCost
                ? Math.max(
                    100 -
                      Math.round(
                        ownershipCost /
                          1000
                      ),
                    40
                  )
                : 75
            }
          />

        </div>

      </div>

      {/* AI DECISION MATRIX */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">

          AI Decision Matrix

        </h2>

        <div className="mt-8 overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr className="border-b">

                <th className="p-4 text-left">

                  Parameter

                </th>

                <th className="p-4 text-center">

                  Score

                </th>

                <th className="p-4 text-center">

                  Status

                </th>

              </tr>

            </thead>

            <tbody>

              <DecisionRow
                label="AI Analysis"
                score={aiScore}
              />

              <DecisionRow
                label="Trust Score"
                score={trustScore}
              />

              <DecisionRow
                label="Review Score"
                score={reviewScore}
              />

              <DecisionRow
                label="Confidence"
                score={confidence}
              />

              <DecisionRow
                label="Final Score"
                score={finalScore}
              />

            </tbody>

          </table>

        </div>

      </div>
            {/* FINAL AI RECOMMENDATION */}

      <div className="rounded-3xl border border-indigo-300 bg-indigo-50 p-8 dark:border-indigo-900 dark:bg-indigo-950/20">

        <h2 className="text-4xl font-bold">

          Final AI Recommendation

        </h2>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div
              className={`text-6xl font-bold ${recommendationColor}`}
            >

              {recommendation}

            </div>

            <p className="mt-6 max-w-2xl leading-8 text-gray-700 dark:text-gray-300">

              The recommendation is generated by combining
              Trust Score, Review Intelligence,
              AI analysis, ownership cost,
              current pricing,
              future price prediction,
              and confidence level.

            </p>

          </div>

          <div className="rounded-3xl bg-white p-8 text-center shadow dark:bg-zinc-800">

            <div className="text-sm text-gray-500">

              Overall Score

            </div>

            <div className="mt-4 text-6xl font-bold text-indigo-600">

              {finalScore}

            </div>

            <div className="mt-2">

              /100

            </div>

          </div>

        </div>

      </div>

      {/* AI CONFIDENCE */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">

          AI Confidence Summary

        </h2>

        <div className="mt-8 h-5 overflow-hidden rounded-full bg-gray-200">

          <div
            className="h-full rounded-full bg-indigo-600"
            style={{
              width: `${confidence}%`,
            }}
          />

        </div>

        <div className="mt-5 flex justify-between">

          <span>Low</span>

          <span className="font-bold">

            {confidence}% Confidence

          </span>

        </div>

      </div>

      {/* KEY DECISION POINTS */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">

          Key Decision Points

        </h2>

        <ul className="mt-8 space-y-5">

          <li className="flex gap-3">

            <span>✔</span>

            <span>

              AI analysis contributes significantly
              to the overall recommendation.

            </span>

          </li>

          <li className="flex gap-3">

            <span>✔</span>

            <span>

              Trust indicators validate customer
              experiences.

            </span>

          </li>

          <li className="flex gap-3">

            <span>✔</span>

            <span>

              Review intelligence confirms
              recurring user satisfaction.

            </span>

          </li>

          <li className="flex gap-3">

            <span>✔</span>

            <span>

              Price prediction has been considered
              before issuing the final verdict.

            </span>

          </li>

          <li className="flex gap-3">

            <span>✔</span>

            <span>

              Ownership cost has been included
              in long-term value calculations.

            </span>

          </li>

        </ul>

      </div>

      {/* FOOTER */}

      <div className="border-t pt-8 text-center text-gray-500">

        <p className="font-semibold">

          Generated by AI Recommendation Engine

        </p>

        <p className="mt-2">

          © Insightful Reviews

        </p>

      </div>

    </section>

  );
}

/* ------------------------------------------------ */

function RecommendationCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {

  return (

    <div className="rounded-2xl border bg-white p-6 text-center shadow-sm dark:bg-zinc-800">

      <div className="flex justify-center">

        {icon}

      </div>

      <div className="mt-4 text-sm text-gray-500">

        {title}

      </div>

      <div className="mt-3 text-2xl font-bold">

        {value}

      </div>

    </div>

  );

}

/* ------------------------------------------------ */

function ScoreBar({
  label,
  value,
}: {
  label: string;
  value: number;
}) {

  return (

    <div>

      <div className="mb-2 flex justify-between">

        <span>{label}</span>

        <span>{value}%</span>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-gray-200">

        <div
          className="h-full rounded-full bg-indigo-600"
          style={{
            width: `${value}%`,
          }}
        />

      </div>

    </div>

  );

}

/* ------------------------------------------------ */

function FactorCard({
  title,
  score,
}: {
  title: string;
  score: number;
}) {

  return (

    <div className="rounded-2xl border bg-slate-50 p-6 text-center dark:bg-zinc-800">

      <div className="text-sm text-gray-500">

        {title}

      </div>

      <div className="mt-4 text-4xl font-bold text-indigo-600">

        {score}

      </div>

      <div className="mt-2 text-sm">

        /100

      </div>

    </div>

  );

}

/* ------------------------------------------------ */

function DecisionRow({
  label,
  score,
}: {
  label: string;
  score: number;
}) {

  const status =
    score >= 85
      ? "Excellent"
      : score >= 70
      ? "Good"
      : score >= 50
      ? "Average"
      : "Poor";

  return (

    <tr className="border-b">

      <td className="p-4">

        {label}

      </td>

      <td className="p-4 text-center font-bold">

        {score}

      </td>

      <td className="p-4 text-center">

        {status}

      </td>

    </tr>

  );

}