import Link from "next/link";

export const metadata = {
  title: "Terms of Use",
  description: "Insightful Reviews provides information for research and decision support.",
};

export default function Page() {
  return (
    <main className="container max-w-4xl py-16">
      <Link href="/" className="text-sm font-semibold text-indigo-600">← Home</Link>
      <div className="mt-6 rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-4xl font-bold">&quot;Terms of Use&quot;</h1>
        <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300">&quot;Insightful Reviews provides information for research and decision support.&quot;</p>
        <div className="mt-8 space-y-6 leading-8 text-gray-700 dark:text-gray-300"><p>Prices, availability, healthcare information, education information and directory details can change. Users should verify important information with the relevant provider.</p></div>
      </div>
    </main>
  );
}
