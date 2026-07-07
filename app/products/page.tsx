import React from 'react';
import { getCategories, searchProducts } from '../../lib/db';
import ProductList from '../components/ProductList';
import ListSearchFilter from '../components/ListSearchFilter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products - Insightful Reviews',
  description: 'Browse products and reviews',
};

export default async function ProductsPage({ searchParams }: { searchParams?: { q?: string; category?: string } }) {
  const q = searchParams?.q;
  const category = searchParams?.category;
  const [categories, products] = await Promise.all([getCategories(), searchProducts(q, category)]);

  return (
    <div className="container py-12">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-zinc-50">Products</h1>
      <p className="mt-1 text-sm text-gray-600 dark:text-zinc-300">Find the best products, read expert summaries and user feedback.</p>

      <div className="mt-6">
        {/* Client filter/search */}
        <ListSearchFilter categories={categories.map((c) => ({ id: c.id, name: c.name }))} />
      </div>

      <div className="mt-6">
        <ProductList products={products} />
      </div>
    </div>
  );
}
