import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OverDrift – FPS Boost for Gamers with Real-Time Optimization",
  description: "Lag-free gaming with OverDrift. Real-time GPU telemetry, dynamic pricing, and cloud rendering for maximum FPS.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  keywords: "FPS optimization SaaS, reduce game latency, cloud rendering for gamers, boost gaming FPS, GPU optimization, gaming performance, real-time FPS boost",
  authors: [{ name: "Vajra Factory" }],
  alternates: {
    canonical: "https://overdrift.com",
    languages: {
      "en-US": "https://overdrift.com",
      "en-GB": "https://overdrift.com/uk",
      "de-DE": "https://overdrift.com/de",
      "fr-FR": "https://overdrift.com/fr",
      "ja-JP": "https://overdrift.com/jp",
      "zh-CN": "https://overdrift.com/cn",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://overdrift.com",
    title: "OverDrift – FPS Boost for Gamers with Real-Time Optimization",
    description: "Lag-free gaming with OverDrift. Real-time GPU telemetry, dynamic pricing, and cloud rendering for maximum FPS.",
    siteName: "OverDrift",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OverDrift – Render Faster, Game Smoother",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OverDrift – FPS Boost for Gamers with Real-Time Optimization",
    description: "Lag-free gaming with OverDrift. Real-time GPU telemetry, dynamic pricing, and cloud rendering for maximum FPS.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
  },
  category: "gaming",
  classification: "technology",
  referrer: "origin-when-cross-origin",
  colorScheme: "dark light",
  creator: "Vajra Factory",
  publisher: "Vajra Factory",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
} 