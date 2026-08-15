# Insightful Reviews — Final Replacement Fix

This replacement fixes the two launch-blocking issues found after the previous ZIP:

1. `npm ci` lockfile/package.json mismatch — `eslint-config-next` is aligned with the existing lockfile while Next.js remains on the resolved 16.3.1 lock entry.
2. Step 2E image validation rejected the seven bundled local product photographs under `/product-images-real/` — the validator now accepts those local raster assets as well as the catalogue SVG assets.

Image runtime fix:
- ProductImage automatically uses `unoptimized` for the API image endpoint, preventing Next.js SVG optimizer warnings when the endpoint returns the deterministic SVG fallback.
- Bundled real local photos remain preferred when present.
- The API retains local assets and deterministic fallback behaviour.

Verified in this package:
- `npm ci --dry-run --ignore-scripts --no-audit --no-fund` succeeds.
- Product catalog validation: 66/66, 0 errors.
- Image validation: 66/66, 0 errors.
- Local image validation: 66/66, OK.

After replacing the project, run:

    npm ci
    npm run check:launch
    npm run dev

Then open:

    http://localhost:3000/products?category=smartphones
