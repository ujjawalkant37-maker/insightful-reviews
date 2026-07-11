"use client";

type Props = {
  currentPrice: string;
};

export default function PriceHistory({
  currentPrice,
}: Props) {
  return (
    <section className="mt-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            📈 Smart Price Tracker
          </span>

          <h2 className="mt-5 text-3xl font-bold">
            Price History & Prediction
          </h2>

          <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
            Monitor historical prices, AI predictions and buying opportunities.
            Live Amazon and Flipkart tracking will be enabled in future updates.
          </p>

        </div>

        <div className="rounded-2xl bg-green-600 px-6 py-4 text-center text-white">

          <div className="text-sm">
            Current Price
          </div>

          <div className="mt-2 text-3xl font-bold">
            {currentPrice}
          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="mt-10 grid gap-5 md:grid-cols-4">

        <div className="rounded-2xl bg-gray-50 p-5 dark:bg-zinc-800">

          <div className="text-sm text-gray-500">
            Lowest Price
          </div>

          <div className="mt-3 text-2xl font-bold text-green-600">
            {currentPrice}
          </div>

          <div className="mt-2 text-xs text-green-600">
            ✓ Best Recorded Price
          </div>

        </div>

        <div className="rounded-2xl bg-gray-50 p-5 dark:bg-zinc-800">

          <div className="text-sm text-gray-500">
            Highest Price
          </div>

          <div className="mt-3 text-2xl font-bold text-red-600">
            {currentPrice}
          </div>

          <div className="mt-2 text-xs text-red-600">
            Historical Peak
          </div>

        </div>

        <div className="rounded-2xl bg-gray-50 p-5 dark:bg-zinc-800">

          <div className="text-sm text-gray-500">
            AI Prediction
          </div>

          <div className="mt-3 text-2xl font-bold text-indigo-600">
            Stable
          </div>

          <div className="mt-2 text-xs text-indigo-600">
            Next 30 Days
          </div>

        </div>

        <div className="rounded-2xl bg-gray-50 p-5 dark:bg-zinc-800">

          <div className="text-sm text-gray-500">
            Buy Signal
          </div>

          <div className="mt-3 text-2xl font-bold text-green-600">
            BUY
          </div>

          <div className="mt-2 text-xs text-green-600">
            Good Time
          </div>

        </div>

      </div>

      {/* Graph */}

      <div className="mt-12">

        <div className="mb-5 flex items-center justify-between">

          <h3 className="text-xl font-bold">
            6-Month Price Trend
          </h3>

          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
            Demo Data
          </span>

        </div>

        <div className="flex h-72 items-end gap-3 rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 p-6 dark:from-zinc-800 dark:to-zinc-900">

          {[
            45,
            70,
            60,
            85,
            55,
            90,
            75,
            95,
            70,
            60,
            82,
            88,
          ].map((height, index) => (
            <div
              key={index}
              className="flex-1 rounded-t-xl bg-gradient-to-t from-indigo-600 to-cyan-500 transition hover:scale-105"
              style={{
                height: `${height}%`,
              }}
            />
          ))}

        </div>

        <div className="mt-3 flex justify-between text-sm text-gray-500">

          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>

        </div>

      </div>

      {/* AI Recommendation */}

      <div className="mt-12 grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl bg-green-50 p-6">

          <h3 className="text-xl font-bold text-green-700">
            💡 AI Recommendation
          </h3>

          <ul className="mt-5 space-y-3 text-gray-700">

            <li>✅ Current price is competitive.</li>

            <li>✅ No significant price drop expected.</li>

            <li>✅ Suitable time to purchase.</li>

            <li>✅ Continue monitoring festive sales.</li>

          </ul>

        </div>

        <div className="rounded-2xl bg-yellow-50 p-6">

          <h3 className="text-xl font-bold text-yellow-700">
            🔔 Future Features
          </h3>

          <ul className="mt-5 space-y-3 text-gray-700">

            <li>Amazon Live Price Tracking</li>

            <li>Flipkart Live Price Tracking</li>

            <li>Price Drop Alerts</li>

            <li>Lowest Price Notification</li>

            <li>AI Price Forecast</li>

          </ul>

        </div>

      </div>

    </section>
  );
}