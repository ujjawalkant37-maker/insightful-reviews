"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";

const FALLBACK_IMAGE = "/placeholder.svg";

export type SafeImageProps = {
  src?: string | null;
  fallbackSrc?: string | null;
  alt?: string;
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  style?: React.CSSProperties;
};

function cleanSource(src?: string | null): string | null {
  if (typeof src !== "string") return null;

  const value = src.trim();
  if (!value) return null;

  const legacyMatch = value.match(
    /^\/api\/product-image\?slug=([^&]+)$/i,
  );

  if (legacyMatch) {
    let slug = legacyMatch[1];

    try {
      slug = decodeURIComponent(slug);
    } catch {
      // Keep original value.
    }

    return `/api/product-image/${encodeURIComponent(slug)}`;
  }

  return value;
}

function requiresUnoptimized(src: string): boolean {
  return (
    src === FALLBACK_IMAGE ||
    src.startsWith("/api/product-image/") ||
    /\.svg(?:[?#]|$)/i.test(src)
  );
}

export default function SafeImage({
  src,
  fallbackSrc,
  alt = "",
  fill = false,
  priority = false,
  unoptimized = false,
  width,
  height,
  sizes,
  className = "",
  style,
}: SafeImageProps) {
  const requested = cleanSource(src);
  const alternate = cleanSource(fallbackSrc);

  const sources = useMemo(
    () =>
      Array.from(
        new Set(
          [requested, alternate, FALLBACK_IMAGE].filter(
            (value): value is string => Boolean(value),
          ),
        ),
      ),
    [requested, alternate],
  );

  const [sourceIndex, setSourceIndex] = useState(0);
  const currentSrc = sources[sourceIndex] ?? FALLBACK_IMAGE;

  const imageUnoptimized =
    unoptimized || requiresUnoptimized(currentSrc);

  function handleError() {
    setSourceIndex((current) =>
      current < sources.length - 1 ? current + 1 : current,
    );
  }

  if (fill) {
    return (
      <Image
        src={currentSrc}
        alt={alt}
        fill
        priority={priority}
        unoptimized={imageUnoptimized}
        sizes={sizes}
        className={className}
        onError={handleError}
        style={{
          objectFit: "contain",
          ...style,
        }}
      />
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={width ?? 800}
      height={height ?? 600}
      priority={priority}
      unoptimized={imageUnoptimized}
      sizes={sizes}
      className={className}
      onError={handleError}
      style={{
        display: "block",
        width: "100%",
        height: "auto",
        objectFit: "contain",
        ...style,
      }}
    />
  );
}
