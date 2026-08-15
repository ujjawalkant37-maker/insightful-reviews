"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import HeroSection from "./HeroSection";
import HomeCatalog from "./HomeCatalog";
import FeaturedProducts from "./FeaturedProducts";
import CTA from "./CTA";
import WriteReviewButton from "@/components/WriteReviewButton";

const decisionCategories = [
  { icon: "🏥", title: "Hospitals", text: "Compare hospitals, branches and patient experiences.", href: "/directory?category=hospitals" },
  { icon: "🏫", title: "Schools", text: "Research schools through parent and student experiences.", href: "/directory?category=schools" },
  { icon: "🎓", title: "Colleges", text: "Look beyond brochures before choosing an institution.", href: "/directory?category=colleges" },
  { icon: "🏨", title: "Hotels", text: "See location-specific stays and guest feedback.", href: "/directory?category=hotels" },
  { icon: "🍽️", title: "Restaurants", text: "Find real experiences before spending your money.", href: "/directory?category=restaurants" },
  { icon: "🛍️", title: "Products", text: "Compare products, reviews and buying options.", href: "/products" },
];

export default function HomeShell() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(search: string) {
    const trimmed = search.trim();
    if (!trimmed) {
      router.push("/directory");
      return;
    }
    router.push(`/directory?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-zinc-950">
      <HeroSection value={query} onChange={setQuery} onSearch={handleSearch} />

      <section className="container -mt-8 relative z-10">
        <div className="grid gap-4 rounded-3xl border bg-white p-5 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 sm:grid-cols-3">
          <div><div className="text-2xl">🔎</div><h3 className="mt-2 font-bold">Research before deciding</h3><p className="mt-1 text-sm text-slate-500">Search a hospital, school, hotel, service or product.</p></div>
          <div><div className="text-2xl">💬</div><h3 className="mt-2 font-bold">Read experiences</h3><p className="mt-1 text-sm text-slate-500">See source-attributed and community opinions without mixing them blindly.</p></div>
          <div><div className="text-2xl">🛡️</div><h3 className="mt-2 font-bold">Make a lower-regret choice</h3><p className="mt-1 text-sm text-slate-500">We show what is known, what is community opinion and what still needs verification.</p></div>
        </div>
      </section>

      <section className="container py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">The core mission</span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Before you choose. Check what people experienced.</h2>
            <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-400">Insightful Reviews is being built for decisions where regret is expensive — a hospital, school, college, hotel, restaurant, service provider or product.</p>
          </div>
          <Link href="/directory" className="shrink-0 rounded-xl bg-indigo-600 px-5 py-3 text-center font-semibold text-white hover:bg-indigo-700">Explore Directory</Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {decisionCategories.map((item) => (
            <Link key={item.title} href={item.href} className="group rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
              <div className="text-4xl">{item.icon}</div>
              <h3 className="mt-4 text-xl font-bold group-hover:text-indigo-600">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{item.text}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-indigo-600">Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container pb-16">
        <div className="rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">Our review standard</span>
              <h2 className="mt-5 text-3xl font-bold">No invented reviews. No hidden rating mash-up.</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-600 dark:text-slate-400">Community opinions are kept attached to the exact place or branch. External reviews remain labelled by source. Verified status is shown only when supported by the available data.</p>
            </div>
            <Link href="/about" className="rounded-xl border px-6 py-3 text-center font-semibold hover:bg-slate-50 dark:border-zinc-700 dark:hover:bg-zinc-800">How it works</Link>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="mb-6">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Shopping vertical</span>
          <h2 className="mt-2 text-3xl font-bold">Products you can compare and buy</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">The original product engine remains part of the platform, with comparison, AI-assisted analysis and retailer links.</p>
        </div>
        <HomeCatalog query="" />
      </section>

      <section className="container py-12">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">Catalogue highlights</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Current catalogue scores are decision aids, not guarantees or independent expert certifications.</p>
        </div>
        <FeaturedProducts />
      </section>

      <section className="container py-12">
        <div className="flex flex-col gap-5 rounded-3xl bg-slate-900 p-8 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Have you actually used a place or product?</h2>
            <p className="mt-2 max-w-2xl text-slate-300">Your experience can help someone else avoid a bad decision. Reviews are submitted for moderation before publication.</p>
          </div>
          <WriteReviewButton />
        </div>
      </section>

      <CTA />
    </main>
  );
}
