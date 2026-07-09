"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function GoogleLoginButton() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    if (user) {
      await supabase.from("profiles").upsert({
        id: user.id,
        full_name: user.user_metadata?.full_name,
        avatar_url: user.user_metadata?.avatar_url,
      });
    }
  }

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
  }

  if (!user) {
    return (
      <button
        onClick={signIn}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Continue with Google
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <img
        src={user.user_metadata?.avatar_url}
        alt=""
        className="w-10 h-10 rounded-full"
      />

      <div>
        <p className="font-medium">{user.user_metadata?.full_name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      <button
        onClick={signOut}
        className="rounded-lg bg-red-600 px-4 py-2 text-white"
      >
        Logout
      </button>
    </div>
  );
}