"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { supabase } from "@/lib/supabase";

export type WishlistToggleResult =
  | "added"
  | "removed"
  | "auth-required"
  | "error";

type WishlistContextType = {
  items: string[];
  isReady: boolean;
  add: (id: string) => Promise<boolean>;
  remove: (id: string) => Promise<boolean>;
  toggle: (id: string) => Promise<WishlistToggleResult>;
  isWishlisted: (id: string) => boolean;
  count: number;
  clear: () => Promise<boolean>;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const normalizeId = useCallback((id: string) => String(id), []);

  const getCurrentUserId = useCallback(async () => {
    if (userId) return userId;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    setUserId(user.id);
    return user.id;
  }, [userId]);

  const loadWishlist = useCallback(
    async (nextUserId?: string) => {
      setIsReady(false);

      const resolvedUserId =
        nextUserId ?? (await getCurrentUserId());

      if (!resolvedUserId) {
        setItems([]);
        setUserId(null);
        setIsReady(true);
        return;
      }

      setUserId(resolvedUserId);

      const { data, error } = await supabase
        .from("wishlist")
        .select("product_id")
        .eq("user_id", resolvedUserId);

      if (error) {
        console.error("Unable to load wishlist:", error);
        setItems([]);
        setIsReady(true);
        return;
      }

      const nextItems = (data ?? []).map(
        (x: { product_id: number }) => String(x.product_id)
      );

      setItems(Array.from(new Set(nextItems)));
      setIsReady(true);
    },
    [getCurrentUserId]
  );

  const add = useCallback(
    async (id: string) => {
      const resolvedUserId = await getCurrentUserId();

      if (!resolvedUserId) return false;

      const productId = Number(id);

      if (Number.isNaN(productId)) {
        console.error("Invalid product id:", id);
        return false;
      }

      if (items.includes(String(productId))) return true;

      const { error } = await supabase.from("wishlist").insert({
        user_id: resolvedUserId,
        product_id: productId,
      });

      if (error) {
        console.error("Unable to add wishlist item:", error);
        return false;
      }

      setItems((current) =>
        current.includes(String(productId))
          ? current
          : [...current, String(productId)]
      );

      return true;
    },
    [getCurrentUserId, items]
  );

  const remove = useCallback(
    async (id: string) => {
      const resolvedUserId = await getCurrentUserId();

      if (!resolvedUserId) return false;

      const productId = Number(id);

      const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", resolvedUserId)
        .eq("product_id", productId);

      if (error) {
        console.error("Unable to remove wishlist item:", error);
        return false;
      }

      setItems((current) =>
        current.filter((itemId) => itemId !== String(productId))
      );

      return true;
    },
    [getCurrentUserId]
  );

  const toggle = useCallback(
    async (id: string): Promise<WishlistToggleResult> => {
      const productId = normalizeId(id);

      if (items.includes(productId)) {
        const ok = await remove(productId);
        return ok ? "removed" : "error";
      }

      const ok = await add(productId);

      if (ok) return "added";

      const resolvedUserId = await getCurrentUserId();
      return resolvedUserId ? "error" : "auth-required";
    },
    [add, getCurrentUserId, items, normalizeId, remove]
  );

  const isWishlisted = useCallback(
    (id: string) => items.includes(normalizeId(id)),
    [items, normalizeId]
  );

  const clear = useCallback(async () => {
    const resolvedUserId = await getCurrentUserId();

    if (!resolvedUserId) {
      setItems([]);
      return true;
    }

    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", resolvedUserId);

    if (error) return false;

    setItems([]);
    return true;
  }, [getCurrentUserId]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadWishlist();
    }, 0);

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setUserId(null);
        setItems([]);
        setIsReady(true);
        return;
      }

      void loadWishlist(session.user.id);
    });

    return () => {
      window.clearTimeout(timer);
      subscription.unsubscribe();
    };
  }, [loadWishlist]);

  const value = useMemo(
    () => ({
      items,
      isReady,
      add,
      remove,
      toggle,
      isWishlisted,
      count: items.length,
      clear,
    }),
    [items, isReady, add, remove, toggle, isWishlisted, clear]
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
    throw new Error("useWishlist must be used within WishlistProvider");
  }

  return context;
}
