# Step 2E — Product Catalogue & Image Integrity

This step removes the repeated generic external product images from the launch catalogue.

Each of the 66 catalogue products now has a unique local image asset at:

`/product-images/<product-slug>.svg`

These are clearly labelled catalogue identity images, NOT photographs of the actual products. They are a safe interim asset until a verified/licensed product photograph is imported.

This prevents:
- repeated generic Unsplash images;
- broken third-party image hosts;
- Next.js remote-image host failures;
- misleading presentation of generic photographs as exact products.

## Apply to the existing Supabase catalogue

Keep the existing `.env.local` and run:

```bat
npm run sync:product-images
```

The script updates only the image fields for matching product slugs:

- `image_url`
- `images`

It does not delete or recreate products.

## Validate

```bat
npm run validate:images
npm run validate:catalog
npm run lint
npm run build
```

All four checks should pass.

## Important

Do not describe the local SVGs as real product photography. Before public launch, replace them with verified/licensed product images and retain the corresponding source metadata in `data/product-image-sources.json`.
