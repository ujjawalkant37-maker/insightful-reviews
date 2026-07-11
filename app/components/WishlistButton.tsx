"use client";

import React from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "./WishlistContext";
import { useToast } from "./ToastContext";

type Props = {
  id: string;
};

export default function WishlistButton({ id }: Props) {
  const { isWishlisted, toggle } = useWishlist();
  const { push } = useToast();

  const active = isWishlisted(id);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Wishlist Product ID:", id);
    
    try {
      const result = await toggle(id);

      switch (result) {
        case "added":
          push("Added to wishlist");
          break;

        case "removed":
          push("Removed from wishlist");
          break;

        case "auth-required":
          push("Please sign in to use Wishlist");
          break;

        case "error":
        default:
          push("Something went wrong");
          break;
      }
    } catch (err: any) {
      console.error("Wishlist Error:", err);
      push(err?.message ?? "Wishlist failed");
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Wishlist"
      className="rounded-full p-2 transition hover:bg-red-50 dark:hover:bg-zinc-800"
    >
      <Heart
        size={22}
        className={
          active
            ? "fill-red-500 text-red-500"
            : "text-gray-500 hover:text-red-500"
        }
      />
    </button>
  );
}