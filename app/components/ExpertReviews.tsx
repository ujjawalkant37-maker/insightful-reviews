import React from "react";
import ReviewCard from "./ReviewCard";

const experts = [
  { author: 'Maya Ortega — Senior Analyst', title: 'Aurora X2 Pro review', snippet: 'Exceptional night photography and reliable performance; battery life is solid for heavy users.', rating: 5 },
  { author: 'Liam Chen — Hardware Editor', title: 'Breeze 14 review', snippet: 'Top-tier portability with balanced thermals, a great choice for on-the-go productivity.', rating: 4 },
  { author: 'Priya Singh — AV Specialist', title: 'Vista QLED 55" review', snippet: 'Impressive HDR handling and accurate colors; ideal for cinematic viewing.', rating: 4 },
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
          <ReviewCard key={r.title} author={r.author} title={r.title} snippet={r.snippet} rating={r.rating} />
        ))}
      </div>
    </section>
  );
}
