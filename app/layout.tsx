import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WishlistProvider } from "@/components/WishlistContext";
import { ToastProvider } from "@/components/ToastContext";
import Analytics from "@/components/Analytics";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Insightful Reviews — Decide Before You Regret",
    template: "%s | Insightful Reviews",
  },
  description: "Research hospitals, schools, colleges, hotels, services and products through structured information, source-attributed reviews and community experiences.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Insightful Reviews — Decide Before You Regret",
    description: "Know what people experienced before you choose a hospital, school, service, hotel or product.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Analytics />
        <ToastProvider><WishlistProvider>{children}</WishlistProvider></ToastProvider>
      </body>
    </html>
  );
}
