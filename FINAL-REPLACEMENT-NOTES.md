# Insightful Reviews — Final Image/Security Replacement

This replacement removes the broken product-image proxy behavior and replaces it with:

- bundled raster product assets where available;
- secure, HTTPS-only remote image resolution through an explicit hostname allowlist;
- redirect validation to prevent SSRF through remote image redirects;
- response-size limits for HTML and image downloads;
- no remote SVG proxying;
- deterministic product-specific fallback artwork instead of the generic "Image unavailable" placeholder;
- the legacy `/api/product-image?slug=` endpoint reduced to a safe redirect into the hardened slug endpoint;
- Next.js security response headers;
- local image validation updated for raster and legacy assets;
- launch check script in `package.json`;
- `.env.local` deliberately excluded from this replacement package.

## Required local verification

```bash
npm ci
npm audit
npm run lint
npm run validate:catalog
npm run validate:images
npm run validate:local-images
npm run build
npm run dev
```

Then open:

`http://localhost:3000/products?category=smartphones`

The project contains no `.env.local` file. Copy `.env.local.example` to `.env.local` and add the required values locally.

## Important security action

The previous project archive contained live-looking Supabase/OpenAI credentials in `.env.local`. They are intentionally NOT included here. If those credentials were ever committed to GitHub or shared outside the local machine, rotate/revoke them before production deployment.
