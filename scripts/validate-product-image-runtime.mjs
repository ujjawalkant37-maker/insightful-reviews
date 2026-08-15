import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const products = JSON.parse(
  fs.readFileSync(path.join(root, "data", "products.json"), "utf8"),
);

const errors = [];
for (const product of products) {
  const slug = String(product.slug ?? "").trim();
  if (!slug) {
    errors.push("Product with missing slug");
    continue;
  }

  const images = Array.isArray(product.images) ? product.images : [];
  const local = images.find(
    (value) => typeof value === "string" && value.startsWith("/product-images"),
  );

  if (!local) continue;

  const relative = local.replace(/^\//, "");
  const absolute = path.resolve(root, "public", relative);
  if (!absolute.startsWith(path.resolve(root, "public") + path.sep)) {
    errors.push(`${slug}: image path escapes public directory`);
    continue;
  }

  if (!fs.existsSync(absolute)) {
    errors.push(`${slug}: missing local image file ${local}`);
  }
}

console.log(`Products checked: ${products.length}`);
console.log(`Errors: ${errors.length}`);
for (const error of errors) console.error(`ERROR: ${error}`);
if (errors.length) process.exit(1);
