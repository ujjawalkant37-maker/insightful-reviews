import React from "react";
import ReviewCard from "@/components/ReviewCard";

const users = [
  {
    id: "u1",
    name: "Jordan P.",
    rating: 5,
    title: "Aurora X2 Pro — Real World Experience",
    review:
      "Camera and battery impressed me throughout a full week of heavy usage. Definitely worth buying.",
    pros: [
      "Excellent Camera",
      "Battery Backup"
    ],
    cons: [
      "Premium Price"
    ],
    verified: true,
    date: "Today",
  },
  {
    id: "u2",
    name: "Sofia K.",
    rating: 4,
    title: "Breeze 14 — Perfect for Daily Use",
    review:
      "Lightweight, reliable and perfect for office work, coding and travelling.",
    pros: [
      "Very Lightweight",
      "Good Battery"
    ],
    cons: [
      "Average Speakers"
    ],
    verified: true,
    date: "Yesterday",
  },
];

export default function UserReviews() {
  return (
    <section id="users" className="container py-12">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          User Reviews
        </h2>

      </div>

      <div className="grid gap-6">

        {users.map((r) => (
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