"use client";

import React from "react";
import { useWishlist } from "./WishlistContext";
import { useToast } from "./ToastContext";

export default function WishlistButton({
  id,
}: {
  id: string;
}) {
  const { isWishlisted, toggle } = useWishlist();
  const { push } = useToast();

  const active = isWishlisted(id);

  async function handleToggle() {
    const result = await toggle(id);

    if (result === "added") {
      push("Added to wishlist");
      return;
    }

    if (result === "removed") {
      push("Removed from wishlist");
      return;
    }

    if (result === "auth-required") {
      push("Sign in to save wishlist items");
      return;
    }

    push("Could not update wishlist. Try again.");
  }

  return (
    <button
      aria-pressed={active}
      onClick={handleToggle}
      className={`px-2 py-1 rounded-md transition ${
        active
          ? "text-red-500"
          : "text-gray-700 dark:text-zinc-300"
      }`}
      title={
        active
          ? "Remove from wishlist"
          : "Add to wishlist"
      }
    >
      {active ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 21s-7-4.35-9-6.35A5.5 5.5 0 0 1 12 5.5a5.5 5.5 0 0 1 9 9.15C19 16.65 12 21 12 21z" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}