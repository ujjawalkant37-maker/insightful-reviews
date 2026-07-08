"use client";
import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'compareItems:v1';
const MAX_ITEMS = 5;

export function useCompare() {
  const [items, setItems] = useState<string[]>(() => {
    try {
      if (typeof window === 'undefined') return [];
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) as string[] : [];
    } catch (e) {
      return [];
    }
  });

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

  const toggleCompare = useCallback((id: string) => {
    setItems((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : (prev.length >= MAX_ITEMS ? prev : [...prev, id])) );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  return { compareIds: items, isCompared, add, remove, toggleCompare, clear } as const;
}

export default useCompare;
