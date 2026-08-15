import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/getProducts";
import productImageSources from "@/data/product-image-sources.json";
import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_REMOTE_BYTES = 8 * 1024 * 1024;
const MAX_HTML_BYTES = 1 * 1024 * 1024;
const FETCH_TIMEOUT_MS = 8000;
const MAX_REDIRECTS = 3;

type SourceEntry = {
  productId?: string;
  source?: {
    sourceUrl?: string;
    sourceStatus?: string;
  } | null;
};

const ALLOWED_REMOTE_HOSTS = new Set([
  "oneplus.in", "oneplus.com", "opstatics.com",
  "samsung.com", "samsungmobilepress.com", "images.samsung.com",
  "apple.com", "support.apple.com", "realme.com",
  "vivo.com", "vivofs.com", "oppo.com", "nothing.tech",
  "asus.com", "rog.asus.com", "motorola.in", "motorola.com",
  "mi.com", "xiaomi.com", "mi-store.at", "appmifile.com",
  "infinixmobility.com", "hmd.com", "nokia.com",
  "dell.com", "dellonline.co.za", "lenovo.com", "mwave.com.au",
  "hp.com", "acer.com", "acer.com", "asus.com",
  "sony.co.in", "sony.com", "lg.com", "tcl.com", "voltas.com",
  "boat-lifestyle.com", "gonoise.com", "jbl.com", "sennheiser-hearing.com",
  "boseindia.com", "bose.com", "ifbappliances.com", "bosch-home.in",
  "haier.com", "preethi.in", "shop.preethi.in", "whirlpoolindia.com",
  "bluestarindia.com", "amazfit.com", "canon.com", "canon.co.in",
  "nikon.co.in", "nikon.com", "fujifilm-x.com", "gopro.com", "dji.com",
  "pricerunner.com", "luluhypermarket.com", "axiang.cc", "movilpro.com.pe",
  "smartprix.com", "cdn1.smartprix.com", "poorvika.com",
]);

function cleanSlug(value: string): string {
  try {
    value = decodeURIComponent(value);
  } catch {
    // Keep original value.
  }

  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 160);
}

function isAllowedRemoteUrl(value: string): boolean {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return false;

    const host = url.hostname.toLowerCase();
    return [...ALLOWED_REMOTE_HOSTS].some(
      (allowed) => host === allowed || host.endsWith(`.${allowed}`),
    );
  } catch {
    return false;
  }
}

function localProductImagePath(slug: string): string | null {
  const safe = cleanSlug(slug);
  if (!safe) return null;

  const root = path.resolve(process.cwd(), "public");
  const candidate = path.resolve(root, "product-images-real", `${safe}.webp`);

  if (candidate.startsWith(`${root}${path.sep}`)) return candidate;
  return null;
}

function localLegacyImagePaths(slug: string): string[] {
  const safe = cleanSlug(slug);
  if (!safe) return [];

  const root = path.resolve(process.cwd(), "public");
  return [
    path.resolve(root, "product-images-real", `${safe}.jpg`),
    path.resolve(root, "product-images-real", `${safe}.jpeg`),
    path.resolve(root, "product-images-real", `${safe}.webp`),
  ].filter((candidate) => candidate.startsWith(`${root}${path.sep}`));
}

async function responseFromLocal(slug: string): Promise<NextResponse | null> {
  const primary = localProductImagePath(slug);
  const candidates = [primary, ...localLegacyImagePaths(slug)].filter(
    (value): value is string => Boolean(value),
  );

  for (const filePath of [...new Set(candidates)]) {
    try {
      const file = await fs.readFile(filePath);
      const extension = path.extname(filePath).toLowerCase();
      const contentType =
        extension === ".webp"
          ? "image/webp"
          : extension === ".jpg" || extension === ".jpeg"
            ? "image/jpeg"
            : "image/svg+xml";

      return new NextResponse(file, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
          "X-Image-Source": "bundled-product-asset",
        },
      });
    } catch {
      // Try the next local asset.
    }
  }

  return null;
}

async function fetchSafe(url: string, accept: string): Promise<Response | null> {
  if (!isAllowedRemoteUrl(url)) return null;

  let current = url;

  for (let redirect = 0; redirect <= MAX_REDIRECTS; redirect += 1) {
    try {
      const response = await fetch(current, {
        cache: "no-store",
        redirect: "manual",
        headers: {
          Accept: accept,
          "User-Agent": "Mozilla/5.0 (compatible; InsightfulReviews/1.0)",
        },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });

      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get("location");
        if (!location || redirect === MAX_REDIRECTS) return null;

        const next = new URL(location, current).toString();
        if (!isAllowedRemoteUrl(next)) return null;
        current = next;
        continue;
      }

      return response.ok ? response : null;
    } catch {
      return null;
    }
  }

  return null;
}

async function readLimited(response: Response, maxBytes: number): Promise<Uint8Array | null> {
  const declared = Number(response.headers.get("content-length") ?? 0);
  if (declared > maxBytes) return null;

  if (!response.body) return null;

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;

      total += value.byteLength;
      if (total > maxBytes) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  } catch {
    return null;
  }

  const result = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return result;
}

function extractImageUrl(html: string, baseUrl: string): string | null {
  const patterns = [
    /<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::secure_url)?["']/i,
    /<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image(?::src)?["']/i,
    /<link[^>]+rel=["'][^"']*image_src[^"']*["'][^>]+href=["']([^"']+)["']/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (!match?.[1]) continue;

    try {
      const resolved = new URL(match[1], baseUrl).toString();
      if (isAllowedRemoteUrl(resolved)) return resolved;
    } catch {
      // Continue.
    }
  }

  const imgPattern = /<img[^>]+(?:src|data-src|data-lazy-src)=["']([^"']+)["'][^>]*>/gi;
  let match: RegExpExecArray | null;

  while ((match = imgPattern.exec(html))) {
    try {
      const resolved = new URL(match[1], baseUrl).toString();
      if (!isAllowedRemoteUrl(resolved)) continue;
      if (/\.(?:png|jpe?g|webp|avif)(?:[?#]|$)/i.test(resolved)) {
        return resolved;
      }
    } catch {
      // Continue.
    }
  }

  return null;
}

async function fetchRemoteImage(url: string): Promise<{ body: Uint8Array; contentType: string } | null> {
  const response = await fetchSafe(
    url,
    "image/avif,image/webp,image/jpeg,image/png,*/*;q=0.8",
  );
  if (!response) return null;

  const contentType = (response.headers.get("content-type") ?? "").toLowerCase();
  if (!contentType.startsWith("image/") || contentType.includes("svg")) return null;

  const body = await readLimited(response, MAX_REMOTE_BYTES);
  if (!body) return null;

  return { body, contentType: contentType.split(";")[0] || "image/jpeg" };
}

async function imageFromSourcePage(sourceUrl: string): Promise<{ body: Uint8Array; contentType: string } | null> {
  const page = await fetchSafe(
    sourceUrl,
    "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  );
  if (!page) return null;

  const contentType = (page.headers.get("content-type") ?? "").toLowerCase();
  if (!contentType.includes("text/html") && !contentType.includes("application/xhtml+xml")) {
    return null;
  }

  const bytes = await readLimited(page, MAX_HTML_BYTES);
  if (!bytes) return null;

  const html = new TextDecoder().decode(bytes);
  const imageUrl = extractImageUrl(html, sourceUrl);
  if (!imageUrl) return null;

  return fetchRemoteImage(imageUrl);
}

async function fetchProductRemoteImage(slug: string): Promise<{ body: Uint8Array; contentType: string } | null> {
  const product = await getProductBySlug(slug);
  if (!product) return null;

  const candidates: string[] = [];

  if (typeof product.image_url === "string" && isAllowedRemoteUrl(product.image_url.trim())) {
    candidates.push(product.image_url.trim());
  }

  for (const image of product.images ?? []) {
    if (typeof image === "string" && isAllowedRemoteUrl(image.trim())) {
      candidates.push(image.trim());
    }
  }

  if (typeof product.image_source === "string" && isAllowedRemoteUrl(product.image_source.trim())) {
    candidates.push(product.image_source.trim());
  }

  const sourceEntry = (productImageSources as SourceEntry[]).find(
    (entry) => entry.productId === slug && entry.source?.sourceStatus === "verified",
  );

  if (sourceEntry?.source?.sourceUrl && isAllowedRemoteUrl(sourceEntry.source.sourceUrl)) {
    candidates.push(sourceEntry.source.sourceUrl);
  }

  for (const candidate of [...new Set(candidates)]) {
    const direct = await fetchRemoteImage(candidate);
    if (direct) return direct;

    const fromPage = await imageFromSourcePage(candidate);
    if (fromPage) return fromPage;
  }

  return null;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const rawSlug = (await context.params).slug;
  const slug = cleanSlug(rawSlug);

  if (!slug) {
    return new NextResponse(null, { status: 404, headers: { "Cache-Control": "no-store" } });
  }

  const local = await responseFromLocal(slug);
  if (local) return local;

  try {
    const remote = await fetchProductRemoteImage(slug);
    if (remote) {
      return new NextResponse(remote.body as BodyInit, {
        status: 200,
        headers: {
          "Content-Type": remote.contentType,
          "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
          "X-Image-Source": "verified-remote",
        },
      });
    }
  } catch (error) {
    console.error("Remote product image lookup failed:", slug, error);
  }

  return new NextResponse(null, {
    status: 404,
    headers: {
      "Cache-Control": "no-store",
      "X-Image-Source": "not-found-no-synthetic-fallback",
    },
  });
}
