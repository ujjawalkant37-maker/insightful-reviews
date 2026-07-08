import React from "react";
import ReviewCard from "@/components/ReviewCard";

const users = [
  { id: 'u1', name: 'Jordan P.', title: 'Aurora X2 Pro — real-world', text: 'Camera and battery impressed me across a full week of heavy use.', rating: 5, productId: '' },
  { id: 'u2', name: 'Sofia K.', title: 'Breeze 14 — commute laptop', text: 'Lightweight and reliable; great for students and professionals on the move.', rating: 4, productId: '' },
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
          <ReviewCard key={r.id} review={{ id: r.id, productId: r.productId, name: r.name, rating: r.rating, title: r.title, text: r.text, date: new Date().toISOString() }} />
        ))}
      </div>
    </section>
  );
}
