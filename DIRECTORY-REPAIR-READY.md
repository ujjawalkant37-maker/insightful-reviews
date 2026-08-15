# Insightful Reviews — integrated directory repair

This package includes the complete project with the directory flow hardened for production-style use.

Key replacements:
- `lib/directory.ts`: removed dependency on the slow `search_directory_entities` RPC for normal browsing/search; uses bounded direct queries, safe name/organisation search, time-bounded requests, category/state/city/group filters, and a local fallback catalogue.
- `app/directory/page.tsx`: working GET search, category navigation, real category imagery, result cards, clear action, and pagination.
- `app/directory/[slug]/page.tsx`: directory detail pages now include the community review submission component and retain source/Google review intelligence when configured.
- `app/components/DirectoryReviewForm.tsx`: authenticated users can submit moderated directory reviews.
- Existing product catalogue, product reviews, AI pages, auth and other routes are preserved.

No SQL change is required for this code replacement. The existing `directory_entities`, `directory_categories` and `directory_reviews` tables/policies are used.

After replacing the project:
1. `npm run lint`
2. `npm run build`
3. `npm run dev`

Directory test URLs:
- `/directory`
- `/directory?category=hospitals`
- `/directory?q=apollo&category=hospitals`
- `/directory?category=schools`
- click any `View Details` card and test the review section after login.

If Supabase directory search is temporarily unavailable, the included local directory catalogue keeps the core directory UI usable instead of throwing a server error.
