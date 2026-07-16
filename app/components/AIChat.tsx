"use client";

import { useState } from "react";
import { askAI } from "@/lib/ai";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AIChat({
  initialPrompt = "",
}: {
  initialPrompt?: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);

  const [prompt, setPrompt] = useState(initialPrompt);

  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!prompt.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentPrompt = prompt;

    setPrompt("");

    setLoading(true);

    try {
      const reply = await askAI(currentPrompt);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't generate a response. Please try again.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <section className="rounded-3xl border bg-white p-8 shadow dark:border-zinc-800 dark:bg-zinc-900">

      <div className="mb-6">

        <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
          🤖 AI Buying Assistant
        </span>

        <h2 className="mt-5 text-3xl font-bold">
          Ask AI Anything
        </h2>

        <p className="mt-3 text-gray-500">
          Ask about products, comparisons,
          specifications, reviews, value for money,
          alternatives and buying advice.
        </p>

      </div>

      <div className="h-[450px] overflow-y-auto rounded-2xl border bg-slate-50 p-5 dark:border-zinc-800 dark:bg-zinc-950">

        {messages.length === 0 && (

          <div className="mt-24 text-center text-gray-400">

            <div className="text-6xl">
              🤖
            </div>

            <p className="mt-6">
              Start a conversation with AI.
            </p>

          </div>

        )}

        {messages.map((message, index) => (

          <div
            key={index}
            className={`mb-5 flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[80%] rounded-2xl px-5 py-4 whitespace-pre-wrap leading-7 ${
                message.role === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-white border dark:bg-zinc-900 dark:border-zinc-700"
              }`}
            >
              {message.content}
            </div>

          </div>

        ))}

        {loading && (

          <div className="flex">

            <div className="rounded-2xl border bg-white px-5 py-4 dark:bg-zinc-900">
              AI is thinking...
            </div>

          </div>

        )}

      </div>

      <div className="mt-6 flex gap-3">

        <textarea
          rows={3}
          value={prompt}
          onChange={(e) =>
            setPrompt(e.target.value)
          }
          placeholder="Example: Should I buy Samsung Galaxy S25 Ultra or iPhone 16 Pro?"
          className="flex-1 rounded-2xl border p-4 dark:border-zinc-700 dark:bg-zinc-800"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="rounded-2xl bg-indigo-600 px-8 font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          Send
        </button>

      </div>

    </section>
  );
}