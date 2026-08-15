"use client";

import { useState, useSyncExternalStore } from "react";
import { Bell } from "lucide-react";

const STORAGE_KEY = "ir_notification_count";

function getSnapshot() {
  if (typeof window === "undefined") return 0;
  const stored = Number(window.localStorage.getItem(STORAGE_KEY) ?? "0");
  return Number.isFinite(stored) && stored >= 0 ? stored : 0;
}

function getServerSnapshot() {
  return 0;
}

function subscribe(callback: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback();
  };

  window.addEventListener("storage", handleStorage);
  return () => window.removeEventListener("storage", handleStorage);
}

export default function NotificationBell() {
  const count = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [open, setOpen] = useState(false);

  function clear() {
    window.localStorage.setItem(STORAGE_KEY, "0");
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY, newValue: "0" }));
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative rounded-xl border p-2 hover:bg-gray-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        aria-label="Notifications"
        aria-expanded={open}
      >
        <Bell size={19} />
        {count > 0 ? (
          <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-red-600 px-1 text-center text-xs font-bold text-white">
            {count}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-72 rounded-2xl border bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between">
            <strong>Notifications</strong>
            <button type="button" onClick={clear} className="text-xs text-indigo-600">
              Clear
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            {count ? "You have new updates." : "No new notifications."}
          </p>
          <p className="mt-3 text-xs leading-5 text-gray-400">
            Future price-drop, wishlist and reply events can populate this panel from Supabase.
          </p>
        </div>
      ) : null}
    </div>
  );
}
