import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const products = JSON.parse(
  fs.readFileSync(path.join(root, "data", "products.json"), "utf8"),
);
const sources = JSON.parse(
  fs.readFileSync(path.join(root, "data", "product-image-sources.json"), "utf8"),
);

const sourceByProduct = new Map(sources.map((item) => [item.productId, item]));
const errors = [];
const seenIds = new Set();
const seenSlugs = new Set();

for (const [index, product] of products.entries()) {
  const where = `products[${index}]`;
  if (!product.id) errors.push(`${where}: missing id`);
  if (!product.slug) errors.push(`${where}: missing slug`);
  if (!product.name) errors.push(`${where}: missing name`);
  if (seenIds.has(product.id)) errors.push(`${where}: duplicate id ${product.id}`);
  if (seenSlugs.has(product.slug)) errors.push(`${where}: duplicate slug ${product.slug}`);
  seenIds.add(product.id);
  seenSlugs.add(product.slug);

  const source = sourceByProduct.get(product.id);
  if (!source?.source?.sourceUrl) {
    errors.push(`${where}: missing verified image source URL`);
  } else {
    try {
      const url = new URL(source.source.sourceUrl);
      if (url.protocol !== "https:") errors.push(`${where}: image source must use HTTPS`);
    } catch {
      errors.push(`${where}: invalid image source URL`);
    }
  }

  const images = Array.isArray(product.images) ? product.images : [];
  if (images.length !== 1) {
    errors.push(`${where}: expected exactly one catalogue image reference`);
    continue;
  }

  const image = images[0];
  if (/\.svg(?:$|[?#])/i.test(image)) {
    // SVG catalogue illustrations are legacy data only. They must never be served by the product image API.
    continue;
  }

  if (!/^\/product-images-real\/[^/]+\.(?:webp|jpe?g)$/i.test(image)) {
    errors.push(`${where}: non-real local image reference is not permitted`);
  } else {
    const file = path.join(root, "public", image.replace(/^\//, ""));
    if (!fs.existsSync(file)) errors.push(`${where}: bundled real image missing: ${file}`);
  }
}

console.log("STEP 2E IMAGE INTEGRITY");
console.log("-----------------------");
console.log(`Products checked: ${products.length}`);
console.log(`Verified source entries: ${sources.length}`);
console.log(`Errors: ${errors.length}`);

for (const error of errors) console.error(`ERROR: ${error}`);
if (errors.length) process.exit(1);
