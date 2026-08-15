import Link from "next/link";
import {
  getDirectoryCategories,
  getStates,
  getCities,
  getGroups,
  filterDirectory,
} from "@/lib/directory";

export const metadata = {
  title: "India Directory — Hospitals, Schools, Colleges, Services | Insightful Reviews",
  description:
    "Search hospitals, schools, colleges, hotels, banks, services and other real-world places across India.",
};

type SearchParams = Promise<{
  category?: string;
  q?: string;
  state?: string;
  city?: string;
  group?: string;
  page?: string;
}>;

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const q = params.q?.trim() || "";
  const category = params.category?.trim() || "";
  const state = params.state?.trim() || "";
  const city = params.city?.trim() || "";
  const group = params.group?.trim() || "";
  const requestedPage = Number.parseInt(params.page ?? "1", 10);
  const page = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const pageSize = 24;
  const offset = (page - 1) * pageSize;

  const hasSearch =
    Boolean(q) ||
    Boolean(category) ||
    Boolean(state) ||
    Boolean(city) ||
    Boolean(group);

  /*
   * Load only the metadata required to render the search interface.
   */
  let categories: Awaited<ReturnType<typeof getDirectoryCategories>> = [];
  let states: string[] = [];

  try {
    [categories, states] = await Promise.all([
      getDirectoryCategories(),
      getStates(),
    ]);
  } catch (error) {
    console.error("Directory metadata error:", error);
  }

  /*
   * Load cities/groups only when required.
   */
  let cities: string[] = [];
  let groups: string[] = [];

  if (state) {
    try {
      cities = await getCities(state);
    } catch (error) {
      console.error("Directory cities error:", error);
    }
  }

  if (category) {
    try {
      groups = await getGroups(category);
    } catch (error) {
      console.error("Directory groups error:", error);
    }
  }

  /*
   * IMPORTANT:
   * Do not query the directory until the user actually searches
   * or selects a filter.
   */
  let results: Awaited<ReturnType<typeof filterDirectory>> = [];

  if (hasSearch) {
    try {
      results = await filterDirectory({
        q: q || undefined,
        category: category || undefined,
        state: state || undefined,
        city: city || undefined,
        group: group || undefined,
        limit: pageSize + 1,
        offset,
      });
    } catch (error) {
      console.error("Directory search error:", error);
      results = [];
    }
  }

  const healthcare = categories.filter((c) =>
    ["hospitals", "clinics", "diagnostic-centres", "pharmacies", "dental-clinics", "eye-care", "physiotherapy", "mental-wellness"].includes(
      c.slug
    )
  );

  const otherCategories = categories.filter(
    (c) => !healthcare.some((h) => h.slug === c.slug)
  );

  const hasNextPage = results.length > pageSize;
  if (hasNextPage) results = results.slice(0, pageSize);
  const buildPageUrl = (nextPage: number) => {
    const search = new URLSearchParams();
    if (q) search.set("q", q);
    if (category) search.set("category", category);
    if (state) search.set("state", state);
    if (city) search.set("city", city);
    if (group) search.set("group", group);
    if (nextPage > 1) search.set("page", String(nextPage));
    return `/directory?${search.toString()}`;
  };

  return (
    <main className="container py-10">
      {/* HERO */}
      <section className="rounded-3xl bg-gradient-to-r from-indigo-700 via-violet-700 to-cyan-600 p-8 text-white shadow-xl sm:p-10">
        <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
          🌐 India-wide decision directory
        </span>

        <h1 className="mt-6 max-w-5xl text-4xl font-bold leading-tight sm:text-5xl">
          Find the right place, the right branch and the real-world
          experience.
        </h1>

        <p className="mt-4 max-w-4xl text-indigo-100">
          Search hospitals, schools, colleges, hotels, banks, organisations
          and local services by name, category, state and city.
        </p>
      </section>

      {/* SEARCH */}
      <section className="mt-7 rounded-2xl border bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <form method="GET" action="/directory">
          <div className="grid gap-3 md:grid-cols-5">
            {/* SEARCH TEXT */}
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Apollo, AIIMS, school, hotel..."
              className="min-w-0 rounded-xl border px-4 py-3 outline-none focus:border-indigo-500 dark:border-zinc-700 dark:bg-zinc-800"
            />

            {/* CATEGORY */}
            <select
              name="category"
              defaultValue={category}
              className="rounded-xl border px-3 py-3 dark:border-zinc-700 dark:bg-zinc-800"
            >
              <option value="">All categories</option>

              {categories.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.icon ? `${item.icon} ` : ""}
                  {item.name}
                </option>
              ))}
            </select>

            {/* STATE */}
            <select
              name="state"
              defaultValue={state}
              className="rounded-xl border px-3 py-3 dark:border-zinc-700 dark:bg-zinc-800"
            >
              <option value="">All states / UTs</option>

              {states.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* CITY */}
            <select
              name="city"
              defaultValue={city}
              className="rounded-xl border px-3 py-3 dark:border-zinc-700 dark:bg-zinc-800"
            >
              <option value="">All cities</option>

              {cities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            {/* GROUP */}
            <select
              name="group"
              defaultValue={group}
              className="rounded-xl border px-3 py-3 dark:border-zinc-700 dark:bg-zinc-800"
            >
              <option value="">All organisations / groups</option>

              {groups.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="mt-3 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Search Directory
          </button>
        </form>
      </section>

      {/* SEARCH RESULT AREA */}
      {hasSearch ? (
        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Directory Results</h2>

              <p className="mt-1 text-sm text-gray-500">
                {results.length} result{results.length === 1 ? "" : "s"} found
              </p>
            </div>

            <Link
              href="/directory"
              prefetch={false}
              className="rounded-lg border px-4 py-2 text-sm font-semibold hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Clear
            </Link>
          </div>

          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-10 text-center">
              <div className="text-4xl">🔎</div>

              <h3 className="mt-4 text-xl font-bold">
                No matching places found
              </h3>

              <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
                Try a different spelling, remove a filter, or search by
                organisation name.
              </p>

              <Link
                href="/directory"
                prefetch={false}
                className="mt-5 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white"
              >
                Browse Directory
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {results.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div
                    className="relative h-40 overflow-hidden bg-cover bg-center bg-gradient-to-br from-indigo-100 via-white to-cyan-100 dark:from-indigo-950 dark:via-zinc-900 dark:to-cyan-950"
                    style={item.imageUrl ? { backgroundImage: `url("${item.imageUrl}")` } : undefined}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-3xl drop-shadow">
                      {item.categoryIcon || "📍"}
                    </div>
                    <div className="absolute bottom-4 left-14 text-xs font-bold uppercase tracking-wider text-white drop-shadow">
                      {item.categoryName}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold">
                      {item.name}
                    </h3>

                    {item.organizationName ? (
                      <p className="mt-1 text-sm font-medium text-indigo-600">
                        {item.organizationName}
                      </p>
                    ) : null}

                    <div className="mt-3 space-y-1 text-sm text-gray-500">
                      {item.city ? <div>📍 {item.city}</div> : null}

                      {item.district ? (
                        <div>{item.district}</div>
                      ) : null}

                      {item.state ? <div>{item.state}</div> : null}
                    </div>

                    {item.address ? (
                      <p className="mt-3 line-clamp-2 text-xs text-gray-500">
                        {item.address}
                      </p>
                    ) : null}

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.rating !== null &&
                      item.rating !== undefined ? (
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                          ★ {Number(item.rating).toFixed(1)}
                        </span>
                      ) : null}

                      {item.verified ? (
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          ✓ Verified source
                        </span>
                      ) : null}
                    </div>

                    <Link
                      href={`/directory/${item.slug}`}
                      prefetch={false}
                      className="mt-5 block rounded-xl bg-indigo-600 px-4 py-3 text-center font-semibold text-white hover:bg-indigo-700"
                    >
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {results.length > 0 && (page > 1 || hasNextPage) ? (
            <div className="mt-7 flex items-center justify-center gap-3">
              {page > 1 ? (
                <Link
                  href={buildPageUrl(page - 1)}
                  prefetch={false}
                  className="rounded-xl border px-5 py-3 text-sm font-semibold hover:bg-slate-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  ← Previous
                </Link>
              ) : null}
              <span className="rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold dark:bg-zinc-800">
                Page {page}
              </span>
              {hasNextPage ? (
                <Link
                  href={buildPageUrl(page + 1)}
                  prefetch={false}
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Next →
                </Link>
              ) : null}
            </div>
          ) : null}
        </section>
      ) : (
        <>
          {/* CATEGORY EXPLORER */}
          <section className="mt-12">
            <div>
              <h2 className="text-2xl font-bold">
                Explore every major sector
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                From hospitals and schools to banks, hotels, cars, property
                and local services.
              </p>
            </div>

            {/* HEALTHCARE */}
            {healthcare.length > 0 ? (
              <div className="mt-7">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-gray-500">
                  Healthcare
                </h3>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {healthcare.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/directory?category=${encodeURIComponent(
                        item.slug
                      )}`}
                      prefetch={false}
                      className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
                    >
                      <div className="text-4xl">
                        {item.icon || "🏥"}
                      </div>

                      <h4 className="mt-3 font-bold">
                        {item.name}
                      </h4>

                      <p className="mt-2 text-sm text-gray-500">
                        {item.description}
                      </p>

                      <span className="mt-4 inline-block text-sm font-semibold text-indigo-600">
                        Explore →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            {/* OTHER CATEGORIES */}
            {otherCategories.length > 0 ? (
              <div className="mt-10">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-gray-500">
                  More categories
                </h3>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {otherCategories.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/directory?category=${encodeURIComponent(
                        item.slug
                      )}`}
                      prefetch={false}
                      className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
                    >
                      <div className="text-4xl">
                        {item.icon || "📍"}
                      </div>

                      <h4 className="mt-3 font-bold">
                        {item.name}
                      </h4>

                      <p className="mt-2 text-sm text-gray-500">
                        {item.description}
                      </p>

                      <span className="mt-4 inline-block text-sm font-semibold text-indigo-600">
                        Explore →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </section>

          {/* EMPTY STATE */}
          <section className="mt-12 rounded-2xl border border-dashed p-10 text-center">
            <div className="text-4xl">🔎</div>

            <h2 className="mt-4 text-xl font-bold">
              Search the India-wide directory
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-sm text-gray-500">
              Select a category above or use the search box to find a
              hospital, school, college, organisation, hotel or service.
            </p>
          </section>
        </>
      )}

      {/* SUGGEST */}
      <section className="mt-12 rounded-2xl border bg-slate-50 p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-xl font-bold">
          Missing a hospital, school, college or local business?
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
          Suggest a place and build a permanent community page with
          branch-level information, opinions and source-linked information.
        </p>

        <Link
          href="/directory/suggest"
          prefetch={false}
          className="mt-4 inline-flex rounded-xl border border-indigo-600 px-5 py-3 font-semibold text-indigo-600"
        >
          + Suggest a Place
        </Link>
      </section>
    </main>
  );
}