"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import useCompare from "@/components/useCompare";
import {
  getProducts,
  DatabaseProduct,
} from "@/lib/getProducts";

type CompareProduct = DatabaseProduct;

export default function CompareClient() {
  const {
    compareIds,
    remove,
    clear,
  } = useCompare();

  const [products, setProducts] = useState<
    CompareProduct[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const allProducts =
        await getProducts();

      const selected =
        allProducts.filter((product) =>
          compareIds.includes(
            String(product.id)
          )
        );

      setProducts(selected);

      setLoading(false);
    }

    load();
  }, [compareIds]);

  const specs = useMemo(() => {
    const keys = new Set<string>();

    products.forEach((product) => {
      if (
        product.specifications
      ) {
        Object.keys(
          product.specifications
        ).forEach((key) =>
          keys.add(key)
        );
      }
    });

    return Array.from(keys);
  }, [products]);

  if (loading) {
    return (
      <div className="container py-20 text-center">
        Loading comparison...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container py-20">

        <div className="mx-auto max-w-2xl rounded-3xl border bg-white p-12 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

          <div className="text-7xl">
            📊
          </div>

          <h1 className="mt-6 text-3xl font-bold">
            No Products Selected
          </h1>

          <p className="mt-4 text-gray-500">
            Add products from the
            catalogue to compare them.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-flex rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Browse Products
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="container py-12">

      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Product Comparison
          </h1>

          <p className="mt-3 text-gray-500">
            Compare specifications,
            ratings,
            AI scores,
            pricing
            and features.
          </p>

        </div>

        <button
          onClick={clear}
          className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
        >
          Clear Comparison
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full border-collapse">

          <thead>

            <tr>

              <th className="sticky left-0 z-10 bg-white p-5 text-left dark:bg-zinc-950">
                Feature
              </th>
                            {products.map((product) => (

                <th
                  key={product.id}
                  className="min-w-[280px] border-b p-5 text-center"
                >

                  <div className="space-y-4">

                    <div className="mx-auto h-40 w-40 overflow-hidden rounded-2xl bg-slate-100">

                      {product.images?.length ? (

                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />

                      ) : (

                        <div className="flex h-full items-center justify-center text-6xl">
                          📦
                        </div>

                      )}

                    </div>

                    <div className="text-xl font-bold">
                      {product.name}
                    </div>

                    <div className="text-sm text-gray-500">
                      {product.brand}
                    </div>

                    <div className="text-2xl font-bold text-indigo-600">
                      ₹{product.price.toLocaleString("en-IN")}
                    </div>

                    <div className="text-yellow-500 text-lg">
                      {"★".repeat(
                        Math.round(product.rating)
                      )}
                    </div>

                    <div className="rounded-xl bg-green-600 px-4 py-2 font-semibold text-white">
                      AI Score {product.ai_score}
                    </div>

                    <div className="flex flex-col gap-3">

                      <Link
                        href={`/products/${product.slug}`}
                        className="rounded-xl bg-indigo-600 px-4 py-3 text-white hover:bg-indigo-700"
                      >
                        View Details
                      </Link>

                      {product.buy_url && (

                        <a
                          href={product.buy_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl bg-orange-500 px-4 py-3 text-white hover:bg-orange-600"
                        >
                          Buy Now
                        </a>

                      )}

                      <button
                        onClick={() =>
                          remove(
                            String(product.id)
                          )
                        }
                        className="rounded-xl bg-red-600 px-4 py-3 text-white hover:bg-red-700"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            <tr>

              <td className="sticky left-0 bg-white p-5 font-semibold dark:bg-zinc-950">
                Summary
              </td>

              {products.map((product) => (

                <td
                  key={product.id}
                  className="border p-5 align-top"
                >
                  {product.summary}
                </td>

              ))}

            </tr>

            <tr>

              <td className="sticky left-0 bg-white p-5 font-semibold dark:bg-zinc-950">
                Description
              </td>

              {products.map((product) => (

                <td
                  key={product.id}
                  className="border p-5 align-top"
                >
                  {product.description}
                </td>

              ))}

            </tr>

            <tr>

              <td className="sticky left-0 bg-white p-5 font-semibold dark:bg-zinc-950">
                Pros
              </td>

              {products.map((product) => (

                <td
                  key={product.id}
                  className="border p-5"
                >

                  <ul className="list-disc space-y-2 pl-5">

                    {(product.pros ?? []).map(
                      (pro) => (

                        <li key={pro}>
                          {pro}
                        </li>

                      )
                    )}

                  </ul>

                </td>

              ))}

            </tr>

            <tr>

              <td className="sticky left-0 bg-white p-5 font-semibold dark:bg-zinc-950">
                Cons
              </td>

              {products.map((product) => (

                <td
                  key={product.id}
                  className="border p-5"
                >

                  <ul className="list-disc space-y-2 pl-5">

                    {(product.cons ?? []).map(
                      (con) => (

                        <li key={con}>
                          {con}
                        </li>

                      )
                    )}

                  </ul>

                </td>

              ))}

            </tr>
                        {specs.map((spec) => (

              <tr key={spec}>

                <td className="sticky left-0 bg-white p-5 font-semibold dark:bg-zinc-950">
                  {spec}
                </td>

                {products.map((product) => (

                  <td
                    key={product.id}
                    className="border p-5"
                  >
                    {product.specifications?.[spec] ??
                      "—"}
                  </td>

                ))}

              </tr>

            ))}

            <tr>

              <td className="sticky left-0 bg-white p-5 font-semibold dark:bg-zinc-950">
                Created
              </td>

              {products.map((product) => (

                <td
                  key={product.id}
                  className="border p-5"
                >
                  {new Date(
                    product.created_at
                  ).toLocaleDateString()}
                </td>

              ))}

            </tr>

          </tbody>

        </table>

      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-4">

        <Link
          href="/products"
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Continue Comparing
        </Link>

        <button
          onClick={clear}
          className="rounded-xl border border-red-600 px-6 py-3 font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-zinc-900"
        >
          Clear All
        </button>

      </div>

    </div>
  );
}