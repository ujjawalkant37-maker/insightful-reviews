import { supabase } from "@/lib/supabase";

export type DatabaseReview = {
  id: number;
  product_id: number;
  user_id: string;
  rating: number;
  title: string;
  review: string;
  created_at: string;
  pros?: string | null;
  cons?: string | null;
};

export async function getReviews(productId: number) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load reviews:", error.message);
    return [];
  }

  return (data ?? []) as DatabaseReview[];
}

export async function getAverageRating(productId: number) {
  const reviews = await getReviews(productId);

  if (reviews.length === 0) {
    return {
      average: 0,
      total: 0,
    };
  }

  const average =
    reviews.reduce((sum, review) => sum + review.rating, 0) /
    reviews.length;

  return {
    average,
    total: reviews.length,
  };
}

export async function getUserReviews(userId: string) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error.message);
    return [];
  }

  return (data ?? []) as DatabaseReview[];
}

export async function deleteReview(id: number) {
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function updateReview(
  id: number,
  values: {
    rating: number;
    title: string;
    review: string;
    pros?: string;
    cons?: string;
  }
) {
  const { error } = await supabase
    .from("reviews")
    .update(values)
    .eq("id", id);

  if (error) throw error;
}