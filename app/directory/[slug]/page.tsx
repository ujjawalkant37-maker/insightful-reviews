import Link from "next/link";
import Image from "@/components/SafeImage";
import { notFound } from "next/navigation";
import CommunityOpinions from "@/components/CommunityOpinions";
import DirectoryReviewForm from "@/components/DirectoryReviewForm";
import ExternalReviewFeed from "@/components/ExternalReviewFeed";
import ReviewIntelligence from "@/components/ReviewIntelligence";
import DirectoryDecisionChecklist from "@/components/DirectoryDecisionChecklist";
import { getDirectoryListing, getRelatedBranches } from "@/lib/directory";
import { getExternalReviews, summarizeExternalReviews, type ExternalReview } from "@/lib/review-intelligence";
import { getGooglePlaceSnapshot, googlePhotoUrl } from "@/lib/google-places";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getDirectoryListing(slug);
  return { title: item ? `${item.name} — ${item.city}, ${item.state} | Insightful Reviews` : "Listing not found", description: item?.description ?? "Location-specific community opinions and source-linked information." };
}

type SearchParams = Promise<{ state?: string; city?: string }>;

export default async function DirectoryDetailPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: SearchParams }) {
  const { slug } = await params;
  const { state, city } = await searchParams;
  const item = await getDirectoryListing(slug);
  if (!item) notFound();

  const branches = await getRelatedBranches(item);
  const filteredBranches = branches.filter((branch) => (!state || branch.state === state) && (!city || branch.city === city));
  const states = [...new Set(branches.map((branch) => branch.state).filter(Boolean))].sort();
  const cities = [...new Set(branches.filter((branch) => !state || branch.state === state).map((branch) => branch.city).filter(Boolean))].sort();

  const storedReviews = await getExternalReviews("directory", String(item.id));
  const googlePlace = await getGooglePlaceSnapshot(`${item.name}, ${item.address ?? ""}, ${item.city}, ${item.state}`);
  const googleReviews: ExternalReview[] = (googlePlace?.reviews ?? []).map((review, index) => ({
    id: -index - 1,
    target_type: "directory" as const,
    target_id: String(item.id),
    source: "google",
    source_label: "Google Places",
    external_id: null,
    author_name: review.authorAttribution?.displayName ?? null,
    rating: review.rating ?? null,
    title: null,
    review_text: review.text?.text ?? "",
    review_url: review.googleMapsUri ?? googlePlace?.googleMapsUri ?? null,
    published_at: review.publishTime ?? null,
    language: "en",
    verified: true,
    fetched_at: new Date().toISOString(),
  })).filter((review) => review.review_text);
  const externalReviews = [...googleReviews, ...storedReviews];
  const intelligence = summarizeExternalReviews(externalReviews);

  const gallery = [
    ...item.images,
    ...(item.imageUrl ? [item.imageUrl] : []),
    ...(googlePlace?.photos?.map((photo) => googlePhotoUrl(photo.name)).filter((value): value is string => Boolean(value)) ?? []),
  ].filter((url, index, all) => all.indexOf(url) === index).slice(0, 8);

  return (
    <main className="container py-12">
      <Link href="/directory" className="text-sm font-semibold text-indigo-600">← Back to Directory</Link>

      <div className="mt-6 overflow-hidden rounded-3xl border bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        {gallery.length ? (
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-2 sm:grid-cols-4 dark:bg-zinc-950">
            {gallery.slice(0, 4).map((url, index) => <div key={url} className={`relative overflow-hidden rounded-2xl ${index === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-auto" : "aspect-[4/3]"}`}><Image src={url} alt={`${item.name} photo ${index + 1}`} fill unoptimized sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" /></div>)}
          </div>
        ) : (
          <div className="flex min-h-48 items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-cyan-100 text-6xl dark:from-indigo-950 dark:via-zinc-900 dark:to-cyan-950">{item.categoryIcon}</div>
        )}

        <div className="p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">{item.categoryIcon} {item.categoryName}</span>
            <span className="text-sm text-gray-500">{item.city}, {item.state}</span>
            {item.verified ? <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Source linked</span> : null}
            {googlePlace ? <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">Google Places matched</span> : null}
          </div>
          <h1 className="mt-6 text-4xl font-bold">{item.name}</h1>
          {item.organizationName ? <p className="mt-2 text-lg font-semibold text-indigo-600">{item.organizationName}</p> : null}
          <p className="mt-5 max-w-4xl text-lg leading-8 text-gray-600 dark:text-gray-300">{item.description ?? `Explore information and community opinions about ${item.name}.`}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Info label="Location" value={[item.locality, item.city, item.state].filter(Boolean).join(", ")} />
            <Info label="Phone" value={googlePlace?.nationalPhoneNumber ?? item.phone ?? "Not indexed"} />
            <Info label="Rating" value={googlePlace?.rating ? `${googlePlace.rating.toFixed(1)}/5` : item.rating ? `${item.rating.toFixed(1)}/5` : "Not indexed"} />
            <Info label="Review volume" value={googlePlace?.userRatingCount ? `${googlePlace.userRatingCount.toLocaleString("en-IN")} Google ratings` : item.reviewCount ? `${item.reviewCount} indexed` : "Growing"} />
          </div>

          {item.address ? <div className="mt-6 rounded-2xl bg-slate-50 p-5 dark:bg-zinc-800"><div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Address</div><div className="mt-2 font-medium">{item.address}</div></div> : null}

          <div className="mt-8 flex flex-wrap gap-3">
            {(googlePlace?.websiteUri ?? item.website ?? item.sourceUrl) ? <a href={googlePlace?.websiteUri ?? item.website ?? item.sourceUrl ?? "#"} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700">Official / Source Website</a> : null}
            {(googlePlace?.googleMapsUri) ? <a href={googlePlace.googleMapsUri} target="_blank" rel="noopener noreferrer" className="rounded-xl border px-6 py-3 font-semibold dark:border-zinc-700">Open in Maps ↗</a> : null}
            <Link href={`/directory?category=${encodeURIComponent(item.category)}&q=${encodeURIComponent(item.organizationName ?? item.name)}`} className="rounded-xl border px-6 py-3 font-semibold dark:border-zinc-700">Find other locations</Link>
          </div>
        </div>
      </div>

      {branches.length > 1 ? (
        <section className="mt-8 rounded-3xl border bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><span className="text-sm font-semibold text-indigo-600">LOCATION NETWORK</span><h2 className="mt-1 text-2xl font-bold">{item.organizationName} — choose the exact branch</h2><p className="mt-1 text-sm text-gray-500">Experiences stay branch-specific, so a hospital, school or salon in one city does not contaminate another location.</p></div><span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold dark:bg-zinc-800">{branches.length} indexed locations</span></div>
          <form className="mt-6 grid gap-3 md:grid-cols-3"><select name="state" defaultValue={state ?? ""} className="rounded-xl border p-3 dark:border-zinc-700 dark:bg-zinc-800"><option value="">All states / UTs</option>{states.map((value) => <option key={value} value={value}>{value}</option>)}</select><select name="city" defaultValue={city ?? ""} className="rounded-xl border p-3 dark:border-zinc-700 dark:bg-zinc-800"><option value="">All cities</option>{cities.map((value) => <option key={value} value={value}>{value}</option>)}</select><button className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white">Filter Locations</button></form>
          <div className="mt-6 grid gap-4 md:grid-cols-2">{filteredBranches.map((branch) => <article key={branch.slug} className={`rounded-2xl border p-5 ${branch.slug === item.slug ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20" : "dark:border-zinc-800"}`}><div className="text-sm text-gray-500">{branch.city}, {branch.state}</div><h3 className="mt-1 text-lg font-bold">{branch.name}</h3>{branch.address ? <p className="mt-2 text-sm text-gray-500">{branch.address}</p> : null}{branch.rating !== null ? <p className="mt-3 text-sm font-semibold text-amber-600">★ {branch.rating.toFixed(1)}</p> : null}<Link href={`/directory/${branch.slug}`} className="mt-4 inline-flex rounded-xl border px-4 py-2 text-sm font-semibold dark:border-zinc-700">Open branch & opinions</Link></article>)}</div>
        </section>
      ) : null}

      <DirectoryDecisionChecklist sector={item.sector} />
      <ReviewIntelligence intelligence={intelligence} title="Cross-platform review intelligence" />
      <ExternalReviewFeed reviews={externalReviews.slice(0, 24)} />
      <CommunityOpinions entityId={item.id} locationId={null} category={item.category} entityName={item.name} />
      {item.categoryId !== null ? (
        <div className="mt-8">
          <DirectoryReviewForm entityId={item.id} entityName={item.name} />
        </div>
      ) : null}

      <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-900"><strong>Decision safety:</strong> directory information, ratings and community opinions can change. Verify current fees, timings, admissions, availability, departments, services and policies directly with the provider. External reviews remain attributed to their source.</section>
      <div className="mt-6 text-center"><Link href="/directory/suggest" className="text-sm font-semibold text-indigo-600">Can&apos;t find the exact entity? Suggest it →</Link></div>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border p-4 dark:border-zinc-800"><div className="text-xs uppercase tracking-wide text-gray-500">{label}</div><div className="mt-1 text-sm font-semibold">{value}</div></div>; }
