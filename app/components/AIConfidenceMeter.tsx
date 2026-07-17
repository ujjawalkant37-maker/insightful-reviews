"use client";

type Props = {
  confidence: number;
};

export default function AIConfidenceMeter({
  confidence,
}: Props) {
  const score = Math.max(
    0,
    Math.min(100, confidence)
  );

  const circumference = 2 * Math.PI * 60;

  const offset =
    circumference -
    (score / 100) * circumference;

  function getStatus() {
    if (score >= 90)
      return {
        label: "Very High Confidence",
        color: "#16A34A",
        bg: "bg-green-100",
        text: "text-green-700",
        description:
          "The available information is extensive and consistent, allowing the AI to make a highly reliable recommendation.",
      };

    if (score >= 75)
      return {
        label: "High Confidence",
        color: "#2563EB",
        bg: "bg-blue-100",
        text: "text-blue-700",
        description:
          "The AI has enough reliable information to make a strong recommendation, though minor uncertainty remains.",
      };

    if (score >= 60)
      return {
        label: "Moderate Confidence",
        color: "#D97706",
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        description:
          "Some important information may be missing. Consider additional research before making a purchase.",
      };

    return {
      label: "Low Confidence",
      color: "#DC2626",
      bg: "bg-red-100",
      text: "text-red-700",
      description:
        "Limited or inconsistent information is available. Treat this recommendation with caution.",
    };
  }

  const status = getStatus();

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex flex-col items-center gap-8 lg:flex-row">

        <div className="relative h-40 w-40">

          <svg
            width="160"
            height="160"
            className="-rotate-90"
          >
            <circle
              cx="80"
              cy="80"
              r="60"
              stroke="#E5E7EB"
              strokeWidth="12"
              fill="none"
            />

            <circle
              cx="80"
              cy="80"
              r="60"
              stroke={status.color}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />

          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <div className="text-4xl font-bold">
              {score}%
            </div>

            <div className="text-sm text-gray-500">
              Confidence
            </div>

          </div>

        </div>

        <div className="flex-1">

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${status.bg} ${status.text}`}
          >
            {status.label}
          </span>

          <h2 className="mt-5 text-3xl font-bold">
            AI Confidence Meter
          </h2>

          <p className="mt-4 leading-8 text-gray-600 dark:text-gray-300">
            {status.description}
          </p>

          <div className="mt-8">

            <div className="mb-2 flex justify-between">

              <span>Confidence</span>

              <span>{score}%</span>

            </div>

            <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-zinc-700">

              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${score}%`,
                  backgroundColor: status.color,
                }}
              />

            </div>

          </div>

        </div>

      </div>

      <div className="mt-10 rounded-2xl bg-slate-50 p-6 dark:bg-zinc-800">

        <h3 className="text-xl font-bold">
          What does AI Confidence mean?
        </h3>

        <p className="mt-4 leading-8 text-gray-700 dark:text-gray-300">
          Confidence measures how certain the AI is about its
          recommendation based on the available product data,
          review quality, trust signals, and consistency of
          information. A lower confidence score does not
          necessarily indicate a poor product—it simply means
          there is less reliable information available to reach
          a strong conclusion.
        </p>

      </div>

    </section>
  );
}