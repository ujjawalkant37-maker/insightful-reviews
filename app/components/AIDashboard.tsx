"use client";

import {
  Brain,
  ShieldCheck,
  Star,
  TrendingUp,
  IndianRupee,
  BadgeCheck,
  BarChart3,
  FileText,
  MessageSquare,
  Sparkles,
} from "lucide-react";

type Props = {
  productName: string;

  aiScore: number;

  trustScore: number;

  reviewScore: number;

  confidence: number;

  currentPrice: number;

  recommendation: "BUY" | "WAIT" | "AVOID";

  summary: string;
};

export default function AIDashboard({
  productName,
  aiScore,
  trustScore,
  reviewScore,
  confidence,
  currentPrice,
  recommendation,
  summary,
}: Props) {

  const overallScore = Math.round(
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

    <section className="mx-auto max-w-7xl space-y-8 rounded-3xl bg-white p-8 shadow-xl dark:bg-zinc-900">

      {/* HEADER */}

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">

            🤖 AI Dashboard

          </span>

          <h1 className="mt-5 text-5xl font-bold">

            {productName}

          </h1>

          <p className="mt-4 max-w-3xl text-lg text-gray-500">

            Central dashboard combining every AI
            module including Recommendation Engine,
            Trust Score,
            Review Insights,
            Buying Guide,
            Price Prediction,
            Ownership Cost,
            Product Reports,
            and Comparison Intelligence.

          </p>

        </div>

        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-600 p-8 text-center text-white shadow-lg">

          <div className="text-sm uppercase tracking-wide">

            Overall AI Score

          </div>

          <div className="mt-4 text-6xl font-bold">

            {overallScore}

          </div>

          <div className="mt-2 text-lg">

            /100

          </div>

        </div>

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

      {/* DASHBOARD OVERVIEW */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">

        <DashboardCard
          icon={<Brain size={28} />}
          title="AI Score"
          value={`${aiScore}/100`}
        />

        <DashboardCard
          icon={<ShieldCheck size={28} />}
          title="Trust"
          value={`${trustScore}/100`}
        />

        <DashboardCard
          icon={<Star size={28} />}
          title="Reviews"
          value={`${reviewScore}/100`}
        />

        <DashboardCard
          icon={<BadgeCheck size={28} />}
          title="Confidence"
          value={`${confidence}%`}
        />

        <DashboardCard
          icon={<IndianRupee size={28} />}
          title="Price"
          value={`₹${currentPrice.toLocaleString("en-IN")}`}
        />

        <DashboardCard
          icon={<TrendingUp size={28} />}
          title="Decision"
          value={recommendation}
          className={recommendationColor}
        />

      </div>

      {/* QUICK ACTIONS */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">

          Quick Actions

        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <ActionCard
            icon={<Brain size={28} />}
            title="Recommendation Engine"
            description="Unified AI buying recommendation."
          />

          <ActionCard
            icon={<FileText size={28} />}
            title="Product Report"
            description="Open printable AI report."
          />

          <ActionCard
            icon={<BarChart3 size={28} />}
            title="Review Insights"
            description="View AI review analysis."
          />

          <ActionCard
            icon={<MessageSquare size={28} />}
            title="AI Assistant"
            description="Ask product questions."
          />

        </div>

      </div>

      {/* AI HEALTH */}

      <div className="rounded-3xl border p-8">

        <div className="flex items-center gap-3">

          <Sparkles />

          <h2 className="text-3xl font-bold">

            AI Health Overview

          </h2>

        </div>

        <div className="mt-8 space-y-6">

          <ProgressBar
            label="Recommendation Engine"
            value={overallScore}
          />

          <ProgressBar
            label="Trust Engine"
            value={trustScore}
          />

          <ProgressBar
            label="Review Intelligence"
            value={reviewScore}
          />

          <ProgressBar
            label="Prediction Confidence"
            value={confidence}
          />

        </div>

      </div>
            {/* RECOMMENDATION ENGINE */}

      <div className="rounded-3xl border bg-indigo-50 p-8 dark:border-indigo-800 dark:bg-indigo-950/20">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <h2 className="text-3xl font-bold">

            AI Recommendation Engine

          </h2>

        </div>

        <p className="mt-6 leading-8 text-gray-700 dark:text-gray-300">

          AI combines Trust Score, Review Intelligence,
          ownership cost, pricing history and buying
          confidence into one final recommendation.

        </p>

        <div className="mt-8">

          <ProgressBar
            label="Recommendation Strength"
            value={overallScore}
          />

        </div>

      </div>

      {/* TRUST SCORE */}

      <div className="rounded-3xl border bg-green-50 p-8 dark:border-green-900 dark:bg-green-950/20">

        <div className="flex items-center gap-3">

          <ShieldCheck className="text-green-600" />

          <h2 className="text-3xl font-bold">

            Trust Score

          </h2>

        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <MiniStat
            title="Overall Trust"
            value={`${trustScore}/100`}
          />

          <MiniStat
            title="Verified Reviews"
            value="91%"
          />

          <MiniStat
            title="Review Quality"
            value="Excellent"
          />

        </div>

      </div>

      {/* PRICE PREDICTION */}

      <div className="rounded-3xl border p-8">

        <div className="flex items-center gap-3">

          <TrendingUp />

          <h2 className="text-3xl font-bold">

            Price Prediction

          </h2>

        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <MiniStat
            title="Current Price"
            value={`₹${currentPrice.toLocaleString("en-IN")}`}
          />

          <MiniStat
            title="Expected Trend"
            value="Stable"
          />

          <MiniStat
            title="Best Time"
            value="Buy Now"
          />

        </div>

        <div className="mt-8">

          <ProgressBar
            label="Buying Opportunity"
            value={82}
          />

        </div>

      </div>

      {/* OWNERSHIP COST */}

      <div className="rounded-3xl border p-8">

        <div className="flex items-center gap-3">

          <IndianRupee />

          <h2 className="text-3xl font-bold">

            Ownership Cost

          </h2>

        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-4">

          <MiniStat
            title="Purchase"
            value={`₹${currentPrice.toLocaleString("en-IN")}`}
          />

          <MiniStat
            title="Maintenance"
            value="Low"
          />

          <MiniStat
            title="Resale"
            value="High"
          />

          <MiniStat
            title="Ownership"
            value="Excellent"
          />

        </div>

      </div>

      {/* REVIEW INSIGHTS */}

      <div className="rounded-3xl border bg-yellow-50 p-8 dark:border-yellow-900 dark:bg-yellow-950/20">

        <div className="flex items-center gap-3">

          <Star className="text-yellow-600" />

          <h2 className="text-3xl font-bold">

            Review Insights

          </h2>

        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          <InsightBox
            title="Positive"
            description="Most reviewers praise battery life, display quality and overall performance."
          />

          <InsightBox
            title="Negative"
            description="Some users mention heating, software bugs and premium pricing."
          />

        </div>

      </div>

      {/* BUYING GUIDE */}

      <div className="rounded-3xl border p-8">

        <div className="flex items-center gap-3">

          <BadgeCheck />

          <h2 className="text-3xl font-bold">

            AI Buying Guide

          </h2>

        </div>

        <ul className="mt-8 space-y-5">

          <li className="flex gap-3">

            <span>✔</span>

            <span>

              Best suited for users seeking long-term reliability.

            </span>

          </li>

          <li className="flex gap-3">

            <span>✔</span>

            <span>

              Strong recommendation for productivity and everyday usage.

            </span>

          </li>

          <li className="flex gap-3">

            <span>✔</span>

            <span>

              Consider waiting only if major discounts are expected.

            </span>

          </li>

        </ul>

      </div>

      {/* DASHBOARD ANALYTICS */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">

          Dashboard Analytics

        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <MiniStat
            title="AI Modules"
            value="12"
          />

          <MiniStat
            title="Reports"
            value="8"
          />

          <MiniStat
            title="Predictions"
            value="Live"
          />

          <MiniStat
            title="Reliability"
            value="96%"
          />

        </div>

      </div>

      {/* AI DECISION SUMMARY */}

      <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8 dark:border-blue-900 dark:bg-blue-950/20">

        <h2 className="text-3xl font-bold">

          AI Decision Summary

        </h2>

        <p className="mt-6 leading-8 text-gray-700 dark:text-gray-300">

          After evaluating pricing, customer reviews,
          ownership costs, Trust Score, AI analysis,
          and prediction confidence, the dashboard
          recommends:

        </p>

        <div
          className={`mt-8 text-6xl font-bold ${recommendationColor}`}
        >

          {recommendation}

        </div>

      </div>
            {/* PRODUCT REPORT */}

      <div className="rounded-3xl border p-8">

        <div className="flex items-center gap-3">

          <FileText />

          <h2 className="text-3xl font-bold">

            Product Report

          </h2>

        </div>

        <p className="mt-6 leading-8 text-gray-700 dark:text-gray-300">

          Generate a comprehensive AI Product Report
          containing Trust Score,
          AI Decision,
          Buying Guide,
          Review Insights,
          Price Prediction,
          Ownership Cost,
          Timeline,
          Pros & Cons
          and overall recommendation.

        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">

          <MiniStat
            title="Report Status"
            value="Ready"
          />

          <MiniStat
            title="Pages"
            value="12+"
          />

          <MiniStat
            title="Export"
            value="PDF"
          />

        </div>

      </div>

      {/* SHARE & EXPORT */}

      <div className="rounded-3xl border bg-slate-50 p-8 dark:bg-zinc-800">

        <h2 className="text-3xl font-bold">

          Share & Export

        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <ActionCard
            icon={<FileText size={28} />}
            title="Download PDF"
            description="Generate printable report."
          />

          <ActionCard
            icon={<MessageSquare size={28} />}
            title="Share Report"
            description="Copy or share the AI report."
          />

        </div>

      </div>

      {/* AI ASSISTANT */}

      <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-8 dark:border-indigo-900 dark:bg-indigo-950/20">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <h2 className="text-3xl font-bold">

            AI Assistant

          </h2>

        </div>

        <p className="mt-6 leading-8 text-gray-700 dark:text-gray-300">

          Ask questions about specifications,
          comparisons,
          ownership,
          accessories,
          warranty,
          software updates,
          alternatives,
          and purchasing decisions.

        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <InsightBox
            title="Example Question"
            description="Is this better than the previous generation?"
          />

          <InsightBox
            title="Example Question"
            description="Should I wait for a price drop?"
          />

        </div>

      </div>

      {/* FOOTER */}

      <div className="border-t pt-8 text-center text-gray-500">

        <p className="font-semibold">

          Generated by Insightful Reviews AI Dashboard

        </p>

        <p className="mt-2">

          © Insightful Reviews • Unified AI Platform

        </p>

      </div>

    </section>

  );
}

/* ------------------------------------------------ */

function DashboardCard({
  icon,
  title,
  value,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  className?: string;
}) {

  return (

    <div className="rounded-2xl border bg-white p-6 text-center shadow-sm dark:bg-zinc-800">

      <div className="flex justify-center">

        {icon}

      </div>

      <div className="mt-4 text-sm text-gray-500">

        {title}

      </div>

      <div className={`mt-3 text-2xl font-bold ${className}`}>

        {value}

      </div>

    </div>

  );

}

/* ------------------------------------------------ */

function ActionCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {

  return (

    <div className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md dark:bg-zinc-900">

      <div className="flex items-center gap-4">

        {icon}

        <div>

          <div className="font-bold">

            {title}

          </div>

          <div className="mt-1 text-sm text-gray-500">

            {description}

          </div>

        </div>

      </div>

    </div>

  );

}

/* ------------------------------------------------ */

function MiniStat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {

  return (

    <div className="rounded-2xl border bg-white p-6 text-center shadow-sm dark:bg-zinc-900">

      <div className="text-sm text-gray-500">

        {title}

      </div>

      <div className="mt-4 text-3xl font-bold text-indigo-600">

        {value}

      </div>

    </div>

  );

}

/* ------------------------------------------------ */

function InsightBox({
  title,
  description,
}: {
  title: string;
  description: string;
}) {

  return (

    <div className="rounded-2xl border bg-white p-6 dark:bg-zinc-900">

      <h3 className="font-bold">

        {title}

      </h3>

      <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">

        {description}

      </p>

    </div>

  );

}

/* ------------------------------------------------ */

function ProgressBar({
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