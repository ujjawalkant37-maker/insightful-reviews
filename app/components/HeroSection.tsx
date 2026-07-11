import React from "react";
import SearchBar from "@/components/SearchBar";

type Props = {
  value?: string;
  onChange?: (q: string) => void;
  onSearch?: (q: string) => void;
};

export default function HeroSection({
  value,
  onChange,
  onSearch,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 text-white">

      {/* Background Blur */}
      <div className="absolute inset-0">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl"></div>
      </div>

      <div className="container relative py-24">

        <div className="grid gap-14 lg:grid-cols-2 items-center">

          {/* Left */}

          <div>

            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
              🤖 AI Powered Product Research Platform
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight lg:text-6xl">

              Buy Smarter.<br />

              <span className="text-yellow-300">
                Trust AI.
              </span>

            </h1>

            <p className="mt-8 max-w-2xl text-xl text-blue-100 leading-8">

              Compare products, read expert reviews,
              discover genuine user experiences,
              analyse AI trust scores,
              and decide whether you should

              <span className="font-bold text-yellow-300">
                {" "}Buy, Wait or Avoid.
              </span>

            </p>

            <div className="mt-10 max-w-2xl">
              <SearchBar
                value={value}
                onChange={onChange}
                onSearch={onSearch}
              />
            </div>

            {/* Popular Searches */}

            <div className="mt-8">

              <p className="mb-3 text-sm uppercase tracking-widest text-blue-200">

                Popular Searches

              </p>

              <div className="flex flex-wrap gap-3">

                {[
                  "iPhone 16 Pro",
                  "Samsung S25 Ultra",
                  "OnePlus 13",
                  "MacBook Air M4",
                  "Sony Bravia",
                  "LG OLED TV",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => onSearch?.(item)}
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm transition hover:bg-white hover:text-indigo-700"
                  >
                    {item}
                  </button>
                ))}

              </div>

            </div>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">

              <button
                onClick={() => onSearch?.("")}
                className="rounded-lg bg-yellow-400 px-7 py-3 font-semibold text-black transition hover:bg-yellow-300"
              >
                Explore Products
              </button>

              <a
                href="/compare"
                className="rounded-lg border border-white/30 px-7 py-3 font-semibold transition hover:bg-white hover:text-indigo-700"
              >
                Compare Products
              </a>

            </div>

          </div>

          {/* Right */}

          <div>

            <div className="rounded-3xl bg-white p-8 text-gray-900 shadow-2xl">

              <div className="flex items-center justify-between">

                <h3 className="text-2xl font-bold">

                  AI Decision Engine

                </h3>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                  LIVE

                </span>

              </div>

              <div className="mt-8 space-y-6">

                <div className="rounded-xl bg-green-50 p-5">

                  <div className="text-sm font-semibold text-green-700">

                    ✅ BUY

                  </div>

                  <div className="mt-2 text-xl font-bold">

                    Samsung Galaxy S25 Ultra

                  </div>

                  <p className="mt-2 text-sm text-gray-600">

                    Best overall flagship with excellent camera,
                    battery and long software support.

                  </p>

                </div>

                <div className="rounded-xl bg-yellow-50 p-5">

                  <div className="text-sm font-semibold text-yellow-700">

                    ⏳ WAIT

                  </div>

                  <div className="mt-2 text-xl font-bold">

                    iPhone 16 Pro

                  </div>

                  <p className="mt-2 text-sm text-gray-600">

                    Excellent phone but expected price drop
                    during upcoming festive sales.

                  </p>

                </div>

                <div className="rounded-xl bg-red-50 p-5">

                  <div className="text-sm font-semibold text-red-700">

                    ❌ AVOID

                  </div>

                  <div className="mt-2 text-xl font-bold">

                    Generic Budget Phone

                  </div>

                  <p className="mt-2 text-sm text-gray-600">

                    Weak software support,
                    average camera,
                    poor long-term value.

                  </p>

                </div>

              </div>

              {/* Stats */}

              <div className="mt-10 grid grid-cols-3 gap-5 border-t pt-8">

                <div className="text-center">

                  <div className="text-3xl font-bold text-indigo-600">

                    10K+

                  </div>

                  <div className="mt-1 text-sm text-gray-500">

                    Reviews

                  </div>

                </div>

                <div className="text-center">

                  <div className="text-3xl font-bold text-indigo-600">

                    500+

                  </div>

                  <div className="mt-1 text-sm text-gray-500">

                    Products

                  </div>

                </div>

                <div className="text-center">

                  <div className="text-3xl font-bold text-indigo-600">

                    AI

                  </div>

                  <div className="mt-1 text-sm text-gray-500">

                    Powered

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}