"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Props = {
  productId?: string | number;
};

export default function WriteReviewButton({
  productId,
}: Props) {
  const router = useRouter();

  async function handleClick() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    if (productId) {
      router.push(
        `/write-review?productId=${productId}`
      );
      return;
    }

    router.push("/write-review");
  }

  return (
    <div className="my-8 flex justify-center">
      <button
        onClick={handleClick}
        className="rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700"
      >
        ✍️ Write a Review
      </button>
    </div>
  );
}