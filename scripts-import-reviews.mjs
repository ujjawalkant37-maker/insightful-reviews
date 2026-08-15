// Usage: node scripts-import-reviews.mjs ./reviews.json
// The JSON file must contain {"reviews":[...]} using the fields documented in docs/REVIEW-SOURCES.md.
import fs from "node:fs";

const file = process.argv[2];
const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const token = process.env.REVIEW_IMPORT_TOKEN;
if (!file || !token) throw new Error("Provide a JSON file and REVIEW_IMPORT_TOKEN in the environment.");
const body = fs.readFileSync(file, "utf8");
const response = await fetch(`${base}/api/reviews/import`, { method: "POST", headers: { "content-type": "application/json", "x-review-import-token": token }, body });
console.log(await response.text());
if (!response.ok) process.exit(1);
