"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      subscription.unsubscribe();
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  async function login() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  }

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          Login
        </Link>

        <Link
          href="/signup"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Sign Up
        </Link>

        <button
          onClick={login}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Google
        </button>
      </div>
    );
  }

  const avatar =
    user.user_metadata?.avatar_url ??
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.email ?? "User"
    )}`;

  const name =
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.email;

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-lg border px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
      >
        <img
          src={avatar}
          alt="Profile"
          className="h-10 w-10 rounded-full"
        />

        <div className="hidden text-left md:block">
          <div className="text-sm font-semibold">
            {name}
          </div>

          <div className="text-xs text-gray-500">
            {user.email}
          </div>
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-xl border bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">

          <Link
            href="/dashboard"
            className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            Dashboard
          </Link>

          <Link
            href="/profile"
            className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            Profile
          </Link>

          <Link
            href="/wishlist"
            className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            Wishlist
          </Link>

          <Link
            href="/my-reviews"
            className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            My Reviews
          </Link>

          <Link
            href="/settings"
            className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            Settings
          </Link>

          <button
            onClick={logout}
            className="w-full border-t px-4 py-3 text-left text-red-600 hover:bg-red-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
          >
            Logout
          </button>

        </div>
      )}
    </div>
  );
}