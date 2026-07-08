"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'wishlist:v1';

type WishlistContextType = {
  items: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  count: number;
  clear: () => void;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      // ignore
    }
  }, [items]);

  const add = (id: string) => setItems((s) => Array.from(new Set([...s, id])));
  const remove = (id: string) => setItems((s) => s.filter((x) => x !== id));
  const toggle = (id: string) => setItems((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const isWishlisted = (id: string) => items.includes(id);
  const clear = () => setItems([]);

  const value = useMemo(() => ({ items, add, remove, toggle, isWishlisted, count: items.length, clear }), [items]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
