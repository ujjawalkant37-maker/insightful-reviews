import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import HomeCatalog from "@/components/HomeCatalog";
import FeaturedProducts from "@/components/FeaturedProducts";
import ExpertReviews from "@/components/ExpertReviews";
import UserReviews from "@/components/UserReviews";
import CTA from "@/components/CTA";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <FeaturedCategories />
        <HomeCatalog />
        <FeaturedProducts />
        <ExpertReviews />
        <UserReviews />
        <CTA />
      </main>

      <FooterSection />
    </div>
  );
}

