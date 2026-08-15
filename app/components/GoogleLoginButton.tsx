"use client";

import Image from "@/components/SafeImage";

import { useCallback, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export default function GoogleLoginButton() {
  const [user, setUser] = useState<User | null>(null);

  const loadUser = useCallback(async () => {
    const {
      data: { user: currentUser },
    } = await supabase.auth.getUser();

    setUser(currentUser);

    if (currentUser) {
      await supabase.from("profiles").upsert({
        id: currentUser.id,
        full_name: currentUser.user_metadata?.full_name,
        avatar_url: currentUser.user_metadata?.avatar_url,
      });
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadUser();
    }, 0);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void loadUser();
    });

    return () => {
      window.clearTimeout(timer);
      subscription.unsubscribe();
    };
  }, [loadUser]);

  async function signIn() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000",
      },
    });
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  if (!user) {
    return (
      <button
        type="button"
        onClick={signIn}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Continue with Google
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {user.user_metadata?.avatar_url ? (
        <Image
          src={user.user_metadata.avatar_url}
          alt=""
          width={40}
          height={40}
          unoptimized
          className="h-10 w-10 rounded-full"
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
          {user.user_metadata?.full_name?.charAt(0) ?? "U"}
        </div>
      )}

      <div>
        <p className="font-medium">{user.user_metadata?.full_name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      <button
        type="button"
        onClick={signOut}
        className="rounded-lg bg-red-600 px-4 py-2 text-white"
      >
        Logout
      </button>
    </div>
  );
}
