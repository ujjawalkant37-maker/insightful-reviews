"use client";

import React, {
  useMemo,
  useState,
} from "react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

type Category = {
  id: number;
  name: string;
  slug: string;
};

function setParam(
  params: URLSearchParams,
  key: string,
  value?: string | null
) {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    params.delete(key);
  } else {
    params.set(key, value);
  }
}

export default function ProductFilters({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams =
    useSearchParams();

  const params = useMemo(
    () =>
      new URLSearchParams(
        searchParams?.toString() ?? ""
      ),
    [searchParams]
  );

  const [localSearch, setLocalSearch] =
    useState(
      params.get("search") ?? ""
    );

  const [
    localPriceMin,
    setLocalPriceMin,
  ] = useState(
    params.get("priceMin") ?? ""
  );

  const [
    localPriceMax,
    setLocalPriceMax,
  ] = useState(
    params.get("priceMax") ?? ""
  );

  function apply(
    updates: Record<
      string,
      string | undefined | null
    >
  ) {
    const next =
      new URLSearchParams(
        params.toString()
      );

    Object.entries(updates).forEach(
      ([key, value]) =>
        setParam(
          next,
          key,
          value
        )
    );

    router.replace(
      `${pathname}?${next.toString()}`
    );
  }

  function clearAll() {
    const next =
      new URLSearchParams(
        params.toString()
      );

    [
      "category",
      "search",
      "priceMin",
      "priceMax",
      "aiMin",
      "minRating",
      "sort",
    ].forEach((key) =>
      next.delete(key)
    );

    setLocalSearch("");
    setLocalPriceMin("");
    setLocalPriceMax("");

    router.replace(
      `${pathname}?${next.toString()}`
    );
  }

  function removeFilter(
    key: string
  ) {
    const next =
      new URLSearchParams(
        params.toString()
      );

    next.delete(key);

    router.replace(
      `${pathname}?${next.toString()}`
    );
  }

  return (
    <div className="w-full">

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

        <div className="flex flex-wrap items-center gap-2">

          <form
            onSubmit={(e) => {
              e.preventDefault();

              apply({
                search:
                  localSearch ||
                  undefined,
              });
            }}
            className="flex items-center gap-1"
          >

            <input
              type="text"
              placeholder="Search products..."
              value={localSearch}
              onChange={(e) =>
                setLocalSearch(
                  e.target.value
                )
              }
              className="w-44 rounded-l-md border bg-white p-2 text-sm dark:bg-zinc-900"
            />

            <button
              type="submit"
              className="rounded-r-md bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-700"
            >
              Search
            </button>

          </form>

          <select
            value={
              params.get(
                "category"
              ) ?? ""
            }
            onChange={(e) =>
              apply({
                category:
                  e.target.value ||
                  undefined,
              })
            }
            className="rounded-md border bg-white p-2 text-sm dark:bg-zinc-900"
          >

            <option value="">
              All categories
            </option>

            {categories.map(
              (category) => (
                <option
                  key={
                    category.id
                  }
                  value={
                    category.slug
                  }
                >
                  {category.name}
                </option>
              )
            )}

          </select>

          <input
            type="number"
            placeholder="Min ₹"
            value={
              localPriceMin
            }
            onChange={(e) =>
              setLocalPriceMin(
                e.target.value
              )
            }
            onBlur={() =>
              apply({
                priceMin:
                  localPriceMin ||
                  undefined,
              })
            }
            className="w-24 rounded-md border bg-white p-2 text-sm dark:bg-zinc-900"
          />

          <input
            type="number"
            placeholder="Max ₹"
            value={
              localPriceMax
            }
            onChange={(e) =>
              setLocalPriceMax(
                e.target.value
              )
            }
            onBlur={() =>
              apply({
                priceMax:
                  localPriceMax ||
                  undefined,
              })
            }
            className="w-24 rounded-md border bg-white p-2 text-sm dark:bg-zinc-900"
          />

          <input
            type="number"
            placeholder="Min AI %"
            value={
              params.get(
                "aiMin"
              ) ?? ""
            }
            onChange={(e) =>
              apply({
                aiMin:
                  e.target.value ||
                  undefined,
              })
            }
            className="w-28 rounded-md border bg-white p-2 text-sm dark:bg-zinc-900"
          />

          <select
            value={
              params.get(
                "minRating"
              ) ?? ""
            }
            onChange={(e) =>
              apply({
                minRating:
                  e.target.value ||
                  undefined,
              })
            }
            className="rounded-md border bg-white p-2 text-sm dark:bg-zinc-900"
          >

            <option value="">
              Any rating
            </option>

            <option value="1">
              1★+
            </option>

            <option value="2">
              2★+
            </option>

            <option value="3">
              3★+
            </option>

            <option value="4">
              4★+
            </option>

            <option value="5">
              5★
            </option>

          </select>

        </div>

        <div className="flex items-center gap-2">

          <select
            value={
              params.get(
                "sort"
              ) ?? ""
            }
            onChange={(e) =>
              apply({
                sort:
                  e.target.value ||
                  undefined,
              })
            }
            className="rounded-md border bg-white p-2 text-sm dark:bg-zinc-900"
          >

            <option value="">
              Sort
            </option>

            <option value="price_asc">
              Price: Low to High
            </option>

            <option value="price_desc">
              Price: High to Low
            </option>

            <option value="highest_rated">
              Highest Rated
            </option>

            <option value="highest_ai">
              Highest AI Score
            </option>

          </select>

          <button
            onClick={
              clearAll
            }
            className="rounded-md border px-3 py-2 text-sm"
          >
            Clear All Filters
          </button>

        </div>

      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">

        {Array.from(
          params.entries()
        ).map(([key, value]) => {

          if (
            ![
              "category",
              "search",
              "priceMin",
              "priceMax",
              "aiMin",
              "minRating",
            ].includes(key)
          ) {
            return null;
          }

          return (

            <div
              key={key}
              className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm dark:bg-zinc-800"
            >

              <span className="font-medium">
                {key}:
              </span>

              <span>
                {value}
              </span>

              <button
                onClick={() =>
                  removeFilter(
                    key
                  )
                }
              >
                ✕
              </button>

            </div>

          );

        })}

      </div>

    </div>
  );
}