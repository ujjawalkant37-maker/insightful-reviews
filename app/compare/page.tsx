import React, { Suspense } from "react";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import CompareClient from "./CompareClient";

export default function ComparePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <Suspense
          fallback={
            <div className="container py-20 text-center">
              Loading comparison...
            </div>
          }
        >
          <CompareClient />
        </Suspense>
      </main>

      <FooterSection />
    </div>
  );
}