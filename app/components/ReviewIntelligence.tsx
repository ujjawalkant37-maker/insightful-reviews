import type { ReviewIntelligence as Intelligence } from "@/lib/review-intelligence";

export default function ReviewIntelligence({ intelligence, title = "Review Intelligence" }: { intelligence: Intelligence; title?: string }) {
  if (!intelligence.total) {
    return (
      <section className="mt-8 rounded-3xl border bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Cross-platform review layer</span>
        <h2 className="mt-2 text-2xl font-bold">{title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">External reviews are displayed only from traceable, authorised/API-backed sources. Add a source connection or import a licensed feed to activate this layer.</p>
      </section>
    );
  }

  const confidence = Math.min(100, Math.round(Math.log10(intelligence.total + 1) * 35 + Math.min(25, intelligence.sources.length * 8)));
  return (
    <section className="mt-8 rounded-3xl border bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Cross-platform review layer</span>
          <h2 className="mt-2 text-2xl font-bold">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">Insightful Reviews keeps every review tied to its original source, then analyses the combined signal. This avoids presenting different platforms as one undifferentiated rating.</p>
        </div>
        <div className="rounded-2xl bg-indigo-50 px-5 py-4 text-center dark:bg-indigo-950/40"><div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">{confidence}/100</div><div className="text-xs text-gray-500">signal confidence</div></div>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label="Imported reviews" value={String(intelligence.total)} />
        <Metric label="Average rating" value={intelligence.average ? `${intelligence.average.toFixed(1)}/5` : "—"} />
        <Metric label="Positive signals" value={`${Math.round((intelligence.positive / intelligence.total) * 100)}%`} />
        <Metric label="Sources" value={String(intelligence.sources.length)} />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div><h3 className="font-bold">Source breakdown</h3><div className="mt-3 space-y-2">{intelligence.sources.map((source) => <div key={source.source} className="flex items-center justify-between rounded-xl border p-3 dark:border-zinc-800"><span className="font-medium">{source.label}</span><span className="text-sm text-gray-500">{source.count} · {source.average ? source.average.toFixed(1) : "—"}★</span></div>)}</div></div>
        <div><h3 className="font-bold">Themes detected</h3><div className="mt-3 flex flex-wrap gap-2">{intelligence.themes.slice(0, 8).map((theme) => <span key={theme.label} className={`rounded-full px-3 py-2 text-xs font-semibold ${theme.sentiment === "positive" ? "bg-emerald-50 text-emerald-700" : theme.sentiment === "negative" ? "bg-rose-50 text-rose-700" : "bg-amber-50 text-amber-700"}`}>{theme.label} · {theme.count}</span>)}</div></div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl bg-slate-50 p-4 dark:bg-zinc-800"><div className="text-2xl font-bold">{value}</div><div className="mt-1 text-xs text-gray-500">{label}</div></div>; }
