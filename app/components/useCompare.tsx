"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY =
  "compareItems:v2";

const MAX_ITEMS = 5;

export function useCompare() {

  const [items, setItems] =
    useState<string[]>([]);

  useEffect(() => {

    try {

      const saved =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (!saved) return;

      const parsed =
        JSON.parse(saved);

      if (Array.isArray(parsed)) {

        setItems(
          parsed.map(String)
        );

      }

    } catch (error) {

      console.error(error);

    }

  }, []);

  useEffect(() => {

    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items)
      );

    } catch (error) {

      console.error(error);

    }

  }, [items]);

  const isCompared =
    useCallback(
      (id: string) =>
        items.includes(id),
      [items]
    );

  const add =
    useCallback(
      (id: string) => {

        setItems((current) => {

          if (
            current.includes(id)
          ) {
            return current;
          }

          if (
            current.length >=
            MAX_ITEMS
          ) {

            alert(
              "You can compare a maximum of 5 products."
            );

            return current;

          }

          return [
            ...current,
            id,
          ];

        });

      },
      []
    );

  const remove =
    useCallback(
      (id: string) => {

        setItems(
          (current) =>
            current.filter(
              (item) =>
                item !== id
            )
        );

      },
      []
    );

  const toggleCompare =
    useCallback(
      (id: string) => {

        setItems((current) => {

          if (
            current.includes(id)
          ) {

            return current.filter(
              (item) =>
                item !== id
            );

          }

          if (
            current.length >=
            MAX_ITEMS
          ) {

            alert(
              "Maximum 5 products can be compared."
            );

            return current;

          }

          return [
            ...current,
            id,
          ];

        });

      },
      []
    );

  const merge =
    useCallback(
      (ids: string[]) => {

        setItems(
          (current) => {

            const merged = [
              ...current,
            ];

            ids.forEach(
              (id) => {

                if (
                  merged.includes(id)
                ) {
                  return;
                }

                if (
                  merged.length >=
                  MAX_ITEMS
                ) {
                  return;
                }

                merged.push(id);

              }
            );

            return merged;

          }
        );

      },
      []
    );

  const clear =
    useCallback(() => {

      setItems([]);

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