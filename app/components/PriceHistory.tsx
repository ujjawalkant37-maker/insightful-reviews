"use client";

type Props = {
  currentPrice: string;
};

export default function PriceHistory({
  currentPrice,
}: Props) {
  return (
    <section className="mt-10 rounded-xl border bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          📈 Price History
        </h2>

        <span className="rounded-lg bg-green-100 px-3 py-2 text-green-700 font-semibold">
          Lowest Price
        </span>

      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">

        <div className="rounded-lg bg-slate-100 p-4 text-center dark:bg-zinc-800">

          <div className="text-sm text-gray-500">
            Current
          </div>

          <div className="mt-2 text-xl font-bold">
            {currentPrice}
          </div>

        </div>

        <div className="rounded-lg bg-slate-100 p-4 text-center dark:bg-zinc-800">

          <div className="text-sm text-gray-500">
            Lowest
          </div>

          <div className="mt-2 text-xl font-bold text-green-600">
            {currentPrice}
          </div>

        </div>

        <div className="rounded-lg bg-slate-100 p-4 text-center dark:bg-zinc-800">

          <div className="text-sm text-gray-500">
            Highest
          </div>

          <div className="mt-2 text-xl font-bold text-red-600">
            {currentPrice}
          </div>

        </div>

      </div>

      <div className="mt-8 flex h-44 items-end gap-3 rounded-lg bg-slate-50 p-4 dark:bg-zinc-800">

        <div className="h-20 w-full rounded bg-indigo-500"></div>
        <div className="h-28 w-full rounded bg-indigo-500"></div>
        <div className="h-16 w-full rounded bg-indigo-500"></div>
        <div className="h-36 w-full rounded bg-indigo-500"></div>
        <div className="h-24 w-full rounded bg-indigo-500"></div>
        <div className="h-40 w-full rounded bg-indigo-500"></div>

      </div>

      <p className="mt-4 text-sm text-gray-500">
        Price history visualization (placeholder). We'll replace this with real Flipkart/Amazon price tracking later.
      </p>

    </section>
  );
}