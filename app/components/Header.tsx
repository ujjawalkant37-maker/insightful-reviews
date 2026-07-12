"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthButton from "@/components/AuthButton";

export default function Header() {
  const pathname = usePathname();

  function navClass(path: string) {
    return pathname === path
      ? "text-indigo-600 font-semibold"
      : "text-gray-700 hover:text-indigo-600 dark:text-gray-300";
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link
          href="/"
          className="text-2xl font-extrabold text-indigo-600"
        >
          Insightful Reviews
        </Link>

        <nav className="hidden items-center gap-8 md:flex">

          <Link
            href="/"
            className={navClass("/")}
          >
            Home
          </Link>

          <Link
            href="/products"
            className={navClass("/products")}
          >
            Products
          </Link>

          <Link
            href="/compare"
            className={navClass("/compare")}
          >
            Compare
          </Link>

          <Link
            href="/wishlist"
            className={navClass("/wishlist")}
          >
            Wishlist
          </Link>

          <Link
            href="/my-reviews"
            className={navClass("/my-reviews")}
          >
            My Reviews
          </Link>

          <Link
            href="/dashboard"
            className={navClass("/dashboard")}
          >
            Dashboard
          </Link>

          <Link
            href="/profile"
            className={navClass("/profile")}
          >
            Profile
          </Link>

          <Link
            href="/settings"
            className={navClass("/settings")}
          >
            Settings
          </Link>

        </nav>

        <AuthButton />

      </div>
    </header>
  );
}