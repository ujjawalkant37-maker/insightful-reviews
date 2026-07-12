import React, { Suspense } from "react";
import Header from "@/components/Header";
import FooterSection from "@/components/FooterSection";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import WishlistClient from "./WishlistClient";

export default function WishlistPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background text-foreground">

        <Header />

        <main className="flex-1">

          <Suspense
            fallback={
              <div className="container py-20 text-center">
                Loading Wishlist...
              </div>
            }
          >
            <WishlistClient />
          </Suspense>

        </main>

        <FooterSection />

      </div>
    </ProtectedRoute>
  );
}