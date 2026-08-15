/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type CommunityOpinion = {
  id: number;
  name: string | null;
  rating: number;
  title: string | null;
  review: string | null;
  pros: string[] | null;
  cons: string[] | null;
  would_recommend: boolean | null;
  experience_type: string | null;
  helpful: number;
  not_helpful: number;
  created_at: string;
};

type CommunityOpinionsProps = {
  entityId?: number | null;
  locationId?: number | null;
  category?: string;
  entityName?: string;
};

type ReviewRow = {
  id: number;
  rating: number;
  title: string | null;
  review: string | null;
  pros: string[] | null;
  cons: string[] | null;
  would_recommend: boolean | null;
  experience_type: string | null;
  helpful: number | null;
  not_helpful: number | null;
  created_at: string;
  profiles:
    | { full_name: string | null }
    | { full_name: string | null }[]
    | null;
};

export default function CommunityOpinions({
  entityId = null,
  locationId = null,
  category = "directory",
  entityName = "this place",
}: CommunityOpinionsProps) {
  const [opinions, setOpinions] = useState<CommunityOpinion[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  void locationId;

  const categoryLabel = useMemo(
    () => category.replace(/-/g, " "),
    [category]
  );

  const refreshOpinions = useCallback(async () => {
    if (!entityId) {
      setOpinions([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("directory_reviews")
      .select(
        `
          id,
          rating,
          title,
          review,
          pros,
          cons,
          would_recommend,
          experience_type,
          helpful,
          not_helpful,
          created_at,
          profiles (
            full_name
          )
        `
      )
      .eq("entity_id", entityId)
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("CommunityOpinions error:", error);
      setOpinions([]);
      setMessage("Community opinions are temporarily unavailable.");
      setLoading(false);
      return;
    }

    const rows = (data ?? []) as unknown as ReviewRow[];

    const mapped: CommunityOpinion[] = rows.map((item) => {
      const profile = Array.isArray(item.profiles)
        ? item.profiles[0]
        : item.profiles;

      return {
        id: item.id,
        name: profile?.full_name ?? null,
        rating: item.rating,
        title: item.title,
        review: item.review,
        pros: item.pros,
        cons: item.cons,
        would_recommend: item.would_recommend,
        experience_type: item.experience_type,
        helpful: item.helpful ?? 0,
        not_helpful: item.not_helpful ?? 0,
        created_at: item.created_at,
      };
    });

    setOpinions(mapped);
    setLoading(false);
  }, [entityId]);

  // Supabase is an external data source; this effect refreshes its state when the entity changes.
  useEffect(() => {
    void refreshOpinions();
  }, [refreshOpinions]);

  if (!entityId) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-indigo-600">
          Community opinions
        </div>

        <h2 className="text-xl font-bold text-slate-900">
          What people think about {entityName}
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          Community opinions will appear here once this {categoryLabel} has
          been added to the directory.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <div className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
          Community opinions
        </div>

        <h2 className="mt-1 text-2xl font-bold text-slate-900">
          What people think about {entityName}
        </h2>

        <p className="mt-2 text-sm text-slate-600">
          Independent opinions from people with experience of this{" "}
          {categoryLabel}.
        </p>
      </div>

      {loading ? (
        <div className="py-8 text-center text-sm text-slate-500">
          Loading community opinions…
        </div>
      ) : message ? (
        <div className="rounded-xl bg-slate-50 p-5 text-sm text-slate-600">
          {message}
        </div>
      ) : opinions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
          <h3 className="font-semibold text-slate-900">
            No community opinions yet
          </h3>

          <p className="mt-2 text-sm text-slate-600">
            Be the first person to share your experience of {entityName}.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {opinions.map((opinion) => (
            <article
              key={opinion.id}
              className="rounded-xl border border-slate-200 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-semibold text-slate-900">
                    {opinion.name || "Community member"}
                  </div>

                  {opinion.experience_type && (
                    <div className="mt-1 text-xs text-slate-500">
                      {opinion.experience_type}
                    </div>
                  )}
                </div>

                <div className="font-semibold text-amber-500">
                  {"★".repeat(Math.max(0, Math.min(5, opinion.rating)))}
                  <span className="ml-1 text-slate-400">
                    {opinion.rating}/5
                  </span>
                </div>
              </div>

              {opinion.title && (
                <h3 className="mt-4 font-semibold text-slate-900">
                  {opinion.title}
                </h3>
              )}

              {opinion.review && (
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
                  {opinion.review}
                </p>
              )}

              {(opinion.pros?.length || opinion.cons?.length) ? (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {opinion.pros && opinion.pros.length > 0 && (
                    <div>
                      <div className="mb-2 text-sm font-semibold text-emerald-700">
                        Pros
                      </div>

                      <ul className="space-y-1 text-sm text-slate-600">
                        {opinion.pros.map((item, index) => (
                          <li key={`${opinion.id}-pro-${index}`}>+ {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {opinion.cons && opinion.cons.length > 0 && (
                    <div>
                      <div className="mb-2 text-sm font-semibold text-red-700">
                        Cons
                      </div>

                      <ul className="space-y-1 text-sm text-slate-600">
                        {opinion.cons.map((item, index) => (
                          <li key={`${opinion.id}-con-${index}`}>− {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : null}

              <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
                {opinion.would_recommend !== null && (
                  <span>
                    {opinion.would_recommend
                      ? "✓ Would recommend"
                      : "✕ Would not recommend"}
                  </span>
                )}

                <span>Helpful: {opinion.helpful}</span>

                <span>
                  {new Date(opinion.created_at).toLocaleDateString("en-IN")}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
