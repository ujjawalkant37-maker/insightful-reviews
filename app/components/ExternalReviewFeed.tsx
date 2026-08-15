import type { ExternalReview } from "@/lib/review-intelligence";

export default function ExternalReviewFeed({
  reviews,
  title = "Reviews from other platforms",
}: {
  reviews: ExternalReview[];
  title?: string;
}) {
  if (!reviews.length) return null;
  return (
    <section className="mt-8 rounded-3xl border bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Source-attributed</span>
          <h2 className="mt-2 text-2xl font-bold">{title}</h2>
          <p className="mt-2 text-sm text-gray-500">These excerpts remain attributed to their original platform. Insightful Reviews does not rewrite the underlying review.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold dark:bg-zinc-800">{reviews.length} shown</span>
      </div>
      <div className="mt-6 space-y-4">
        {reviews.map((review) => (
          <article key={`${review.source}-${review.id}`} className="rounded-2xl border p-5 dark:border-zinc-800">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="font-bold">{review.source_label}</div>
              <div className="text-sm text-amber-600">{review.rating ? `${review.rating}/5 ★` : "Unrated"}</div>
            </div>
            {review.title ? <h3 className="mt-3 font-bold">{review.title}</h3> : null}
            <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-gray-700 dark:text-gray-300">{review.review_text}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
              {review.author_name ? <span>By {review.author_name}</span> : null}
              {review.published_at ? <span>{new Date(review.published_at).toLocaleDateString("en-IN")}</span> : null}
              {review.verified ? <span className="rounded-full bg-emerald-50 px-2 py-1 font-semibold text-emerald-700">Verified source</span> : null}
              {review.review_url ? <a href={review.review_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-600">Open source ↗</a> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
