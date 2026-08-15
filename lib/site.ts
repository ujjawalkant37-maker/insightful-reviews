export const siteConfig = {
  name: "Insightful Reviews",
  description:
    "A trust-first AI decision platform for products, services, education, healthcare, travel and everyday choices.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000",
  locale: "en-IN",
  currency: "INR",
};

export function absoluteUrl(path = "") {
  return `${siteConfig.url}${path.startsWith("/") || !path ? path : `/${path}`}`;
}
