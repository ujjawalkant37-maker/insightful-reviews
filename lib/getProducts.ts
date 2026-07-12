import { supabase } from "@/lib/supabase";

export type DatabaseProduct = {
  id: number;
  slug: string;
  name: string;
  category_id: number;
  brand: string;
  price: number;
  rating: number;
  ai_score: number;
  summary: string;
  description: string;
  specifications: Record<string, string> | null;
  pros: string[] | null;
  cons: string[] | null;
  images: string[] | null;
  buy_url: string | null;
  created_at: string;
};

export async function getProducts() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("========== DEBUG ==========");
  console.log("SESSION:", session);

  const { data, error, status } = await supabase
    .from("products")
    .select("*")
    .order("name", { ascending: true });

  console.log("STATUS:", status);
  console.log("ERROR:", error);
  console.log("ROWS:", data);
  console.log("===========================");

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []) as DatabaseProduct[];
}

export async function getProductById(id: number) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data as DatabaseProduct;
}

export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data as DatabaseProduct;
}

export async function getProductsByCategory(categoryId: number) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .order("rating", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []) as DatabaseProduct[];
}

export async function searchProducts(keyword: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("name", `%${keyword}%`)
    .order("rating", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []) as DatabaseProduct[];
}