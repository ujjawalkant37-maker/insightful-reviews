import Link from "next/link";

export default function UserReviews() {
  return (
    <section className="container py-12">
      <div className="rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">Community standard</span>
        <h2 className="mt-5 text-3xl font-bold">Real experiences, not made-up testimonials.</h2>
        <p className="mt-4 max-w-3xl leading-7 text-slate-600 dark:text-slate-400">
          Insightful Reviews does not use invented homepage testimonials to make the platform look bigger than it is. Published community reviews come through the review system and are subject to moderation. External reviews, when connected, stay labelled by their source.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/directory" className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">Read Community Opinions</Link>
          <Link href="/write-review" className="rounded-xl border px-5 py-3 font-semibold dark:border-zinc-700">Share Your Experience</Link>
        </div>
      </div>
    </section>
  );
}
