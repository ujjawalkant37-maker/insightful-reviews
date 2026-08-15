import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/getProducts";
import { getCategories } from "@/lib/getCategories";
import { mapDatabaseProduct } from "@/lib/product-utils";

export default async function Trending() {
  const [databaseProducts, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const categoryMap = new Map(
    categories.map((category) => [String(category.id), category.name]),
  );

  const products = [...databaseProducts]
    .sort((a, b) => {
      const score = b.ai_score - a.ai_score;
      return score || b.rating - a.rating;
    })
    .slice(0, 4)
    .map(mapDatabaseProduct);

  return (
    <section id="trending" className="container py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-zinc-50">
            Featured Products
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-zinc-300">
            Highest-scoring products currently available in the catalogue.
          </p>
        </div>
        <Link href="/products" className="text-sm font-semibold text-indigo-600">
          See all
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed p-10 text-center text-gray-500">
          Product catalogue is temporarily unavailable.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
              <p className="mt-2 text-center text-xs text-gray-500">
                {categoryMap.get(product.categoryId) ?? "Product"}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
