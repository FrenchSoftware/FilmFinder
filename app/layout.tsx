import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "FilmFinder",
    template: "%s | FilmFinder",
  },
  description:
    "Find your next movie",
  keywords: [
    "movie finder",
    "film finder",
    "AI movies",
    "movie recommendations",
    "film recommendations",
    "IMDb",
    "movie posters",
    "generative UI",
    "Vercel AI SDK",
    "Next.js",
    "FilmFinder",
  ],
  authors: [{ name: "FilmFinder" }],
  creator: "FilmFinder",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://movie-app.vercel.app",
    title: "FilmFinder",
    description: "Find your next movie",
    siteName: "FilmFinder",
  },
  twitter: {
    card: "summary_large_image",
    title: "FilmFinder",
    description: "Find your next movie",
    creator: "@filmfinder",
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
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
