import type { Metadata } from "next";
import { Geist_Mono, Roboto_Mono } from "next/font/google";
import "../../globals.css";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

// Initialize fonts
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotomono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["200", "400", "500", "700"],
  display: "swap",
});

// Update metadata for better SEO
export const metadata: Metadata = {
  title: "Ihlen Social Running Club",
  description:
    "Official website for Ihlen Social Running Club. Stay updated on events, routes, and more.",
};

// Main layout component
export default function LandingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${robotomono.className} ${geistMono.variable} antialiased bg-[#FAFAFA] dark:bg-[#1A1A1A] transition-all duration-500 flex flex-col min-h-screen`}
      >
        <main>
          <div className=" mx-auto ">
            <Navbar />
            <div >{children}</div>
            <Footer />
          </div>
        </main>
        {/* The footer is outside the main content area, allowing the main content to grow and push it down */}
      </body>
    </html>
  );
}
