"use client";
import React, { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch?: (q: string) => void }) {
  const [q, setQ] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch?.(q.trim());
      }}
      className="w-full max-w-3xl"
    >
      <label htmlFor="search" className="sr-only">Search products and reviews</label>
      <div className="flex items-center gap-2">
        <input
          id="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search for Smartphones, Laptops, TVs, Appliances..."
          className="flex-1 rounded-l-md border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="rounded-r-md bg-indigo-600 px-4 py-2 text-white text-sm hover:bg-indigo-700"
        >
          Search
        </button>
      </div>
    </form>
  );
}
