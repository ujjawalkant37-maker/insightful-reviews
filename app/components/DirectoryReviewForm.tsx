"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { supabase } from "@/lib/supabase";

export default function DirectoryReviewForm({
  entityId,
  entityName,
}: {
  entityId: number;
  entityName: string;
}) {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [pros, setPros] = useState("");
  const [cons, setCons] = useState("");
  const [experienceType, setExperienceType] = useState("Visited");
  const [recommend, setRecommend] = useState("yes");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (review.trim().length < 20) {
      setMessage("Please write at least 20 characters so the review is useful.");
      return;
    }

    setSaving(true);
    const { data: auth } = await supabase.auth.getUser();

    if (!auth.user) {
      setSaving(false);
      setMessage("Please log in before submitting a community opinion.");
      return;
    }

    const { error } = await supabase.from("directory_reviews").insert({
      entity_id: entityId,
      user_id: auth.user.id,
      rating,
      title: title.trim() || null,
      review: review.trim(),
      pros: pros.split(",").map((v) => v.trim()).filter(Boolean),
      cons: cons.split(",").map((v) => v.trim()).filter(Boolean),
      would_recommend: recommend === "yes",
      experience_type: experienceType,
      status: "pending",
      is_verified: false,
    });

    setSaving(false);

    if (error) {
      console.error("Directory review submission failed:", error);
      setMessage(error.message || "Could not submit the review. Please try again.");
      return;
    }

    setTitle("");
    setReview("");
    setPros("");
    setCons("");
    setMessage("Thanks. Your review has been submitted for moderation.");
  }

  return (
    <section className="rounded-3xl border bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
        Share your experience
      </div>
      <h2 className="mt-1 text-2xl font-bold">Review {entityName}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
        Tell other people what you actually experienced. Reviews are moderated before publication.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-semibold">Your rating</label>
          <div className="mt-2 flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                aria-label={`Rate ${value} out of 5`}
                className={`text-2xl ${value <= rating ? "text-amber-400" : "text-slate-300"}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold">
            Experience
            <select value={experienceType} onChange={(e) => setExperienceType(e.target.value)} className="mt-2 w-full rounded-xl border p-3 font-normal dark:border-zinc-700 dark:bg-zinc-800">
              <option>Visited</option>
              <option>Patient / Customer</option>
              <option>Parent / Guardian</option>
              <option>Student</option>
              <option>Employee</option>
              <option>Resident / Local</option>
            </select>
          </label>

          <label className="text-sm font-semibold">
            Would you recommend it?
            <select value={recommend} onChange={(e) => setRecommend(e.target.value)} className="mt-2 w-full rounded-xl border p-3 font-normal dark:border-zinc-700 dark:bg-zinc-800">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
        </div>

        <label className="block text-sm font-semibold">
          Review title
          <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={120} className="mt-2 w-full rounded-xl border p-3 font-normal dark:border-zinc-700 dark:bg-zinc-800" placeholder="What should people know?" />
        </label>

        <label className="block text-sm font-semibold">
          Your experience
          <textarea value={review} onChange={(e) => setReview(e.target.value)} required minLength={20} rows={5} className="mt-2 w-full rounded-xl border p-3 font-normal dark:border-zinc-700 dark:bg-zinc-800" placeholder="Describe the service, staff, waiting time, cleanliness, value or anything else that mattered." />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold">
            Pros
            <input value={pros} onChange={(e) => setPros(e.target.value)} className="mt-2 w-full rounded-xl border p-3 font-normal dark:border-zinc-700 dark:bg-zinc-800" placeholder="Comma separated" />
          </label>
          <label className="text-sm font-semibold">
            Cons
            <input value={cons} onChange={(e) => setCons(e.target.value)} className="mt-2 w-full rounded-xl border p-3 font-normal dark:border-zinc-700 dark:bg-zinc-800" placeholder="Comma separated" />
          </label>
        </div>

        {message ? <div className="rounded-xl bg-slate-50 p-4 text-sm dark:bg-zinc-800">{message}</div> : null}

        <button disabled={saving} className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">
          {saving ? "Submitting…" : "Submit Review"}
        </button>
      </form>
    </section>
  );
}
