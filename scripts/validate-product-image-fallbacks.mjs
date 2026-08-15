import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const products = JSON.parse(
  fs.readFileSync(path.join(root, "data", "catalogue.json"), "utf8"),
);
const imageDir = path.join(root, "public", "product-images");

let missing = 0;
for (const product of products) {
  const slug = String(product.slug ?? "").trim();
  if (!slug) continue;
  const file = path.join(imageDir, `${slug}.svg`);
  if (!fs.existsSync(file)) missing++;
}

console.log(
  `Product image fallback validation: ${products.length} products checked; ${missing} use generated/API fallback.`,
);
