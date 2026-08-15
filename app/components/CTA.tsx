import Link from "next/link";

export default function CTA() {
  return (
    <section className="container py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-800 via-blue-800 to-cyan-700 px-8 py-14 shadow-2xl lg:px-16">
        <div className="relative mx-auto max-w-5xl">
          <div className="max-w-3xl">
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">Build a better review community</span>
            <h2 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl">Your experience can save someone else from regret.</h2>
            <p className="mt-5 text-lg leading-8 text-blue-100">Share what you actually experienced. The platform is designed to keep opinions tied to the exact entity or branch and to moderate submissions before publication.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/write-review" className="rounded-xl bg-white px-6 py-3 font-bold text-indigo-700 hover:bg-slate-100">Write a Review</Link>
            <Link href="/directory/suggest" className="rounded-xl border border-white/30 px-6 py-3 font-bold text-white hover:bg-white/10">Suggest a Place</Link>
            <Link href="/signup" className="rounded-xl border border-white/30 px-6 py-3 font-bold text-white hover:bg-white/10">Create Free Account</Link>
          </div>
          <p className="mt-6 text-sm text-blue-200">Independent information • Community driven • AI assisted • Affiliate links clearly disclosed</p>
        </div>
      </div>
    </section>
  );
}
