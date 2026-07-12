"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProtectedRoute from "@/app/components/ProtectedRoute";

export default function SettingsPage() {
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] =
    useState(true);
  const [marketingEmails, setMarketingEmails] =
    useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <ProtectedRoute>

      <main className="min-h-screen bg-slate-50 dark:bg-zinc-950">

        <div className="container mx-auto max-w-5xl px-4 py-10">

          <div className="mb-10">

            <h1 className="text-4xl font-bold">
              Settings
            </h1>

            <p className="mt-2 text-gray-500">
              Manage your account preferences.
            </p>

          </div>

          <div className="space-y-8">

            <section className="rounded-2xl bg-white p-8 shadow dark:bg-zinc-900">

              <h2 className="text-2xl font-bold">
                🎨 Appearance
              </h2>

              <div className="mt-6 flex items-center justify-between">

                <div>

                  <h3 className="font-semibold">
                    Dark Mode
                  </h3>

                  <p className="text-sm text-gray-500">
                    Enable dark theme.
                  </p>

                </div>

                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="h-5 w-5"
                />

              </div>

            </section>

            <section className="rounded-2xl bg-white p-8 shadow dark:bg-zinc-900">

              <h2 className="text-2xl font-bold">
                🔔 Notifications
              </h2>

              <div className="mt-6 space-y-6">

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="font-semibold">
                      Email Notifications
                    </h3>

                    <p className="text-sm text-gray-500">
                      Receive review replies and updates.
                    </p>

                  </div>

                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) =>
                      setEmailNotifications(e.target.checked)
                    }
                    className="h-5 w-5"
                  />

                </div>

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="font-semibold">
                      Marketing Emails
                    </h3>

                    <p className="text-sm text-gray-500">
                      Product launches and offers.
                    </p>

                  </div>

                  <input
                    type="checkbox"
                    checked={marketingEmails}
                    onChange={(e) =>
                      setMarketingEmails(e.target.checked)
                    }
                    className="h-5 w-5"
                  />

                </div>

              </div>

            </section>

            <section className="rounded-2xl bg-white p-8 shadow dark:bg-zinc-900">

              <h2 className="text-2xl font-bold">
                🔒 Privacy
              </h2>

              <div className="mt-6 space-y-3">

                <button className="w-full rounded-xl border p-4 text-left hover:bg-gray-50 dark:hover:bg-zinc-800">
                  Download My Data
                </button>

                <button className="w-full rounded-xl border p-4 text-left hover:bg-gray-50 dark:hover:bg-zinc-800">
                  Export Reviews
                </button>

              </div>

            </section>

            <section className="rounded-2xl bg-white p-8 shadow dark:bg-zinc-900">

              <h2 className="text-2xl font-bold">
                🛡 Security
              </h2>

              <div className="mt-6 space-y-4">

                <button
                  onClick={() => router.push("/profile")}
                  className="rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
                >
                  Edit Profile
                </button>

                <button
                  onClick={logout}
                  className="rounded-xl bg-red-600 px-6 py-3 text-white hover:bg-red-700"
                >
                  Logout
                </button>

              </div>

            </section>

            <section className="rounded-2xl bg-white p-8 shadow dark:bg-zinc-900">

              <h2 className="text-2xl font-bold">
                ℹ About
              </h2>

              <div className="mt-6 space-y-2 text-gray-600 dark:text-gray-300">

                <p>Insightful Reviews</p>

                <p>Version 1.0.0</p>

                <p>© 2026 Insightful Reviews</p>

              </div>

            </section>

          </div>

        </div>

      </main>

    </ProtectedRoute>
  );
}