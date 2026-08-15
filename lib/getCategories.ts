import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import categories from "@/data/categories.json";

export type DatabaseCategory = {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  created_at: string;
};

function localCategories(): DatabaseCategory[] {
  return (categories as Array<Record<string, unknown>>)
    .filter((category) => category.type === "product")
    .map((category, index) => ({
      id: index + 1,
      name: String(category.name ?? category.slug ?? "Category"),
      slug: String(category.slug ?? category.id ?? ""),
      icon: typeof category.icon === "string" ? category.icon : null,
      created_at: new Date(0).toISOString(),
    }));
}

export async function getCategories(): Promise<DatabaseCategory[]> {
  if (!isSupabaseConfigured) return localCategories();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Failed to fetch categories; using local catalogue:", error.message);
    return localCategories();
  }

  const result = (data ?? []) as DatabaseCategory[];
  return result.length > 0 ? result : localCategories();
}

export async function getCategoryById(id: number) {
  if (!Number.isFinite(id) || id <= 0) return null;

  if (!isSupabaseConfigured) {
    return localCategories().find((category) => category.id === id) ?? null;
  }

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getCategoryById error:", error.message);
    return localCategories().find((category) => category.id === id) ?? null;
  }

  return (data as DatabaseCategory | null) ?? null;
}

export async function getCategoryBySlug(slug: string) {
  const cleanSlug = decodeURIComponent(slug ?? "").trim().toLowerCase();
  if (!cleanSlug) return null;

  if (!isSupabaseConfigured) {
    return localCategories().find((category) => category.slug === cleanSlug) ?? null;
  }

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", cleanSlug)
    .maybeSingle();

  if (error) {
    console.error("getCategoryBySlug error:", error.message);
    return localCategories().find((category) => category.slug === cleanSlug) ?? null;
  }

  return (data as DatabaseCategory | null) ?? null;
}
