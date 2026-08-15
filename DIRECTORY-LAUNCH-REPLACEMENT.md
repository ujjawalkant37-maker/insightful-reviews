# Insightful Reviews — Directory Launch Replacement

This ZIP is based on the uploaded repository and keeps the existing working product/AI stack.

## What changed

- Replaced the old local-only directory data access with the new Supabase `directory_entities` architecture.
- Added branch/location-aware filtering by organisation, State/UT and city.
- Connected Community Opinions to `directory_reviews` using the exact directory entity.
- Updated Suggest a Place to use `directory_suggestions` from the new schema.
- Expanded the homepage category registry.
- Updated sitemap to include directory entities.
- Replaced the old directory seed/migration scripts with the current schema.
- Added an idempotent seed containing the repository's 233 representative directory records.
- Added additional directory categories including pharmacies, universities, ATMs, petrol pumps, EV charging, shopping malls, spas, cinemas, event venues and more.

## Supabase — one required data step

The current schema migration creates the directory tables. The repository also contains the 233-record seed.

In Supabase SQL Editor:

1. Run `supabase/launch_migration.sql` if the new directory schema has not already been created.
2. Run `supabase/directory_seed.sql`.
3. Verify:

```sql
SELECT COUNT(*) AS directory_entities
FROM public.directory_entities;

SELECT COUNT(*) AS directory_locations
FROM public.directory_locations;

SELECT name, slug
FROM public.directory_categories
ORDER BY sort_order;
```

The seed is not an exhaustive census of India. Missing entities are intended to be added through the Suggest a Place workflow and moderation.

## Local project

Keep your existing `.env.local`; it is intentionally not included in this replacement ZIP.

Run:

```text
npm install
npm run lint
npm run build
npm run dev
```

Then test:

```text
http://localhost:3000/directory
http://localhost:3000/directory/<a-seeded-slug>
http://localhost:3000/directory/suggest
```

## Important

The ZIP does not contain secrets or third-party credentials.

Live OpenAI generation still depends on available API credits. Directory browsing and community pages do not depend on OpenAI credits.
