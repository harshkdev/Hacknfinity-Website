import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hacknfinity.in"),
  title: {
    default: "Hacknfinity — India's Largest Student Tech Community",
    template: "%s | Hacknfinity",
  },
  description:
    "Join 8,500+ students from 200+ colleges across India. Hackathons, workshops, resources, and a community that helps you level up in tech.",
  keywords: ["Hacknfinity", "student tech community", "hackathon India", "coding community", "student developers India", "tech events"],
  authors: [{ name: "Hacknfinity Team" }],
  creator: "Hacknfinity",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hacknfinity.in",
    siteName: "Hacknfinity",
    title: "Hacknfinity — India's Largest Student Tech Community",
    description: "Join 8,500+ students from 200+ colleges. Hackathons, workshops, resources, and a thriving tech community.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Hacknfinity" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hacknfinity — India's Largest Student Tech Community",
    description: "Join 8,500+ students. Hackathons, workshops & resources.",
    creator: "@hacknfinity",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#0d0d12",
                color: "#f0f0f8",
                border: "1px solid rgba(168,85,247,0.3)",
                borderRadius: "12px",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
