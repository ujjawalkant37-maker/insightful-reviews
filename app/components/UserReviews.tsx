import React from "react";
import ReviewCard from "./ReviewCard";

const users = [
  { author: 'Jordan P.', title: 'Aurora X2 Pro — real-world', snippet: 'Camera and battery impressed me across a full week of heavy use.', rating: 5 },
  { author: 'Sofia K.', title: 'Breeze 14 — commute laptop', snippet: 'Lightweight and reliable; great for students and professionals on the move.', rating: 4 },
];

export default function UserReviews() {
  return (
    <section id="users" className="container py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-zinc-50">User Reviews</h2>
        <a href="#users" className="text-sm text-indigo-600">See more</a>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {users.map((r) => (
          <ReviewCard key={r.title} author={r.author} title={r.title} snippet={r.snippet} rating={r.rating} />
        ))}
      </div>
    </section>
  );
}
