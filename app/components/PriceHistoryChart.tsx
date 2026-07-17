"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  productName: string;
  currentPrice: number;
};

const sampleData = [
  { month: "Jan", price: 72999 },
  { month: "Feb", price: 71499 },
  { month: "Mar", price: 69999 },
  { month: "Apr", price: 68999 },
  { month: "May", price: 67999 },
  { month: "Jun", price: 66499 },
  { month: "Jul", price: 65999 },
];

function formatPrice(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function PriceHistoryChart({
  productName,
  currentPrice,
}: Props) {
  const prices = sampleData.map((d) => d.price);

  const lowest = Math.min(...prices);
  const highest = Math.max(...prices);

  const average = Math.round(
    prices.reduce((a, b) => a + b, 0) /
      prices.length
  );

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex items-center justify-between">

        <div>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            📈 Price History
          </span>

          <h2 className="mt-5 text-3xl font-bold">
            Price Trend
          </h2>

          <p className="mt-3 text-gray-500">
            Historical price movement for{" "}
            <strong>{productName}</strong>.
          </p>

        </div>

      </div>

      <div className="mt-10 h-[380px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={sampleData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis
              tickFormatter={(value) =>
                `₹${Math.round(value / 1000)}k`
              }
            />

            <Tooltip
              formatter={(value: number) =>
                formatPrice(value)
              }
            />

            <Line
              type="monotone"
              dataKey="price"
              strokeWidth={3}
              dot
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl bg-green-50 p-6 dark:bg-green-950/20">

          <div className="text-sm text-gray-500">
            Current Price
          </div>

          <div className="mt-2 text-3xl font-bold text-green-700">
            {formatPrice(currentPrice)}
          </div>

        </div>

        <div className="rounded-2xl bg-blue-50 p-6 dark:bg-blue-950/20">

          <div className="text-sm text-gray-500">
            Lowest Price
          </div>

          <div className="mt-2 text-3xl font-bold text-blue-700">
            {formatPrice(lowest)}
          </div>

        </div>

        <div className="rounded-2xl bg-red-50 p-6 dark:bg-red-950/20">

          <div className="text-sm text-gray-500">
            Highest Price
          </div>

          <div className="mt-2 text-3xl font-bold text-red-700">
            {formatPrice(highest)}
          </div>

        </div>

        <div className="rounded-2xl bg-yellow-50 p-6 dark:bg-yellow-950/20">

          <div className="text-sm text-gray-500">
            Average Price
          </div>

          <div className="mt-2 text-3xl font-bold text-yellow-700">
            {formatPrice(average)}
          </div>

        </div>

      </div>

      <div className="mt-10 rounded-2xl bg-slate-50 p-6 dark:bg-zinc-800">

        <h3 className="text-xl font-bold">
          Price Insight
        </h3>

        <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
          This chart currently uses sample price history to
          demonstrate historical pricing trends. In a future
          phase, it will be connected to real-time price
          tracking services to display actual historical
          prices, lowest recorded price, highest recorded
          price, festive sale trends, and price-drop alerts.
        </p>

      </div>

    </section>
  );
}