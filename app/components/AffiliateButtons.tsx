import type { Product } from "@/types/models";
import { getAffiliateOptions } from "@/lib/affiliate";

export default function AffiliateButtons({ product }: { product: Product }) {
  const options = getAffiliateOptions(product);
  if (options.length === 0) return null;

  return (
    <div className="mt-4 rounded-2xl border bg-slate-50 p-4 dark:border-zinc-800 dark:bg-zinc-800">
      <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">Where to buy</div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <a
            key={`${option.name}-${option.url}`}
            href={option.url}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="rounded-xl border bg-white px-4 py-3 text-center text-sm font-semibold hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >
            {option.name}
          </a>
        ))}
      </div>
      <p className="mt-3 text-xs leading-5 text-gray-500">
        Some links may be affiliate links. Prices and availability are controlled by the retailer.
      </p>
    </div>
  );
}
