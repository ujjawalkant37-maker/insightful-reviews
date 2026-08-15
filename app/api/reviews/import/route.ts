import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const allowedSources = new Set(["google", "youtube", "trustpilot", "reddit", "flipkart", "amazon", "partner", "manual"]);

export async function POST(request: NextRequest) {
  const expected = process.env.REVIEW_IMPORT_TOKEN?.trim();
  const supplied = request.headers.get("x-review-import-token")?.trim();
  if (!expected || !supplied || supplied !== expected) {
    return NextResponse.json({ success: false, error: "Review import is not authorised." }, { status: 401 });
  }

  const admin = getSupabaseAdmin();
  if (!admin) return NextResponse.json({ success: false, error: "Server-side Supabase credentials are not configured." }, { status: 503 });

  const body = await request.json() as { reviews?: Array<Record<string, unknown>> };
  const rows = Array.isArray(body.reviews) ? body.reviews : [];
  if (!rows.length) return NextResponse.json({ success: false, error: "No reviews supplied." }, { status: 400 });

  const normalized = rows.slice(0, 500).map((review) => ({
    target_type: review.target_type === "product" ? "product" : "directory",
    target_id: String(review.target_id ?? ""),
    source: allowedSources.has(String(review.source)) ? String(review.source) : "partner",
    source_label: String(review.source_label ?? review.source ?? "Partner feed"),
    external_id: review.external_id ? String(review.external_id) : null,
    author_name: review.author_name ? String(review.author_name) : null,
    rating: typeof review.rating === "number" ? Math.max(1, Math.min(5, review.rating)) : null,
    title: review.title ? String(review.title) : null,
    review_text: String(review.review_text ?? "").slice(0, 10000),
    review_url: review.review_url ? String(review.review_url) : null,
    published_at: review.published_at ? String(review.published_at) : null,
    language: review.language ? String(review.language) : null,
    verified: Boolean(review.verified),
    status: "published",
  })).filter((review) => review.target_id && review.review_text);

  const { error } = await admin.from("external_reviews").upsert(normalized, { onConflict: "source,external_id" });
  if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, imported: normalized.length });
}
