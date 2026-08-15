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
  helpful?: number | null;
  not_helpful?: number | null;
};

function getErrorMessage(error: unknown): string {
  if (!error) return "Unknown error.";

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object") {
    const value = error as {
      message?: string;
      details?: string;
      hint?: string;
      code?: string;
    };

    const parts = [
      value.message,
      value.details,
      value.hint,
      value.code ? `Code: ${value.code}` : undefined,
    ].filter(Boolean);

    if (parts.length > 0) {
      return parts.join(" — ");
    }

    try {
      return JSON.stringify(error);
    } catch {
      return "Unknown Supabase error.";
    }
  }

  return "Unknown error.";
}

export async function createReview(data: ReviewInput) {
  if (!Number.isInteger(data.product_id) || data.product_id <= 0) {
    throw new Error("Invalid product.");
  }

  if (!Number.isFinite(data.rating) || data.rating < 1 || data.rating > 5) {
    throw new Error("Rating must be between 1 and 5.");
  }

  if (!data.title?.trim()) {
    throw new Error("Review title is required.");
  }

  if (!data.review?.trim()) {
    throw new Error("Detailed review is required.");
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    throw new Error(
      `Unable to verify your login: ${getErrorMessage(authError)}`
    );
  }

  if (!user) {
    throw new Error("Please login first to submit a review.");
  }

  /*
   * The current reviews table does not contain a "cons" column.
   *
   * Therefore we intentionally send only the fields known to exist
   * in the current database schema.
   */
  const payload = {
    user_id: user.id,
    product_id: data.product_id,
    rating: data.rating,
    title: data.title.trim(),
    review: data.review.trim(),
  };

  const { error } = await supabase
    .from("reviews")
    .insert(payload);

  if (error) {
    console.error("createReview Supabase error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    throw new Error(
      `Unable to submit review: ${getErrorMessage(error)}`
    );
  }

  return true;
}

export async function getReviews(productId: number) {
  if (!Number.isInteger(productId) || productId <= 0) {
    return [];
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("getReviews error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

    return [];
  }

  return (data ?? []) as DatabaseReview[];
}

export async function getUserReviews(userId: string) {
  if (!userId) {
    return [];
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("getUserReviews error:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });

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

  const totalRating = reviews.reduce(
    (sum, item) => sum + Number(item.rating || 0),
    0
  );

  return {
    average: totalRating / reviews.length,
    total: reviews.length,
  };
}

export async function updateReview(
  id: number,
  values: {
    rating: number;
    title: string;
    review: string;
  }
) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid review.");
  }

  const payload = {
    rating: values.rating,
    title: values.title.trim(),
    review: values.review.trim(),
  };

  const { error } = await supabase
    .from("reviews")
    .update(payload)
    .eq("id", id);

  if (error) {
    throw new Error(
      `Unable to update review: ${getErrorMessage(error)}`
    );
  }

  return true;
}

export async function deleteReview(id: number) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid review.");
  }

  const { error } = await supabase
    .from("reviews")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(
      `Unable to delete review: ${getErrorMessage(error)}`
    );
  }

  return true;
}

export async function markHelpful(reviewId: number) {
  if (!Number.isInteger(reviewId) || reviewId <= 0) {
    throw new Error("Invalid review.");
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("helpful")
    .eq("id", reviewId)
    .single();

  if (error) {
    throw new Error(
      `Unable to load review: ${getErrorMessage(error)}`
    );
  }

  const currentHelpful = Number(data?.helpful ?? 0);

  const { error: updateError } = await supabase
    .from("reviews")
    .update({
      helpful: currentHelpful + 1,
    })
    .eq("id", reviewId);

  if (updateError) {
    throw new Error(
      `Unable to mark review helpful: ${getErrorMessage(updateError)}`
    );
  }

  return true;
}

export async function markNotHelpful(reviewId: number) {
  if (!Number.isInteger(reviewId) || reviewId <= 0) {
    throw new Error("Invalid review.");
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("not_helpful")
    .eq("id", reviewId)
    .single();

  if (error) {
    throw new Error(
      `Unable to load review: ${getErrorMessage(error)}`
    );
  }

  const currentNotHelpful = Number(data?.not_helpful ?? 0);

  const { error: updateError } = await supabase
    .from("reviews")
    .update({
      not_helpful: currentNotHelpful + 1,
    })
    .eq("id", reviewId);

  if (updateError) {
    throw new Error(
      `Unable to mark review not helpful: ${getErrorMessage(updateError)}`
    );
  }

  return true;
}