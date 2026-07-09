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
  items: string[];
  add: (id: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  toggle: (id: string) => Promise<void>;
  isWishlisted: (id: string) => boolean;
  count: number;
  clear: () => Promise<void>;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      init();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function init() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setUserId(null);
      setItems([]);
      return;
    }

    setUserId(user.id);
    await loadWishlist(user.id);
  }

  async function loadWishlist(uid: string) {
    const { data, error } = await supabase
      .from("wishlist")
      .select("product_id")
      .eq("user_id", uid);

    if (error) {
      console.error(error);
      return;
    }

    setItems((data ?? []).map((row: any) => String(row.product_id)));
  }

  async function add(id: string) {
    if (!userId) return;

    if (items.includes(id)) return;

    const { error } = await supabase.from("wishlist").insert({
      user_id: userId,
      product_id: id,
    });

    if (error) {
      console.error(error);
      return;
    }

    setItems((prev) => [...prev, id]);
  }

  async function remove(id: string) {
    if (!userId) return;

    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", userId)
      .eq("product_id", id);

    if (error) {
      console.error(error);
      return;
    }

    setItems((prev) => prev.filter((x) => x !== id));
  }

  async function toggle(id: string) {
    if (items.includes(id)) {
      await remove(id);
    } else {
      await add(id);
    }
  }

  function isWishlisted(id: string) {
    return items.includes(id);
  }

  async function clear() {
    if (!userId) return;

    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      return;
    }

    setItems([]);
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
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used within WishlistProvider"
    );
  }

  return context;
}