import Link from "next/link";

export const metadata = { title: "How to Compare Colleges | Insightful Reviews" };

export default function GuidePage() {
  const points = ["Verify accreditation and programme recognition.", "Compare curriculum, faculty and placement information.", "Calculate total cost of attendance.", "Check campus, location and student support.", "Use official admission information for current dates and rules."];
  return (
    <main className="container max-w-4xl py-12">
      <Link href="/guides" className="text-sm font-semibold text-indigo-600">← All guides</Link>
      <h1 className="mt-6 text-4xl font-bold">How to Compare Colleges</h1>
      <div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <ul className="space-y-5">{points.map((p) => <li key={p} className="flex gap-3 leading-8"><span>✓</span><span>{p}</span></li>)}</ul>
        <div className="mt-8 rounded-2xl bg-amber-50 p-5 text-sm leading-7 text-amber-900">General decision guidance only. Verify current facts and prices before making a decision.</div>
      </div>
    </main>
  );
}
