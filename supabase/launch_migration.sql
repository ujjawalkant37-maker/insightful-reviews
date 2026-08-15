-- ============================================================
-- Insightful Reviews — Launch Directory Migration
-- Current production schema
--
-- This migration is additive. It does not modify the existing
-- products, reviews or wishlist tables.
-- Run once in Supabase SQL Editor.
-- ============================================================

BEGIN;

CREATE TABLE IF NOT EXISTS public.directory_categories (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    entity_type TEXT NOT NULL DEFAULT 'place',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.directory_entities (
    id BIGSERIAL PRIMARY KEY,
    category_id BIGINT NOT NULL REFERENCES public.directory_categories(id) ON DELETE RESTRICT,
    parent_entity_id BIGINT REFERENCES public.directory_entities(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    organization_name TEXT,
    short_description TEXT,
    description TEXT,
    website TEXT,
    phone TEXT,
    email TEXT,
    image_url TEXT,
    images TEXT[],
    address TEXT,
    locality TEXT,
    city TEXT,
    district TEXT,
    state TEXT,
    pincode TEXT,
    country TEXT NOT NULL DEFAULT 'India',
    latitude NUMERIC(10,7),
    longitude NUMERIC(10,7),
    rating NUMERIC(3,2),
    review_count INTEGER NOT NULL DEFAULT 0,
    trust_score NUMERIC(5,2),
    attributes JSONB NOT NULL DEFAULT '{}'::jsonb,
    status TEXT NOT NULL DEFAULT 'published'
      CHECK (status IN ('draft','pending','published','rejected','archived')),
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(category_id, slug)
);

CREATE TABLE IF NOT EXISTS public.directory_locations (
    id BIGSERIAL PRIMARY KEY,
    entity_id BIGINT NOT NULL REFERENCES public.directory_entities(id) ON DELETE CASCADE,
    location_name TEXT,
    address TEXT,
    locality TEXT,
    city TEXT,
    district TEXT,
    state TEXT,
    pincode TEXT,
    country TEXT NOT NULL DEFAULT 'India',
    latitude NUMERIC(10,7),
    longitude NUMERIC(10,7),
    phone TEXT,
    email TEXT,
    website TEXT,
    facilities JSONB NOT NULL DEFAULT '{}'::jsonb,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(entity_id, address, city, state)
);

CREATE TABLE IF NOT EXISTS public.directory_reviews (
    id BIGSERIAL PRIMARY KEY,
    entity_id BIGINT NOT NULL REFERENCES public.directory_entities(id) ON DELETE CASCADE,
    location_id BIGINT REFERENCES public.directory_locations(id) ON DELETE SET NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title TEXT,
    review TEXT,
    pros TEXT[] NOT NULL DEFAULT '{}',
    cons TEXT[] NOT NULL DEFAULT '{}',
    would_recommend BOOLEAN,
    experience_type TEXT,
    visit_date DATE,
    helpful INTEGER NOT NULL DEFAULT 0,
    not_helpful INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'published'
      CHECK (status IN ('pending','published','hidden','rejected')),
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.directory_review_images (
    id BIGSERIAL PRIMARY KEY,
    review_id BIGINT NOT NULL REFERENCES public.directory_reviews(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.directory_review_votes (
    id BIGSERIAL PRIMARY KEY,
    review_id BIGINT NOT NULL REFERENCES public.directory_reviews(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    vote TEXT NOT NULL CHECK (vote IN ('helpful','not_helpful')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(review_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.directory_review_replies (
    id BIGSERIAL PRIMARY KEY,
    review_id BIGINT NOT NULL REFERENCES public.directory_reviews(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    reply TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.directory_questions (
    id BIGSERIAL PRIMARY KEY,
    entity_id BIGINT NOT NULL REFERENCES public.directory_entities(id) ON DELETE CASCADE,
    location_id BIGINT REFERENCES public.directory_locations(id) ON DELETE SET NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    question TEXT NOT NULL,
    answer TEXT,
    answered_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    helpful INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'published'
      CHECK (status IN ('pending','published','hidden','rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    answered_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.directory_suggestions (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    category_id BIGINT REFERENCES public.directory_categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    organization_name TEXT,
    city TEXT,
    state TEXT,
    country TEXT NOT NULL DEFAULT 'India',
    website TEXT,
    phone TEXT,
    address TEXT,
    reason TEXT,
    status TEXT NOT NULL DEFAULT 'pending'
      CHECK (status IN ('pending','approved','rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.directory_reports (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    entity_id BIGINT REFERENCES public.directory_entities(id) ON DELETE CASCADE,
    review_id BIGINT REFERENCES public.directory_reviews(id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    details TEXT,
    status TEXT NOT NULL DEFAULT 'pending'
      CHECK (status IN ('pending','reviewed','resolved','rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_directory_entities_category ON public.directory_entities(category_id);
CREATE INDEX IF NOT EXISTS idx_directory_entities_parent ON public.directory_entities(parent_entity_id);
CREATE INDEX IF NOT EXISTS idx_directory_entities_name ON public.directory_entities(name);
CREATE INDEX IF NOT EXISTS idx_directory_entities_state ON public.directory_entities(state);
CREATE INDEX IF NOT EXISTS idx_directory_entities_city ON public.directory_entities(city);
CREATE INDEX IF NOT EXISTS idx_directory_entities_org ON public.directory_entities(organization_name);
CREATE INDEX IF NOT EXISTS idx_directory_locations_entity ON public.directory_locations(entity_id);
CREATE INDEX IF NOT EXISTS idx_directory_locations_state_city ON public.directory_locations(state, city);
CREATE INDEX IF NOT EXISTS idx_directory_reviews_entity ON public.directory_reviews(entity_id);
CREATE INDEX IF NOT EXISTS idx_directory_reviews_location ON public.directory_reviews(location_id);
CREATE INDEX IF NOT EXISTS idx_directory_questions_entity ON public.directory_questions(entity_id);

CREATE OR REPLACE FUNCTION public.set_directory_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS directory_entities_updated_at ON public.directory_entities;
CREATE TRIGGER directory_entities_updated_at
BEFORE UPDATE ON public.directory_entities
FOR EACH ROW EXECUTE FUNCTION public.set_directory_updated_at();

DROP TRIGGER IF EXISTS directory_reviews_updated_at ON public.directory_reviews;
CREATE TRIGGER directory_reviews_updated_at
BEFORE UPDATE ON public.directory_reviews
FOR EACH ROW EXECUTE FUNCTION public.set_directory_updated_at();

ALTER TABLE public.directory_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.directory_entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.directory_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.directory_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.directory_review_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.directory_review_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.directory_review_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.directory_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.directory_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.directory_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view active directory categories" ON public.directory_categories;
CREATE POLICY "Public can view active directory categories"
ON public.directory_categories FOR SELECT
USING (is_active = TRUE);

DROP POLICY IF EXISTS "Public can view published directory entities" ON public.directory_entities;
CREATE POLICY "Public can view published directory entities"
ON public.directory_entities FOR SELECT
USING (status = 'published');

DROP POLICY IF EXISTS "Public can view active directory locations" ON public.directory_locations;
CREATE POLICY "Public can view active directory locations"
ON public.directory_locations FOR SELECT
USING (is_active = TRUE);

DROP POLICY IF EXISTS "Public can view published directory reviews" ON public.directory_reviews;
CREATE POLICY "Public can view published directory reviews"
ON public.directory_reviews FOR SELECT
USING (status = 'published');

DROP POLICY IF EXISTS "Authenticated users can submit directory reviews" ON public.directory_reviews;
CREATE POLICY "Authenticated users can submit directory reviews"
ON public.directory_reviews FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Public can view review images" ON public.directory_review_images;
CREATE POLICY "Public can view review images"
ON public.directory_review_images FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.directory_reviews r
    WHERE r.id = review_id AND r.status = 'published'
  )
);

DROP POLICY IF EXISTS "Authenticated users can submit review images" ON public.directory_review_images;
CREATE POLICY "Authenticated users can submit review images"
ON public.directory_review_images FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.directory_reviews r
    WHERE r.id = review_id AND r.user_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "Public can view published replies" ON public.directory_review_replies;
CREATE POLICY "Public can view published replies"
ON public.directory_review_replies FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.directory_reviews r
    WHERE r.id = review_id AND r.status = 'published'
  )
);

DROP POLICY IF EXISTS "Authenticated users can reply" ON public.directory_review_replies;
CREATE POLICY "Authenticated users can reply"
ON public.directory_review_replies FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Public can view published questions" ON public.directory_questions;
CREATE POLICY "Public can view published questions"
ON public.directory_questions FOR SELECT
USING (status = 'published');

DROP POLICY IF EXISTS "Authenticated users can submit questions" ON public.directory_questions;
CREATE POLICY "Authenticated users can submit questions"
ON public.directory_questions FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Authenticated users can vote" ON public.directory_review_votes;
CREATE POLICY "Authenticated users can vote"
ON public.directory_review_votes FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Authenticated users can submit directory suggestions" ON public.directory_suggestions;
CREATE POLICY "Authenticated users can submit directory suggestions"
ON public.directory_suggestions FOR INSERT TO authenticated
WITH CHECK (user_id = auth.uid());

COMMIT;
