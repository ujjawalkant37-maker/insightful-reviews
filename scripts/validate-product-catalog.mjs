import fs from "node:fs";
import path from "node:path";

const file = path.resolve("data/products.json");
const products = JSON.parse(fs.readFileSync(file, "utf8"));

const errors = [];
const warnings = [];
const ids = new Set();
const slugs = new Set();

const allowedCategories = new Set([
  "smartphones",
  "laptops",
  "tvs",
  "audio",
  "appliances",
  "wearables",
  "cameras",
]);

for (const [i, p] of products.entries()) {
  const where = `products[${i}]`;

  if (!p.id) errors.push(`${where}: missing id`);
  if (!p.slug) errors.push(`${where}: missing slug`);
  if (!p.name) errors.push(`${where}: missing name`);

  if (!allowedCategories.has(p.categoryId)) {
    errors.push(`${where}: unsupported categoryId "${p.categoryId}"`);
  }

  if (p.id && ids.has(p.id)) errors.push(`${where}: duplicate id "${p.id}"`);
  if (p.slug && slugs.has(p.slug)) errors.push(`${where}: duplicate slug "${p.slug}"`);

  ids.add(p.id);
  slugs.add(p.slug);

  if (typeof p.price !== "string" || !p.price.includes("₹")) {
    warnings.push(`${where} (${p.name}): price is not expressed in ₹`);
  }

  if (!Number.isFinite(Number(p.rating)) || Number(p.rating) < 0 || Number(p.rating) > 5) {
    errors.push(`${where} (${p.name}): rating must be 0–5`);
  }

  if (!Number.isFinite(Number(p.aiScore)) || Number(p.aiScore) < 0 || Number(p.aiScore) > 100) {
    errors.push(`${where} (${p.name}): aiScore must be 0–100`);
  }

  if (!p.specs || typeof p.specs !== "object" || Array.isArray(p.specs)) {
    errors.push(`${where} (${p.name}): specs must be an object`);
  }

  const images = Array.isArray(p.images) ? p.images : [];

  if (images.length !== 1) {
    errors.push(`${where} (${p.name}): exactly one catalogue image is required`);
  } else {
    const imagePath = String(images[0] ?? "");
    const isLocalProductAsset =
      imagePath.startsWith("/product-images/") ||
      imagePath.startsWith("/product-images-real/");

    if (!isLocalProductAsset) {
      errors.push(`${where} (${p.name}): image must use a local product image path`);
    }

    const localImage = path.resolve("public", imagePath.replace(/^\//, ""));
    const publicRoot = path.resolve("public");
    if (imagePath && !localImage.startsWith(publicRoot + path.sep)) {
      errors.push(`${where} (${p.name}): image path escapes public directory`);
    } else if (imagePath && !fs.existsSync(localImage)) {
      errors.push(`${where} (${p.name}): image file does not exist: ${imagePath}`);
    }
  }
}

console.log("STEP 2E PRODUCT CATALOG");
console.log("-----------------------");
console.log(`Products checked: ${products.length}`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);

for (const item of errors) console.error(`ERROR: ${item}`);
for (const item of warnings) console.warn(`WARN: ${item}`);

if (errors.length) process.exit(1);
