"use client";

import Link from "next/link";
import AuthButton from "@/components/AuthButton";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link href="/" className="text-3xl font-bold">
          Insightful Reviews
        </Link>

        <nav className="hidden gap-8 md:flex">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/wishlist">Wishlist</Link>
        </nav>

        <AuthButton />

      </div>
    </header>
  );
}