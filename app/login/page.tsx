"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function loginWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      setError(error.message);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 shadow-lg border dark:border-zinc-800 p-8">

        <h1 className="text-3xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Login to Insightful Reviews
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 dark:bg-zinc-800 dark:border-zinc-700"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 dark:bg-zinc-800 dark:border-zinc-700"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-100 text-red-700 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-semibold transition"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <button
          onClick={loginWithGoogle}
          className="w-full rounded-lg border py-3 font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
        >
          Continue with Google
        </button>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>

      </div>
    </main>
  );
}