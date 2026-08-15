import fs from "node:fs";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};

  const env = {};

  for (const rawLine of fs.readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) continue;

    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);

    if (!match) continue;

    let value = match[2].trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    env[match[1]] = value;
  }

  return env;
}

const root = process.cwd();

const env = {
  ...loadEnvFile(path.join(root, ".env")),
  ...loadEnvFile(path.join(root, ".env.local")),
  ...process.env,
};

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY =
  env.SUPABASE_SERVICE_ROLE_KEY ||
  env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY."
  );
  process.exit(1);
}

const productsPath = path.join(root, "data", "products.json");

if (!fs.existsSync(productsPath)) {
  console.error(`Missing catalogue: ${productsPath}`);
  process.exit(1);
}

const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));

if (!Array.isArray(products)) {
  console.error("data/products.json must contain an array.");
  process.exit(1);
}

const supabase = createClient(
  SUPABASE_URL,
  SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

function isPlaceholderImage(value) {
  if (typeof value !== "string") return true;

  const normalized = value.toLowerCase();

  return (
    normalized.includes("/product-images/") &&
    normalized.endsWith(".svg")
  );
}

function cleanImages(value) {
  if (!Array.isArray(value)) return [];

  return value
    .filter((value) => typeof value === "string")
    .map((value) => value.trim())
    .filter(Boolean)
    .filter((value) => !isPlaceholderImage(value));
}

console.log("");
console.log("================================");
console.log("STEP 3 PRODUCT IMAGE PIPELINE");
console.log("================================");
console.log("");

let updated = 0;
let placeholderOnly = 0;
let missing = 0;
let errors = 0;

for (let index = 0; index < products.length; index++) {
  const product = products[index];

  console.log(
    `[${index + 1}/${products.length}] ${product.slug}`
  );

  try {
    if (!product?.slug) {
      throw new Error("Product has no slug.");
    }

    const realImages = cleanImages(product.images);

    const { data: existing, error: lookupError } =
      await supabase
        .from("products")
        .select("id, slug, image_url, images")
        .eq("slug", product.slug)
        .maybeSingle();

    if (lookupError) {
      throw new Error(
        `Database lookup failed: ${lookupError.message}`
      );
    }

    if (!existing) {
      missing++;
      console.log("  NOT FOUND");
      continue;
    }

    /*
     * Never overwrite a legitimate existing image with
     * a catalogue placeholder.
     */
    if (realImages.length === 0) {
      placeholderOnly++;

      console.log(
        "  KEPT existing database image / placeholder unchanged"
      );

      continue;
    }

    const primaryImage = realImages[0];

    const { error: updateError } = await supabase
      .from("products")
      .update({
        image_url: primaryImage,
        images: realImages,
      })
      .eq("id", existing.id);

    if (updateError) {
      throw new Error(
        `Database update failed: ${updateError.message}`
      );
    }

    updated++;

    console.log(
      `  UPDATED with ${realImages.length} verified image(s)`
    );
  } catch (error) {
    errors++;

    console.error(
      `  ERROR: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

console.log("");
console.log("================================");
console.log("STEP 3 IMAGE PIPELINE SUMMARY");
console.log("================================");
console.log(`Catalogue products: ${products.length}`);
console.log(`Database products updated: ${updated}`);
console.log(`Placeholder-only products: ${placeholderOnly}`);
console.log(`Database products missing: ${missing}`);
console.log(`Errors: ${errors}`);
console.log("================================");
console.log("");

if (errors > 0 || missing > 0) {
  process.exit(1);
}

console.log("STEP 3 IMAGE PIPELINE COMPLETE.");