"use client";

import { useMemo, useState } from "react";

type Props = {
  productName: string;
  purchasePrice: number;
};

function format(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default function OwnershipCost({
  productName,
  purchasePrice,
}: Props) {
  const [years, setYears] = useState(5);
  const [maintenance, setMaintenance] = useState(3000);
  const [electricity, setElectricity] = useState(2000);
  const [accessories, setAccessories] = useState(5000);
  const [resalePercent, setResalePercent] = useState(40);

  const resaleValue = useMemo(() => {
    return Math.round(
      (purchasePrice * resalePercent) / 100
    );
  }, [purchasePrice, resalePercent]);

  const totalCost = useMemo(() => {
    return (
      purchasePrice +
      maintenance * years +
      electricity * years +
      accessories -
      resaleValue
    );
  }, [
    purchasePrice,
    maintenance,
    electricity,
    accessories,
    years,
    resaleValue,
  ]);

  const monthlyCost = Math.round(
    totalCost / (years * 12)
  );

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div>

        <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
          💰 Total Cost of Ownership
        </span>

        <h2 className="mt-5 text-3xl font-bold">
          Ownership Cost Calculator
        </h2>

        <p className="mt-3 text-gray-500">
          Estimate the real cost of owning{" "}
          <strong>{productName}</strong>
          , including maintenance,
          electricity, accessories and resale value.
        </p>

      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-semibold">
            Ownership Period
          </label>

          <select
            value={years}
            onChange={(e) =>
              setYears(Number(e.target.value))
            }
            className="w-full rounded-xl border p-3 dark:border-zinc-700 dark:bg-zinc-800"
          >
            {[1,2,3,4,5,6,7].map((year) => (
              <option
                key={year}
                value={year}
              >
                {year} Year{year > 1 ? "s" : ""}
              </option>
            ))}
          </select>

        </div>

        <div>

          <label className="mb-2 block font-semibold">
            Annual Maintenance
          </label>

          <input
            type="number"
            value={maintenance}
            onChange={(e) =>
              setMaintenance(Number(e.target.value))
            }
            className="w-full rounded-xl border p-3 dark:border-zinc-700 dark:bg-zinc-800"
          />

        </div>

        <div>

          <label className="mb-2 block font-semibold">
            Electricity / Running Cost (Per Year)
          </label>

          <input
            type="number"
            value={electricity}
            onChange={(e) =>
              setElectricity(Number(e.target.value))
            }
            className="w-full rounded-xl border p-3 dark:border-zinc-700 dark:bg-zinc-800"
          />

        </div>

        <div>

          <label className="mb-2 block font-semibold">
            Accessories Cost
          </label>

          <input
            type="number"
            value={accessories}
            onChange={(e) =>
              setAccessories(Number(e.target.value))
            }
            className="w-full rounded-xl border p-3 dark:border-zinc-700 dark:bg-zinc-800"
          />

        </div>

        <div className="md:col-span-2">

          <label className="mb-2 block font-semibold">
            Expected Resale Value (%)
          </label>

          <input
            type="range"
            min={0}
            max={80}
            value={resalePercent}
            onChange={(e) =>
              setResalePercent(Number(e.target.value))
            }
            className="w-full"
          />

          <div className="mt-2 text-sm text-gray-500">
            {resalePercent}% (
            {format(resaleValue)})
          </div>

        </div>

      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl bg-indigo-50 p-6 dark:bg-indigo-950/20">

          <div className="text-sm text-gray-500">
            Purchase Price
          </div>

          <div className="mt-3 text-3xl font-bold text-indigo-600">
            {format(purchasePrice)}
          </div>

        </div>

        <div className="rounded-2xl bg-green-50 p-6 dark:bg-green-950/20">

          <div className="text-sm text-gray-500">
            Estimated Resale
          </div>

          <div className="mt-3 text-3xl font-bold text-green-600">
            {format(resaleValue)}
          </div>

        </div>

        <div className="rounded-2xl bg-yellow-50 p-6 dark:bg-yellow-950/20">

          <div className="text-sm text-gray-500">
            Monthly Cost
          </div>

          <div className="mt-3 text-3xl font-bold text-yellow-700">
            {format(monthlyCost)}
          </div>

        </div>

        <div className="rounded-2xl bg-red-50 p-6 dark:bg-red-950/20">

          <div className="text-sm text-gray-500">
            Total Ownership Cost
          </div>

          <div className="mt-3 text-3xl font-bold text-red-600">
            {format(totalCost)}
          </div>

        </div>

      </div>

      <div className="mt-10 rounded-2xl bg-slate-50 p-6 leading-8 dark:bg-zinc-800">

        <h3 className="text-xl font-bold">
          AI Ownership Insight
        </h3>

        <p className="mt-4 text-gray-700 dark:text-gray-300">
          The purchase price is only one part of the total
          ownership cost. Maintenance, electricity,
          accessories and resale value significantly affect
          long-term value. Comparing Total Cost of Ownership
          helps identify products that are genuinely cheaper
          over several years instead of only having the
          lowest upfront price.
        </p>

      </div>

    </section>
  );
}