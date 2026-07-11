"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (data.user && !data.session) {
      setMessage(
        "Account created successfully. Please verify your email before logging in."
      );
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function signupWithGoogle() {
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
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 border dark:border-zinc-800 shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <p className="mt-2 text-center text-gray-500">
          Join Insightful Reviews
        </p>

        <form
          onSubmit={handleSignup}
          className="mt-8 space-y-5"
        >

          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>

            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className="w-full rounded-lg border px-4 py-3 dark:bg-zinc-800 dark:border-zinc-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full rounded-lg border px-4 py-3 dark:bg-zinc-800 dark:border-zinc-700"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full rounded-lg border px-4 py-3 dark:bg-zinc-800 dark:border-zinc-700"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-100 px-4 py-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="rounded-lg bg-green-100 px-4 py-3 text-green-700 text-sm">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-semibold transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">
            OR
          </span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <button
          onClick={signupWithGoogle}
          className="w-full rounded-lg border py-3 font-medium hover:bg-gray-100 dark:hover:bg-zinc-800 transition"
        >
          Continue with Google
        </button>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>

      </div>
    </main>
  );
}