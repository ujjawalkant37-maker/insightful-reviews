"use client";
import React from "react";

export default function SearchBar({
  value = "",
  onSearch,
  onChange,
  placeholder = "Search products and reviews",
}: {
  value?: string;
  onSearch?: (q: string) => void;
  onChange?: (q: string) => void;
  placeholder?: string;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch?.(value.trim());
      }}
      className="w-full"
    >
      <label htmlFor="search" className="sr-only">Search products and reviews</label>
      <div className="flex items-center gap-2">
        <input
          id="search"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
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
