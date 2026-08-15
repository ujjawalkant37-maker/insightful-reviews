# Wishlist Fix

The screenshot showed a runtime failure while adding a product to wishlist. The application code now uses numeric product IDs consistently, an idempotent upsert, stronger error reporting, and correct auth-state handling.

## Required Supabase step
Run `supabase/wishlist_fix.sql` once in the Supabase SQL Editor for the database referenced by `.env.local`. This repairs/creates the wishlist table, enables RLS, adds own-row SELECT/INSERT/DELETE policies, removes duplicate pairs, and creates the unique `(user_id, product_id)` constraint required by the upsert.

Then restart the dev server and test the heart button.
