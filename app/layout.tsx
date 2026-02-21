import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bloxplatform.org/'),
  title: {
    default: "Blox | AI-Powered Professional Branding",
    template: "%s | Blox"
  },
  description: "Unlock your professional edge with Blox. AI-powered portfolios, résumés, and branding in seconds. Join the waitlist today.",
  keywords: ["AI portfolio", "professional branding", "resume builder", "AI career tools", "personal website builder", "Blox"],
  authors: [{ name: "Blox Team" }],
  creator: "Blox",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bloxplatform.org",
    title: "Blox | AI-Powered Professional Branding",
    description: "Unlock your professional edge with Blox. AI-powered portfolios, résumés, and branding in seconds.",
    siteName: "Blox",
    images: [
      {
        url: "/linkimg.png", // We'll need to remember to ensure this image exists or is handled
        width: 1200,
        height: 630,
        alt: "Blox Professional Branding Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blox | AI-Powered Professional Branding",
    description: "Unlock your professional edge with Blox. AI-powered portfolios, résumés, and branding in seconds.",
    images: ["/linkimg.png"],
    creator: "@blox_app", // Placeholder
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png', // Placeholder, browser will ignore if missing
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    "theme-color": "#0B0E11",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0B0E11',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-brand-navy">
      <body className={`${inter.variable} antialiased bg-brand-navy text-foreground`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Blox",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "AI-powered professional branding, portfolios, and résumés.",
              "author": {
                "@type": "Organization",
                "name": "Blox"
              }
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
