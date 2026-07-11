type Props = {
  rating: number;
};

export default function RatingBreakdown({
  rating,
}: Props) {
  const rows = [
    { star: 5, percent: 82, color: "bg-green-500" },
    { star: 4, percent: 11, color: "bg-lime-500" },
    { star: 3, percent: 4, color: "bg-yellow-500" },
    { star: 2, percent: 2, color: "bg-orange-500" },
    { star: 1, percent: 1, color: "bg-red-500" },
  ];

  const totalReviews = 1247;

  return (
    <section className="mt-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex flex-col gap-8 lg:flex-row">

        {/* Left */}

        <div className="lg:w-1/3">

          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            ⭐ User Ratings
          </span>

          <div className="mt-6 text-7xl font-extrabold text-yellow-500">
            {rating.toFixed(1)}
          </div>

          <div className="mt-3 text-2xl text-yellow-500">
            {"★".repeat(Math.round(rating))}
            {"☆".repeat(5 - Math.round(rating))}
          </div>

          <p className="mt-5 text-gray-500">
            Based on {totalReviews.toLocaleString()} verified reviews
          </p>

        </div>

        {/* Right */}

        <div className="flex-1 space-y-6">

          {rows.map((row) => (

            <div
              key={row.star}
              className="flex items-center gap-5"
            >

              <div className="w-16 font-semibold">
                {row.star} ★
              </div>

              <div className="h-4 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-zinc-700">

                <div
                  className={`${row.color} h-full rounded-full transition-all duration-700`}
                  style={{
                    width: `${row.percent}%`,
                  }}
                />

              </div>

              <div className="w-16 text-right font-semibold">
                {row.percent}%
              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Bottom Summary */}

      <div className="mt-12 grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-green-50 p-6">

          <div className="text-3xl font-bold text-green-600">
            93%
          </div>

          <div className="mt-2 text-gray-600">
            Positive Reviews
          </div>

        </div>

        <div className="rounded-2xl bg-indigo-50 p-6">

          <div className="text-3xl font-bold text-indigo-600">
            96%
          </div>

          <div className="mt-2 text-gray-600">
            Verified Purchases
          </div>

        </div>

        <div className="rounded-2xl bg-orange-50 p-6">

          <div className="text-3xl font-bold text-orange-600">
            91%
          </div>

          <div className="mt-2 text-gray-600">
            Would Buy Again
          </div>

        </div>

      </div>

    </section>
  );
}