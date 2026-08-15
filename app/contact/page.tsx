import Link from "next/link";

export const metadata = {
  title: "Contact Insightful Reviews",
  description: "Contact Insightful Reviews for corrections, partnerships, listing requests and support.",
};

export default function Page() {
  return (
    <main className="container max-w-4xl py-16">
      <Link href="/" className="text-sm font-semibold text-indigo-600">← Home</Link>
      <div className="mt-6 rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-4xl font-bold">Contact</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">For corrections, partnership enquiries, listing requests or general support:</p>
        <a href="mailto:hello@insightfulreviews.in" className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">hello@insightfulreviews.in</a>
        <p className="mt-6 text-sm leading-6 text-slate-500">When reporting a directory listing, include the exact entity/branch name and the information that should be corrected.</p>
      </div>
    </main>
  );
}
