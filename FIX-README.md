# Insightful Reviews — Product Catalogue Fix

This package fixes the mixed product-data-source problem found in the uploaded project.

## Root cause

The project had two catalogues:
- `data/products.json` — 66 local products
- Supabase `products` table — only 8 products

The catalogue/detail pages were using Supabase, while homepage/wishlist code still used the local JSON. Therefore many visible products had no corresponding Supabase row and their `/products/[slug]` pages returned `Product not found`.

## What is changed

Replacements:
- `lib/getProducts.ts` — Supabase is the single source of truth and slug lookup is robust.
- `lib/db.ts` — legacy compatibility layer no longer reads local JSON.
- `app/components/HomeCatalog.tsx` — loads products from Supabase.
- `app/components/FeaturedCategories.tsx` — category counts are loaded from Supabase instead of fake hard-coded counts.
- `app/wishlist/WishlistClient.tsx` — wishlist products are loaded from Supabase.
- `supabase/seed_catalog.sql` — adds the missing categories and imports the 66 products from the uploaded `data/products.json`.

The existing `data/products.json` is deliberately retained as a backup/source file, but the application no longer depends on it for the homepage or wishlist.

## IMPORTANT: Supabase migration

1. Open Supabase Dashboard → SQL Editor.
2. Open/copy `supabase/seed_catalog.sql`.
3. Run the complete SQL once.
4. The final verification queries should show the category counts and total product count.

Your existing 8 Supabase products are preserved. The 66 JSON products are added, so the expected total after migration is **74 products**, assuming none of the 66 slugs already existed.

## Local project environment

Use the root `.env.local` only.

The uploaded project also contained `app/.env.local` with a stale Supabase URL. It has been removed from this fixed package so there is only one environment source.

Do NOT put service-role keys or other secrets into frontend code.

## Verification

After copying/replacing the files and running the SQL migration:

```text
npm run lint
npm run build
npm run dev
```

Then test:

```text
http://localhost:3000/products
http://localhost:3000/products?category=smartphones
http://localhost:3000/products/iphone-16-pro-max
http://localhost:3000/products/oneplus-12-pro
http://localhost:3000/products/samsung-s24-ultra
http://localhost:3000/products/dell-xps-13-plus
http://localhost:3000/products/canon-eos-r50
```

All migrated products should resolve through the same Supabase-backed detail route.
