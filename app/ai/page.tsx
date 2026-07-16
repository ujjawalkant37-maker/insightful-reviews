import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import AIChat from "@/components/AIChat";

export const metadata = {
  title: "AI Buying Assistant | Insightful Reviews",
  description:
    "Ask AI anything about products, reviews, specifications, comparisons and buying decisions.",
};

export default function AIPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-zinc-950">

      <Header />

      <main className="flex-1">

        {/* Hero */}

        <section className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 py-20 text-white">

          <div className="container">

            <div className="mx-auto max-w-4xl text-center">

              <div className="inline-flex rounded-full bg-white/20 px-5 py-2 font-semibold">
                🤖 AI Decision Engine
              </div>

              <h1 className="mt-8 text-5xl font-bold">
                AI Buying Assistant
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-100">

                Ask questions about any product.

                Compare smartphones.

                Discover the best laptop for your budget.

                Understand specifications.

                Detect fake reviews.

                Get personalized buying advice.

              </p>

            </div>

          </div>

        </section>

        {/* AI Chat */}

        <section className="container py-16">

          <AIChat
            initialPrompt="Should I buy Samsung Galaxy S25 Ultra?"
          />

        </section>

        {/* Suggestions */}

        <section className="container pb-20">

          <div className="rounded-3xl bg-white p-10 shadow dark:bg-zinc-900">

            <h2 className="text-3xl font-bold">
              Try Asking
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">

              {[
                "Should I buy Samsung Galaxy S25 Ultra?",

                "Compare iPhone 16 Pro vs Galaxy S25 Ultra.",

                "Best laptop under ₹80,000.",

                "Which TV is best for gaming?",

                "Is OnePlus 13 worth buying?",

                "Explain OLED vs Mini LED.",

                "Which phone has the best camera?",

                "Recommend a washing machine for a family of 5.",

              ].map((question) => (

                <div
                  key={question}
                  className="rounded-xl border bg-slate-50 p-5 dark:border-zinc-700 dark:bg-zinc-800"
                >
                  {question}
                </div>

              ))}

            </div>

          </div>

        </section>

      </main>

      <FooterSection />

    </div>
  );
}