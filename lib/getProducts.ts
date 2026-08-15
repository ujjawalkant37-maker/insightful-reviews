import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import catalogue from "@/data/products.json";

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
  image_url: string | null;
  images: string[] | null;
  buy_url: string | null;
  image_source: string | null;
  created_at: string;
};

function normalize(value: unknown): string {
  return String(value ?? "")
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .trim();
}

function finiteNumber(value: unknown, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function isUsableImage(value: unknown): value is string {
  if (typeof value !== "string") return false;

  const image = value.trim();
  if (!image) return false;

  // Local catalogue illustrations are valid local visual assets.
  // They are intentionally retained until a licensed/verified photograph
  // is available. Remote images are accepted only as explicit URLs.
  return /^https?:\/\//i.test(image) || image.startsWith("/");
}

function normalizeImages(imageUrl: unknown, images: unknown): string[] | null {
  const candidates: string[] = [];

  if (isUsableImage(imageUrl)) {
    candidates.push(imageUrl.trim());
  }

  if (Array.isArray(images)) {
    for (const image of images) {
      if (isUsableImage(image)) candidates.push(image.trim());
    }
  }

  const unique = [...new Set(candidates)];
  return unique.length > 0 ? unique : null;
}

function normalizeProduct(row: Record<string, unknown>): DatabaseProduct {
  const images = normalizeImages(row.image_url, row.images);

  return {
    id: finiteNumber(row.id, 0),
    slug: String(row.slug ?? "").trim(),
    name: String(row.name ?? "Unnamed product").trim(),
    category_id: finiteNumber(row.category_id, 0),
    brand: typeof row.brand === "string" ? row.brand.trim() || null : null,
    price: Math.max(0, finiteNumber(row.price, 0)),
    rating: Math.min(5, Math.max(0, finiteNumber(row.rating, 0))),
    ai_score: Math.round(Math.min(100, Math.max(0, finiteNumber(row.ai_score, 0)))),
    summary: String(row.summary ?? row.short_description ?? "").trim(),
    description: String(row.description ?? row.full_description ?? "").trim(),
    specifications:
      row.specifications && typeof row.specifications === "object"
        ? (row.specifications as Record<string, string>)
        : null,
    pros: Array.isArray(row.pros) ? (row.pros as string[]) : null,
    cons: Array.isArray(row.cons) ? (row.cons as string[]) : null,
    image_url: images?.[0] ?? null,
    images,
    buy_url: typeof row.buy_url === "string" ? row.buy_url.trim() || null : null,
    image_source: (() => {
      const item = (catalogue as Array<{ slug?: string; imageSource?: string | null }>).find(
        (entry) => entry.slug === String(row.slug ?? "").trim()
      );
      return typeof item?.imageSource === "string" && item.imageSource.trim()
        ? item.imageSource.trim()
        : null;
    })(),
    created_at: String(row.created_at ?? ""),
  };
}


function localCatalogueProducts(): DatabaseProduct[] {
  const categories = new Map<string, number>();
  let nextCategoryId = 1;

  return (catalogue as Array<Record<string, unknown>>).map((item, index) => {
    const categorySlug = String(item.categoryId ?? "uncategorized");
    if (!categories.has(categorySlug)) {
      categories.set(categorySlug, nextCategoryId++);
    }

    const rawPrice = String(item.price ?? "0").replace(/[^\d.]/g, "");
    const price = finiteNumber(rawPrice, 0);
    const specs =
      item.specs && typeof item.specs === "object"
        ? (item.specs as Record<string, string>)
        : null;

    return normalizeProduct({
      id: index + 1,
      slug: item.slug,
      name: item.name,
      category_id: categories.get(categorySlug),
      brand: String(item.name ?? "").split(" ")[0] || null,
      price,
      rating: item.rating,
      ai_score: item.aiScore,
      summary: item.summary,
      description: item.summary,
      specifications: specs,
      pros: [],
      cons: [],
      image_url: Array.isArray(item.images) ? item.images[0] : null,
      images: item.images,
      buy_url: null,
      created_at: new Date(0).toISOString(),
    });
  });
}

function localProductsBySlug(slug: string): DatabaseProduct | null {
  const requested = normalize(decodeURIComponent(slug ?? ""));
  return (
    localCatalogueProducts().find(
      (product) =>
        normalize(product.slug) === requested ||
        normalize(product.name) === requested
    ) ?? null
  );
}

function normalizeRows(rows: unknown[]): DatabaseProduct[] {
  return rows
    .map((row) => normalizeProduct((row ?? {}) as Record<string, unknown>))
    .filter((product) => product.id > 0 && product.slug && product.name);
}

export async function getProducts(): Promise<DatabaseProduct[]> {
  if (!isSupabaseConfigured) return localCatalogueProducts();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("getProducts error; using local catalogue fallback:", error);
    return localCatalogueProducts();
  }

  const products = normalizeRows(data ?? []);
  return products.length > 0 ? products : localCatalogueProducts();
}

export async function getProductById(id: number): Promise<DatabaseProduct | null> {
  if (!Number.isFinite(id) || id <= 0) return null;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getProductById error:", error);
    return null;
  }

  return data ? normalizeProduct(data) : null;
}

export async function getProductBySlug(slug: string): Promise<DatabaseProduct | null> {
  const cleanSlug = decodeURIComponent(slug ?? "").trim().toLowerCase();
  if (!cleanSlug) return null;

  if (!isSupabaseConfigured) return localProductsBySlug(cleanSlug);

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", cleanSlug)
    .maybeSingle();

  if (data) return normalizeProduct(data);

  if (error) console.error("getProductBySlug exact lookup:", error);

  const { data: products, error: listError } = await supabase
    .from("products")
    .select("*");

  if (!listError) {
    const match = normalizeRows(products ?? []).find(
      (product) =>
        normalize(product.slug) === normalize(cleanSlug) ||
        normalize(product.name) === normalize(cleanSlug)
    );
    if (match) return match;
  } else {
    console.error("getProductBySlug fallback:", listError);
  }

  return localProductsBySlug(cleanSlug);
}

export async function getProductsByCategory(categoryId: number): Promise<DatabaseProduct[]> {
  if (!Number.isFinite(categoryId) || categoryId <= 0) return [];

  if (!isSupabaseConfigured) {
    return localCatalogueProducts().filter((product) => product.category_id === categoryId);
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", categoryId)
    .order("rating", { ascending: false });

  if (error) {
    console.error("getProductsByCategory error; using local catalogue fallback:", error);
    return localCatalogueProducts().filter((product) => product.category_id === categoryId);
  }

  return normalizeRows(data ?? []);
}

export async function searchProducts(keyword: string): Promise<DatabaseProduct[]> {
  const query = keyword.trim();
  if (!query) return getProducts();

  if (!isSupabaseConfigured) {
    const q = normalize(query);
    return localCatalogueProducts().filter(
      (product) =>
        normalize(product.name).includes(q) ||
        normalize(product.brand).includes(q) ||
        normalize(product.summary).includes(q)
    );
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(`name.ilike.%${query}%,brand.ilike.%${query}%,summary.ilike.%${query}%`)
    .order("rating", { ascending: false })
    .limit(100);

  if (error) {
    console.error("searchProducts error; using local catalogue fallback:", error);
    const q = normalize(query);
    return localCatalogueProducts().filter(
      (product) =>
        normalize(product.name).includes(q) ||
        normalize(product.brand).includes(q) ||
        normalize(product.summary).includes(q)
    );
  }

  return normalizeRows(data ?? []);
}
