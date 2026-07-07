import React from 'react';
import { getProductBySlug, getCategories } from '../../../../lib/db';
import Breadcrumbs from '../../../components/Breadcrumbs';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Product not found' };
  return { title: `${product.name} - Insightful Reviews`, description: product.summary };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  const categories = await getCategories();
  if (!product) {
    return (
      <div className="container py-12">
        <h1 className="text-2xl font-semibold">Product not found</h1>
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.categoryId);

  return (
    <div className="container py-12">
      <Breadcrumbs items={[{ href: '/products', label: 'Products' }, { href: `/products?category=${product.categoryId}`, label: category?.name ?? 'Category' }, { label: product.name }]} />

      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-zinc-50">{product.name}</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-zinc-300">{product.summary}</p>

          <section className="mt-6">
            <h3 className="text-lg font-medium">Specifications</h3>
            <dl className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {product.specs && Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="text-sm text-gray-700 dark:text-zinc-300">
                  <dt className="font-medium">{k}</dt>
                  <dd className="mt-1">{v}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        <aside className="md:col-span-1 rounded-md border border-gray-100 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900">
          <div className="text-sm text-gray-600 dark:text-zinc-300">Price</div>
          <div className="mt-1 text-xl font-semibold text-gray-900 dark:text-zinc-50">{product.price}</div>
          <div className="mt-3 text-yellow-500">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</div>
        </aside>
      </div>
    </div>
  );
}
