import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug")?.trim();

  if (!slug) {
    return NextResponse.redirect(new URL("/placeholder.svg", request.url), 307);
  }

  const target = new URL(
    `/api/product-image/${encodeURIComponent(slug)}`,
    request.url,
  );

  return NextResponse.redirect(target, 307);
}
