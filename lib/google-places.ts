export type GooglePlaceReview = {
  rating?: number;
  text?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string };
  publishTime?: string;
  googleMapsUri?: string;
};

export type GooglePlaceSnapshot = {
  id: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  websiteUri?: string;
  googleMapsUri?: string;
  rating?: number;
  userRatingCount?: number;
  photos?: Array<{ name: string; widthPx?: number; heightPx?: number }>;
  reviews?: GooglePlaceReview[];
};

export async function getGooglePlaceSnapshot(query: string): Promise<GooglePlaceSnapshot | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (process.env.ENABLE_LIVE_PLACE_ENRICHMENT !== "true" || !apiKey || !query.trim()) return null;

  try {
    const response = await fetch("https://places.googleapis.com/v1/places:searchText", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": [
          "places.id",
          "places.displayName",
          "places.formattedAddress",
          "places.nationalPhoneNumber",
          "places.websiteUri",
          "places.googleMapsUri",
          "places.rating",
          "places.userRatingCount",
          "places.photos",
          "places.reviews",
        ].join(","),
      },
      body: JSON.stringify({ textQuery: query, languageCode: "en" }),
      cache: "no-store",
    });

    if (!response.ok) return null;
    const data = (await response.json()) as { places?: GooglePlaceSnapshot[] };
    return data.places?.[0] ?? null;
  } catch (error) {
    console.error("Google Places lookup failed:", error);
    return null;
  }
}

export function googlePhotoUrl(photoName: string, maxWidth = 1000) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (process.env.ENABLE_LIVE_PLACE_ENRICHMENT !== "true" || !apiKey || !photoName) return null;
  void maxWidth;
  return `/api/google-photo?name=${encodeURIComponent(photoName)}`;
}
