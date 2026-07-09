import Header from "@/components/Header";
import HomeShell from "@/components/HomeShell";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <HomeShell />
      </main>

      <FooterSection />
    </div>
  );
}