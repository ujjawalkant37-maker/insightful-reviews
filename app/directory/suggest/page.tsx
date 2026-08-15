"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { DIRECTORY_CATEGORY_OPTIONS, INDIA_STATES } from "@/lib/directory";
import { supabase } from "@/lib/supabase";

type CategoryRow = {
  id: number;
  slug: string;
  name: string;
};

export default function SuggestPlacePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    category: "hospitals",
    city: "",
    state: "",
    address: "",
    website: "",
    description: "",
  });

  useEffect(() => {
    let active = true;

    async function initialize() {
      const [{ data: userData }, { data: categoryRows }] = await Promise.all([
        supabase.auth.getUser(),
        supabase
          .from("directory_categories")
          .select("id,slug,name")
          .eq("is_active", true)
          .order("sort_order", { ascending: true }),
      ]);

      if (!active) return;

      setUserId(userData.user?.id ?? null);

      const rows = (categoryRows ?? []) as CategoryRow[];
      setCategories(
        rows.length
          ? rows
          : DIRECTORY_CATEGORY_OPTIONS.map(([slug, name]) => ({
              id: 0,
              slug,
              name,
            })),
      );
    }

    void initialize();

    return () => {
      active = false;
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!userId) {
      setMessage("Please sign in before suggesting a place.");
      return;
    }

    if (!form.name.trim() || !form.city.trim() || !form.state.trim()) {
      setMessage("Name, city and state are required.");
      return;
    }

    const category = categories.find((item) => item.slug === form.category);

    if (!category || category.id === 0) {
      setMessage("Please select a valid directory category.");
      return;
    }

    setSaving(true);
    setMessage("");

    const slug = `${form.name}-${form.city}-${form.state}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const { error } = await supabase.from("directory_suggestions").insert({
      user_id: userId,
      category_id: category.id,
      name: form.name.trim(),
      organization_name: form.name.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      address: form.address.trim() || null,
      website: form.website.trim() || null,
      reason: form.description.trim() || null,
    });

    setSaving(false);

    if (error) {
      setMessage("Unable to submit right now. Please try again.");
      return;
    }

    setForm({
      name: "",
      category: form.category,
      city: "",
      state: "",
      address: "",
      website: "",
      description: "",
    });

    setMessage(
      `Submitted successfully. Reference: ${slug}. The listing will appear after moderation.`,
    );
  }

  return (
    <main className="container py-12">
      <Link href="/directory" className="text-sm font-semibold text-indigo-600">
        ← Back to Directory
      </Link>

      <div className="mx-auto mt-6 max-w-3xl">
        <h1 className="text-4xl font-bold">Suggest a Place</h1>
        <p className="mt-3 text-gray-500">
          Know a hospital, school, college, hotel, restaurant or local service that is missing?
          Add it for community discovery. Suggestions are moderated before promotion.
        </p>

        <form
          onSubmit={submit}
          className="mt-8 space-y-5 rounded-2xl border bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          {!userId && (
            <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
              Sign in to submit a suggestion. This helps keep the directory resistant to spam.
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            <input
              required
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="Place / institution name"
              className="rounded-xl border p-3 dark:border-zinc-700 dark:bg-zinc-800"
            />

            <select
              value={form.category}
              onChange={(event) => setForm({ ...form, category: event.target.value })}
              className="rounded-xl border p-3 dark:border-zinc-700 dark:bg-zinc-800"
            >
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>

            <input
              required
              value={form.state}
              onChange={(event) => setForm({ ...form, state: event.target.value })}
              list="states"
              placeholder="State / UT"
              className="rounded-xl border p-3 dark:border-zinc-700 dark:bg-zinc-800"
            />

            <datalist id="states">
              {INDIA_STATES.map((state) => (
                <option key={state} value={state} />
              ))}
            </datalist>

            <input
              required
              value={form.city}
              onChange={(event) => setForm({ ...form, city: event.target.value })}
              placeholder="City"
              className="rounded-xl border p-3 dark:border-zinc-700 dark:bg-zinc-800"
            />

            <input
              value={form.website}
              onChange={(event) => setForm({ ...form, website: event.target.value })}
              placeholder="Official website (optional)"
              className="rounded-xl border p-3 dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>

          <input
            value={form.address}
            onChange={(event) => setForm({ ...form, address: event.target.value })}
            placeholder="Exact branch address (optional)"
            className="w-full rounded-xl border p-3 dark:border-zinc-700 dark:bg-zinc-800"
          />

          <textarea
            rows={4}
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
            placeholder="Anything useful for the moderator to verify?"
            className="w-full rounded-xl border p-3 dark:border-zinc-700 dark:bg-zinc-800"
          />

          {message && (
            <div className="rounded-xl bg-slate-100 p-4 text-sm dark:bg-zinc-800">
              {message}
            </div>
          )}

          <button
            disabled={saving || !userId}
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white disabled:opacity-50"
          >
            {saving ? "Submitting..." : "Submit for Moderation"}
          </button>
        </form>
      </div>
    </main>
  );
}
