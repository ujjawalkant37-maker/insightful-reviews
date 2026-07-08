import React from 'react';
import type { Metadata } from 'next';
import type { Product, Category } from '@/types/models';
import ProductGallery from '@/components/ProductGallery';
import ProductFilters from '@/components/ProductFilters';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';

const products = productsData as unknown as Product[];
const categories = categoriesData as Category[];
const categoryMap: Record<string, string> = categories.reduce((map, category) => {
  map[category.id] = category.name;
  return map;
}, {} as Record<string, string>);

export const metadata: Metadata = {
  title: 'Products - Insightful Reviews',
  description: 'Browse the full product catalog.',
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  // passing categories to the client-side filters UI; server-side page still
  // receives filters via searchParams which ProductGallery will receive via props
  const categoryFilter = searchParams?.category;
  const filteredProducts = categoryFilter
    ? products.filter((product) => product.categoryId === categoryFilter)
    : products;

  return (
    <div className="container py-6">
      <React.Suspense fallback={<div className="mb-4">Loading filters…</div>}>
        <ProductFilters categories={categories} />
      </React.Suspense>
      <ProductGallery products={filteredProducts} categoryMap={categoryMap} />
    </div>
  );
}
