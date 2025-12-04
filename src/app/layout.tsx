import type { Metadata } from "next";
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
  title: "Soura Vamseekar Marti | ML Engineer & Data Scientist",
  description: "Data Science & ML Systems Engineer specializing in transport analytics, hyperspectral imaging, and FinTech infrastructure. Building production-grade ML platforms and full-stack systems.",
  keywords: ["Data Science", "Machine Learning", "ML Engineer", "Transport Analytics", "Hyperspectral Imaging", "FinTech", "Full Stack Developer"],
  authors: [{ name: "Soura Vamseekar Marti" }],
  openGraph: {
    title: "Soura Vamseekar Marti | ML Engineer & Data Scientist",
    description: "Data Science & ML Systems Engineer specializing in transport analytics, hyperspectral imaging, and FinTech infrastructure.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soura Vamseekar Marti | ML Engineer & Data Scientist",
    description: "Data Science & ML Systems Engineer specializing in transport analytics, hyperspectral imaging, and FinTech infrastructure.",
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
        {children}
      </body>
    </html>
  );
}
