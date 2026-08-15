# Insightful Reviews — Launch Checklist

## Repository capabilities
- Next.js 16 App Router
- Existing Supabase product/review architecture
- Product catalogue/detail/search/filter/compare/wishlist/review flows
- AI components and API integration
- Expanded product + directory category registry
- India directory with state/city/group/branch filtering
- Branch-level Community Opinions
- Signed-in Suggest a Place workflow
- SEO guides, sitemap, robots and Open Graph
- Optional Google Analytics and Microsoft Clarity
- Affiliate-link abstraction
- Legal/disclosure starter pages
- Health endpoint at `/api/health`

## Supabase setup
1. Keep your existing Supabase project and environment variables.
2. Run `supabase/launch_migration.sql` once.
3. Run `supabase/directory_seed.sql` once after the migration.
4. Keep Row Level Security enabled.
5. Never expose a service-role key in a `NEXT_PUBLIC_*` variable.

## Before public launch
1. Set `NEXT_PUBLIC_SITE_URL` to the real HTTPS domain.
2. Add production Supabase variables in Vercel.
3. Add your real support email.
4. Replace starter Privacy/Terms text with legally reviewed versions.
5. Configure Google OAuth redirect URLs for the production domain.
6. Add `NEXT_PUBLIC_ADMIN_EMAILS` for the admin UI gate.
7. Create Search Console and submit `/sitemap.xml`.
8. Configure GA4/Clarity if desired.
9. Join affiliate programmes and configure IDs/links.
10. Test product reviews, edit review, wishlist, compare, directory search and community opinions.
11. Test `/api/health` after deployment.
12. Test mobile navigation and all major pages.

## Directory governance
- Do not present the launch seed as an exhaustive national census.
- Verify current directory facts from official/provider sources.
- Moderate user-submitted entities before promotion.
- Moderate abusive, defamatory, discriminatory or medically unsafe community content.
- Keep opinions attached to the exact branch/entity.

## AI / revenue
AI features require an OpenAI API account with available API credits. The core website does not need live AI to render the directory/product pages.

Initial revenue: affiliate commerce.
Later: business profiles, analytics, premium AI and clearly labelled sponsorships.

## Deployment
Run locally:

`npm install`

`npm run lint`

`npm run build`

Then push to GitHub → deploy on Vercel → connect the domain → configure production environment variables → run the Supabase migration/seed → smoke-test the live site.
