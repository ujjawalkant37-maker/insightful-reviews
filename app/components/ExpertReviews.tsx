import React from "react";
import ReviewCard from "@/components/ReviewCard";

const experts = [
  { id: 'e1', name: 'Maya Ortega — Senior Analyst', title: 'Aurora X2 Pro review', text: 'Exceptional night photography and reliable performance; battery life is solid for heavy users.', rating: 5, productId: '' },
  { id: 'e2', name: 'Liam Chen — Hardware Editor', title: 'Breeze 14 review', text: 'Top-tier portability with balanced thermals, a great choice for on-the-go productivity.', rating: 4, productId: '' },
  { id: 'e3', name: 'Priya Singh — AV Specialist', title: 'Vista QLED 55" review', text: 'Impressive HDR handling and accurate colors; ideal for cinematic viewing.', rating: 4, productId: '' },
];

export default function ExpertReviews() {
  return (
    <section id="reviews" className="container py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-zinc-50">Latest Expert Reviews</h2>
        <a href="#reviews" className="text-sm text-indigo-600">Read all</a>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {experts.map((r) => (
          <ReviewCard key={r.id} review={{ id: r.id, productId: r.productId, name: r.name, rating: r.rating, title: r.title, text: r.text, date: new Date().toISOString() }} />
        ))}
      </div>
    </section>
  );
}
