"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const STORAGE_KEY = "compareItems:v2";
const MAX_ITEMS = 5;

function readStoredItems(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);

    return Array.isArray(parsed)
      ? parsed.map(String).slice(0, MAX_ITEMS)
      : [];
  } catch {
    return [];
  }
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback();
  };

  const handleCompareUpdate = () => callback();

  window.addEventListener("storage", handleStorage);
  window.addEventListener("compare-items-updated", handleCompareUpdate);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("compare-items-updated", handleCompareUpdate);
  };
}

function getSnapshot() {
  return JSON.stringify(readStoredItems());
}

function getServerSnapshot() {
  return "[]";
}

function writeStoredItems(items: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("compare-items-updated"));
  } catch {
    // Storage can be unavailable in private/restricted browser contexts.
  }
}

export function useCompare() {
  const serialized = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const items = useMemo<string[]>(() => {
    try {
      const parsed: unknown = JSON.parse(serialized);
      return Array.isArray(parsed)
        ? parsed.map(String).slice(0, MAX_ITEMS)
        : [];
    } catch {
      return [];
    }
  }, [serialized]);

  const isCompared = useCallback(
    (id: string) => items.includes(String(id)),
    [items]
  );

  const add = useCallback((id: string) => {
    const value = String(id);
    const current = readStoredItems();

    if (current.includes(value)) return;

    if (current.length >= MAX_ITEMS) {
      window.alert("You can compare a maximum of 5 products.");
      return;
    }

    writeStoredItems([...current, value]);
  }, []);

  const remove = useCallback((id: string) => {
    const value = String(id);
    const current = readStoredItems();

    writeStoredItems(current.filter((item) => item !== value));
  }, []);

  const toggleCompare = useCallback((id: string) => {
    const value = String(id);
    const current = readStoredItems();

    if (current.includes(value)) {
      writeStoredItems(current.filter((item) => item !== value));
      return;
    }

    if (current.length >= MAX_ITEMS) {
      window.alert("Maximum 5 products can be compared.");
      return;
    }

    writeStoredItems([...current, value]);
  }, []);

  const merge = useCallback((ids: string[]) => {
    const current = readStoredItems();
    const merged = [...current];

    for (const rawId of ids) {
      const id = String(rawId);

      if (merged.includes(id) || merged.length >= MAX_ITEMS) continue;

      merged.push(id);
    }

    writeStoredItems(merged);
  }, []);

  const clear = useCallback(() => {
    writeStoredItems([]);
  }, []);

  return {
    compareIds: items,
    isCompared,
    add,
    remove,
    merge,
    toggleCompare,
    clear,
  } as const;
}

export default useCompare;
