import type { Product } from "@/types/models";

export type AffiliateOption = { name: string; url: string };

function searchUrl(base: string, query: string, params?: Record<string, string | undefined>) {
  const url = `${base}${encodeURIComponent(query)}`;
  const clean = Object.entries(params ?? {}).filter(([, value]) => value).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`);
  return clean.length ? `${url}${url.includes("?") ? "&" : "?"}${clean.join("&")}` : url;
}

export function getAffiliateOptions(product: Product): AffiliateOption[] {
  const query = product.name.trim();
  const options: AffiliateOption[] = [];

  if (product.buyUrl) options.push({ name: "Retailer link", url: product.buyUrl });

  const amazonTag = process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG?.trim();
  if (amazonTag) options.push({ name: "Amazon", url: searchUrl("https://www.amazon.in/s?k=", query, { tag: amazonTag }) });

  // These options are enabled only when the corresponding partner ID is configured.
  // The partner's approved tracking/search URL can be supplied through product.buyUrl
  // when a platform-specific affiliate format is required.
  if (process.env.NEXT_PUBLIC_FLIPKART_AFFILIATE_ID && product.buyUrl) {
    options.push({ name: "Flipkart", url: product.buyUrl });
  }
  if (process.env.NEXT_PUBLIC_CROMA_AFFILIATE_ID && product.buyUrl) {
    options.push({ name: "Croma", url: product.buyUrl });
  }
  if (process.env.NEXT_PUBLIC_RELIANCE_AFFILIATE_ID && product.buyUrl) {
    options.push({ name: "Reliance Digital", url: product.buyUrl });
  }

  return options.filter((option, index, all) => all.findIndex((item) => item.name === option.name && item.url === option.url) === index);
}
