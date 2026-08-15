 "use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AuthButton from "@/components/AuthButton";
import NotificationBell from "@/components/NotificationBell";

const links = [
  ["/", "Home"],
  ["/directory", "Directory"],
  ["/products", "Products"],
  ["/guides", "Guides"],
  ["/compare", "Compare"],
  ["/wishlist", "Wishlist"],
  ["/about", "How It Works"],
] as const;

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navClass = (path: string) => pathname === path ? "font-semibold text-indigo-600" : "text-gray-700 hover:text-indigo-600 dark:text-gray-300";

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" onClick={() => setOpen(false)} className="text-xl font-extrabold tracking-tight text-indigo-600 sm:text-2xl">Insightful Reviews</Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {links.map(([href, label]) => <Link key={href} href={href} className={navClass(href)}>{label}</Link>)}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/ai" className="hidden rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 sm:inline-flex">AI Assistant</Link>
          <NotificationBell />
          <AuthButton />
          <button type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)} className="rounded-xl border px-3 py-2 text-sm font-semibold lg:hidden dark:border-zinc-700">
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-navigation" className="border-t border-gray-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-950 lg:hidden">
          <div className="grid gap-1">
            {links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-semibold hover:bg-slate-50 dark:hover:bg-zinc-900">{label}</Link>)}
            <Link href="/ai" onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 font-semibold text-indigo-600 hover:bg-slate-50 dark:hover:bg-zinc-900">AI Assistant</Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
