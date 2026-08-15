"use client";

type Props = {
  currentPrice: string;
};

export default function PriceHistory({ currentPrice }: Props) {
  return (
    <section className="mt-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-zinc-800 dark:text-zinc-200">
            📈 Price Intelligence
          </span>
          <h2 className="mt-5 text-3xl font-bold">Price History</h2>
          <p className="mt-3 max-w-2xl text-gray-600 dark:text-gray-400">
            Verified historical price data will appear here once a connected price source provides enough observations. We do not display fabricated price history or predictions.
          </p>
        </div>

        <div className="rounded-2xl bg-indigo-600 px-6 py-4 text-center text-white">
          <div className="text-sm">Current catalogue price</div>
          <div className="mt-2 text-3xl font-bold">{currentPrice}</div>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 dark:border-zinc-700 dark:bg-zinc-800/50">
        <div className="text-sm font-semibold text-slate-700 dark:text-zinc-200">
          Historical data not yet verified
        </div>
        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-zinc-400">
          Live Amazon/Flipkart tracking, historical lows/highs and price-drop alerts will only be enabled after an authorised data source is connected.
        </p>
      </div>
    </section>
  );
}
