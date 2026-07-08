import React from "react";
import Header from "@/components/Header";
import HomeShell from "@/components/HomeShell";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <HomeShell />

      <FooterSection />
    </div>
  );
}

