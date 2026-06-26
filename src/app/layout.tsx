import type { Metadata } from "next";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { profile } from "@/data/profile";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: `https://${profile.domain}`,
  email: `mailto:${profile.email}`,
  sameAs: [profile.linkedin, profile.github, profile.orcid],
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location,
  },
};

const newsreader = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://souravamseekar.com"),
  title: {
    default: "Marti Soura Vamseekar — AI & Infrastructure Engineer",
    template: "%s — Marti Soura Vamseekar",
  },
  description:
    "AI and infrastructure engineer building RAG pipelines, event-driven microservices, and EU compliance platforms: WorkforceGuard AI, EU AI Assurance OS, Aequitas. EU Blue Card eligible.",
  keywords: [
    "Marti Soura Vamseekar",
    "AI Engineer",
    "Data Platform Engineer",
    "EU Blue Card",
    "EU AI Act",
    "Pay Transparency Directive",
    "RAG",
    "Spring Boot",
    "Vertex AI",
    "dbt",
  ],
  authors: [{ name: "Marti Soura Vamseekar", url: "https://souravamseekar.com" }],
  creator: "Marti Soura Vamseekar",
  alternates: {
    canonical: "https://souravamseekar.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: "Marti Soura Vamseekar — AI & Infrastructure Engineer",
    description:
      "Production RAG, microservices, and EU compliance analytics. Live products at souravamseekar.com.",
    type: "website",
    locale: "en_GB",
    url: "https://souravamseekar.com",
    siteName: "Marti Soura Vamseekar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marti Soura Vamseekar — AI & Infrastructure Engineer",
    description:
      "Production RAG, microservices, and EU compliance analytics. Live products at souravamseekar.com.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Plain paths only — Safari ignores Next.js hashed /favicon.ico?... URLs (see next.js#50623) */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark")document.documentElement.setAttribute("data-theme","dark");}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${newsreader.variable} ${ibmPlexSans.variable}`}>
        {children}
      </body>
      <Analytics />
    </html>
  );
}