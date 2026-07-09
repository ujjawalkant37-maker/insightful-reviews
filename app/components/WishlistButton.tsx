"use client";

import React from "react";
import { useWishlist } from "./WishlistContext";
import { useToast } from "./ToastContext";

type Props = {
  id: string;
};

export default function WishlistButton({ id }: Props) {
  const { isWishlisted, toggle } = useWishlist();
  const { push } = useToast();

  const active = isWishlisted(id);

  async function handleClick() {
    await toggle(id);

    push(
      active
        ? "Removed from wishlist"
        : "Added to wishlist"
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Wishlist"
      className="rounded-full p-2 transition hover:bg-red-50"
    >
      {active ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#ef4444"
          className="h-6 w-6"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-6 w-6 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.239-4.5-5-4.5-1.74 0-3.27.81-4 2.09-.73-1.28-2.26-2.09-4-2.09-2.761 0-5 2.015-5 4.5 0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      )}
    </button>
  );
}