import React from 'react';
import productsData from '@/data/products.json';
import Breadcrumbs from '@/components/Breadcrumbs';
import AIReviewSummary from '@/components/AIReviewSummary';
import CompareButton from '@/components/CompareButton';
import Reviews from '@/components/Reviews';
import WishlistButton from '@/components/WishlistButton';
import type { Metadata } from 'next';
import type { Product, Category } from '@/types/models';

const products = productsData as unknown as Product[];
const categories: Category[] = [
  { id: 'smartphones', name: 'Smartphones', slug: 'smartphones', description: 'Handheld devices: cameras, performance and battery comparisons.' },
  { id: 'laptops', name: 'Laptops', slug: 'laptops', description: 'Portable computers: productivity and battery life analysis.' },
  { id: 'tvs', name: 'TVs', slug: 'tvs', description: 'Televisions: picture quality, HDR and smart features.' },
  { id: 'appliances', name: 'Appliances', slug: 'appliances', description: 'Home appliances: efficiency, durability and performance.' },
];

function normalizeSlug(slug: string | string[] | undefined) {
  if (!slug) return '';
  const rawSlug = Array.isArray(slug) ? slug.join('/') : slug;
  return rawSlug.toLowerCase();
}

function getProductBySlug(slug: string | string[] | undefined) {
  const normalizedSlug = normalizeSlug(slug);
  return products.find((p) => p.slug.toLowerCase() === normalizedSlug);
}

export async function generateMetadata({ params }: { params: { slug: string | string[] } }): Promise<Metadata> {
  // If Next provides `params` as a Promise, unwrap it first
  // (some Next dev servers may supply a thenable params object)
  const resolvedParams = (params && typeof (params as any).then === 'function') ? await (params as any) : params;
  const product = getProductBySlug(resolvedParams.slug);
  if (!product) return { title: 'Product not found' };
  return { title: `${product.name} - Insightful Reviews`, description: product.summary };
}

export default async function ProductPage({ params }: { params: { slug: string | string[] } }) {
  // Unwrap params if it's a Promise-like object
  const resolvedParams = (params && typeof (params as any).then === 'function') ? await (params as any) : params;
  const product = getProductBySlug(resolvedParams.slug);
  // no debug logs
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

          {product.images?.[0] && (
            <div className="mt-4">
              <img src={product.images[0]} alt={product.name} className="w-full max-h-96 object-cover rounded-lg" />
            </div>
          )}

          <div className="mt-4 flex items-center gap-6">
            <div className="text-2xl font-semibold text-gray-900 dark:text-zinc-50">{product.price}</div>
            <div className="text-sm text-yellow-500">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</div>
            <div className="ml-4 text-sm text-gray-600 dark:text-zinc-300">AI score: <span className="font-medium">{product.aiScore}%</span></div>
          </div>

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

          {product.pros && product.pros.length > 0 && (
            <section className="mt-6">
              <h3 className="text-lg font-medium">Pros</h3>
              <ul className="list-disc list-inside mt-2 text-sm text-gray-700 dark:text-zinc-300">
                {product.pros.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </section>
          )}

          {product.cons && product.cons.length > 0 && (
            <section className="mt-6">
              <h3 className="text-lg font-medium">Cons</h3>
              <ul className="list-disc list-inside mt-2 text-sm text-gray-700 dark:text-zinc-300">
                {product.cons.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </section>
          )}

          {product.expertSummary && (
            <section className="mt-6">
              <h3 className="text-lg font-medium">Expert Summary</h3>
              <p className="mt-2 text-sm text-gray-700 dark:text-zinc-300">{product.expertSummary}</p>
            </section>
          )}

          <section className="mt-6">
            <AIReviewSummary product={product} />
          </section>

          <section>
            <React.Suspense>
              <Reviews productId={product.id} />
            </React.Suspense>
          </section>
        </div>

        <aside className="md:col-span-1 rounded-md border border-gray-100 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900">
          <div className="text-sm text-gray-600 dark:text-zinc-300">Price</div>
          <div className="mt-1 text-xl font-semibold text-gray-900 dark:text-zinc-50">{product.price}</div>
          <div className="mt-3 text-yellow-500">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</div>

          <div className="mt-4 text-sm text-gray-600 dark:text-zinc-300">AI score</div>
          <div className="text-lg font-semibold mt-1">{product.aiScore}%</div>

          <div className="mt-6 flex gap-3">
            <a href={product.buyUrl ?? '#'} className={`flex-1 text-center px-4 py-2 rounded-md bg-indigo-600 text-white ${product.buyUrl ? 'hover:bg-indigo-700' : 'opacity-50 pointer-events-none'}`}>Buy Now</a>
            {/* client-side compare behavior: add to compare list and navigate to /compare with slugs */}
            <React.Suspense>
              {/* CompareButton is a client component that manages localStorage + navigation */}
              {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
              <CompareButton id={product.id} slug={product.slug} />
            </React.Suspense>
          </div>
          <div className="mt-3">
            <React.Suspense>
              {/* WishlistButton toggles wishlist */}
              {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
              <WishlistButton id={product.id} />
            </React.Suspense>
          </div>
        </aside>
      </div>
    </div>
  );
}
