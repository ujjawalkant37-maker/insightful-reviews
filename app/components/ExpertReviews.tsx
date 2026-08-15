import Link from "next/link";
import { getProducts } from "@/lib/getProducts";

export default async function ExpertReviews() {
  const products = (await getProducts()).sort((a, b) => b.ai_score - a.ai_score || b.rating - a.rating).slice(0, 3);

  return (
    <section className="container py-12">
      <div className="mb-8">
        <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">Editorial analysis</span>
        <h2 className="mt-4 text-3xl font-bold">Current catalogue analysis</h2>
        <p className="mt-2 max-w-3xl text-slate-600 dark:text-slate-400">These are catalogue decision scores, not invented expert testimonials or certifications.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {products.map((product) => (
          <article key={product.slug} className="rounded-2xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="text-sm font-bold text-indigo-600">AI decision score {product.ai_score}/100</div>
            <h3 className="mt-3 text-xl font-bold">{product.name}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{product.summary}</p>
            <Link href={`/products/${product.slug}`} className="mt-5 inline-flex rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white">View evidence</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
