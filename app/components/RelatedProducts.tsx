import Link from "next/link";
import type { Product } from "@/types/models";

type Props = {
  currentProductId: string;
  categoryId: string;
  products: Product[];
};

export default function RelatedProducts({
  currentProductId,
  categoryId,
  products,
}: Props) {
  const related = products
    .filter(
      (p) =>
        p.categoryId === categoryId &&
        p.id !== currentProductId
    )
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-12">

      <h2 className="mb-6 text-2xl font-bold">
        Similar Products
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

        {related.map((product) => (

          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="rounded-xl border bg-white p-4 shadow transition hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >

            <img
              src={product.images?.[0] ?? "/placeholder.svg"}
              alt={product.name}
              className="h-40 w-full rounded-lg object-cover"
            />

            <h3 className="mt-4 font-semibold">
              {product.name}
            </h3>

            <div className="mt-2 text-yellow-500">
              {"★".repeat(Math.round(product.rating))}
              {"☆".repeat(5 - Math.round(product.rating))}
            </div>

            <div className="mt-2 text-lg font-bold">
              {product.price}
            </div>

            <div className="mt-3 rounded-lg bg-indigo-600 py-2 text-center text-white">
              View Details
            </div>

          </Link>

        ))}

      </div>

    </section>
  );
}