import { supabase } from "@/lib/supabase";

export type DatabaseProduct = {
  id: number;
  slug: string;
  name: string;
  category_id: number;
  brand: string | null;
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

function normalize(value: unknown): string {
  return String(value ?? "")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

export async function getProducts(): Promise<DatabaseProduct[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("getProducts error:", error);
    return [];
  }

  return (data ?? []) as DatabaseProduct[];
}

export async function getProductById(
  id: number
): Promise<DatabaseProduct | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getProductById error:", error);
    return null;
  }

  return data as DatabaseProduct | null;
}

export async function getProductBySlug(
  slug: string
): Promise<DatabaseProduct | null> {
  const cleanSlug = decodeURIComponent(slug ?? "").trim().toLowerCase();
  if (!cleanSlug) return null;

  // Normal path: the catalogue and detail page use the same Supabase slug.
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", cleanSlug)
    .maybeSingle();

  if (data) return data as DatabaseProduct;
  if (error) console.error("getProductBySlug exact lookup:", error);

  // Defensive fallback for legacy/inconsistent slugs.
  const { data: products, error: listError } = await supabase
    .from("products")
    .select("*");

  if (listError) {
    console.error("getProductBySlug fallback:", listError);
    return null;
  }

  const requested = normalize(cleanSlug);
  const match = (products ?? []).find((product) =>
    normalize(product.slug) === requested || normalize(product.name) === requested
  );

  if (match) return match as DatabaseProduct;

  console.error(`Product not found for slug: ${cleanSlug}`);
  return null;
}

export async function getProductsByCategory(
  categoryId: number
): Promise<DatabaseProduct[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .order("rating", { ascending: false });

  if (error) {
    console.error("getProductsByCategory error:", error);
    return [];
  }

  return (data ?? []) as DatabaseProduct[];
}

export async function searchProducts(
  keyword: string
): Promise<DatabaseProduct[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("name", `%${keyword}%`)
    .order("rating", { ascending: false });

  if (error) {
    console.error("searchProducts error:", error);
    return [];
  }

  return (data ?? []) as DatabaseProduct[];
}
