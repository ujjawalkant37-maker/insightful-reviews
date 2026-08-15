"use client";

import React from "react";

export default function SearchBar({
  value = "",
  onSearch,
  onChange,
  placeholder = "Search Insightful Reviews",
}: {
  value?: string;
  onSearch?: (q: string) => void;
  onChange?: (q: string) => void;
  placeholder?: string;
}) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSearch?.(value.trim()); }} className="w-full">
      <label htmlFor="global-search" className="sr-only">Search Insightful Reviews</label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="global-search"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white px-5 py-4 text-base text-slate-900 shadow-lg outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-300"
        />
        <button type="submit" className="rounded-xl bg-cyan-400 px-7 py-4 font-bold text-slate-950 shadow-lg hover:bg-cyan-300">Search</button>
      </div>
    </form>
  );
}
