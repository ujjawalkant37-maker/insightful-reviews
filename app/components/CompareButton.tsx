"use client";

import React from "react";
import { useRouter } from "next/navigation";

import useCompare from "./useCompare";

import {
  getProducts,
} from "@/lib/getProducts";

export default function CompareButton({
  id,
  slug,
}: {
  id: string;
  slug: string;
}) {
  const router = useRouter();

  const {
    compareIds,
    add,
    isCompared,
  } = useCompare();

  async function handleClick(
    e: React.MouseEvent
  ) {
    e.preventDefault();

    const already =
      isCompared(id);

    if (
      !already &&
      compareIds.length >= 5
    ) {
      alert(
        "You can compare only 5 products at a time."
      );
      return;
    }

    if (!already) {
      add(id);
    }

    const allProducts =
      await getProducts();

    const combinedIds =
      Array.from(
        new Set([
          ...compareIds,
          id,
        ])
      );

    const slugs =
      combinedIds
        .map((compareId) => {

          const product =
            allProducts.find(
              (p) =>
                String(p.id) ===
                compareId
            );

          return product?.slug;

        })
        .filter(
          Boolean
        ) as string[];

    const params =
      new URLSearchParams();

    if (slugs.length > 0) {
      params.set(
        "products",
        slugs.join(",")
      );
    }

    router.push(
      `/compare?${params.toString()}`
    );
  }

  return (

    <button
      onClick={handleClick}
      className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-center hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
      aria-pressed={isCompared(id)}
    >

      {isCompared(id)
        ? "Added"
        : "Compare"}

    </button>

  );
}