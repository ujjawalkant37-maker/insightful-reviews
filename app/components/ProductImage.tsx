"use client";

import SafeImage from "@/components/SafeImage";

export type ProductImageProps = {
  src?: string | null;
  alt: string;
  slug?: string | null;
  imageSource?: string | null;
  className?: string;
  sizes?: string;
  priority?: boolean;
  unoptimized?: boolean;
};

function clean(value?: string | null): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function apiSource(slug?: string | null): string | null {
  const cleaned = clean(slug);
  if (!cleaned) return null;
  return `/api/product-image/${encodeURIComponent(cleaned)}`;
}

export default function ProductImage({
  src,
  alt,
  slug,
  imageSource,
  className = "",
  sizes = "100vw",
  priority = false,
  unoptimized = false,
}: ProductImageProps) {
  const cleanedSrc = clean(src);
  const cleanedSource = clean(imageSource);
  const apiImage = apiSource(slug);

  // Bundled product photos are preferred because they are fast, deterministic
  // and do not expose the browser to third-party image hosts. The API remains
  // the authoritative fallback for products whose image is remote.
  const primary =
    cleanedSrc?.startsWith("/product-images-real/")
      ? cleanedSrc
      : apiImage || cleanedSrc || cleanedSource || "/placeholder.svg";

  const fallback = primary === "/placeholder.svg" ? null : apiImage && primary !== apiImage ? apiImage : null;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width: "100%", height: "100%", minHeight: 1 }}
    >
      <SafeImage
        src={primary}
        fallbackSrc={fallback}
        alt={alt}
        fill
        priority={priority}
        unoptimized={unoptimized || Boolean(apiImage)}
        sizes={sizes}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
