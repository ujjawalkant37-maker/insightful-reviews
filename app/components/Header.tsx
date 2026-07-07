"use client";
import React, { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white dark:bg-black border-b border-gray-100 dark:border-zinc-800">
      <nav className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-4">
          <a href="#" className="text-2xl font-semibold text-gray-900 dark:text-zinc-50">
            Insightful Reviews
          </a>
          <span className="hidden md:inline text-sm text-gray-600 dark:text-zinc-400">
            AI-powered product reviews & insights
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a href="#categories" className="text-sm text-gray-700 hover:underline dark:text-zinc-300">Categories</a>
          <a href="#trending" className="text-sm text-gray-700 hover:underline dark:text-zinc-300">Trending</a>
          <a href="#reviews" className="text-sm text-gray-700 hover:underline dark:text-zinc-300">Expert Reviews</a>
          <a href="#users" className="text-sm text-gray-700 hover:underline dark:text-zinc-300">User Reviews</a>
        </div>

        <div className="flex items-center gap-4">
          <a href="#cta" className="hidden sm:inline-block px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700">
            Get Started
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((s) => !s)}
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-900"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-gray-100 dark:border-zinc-800 bg-white dark:bg-black">
          <div className="container flex flex-col gap-2 py-4">
            <a href="#categories" className="text-gray-700 dark:text-zinc-300">Categories</a>
            <a href="#trending" className="text-gray-700 dark:text-zinc-300">Trending</a>
            <a href="#reviews" className="text-gray-700 dark:text-zinc-300">Expert Reviews</a>
            <a href="#users" className="text-gray-700 dark:text-zinc-300">User Reviews</a>
            <a href="#cta" className="mt-2 inline-block px-4 py-2 rounded-md bg-indigo-600 text-white text-sm">Get Started</a>
          </div>
        </div>
      )}
    </header>
  );
}
