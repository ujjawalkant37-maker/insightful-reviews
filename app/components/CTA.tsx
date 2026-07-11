import React from "react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="container py-20">

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-600 px-8 py-16 shadow-2xl lg:px-16">

        {/* Background Blur */}
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl"></div>

        <div className="relative">

          <div className="mx-auto max-w-4xl text-center">

            <span className="rounded-full bg-white/15 px-5 py-2 text-sm font-semibold text-white backdrop-blur">
              🚀 Join India's Next AI Review Platform
            </span>

            <h2 className="mt-8 text-4xl font-extrabold text-white lg:text-5xl">

              Buy Smarter With
              <br />
              AI Powered Reviews

            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-100">

              Join thousands of users discovering honest product
              reviews, AI buying recommendations, expert opinions,
              price tracking, trust scores and real user experiences —
              all in one place.

            </p>

          </div>

          {/* Statistics */}

          <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-4">

            <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur">

              <div className="text-4xl font-bold text-white">
                10K+
              </div>

              <div className="mt-2 text-sm text-blue-100">
                Reviews
              </div>

            </div>

            <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur">

              <div className="text-4xl font-bold text-white">
                500+
              </div>

              <div className="mt-2 text-sm text-blue-100">
                Products
              </div>

            </div>

            <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur">

              <div className="text-4xl font-bold text-white">
                AI
              </div>

              <div className="mt-2 text-sm text-blue-100">
                Decision Engine
              </div>

            </div>

            <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur">

              <div className="text-4xl font-bold text-white">
                24×7
              </div>

              <div className="mt-2 text-sm text-blue-100">
                Price Tracking
              </div>

            </div>

          </div>

          {/* Features */}

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl bg-white/10 p-5 text-center backdrop-blur">
              🤖
              <h3 className="mt-3 font-semibold text-white">
                AI Reviews
              </h3>
            </div>

            <div className="rounded-xl bg-white/10 p-5 text-center backdrop-blur">
              📊
              <h3 className="mt-3 font-semibold text-white">
                Trust Score
              </h3>
            </div>

            <div className="rounded-xl bg-white/10 p-5 text-center backdrop-blur">
              ⚖️
              <h3 className="mt-3 font-semibold text-white">
                Compare Products
              </h3>
            </div>

            <div className="rounded-xl bg-white/10 p-5 text-center backdrop-blur">
              💰
              <h3 className="mt-3 font-semibold text-white">
                Price Alerts
              </h3>
            </div>

          </div>

          {/* Buttons */}

          <div className="mt-16 flex flex-wrap justify-center gap-5">

            <Link
              href="/signup"
              className="rounded-xl bg-white px-8 py-4 text-lg font-bold text-indigo-700 transition hover:scale-105"
            >
              Create Free Account
            </Link>

            <Link
              href="/products"
              className="rounded-xl border-2 border-white px-8 py-4 text-lg font-bold text-white transition hover:bg-white hover:text-indigo-700"
            >
              Explore Products
            </Link>

          </div>

          <p className="mt-8 text-center text-sm text-blue-100">

            No spam • Free forever • AI Powered • Community Driven

          </p>

        </div>

      </div>

    </section>
  );
}