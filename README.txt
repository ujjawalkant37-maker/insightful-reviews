REPLACEMENT FILES

1. Replace lib/getProducts.ts with getProducts.ts.
2. Run supabase/seed_catalog_fixed.sql in Supabase SQL Editor.
3. Restart Next.js and test /products/oneplus-12-pro and other catalogue products.

The SQL preserves existing products and inserts the 66 products from data/products.json. It also adds the application fields missing from the current products table.
