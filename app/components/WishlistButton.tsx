"use client";

import React, { useCallback } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "./WishlistContext";
import { useToast } from "./ToastContext";

type Props = {
  id: string;
};

export default function WishlistButton({
  id,
}: Props) {
  const { isWishlisted, toggle } =
    useWishlist();

  const { push } = useToast();

  const active =
    isWishlisted(id);

  const handleClick = useCallback(
    async (
      e: React.MouseEvent<HTMLButtonElement>
    ) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        const result =
          await toggle(id);

        switch (result) {
          case "added":
            push(
              "Added to wishlist"
            );
            break;

          case "removed":
            push(
              "Removed from wishlist"
            );
            break;

          case "auth-required":
            push(
              "Please sign in to use Wishlist"
            );
            break;

          default:
            push(
              "Something went wrong"
            );
        }
      } catch (error) {
        console.error(error);

        push(
          "Unable to update wishlist."
        );
      }
    },
    [id, push, toggle]
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={
        active
          ? "Remove from Wishlist"
          : "Add to Wishlist"
      }
      className="rounded-full p-2 transition hover:bg-red-50 dark:hover:bg-zinc-800"
    >
      <Heart
        size={22}
        className={
          active
            ? "fill-red-500 text-red-500"
            : "text-gray-500 transition hover:text-red-500"
        }
      />
    </button>
  );
}