import { supabase } from "@/lib/supabase";
import fallbackCategories from "@/data/categories.json";
import fallbackDirectory from "@/data/directory.json";

export type DirectoryCategory = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  entity_type: string;
};

export type DirectoryListing = {
  id: number;
  slug: string;
  name: string;
  categoryId: number | null;
  category: string;
  categoryName: string;
  categoryIcon: string | null;
  sector: string;
  organizationName: string | null;
  city: string;
  state: string;
  district: string | null;
  locality: string | null;
  address: string | null;
  description: string | null;
  website: string | null;
  sourceUrl: string | null;
  tags: string[];
  verified: boolean;
  rating: number | null;
  reviewCount: number;
  trustScore: number | null;
  attributes: Record<string, unknown>;
  imageUrl: string | null;
  images: string[];
  phone: string | null;
  email: string | null;
};

type RawEntityRow = {
  id: number;
  slug: string;
  name: string;
  category_id: number | null;
  organization_name: string | null;
  short_description?: string | null;
  description: string | null;
  website: string | null;
  source_url?: string | null;
  phone: string | null;
  email: string | null;
  image_url: string | null;
  images: string[] | null;
  address: string | null;
  locality: string | null;
  city: string | null;
  district: string | null;
  state: string | null;
  rating: number | null;
  review_count: number | null;
  trust_score: number | null;
  is_verified: boolean | null;
  attributes: Record<string, unknown> | null;
  category?: {
    name: string;
    slug: string;
    icon: string | null;
    entity_type: string | null;
  } | null;
};

const CATEGORY_ALIASES: Record<string, string> = {
  diagnostics: "diagnostic-centres",
  coaching: "coaching-institutes",
  gyms: "gyms-fitness",
  "automobile-service": "automobile-services",
  "car-dealers": "automobile-dealers",
  "travel-agencies": "travel-services",
  attractions: "tourist-attractions",
  malls: "shopping-malls",
  coworking: "coworking-spaces",
  hotspots: "local-amenities",
  travel: "travel-destinations",
};

export const DIRECTORY_CATEGORY_OPTIONS = [
  ["hospitals", "Hospitals", "🏥"],
  ["clinics", "Clinics", "🩺"],
  ["diagnostic-centres", "Diagnostic Centres", "🔬"],
  ["pharmacies", "Pharmacies", "💊"],
  ["schools", "Schools", "🏫"],
  ["colleges", "Colleges", "🎓"],
  ["universities", "Universities", "🏛️"],
  ["coaching-institutes", "Coaching Institutes", "📚"],
  ["hotels", "Hotels", "🏨"],
  ["restaurants", "Restaurants", "🍽️"],
  ["cafes", "Cafes", "☕"],
  ["travel-services", "Travel Services", "✈️"],
  ["tourist-attractions", "Tourist Attractions", "🗺️"],
  ["travel-destinations", "Travel Destinations", "🌍"],
  ["gyms-fitness", "Gyms & Fitness", "🏋️"],
  ["salons", "Salons", "💇"],
  ["spas", "Spas", "🧖"],
  ["banks", "Banks", "🏦"],
  ["atms", "ATMs", "💳"],
  ["insurance", "Insurance", "🛡️"],
  ["automobile-dealers", "Automobile Dealers", "🚗"],
  ["automobile-services", "Automobile Services", "🔧"],
  ["petrol-pumps", "Petrol Pumps", "⛽"],
  ["ev-charging", "EV Charging", "⚡"],
  ["real-estate", "Real Estate", "🏠"],
  ["coworking-spaces", "Coworking Spaces", "💼"],
  ["cinemas", "Cinemas", "🎬"],
  ["event-venues", "Event Venues", "🎉"],
  ["legal-services", "Legal Services", "⚖️"],
  ["professional-services", "Professional Services", "💼"],
  ["shopping-malls", "Shopping Malls", "🛍️"],
  ["local-amenities", "Local Amenities", "📍"],
] as const;

const INDIA_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry",
];

const CATEGORY_IMAGES: Record<string, string> = {
  hospitals: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
  clinics: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
  "diagnostic-centres": "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
  pharmacies: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=1200&q=80",
  schools: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
  colleges: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=80",
  universities: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
  hotels: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  restaurants: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  cafes: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
  banks: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
};

function normalize(value: string | null | undefined) {
  return (value ?? "").trim().toLowerCase();
}

function safeSearch(value: string) {
  return value.replace(/[%,()]/g, " ").replace(/\s+/g, " ").trim().slice(0, 80);
}

function fallbackCategory(slug: string) {
  const normalized = CATEGORY_ALIASES[slug] ?? slug;
  const match = DIRECTORY_CATEGORY_OPTIONS.find(([item]) => item === normalized);
  if (match) return { name: match[1], icon: match[2], entity_type: "services" };
  const jsonMatch = fallbackCategories.find(
    (item) => item.type === "directory" && item.slug === normalized,
  );
  return {
    name: jsonMatch?.name ?? "Directory",
    icon: jsonMatch?.icon ?? "📍",
    entity_type: jsonMatch?.entity_type ?? "services",
  };
}

function imageFor(category: string, supplied?: string | null) {
  if (supplied) return supplied;
  return CATEGORY_IMAGES[category] ?? "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80";
}

function normalizeRow(row: RawEntityRow): DirectoryListing {
  const categorySlug = row.category?.slug ?? "professional-services";
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    categoryId: row.category_id,
    category: categorySlug,
    categoryName: row.category?.name ?? fallbackCategory(categorySlug).name,
    categoryIcon: row.category?.icon ?? fallbackCategory(categorySlug).icon,
    sector: row.category?.entity_type ?? fallbackCategory(categorySlug).entity_type,
    organizationName: row.organization_name,
    city: row.city ?? "",
    state: row.state ?? "",
    district: row.district,
    locality: row.locality,
    address: row.address,
    description: row.description ?? row.short_description ?? null,
    website: row.website,
    sourceUrl: row.source_url ?? null,
    tags: [],
    verified: Boolean(row.is_verified),
    rating: row.rating,
    reviewCount: row.review_count ?? 0,
    trustScore: row.trust_score,
    attributes: row.attributes ?? {},
    imageUrl: imageFor(categorySlug, row.image_url),
    images: (row.images ?? []).length ? row.images ?? [] : [imageFor(categorySlug)],
    phone: row.phone,
    email: row.email,
  };
}

function localFallbackRows(params: {
  q?: string;
  category?: string;
  state?: string;
  city?: string;
  group?: string;
  limit: number;
  offset: number;
}): DirectoryListing[] {
  const q = normalize(params.q);
  const category = CATEGORY_ALIASES[params.category ?? ""] ?? normalize(params.category);
  const state = normalize(params.state);
  const city = normalize(params.city);
  const group = normalize(params.group);

  const rows = (fallbackDirectory as Array<Record<string, unknown>>)
    .filter((item) => {
      const itemCategory = normalize(String(item.category ?? ""));
      const haystack = [
        item.name, item.group_name, item.city, item.state, item.address, item.description,
        ...(Array.isArray(item.tags) ? item.tags : []),
      ].map((v) => normalize(String(v ?? ""))).join(" ");
      return (
        (!q || haystack.includes(q)) &&
        (!category || itemCategory === category) &&
        (!state || normalize(String(item.state ?? "")) === state) &&
        (!city || normalize(String(item.city ?? "")) === city) &&
        (!group || normalize(String(item.group_name ?? "")) === group)
      );
    })
    .slice(params.offset, params.offset + params.limit);

  return rows.map((item, index) => {
    const slug = String(item.slug ?? item.id ?? `directory-${index}`);
    const cat = String(item.category ?? "professional-services");
    return {
      id: Math.abs(hashCode(slug)) + 1,
      slug,
      name: String(item.name ?? "Directory listing"),
      categoryId: null,
      category: cat,
      categoryName: fallbackCategory(cat).name,
      categoryIcon: fallbackCategory(cat).icon,
      sector: fallbackCategory(cat).entity_type,
      organizationName: item.group_name ? String(item.group_name) : null,
      city: String(item.city ?? ""),
      state: String(item.state ?? ""),
      district: null,
      locality: null,
      address: item.address ? String(item.address) : null,
      description: item.description ? String(item.description) : null,
      website: item.website ? String(item.website) : null,
      sourceUrl: item.source_url ? String(item.source_url) : null,
      tags: Array.isArray(item.tags) ? item.tags.map(String) : [],
      verified: Boolean(item.verified),
      rating: typeof item.rating === "number" ? item.rating : null,
      reviewCount: typeof item.review_count === "number" ? item.review_count : 0,
      trustScore: typeof item.trust_score === "number" ? item.trust_score : null,
      attributes: {},
      imageUrl: imageFor(cat, typeof item.image_url === "string" ? item.image_url : null),
      images: [imageFor(cat)],
      phone: item.phone ? String(item.phone) : null,
      email: item.email ? String(item.email) : null,
    };
  });
}

function hashCode(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) hash = (hash * 31 + value.charCodeAt(i)) | 0;
  return hash;
}

async function resolveCategoryId(category?: string) {
  if (!category) return null;
  const slug = CATEGORY_ALIASES[category] ?? category;
  const { data, error } = await supabase
    .from("directory_categories")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (error) return null;
  return data?.id ?? null;
}

type FetchParams = {
  q?: string;
  categoryId?: number | null;
  category?: string;
  state?: string;
  district?: string;
  city?: string;
  group?: string;
  limit?: number;
  offset?: number;
};

async function queryDirectory(
  params: FetchParams,
  field?: "name" | "organization_name",
  pattern?: string,
) {
  let query = supabase
    .from("directory_entities")
    .select(`
      id, slug, name, category_id, organization_name, short_description,
      description, website, source_url, phone, email, image_url, images,
      address, locality, city, district, state, rating, review_count,
      trust_score, is_verified, attributes,
      category:directory_categories(name,slug,icon,entity_type)
    `)
    .eq("status", "published")
    .order("id", { ascending: false })
    .range(Math.max(params.offset ?? 0, 0), Math.max(params.offset ?? 0, 0) + Math.min(params.limit ?? 24, 100) - 1);

  if (params.categoryId != null) query = query.eq("category_id", params.categoryId);
  if (params.state?.trim()) query = query.eq("state", params.state.trim());
  if (params.district?.trim()) query = query.eq("district", params.district.trim());
  if (params.city?.trim()) query = query.eq("city", params.city.trim());
  if (params.group?.trim()) query = query.eq("organization_name", params.group.trim());
  if (field && pattern) query = query.ilike(field, pattern);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    const { data, error } = await query.abortSignal(controller.signal);
    if (error) return { data: [], error };
    return { data: ((data ?? []) as unknown as RawEntityRow[]).map(normalizeRow), error: null };
  } finally {
    clearTimeout(timer);
  }
}

async function fetchEntityRows(params: FetchParams): Promise<DirectoryListing[]> {
  const categoryId = params.categoryId ?? (await resolveCategoryId(params.category));
  const q = safeSearch(params.q ?? "");
  const base = { ...params, categoryId };

  // Browsing/filtering: one bounded indexed-category query.
  if (!q) {
    const result = await queryDirectory(base);
    if (!result.error && result.data.length) return result.data;
    const fallback = localFallbackRows({
      q: params.q, category: params.category, state: params.state,
      city: params.city, group: params.group,
      limit: Math.min(params.limit ?? 24, 100), offset: params.offset ?? 0,
    });
    return fallback;
  }

  // Search is intentionally done as two small queries rather than one
  // OR/ILIKE expression over the entire imported NHP table.
  const searchLimit = Math.min(100, Math.max(params.limit ?? 24, (params.offset ?? 0) + (params.limit ?? 24) + 1));
  const prefix = `${q}%`;
  const [namePrefix, orgPrefix] = await Promise.all([
    queryDirectory({ ...base, offset: 0, limit: searchLimit }, "name", prefix),
    queryDirectory({ ...base, offset: 0, limit: searchLimit }, "organization_name", prefix),
  ]);

  let rows = [...namePrefix.data, ...orgPrefix.data];
  const seen = new Set<number>();
  rows = rows.filter((row) => !seen.has(row.id) && seen.add(row.id));

  // If prefix search found nothing, use a bounded contains search on the
  // name only. This is much safer than the previous OR across many columns.
  if (!rows.length) {
    const contains = await queryDirectory({ ...base, offset: 0, limit: searchLimit }, "name", `%${q}%`);
    rows = contains.data;
  }

  if (!rows.length) {
    return localFallbackRows({
      q, category: params.category, state: params.state,
      city: params.city, group: params.group,
      limit: Math.min(params.limit ?? 24, 100), offset: params.offset ?? 0,
    });
  }

  const start = Math.max(params.offset ?? 0, 0);
  return rows.slice(start, start + Math.min(params.limit ?? 24, 100));
}

export async function getDirectoryCategories(): Promise<DirectoryCategory[]> {
  const { data, error } = await supabase
    .from("directory_categories")
    .select("id,name,slug,description,icon,entity_type")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (!error && data?.length) return data as DirectoryCategory[];

  return fallbackCategories
    .filter((category) => category.type === "directory")
    .map((category, index) => ({
      id: index + 1,
      name: category.name,
      slug: CATEGORY_ALIASES[category.slug] ?? category.slug,
      description: category.description ?? null,
      icon: category.icon ?? null,
      entity_type: category.entity_type ?? "services",
    }));
}

export async function filterDirectory(params: {
  category?: string;
  q?: string;
  state?: string;
  district?: string;
  city?: string;
  group?: string;
  limit?: number;
  offset?: number;
}): Promise<DirectoryListing[]> {
  return fetchEntityRows({ ...params, limit: Math.min(params.limit ?? 24, 100), offset: params.offset ?? 0 });
}

export async function getDirectoryListing(slug: string): Promise<DirectoryListing | null> {
  const decoded = decodeURIComponent(slug).trim();
  if (!decoded) return null;

  const { data, error } = await supabase
    .from("directory_entities")
    .select(`
      id, slug, name, category_id, organization_name, short_description,
      city, state, district, locality, address, description, website,
      source_url, is_verified, rating, review_count, trust_score,
      attributes, image_url, images, phone, email,
      category:directory_categories(name,slug,icon,entity_type)
    `)
    .eq("slug", decoded)
    .eq("status", "published")
    .maybeSingle();

  if (!error && data) return normalizeRow(data as unknown as RawEntityRow);

  // The local catalogue keeps the core site usable even if Supabase is
  // temporarily unavailable.
  const local = localFallbackRows({ q: "", limit: 1000, offset: 0 }).find((row) => row.slug === decoded);
  return local ?? null;
}

export async function getRelatedBranches(item: DirectoryListing): Promise<DirectoryListing[]> {
  if (!item.organizationName) return [item];

  const rows = await fetchEntityRows({
    category: item.category,
    state: item.state || undefined,
    group: item.organizationName,
    limit: 100,
    offset: 0,
  });

  const organization = normalize(item.organizationName);
  return rows.filter(
    (candidate) => normalize(candidate.organizationName) === organization || candidate.id === item.id,
  );
}

export async function getStates(): Promise<string[]> {
  return [...INDIA_STATES];
}

export async function getDistricts(state?: string): Promise<string[]> {
  if (!state?.trim()) return [];
  const { data, error } = await supabase
    .from("directory_entities")
    .select("district")
    .eq("status", "published")
    .eq("state", state.trim())
    .not("district", "is", null)
    .limit(5000);
  if (!error) {
    const values = [...new Set((data ?? []).map((row) => row.district).filter((v): v is string => typeof v === "string" && !!v.trim()))].sort();
    if (values.length) return values;
  }
  return [...new Set((fallbackDirectory as Array<Record<string, unknown>>)
    .filter((row) => String(row.state ?? "") === state.trim())
    .map((row) => row.district)
    .filter((v): v is string => typeof v === "string" && !!v.trim()))].sort();
}

export async function getCities(state?: string, district?: string): Promise<string[]> {
  if (!state?.trim()) return [];
  let query = supabase
    .from("directory_entities")
    .select("city")
    .eq("status", "published")
    .eq("state", state.trim())
    .not("city", "is", null)
    .limit(5000);
  if (district?.trim()) query = query.eq("district", district.trim());
  const { data, error } = await query;
  if (!error) {
    const values = [...new Set((data ?? []).map((row) => row.city).filter((v): v is string => typeof v === "string" && !!v.trim()))].sort();
    if (values.length) return values;
  }
  return [...new Set((fallbackDirectory as Array<Record<string, unknown>>)
    .filter((row) => String(row.state ?? "") === state.trim() && (!district?.trim() || String(row.district ?? "") === district.trim()))
    .map((row) => row.city)
    .filter((v): v is string => typeof v === "string" && !!v.trim()))].sort();
}

export async function getGroups(category?: string, state?: string, city?: string): Promise<string[]> {
  if (!category) return [];
  const categorySlug = CATEGORY_ALIASES[category] ?? category;
  const categoryId = await resolveCategoryId(categorySlug);

  if (categoryId != null) {
    let query = supabase
      .from("directory_entities")
      .select("organization_name")
      .eq("status", "published")
      .eq("category_id", categoryId)
      .not("organization_name", "is", null)
      .limit(1000);
    if (state?.trim()) query = query.eq("state", state.trim());
    if (city?.trim()) query = query.eq("city", city.trim());

    const { data, error } = await query;
    if (!error) {
      const values = [...new Set((data ?? []).map((row) => row.organization_name).filter((v): v is string => typeof v === "string" && !!v.trim()))].sort((a, b) => a.localeCompare(b));
      if (values.length) return values;
    }
  }

  return [...new Set((fallbackDirectory as Array<Record<string, unknown>>)
    .filter((row) =>
      String(row.category ?? "") === categorySlug &&
      (!state?.trim() || String(row.state ?? "") === state.trim()) &&
      (!city?.trim() || String(row.city ?? "") === city.trim())
    )
    .map((row) => row.group_name)
    .filter((v): v is string => typeof v === "string" && !!v.trim()))].sort((a, b) => a.localeCompare(b));
}

export async function getDirectoryLocations(
  entityId: number,
  filters?: { state?: string; district?: string; city?: string },
) {
  const { data, error } = await supabase.rpc("search_directory_locations", {
    target_entity_id: entityId,
    search_query: null,
    filter_state: filters?.state || null,
    filter_district: filters?.district || null,
    filter_city: filters?.city || null,
    result_limit: 200,
  });
  if (error) return [];
  return data ?? [];
}

export { INDIA_STATES };
