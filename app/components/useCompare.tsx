"use client";
import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'compareItems:v1';
const MAX_ITEMS = 5;

export function useCompare() {
  // start with a stable empty array so server and client markup match during
  // hydration. Read and write localStorage only inside effects to avoid
  // hydration mismatches.
  const [items, setItems] = useState<string[]>([]);

  // hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const loaded = raw ? (JSON.parse(raw) as string[]) : [];
      setItems(loaded);
    } catch (e) {
      // ignore
    }
  }, []);

  // persist whenever items change (on client)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  const isCompared = useCallback((id: string) => items.includes(id), [items]);

  const add = useCallback((id: string) => {
    setItems((prev) => {
      if (prev.includes(id)) return prev;
      if (prev.length >= MAX_ITEMS) {
        // simple user feedback
        try { window.alert('You can compare up to 5 products only.'); } catch (e) { /* ignore */ }
        return prev;
      }
      return [...prev, id];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p !== id));
  }, []);

  const merge = useCallback((ids: string[]) => {
    setItems((prev) => {
      const merged = [...prev];
      for (const id of ids) {
        if (merged.includes(id)) continue;
        if (merged.length >= MAX_ITEMS) break;
        merged.push(id);
      }
      return merged;
    });
  }, []);

  const toggleCompare = useCallback((id: string) => {
    setItems((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : (prev.length >= MAX_ITEMS ? prev : [...prev, id])) );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  return { compareIds: items, isCompared, add, remove, merge, toggleCompare, clear } as const;
}

export default useCompare;
