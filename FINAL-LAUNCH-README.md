# Insightful Reviews — Final Launch Replacement

## What this version is

This is the consolidated launch candidate for the original **Website** project.

The product direction is now explicit:

> **Before you decide, know what people experienced.**

Insightful Reviews is not only a product-review site. It is a trust-first decision platform for researching **hospitals, schools, colleges, hotels, restaurants, services, products and other real-world choices** before committing money, time or trust.

## What was already completed in the uploaded project

- Next.js App Router application.
- Supabase-backed product and directory architecture.
- Product catalogue with 66 launch products.
- Product search, category filtering, product detail pages and comparison.
- Wishlist and account flows.
- AI assistant / AI decision components with graceful no-key behaviour.
- India directory architecture with branch/location support.
- 233 representative directory records.
- Hospitals, schools, colleges, hotels and many additional category registries.
- Exact-branch community opinion model.
- Review moderation status in the database.
- Source-attributed external review model.
- Google Places enrichment connector, disabled unless explicitly enabled.
- Suggest-a-place flow.
- SEO metadata, sitemap, robots and Open Graph.
- Affiliate-link abstraction and affiliate disclosure page.
- Security headers and hardened product-image handling.
- Supabase migrations and seed files.
- Launch-data validation scripts.

## What this final replacement fixes

### 1. Mission is now the homepage message

The homepage is no longer framed as a generic shopping site. It leads with:

- hospitals;
- schools;
- colleges;
- hotels;
- restaurants;
- services;
- products.

Products remain a monetisable vertical rather than the whole identity of the company.

### 2. No fake growth numbers

Unsupported claims such as `10K+ reviews`, `500+ products`, `thousands of verified users`, fake expert identities and fake homepage testimonials have been removed from the launch-facing experience.

The site should never look larger than its actual evidence base.

### 3. No fake verification

Product/community review UI no longer labels every database reviewer as a “Verified User”.

A verified label should only be used where the underlying data actually supports verification.

### 4. Source-aware review philosophy

External reviews remain labelled by source. Community opinions remain attached to the exact entity/branch.

### 5. Mobile navigation

The main navigation now works on small screens instead of disappearing.

### 6. Search direction

The main homepage search now searches the decision directory. Product research remains one click away through the Products section.

### 7. SEO coverage

The sitemap now includes the full local directory in multiple bounded pages rather than only the first page of results.

### 8. Affiliate monetisation

Amazon affiliate search links are generated when `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG` is configured.

Product-specific `buy_url` links can be used for approved retailer/affiliate links.

Do not invent partner tracking formats. Use the tracking URLs supplied by the applicable affiliate programme.

### 9. Launch resilience

The local product and directory datasets remain usable when Supabase is unavailable, so a missing database connection does not turn the whole frontend into a blank page.

## What is still required before public launch

These are operational steps, not a rebuild of the product.

### A. Supabase

Use the existing Supabase project.

Run, in order:

```text
supabase/launch_migration.sql
supabase/directory_seed.sql
supabase/launch_v3_review_intelligence.sql
```

Only run migrations that have not already been applied to the production project.

### B. Environment variables

Create `.env.local` locally from `.env.local.example`.

Minimum production configuration:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=https://YOUR-DOMAIN
```

For product affiliate income:

```text
NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=
```

Optional:

```text
OPENAI_API_KEY=
GOOGLE_PLACES_API_KEY=
ENABLE_LIVE_PLACE_ENRICHMENT=false
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_CLARITY_ID=
NEXT_PUBLIC_ADMIN_EMAILS=
REVIEW_IMPORT_TOKEN=
SUPABASE_SERVICE_ROLE_KEY=
```

Never expose `SUPABASE_SERVICE_ROLE_KEY` as a `NEXT_PUBLIC_*` variable.

### C. Local verification

From the project directory:

```bash
npm ci
npm run lint
npm run validate:catalog
npm run validate:images
npm run validate:local-images
npm run build
npm run dev
```

Then test:

```text
http://localhost:3000/
http://localhost:3000/directory
http://localhost:3000/directory?category=hospitals
http://localhost:3000/directory?category=schools
http://localhost:3000/products
http://localhost:3000/compare
http://localhost:3000/guides
http://localhost:3000/about
http://localhost:3000/review-policy
http://localhost:3000/api/health
```

### D. Vercel

Deploy the project to Vercel.

Set the same production environment variables in Vercel.

Set:

```text
NEXT_PUBLIC_SITE_URL=https://YOUR-DOMAIN
```

Then connect the real domain.

### E. Google OAuth

If Google login is used, add the production callback URL in Supabase Authentication settings and Google OAuth configuration.

### F. Affiliate income

Apply to the affiliate programme(s) you actually qualify for.

For Amazon, place the approved Associate tag in:

```text
NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG
```

Then verify that a product page displays the retailer link and that the outgoing URL contains the approved tracking tag.

Do not claim commission from a retailer until the affiliate account is approved and tracking is confirmed.

## Important data policy

The directory contains a **representative launch dataset**, not every Indian hospital, school or business.

Never fabricate:

- reviews;
- ratings;
- verification;
- medical outcomes;
- admissions;
- fees;
- availability;
- facilities;
- opening hours;
- expert credentials.

Missing entities should grow through:

1. official/provider sources;
2. licensed data;
3. approved APIs;
4. user suggestions;
5. moderation.

## Business model

### Phase 1 — immediate

**Affiliate commerce**

The product vertical can earn from qualifying purchases through properly configured affiliate links.

### Phase 2

**Claimed business profiles**

Hospitals, schools, hotels, restaurants and service providers can eventually claim their pages, correct factual information and add clearly labelled business information.

### Phase 3

**Premium analytics**

Offer organisations aggregated, privacy-conscious insight into recurring community themes, complaints and satisfaction signals.

### Phase 4

**Premium consumer tools**

Examples include advanced comparison, saved decision reports, price monitoring and expanded AI analysis.

Sponsored placements should always be clearly labelled and must not silently change editorial scores.

## The core product loop

The long-term platform loop is:

```text
Search
  ↓
Exact entity / branch
  ↓
Structured facts
  ↓
Community experiences
  ↓
Source-attributed external evidence
  ↓
AI-assisted summary
  ↓
Questions / comparison
  ↓
Lower-regret decision
  ↓
User shares their experience
  ↓
Better information for the next person
```

That is the product worth building around.

