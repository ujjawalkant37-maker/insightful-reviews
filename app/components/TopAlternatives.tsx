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
    .filter(
      (product) =>
        product.id !== currentId
    )
    .sort(
      (a, b) =>
        b.aiScore - a.aiScore
    )
    .slice(0, 3);

  if (alternatives.length === 0) {
    return null;
  }

  return (

    <section className="mt-10 rounded-2xl border bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            🏆 Top Alternatives
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            AI recommends these products
            as the strongest alternatives.
          </p>

        </div>

      </div>

      <div className="mt-6 space-y-4">

        {alternatives.map(
          (
            product,
            index
          ) => (

            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="flex items-center justify-between rounded-xl border p-4 transition hover:bg-slate-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
            >

              <div>

                <div className="font-semibold">

                  #{index + 1}{" "}
                  {product.name}

                </div>

                <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-500">

                  <span>
                    ⭐ {product.rating}
                  </span>

                  <span>
                    AI Score{" "}
                    {product.aiScore}%
                  </span>

                </div>

              </div>

              <div className="text-right">

                <div className="text-lg font-bold">

                  {product.price}

                </div>

              </div>

            </Link>

          )
        )}

      </div>

    </section>

  );

}