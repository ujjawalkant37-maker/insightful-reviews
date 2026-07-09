type Props = {
  rating: number;
};

export default function ReviewStats({ rating }: Props) {
  const totalReviews = Math.max(10, Math.round(rating * 24));

  return (
    <section className="mt-8 rounded-xl border bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900">

      <h2 className="text-2xl font-bold">
        ⭐ Review Statistics
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">

        <div className="rounded-lg bg-slate-100 p-4 text-center dark:bg-zinc-800">
          <div className="text-3xl font-bold">
            {rating.toFixed(1)}
          </div>
          <div className="text-sm text-gray-500">
            Average Rating
          </div>
        </div>

        <div className="rounded-lg bg-slate-100 p-4 text-center dark:bg-zinc-800">
          <div className="text-3xl font-bold">
            {totalReviews}
          </div>
          <div className="text-sm text-gray-500">
            Reviews
          </div>
        </div>

        <div className="rounded-lg bg-slate-100 p-4 text-center dark:bg-zinc-800">
          <div className="text-3xl font-bold">
            92%
          </div>
          <div className="text-sm text-gray-500">
            Recommend
          </div>
        </div>

        <div className="rounded-lg bg-slate-100 p-4 text-center dark:bg-zinc-800">
          <div className="text-3xl font-bold">
            A+
          </div>
          <div className="text-sm text-gray-500">
            AI Score
          </div>
        </div>

      </div>

    </section>
  );
}