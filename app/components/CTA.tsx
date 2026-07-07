import React from "react";

export default function CTA() {
  return (
    <section id="cta" className="container py-12">
      <div className="rounded-lg bg-indigo-600 text-white p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">Make smarter purchases</h3>
          <p className="mt-1 text-sm text-indigo-100">Sign up to get concise buying guidance, price alerts and curated comparisons from our AI.</p>
        </div>

        <div className="flex items-center gap-3">
          <a href="#" className="px-4 py-2 rounded-md bg-white text-indigo-600 font-medium">Create account</a>
          <a href="#" className="px-4 py-2 rounded-md border border-white/30 text-white">Contact sales</a>
        </div>
      </div>
    </section>
  );
}
