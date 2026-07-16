import { supabase } from "@/lib/supabase";

export type ReviewInput = {
  product_id: number;
  rating: number;
  title: string;
  review: string;
  pros?: string;
  cons?: string;
};

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
  helpful: number;
  not_helpful: number;
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

  if (error) throw error;
}

export async function getReviews(productId: number) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []) as DatabaseReview[];
}

export async function getUserReviews(userId: string) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(error);
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

  return {
    average:
      reviews.reduce(
        (sum, r) => sum + r.rating,
        0
      ) / reviews.length,
    total: reviews.length,
  };
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

export async function deleteReview(id: number) {
  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function markHelpful(reviewId: number) {
  const { data, error } = await supabase
    .from("reviews")
    .select("helpful")
    .eq("id", reviewId)
    .single();

  if (error) throw error;

  const { error: updateError } = await supabase
    .from("reviews")
    .update({
      helpful: (data.helpful ?? 0) + 1,
    })
    .eq("id", reviewId);

  if (updateError) throw updateError;
}

export async function markNotHelpful(reviewId: number) {
  const { data, error } = await supabase
    .from("reviews")
    .select("not_helpful")
    .eq("id", reviewId)
    .single();

  if (error) throw error;

  const { error: updateError } = await supabase
    .from("reviews")
    .update({
      not_helpful:
        (data.not_helpful ?? 0) + 1,
    })
    .eq("id", reviewId);

  if (updateError) throw updateError;
}