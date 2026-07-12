import { supabase } from "@/lib/supabase";

export type DatabaseCategory = {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  created_at: string;
};

export async function getCategories() {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Failed to fetch categories:", error.message);
    return [];
  }

  return (data ?? []) as DatabaseCategory[];
}

export async function getCategoryById(id: number) {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error.message);
    return null;
  }

  return data as DatabaseCategory;
}

export async function getCategoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(error.message);
    return null;
  }

  return data as DatabaseCategory;
}