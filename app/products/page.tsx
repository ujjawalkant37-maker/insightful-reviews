import React from 'react';
import productsData from '@/data/products.json';
import ProductList from '@/components/ProductList';
import ListSearchFilter from '@/components/ListSearchFilter';
import type { Metadata } from 'next';
import type { Product } from '@/types/models';
import type { Category } from '@/types/models';

const categories: Category[] = [
  { id: 'smartphones', name: 'Smartphones', slug: 'smartphones', description: 'Handheld devices: cameras, performance and battery comparisons.' },
  { id: 'laptops', name: 'Laptops', slug: 'laptops', description: 'Portable computers: productivity and battery life analysis.' },
  { id: 'tvs', name: 'TVs', slug: 'tvs', description: 'Televisions: picture quality, HDR and smart features.' },
  { id: 'appliances', name: 'Appliances', slug: 'appliances', description: 'Home appliances: efficiency, durability and performance.' },
];

const products = productsData as unknown as Product[];

function filterProducts(query?: string, categoryId?: string) {
  return products.filter((product) => {
    if (categoryId && product.categoryId !== categoryId) {
      return false;
    }
    if (!query) {
      return true;
    }
    const q = query.toLowerCase();
    return (
      product.name.toLowerCase().includes(q) ||
      product.summary.toLowerCase().includes(q) ||
      product.categoryId.toLowerCase().includes(q)
    );
  });
}

export const metadata: Metadata = {
  title: 'Products - Insightful Reviews',
  description: 'Browse products and reviews',
};

export default async function ProductsPage({ searchParams }: { searchParams?: { q?: string; category?: string } }) {
  const q = searchParams?.q;
  const category = searchParams?.category;
  const filteredProducts = filterProducts(q, category);

  return (
    <div className="container py-12">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-zinc-50">Products</h1>
      <p className="mt-1 text-sm text-gray-600 dark:text-zinc-300">Find the best products, read expert summaries and user feedback.</p>

      <div className="mt-6">
        <ListSearchFilter categories={categories.map((c) => ({ id: c.id, name: c.name }))} />
      </div>

      <div className="mt-6">
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
}
