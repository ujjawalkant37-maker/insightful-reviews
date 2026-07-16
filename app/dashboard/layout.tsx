import React from "react";
import Link from "next/link";

import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">

      <Header />

      <div className="container mx-auto flex flex-1 px-4 py-8 gap-8">

        {/* Sidebar */}

        <aside className="hidden w-72 shrink-0 rounded-2xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:block">

          <h2 className="mb-6 text-2xl font-bold">
            Dashboard
          </h2>

          <nav className="space-y-2">

            <Link
              href="/dashboard"
              className="block rounded-lg px-4 py-3 transition hover:bg-indigo-50 dark:hover:bg-zinc-800"
            >
              🏠 Dashboard
            </Link>

            <Link
              href="/profile"
              className="block rounded-lg px-4 py-3 transition hover:bg-indigo-50 dark:hover:bg-zinc-800"
            >
              👤 Profile
            </Link>

            <Link
              href="/wishlist"
              className="block rounded-lg px-4 py-3 transition hover:bg-indigo-50 dark:hover:bg-zinc-800"
            >
              ❤️ Wishlist
            </Link>

            <Link
              href="/my-reviews"
              className="block rounded-lg px-4 py-3 transition hover:bg-indigo-50 dark:hover:bg-zinc-800"
            >
              ⭐ My Reviews
            </Link>

            <Link
              href="/compare"
              className="block rounded-lg px-4 py-3 transition hover:bg-indigo-50 dark:hover:bg-zinc-800"
            >
              ⚖ Compare
            </Link>

            <Link
              href="/settings"
              className="block rounded-lg px-4 py-3 transition hover:bg-indigo-50 dark:hover:bg-zinc-800"
            >
              ⚙ Settings
            </Link>

          </nav>

        </aside>

        {/* Content */}

        <main className="min-w-0 flex-1">
          {children}
        </main>

      </div>

      <FooterSection />

    </div>
  );
}