import type { Product } from '@/types/models';

const fallbackBestFor: Record<string, string[]> = {
  smartphones: [
    'Mobile photography enthusiasts',
    'Travelers who need long battery life',
    'People who want a premium camera and display',
  ],
  laptops: [
    'Professionals who need portable power',
    'Students looking for all-day battery life',
    'Creators who value a crisp display',
  ],
  tvs: [
    'Movie nights and streaming sessions',
    'Console gamers who want low input lag',
    'Living rooms with bright HDR performance',
  ],
  appliances: [
    'Busy homes that need smart convenience',
    'Energy-conscious households',
    'Buyers who value quiet operation and reliability',
  ],
};

const fallbackNotRecommendedFor: Record<string, string[]> = {
  smartphones: [
    'Buyers on a very tight budget',
    'People who only need a basic phone for calls and texts',
  ],
  laptops: [
    'Users who only need a simple word processor',
    'Anyone who wants a very low-cost entry-level machine',
  ],
  tvs: [
    'Small bedroom setups with limited viewing distance',
    'Users who want a soundbar-first home theater system',
  ],
  appliances: [
    'People who prefer fully manual controls',
    'Buyers who need the cheapest option available',
  ],
};

function getAiScoreExplanation(score: number) {
  if (score >= 93) {
    return 'Excellent AI rating — top-tier performance, smart features, and a strong fit for demanding buyers.';
  }

  if (score >= 88) {
    return 'Very good AI rating — dependable performance with a balanced mix of value and capabilities.';
  }

  if (score >= 80) {
    return 'Solid AI rating — good for everyday use, though there may be some trade-offs in premium areas.';
  }

  return 'Good AI rating — this product offers a useful value proposition, with smaller compromises on power or features.';
}

function getStrengths(product: Product) {
  if (product.pros && product.pros.length > 0) {
    return product.pros;
  }

  return [
    product.summary,
    'Strong value for its category and price point.',
    'AI review highlights its balance of features and usability.',
  ];
}

function getWeaknesses(product: Product) {
  if (product.cons && product.cons.length > 0) {
    return product.cons;
  }

  if (product.aiScore < 85) {
    return ['May not satisfy users who want best-in-class performance in every area.'];
  }

  return ['Some premium alternatives may offer more advanced features.'];
}

function getBestFor(product: Product) {
  return fallbackBestFor[product.categoryId] ?? ['Buyers who want a reliable smart product with strong AI insights.'];
}

function getNotRecommendedFor(product: Product) {
  const fallback = fallbackNotRecommendedFor[product.categoryId] ?? ['Buyers seeking the absolute lowest price.'];

  if (product.aiScore >= 93) {
    return [...fallback, 'Shoppers who want the cheapest possible option.'];
  }

  return fallback;
}

export default function AIReviewSummary({ product }: { product: Product }) {
  const scoreExplanation = getAiScoreExplanation(product.aiScore);
  const strengths = getStrengths(product);
  const weaknesses = getWeaknesses(product);
  const bestFor = getBestFor(product);
  const notRecommendedFor = getNotRecommendedFor(product);

  return (
    <div className="rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-50">AI Review Summary</h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-zinc-300">Data-driven takeaways and practical guidance for this product.</p>
        </div>
        <div className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">AI Score {product.aiScore}%</div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-zinc-100">Verdict</h4>
          <p className="mt-2 text-sm text-gray-700 dark:text-zinc-300">{product.expertSummary ?? product.summary}</p>
          <p className="mt-3 text-sm text-gray-600 dark:text-zinc-400">{scoreExplanation}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-zinc-100">Best for</h4>
          <ul className="mt-2 list-disc list-inside text-sm text-gray-700 dark:text-zinc-300">
            {bestFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-zinc-100">Key strengths</h4>
          <ul className="mt-2 list-disc list-inside text-sm text-gray-700 dark:text-zinc-300">
            {strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-zinc-100">Not recommended for</h4>
          <ul className="mt-2 list-disc list-inside text-sm text-gray-700 dark:text-zinc-300">
            {notRecommendedFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-indigo-50 dark:bg-zinc-900 p-4 text-sm text-indigo-800 dark:text-indigo-200">
        <p className="font-medium">AI review note</p>
        <p className="mt-1">This summary is generated from the product data and AI score. If a product lacks specific pros or cons, the review uses category-level fallback guidance to keep recommendations useful and accurate.</p>
      </div>
    </div>
  );
}
