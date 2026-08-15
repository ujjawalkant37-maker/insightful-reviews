import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const productsPath = path.join(root, "data", "products.json");
const sourcesPath = path.join(root, "data", "launch-data-sources.json");

const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));
const sources = JSON.parse(fs.readFileSync(sourcesPath, "utf8"));

const errors = [];
const warnings = [];

const ids = new Set();
const slugs = new Set();

for (const p of products) {
  if (!p.id) errors.push("Product missing id");
  if (!p.slug) errors.push(`Product ${p.name ?? "unknown"} missing slug`);
  if (p.id && ids.has(p.id)) errors.push(`Duplicate product id: ${p.id}`);
  if (p.slug && slugs.has(p.slug)) errors.push(`Duplicate product slug: ${p.slug}`);
  if (p.id) ids.add(p.id);
  if (p.slug) slugs.add(p.slug);

  const price = String(p.price ?? "");
  if (price && !price.includes("₹")) {
    warnings.push(`${p.name}: price is not expressed in ₹`);
  }

  const images = Array.isArray(p.images) ? p.images : [];
  if (!images.length || images.every((x) => x === "/placeholder.svg")) {
    warnings.push(`${p.name}: product-specific image still pending`);
  }
}

for (const source of sources) {
  if (!source.slug || !source.name || !source.status) {
    errors.push("Invalid directory source registry entry");
  }
}

const imported = sources.filter((x) => x.status === "imported");
const pending = sources.filter((x) => x.status !== "imported");

console.log("STEP 2D LAUNCH DATA AUDIT");
console.log("-------------------------");
console.log(`Products: ${products.length}`);
console.log(`Directory source categories registered: ${sources.length}`);
console.log(`Directory categories already imported: ${imported.length}`);
console.log(`Directory categories requiring source/import work: ${pending.length}`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);

for (const e of errors) console.error(`ERROR: ${e}`);
for (const w of warnings) console.warn(`WARN: ${w}`);

if (errors.length) process.exit(1);
