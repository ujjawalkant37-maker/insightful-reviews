"use client";

import { useState } from "react";
import {
  Share2,
  Copy,
  Check,
} from "lucide-react";

type Props = {
  title: string;
  url?: string;
  description?: string;
};

export default function ShareReport({
  title,
  url,
  description = "",
}: Props) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    url ||
    (typeof window !== "undefined"
      ? window.location.href
      : "");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Unable to copy link:", error);
    }
  }

  async function nativeShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "Unable to share report:",
          error
        );
      }
    } else {
      await copyLink();
    }
  }

  const twitterUrl =
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(title)}`;

  const facebookUrl =
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;

  const linkedinUrl =
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`;

  return (
    <section>
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
            📤 Share Report
          </span>

          <h2 className="mt-5 text-3xl font-bold">
            Share AI Product Report
          </h2>

          <p className="mt-3 text-gray-500">
            Share this AI report with friends, family or
            colleagues.
          </p>
        </div>
      </div>

      {/* Share Buttons */}

      <div className="mt-10 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={() => void nativeShare()}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
        >
          <Share2 size={18} />
          Share
        </button>

        <button
          type="button"
          onClick={() => void copyLink()}
          className="flex items-center gap-2 rounded-xl border px-6 py-3 transition hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          {copied ? (
            <Check size={18} />
          ) : (
            <Copy size={18} />
          )}

          {copied ? "Copied!" : "Copy Link"}
        </button>

        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl border px-6 py-3 transition hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          <Share2 size={18} />
          X / Twitter
        </a>

        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl border px-6 py-3 transition hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          <Share2 size={18} />
          Facebook
        </a>

        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl border px-6 py-3 transition hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          <Share2 size={18} />
          LinkedIn
        </a>
      </div>

      {/* Report Link */}

      <div className="mt-10 rounded-2xl bg-slate-50 p-5 dark:bg-zinc-800">
        <div className="text-sm font-semibold text-gray-500">
          Report Link
        </div>

        <div className="mt-3 break-all rounded-xl border bg-white p-4 text-sm dark:border-zinc-700 dark:bg-zinc-900">
          {shareUrl}
        </div>
      </div>
    </section>
  );
}