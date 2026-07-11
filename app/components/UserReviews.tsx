import React from "react";
import Link from "next/link";
import ReviewCard from "@/components/ReviewCard";

const users = [
  {
    id: "u1",
    name: "Jordan Parker",
    location: "New York, USA",
    rating: 5,
    title: "Samsung Galaxy S25 Ultra — My Daily Driver",
    review:
      "After using it for over two weeks, the battery life, camera quality and overall performance exceeded my expectations. The AI recommendations were surprisingly accurate.",
    pros: [
      "Excellent Camera",
      "Outstanding Battery",
      "Fast Performance",
    ],
    cons: [
      "Expensive",
    ],
    verified: true,
    date: "2 hours ago",
    helpful: 143,
  },
  {
    id: "u2",
    name: "Sophia Kim",
    location: "Seoul, South Korea",
    rating: 5,
    title: "MacBook Air M4 Review",
    review:
      "Perfect laptop for programming and everyday productivity. Battery easily lasts an entire working day.",
    pros: [
      "Silent",
      "Excellent Battery",
      "Premium Build",
    ],
    cons: [
      "Limited Ports",
    ],
    verified: true,
    date: "Yesterday",
    helpful: 97,
  },
  {
    id: "u3",
    name: "Rahul Sharma",
    location: "Delhi, India",
    rating: 4,
    title: "Sony Bravia OLED Experience",
    review:
      "Fantastic television for movies and gaming. Dolby Vision performance is outstanding and colours look incredibly natural.",
    pros: [
      "OLED Display",
      "Excellent HDR",
      "Premium Sound",
    ],
    cons: [
      "Premium Price",
    ],
    verified: true,
    date: "3 days ago",
    helpful: 84,
  },
];

export default function UserReviews() {
  return (
    <section className="container py-16">

      <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

        <div>

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Community Reviews
          </span>

          <h2 className="mt-5 text-4xl font-bold text-gray-900 dark:text-white">
            Real Experiences From Real Users
          </h2>

          <p className="mt-4 max-w-3xl text-gray-600 dark:text-gray-400">
            Thousands of verified users share honest experiences,
            helping others make better buying decisions.
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

        {users.map((review) => (

          <div
            key={review.id}
            className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
          >

            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
                  {review.name.charAt(0)}
                </div>

                <div>

                  <h3 className="text-lg font-bold">
                    {review.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {review.location}
                  </p>

                </div>

              </div>

              <div className="flex flex-wrap gap-3">

                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                  ✓ Verified User
                </span>

                <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-bold text-yellow-700">
                  👍 {review.helpful} Helpful
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

            <div className="mt-8 flex flex-wrap gap-4">

              <button className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700">
                Read Full Review
              </button>

              <button className="rounded-xl border border-gray-300 px-5 py-3 font-semibold transition hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
                Helpful 👍
              </button>

              <button className="rounded-xl border border-gray-300 px-5 py-3 font-semibold transition hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
                Share
              </button>

            </div>

          </div>

        ))}

      </div>

      <div className="mt-16 rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-10 text-center text-white">

        <h3 className="text-3xl font-bold">
          Join Our Community
        </h3>

        <p className="mx-auto mt-4 max-w-3xl text-green-100">
          Share your experiences, help millions of buyers,
          earn credibility within the community and contribute
          to AI-powered product recommendations.
        </p>

        <Link
          href="/write-review"
          className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-bold text-green-700 transition hover:scale-105"
        >
          Write Your Review
        </Link>

      </div>

    </section>
  );
}