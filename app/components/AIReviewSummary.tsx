import type { Product } from "@/types/models";

const fallbackBestFor: Record<string, string[]> = {
  smartphones: [
    "Mobile photographers",
    "Heavy users needing long battery life",
    "Flagship lovers",
  ],
  laptops: [
    "Students",
    "Professionals",
    "Content creators",
  ],
  tvs: [
    "Movie lovers",
    "Console gamers",
    "Family entertainment",
  ],
  appliances: [
    "Large families",
    "Energy conscious homes",
    "Smart home users",
  ],
};

const fallbackNotRecommendedFor: Record<string, string[]> = {
  smartphones: [
    "People looking for the cheapest phone",
    "Basic calling-only users",
  ],
  laptops: [
    "Very low-budget buyers",
    "Users needing only web browsing",
  ],
  tvs: [
    "Small bedrooms",
    "Ultra-budget buyers",
  ],
  appliances: [
    "People wanting manual controls",
    "Budget-only shoppers",
  ],
};

function scoreText(score: number) {
  if (score >= 95)
    return {
      label: "Outstanding",
      color: "bg-green-600",
      verdict: "BUY",
    };

  if (score >= 90)
    return {
      label: "Excellent",
      color: "bg-green-500",
      verdict: "BUY",
    };

  if (score >= 82)
    return {
      label: "Very Good",
      color: "bg-yellow-500",
      verdict: "WAIT",
    };

  return {
    label: "Average",
    color: "bg-red-500",
    verdict: "AVOID",
  };
}

export default function AIReviewSummary({
  product,
}: {
  product: Product;
}) {
  const score = scoreText(product.aiScore);

  const strengths =
    product.pros?.length
      ? product.pros
      : [
          "Excellent value",
          "Reliable performance",
          "Balanced feature set",
        ];

  const weaknesses =
    product.cons?.length
      ? product.cons
      : [
          "Premium competitors offer more features",
        ];

  const bestFor =
    fallbackBestFor[product.categoryId] ??
    ["General users"];

  const avoid =
    fallbackNotRecommendedFor[
      product.categoryId
    ] ?? ["Lowest-budget buyers"];

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            🤖 AI Decision Engine
          </span>

          <h2 className="mt-5 text-3xl font-bold">
            AI Review Summary
          </h2>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            AI analysed expert opinions,
            specifications,
            ratings,
            user feedback
            and overall value.
          </p>

        </div>

        <div className="text-center">

          <div
            className={`${score.color} rounded-full px-6 py-3 text-2xl font-bold text-white`}
          >
            {product.aiScore}/100
          </div>

          <div className="mt-3 text-lg font-semibold">
            {score.label}
          </div>

          <div className="mt-1 text-sm text-gray-500">
            Verdict:
            {" "}
            <span className="font-bold">
              {score.verdict}
            </span>
          </div>

        </div>

      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">

        <div className="rounded-2xl bg-green-50 p-6">

          <h3 className="mb-4 text-xl font-bold text-green-700">
            ✅ Strengths
          </h3>

          <ul className="space-y-3">

            {strengths.map((item) => (
              <li key={item}>
                • {item}
              </li>
            ))}

          </ul>

        </div>

        <div className="rounded-2xl bg-red-50 p-6">

          <h3 className="mb-4 text-xl font-bold text-red-700">
            ❌ Weaknesses
          </h3>

          <ul className="space-y-3">

            {weaknesses.map((item) => (
              <li key={item}>
                • {item}
              </li>
            ))}

          </ul>

        </div>

      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">

        <div>

          <h3 className="mb-4 text-xl font-bold">
            👍 Best For
          </h3>

          <ul className="space-y-2">

            {bestFor.map((item) => (
              <li key={item}>
                ✔ {item}
              </li>
            ))}

          </ul>

        </div>

        <div>

          <h3 className="mb-4 text-xl font-bold">
            🚫 Not Recommended For
          </h3>

          <ul className="space-y-2">

            {avoid.map((item) => (
              <li key={item}>
                ✖ {item}
              </li>
            ))}

          </ul>

        </div>

      </div>

      <div className="mt-10 rounded-2xl bg-indigo-50 p-6">

        <h3 className="font-bold text-indigo-700">
          AI Final Opinion
        </h3>

        <p className="mt-3 leading-7 text-gray-700">
          {product.expertSummary ??
            product.summary}
        </p>

      </div>

    </section>
  );
}