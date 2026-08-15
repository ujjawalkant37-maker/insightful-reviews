import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const name = request.nextUrl.searchParams.get("name");
  if (process.env.ENABLE_LIVE_PLACE_ENRICHMENT !== "true" || !apiKey || !name) {
    return new Response("Not configured", { status: 404 });
  }
  try {
    const upstream = await fetch(`https://places.googleapis.com/v1/${name}/media?maxWidthPx=1200&key=${encodeURIComponent(apiKey)}`, {
      headers: { Accept: "image/*" },
      next: { revalidate: 86400 },
    });
    if (!upstream.ok || !upstream.body) return new Response("Image unavailable", { status: 404 });
    return new Response(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": upstream.headers.get("content-type") ?? "image/jpeg",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return new Response("Image unavailable", { status: 502 });
  }
}
