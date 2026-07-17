"use client";

import {
  Brain,
  MessageSquare,
  Smile,
  Frown,
  Star,
  BarChart3,
} from "lucide-react";

type RatingDistribution = {
  five: number;
  four: number;
  three: number;
  two: number;
  one: number;
};

type Props = {
  productName: string;

  totalReviews: number;

  averageRating: number;

  sentimentScore: number;

  aiSummary: string;

  ratingDistribution: RatingDistribution;
};

export default function AIReviewInsights({
  productName,
  totalReviews,
  averageRating,
  sentimentScore,
  aiSummary,
  ratingDistribution,
}: Props) {

  const total =
    ratingDistribution.five +
    ratingDistribution.four +
    ratingDistribution.three +
    ratingDistribution.two +
    ratingDistribution.one;

  function percentage(value: number) {
    if (total === 0) return 0;

    return Math.round(
      (value / total) * 100
    );
  }

  return (

    <section className="mx-auto max-w-7xl space-y-8 rounded-3xl bg-white p-8 shadow-lg dark:bg-zinc-900">

      {/* HEADER */}

      <div>

        <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">

          🤖 AI Review Insights

        </span>

        <h1 className="mt-5 text-5xl font-bold">

          {productName}

        </h1>

        <p className="mt-3 text-lg text-gray-500">

          AI analysis of customer reviews,
          ratings,
          sentiment,
          recurring themes
          and buying confidence.

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

          {aiSummary}

        </p>

      </div>

      {/* OVERVIEW CARDS */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <InsightCard
          icon={<MessageSquare size={28} />}
          title="Total Reviews"
          value={totalReviews.toLocaleString()}
        />

        <InsightCard
          icon={<Star size={28} />}
          title="Average Rating"
          value={`${averageRating.toFixed(1)} / 5`}
        />

        <InsightCard
          icon={<Smile size={28} />}
          title="Sentiment Score"
          value={`${sentimentScore}/100`}
        />

        <InsightCard
          icon={<BarChart3 size={28} />}
          title="Review Quality"
          value={
            sentimentScore >= 85
              ? "Excellent"
              : sentimentScore >= 70
              ? "Very Good"
              : sentimentScore >= 50
              ? "Average"
              : "Poor"
          }
        />

      </div>

      {/* SENTIMENT */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">

          Overall Sentiment

        </h2>

        <div className="mt-8 h-5 overflow-hidden rounded-full bg-gray-200">

          <div
            className="h-full rounded-full bg-green-600"
            style={{
              width: `${sentimentScore}%`,
            }}
          />

        </div>

        <div className="mt-5 flex items-center justify-between">

          <span className="text-gray-500">

            Negative

          </span>

          <span className="font-bold">

            {sentimentScore}% Positive

          </span>

        </div>

      </div>

      {/* RATING DISTRIBUTION */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">

          Rating Distribution

        </h2>

        <div className="mt-8 space-y-6">

          <RatingBar
            stars="5 Stars"
            count={ratingDistribution.five}
            percent={percentage(
              ratingDistribution.five
            )}
          />

          <RatingBar
            stars="4 Stars"
            count={ratingDistribution.four}
            percent={percentage(
              ratingDistribution.four
            )}
          />

          <RatingBar
            stars="3 Stars"
            count={ratingDistribution.three}
            percent={percentage(
              ratingDistribution.three
            )}
          />

          <RatingBar
            stars="2 Stars"
            count={ratingDistribution.two}
            percent={percentage(
              ratingDistribution.two
            )}
          />

          <RatingBar
            stars="1 Star"
            count={ratingDistribution.one}
            percent={percentage(
              ratingDistribution.one
            )}
          />

        </div>

      </div>
            {/* POSITIVE THEMES */}

      <div className="rounded-3xl border bg-green-50 p-8 dark:bg-green-950/20">

        <div className="flex items-center gap-3">

          <Smile className="text-green-600" />

          <h2 className="text-3xl font-bold">

            Top Positive Themes

          </h2>

        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">

          <ThemeCard text="Excellent build quality" />

          <ThemeCard text="Outstanding battery backup" />

          <ThemeCard text="Smooth overall performance" />

          <ThemeCard text="Excellent display quality" />

          <ThemeCard text="Fast charging support" />

          <ThemeCard text="Great camera performance" />

        </div>

      </div>

      {/* NEGATIVE THEMES */}

      <div className="rounded-3xl border bg-red-50 p-8 dark:bg-red-950/20">

        <div className="flex items-center gap-3">

          <Frown className="text-red-600" />

          <h2 className="text-3xl font-bold">

            Common Negative Themes

          </h2>

        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">

          <ThemeCard text="Premium pricing" />

          <ThemeCard text="Average low-light camera" />

          <ThemeCard text="Occasional software bugs" />

          <ThemeCard text="Heating during gaming" />

          <ThemeCard text="Limited accessories included" />

          <ThemeCard text="Slow customer support" />

        </div>

      </div>

      {/* COMMON COMPLAINTS */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">

          Most Frequent Complaints

        </h2>

        <div className="mt-8 space-y-5">

          <ComplaintItem
            title="Battery drains quickly during gaming"
            frequency={72}
          />

          <ComplaintItem
            title="Phone heats while charging"
            frequency={64}
          />

          <ComplaintItem
            title="Camera struggles at night"
            frequency={48}
          />

          <ComplaintItem
            title="Software update introduced bugs"
            frequency={34}
          />

        </div>

      </div>

      {/* MOST APPRECIATED FEATURES */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">

          Most Appreciated Features

        </h2>

        <div className="mt-8 space-y-5">

          <PraiseItem
            title="Beautiful AMOLED display"
            popularity={96}
          />

          <PraiseItem
            title="Very smooth performance"
            popularity={94}
          />

          <PraiseItem
            title="Excellent battery life"
            popularity={91}
          />

          <PraiseItem
            title="Premium design"
            popularity={88}
          />

        </div>

      </div>

      {/* KEYWORD ANALYSIS */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">

          AI Keyword Analysis

        </h2>

        <div className="mt-8 flex flex-wrap gap-4">

          {[
            "Battery",
            "Camera",
            "Performance",
            "Gaming",
            "Display",
            "Charging",
            "Software",
            "Value",
            "Design",
            "Quality",
            "Processor",
            "Heating",
            "Updates",
            "Price",
            "Speaker",
            "Network",
          ].map((keyword) => (

            <span
              key={keyword}
              className="rounded-full bg-indigo-100 px-5 py-3 text-sm font-semibold text-indigo-700"
            >
              {keyword}
            </span>

          ))}

        </div>

      </div>

      {/* TRUST INDICATORS */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">

          Trust Indicators

        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <TrustCard
            title="Verified Reviews"
            value="91%"
          />

          <TrustCard
            title="Helpful Reviews"
            value="84%"
          />

          <TrustCard
            title="Review Consistency"
            value="95%"
          />

          <TrustCard
            title="Spam Detection"
            value="Very Low"
          />

        </div>

      </div>

      {/* REVIEW PATTERN */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">

          Review Pattern Analysis

        </h2>

        <p className="mt-6 leading-8 text-gray-700 dark:text-gray-300">

          AI detected consistent feedback across most
          reviewers. Positive experiences are largely
          related to display quality, battery life and
          overall performance, while recurring complaints
          mainly involve premium pricing, occasional
          software issues and heating during intensive
          gaming sessions.

        </p>

      </div>
            {/* BUYING CONFIDENCE */}

      <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-8 dark:border-indigo-900 dark:bg-indigo-950/20">

        <h2 className="text-3xl font-bold">

          AI Buying Confidence

        </h2>

        <div className="mt-8">

          <div className="h-5 overflow-hidden rounded-full bg-gray-200">

            <div
              className="h-full rounded-full bg-indigo-600"
              style={{
                width: `${sentimentScore}%`,
              }}
            />

          </div>

          <div className="mt-5 flex items-center justify-between">

            <span>Low Confidence</span>

            <span className="font-bold">

              {sentimentScore}% Confidence

            </span>

          </div>

        </div>

      </div>

      {/* KEY TAKEAWAYS */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">

          Key Takeaways

        </h2>

        <ul className="mt-8 space-y-5">

          <li className="flex gap-3">
            <span>✔</span>
            <span>
              Majority of reviewers recommend this product.
            </span>
          </li>

          <li className="flex gap-3">
            <span>✔</span>
            <span>
              Battery, display and performance receive the
              highest appreciation.
            </span>
          </li>

          <li className="flex gap-3">
            <span>✔</span>
            <span>
              Premium pricing remains the most common concern.
            </span>
          </li>

          <li className="flex gap-3">
            <span>✔</span>
            <span>
              Review authenticity appears strong with minimal
              spam indicators.
            </span>
          </li>

        </ul>

      </div>

      {/* FINAL AI INSIGHT */}

      <div className="rounded-3xl border border-green-300 bg-green-50 p-8 dark:border-green-900 dark:bg-green-950/20">

        <h2 className="text-4xl font-bold">

          Final AI Insight

        </h2>

        <p className="mt-6 leading-8 text-gray-700 dark:text-gray-300">

          Based on customer sentiment, review consistency,
          average ratings and recurring feedback patterns,
          AI concludes that this product is well received by
          most users. Positive experiences significantly
          outweigh negative ones, making it a strong choice
          for buyers seeking reliability and long-term value.

        </p>

      </div>

      {/* FOOTER */}

      <div className="border-t pt-8 text-center text-gray-500">

        <p className="font-semibold">

          Generated by AI Review Insights

        </p>

        <p className="mt-2">

          © Insightful Reviews

        </p>

      </div>

    </section>

  );
}

/* ------------------------------------------------ */

function InsightCard({
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

function RatingBar({
  stars,
  count,
  percent,
}: {
  stars: string;
  count: number;
  percent: number;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between">
        <span>{stars}</span>
        <span>{count}</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-yellow-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------ */

function ThemeCard({
  text,
}: {
  text: string;
}) {
  return (
    <div className="rounded-xl border bg-white p-5 dark:bg-zinc-900">
      {text}
    </div>
  );
}

/* ------------------------------------------------ */

function ComplaintItem({
  title,
  frequency,
}: {
  title: string;
  frequency: number;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between">
        <span>{title}</span>
        <span>{frequency}%</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-red-500"
          style={{
            width: `${frequency}%`,
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------ */

function PraiseItem({
  title,
  popularity,
}: {
  title: string;
  popularity: number;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between">
        <span>{title}</span>
        <span>{popularity}%</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-green-500"
          style={{
            width: `${popularity}%`,
          }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------ */

function TrustCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-6 text-center shadow-sm dark:bg-zinc-800">

      <div className="text-sm text-gray-500">
        {title}
      </div>

      <div className="mt-4 text-2xl font-bold text-indigo-600">
        {value}
      </div>

    </div>
  );
}