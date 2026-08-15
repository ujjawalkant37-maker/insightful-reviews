import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const products = JSON.parse(
  fs.readFileSync(path.join(root, "data", "products.json"), "utf8"),
);
let errors = 0;

for (const product of products) {
  const image = product.images?.[0];
  if (typeof image !== "string" || (!image.startsWith("/product-images/") && !image.startsWith("/product-images-real/"))) {
    console.error(`Invalid image path: ${product.slug}`);
    errors++;
    continue;
  }

  const file = path.resolve(root, "public", image.replace(/^\//, ""));
  const publicRoot = path.resolve(root, "public");
  if (!file.startsWith(publicRoot + path.sep)) {
    console.error(`Unsafe image path: ${product.slug}`);
    errors++;
    continue;
  }

  if (!fs.existsSync(file)) {
    console.error(`Missing image: ${product.slug} -> ${image}`);
    errors++;
    continue;
  }

  if (file.endsWith(".svg")) {
    const text = fs.readFileSync(file, "utf8");
    if (/Catalogue image pending verified product photography/i.test(text)) {
      console.error(`Placeholder image remains: ${product.slug}`);
      errors++;
    }
  }
}

console.log(`Checked: ${products.length}`);
console.log(`Errors: ${errors}`);
if (errors) process.exit(1);
console.log("All catalogue images are present and valid local assets.");
