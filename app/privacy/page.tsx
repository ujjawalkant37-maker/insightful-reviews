import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "This starter policy describes the broad data practices of the application.",
};

export default function Page() {
  return (
    <main className="container max-w-4xl py-16">
      <Link href="/" className="text-sm font-semibold text-indigo-600">← Home</Link>
      <div className="mt-6 rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-4xl font-bold">&quot;Privacy Policy&quot;</h1>
        <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300">&quot;This starter policy describes the broad data practices of the application.&quot;</p>
        <div className="mt-8 space-y-6 leading-8 text-gray-700 dark:text-gray-300"><p>Before public launch, review and customise this policy with qualified legal advice. Authentication and account data may be processed by Supabase. Optional analytics only load when configured.</p></div>
      </div>
    </main>
  );
}
