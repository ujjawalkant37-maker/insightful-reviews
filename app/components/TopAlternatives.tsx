import Link from "next/link";
import type { Product } from "@/types/models";

type Props = {
  currentId: string;
  products: Product[];
};

export default function TopAlternatives({
  currentId,
  products,
}: Props) {
  const alternatives = products
    .filter((p) => p.id !== currentId)
    .sort((a, b) => b.aiScore - a.aiScore)
    .slice(0, 3);

  if (!alternatives.length) return null;

  return (
    <section className="mt-10 rounded-xl border bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900">

      <h2 className="text-2xl font-bold">
        🏆 Top Alternatives
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        AI recommends these products as strong alternatives.
      </p>

      <div className="mt-6 space-y-4">

        {alternatives.map((item, index) => (

          <Link
            key={item.id}
            href={`/products/${item.slug}`}
            className="flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50 dark:hover:bg-zinc-800"
          >

            <div>

              <div className="font-semibold">
                #{index + 1} {item.name}
              </div>

              <div className="mt-1 text-sm text-gray-500">
                ⭐ {item.rating} | AI Score {item.aiScore}%
              </div>

            </div>

            <div className="text-lg font-bold">
              {item.price}
            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}