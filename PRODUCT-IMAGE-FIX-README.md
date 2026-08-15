# Product Image Runtime Fix

- Product source pages are no longer sent directly to `<img>`.
- `/api/product-image/[slug]` is the primary image source.
- The API can inspect both the verified image-source manifest and the product `image_source` page for `og:image`.
- Every product retains its local `/public/product-images/<slug>.svg` as a deterministic fallback.
- `SafeImage` now treats local catalogue SVGs as valid images.

Verify with:

```bash
npm ci
npm run lint
npm run build
node scripts/validate-product-image-runtime.mjs
```

Then run `npm run dev` and test `/products?category=smartphones`.
