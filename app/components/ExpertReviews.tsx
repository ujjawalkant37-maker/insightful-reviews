import React from "react";
import ReviewCard from "@/components/ReviewCard";

const experts = [
  {
    id: "e1",
    name: "Maya Ortega",
    rating: 5,
    title: "Aurora X2 Pro Review",
    review:
      "Exceptional night photography and reliable performance. Battery life is excellent for heavy users.",
    pros: [
      "Excellent Camera",
      "Premium Design",
      "Long Battery"
    ],
    cons: [
      "Premium Price"
    ],
    verified: true,
    date: "Today",
  },
  {
    id: "e2",
    name: "Liam Chen",
    rating: 4,
    title: "Breeze 14 Review",
    review:
      "Top-tier portability with balanced thermals and impressive battery backup.",
    pros: [
      "Lightweight",
      "Great Display"
    ],
    cons: [
      "Average Speakers"
    ],
    verified: true,
    date: "Yesterday",
  },
  {
    id: "e3",
    name: "Priya Singh",
    rating: 4,
    title: "Vista QLED 55 Review",
    review:
      "Excellent HDR handling and accurate colours. Great television for movies.",
    pros: [
      "HDR",
      "Picture Quality"
    ],
    cons: [
      "Remote feels cheap"
    ],
    verified: true,
    date: "3 days ago",
  },
];

export default function ExpertReviews() {
  return (
    <section id="reviews" className="container py-12">

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold">
          Latest Expert Reviews
        </h2>

      </div>

      <div className="grid gap-6">

        {experts.map((r) => (
          <ReviewCard
            key={r.id}
            name={r.name}
            rating={r.rating}
            title={r.title}
            review={r.review}
            pros={r.pros}
            cons={r.cons}
            verified={r.verified}
            date={r.date}
          />
        ))}

      </div>

    </section>
  );
}