"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function ProfilePage() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setEmail(user.email ?? "");

    setFullName(
      (user.user_metadata?.full_name as string) ||
      (user.user_metadata?.name as string) ||
      ""
    );
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
      },
    });

    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    setMessage("Profile updated successfully.");
  }

  return (
    <ProtectedRoute>

      <main className="min-h-screen bg-slate-50 dark:bg-zinc-950">

        <div className="container mx-auto max-w-2xl px-4 py-10">

          <div className="rounded-2xl border bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">

            <h1 className="text-3xl font-bold">
              My Profile
            </h1>

            <p className="mt-2 text-gray-500">
              Update your personal information.
            </p>

            <form
              onSubmit={saveProfile}
              className="mt-8 space-y-6"
            >

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full cursor-not-allowed rounded-lg border bg-gray-100 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800"
                />

              </div>

              {error && (
                <div className="rounded-lg bg-red-100 px-4 py-3 text-red-700">
                  {error}
                </div>
              )}

              {message && (
                <div className="rounded-lg bg-green-100 px-4 py-3 text-green-700">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

            </form>

            <div className="mt-8 border-t pt-6">

              <button
                onClick={() => router.push("/dashboard")}
                className="rounded-lg border px-5 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                ← Back to Dashboard
              </button>

            </div>

          </div>

        </div>

      </main>

    </ProtectedRoute>
  );
}