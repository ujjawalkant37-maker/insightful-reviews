"use client";
import React, { useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import ProductGallery from "./ProductGallery";
import type { Product } from '../../types/models';
import rawProducts from '../../data/products.json';
import categories from '../../data/categories.json';

const products = rawProducts as Product[];
const categoryMap: Record<string, string> = categories.reduce((map, category) => {
  map[category.id] = category.name;
  return map;
}, {} as Record<string, string>);

function normalizeSearchText(product: Product) {
  return [product.name, product.summary, categoryMap[product.categoryId] ?? product.categoryId]
    .join(" ")
    .toLowerCase();
}

export default function HomeCatalog() {
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (!query) return products;
    const lowerQuery = query.toLowerCase();
    return products.filter((product) => normalizeSearchText(product).includes(lowerQuery));
  }, [query]);

  return (
    <div>
      <SearchBar onSearch={setQuery} />
      <ProductGallery products={filteredProducts} categoryMap={categoryMap} />
    </div>
  );
}
