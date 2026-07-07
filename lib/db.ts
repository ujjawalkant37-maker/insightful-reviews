import fs from 'fs/promises';
import path from 'path';
import type { Product, Category } from '../types/models';

const dataDir = path.join(process.cwd(), 'data');

async function readJson<T>(file: string): Promise<T> {
  const filePath = path.join(dataDir, file);
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

export async function getCategories(): Promise<Category[]> {
  return await readJson<Category[]>('categories.json');
}

export async function getProducts(): Promise<Product[]> {
  return await readJson<Product[]>('products.json');
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}

export async function searchProducts(query?: string, categoryId?: string): Promise<Product[]> {
  let products = await getProducts();
  if (categoryId) {
    products = products.filter((p) => p.categoryId === categoryId);
  }
  if (query) {
    const q = query.toLowerCase();
    products = products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q)
    );
  }
  return products;
}
