"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeroSection from './HeroSection';
import FeaturedCategories from './FeaturedCategories';
import HomeCatalog from './HomeCatalog';
import FeaturedProducts from './FeaturedProducts';
import ExpertReviews from './ExpertReviews';
import UserReviews from './UserReviews';
import CTA from './CTA';

export default function HomeShell() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSearch(q: string) {
    const trimmed = q.trim();
    if (trimmed) {
      router.push(`/products?search=${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <main className="flex-1">
      <HeroSection value={query} onChange={setQuery} onSearch={handleSearch} />
      <FeaturedCategories />
      <HomeCatalog query={query} />
      <FeaturedProducts />
      <ExpertReviews />
      <UserReviews />
      <CTA />
    </main>
  );
}
