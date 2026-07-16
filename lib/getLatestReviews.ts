import { supabase } from "@/lib/supabase";

export type LatestReview = {
  id: number;
  rating: number;
  title: string;
  review: string;
  pros: string[] | null;
  cons: string[] | null;
  helpful: number;
  created_at: string;
  product: {
    id: number;
    name: string;
    slug: string;
  } | null;
  profile: {
    full_name: string | null;
  } | null;
};

export async function getLatestReviews() {
  const { data, error } = await supabase
    .from("reviews")
    .select(`
      id,
      rating,
      title,
      review,
      pros,
      cons,
      helpful,
      created_at,
      product:products(
        id,
        name,
        slug
      ),
      profile:profiles(
        full_name
      )
    `)
    .order("created_at", {
      ascending: false,
    })
    .limit(6);

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []) as LatestReview[];
}