import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const products = JSON.parse(
  fs.readFileSync(path.join(root, "data", "products.json"), "utf8"),
);
const sources = JSON.parse(
  fs.readFileSync(path.join(root, "data", "product-image-sources.json"), "utf8"),
);
const sourceIds = new Set(sources.map((item) => item.productId));
const realDir = path.join(root, "public", "product-images-real");

const bundledReal = products.filter((product) =>
  [".webp", ".jpg", ".jpeg"].some((ext) =>
    fs.existsSync(path.join(realDir, `${product.slug}${ext}`)),
  ),
).length;

const verifiedRemote = products.filter((product) => sourceIds.has(product.id)).length;
const uncovered = products.filter((product) => !sourceIds.has(product.id)).map((p) => p.slug);

if (uncovered.length) {
  console.error("Products without a verified image source:");
  for (const slug of uncovered) console.error(` - ${slug}`);
  process.exit(1);
}

console.log(`Bundled real product photos: ${bundledReal}/${products.length}`);
console.log(`Verified remote image sources: ${verifiedRemote}/${products.length}`);
console.log(`Verified image-source coverage: ${verifiedRemote}/${products.length} OK.`);
