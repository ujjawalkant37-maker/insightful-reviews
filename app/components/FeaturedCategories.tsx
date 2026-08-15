import Link from "next/link";
import categories from "@/data/categories.json";

export default function FeaturedCategories() {
  const productCategories = categories.filter((c) => c.type === "product");
  const directoryCategories = categories.filter((c) => c.type === "directory");
  return (
    <section id="categories" className="container py-16">
      <div className="text-center">
        <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">Browse Categories</span>
        <h2 className="mt-5 text-4xl font-bold">Explore what you need to decide</h2>
        <p className="mx-auto mt-4 max-w-3xl text-gray-600 dark:text-gray-400">Products are only the beginning. Insightful Reviews is designed to help users research purchases, services, education, healthcare and travel.</p>
      </div>
      <h3 className="mt-12 text-2xl font-bold">Products</h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {productCategories.map((c) => <Link key={c.slug} href={`/products?category=${c.slug}`} className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"><div className="text-5xl">{c.icon}</div><h4 className="mt-4 text-xl font-bold">{c.name}</h4><p className="mt-2 text-sm leading-6 text-gray-500">{c.description}</p><span className="mt-5 inline-block font-semibold text-indigo-600">Explore →</span></Link>)}
      </div>
      <h3 className="mt-14 text-2xl font-bold">Services & real-world decisions</h3>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {directoryCategories.map((c) => <Link key={c.slug} href={`/directory?category=${c.slug}`} className="rounded-2xl border bg-slate-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950"><div className="text-5xl">{c.icon}</div><h4 className="mt-4 text-xl font-bold">{c.name}</h4><p className="mt-2 text-sm leading-6 text-gray-500">{c.description}</p><span className="mt-5 inline-block font-semibold text-indigo-600">Explore Directory →</span></Link>)}
      </div>
      <div className="mt-14 rounded-3xl bg-gradient-to-r from-indigo-600 to-cyan-600 p-10 text-center text-white shadow-xl"><h3 className="text-3xl font-bold">Can&apos;t decide?</h3><p className="mx-auto mt-4 max-w-2xl text-indigo-100">Use structured comparisons, community feedback and AI-assisted analysis to move from information overload to a clear decision.</p><Link href="/products" className="mt-7 inline-flex rounded-xl bg-white px-8 py-4 font-bold text-indigo-700">Explore the platform</Link></div>
    </section>
  );
}
