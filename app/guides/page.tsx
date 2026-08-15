import Link from "next/link";
const guides = [
  ["best-smartphones-under-20000","Best Smartphones Under ₹20,000","Compare processor, display, camera, battery, software support and current price."],
  ["best-smartphones-under-30000","Best Smartphones Under ₹30,000","Balance performance, camera quality, software support and long-term value."],
  ["best-laptops-for-students","Best Laptops for Students","Prioritise battery life, keyboard quality, serviceability and the actual workload."],
  ["hospital-selection-guide","How to Evaluate a Hospital","Compare specialty availability, doctor credentials, emergency access and communication. Verify all medical information directly."],
  ["school-selection-guide","How to Choose a School","Compare curriculum, commute, fees, student support, safety and fit rather than a single ranking."],
  ["college-selection-guide","How to Compare Colleges","Check accreditation, programme quality, faculty, placements, total cost and student outcomes."],
];
export const metadata = { title: "Decision Guides | Insightful Reviews" };
export default function GuidesPage() {
  return <main className="container py-12"><span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">Guides</span><h1 className="mt-5 text-4xl font-bold">Decision guides</h1><p className="mt-3 max-w-3xl text-gray-600 dark:text-gray-400">Practical frameworks for making better decisions. Category-specific facts should always be verified before purchase or enrolment.</p><div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{guides.map(([slug,title,desc])=><article key={slug} className="rounded-2xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"><h2 className="text-xl font-bold">{title}</h2><p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">{desc}</p><Link href={`/guides/${slug}`} className="mt-5 inline-block font-semibold text-indigo-600">Read guide →</Link></article>)}</div></main>;
}
