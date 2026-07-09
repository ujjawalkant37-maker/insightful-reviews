"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function login() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
  }

  async function logout() {
    await supabase.auth.signOut();
  }

  if (!user) {
    return (
      <button
        onClick={login}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Continue with Google
      </button>
    );
  }

  const avatar =
    user.user_metadata?.avatar_url ||
    "https://ui-avatars.com/api/?name=User";

  const name =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email;

  return (
    <div className="flex items-center gap-3">
      <img
        src={avatar}
        alt="Profile"
        className="h-10 w-10 rounded-full border"
      />

      <div className="hidden md:flex flex-col">
        <span className="text-sm font-semibold">{name}</span>
        <span className="text-xs text-gray-500">{user.email}</span>
      </div>

      <button
        onClick={logout}
        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}