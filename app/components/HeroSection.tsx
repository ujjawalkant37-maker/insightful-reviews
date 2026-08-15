import Link from "next/link";
import SearchBar from "@/components/SearchBar";

type Props = {
  value?: string;
  onChange?: (q: string) => void;
  onSearch?: (q: string) => void;
};

export default function HeroSection({ value, onChange, onSearch }: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-900 text-white">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-indigo-500 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500 blur-3xl" />
      </div>

      <div className="container relative py-20 sm:py-24">
        <div className="max-w-4xl">
          <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">🛡️ A trust-first decision platform for India</span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-6xl">
            Before you decide,
            <span className="block text-cyan-300">know what people experienced.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
            Research hospitals, schools, colleges, hotels, restaurants, services and products. Read branch-specific community opinions, source-attributed reviews and AI-assisted insights — then decide with more confidence and less regret.
          </p>

          <div className="mt-8 max-w-3xl">
            <SearchBar value={value} onChange={onChange} onSearch={onSearch} placeholder="Search a hospital, school, hotel, service or product…" />
            <p className="mt-3 text-sm text-slate-300">Try: Apollo Hospitals, AIIMS, Delhi Public School, Taj, OnePlus 12</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/directory" className="rounded-xl bg-white px-6 py-3 font-bold text-slate-900 hover:bg-slate-100">Explore Places & Services</Link>
            <Link href="/products" className="rounded-xl border border-white/25 bg-white/10 px-6 py-3 font-bold text-white hover:bg-white hover:text-slate-900">Research Products</Link>
          </div>
        </div>

        <div className="mt-14 grid max-w-5xl gap-4 sm:grid-cols-3">
          {[
            ["01", "Exact branch", "Keep a hospital, school or service location separate from its other branches."],
            ["02", "Source-aware", "External reviews remain attributed to the source instead of becoming one misleading number."],
            ["03", "Community first", "Real experiences can be submitted, moderated and attached to the exact entity."],
          ].map(([number, title, text]) => (
            <div key={number} className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <div className="text-sm font-bold text-cyan-300">{number}</div>
              <h3 className="mt-2 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
