# Final Product Image System

This replacement removes synthetic product artwork from the browser-facing product-image pipeline.

- Seven bundled real product photographs are used locally.
- The remaining catalogue products resolve photographs from verified manufacturer/reputable retailer product pages.
- The API never serves the old generated phone-shaped SVG fallback.
- If a remote source cannot be resolved, the API returns HTTP 404 and the UI falls back to `/placeholder.svg` rather than fabricating a product image.
- SVG product illustrations remain only as legacy catalogue data/files and are not served by the product-image API.
- Before commercial publication, verify that each remote/bundled product photograph has a licence/permission appropriate for the site's monetisation model.
