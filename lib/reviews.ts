import { supabase } from "@/lib/supabase";

export type ReviewInput = {
  product_id: number;
  rating: number;
  title: string;
  review: string;
  pros?: string;
  cons?: string;
};

export async function createReview(data: ReviewInput) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Please login first.");
  }

  const { error } = await supabase
    .from("reviews")
    .insert({
      user_id: user.id,

      product_id: data.product_id,

      rating: data.rating,

      title: data.title,

      review: data.review,

      pros: data.pros ?? "",

      cons: data.cons ?? "",

      helpful: 0,

      not_helpful: 0,
    });

  if (error) {
    throw error;
  }
}