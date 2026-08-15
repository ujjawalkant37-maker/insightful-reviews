import Link from "next/link";

export const metadata = {
  title: "Review Policy",
  description: "How Insightful Reviews handles community reviews, source attribution, verification and moderation.",
};

export default function Page() {
  return (
    <main className="container max-w-4xl py-16">
      <Link href="/" className="text-sm font-semibold text-indigo-600">← Home</Link>
      <article className="mt-6 rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-10">
        <h1 className="text-4xl font-extrabold">Review Policy</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">The purpose of a review is to describe an experience, not to manufacture a reputation.</p>
        <div className="mt-8 space-y-7 text-sm leading-7 text-slate-700 dark:text-slate-300">
          <section><h2 className="text-xl font-bold text-slate-900 dark:text-white">Community reviews</h2><p className="mt-2">Submitted reviews are associated with the exact directory entity or product and can be held for moderation. We may reject spam, impersonation, abusive content, obvious manipulation, unsafe claims or content that cannot reasonably help another user make a decision.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 dark:text-white">Verification</h2><p className="mt-2">A review is not labelled verified unless the available data supports that label. Having an account does not by itself mean that a purchase, visit or patient relationship has been independently verified.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 dark:text-white">External reviews</h2><p className="mt-2">Where licensed or authorised sources are connected, external reviews remain attributed to their original source. We do not silently merge different platforms into a single invented review pool.</p></section>
          <section><h2 className="text-xl font-bold text-slate-900 dark:text-white">High-impact decisions</h2><p className="mt-2">Healthcare, education, legal, financial and other high-impact decisions require additional verification. A community opinion or AI summary should not replace official information or professional advice.</p></section>
        </div>
      </article>
    </main>
  );
}
