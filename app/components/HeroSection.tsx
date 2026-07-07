import React from "react";
import SearchBar from "./SearchBar";

export default function HeroSection() {
  return (
    <section className="container py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900 dark:text-zinc-50">
            Insightful Reviews — AI-powered product research
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-zinc-300 max-w-xl">
            Discover data-driven reviews and comparisons for the latest electronics. Our AI summarizes expert analysis and user feedback so you can buy with confidence.
          </p>

          <div className="mt-6">
            <SearchBar />
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center">
          <div className="w-full max-w-md rounded-lg bg-gradient-to-tr from-indigo-50 to-white p-6 shadow">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-50">Smart choice example</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-zinc-300">The AI highlights top trade-offs: battery life vs. performance across real-world usage.</p>
            <dl className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <dt className="text-xs text-gray-500">Top pick</dt>
                <dd className="text-sm font-medium">Aurora X2 Pro</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500">Best value</dt>
                <dd className="text-sm font-medium">Breeze 14</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
