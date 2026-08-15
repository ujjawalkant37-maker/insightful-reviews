# Insightful Reviews — India Directory Coverage

## Launch dataset

The repository contains **233 representative directory records** covering hospitals, schools, colleges, hotels, restaurants and local amenities, plus an India-wide state/city discovery list.

This is a launch dataset, **not a census of every Indian institution or business**.

The directory is deliberately designed to grow through:

1. curated/provider-linked seed data;
2. user suggestions;
3. moderation;
4. branch-level community opinions.

## Location model

Every directory entity can carry:

- category;
- organisation/group;
- State / Union Territory;
- district;
- city;
- locality;
- exact branch address;
- official website;
- source URL;
- verification flag;
- community trust/review data.

A group such as Apollo Hospitals can therefore have separate pages for:

`Apollo Hospitals → Maharashtra → Mumbai`

and

`Apollo Hospitals → Karnataka → Bengaluru`

while keeping the organisation relationship visible.

## Community model

Opinions are attached to the exact `directory_entities.id`, with an optional `directory_locations.id`.

Users can submit:

- 1–5 rating;
- experience type;
- title;
- detailed experience;
- pros;
- cons.

The database also supports review photos, helpful votes, replies, questions, reports and moderation.

## Important data policy

The launch dataset must not be presented as exhaustive or permanently current.

For healthcare, education, travel, hospitality and other real-world services, users should verify current information directly with the provider.

Do not fabricate:

- reviews;
- ratings;
- expert opinions;
- medical outcomes;
- admissions;
- fees;
- availability;
- facilities;
- opening hours.

For national-scale expansion, use authoritative datasets, official provider directories, licensed data providers or approved APIs and respect their terms.
