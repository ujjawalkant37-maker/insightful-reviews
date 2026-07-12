"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ProtectedRoute from "@/app/components/ProtectedRoute";

type UserProfile = {
  email: string;
  full_name?: string;
};

export default function DashboardPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setProfile({
      email: user.email ?? "",
      full_name:
        (user.user_metadata?.full_name as string) ||
        (user.user_metadata?.name as string) ||
        "",
    });
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-50 dark:bg-zinc-950">

        <div className="container mx-auto px-4 py-10">

          <div className="flex items-center justify-between">

            <div>

              <h1 className="text-4xl font-bold">
                Dashboard
              </h1>

              <p className="mt-2 text-gray-500">
                Welcome back{" "}
                <span className="font-semibold">
                  {profile?.full_name || "User"}
                </span>
              </p>

            </div>

            <button
              onClick={logout}
              className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
            >
              Logout
            </button>

          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">

            <Link
              href="/profile"
              className="rounded-xl border bg-white p-6 shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h2 className="text-xl font-semibold">
                👤 Profile
              </h2>

              <p className="mt-2 text-gray-500">
                Update your personal information.
              </p>
            </Link>

            <Link
              href="/wishlist"
              className="rounded-xl border bg-white p-6 shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h2 className="text-xl font-semibold">
                ❤️ Wishlist
              </h2>

              <p className="mt-2 text-gray-500">
                View all saved products.
              </p>
            </Link>

            <Link
              href="/my-reviews"
              className="rounded-xl border bg-white p-6 shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h2 className="text-xl font-semibold">
                ⭐ My Reviews
              </h2>

              <p className="mt-2 text-gray-500">
                Manage your submitted reviews.
              </p>
            </Link>

            <Link
              href="/compare"
              className="rounded-xl border bg-white p-6 shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h2 className="text-xl font-semibold">
                ⚖ Compare Products
              </h2>

              <p className="mt-2 text-gray-500">
                Compare shortlisted products.
              </p>
            </Link>

            <Link
              href="/settings"
              className="rounded-xl border bg-white p-6 shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h2 className="text-xl font-semibold">
                ⚙ Settings
              </h2>

              <p className="mt-2 text-gray-500">
                Configure your preferences.
              </p>
            </Link>

            <Link
              href="/products"
              className="rounded-xl border bg-white p-6 shadow hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h2 className="text-xl font-semibold">
                🛍 Browse Products
              </h2>

              <p className="mt-2 text-gray-500">
                Discover new products and reviews.
              </p>
            </Link>

          </div>

          <div className="mt-12 rounded-xl border bg-white p-6 shadow dark:border-zinc-800 dark:bg-zinc-900">

            <h2 className="text-2xl font-bold">
              Account Information
            </h2>

            <div className="mt-6 space-y-4">

              <div>
                <div className="text-sm text-gray-500">
                  Name
                </div>

                <div className="font-medium">
                  {profile?.full_name || "Not Available"}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-500">
                  Email
                </div>

                <div className="font-medium">
                  {profile?.email}
                </div>
              </div>

            </div>

          </div>

        </div>

      </main>
    </ProtectedRoute>
  );
}