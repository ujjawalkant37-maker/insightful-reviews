"use client";

import {
  Brain,
  ShieldCheck,
  Trophy,
  IndianRupee,
  Printer,
  GitCompare,
} from "lucide-react";

type Product = {
  name: string;
  image?: string;

  price: number;

  trustScore: number;

  aiScore: number;

  decision: "BUY" | "WAIT" | "AVOID";

  confidence: number;

  pros: string[];

  cons: string[];
};

type Props = {
  products: Product[];

  winner: string;

  summary: string;

  recommendation: string;
};

export default function AIComparisonReport({
  products,
  winner,
  summary,
  recommendation,
}: Props) {
  function printReport() {
    window.print();
  }

  return (
    <section className="mx-auto max-w-7xl space-y-8 rounded-3xl bg-white p-8 shadow-lg dark:bg-zinc-900">

      {/* HEADER */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            🤖 AI Comparison Report
          </span>

          <h1 className="mt-5 text-5xl font-bold">
            Product Comparison
          </h1>

          <p className="mt-3 text-gray-500">

            AI-powered comparison of multiple products
            using Trust Score, AI analysis,
            pricing, strengths and weaknesses.

          </p>

        </div>

        <button
          onClick={printReport}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          <Printer size={18} />

          Print Report
        </button>

      </div>

      {/* EXECUTIVE SUMMARY */}

      <div className="rounded-3xl border bg-slate-50 p-8 dark:bg-zinc-800">

        <h2 className="text-3xl font-bold">

          Executive Summary

        </h2>

        <p className="mt-6 whitespace-pre-wrap leading-8 text-gray-700 dark:text-gray-300">

          {summary}

        </p>

      </div>

      {/* PRODUCT CARDS */}

      <div className="grid gap-6 lg:grid-cols-3">

        {products.map((product) => (

          <ProductCard
            key={product.name}
            product={product}
          />

        ))}

      </div>

      {/* QUICK OVERVIEW */}

      <div className="rounded-3xl border p-8">

        <h2 className="flex items-center gap-3 text-3xl font-bold">

          <GitCompare />

          Product Overview

        </h2>

        <div className="mt-8 overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr className="border-b">

                <th className="p-4 text-left">
                  Product
                </th>

                <th className="p-4 text-center">
                  Price
                </th>

                <th className="p-4 text-center">
                  AI Score
                </th>

                <th className="p-4 text-center">
                  Trust
                </th>

                <th className="p-4 text-center">
                  Decision
                </th>

              </tr>

            </thead>

            <tbody>

              {products.map((product) => (

                <tr
                  key={product.name}
                  className="border-b"
                >

                  <td className="p-4 font-semibold">

                    {product.name}

                  </td>

                  <td className="p-4 text-center">

                    ₹{product.price.toLocaleString("en-IN")}

                  </td>

                  <td className="p-4 text-center">

                    {product.aiScore}/100

                  </td>

                  <td className="p-4 text-center">

                    {product.trustScore}/100

                  </td>

                  <td className="p-4 text-center font-bold">

                    {product.decision}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
            {/* AI FEATURE COMPARISON */}

      <div className="rounded-3xl border p-8">

        <h2 className="flex items-center gap-3 text-3xl font-bold">

          <Brain />

          AI Comparison

        </h2>

        <div className="mt-8 space-y-6">

          {products.map((product) => (

            <div
              key={product.name}
              className="rounded-2xl border p-6"
            >

              <div className="flex items-center justify-between">

                <h3 className="text-2xl font-bold">
                  {product.name}
                </h3>

                <span className="rounded-full bg-indigo-100 px-4 py-2 font-semibold text-indigo-700">

                  AI Score {product.aiScore}/100

                </span>

              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-gray-200">

                <div
                  className="h-full rounded-full bg-indigo-600"
                  style={{
                    width: `${product.aiScore}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* TRUST SCORE */}

      <div className="rounded-3xl border p-8">

        <h2 className="flex items-center gap-3 text-3xl font-bold">

          <ShieldCheck />

          Trust Score Comparison

        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {products.map((product) => (

            <div
              key={product.name}
              className="rounded-2xl bg-slate-50 p-6 text-center dark:bg-zinc-800"
            >

              <h3 className="font-bold">
                {product.name}
              </h3>

              <div className="mt-6 text-5xl font-bold text-green-600">

                {product.trustScore}

              </div>

              <div className="mt-2 text-gray-500">

                Trust Score

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* VALUE FOR MONEY */}

      <div className="rounded-3xl border p-8">

        <h2 className="flex items-center gap-3 text-3xl font-bold">

          <IndianRupee />

          Value For Money

        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {products.map((product) => {

            const value = (
              product.aiScore /
              product.price
            ) * 100000;

            return (

              <div
                key={product.name}
                className="rounded-2xl border p-6 text-center"
              >

                <h3 className="font-bold">
                  {product.name}
                </h3>

                <div className="mt-5 text-4xl font-bold text-indigo-600">

                  {value.toFixed(1)}

                </div>

                <p className="mt-3 text-gray-500">

                  Value Index

                </p>

              </div>

            );

          })}

        </div>

      </div>

      {/* PROS & CONS */}

      <div className="grid gap-8 lg:grid-cols-2">

        <div className="rounded-3xl border bg-green-50 p-8 dark:bg-green-950/20">

          <h2 className="text-3xl font-bold text-green-700">

            Pros Comparison

          </h2>

          <div className="mt-8 space-y-8">

            {products.map((product) => (

              <div key={product.name}>

                <h3 className="font-bold">
                  {product.name}
                </h3>

                <ul className="mt-4 space-y-3">

                  {product.pros.map((pro, index) => (

                    <li
                      key={index}
                      className="flex gap-3"
                    >

                      <span>✔</span>

                      <span>{pro}</span>

                    </li>

                  ))}

                </ul>

              </div>

            ))}

          </div>

        </div>

        <div className="rounded-3xl border bg-red-50 p-8 dark:bg-red-950/20">

          <h2 className="text-3xl font-bold text-red-700">

            Cons Comparison

          </h2>

          <div className="mt-8 space-y-8">

            {products.map((product) => (

              <div key={product.name}>

                <h3 className="font-bold">
                  {product.name}
                </h3>

                <ul className="mt-4 space-y-3">

                  {product.cons.map((con, index) => (

                    <li
                      key={index}
                      className="flex gap-3"
                    >

                      <span>✖</span>

                      <span>{con}</span>

                    </li>

                  ))}

                </ul>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* COMPARISON MATRIX */}

      <div className="rounded-3xl border p-8">

        <h2 className="text-3xl font-bold">

          Comparison Matrix

        </h2>

        <div className="mt-8 overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr className="border-b">

                <th className="p-4 text-left">
                  Product
                </th>

                <th className="p-4 text-center">
                  AI Score
                </th>

                <th className="p-4 text-center">
                  Trust
                </th>

                <th className="p-4 text-center">
                  Confidence
                </th>

              </tr>

            </thead>

            <tbody>

              {products.map((product) => (

                <tr
                  key={product.name}
                  className="border-b"
                >

                  <td className="p-4 font-semibold">

                    {product.name}

                  </td>

                  <td className="p-4 text-center">

                    {product.aiScore}

                  </td>

                  <td className="p-4 text-center">

                    {product.trustScore}

                  </td>

                  <td className="p-4 text-center">

                    {product.confidence}%

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
            {/* WINNER */}

      <div className="rounded-3xl border border-yellow-300 bg-yellow-50 p-8 dark:border-yellow-700 dark:bg-yellow-950/20">

        <h2 className="flex items-center gap-3 text-4xl font-bold">

          <Trophy className="text-yellow-500" />

          AI Winner

        </h2>

        <div className="mt-8 text-center">

          <div className="text-5xl font-bold text-indigo-600">

            {winner}

          </div>

          <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-300">

            Based on AI Score,
            Trust Score,
            value for money,
            buying confidence,
            strengths,
            weaknesses,
            and overall recommendation.

          </p>

        </div>

      </div>

      {/* FINAL RECOMMENDATION */}

      <div className="rounded-3xl border border-indigo-300 bg-indigo-50 p-8 dark:border-indigo-800 dark:bg-indigo-950/20">

        <h2 className="text-4xl font-bold">

          Final AI Recommendation

        </h2>

        <p className="mt-8 whitespace-pre-wrap leading-8 text-gray-700 dark:text-gray-300">

          {recommendation}

        </p>

      </div>

      {/* DISCLAIMER */}

      <div className="rounded-2xl border bg-slate-50 p-6 dark:bg-zinc-800">

        <h3 className="font-bold">

          Disclaimer

        </h3>

        <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">

          AI recommendations are generated from available
          specifications, user reviews, expert opinions,
          pricing information and trust metrics.
          They are intended to assist users and should
          not replace independent research before making
          a purchase.

        </p>

      </div>

      {/* FOOTER */}

      <div className="border-t pt-8 text-center text-gray-500">

        <p className="font-semibold">

          Generated by AI Comparison Engine

        </p>

        <p className="mt-2">

          © Insightful Reviews

        </p>

      </div>

    </section>

  );
}

/* ------------------------------------------------ */

function ProductCard({
  product,
}: {
  product: Product;
}) {

  const decisionColor =
    product.decision === "BUY"
      ? "text-green-600"
      : product.decision === "WAIT"
      ? "text-yellow-600"
      : "text-red-600";

  return (

    <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-zinc-800">

      {product.image && (

        <img
          src={product.image}
          alt={product.name}
          className="mx-auto h-40 w-40 rounded-xl object-cover"
        />

      )}

      <h3 className="mt-6 text-center text-2xl font-bold">

        {product.name}

      </h3>

      <div className="mt-6 space-y-3">

        <InfoRow
          label="Price"
          value={`₹${product.price.toLocaleString("en-IN")}`}
        />

        <InfoRow
          label="AI Score"
          value={`${product.aiScore}/100`}
        />

        <InfoRow
          label="Trust Score"
          value={`${product.trustScore}/100`}
        />

        <InfoRow
          label="Confidence"
          value={`${product.confidence}%`}
        />

        <InfoRow
          label="Decision"
          value={product.decision}
          className={decisionColor}
        />

      </div>

    </div>

  );

}

/* ------------------------------------------------ */

function InfoRow({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {

  return (

    <div className="flex items-center justify-between border-b pb-2">

      <span className="text-gray-500">

        {label}

      </span>

      <span className={`font-bold ${className}`}>

        {value}

      </span>

    </div>

  );

}