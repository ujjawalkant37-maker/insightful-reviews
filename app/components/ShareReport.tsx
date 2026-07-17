"use client";

import { useState } from "react";
import {
  Share2,
  Copy,
  Check,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";

type Props = {
  title: string;
  url?: string;
  description?: string;
};

export default function ShareReport({
  title,
  url = typeof window !== "undefined"
    ? window.location.href
    : "",
  description = "",
}: Props) {
  const [copied, setCopied] =
    useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  async function nativeShare() {
    if (
      navigator.share
    ) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      copyLink();
    }
  }

  return (
    <section className="rounded-3xl border bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      <div className="flex items-center justify-between">

        <div>

          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
            📤 Share Report
          </span>

          <h2 className="mt-5 text-3xl font-bold">
            Share AI Product Report
          </h2>

          <p className="mt-3 text-gray-500">
            Share this AI report with
            friends, family or colleagues.
          </p>

        </div>

      </div>

      <div className="mt-10 flex flex-wrap gap-4">

        <button
          onClick={nativeShare}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          <Share2 size={18} />

          Share
        </button>

        <button
          onClick={copyLink}
          className="flex items-center gap-2 rounded-xl border px-6 py-3 hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          {copied ? (
            <Check size={18} />
          ) : (
            <Copy size={18} />
          )}

          {copied
            ? "Copied!"
            : "Copy Link"}
        </button>

        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(
            title
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl border px-6 py-3 hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          <Twitter size={18} />

          X / Twitter
        </a>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl border px-6 py-3 hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          <Facebook size={18} />

          Facebook
        </a>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            url
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl border px-6 py-3 hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          <Linkedin size={18} />

          LinkedIn
        </a>

      </div>

      <div className="mt-10 rounded-2xl bg-slate-50 p-5 dark:bg-zinc-800">

        <div className="text-sm font-semibold text-gray-500">
          Report Link
        </div>

        <div className="mt-3 break-all rounded-xl border bg-white p-4 text-sm dark:border-zinc-700 dark:bg-zinc-900">
          {url}
        </div>

      </div>

    </section>
  );
}