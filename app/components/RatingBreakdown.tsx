type Props = {
  rating: number;
};

export default function RatingBreakdown({ rating }: Props) {
  const rows = [
    { star: 5, percent: 82 },
    { star: 4, percent: 11 },
    { star: 3, percent: 4 },
    { star: 2, percent: 2 },
    { star: 1, percent: 1 },
  ];

  return (
    <section className="mt-8 rounded-xl border bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Rating Breakdown
          </h2>

          <p className="mt-1 text-gray-500">
            Overall Rating {rating.toFixed(1)} / 5
          </p>

        </div>

        <div className="text-5xl font-bold text-yellow-500">
          ★
        </div>

      </div>

      <div className="mt-8 space-y-4">

        {rows.map((row) => (

          <div
            key={row.star}
            className="flex items-center gap-4"
          >

            <div className="w-12 font-medium">
              {row.star} ★
            </div>

            <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-200">

              <div
                className="h-full rounded-full bg-yellow-400"
                style={{
                  width: `${row.percent}%`,
                }}
              />

            </div>

            <div className="w-14 text-right text-sm">
              {row.percent}%
            </div>

          </div>

        ))}

      </div>

    </section>
  );
}