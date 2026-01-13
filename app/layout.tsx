import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Join the Blox Waitlist | AI-Powered Professional Branding",
  description: "Unlock your professional edge with Blox. AI-powered portfolios, résumés, and branding in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-brand-navy text-foreground overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
