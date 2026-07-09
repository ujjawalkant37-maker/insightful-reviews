import { supabase } from "@/lib/supabase";

export type ReviewInput = {
  product_name: string;
  rating: number;
  title: string;
  pros: string;
  cons: string;
  review: string;
};

export async function createReview(data: ReviewInput) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Please login first.");
  }

  const { error } = await supabase.from("reviews").insert({
    user_id: user.id,
    product_name: data.product_name,
    rating: data.rating,
    title: data.title,
    pros: data.pros,
    cons: data.cons,
    review: data.review,
  });

  if (error) throw error;
}