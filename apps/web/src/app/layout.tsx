import type { Metadata } from "next";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tinynest",
  description: "Analyze your SaaS stack",
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
        <NuqsAdapter>
          <div className="container mx-auto p-6">
            {children}
          </div>
        </NuqsAdapter>
      </body>
    </html>
  );
}
