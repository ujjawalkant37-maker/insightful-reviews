# Insightful Reviews — Launch Readiness

## Current architecture

Insightful Reviews now has two major pillars:

### 1. Products
Smartphones, laptops, TVs, appliances, audio, wearables, cameras and other product categories.

### 2. Directory
Location-aware real-world entities such as hospitals, schools, colleges, universities, clinics, hotels, restaurants, travel services, automotive services, finance, fitness, local amenities and professional services.

The directory uses:

`directory_categories → directory_entities → directory_locations`

and community participation uses:

`directory_reviews → images / votes / replies / questions / reports`

## Exact branch model

A group/organisation can have multiple location-specific entities.

Example:

`Apollo Hospitals`
→ Maharashtra → Mumbai
→ Karnataka → Bengaluru
→ Telangana → Hyderabad
→ Tamil Nadu → Chennai

Reviews remain attached to the exact branch/entity rather than being incorrectly mixed across all locations.

## Community growth

If a place is missing:

`Directory → Suggest a Place`

A signed-in user can submit it for moderation.

After approval, the entity can receive community opinions.

## Supabase

For the current schema:

1. Run `supabase/launch_migration.sql` once.
2. Run `supabase/directory_seed.sql` once.
3. Verify the resulting `directory_entities` and `directory_locations` counts.
4. Keep Row Level Security enabled.
5. Never expose a Supabase service-role key through `NEXT_PUBLIC_*`.

The seed contains 233 representative records. It is intentionally not described as every Indian institution.

## Local verification

```text
npm install
npm run lint
npm run build
npm run dev
```

Then test:

- `/`
- `/products`
- `/compare`
- `/directory`
- `/directory/<branch-slug>`
- `/directory/suggest`
- `/guides`
- `/ai`
- `/profile`
- `/dashboard`
- `/admin`

## Production configuration still required

The repository cannot create third-party accounts or credentials for you.

Before launch:

- set `NEXT_PUBLIC_SITE_URL`;
- configure production Supabase variables;
- configure Google OAuth redirect URLs if Google login is enabled;
- configure `NEXT_PUBLIC_ADMIN_EMAILS`;
- replace starter legal text with legally reviewed terms/privacy;
- configure Search Console;
- configure GA4/Clarity if desired;
- configure affiliate programmes and IDs;
- test the production domain and `/api/health`.

## AI

The website can render without live AI credits, but AI generation features require an OpenAI API account with available API credits.

Do not make AI availability a dependency for ordinary directory browsing.

## Revenue

Initial monetisation:

- affiliate commerce for eligible product links.

Later monetisation:

- clearly labelled business profiles;
- business analytics;
- premium AI tools;
- sponsored placements with strict disclosure.

Affiliate relationships must never determine editorial scores or community ratings.
