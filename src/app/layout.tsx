import type { Metadata } from "next";
import { Libre_Baskerville, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-heading',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://omaralbeshr.com'),
  title: {
    default: 'Omar AlBeshr — Poet & Author',
    template: '%s | Omar AlBeshr',
  },
  description: 'Omar AlBeshr is an Emirati poet and author based in Abu Dhabi. Writing in Arabic and English, exploring themes of love, healing, and human connection.',
  openGraph: {
    siteName: 'Omar AlBeshr',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@ASRomar10',
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
        className={`${libreBaskerville.variable} ${inter.variable} antialiased bg-omar-bg text-omar-charcoal`}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
