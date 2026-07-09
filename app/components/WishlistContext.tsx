"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { supabase } from "@/lib/supabase";

type WishlistContextType = {
  items: number[];
  add: (id: number) => Promise<void>;
  remove: (id: number) => Promise<void>;
  toggle: (id: number) => Promise<void>;
  isWishlisted: (id: number) => boolean;
  count: number;
  clear: () => Promise<void>;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<number[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    loadWishlist();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadWishlist();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function loadWishlist() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setItems([]);
      setUserId(null);
      return;
    }

    setUserId(user.id);

    const { data } = await supabase
      .from("wishlist")
      .select("product_id")
      .eq("user_id", user.id);

    setItems((data ?? []).map((x: any) => x.product_id));
  }

  async function add(id: number) {
    if (!userId) return;

    await supabase.from("wishlist").insert({
      user_id: userId,
      product_id: id,
    });

    setItems((s) => [...new Set([...s, id])]);
  }

  async function remove(id: number) {
    if (!userId) return;

    await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", userId)
      .eq("product_id", id);

    setItems((s) => s.filter((x) => x !== id));
  }

  async function toggle(id: number) {
    if (items.includes(id)) {
      await remove(id);
    } else {
      await add(id);
    }
  }

  async function clear() {
    if (!userId) return;

    await supabase.from("wishlist").delete().eq("user_id", userId);

    setItems([]);
  }

  function isWishlisted(id: number) {
    return items.includes(id);
  }

  const value = useMemo(
    () => ({
      items,
      add,
      remove,
      toggle,
      isWishlisted,
      count: items.length,
      clear,
    }),
    [items]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);

  if (!ctx) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }

  return ctx;
}