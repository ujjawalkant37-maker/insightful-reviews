import Link from "next/link";

export const metadata = {
  title: "How Insightful Reviews Works",
  description: "Learn how Insightful Reviews combines structured information, community opinions and source-attributed reviews to help people make lower-regret decisions.",
};

export default function Page() {
  return (
    <main className="container max-w-5xl py-16">
      <Link href="/" className="text-sm font-semibold text-indigo-600">← Home</Link>
      <section className="mt-6 rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-10">
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Our purpose</span>
        <h1 className="mt-4 text-4xl font-extrabold">Make important decisions with more information and less regret.</h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600 dark:text-slate-300">A hospital, school, college, hotel, service provider or expensive product can affect your money, time and wellbeing. Insightful Reviews exists so people can research those decisions before committing.</p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["Structured facts", "Location, branch, category and source information are kept separate from opinions."],
            ["Community experience", "People can describe what they actually experienced. Reviews are submitted for moderation."],
            ["AI assistance", "AI can summarise available evidence, but it should not be treated as a substitute for professional or official information."],
          ].map(([title, text]) => <div key={title} className="rounded-2xl bg-slate-50 p-6 dark:bg-zinc-800"><h2 className="font-bold">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p></div>)}
        </div>

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-7 text-amber-900">
          <strong>Important:</strong> A review is an experience, not a universal fact. For healthcare, education, admissions, pricing, legal matters and other high-impact decisions, verify current information with the provider or relevant authority.
        </div>
      </section>
    </main>
  );
}
