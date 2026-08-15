# Insightful Reviews — Launch V3

This replacement keeps the existing product/review application and upgrades the directory into a location-aware, source-attributed decision platform.

## What changed

### Directory
- 60 launch categories spanning healthcare, education, hospitality, food, travel, fitness, beauty, finance, automotive, property, business, entertainment, shopping, home services, logistics, professional services, government/civic and community sectors.
- Organisation → State/UT → City → exact branch navigation.
- Branch-specific community opinions.
- Missing-place suggestion flow remains available.
- Google Places live enrichment is optional through `GOOGLE_PLACES_API_KEY`.
- Real place photos can be shown when Google Places photo data is available.

### Review intelligence
- `external_reviews` stores source, source label, external ID, source URL, author, rating and publication date.
- Product and directory pages can show cross-platform review intelligence.
- Source-attributed review feed prevents different platforms from being presented as one fake rating pool.
- Generic rights-cleared import endpoint: `POST /api/reviews/import`.
- Google / YouTube / Trustpilot / authorised partner feeds can be connected independently.
- Reddit and marketplace data are intentionally connector-gated because commercial/API rights differ by platform.

### Reliability
- Compare state no longer reads localStorage during the initial render, removing the hydration mismatch shown in the browser.
- AI endpoint now degrades gracefully when OpenAI quota is exhausted or no key is configured; the website does not crash.
- Community category prop is used, removing the unused-variable warning.

## Supabase

Run these in order in Supabase SQL Editor:

1. `supabase/launch_migration.sql` (if not already applied)
2. `supabase/launch_v3_review_intelligence.sql`

The V3 migration is additive and does not delete the existing product tables.

## Environment

Copy `.env.local.example` to `.env.local` and fill the existing Supabase values.

Optional:

- `GOOGLE_PLACES_API_KEY` — live place enrichment/photos/reviews.
- `OPENAI_API_KEY` — generated AI responses. The site still works without it.
- `REVIEW_IMPORT_TOKEN` + `SUPABASE_SERVICE_ROLE_KEY` — protected server-side review feed import.

Never expose the Supabase service-role key in client-side code.

## Review feed import

Prepare a JSON file matching `docs/REVIEW-SOURCES.md`, then run:

```bash
npm run import:reviews -- ./reviews.json
```

The generic import endpoint is designed for authorised/licensed data feeds, not scraping.

## Launch QA

```bash
npm install
npm run lint
npm run build
npm run start
```

Then test:

- `/`
- `/products`
- `/products/<slug>`
- `/compare`
- `/directory`
- `/directory?category=hospitals`
- `/directory?category=schools`
- `/directory?category=salons`
- `/directory/<branch-slug>`
- `/directory/suggest`
- `/ai-test`

## Important data coverage note

The repository contains a curated launch dataset, not a claim that every Indian hospital, school, college or business is already stored. The architecture is intentionally built for continuous ingestion from authorised data providers, official directories, Google Places and user suggestions. Do not fabricate missing entities merely to increase the count.
