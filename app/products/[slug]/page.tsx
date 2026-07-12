import React from "react";
import type { Metadata } from "next";

import Breadcrumbs from "@/components/Breadcrumbs";
import AIReviewSummary from "@/components/AIReviewSummary";
import PriceHistory from "@/components/PriceHistory";
import CompareButton from "@/components/CompareButton";
import Reviews from "@/components/Reviews";
import RatingBreakdown from "@/components/RatingBreakdown";
import TopAlternatives from "@/components/TopAlternatives";
import WishlistButton from "@/components/WishlistButton";
import ReviewStats from "@/components/ReviewStats";
import AIVerdict from "@/components/AIVerdict";

import {
  getProductBySlug,
  getProducts,
} from "@/lib/getProducts";

import {
  getCategories,
} from "@/lib/getCategories";

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata> {

  const product =
    await getProductBySlug(
      params.slug
    );

  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: `${product.name} - Insightful Reviews`,
    description:
      product.summary,
  };
}

export default async function ProductPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {

  const product =
    await getProductBySlug(
      params.slug
    );

  if (!product) {
    return (
      <div className="container py-12">
        <h1 className="text-2xl font-semibold">
          Product not found
        </h1>
      </div>
    );
  }

  const categories =
    await getCategories();

  const allProducts =
    await getProducts();

  const category =
    categories.find(
      (c) =>
        c.id ===
        product.category_id
    );

  const mappedProducts =
    allProducts.map((p) => ({
      id: String(p.id),
      supabaseId: p.id,
      slug: p.slug,
      name: p.name,
      categoryId: String(
        p.category_id
      ),
      price: `₹${p.price.toLocaleString(
        "en-IN"
      )}`,
      rating: p.rating,
      aiScore: p.ai_score,
      summary: p.summary,
      specs:
        p.specifications ??
        {},
      pros: p.pros ?? [],
      cons: p.cons ?? [],
      expertSummary:
        p.description,
      buyUrl:
        p.buy_url ?? "",
      images:
        p.images ?? [],
    }));
      const mappedProduct = {
    id: String(product.id),
    supabaseId: product.id,
    slug: product.slug,
    name: product.name,
    categoryId: String(
      product.category_id
    ),
    price: `₹${product.price.toLocaleString(
      "en-IN"
    )}`,
    rating: product.rating,
    aiScore: product.ai_score,
    summary: product.summary,
    specs:
      product.specifications ??
      {},
    pros:
      product.pros ?? [],
    cons:
      product.cons ?? [],
    expertSummary:
      product.description,
    buyUrl:
      product.buy_url ?? "",
    images:
      product.images ?? [],
  };

  return (

    <div className="container py-12">

      <Breadcrumbs
        items={[
          {
            href: "/products",
            label: "Products",
          },
          {
            href: `/products?category=${category?.slug}`,
            label:
              category?.name ??
              "Category",
          },
          {
            label:
              mappedProduct.name,
          },
        ]}
      />

      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">

        <div className="md:col-span-2">

          <h1 className="text-2xl font-semibold text-gray-900 dark:text-zinc-50">
            {mappedProduct.name}
          </h1>

          <p className="mt-2 text-sm text-gray-600 dark:text-zinc-300">
            {mappedProduct.summary}
          </p>

          {mappedProduct.images?.[0] && (

            <div className="mt-4">

              <img
                src={
                  mappedProduct.images[0]
                }
                alt={
                  mappedProduct.name
                }
                className="max-h-96 w-full rounded-lg object-cover"
              />

            </div>

          )}

          <div className="mt-4 flex items-center gap-6">

            <div className="text-2xl font-semibold text-gray-900 dark:text-zinc-50">
              {mappedProduct.price}
            </div>

            <div className="text-sm text-yellow-500">
              {
                "★".repeat(
                  Math.round(
                    mappedProduct.rating
                  )
                )
              }
              {
                "☆".repeat(
                  5 -
                    Math.round(
                      mappedProduct.rating
                    )
                )
              }
            </div>

            <div className="ml-4 text-sm text-gray-600 dark:text-zinc-300">

              AI Score{" "}
              <span className="font-medium">
                {mappedProduct.aiScore}%
              </span>

            </div>

          </div>
                    <section className="mt-6">

            <h3 className="text-lg font-medium">
              Specifications
            </h3>

            <dl className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">

              {mappedProduct.specs &&
                Object.entries(
                  mappedProduct.specs
                ).map(([key, value]) => (

                  <div
                    key={key}
                    className="text-sm text-gray-700 dark:text-zinc-300"
                  >

                    <dt className="font-medium">
                      {key}
                    </dt>

                    <dd className="mt-1">
                      {value}
                    </dd>

                  </div>

                ))}

            </dl>

          </section>

          {mappedProduct.pros.length > 0 && (

            <section className="mt-6">

              <h3 className="text-lg font-medium">
                Pros
              </h3>

              <ul className="mt-2 list-inside list-disc text-sm text-gray-700 dark:text-zinc-300">

                {mappedProduct.pros.map(
                  (pro, index) => (

                    <li key={index}>
                      {pro}
                    </li>

                  )
                )}

              </ul>

            </section>

          )}

          {mappedProduct.cons.length > 0 && (

            <section className="mt-6">

              <h3 className="text-lg font-medium">
                Cons
              </h3>

              <ul className="mt-2 list-inside list-disc text-sm text-gray-700 dark:text-zinc-300">

                {mappedProduct.cons.map(
                  (con, index) => (

                    <li key={index}>
                      {con}
                    </li>

                  )
                )}

              </ul>

            </section>

          )}

          {mappedProduct.expertSummary && (

            <section className="mt-6">

              <h3 className="text-lg font-medium">
                Expert Summary
              </h3>

              <p className="mt-2 text-sm text-gray-700 dark:text-zinc-300">

                {mappedProduct.expertSummary}

              </p>

            </section>

          )}

          <section className="mt-6">

            <AIReviewSummary
              product={mappedProduct}
            />

            <ReviewStats
              rating={
                mappedProduct.rating
              }
            />

            <RatingBreakdown
              rating={
                mappedProduct.rating
              }
            />

            <PriceHistory
              currentPrice={
                mappedProduct.price
              }
            />

            <TopAlternatives
              currentId={
                mappedProduct.id
              }
              products={
                mappedProducts
              }
            />

            <AIVerdict
              score={
                mappedProduct.aiScore
              }
            />

          </section>

          <section>

            <React.Suspense>

              <Reviews
                productId={
                  String(product.id)
                }
              />

            </React.Suspense>

          </section>

        </div>
                <aside className="rounded-md border border-gray-100 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900 md:col-span-1">

          <div className="text-sm text-gray-600 dark:text-zinc-300">
            Price
          </div>

          <div className="mt-1 text-xl font-semibold text-gray-900 dark:text-zinc-50">
            {mappedProduct.price}
          </div>

          <div className="mt-3 text-yellow-500">
            {"★".repeat(
              Math.round(mappedProduct.rating)
            )}
            {"☆".repeat(
              5 -
                Math.round(
                  mappedProduct.rating
                )
            )}
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-zinc-300">
            AI Score
          </div>

          <div className="mt-1 text-lg font-semibold">
            {mappedProduct.aiScore}%
          </div>

          <div className="mt-6 flex flex-col gap-3">

            <a
              href={
                mappedProduct.buyUrl || "#"
              }
              className={`w-full rounded-md bg-indigo-600 px-4 py-2 text-center text-white ${
                mappedProduct.buyUrl
                  ? "hover:bg-indigo-700"
                  : "pointer-events-none opacity-50"
              }`}
            >
              Buy Now
            </a>

            <a
              href={`/write-review?productId=${product.id}`}
              className="w-full rounded-md border border-indigo-600 px-4 py-2 text-center text-indigo-600 hover:bg-indigo-50"
            >
              Write Review
            </a>

            <React.Suspense>

              <CompareButton
                id={mappedProduct.id}
                slug={mappedProduct.slug}
              />

            </React.Suspense>

            <React.Suspense fallback={null}>

              <WishlistButton
                id={String(product.id)}
              />

            </React.Suspense>

          </div>

        </aside>

      </div>

    </div>

  );

}