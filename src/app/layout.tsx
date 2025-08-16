import type { Metadata } from "next";
import { Geist_Mono, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/*
        The body is now a flex container that takes up the full viewport height.
        The `flex-col` and `min-h-screen` classes ensure the footer is pushed to the bottom.
      */}
      <body
        className={`${robotomono.className} ${geistMono.variable} antialiased bg-[#F2F2F2] dark:bg-gray-950 transition-all duration-500 flex flex-col min-h-screen`}
      >
        <main>
          {/*
            This container div provides consistent max-width and horizontal padding.
            The `container` class centers the content, and `mx-auto` handles the centering.
            The `px-4 sm:px-6 lg:px-8` classes provide responsive padding for different screen sizes.
          */}
          <div className=" mx-auto ">
            <Navbar />
            <div className="pt-20">{children}</div>
            <Footer />
          </div>
        </main>

        {/* The footer is outside the main content area, allowing the main content to grow and push it down */}
      </body>
    </html>
  );
}
