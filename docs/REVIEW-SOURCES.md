# Review Intelligence — Source Policy

Insightful Reviews is designed as a **source-attributed review intelligence layer**, not a web scraper.

## Supported architecture

- Google Places: live place details, ratings, photos and reviews when `GOOGLE_PLACES_API_KEY` is configured.
- YouTube: comments can be imported through the YouTube Data API for eligible videos/channels.
- Trustpilot: import through authorised API access/partnership.
- Reddit: connector is deliberately marked restricted. Commercial use requires the applicable Reddit agreement/permission. Do not scrape Reddit pages.
- Amazon / Flipkart: use authorised affiliate, partner or licensed feeds only. Do not scrape customer-review pages.
- Partner/manual: the generic `/api/reviews/import` endpoint accepts rights-cleared review feeds.

## Import format

```json
{
  "reviews": [
    {
      "target_type": "directory",
      "target_id": "123",
      "source": "partner",
      "source_label": "Licensed Partner",
      "external_id": "abc-123",
      "author_name": "Reviewer",
      "rating": 4.5,
      "title": "Good experience",
      "review_text": "The staff were helpful...",
      "review_url": "https://example.com/review/abc-123",
      "published_at": "2026-08-01T10:00:00Z",
      "language": "en",
      "verified": true
    }
  ]
}
```

## Why the site does not promise "all reviews from every platform"

There is no universal review API. Each platform controls its own data, licences and terms. The product therefore stores the source, external ID and source URL for every imported review and keeps connectors independent. This makes the platform expandable without falsely claiming access to data it is not authorised to use.
