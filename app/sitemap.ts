import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getProducts } from "@/lib/getProducts";
import { filterDirectory } from "@/lib/directory";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPaths = ["/", "/products", "/compare", "/directory", "/guides", "/about", "/contact", "/privacy", "/terms", "/affiliate-disclosure"];

  const products = await getProducts();
  const directoryPages = await Promise.all([0, 100, 200, 300].map((offset) => filterDirectory({ limit: 100, offset })));
  const directoryListings = directoryPages.flat();

  const productEntries = products.map((product) => ({ url: absoluteUrl(`/products/${product.slug}`), lastModified: now }));
  const directoryEntries = [...new Map(directoryListings.map((item) => [item.slug, item])).values()].map((item) => ({
    url: absoluteUrl(`/directory/${item.slug}`),
    lastModified: now,
  }));

  return [
    ...staticPaths.map((path) => ({ url: absoluteUrl(path), lastModified: now })),
    ...productEntries,
    ...directoryEntries,
  ];
}
