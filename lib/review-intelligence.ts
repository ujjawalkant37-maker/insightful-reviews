import { supabase } from "@/lib/supabase";

export type ReviewTargetType = "product" | "directory";

export type ExternalReview = {
  id: number;
  target_type: ReviewTargetType;
  target_id: string;
  source: string;
  source_label: string;
  external_id: string | null;
  author_name: string | null;
  rating: number | null;
  title: string | null;
  review_text: string;
  review_url: string | null;
  published_at: string | null;
  language: string | null;
  verified: boolean;
  fetched_at: string;
};

export type ReviewIntelligence = {
  total: number;
  average: number;
  positive: number;
  neutral: number;
  negative: number;
  sources: Array<{ source: string; label: string; count: number; average: number }>;
  themes: Array<{ label: string; count: number; sentiment: "positive" | "negative" | "mixed" }>;
};

const POSITIVE = ["good", "great", "excellent", "helpful", "clean", "friendly", "fast", "value", "recommend", "love", "best", "smooth", "professional", "supportive", "quality"];
const NEGATIVE = ["bad", "poor", "worst", "slow", "rude", "dirty", "expensive", "delay", "delayed", "fraud", "scam", "avoid", "terrible", "issue", "problem", "crowded", "wait"];
const THEMES: Array<[string, string[]]> = [
  ["Service", ["service", "staff", "support", "doctor", "teacher", "faculty", "agent"]],
  ["Value for money", ["price", "value", "cost", "expensive", "cheap", "fees"]],
  ["Quality", ["quality", "professional", "performance", "food", "course", "treatment"]],
  ["Cleanliness", ["clean", "hygiene", "dirty", "cleanliness"]],
  ["Waiting time", ["wait", "waiting", "delay", "queue", "slow"]],
  ["Location", ["location", "parking", "traffic", "near", "distance"]],
  ["Facilities", ["facility", "facilities", "amenities", "room", "equipment", "infrastructure"]],
];

function sentiment(text: string) {
  const value = text.toLowerCase();
  const positive = POSITIVE.filter((word) => value.includes(word)).length;
  const negative = NEGATIVE.filter((word) => value.includes(word)).length;
  if (positive > negative + 1) return "positive" as const;
  if (negative > positive + 1) return "negative" as const;
  return "neutral" as const;
}

export function summarizeExternalReviews(reviews: ExternalReview[]): ReviewIntelligence {
  const rated = reviews.filter((review) => typeof review.rating === "number");
  const average = rated.length ? rated.reduce((sum, review) => sum + Number(review.rating), 0) / rated.length : 0;
  const counts = { positive: 0, neutral: 0, negative: 0 };
  for (const review of reviews) counts[sentiment(`${review.title ?? ""} ${review.review_text}`)]++;

  const sources = new Map<string, { label: string; count: number; total: number }>();
  for (const review of reviews) {
    const current = sources.get(review.source) ?? { label: review.source_label, count: 0, total: 0 };
    current.count++;
    current.total += review.rating ?? 0;
    sources.set(review.source, current);
  }

  const themes = THEMES.map(([label, words]) => {
    const matched = reviews.filter((review) => words.some((word) => review.review_text.toLowerCase().includes(word)));
    const pos = matched.filter((review) => sentiment(review.review_text) === "positive").length;
    const neg = matched.filter((review) => sentiment(review.review_text) === "negative").length;
    return { label, count: matched.length, sentiment: pos > neg + 1 ? "positive" : neg > pos + 1 ? "negative" : "mixed" } as const;
  }).filter((theme) => theme.count > 0).sort((a, b) => b.count - a.count);

  return {
    total: reviews.length,
    average,
    positive: counts.positive,
    neutral: counts.neutral,
    negative: counts.negative,
    sources: [...sources.entries()].map(([source, value]) => ({ source, label: value.label, count: value.count, average: value.count ? value.total / value.count : 0 })).sort((a, b) => b.count - a.count),
    themes,
  };
}

export async function getExternalReviews(targetType: ReviewTargetType, targetId: string, limit = 120): Promise<ExternalReview[]> {
  const { data, error } = await supabase
    .from("external_reviews")
    .select("id,target_type,target_id,source,source_label,external_id,author_name,rating,title,review_text,review_url,published_at,language,verified,fetched_at")
    .eq("target_type", targetType)
    .eq("target_id", targetId)
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(limit);

  if (error || !data) return [];
  return data as ExternalReview[];
}
