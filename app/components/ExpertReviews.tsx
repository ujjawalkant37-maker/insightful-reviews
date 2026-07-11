import React from "react";
import Link from "next/link";
import ReviewCard from "@/components/ReviewCard";

const experts = [
  {
    id: "e1",
    name: "Maya Ortega",
    designation: "Senior Smartphone Analyst",
    rating: 5,
    title: "Samsung Galaxy S25 Ultra Review",
    review:
      "The Galaxy S25 Ultra delivers one of the best flagship experiences with exceptional cameras, long battery life and excellent software support.",
    pros: [
      "Excellent Camera",
      "Powerful Performance",
      "Outstanding Battery",
    ],
    cons: [
      "Expensive",
    ],
    verified: true,
    date: "2 hours ago",
    verdict: "BUY",
    trust: 98,
  },
  {
    id: "e2",
    name: "Liam Chen",
    designation: "Laptop Hardware Editor",
    rating: 5,
    title: "MacBook Air M4 Review",
    review:
      "Apple's latest MacBook Air combines excellent battery life, silent operation and incredible efficiency for students and professionals.",
    pros: [
      "Battery Life",
      "Excellent Display",
      "Silent Performance",
    ],
    cons: [
      "Limited Ports",
    ],
    verified: true,
    date: "Yesterday",
    verdict: "BUY",
    trust: 96,
  },
  {
    id: "e3",
    name: "Priya Singh",
    designation: "TV & Home Entertainment Specialist",
    rating: 4,
    title: "Sony Bravia OLED Review",
    review:
      "Reference-level OLED picture quality with deep blacks, outstanding HDR and premium audio experience.",
    pros: [
      "Amazing HDR",
      "Excellent Colours",
      "Premium Build",
    ],
    cons: [
      "Premium Price",
    ],
    verified: true,
    date: "3 days ago",
    verdict: "BUY",
    trust: 95,
  },
];

export default function ExpertReviews() {
  return (
    <section className="container py-16">

      <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            Expert Analysis
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900 dark:text-white">
            Latest Expert Reviews
          </h2>

          <p className="mt-4 max-w-3xl text-gray-600 dark:text-gray-400">
            Independent reviews from experienced analysts covering
            smartphones, laptops, televisions and home appliances.
          </p>

        </div>

        <Link
          href="/reviews"
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          View All Reviews
        </Link>

      </div>

      <div className="grid gap-8">

        {experts.map((review) => (

          <div
            key={review.id}
            className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          >

            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <div className="flex items-center gap-3">

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
                    {review.name.charAt(0)}
                  </div>

                  <div>

                    <h3 className="text-lg font-bold">
                      {review.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {review.designation}
                    </p>

                  </div>

                </div>

              </div>

              <div className="flex gap-3">

                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                  {review.verdict}
                </span>

                <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-700">
                  Trust {review.trust}/100
                </span>

              </div>

            </div>

            <ReviewCard
              name={review.name}
              rating={review.rating}
              title={review.title}
              review={review.review}
              pros={review.pros}
              cons={review.cons}
              verified={review.verified}
              date={review.date}
            />

            <div className="mt-6 flex flex-wrap gap-4">

              <button className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700">
                Read Full Review
              </button>

              <button className="rounded-xl border border-gray-300 px-5 py-3 font-semibold transition hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
                Compare Product
              </button>

            </div>

          </div>

        ))}

      </div>

      <div className="mt-16 rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-10 text-center text-white">

        <h3 className="text-3xl font-bold">
          Reviews You Can Trust
        </h3>

        <p className="mx-auto mt-4 max-w-3xl text-blue-100">
          Every expert review combines hands-on testing,
          AI-assisted analysis,
          benchmark comparisons and long-term usability
          to help you make confident buying decisions.
        </p>

      </div>

    </section>
  );
}