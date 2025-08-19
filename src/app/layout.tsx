import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/layout/main-layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rumora Properties - Find Your Perfect Property in Malaysia",
    template: "%s | Rumora Properties"
  },
  description: "Discover amazing properties across Malaysia with our comprehensive search and advanced filtering options. Find condos, houses, land, and more with location intelligence and real-time updates.",
  keywords: ["properties", "real estate", "Malaysia", "condos", "houses", "land", "property search", "property listings", "Kuala Lumpur", "Selangor", "property agents"],
  authors: [{ name: "Rumora Properties Team" }],
  creator: "Rumora Properties",
  publisher: "Rumora Properties",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://rumora.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Rumora Properties - Find Your Perfect Property in Malaysia",
    description: "Discover amazing properties across Malaysia with our comprehensive search and advanced filtering options. Find condos, houses, land, and more with location intelligence and real-time updates.",
    siteName: "Rumora Properties",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rumora Properties - Find Your Perfect Property in Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rumora Properties - Find Your Perfect Property in Malaysia",
    description: "Discover amazing properties across Malaysia with our comprehensive search and advanced filtering options. Find condos, houses, land, and more with location intelligence and real-time updates.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
