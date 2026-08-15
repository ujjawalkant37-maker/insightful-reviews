-- Insightful Reviews — Wishlist RLS/constraint repair
-- Run this in Supabase SQL Editor against the project used by .env.local.
-- Safe to run repeatedly.

BEGIN;

-- The application expects one row per user/product pair.
-- If the table already exists, this does not recreate or delete it.
CREATE TABLE IF NOT EXISTS public.wishlist (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "wishlist_select_own" ON public.wishlist;
CREATE POLICY "wishlist_select_own"
ON public.wishlist
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

DROP POLICY IF EXISTS "wishlist_insert_own" ON public.wishlist;
CREATE POLICY "wishlist_insert_own"
ON public.wishlist
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "wishlist_delete_own" ON public.wishlist;
CREATE POLICY "wishlist_delete_own"
ON public.wishlist
FOR DELETE
TO authenticated
USING (user_id = auth.uid());

-- Avoid duplicate wishlist rows. If an old installation contains duplicate
-- rows, keep the oldest row for each user/product pair before creating the key.
WITH duplicates AS (
  SELECT id,
         ROW_NUMBER() OVER (
           PARTITION BY user_id, product_id
           ORDER BY created_at NULLS FIRST, id
         ) AS rn
  FROM public.wishlist
)
DELETE FROM public.wishlist w
USING duplicates d
WHERE w.id = d.id
  AND d.rn > 1;

CREATE UNIQUE INDEX IF NOT EXISTS wishlist_user_product_unique
ON public.wishlist(user_id, product_id);

GRANT SELECT, INSERT, DELETE ON public.wishlist TO authenticated;

COMMIT;
