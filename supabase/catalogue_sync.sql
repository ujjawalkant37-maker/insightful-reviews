-- Insightful Reviews: complete catalogue sync
-- Generated from the project's data/products.json (66 products).
-- Safe to run after the existing 8 products are present.
-- Existing products are preserved; rows are added only when the slug is absent.

BEGIN;

-- Ensure the application fields expected by lib/getProducts.ts exist.
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS brand text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS ai_score numeric DEFAULT 0;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS summary text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS specifications jsonb;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS pros text[];
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS cons text[];
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS images text[];
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS buy_url text;

-- Ensure every catalogue category exists.
INSERT INTO public.categories (name, slug, icon)
SELECT v.name, v.slug, v.icon
FROM (VALUES
  ('Smartphones', 'smartphones', '📱'),
  ('Laptops', 'laptops', '💻'),
  ('TVs', 'tvs', '📺'),
  ('Home Appliances', 'appliances', '🏠'),
  ('Audio', 'audio', '🎧'),
  ('Smart Watches', 'wearables', '⌚'),
  ('Cameras', 'cameras', '📷')
) AS v(name, slug, icon)
WHERE NOT EXISTS (
  SELECT 1 FROM public.categories c WHERE c.slug = v.slug
);


INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'oneplus-12-pro',
  'OnePlus 12 Pro',
  c.id,
  'OnePlus',
  64999,
  'INR',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Flagship killer with Snapdragon 8 Gen 3 Leading, 120W charging, and Hasselblad optics. Premium experience for power users.',
  'Flagship killer with Snapdragon 8 Gen 3 Leading, 120W charging, and Hasselblad optics. Premium experience for power users.',
  94,
  'Flagship killer with Snapdragon 8 Gen 3 Leading, 120W charging, and Hasselblad optics. Premium experience for power users.',
  'Flagship killer with Snapdragon 8 Gen 3 Leading, 120W charging, and Hasselblad optics. Premium experience for power users.',
  '{"Display":"6.7-inch AMOLED","Camera":"50MP+48MP+8MP","Battery":"5400mAh","RAM":"12GB","Storage":"256GB","Charging":"120W"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'smartphones'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'oneplus-12-pro'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'samsung-s24-ultra',
  'Samsung Galaxy S24 Ultra',
  c.id,
  'Samsung',
  129999,
  'INR',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Samsung''s premium flagship with titanium design, AI features, and Snapdragon 8 Gen 3. Ultimate Android experience.',
  'Samsung''s premium flagship with titanium design, AI features, and Snapdragon 8 Gen 3. Ultimate Android experience.',
  95,
  'Samsung''s premium flagship with titanium design, AI features, and Snapdragon 8 Gen 3. Ultimate Android experience.',
  'Samsung''s premium flagship with titanium design, AI features, and Snapdragon 8 Gen 3. Ultimate Android experience.',
  '{"Display":"6.8-inch Dynamic AMOLED","Camera":"200MP+50MP+10MP+10MP","Battery":"5000mAh","RAM":"12GB","Storage":"512GB"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'smartphones'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'samsung-s24-ultra'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'iphone-15-pro',
  'iPhone 15 Pro',
  c.id,
  'iPhone',
  139900,
  'INR',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Apple''s premium phone with A17 Pro, titanium design, and ProMotion. Best for iOS ecosystem users.',
  'Apple''s premium phone with A17 Pro, titanium design, and ProMotion. Best for iOS ecosystem users.',
  93,
  'Apple''s premium phone with A17 Pro, titanium design, and ProMotion. Best for iOS ecosystem users.',
  'Apple''s premium phone with A17 Pro, titanium design, and ProMotion. Best for iOS ecosystem users.',
  '{"Display":"6.1-inch Super Retina","Camera":"48MP+12MP+12MP","Battery":"3200mAh","RAM":"8GB","Storage":"512GB"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'smartphones'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'iphone-15-pro'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'xiaomi-14-ultra',
  'Xiaomi 14 Ultra',
  c.id,
  'Xiaomi',
  71999,
  'INR',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Premium Xiaomi flagship with Leica optics and Snapdragon 8 Gen 3. Exceptional photography capabilities.',
  'Premium Xiaomi flagship with Leica optics and Snapdragon 8 Gen 3. Exceptional photography capabilities.',
  92,
  'Premium Xiaomi flagship with Leica optics and Snapdragon 8 Gen 3. Exceptional photography capabilities.',
  'Premium Xiaomi flagship with Leica optics and Snapdragon 8 Gen 3. Exceptional photography capabilities.',
  '{"Display":"6.73-inch AMOLED","Camera":"50MP+50MP+50MP+50MP","Battery":"5910mAh","RAM":"16GB","Storage":"512GB"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'smartphones'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'xiaomi-14-ultra'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'realme-12-pro-plus',
  'Realme 12 Pro Plus',
  c.id,
  'Realme',
  35999,
  'INR',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Value flagship with periscope zoom, 120Hz AMOLED, and excellent battery. Best midrange option in India.',
  'Value flagship with periscope zoom, 120Hz AMOLED, and excellent battery. Best midrange option in India.',
  88,
  'Value flagship with periscope zoom, 120Hz AMOLED, and excellent battery. Best midrange option in India.',
  'Value flagship with periscope zoom, 120Hz AMOLED, and excellent battery. Best midrange option in India.',
  '{"Display":"6.7-inch AMOLED","Camera":"50MP+8MP+2MP","Battery":"5000mAh","RAM":"12GB","Storage":"256GB"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'smartphones'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'realme-12-pro-plus'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'vivo-x100-pro',
  'Vivo X100 Pro',
  c.id,
  'Vivo',
  89999,
  'INR',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Premium Vivo flagship with outstanding camera and design. Great Samsung alternative.',
  'Premium Vivo flagship with outstanding camera and design. Great Samsung alternative.',
  90,
  'Premium Vivo flagship with outstanding camera and design. Great Samsung alternative.',
  'Premium Vivo flagship with outstanding camera and design. Great Samsung alternative.',
  '{"Display":"6.78-inch AMOLED","Camera":"50MP+50MP+12MP","Battery":"5800mAh","RAM":"16GB","Storage":"512GB"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'smartphones'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'vivo-x100-pro'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'oppo-find-x7-pro',
  'Oppo Find X7 Pro',
  c.id,
  'Oppo',
  109999,
  'INR',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Premium Oppo flagship with Hasselblad camera system. Stunning design and performance.',
  'Premium Oppo flagship with Hasselblad camera system. Stunning design and performance.',
  91,
  'Premium Oppo flagship with Hasselblad camera system. Stunning design and performance.',
  'Premium Oppo flagship with Hasselblad camera system. Stunning design and performance.',
  '{"Display":"6.78-inch AMOLED","Camera":"50MP+50MP+50MP","Battery":"5910mAh","RAM":"16GB","Storage":"512GB"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'smartphones'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'oppo-find-x7-pro'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'motorola-edge-50-pro',
  'Motorola Edge 50 Pro',
  c.id,
  'Motorola',
  49999,
  'INR',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Pure Android experience with Snapdragon 8 Gen 3 and excellent display. Stock Android fans'' choice.',
  'Pure Android experience with Snapdragon 8 Gen 3 and excellent display. Stock Android fans'' choice.',
  87,
  'Pure Android experience with Snapdragon 8 Gen 3 and excellent display. Stock Android fans'' choice.',
  'Pure Android experience with Snapdragon 8 Gen 3 and excellent display. Stock Android fans'' choice.',
  '{"Display":"6.7-inch AMOLED","Camera":"50MP+50MP+10MP","Battery":"4500mAh","RAM":"12GB","Storage":"512GB"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'smartphones'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'motorola-edge-50-pro'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'nothing-phone-2a',
  'Nothing Phone 2a',
  c.id,
  'Nothing',
  24999,
  'INR',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Budget smartphone with unique Nothing OS and impressive specs for the price.',
  'Budget smartphone with unique Nothing OS and impressive specs for the price.',
  85,
  'Budget smartphone with unique Nothing OS and impressive specs for the price.',
  'Budget smartphone with unique Nothing OS and impressive specs for the price.',
  '{"Display":"6.7-inch OLED","Camera":"50MP+8MP","Battery":"5000mAh","RAM":"8GB","Storage":"128GB"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'smartphones'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'nothing-phone-2a'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'poco-x6-pro',
  'Poco X6 Pro',
  c.id,
  'Poco',
  26999,
  'INR',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Outstanding budget flagship with 120W charging. Best value in budget segment.',
  'Outstanding budget flagship with 120W charging. Best value in budget segment.',
  85,
  'Outstanding budget flagship with 120W charging. Best value in budget segment.',
  'Outstanding budget flagship with 120W charging. Best value in budget segment.',
  '{"Display":"6.67-inch AMOLED","Camera":"50MP+8MP+2MP","Battery":"5100mAh","RAM":"12GB","Storage":"256GB","Charging":"120W"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'smartphones'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'poco-x6-pro'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'asus-rog-phone-8-pro',
  'Asus ROG Phone 8 Pro',
  c.id,
  'Asus',
  89999,
  'INR',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Gaming powerhouse with active cooling, Snapdragon 8 Gen 3. Perfect for mobile gamers.',
  'Gaming powerhouse with active cooling, Snapdragon 8 Gen 3. Perfect for mobile gamers.',
  92,
  'Gaming powerhouse with active cooling, Snapdragon 8 Gen 3. Perfect for mobile gamers.',
  'Gaming powerhouse with active cooling, Snapdragon 8 Gen 3. Perfect for mobile gamers.',
  '{"Display":"6.78-inch AMOLED","Camera":"50MP+32MP+12MP","Battery":"5550mAh","RAM":"16GB","Storage":"512GB"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'smartphones'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'asus-rog-phone-8-pro'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'samsung-a15-5g',
  'Samsung Galaxy A15 5G',
  c.id,
  'Samsung',
  12999,
  'INR',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Affordable smartphone with 5G support and clean Samsung UI.',
  'Affordable smartphone with 5G support and clean Samsung UI.',
  81,
  'Affordable smartphone with 5G support and clean Samsung UI.',
  'Affordable smartphone with 5G support and clean Samsung UI.',
  '{"Display":"6.5-inch AMOLED","Camera":"50MP+5MP","Battery":"5000mAh","RAM":"6GB","Storage":"128GB"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'smartphones'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'samsung-a15-5g'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'redmi-note-13-pro',
  'Redmi Note 13 Pro',
  c.id,
  'Redmi',
  19999,
  'INR',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Popular mid-range Xiaomi phone with great display and battery life.',
  'Popular mid-range Xiaomi phone with great display and battery life.',
  83,
  'Popular mid-range Xiaomi phone with great display and battery life.',
  'Popular mid-range Xiaomi phone with great display and battery life.',
  '{"Display":"6.67-inch AMOLED","Camera":"50MP+8MP","Battery":"5100mAh","RAM":"8GB","Storage":"128GB"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'smartphones'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'redmi-note-13-pro'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'vivo-v30-pro',
  'Vivo V30 Pro',
  c.id,
  'Vivo',
  43999,
  'INR',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Stylish Vivo phone with excellent camera and design. Great for content creators.',
  'Stylish Vivo phone with excellent camera and design. Great for content creators.',
  86,
  'Stylish Vivo phone with excellent camera and design. Great for content creators.',
  'Stylish Vivo phone with excellent camera and design. Great for content creators.',
  '{"Display":"6.78-inch AMOLED","Camera":"50MP+8MP+2MP","Battery":"5000mAh","RAM":"12GB","Storage":"256GB"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'smartphones'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'vivo-v30-pro'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'oppo-a78',
  'Oppo A78',
  c.id,
  'Oppo',
  16999,
  'INR',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Reliable Oppo budget phone with good battery and display.',
  'Reliable Oppo budget phone with good battery and display.',
  82,
  'Reliable Oppo budget phone with good battery and display.',
  'Reliable Oppo budget phone with good battery and display.',
  '{"Display":"6.56-inch OLED","Camera":"50MP+2MP","Battery":"5000mAh","RAM":"8GB","Storage":"128GB"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'smartphones'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'oppo-a78'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'moto-g84',
  'Moto G84',
  c.id,
  'Moto',
  14999,
  'INR',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Balanced Motorola phone with clean Android and good performance.',
  'Balanced Motorola phone with clean Android and good performance.',
  81,
  'Balanced Motorola phone with clean Android and good performance.',
  'Balanced Motorola phone with clean Android and good performance.',
  '{"Display":"6.5-inch OLED","Camera":"50MP+8MP","Battery":"5000mAh","RAM":"6GB","Storage":"128GB"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'smartphones'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'moto-g84'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'iphone-15',
  'iPhone 15',
  c.id,
  'iPhone',
  79900,
  'INR',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Mainstream iPhone with A16 Bionic and dynamic island. Great for iOS users.',
  'Mainstream iPhone with A16 Bionic and dynamic island. Great for iOS users.',
  91,
  'Mainstream iPhone with A16 Bionic and dynamic island. Great for iOS users.',
  'Mainstream iPhone with A16 Bionic and dynamic island. Great for iOS users.',
  '{"Display":"6.1-inch Super Retina","Camera":"48MP+12MP","Battery":"3349mAh","RAM":"6GB","Storage":"128GB"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'smartphones'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'iphone-15'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'nokia-g42',
  'Nokia G42',
  c.id,
  'Nokia',
  11999,
  'INR',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Reliable Nokia phone with pure Android and long battery life.',
  'Reliable Nokia phone with pure Android and long battery life.',
  80,
  'Reliable Nokia phone with pure Android and long battery life.',
  'Reliable Nokia phone with pure Android and long battery life.',
  '{"Display":"6.5-inch IPS","Camera":"50MP+2MP","Battery":"5000mAh","RAM":"6GB","Storage":"64GB"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'smartphones'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'nokia-g42'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'infinix-note-30',
  'Infinix Note 30',
  c.id,
  'Infinix',
  9999,
  'INR',
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Budget Infinix phone with decent specs and long battery.',
  'Budget Infinix phone with decent specs and long battery.',
  79,
  'Budget Infinix phone with decent specs and long battery.',
  'Budget Infinix phone with decent specs and long battery.',
  '{"Display":"6.78-inch IPS","Camera":"50MP+2MP","Battery":"5000mAh","RAM":"4GB","Storage":"64GB"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'smartphones'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'infinix-note-30'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'dell-xps-13-plus',
  'Dell XPS 13 Plus',
  c.id,
  'Dell',
  139990,
  'INR',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Ultraportable laptop with Intel Core Ultra and premium design. Perfect for professionals.',
  'Ultraportable laptop with Intel Core Ultra and premium design. Perfect for professionals.',
  92,
  'Ultraportable laptop with Intel Core Ultra and premium design. Perfect for professionals.',
  'Ultraportable laptop with Intel Core Ultra and premium design. Perfect for professionals.',
  '{"CPU":"Intel Core Ultra 7","RAM":"16GB","Storage":"512GB SSD","Display":"13.3-inch FHD","Battery":"18 hours","Weight":"1.17kg"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'laptops'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'dell-xps-13-plus'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'lenovo-thinkpad-x1',
  'Lenovo ThinkPad X1 Carbon',
  c.id,
  'Lenovo',
  149999,
  'INR',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Business-class laptop with legendary keyboard and build quality. Enterprise choice.',
  'Business-class laptop with legendary keyboard and build quality. Enterprise choice.',
  93,
  'Business-class laptop with legendary keyboard and build quality. Enterprise choice.',
  'Business-class laptop with legendary keyboard and build quality. Enterprise choice.',
  '{"CPU":"Intel Core i7","RAM":"16GB","Storage":"512GB SSD","Display":"14-inch WUXGA","Battery":"15+ hours","Weight":"1.18kg"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'laptops'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'lenovo-thinkpad-x1'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'hp-pavilion-15',
  'HP Pavilion 15',
  c.id,
  'HP',
  59999,
  'INR',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Balanced all-rounder with good display and performance. Great for students.',
  'Balanced all-rounder with good display and performance. Great for students.',
  85,
  'Balanced all-rounder with good display and performance. Great for students.',
  'Balanced all-rounder with good display and performance. Great for students.',
  '{"CPU":"AMD Ryzen 5","RAM":"8GB","Storage":"256GB SSD","Display":"15.6-inch FHD","Battery":"7 hours","Weight":"1.75kg"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'laptops'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'hp-pavilion-15'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'asus-vivobook-15',
  'Asus VivoBook 15',
  c.id,
  'Asus',
  44990,
  'INR',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Budget laptop with OLED display and decent specs. Value for money.',
  'Budget laptop with OLED display and decent specs. Value for money.',
  83,
  'Budget laptop with OLED display and decent specs. Value for money.',
  'Budget laptop with OLED display and decent specs. Value for money.',
  '{"CPU":"Intel Core i5","RAM":"8GB","Storage":"512GB SSD","Display":"15.6-inch OLED","Battery":"10 hours","Weight":"1.55kg"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'laptops'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'asus-vivobook-15'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'macbook-air-m3',
  'MacBook Air M3',
  c.id,
  'MacBook',
  129900,
  'INR',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Powerful yet portable MacBook with M3 chip. Best for creative professionals.',
  'Powerful yet portable MacBook with M3 chip. Best for creative professionals.',
  94,
  'Powerful yet portable MacBook with M3 chip. Best for creative professionals.',
  'Powerful yet portable MacBook with M3 chip. Best for creative professionals.',
  '{"CPU":"Apple M3","RAM":"16GB","Storage":"512GB SSD","Display":"13.6-inch Liquid Retina","Battery":"18 hours","Weight":"1.24kg"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'laptops'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'macbook-air-m3'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'lenovo-ideapad-5',
  'Lenovo IdeaPad Pro 5G',
  c.id,
  'Lenovo',
  89999,
  'INR',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Premium ultrabook with Snapdragon X processor and 5G. Modern connectivity.',
  'Premium ultrabook with Snapdragon X processor and 5G. Modern connectivity.',
  88,
  'Premium ultrabook with Snapdragon X processor and 5G. Modern connectivity.',
  'Premium ultrabook with Snapdragon X processor and 5G. Modern connectivity.',
  '{"CPU":"Snapdragon X1 Plus","RAM":"16GB","Storage":"512GB SSD","Display":"14-inch OLED","Battery":"20+ hours","Weight":"1.24kg"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'laptops'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'lenovo-ideapad-5'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'samsung-galaxy-book-4',
  'Samsung Galaxy Book 4 Pro',
  c.id,
  'Samsung',
  119999,
  'INR',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Premium Windows ultrabook with AMOLED display. Galaxy ecosystem integration.',
  'Premium Windows ultrabook with AMOLED display. Galaxy ecosystem integration.',
  91,
  'Premium Windows ultrabook with AMOLED display. Galaxy ecosystem integration.',
  'Premium Windows ultrabook with AMOLED display. Galaxy ecosystem integration.',
  '{"CPU":"Intel Core Ultra 7","RAM":"16GB","Storage":"512GB SSD","Display":"16-inch AMOLED","Battery":"18 hours","Weight":"1.54kg"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'laptops'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'samsung-galaxy-book-4'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'acer-aspire-5',
  'Acer Aspire 5',
  c.id,
  'Acer',
  49999,
  'INR',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Solid budget laptop for everyday tasks. Good value proposition.',
  'Solid budget laptop for everyday tasks. Good value proposition.',
  84,
  'Solid budget laptop for everyday tasks. Good value proposition.',
  'Solid budget laptop for everyday tasks. Good value proposition.',
  '{"CPU":"Intel Core i5","RAM":"8GB","Storage":"512GB SSD","Display":"15.6-inch FHD","Battery":"7 hours","Weight":"1.85kg"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'laptops'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'acer-aspire-5'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'asus-tuf-gaming',
  'Asus TUF Gaming F15',
  c.id,
  'Asus',
  79999,
  'INR',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Gaming laptop with RTX graphics and high refresh display. Gamer''s choice.',
  'Gaming laptop with RTX graphics and high refresh display. Gamer''s choice.',
  87,
  'Gaming laptop with RTX graphics and high refresh display. Gamer''s choice.',
  'Gaming laptop with RTX graphics and high refresh display. Gamer''s choice.',
  '{"CPU":"Intel Core i7","RAM":"16GB","Storage":"512GB SSD","Display":"15.6-inch 144Hz FHD","Battery":"6 hours","Weight":"2.2kg"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'laptops'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'asus-tuf-gaming'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'hp-envy-13',
  'HP Envy 13',
  c.id,
  'HP',
  69999,
  'INR',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Ultraportable laptop with premium build. Perfect for travelers.',
  'Ultraportable laptop with premium build. Perfect for travelers.',
  89,
  'Ultraportable laptop with premium build. Perfect for travelers.',
  'Ultraportable laptop with premium build. Perfect for travelers.',
  '{"CPU":"Intel Core i7","RAM":"16GB","Storage":"512GB SSD","Display":"13.3-inch OLED","Battery":"12 hours","Weight":"1.15kg"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'laptops'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'hp-envy-13'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'samsung-qn55-qled',
  'Samsung QN55 QLED 2024',
  c.id,
  'Samsung',
  89999,
  'INR',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  '55-inch QLED TV with 144Hz gaming mode and Quantum AI processor.',
  '55-inch QLED TV with 144Hz gaming mode and Quantum AI processor.',
  92,
  '55-inch QLED TV with 144Hz gaming mode and Quantum AI processor.',
  '55-inch QLED TV with 144Hz gaming mode and Quantum AI processor.',
  '{"Panel":"QLED","Size":"55-inch","Resolution":"4K","Refresh":"144Hz","HDR":"Quantum HDR","Smart":"Tizen OS"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'tvs'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'samsung-qn55-qled'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'lg-c4-oled',
  'LG C4 OLED 55',
  c.id,
  'LG',
  149999,
  'INR',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Premium 55-inch OLED TV with exceptional picture quality. Best OLED in India.',
  'Premium 55-inch OLED TV with exceptional picture quality. Best OLED in India.',
  94,
  'Premium 55-inch OLED TV with exceptional picture quality. Best OLED in India.',
  'Premium 55-inch OLED TV with exceptional picture quality. Best OLED in India.',
  '{"Panel":"OLED","Size":"55-inch","Resolution":"4K","Refresh":"144Hz","HDR":"Dolby Vision","Smart":"webOS"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'tvs'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'lg-c4-oled'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'sony-bravia-55',
  'Sony Bravia 55 K95XL',
  c.id,
  'Sony',
  219990,
  'INR',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Sony''s flagship Mini LED TV with exceptional contrast. Picture perfectionists'' choice.',
  'Sony''s flagship Mini LED TV with exceptional contrast. Picture perfectionists'' choice.',
  95,
  'Sony''s flagship Mini LED TV with exceptional contrast. Picture perfectionists'' choice.',
  'Sony''s flagship Mini LED TV with exceptional contrast. Picture perfectionists'' choice.',
  '{"Panel":"Mini LED","Size":"55-inch","Resolution":"4K","HDR":"Dolby Vision","Sound":"Acoustic Multi-Audio"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'tvs'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'sony-bravia-55'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'samsung-43-qled',
  'Samsung 43 QLED 2024',
  c.id,
  'Samsung',
  49999,
  'INR',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Compact 43-inch QLED TV. Perfect for apartments and bedrooms.',
  'Compact 43-inch QLED TV. Perfect for apartments and bedrooms.',
  86,
  'Compact 43-inch QLED TV. Perfect for apartments and bedrooms.',
  'Compact 43-inch QLED TV. Perfect for apartments and bedrooms.',
  '{"Panel":"QLED","Size":"43-inch","Resolution":"4K","Smart":"Tizen OS"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'tvs'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'samsung-43-qled'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'lg-32-led',
  'LG 32 FHD LED',
  c.id,
  'LG',
  15999,
  'INR',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Budget 32-inch TV. Great for guest rooms and offices.',
  'Budget 32-inch TV. Great for guest rooms and offices.',
  80,
  'Budget 32-inch TV. Great for guest rooms and offices.',
  'Budget 32-inch TV. Great for guest rooms and offices.',
  '{"Panel":"LED","Size":"32-inch","Resolution":"FHD","Smart":"webOS"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'tvs'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'lg-32-led'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'tcl-65-qled',
  'TCL 65 QLED 2024',
  c.id,
  'TCL',
  59999,
  'INR',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Budget-friendly 65-inch QLED TV. Best value for large screen.',
  'Budget-friendly 65-inch QLED TV. Best value for large screen.',
  85,
  'Budget-friendly 65-inch QLED TV. Best value for large screen.',
  'Budget-friendly 65-inch QLED TV. Best value for large screen.',
  '{"Panel":"QLED","Size":"65-inch","Resolution":"4K","Smart":"Google TV"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'tvs'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'tcl-65-qled'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'mi-led-tv-50',
  'Mi LED TV 50 2024',
  c.id,
  'Mi',
  24999,
  'INR',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  '50-inch 4K TV with PatchWall OS. Great budget option.',
  '50-inch 4K TV with PatchWall OS. Great budget option.',
  82,
  '50-inch 4K TV with PatchWall OS. Great budget option.',
  '50-inch 4K TV with PatchWall OS. Great budget option.',
  '{"Panel":"LED","Size":"50-inch","Resolution":"4K","Smart":"PatchWall OS"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'tvs'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'mi-led-tv-50'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'voltas-32-led',
  'Voltas 32-inch LED TV',
  c.id,
  'Voltas',
  13999,
  'INR',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Indian brand TV with good build quality. Budget option.',
  'Indian brand TV with good build quality. Budget option.',
  79,
  'Indian brand TV with good build quality. Budget option.',
  'Indian brand TV with good build quality. Budget option.',
  '{"Panel":"LED","Size":"32-inch","Resolution":"FHD","Smart":"Yes"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'tvs'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'voltas-32-led'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'boat-airdopes-pro-max',
  'boAt Airdopes Pro Max',
  c.id,
  'Boat',
  4999,
  'INR',
  'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Premium TWS earbuds with 48-hour battery and BEAST mode. Best budget premium audio.',
  'Premium TWS earbuds with 48-hour battery and BEAST mode. Best budget premium audio.',
  90,
  'Premium TWS earbuds with 48-hour battery and BEAST mode. Best budget premium audio.',
  'Premium TWS earbuds with 48-hour battery and BEAST mode. Best budget premium audio.',
  '{"Battery":"48 hours","Drivers":"6.5mm","Codec":"LDAC","ANC":"Yes","Connectivity":"Bluetooth 5.3"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'audio'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'boat-airdopes-pro-max'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'noise-ultimus-pro',
  'Noise Ultimus Pro',
  c.id,
  'Noise',
  6799,
  'INR',
  'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Feature-rich TWS with premium audio. Excellent value for money.',
  'Feature-rich TWS with premium audio. Excellent value for money.',
  88,
  'Feature-rich TWS with premium audio. Excellent value for money.',
  'Feature-rich TWS with premium audio. Excellent value for money.',
  '{"Battery":"40 hours","Drivers":"8mm","ANC":"Active Hybrid","Touch Control":"Yes","Connectivity":"Bluetooth 5.2"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'audio'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'noise-ultimus-pro'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'jbl-tune-670nc',
  'JBL Tune 670NC',
  c.id,
  'JBL',
  9999,
  'INR',
  'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Premium over-ear headphones with ANC and 30-hour battery. Perfect for travel.',
  'Premium over-ear headphones with ANC and 30-hour battery. Perfect for travel.',
  87,
  'Premium over-ear headphones with ANC and 30-hour battery. Perfect for travel.',
  'Premium over-ear headphones with ANC and 30-hour battery. Perfect for travel.',
  '{"Battery":"30 hours","Drivers":"40mm","ANC":"Yes","Weight":"160g","Comfort":"Padded earcups"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'audio'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'jbl-tune-670nc'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'sony-wf-c700n',
  'Sony WF-C700N',
  c.id,
  'Sony',
  7990,
  'INR',
  'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Compact TWS with LDAC codec and excellent ANC. Premium sound quality.',
  'Compact TWS with LDAC codec and excellent ANC. Premium sound quality.',
  86,
  'Compact TWS with LDAC codec and excellent ANC. Premium sound quality.',
  'Compact TWS with LDAC codec and excellent ANC. Premium sound quality.',
  '{"Battery":"8 hours","Codec":"LDAC","ANC":"Yes","Size":"Compact","Design":"Ergonomic"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'audio'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'sony-wf-c700n'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'apple-airpods-pro',
  'Apple AirPods Pro 2',
  c.id,
  'Apple',
  24900,
  'INR',
  'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Apple''s flagship earbuds with adaptive audio. Best for Apple ecosystem.',
  'Apple''s flagship earbuds with adaptive audio. Best for Apple ecosystem.',
  93,
  'Apple''s flagship earbuds with adaptive audio. Best for Apple ecosystem.',
  'Apple''s flagship earbuds with adaptive audio. Best for Apple ecosystem.',
  '{"Battery":"6 hours","ANC":"Adaptive","Design":"Comfortable fit","Find My":"Yes","Wireless":"H1 Chip"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'audio'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'apple-airpods-pro'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'sennheiser-momentum',
  'Sennheiser Momentum 4',
  c.id,
  'Sennheiser',
  39995,
  'INR',
  'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Premium over-ear headphones with 60-hour battery. Best for audiophiles.',
  'Premium over-ear headphones with 60-hour battery. Best for audiophiles.',
  91,
  'Premium over-ear headphones with 60-hour battery. Best for audiophiles.',
  'Premium over-ear headphones with 60-hour battery. Best for audiophiles.',
  '{"Battery":"60 hours","Drivers":"40mm","ANC":"Adaptive","Sound":"Studio-grade","Build":"Premium aluminum"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'audio'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'sennheiser-momentum'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'boat-airdopes-500',
  'boAt Airdopes 500 AIO',
  c.id,
  'Boat',
  1999,
  'INR',
  'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Affordable TWS earbuds with decent audio. Best budget option.',
  'Affordable TWS earbuds with decent audio. Best budget option.',
  81,
  'Affordable TWS earbuds with decent audio. Best budget option.',
  'Affordable TWS earbuds with decent audio. Best budget option.',
  '{"Battery":"20 hours","Design":"Ergonomic","Codec":"SBC","Water Resistant":"IPX4"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'audio'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'boat-airdopes-500'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'bose-quietcomfort',
  'Bose QuietComfort 45',
  c.id,
  'Bose',
  31999,
  'INR',
  'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Premium noise-cancelling headphones. Industry leader in ANC.',
  'Premium noise-cancelling headphones. Industry leader in ANC.',
  92,
  'Premium noise-cancelling headphones. Industry leader in ANC.',
  'Premium noise-cancelling headphones. Industry leader in ANC.',
  '{"Battery":"24 hours","ANC":"Industry-leading","Design":"Comfortable","Connectivity":"Bluetooth 5.3"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'audio'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'bose-quietcomfort'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'ifb-diva-automat',
  'IFB Diva Automat',
  c.id,
  'IFB',
  45990,
  'INR',
  'https://images.unsplash.com/photo-1514270693093-2fdbbfe24f02?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Premium fully automatic washing machine. Best in India.',
  'Premium fully automatic washing machine. Best in India.',
  90,
  'Premium fully automatic washing machine. Best in India.',
  'Premium fully automatic washing machine. Best in India.',
  '{"Capacity":"8kg","Motor":"Brushless","Cycles":"15 programs","Water":"Dual storm technology","Energy":"5-star"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1514270693093-2fdbbfe24f02?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'appliances'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'ifb-diva-automat'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'lg-refrigerator',
  'LG Direct Cool Refrigerator',
  c.id,
  'LG',
  35990,
  'INR',
  'https://images.unsplash.com/photo-1514270693093-2fdbbfe24f02?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Energy-efficient refrigerator. Perfect for Indian kitchens.',
  'Energy-efficient refrigerator. Perfect for Indian kitchens.',
  87,
  'Energy-efficient refrigerator. Perfect for Indian kitchens.',
  'Energy-efficient refrigerator. Perfect for Indian kitchens.',
  '{"Capacity":"190L","Compressor":"Linear","Frost Free":"Auto","Energy Rating":"5-star","Features":"Multi-airflow"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1514270693093-2fdbbfe24f02?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'appliances'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'lg-refrigerator'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'bosch-washing-machine',
  'Bosch 6kg Washing Machine',
  c.id,
  'Bosch',
  29990,
  'INR',
  'https://images.unsplash.com/photo-1514270693093-2fdbbfe24f02?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Reliable front-load washing machine. Great value for money.',
  'Reliable front-load washing machine. Great value for money.',
  85,
  'Reliable front-load washing machine. Great value for money.',
  'Reliable front-load washing machine. Great value for money.',
  '{"Capacity":"6kg","Spin Speed":"1000 RPM","Energy Rating":"4-star","Features":"Gentle fabric care"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1514270693093-2fdbbfe24f02?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'appliances'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'bosch-washing-machine'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'haier-convertible-ac',
  'Haier Convertible AC',
  c.id,
  'Haier',
  35999,
  'INR',
  'https://images.unsplash.com/photo-1514270693093-2fdbbfe24f02?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Smart dual-mode AC. Perfect for Indian summers.',
  'Smart dual-mode AC. Perfect for Indian summers.',
  88,
  'Smart dual-mode AC. Perfect for Indian summers.',
  'Smart dual-mode AC. Perfect for Indian summers.',
  '{"Capacity":"1.5 Ton","Modes":"Cool, Heat, Dry, Fan","Energy Rating":"5-star","Features":"Wi-Fi, Voice control"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1514270693093-2fdbbfe24f02?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'appliances'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'haier-convertible-ac'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'samsung-microwave',
  'Samsung Microwave Oven',
  c.id,
  'Samsung',
  12990,
  'INR',
  'https://images.unsplash.com/photo-1514270693093-2fdbbfe24f02?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Compact microwave with multiple presets. Great for everyday cooking.',
  'Compact microwave with multiple presets. Great for everyday cooking.',
  84,
  'Compact microwave with multiple presets. Great for everyday cooking.',
  'Compact microwave with multiple presets. Great for everyday cooking.',
  '{"Capacity":"20L","Power":"800W","Programs":"20 presets","Features":"Keep warm function"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1514270693093-2fdbbfe24f02?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'appliances'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'samsung-microwave'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'induction-preethi',
  'Induction Cooktop Preethi',
  c.id,
  'Induction',
  3499,
  'INR',
  'https://images.unsplash.com/photo-1514270693093-2fdbbfe24f02?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Compact induction cooktop. Energy efficient for Indian homes.',
  'Compact induction cooktop. Energy efficient for Indian homes.',
  82,
  'Compact induction cooktop. Energy efficient for Indian homes.',
  'Compact induction cooktop. Energy efficient for Indian homes.',
  '{"Power":"2000W","Control":"Touch","Features":"Auto-off, Overload protection"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1514270693093-2fdbbfe24f02?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'appliances'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'induction-preethi'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'whirlpool-refrigerator',
  'Whirlpool Refrigerator',
  c.id,
  'Whirlpool',
  24999,
  'INR',
  'https://images.unsplash.com/photo-1514270693093-2fdbbfe24f02?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Reliable Whirlpool fridge with good cooling performance.',
  'Reliable Whirlpool fridge with good cooling performance.',
  83,
  'Reliable Whirlpool fridge with good cooling performance.',
  'Reliable Whirlpool fridge with good cooling performance.',
  '{"Capacity":"245L","Type":"Direct Cool","Compressor":"Rotary","Energy":"5-star"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1514270693093-2fdbbfe24f02?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'appliances'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'whirlpool-refrigerator'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'blue-star-ac',
  'Blue Star AC 1 Ton',
  c.id,
  'Blue',
  24999,
  'INR',
  'https://images.unsplash.com/photo-1514270693093-2fdbbfe24f02?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Popular Indian AC brand. Good for Indian climate.',
  'Popular Indian AC brand. Good for Indian climate.',
  83,
  'Popular Indian AC brand. Good for Indian climate.',
  'Popular Indian AC brand. Good for Indian climate.',
  '{"Capacity":"1 Ton","Type":"Split AC","Cooling":"Fast cooling","Energy":"5-star"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1514270693093-2fdbbfe24f02?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'appliances'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'blue-star-ac'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'boat-smartwatch-prime',
  'boAt SmartWatch Prime',
  c.id,
  'Boat',
  3999,
  'INR',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Affordable smartwatch with fitness tracking. Great value.',
  'Affordable smartwatch with fitness tracking. Great value.',
  84,
  'Affordable smartwatch with fitness tracking. Great value.',
  'Affordable smartwatch with fitness tracking. Great value.',
  '{"Display":"1.4-inch AMOLED","Battery":"7 days","Features":"Heart rate, SpO2, Sleep tracking","Water Resistant":"5ATM"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'wearables'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'boat-smartwatch-prime'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'noise-colorfit-pro',
  'Noise ColorFit Pro 4',
  c.id,
  'Noise',
  5999,
  'INR',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Feature-rich smartwatch. Best affordable option.',
  'Feature-rich smartwatch. Best affordable option.',
  85,
  'Feature-rich smartwatch. Best affordable option.',
  'Feature-rich smartwatch. Best affordable option.',
  '{"Display":"1.72-inch AMOLED","Battery":"10 days","Features":"SpO2, Heart rate, Multiple sports","Water Resistant":"5ATM"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'wearables'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'noise-colorfit-pro'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'apple-watch-series-9',
  'Apple Watch Series 9',
  c.id,
  'Apple',
  39900,
  'INR',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Premium smartwatch for Apple users. Best wearable overall.',
  'Premium smartwatch for Apple users. Best wearable overall.',
  93,
  'Premium smartwatch for Apple users. Best wearable overall.',
  'Premium smartwatch for Apple users. Best wearable overall.',
  '{"Display":"Always-on LTPO OLED","Battery":"18 hours","Health":"ECG, Temperature, Crash detection","Water Resistant":"5ATM"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'wearables'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'apple-watch-series-9'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'boat-band-active',
  'boAt Band Active',
  c.id,
  'Boat',
  1999,
  'INR',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Budget fitness tracker. Great for fitness enthusiasts.',
  'Budget fitness tracker. Great for fitness enthusiasts.',
  81,
  'Budget fitness tracker. Great for fitness enthusiasts.',
  'Budget fitness tracker. Great for fitness enthusiasts.',
  '{"Display":"0.96-inch OLED","Battery":"7 days","Features":"Heart rate, Sleep tracking, 40+ sports","Water Resistant":"5ATM"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'wearables'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'boat-band-active'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'sony-smartband',
  'Sony SmartBand 7C',
  c.id,
  'Sony',
  13990,
  'INR',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Lightweight wearable with AI features.',
  'Lightweight wearable with AI features.',
  86,
  'Lightweight wearable with AI features.',
  'Lightweight wearable with AI features.',
  '{"Battery":"5 days","Features":"AI insights, Health tracking","Design":"Compact","Water Resistant":"5ATM"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'wearables'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'sony-smartband'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'samsung-galaxy-watch-6',
  'Samsung Galaxy Watch 6 Classic',
  c.id,
  'Samsung',
  22999,
  'INR',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Premium Android smartwatch. Best for Samsung users.',
  'Premium Android smartwatch. Best for Samsung users.',
  91,
  'Premium Android smartwatch. Best for Samsung users.',
  'Premium Android smartwatch. Best for Samsung users.',
  '{"Display":"1.3-inch AMOLED","Battery":"3-4 days","Features":"Health tracking, Rotating bezel","Water Resistant":"5ATM"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'wearables'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'samsung-galaxy-watch-6'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'amazfit-gts-4',
  'Amazfit GTS 4',
  c.id,
  'Amazfit',
  8999,
  'INR',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Chinese brand with excellent features. Great value.',
  'Chinese brand with excellent features. Great value.',
  84,
  'Chinese brand with excellent features. Great value.',
  'Chinese brand with excellent features. Great value.',
  '{"Display":"1.65-inch AMOLED","Battery":"14 days","Features":"150+ sports, Health tracking","Water Resistant":"5ATM"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'wearables'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'amazfit-gts-4'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'canon-eos-r50',
  'Canon EOS R50',
  c.id,
  'Canon',
  89995,
  'INR',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Entry full-frame mirrorless for creators. Excellent value.',
  'Entry full-frame mirrorless for creators. Excellent value.',
  91,
  'Entry full-frame mirrorless for creators. Excellent value.',
  'Entry full-frame mirrorless for creators. Excellent value.',
  '{"Sensor":"24.2MP Full-frame","Video":"4K 60p","Autofocus":"AI Eye-detection","Weight":"375g"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'cameras'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'canon-eos-r50'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'sony-a6700',
  'Sony A6700',
  c.id,
  'Sony',
  119990,
  'INR',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Compact mirrorless for videographers. Fast autofocus.',
  'Compact mirrorless for videographers. Fast autofocus.',
  92,
  'Compact mirrorless for videographers. Fast autofocus.',
  'Compact mirrorless for videographers. Fast autofocus.',
  '{"Sensor":"26MP APS-C","Video":"4K 120p","Autofocus":"Real-time Eye AF","Weight":"453g"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'cameras'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'sony-a6700'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'nikon-z5',
  'Nikon Z5',
  c.id,
  'Nikon',
  129995,
  'INR',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Entry full-frame mirrorless. Solid choice for photographers.',
  'Entry full-frame mirrorless. Solid choice for photographers.',
  90,
  'Entry full-frame mirrorless. Solid choice for photographers.',
  'Entry full-frame mirrorless. Solid choice for photographers.',
  '{"Sensor":"24.3MP Full-frame","Video":"4K 30p","Build":"Robust weather-sealed","Weight":"590g"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'cameras'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'nikon-z5'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'fujifilm-x-s20',
  'Fujifilm X-S20',
  c.id,
  'Fujifilm',
  74900,
  'INR',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Stylish mirrorless with unique color science.',
  'Stylish mirrorless with unique color science.',
  88,
  'Stylish mirrorless with unique color science.',
  'Stylish mirrorless with unique color science.',
  '{"Sensor":"26MP APS-C","Video":"4K 60p","Design":"Retro styling","Weight":"380g"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'cameras'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'fujifilm-x-s20'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'gopro-hero-12',
  'GoPro Hero 12',
  c.id,
  'GoPro',
  36999,
  'INR',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
  5,
  0,
  'Action camera for adventurers. Excellent stabilization.',
  'Action camera for adventurers. Excellent stabilization.',
  89,
  'Action camera for adventurers. Excellent stabilization.',
  'Action camera for adventurers. Excellent stabilization.',
  '{"Video":"5.3K 60p","Stabilization":"HyperSmooth 6","Water Resistance":"33m","Weight":"166g"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'cameras'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'gopro-hero-12'
  );

INSERT INTO public.products (
  slug, name, category_id, brand, price, currency, image_url, rating,
  review_count, short_description, full_description,
  ai_score, summary, description, specifications, pros, cons, images, buy_url
)
SELECT
  'dji-osmo-action',
  'DJI Osmo Action 4',
  c.id,
  'DJI',
  24999,
  'INR',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
  4,
  0,
  'Budget action camera. Great alternative to GoPro.',
  'Budget action camera. Great alternative to GoPro.',
  86,
  'Budget action camera. Great alternative to GoPro.',
  'Budget action camera. Great alternative to GoPro.',
  '{"Video":"4K 60p","Stabilization":"RockSteady 3.0","Water Resistance":"16m","Weight":"124g"}'::jsonb,
  ARRAY[]::text[],
  ARRAY[]::text[],
  ARRAY['https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80']::text[],
  NULL
FROM public.categories c
WHERE c.slug = 'cameras'
  AND NOT EXISTS (
    SELECT 1 FROM public.products existing
    WHERE existing.slug = 'dji-osmo-action'
  );

COMMIT;

-- Verification
SELECT
  c.slug AS category,
  COUNT(p.id) AS product_count
FROM public.categories c
LEFT JOIN public.products p ON p.category_id = c.id
GROUP BY c.id, c.slug
ORDER BY c.id;

SELECT COUNT(*) AS total_products
FROM public.products;
