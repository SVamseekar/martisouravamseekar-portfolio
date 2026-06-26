import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { buildPortfolioJsonLd, siteMetadata, siteViewport } from "@/lib/seo";

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";

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

export const metadata: Metadata = siteMetadata;
export const viewport: Viewport = siteViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = buildPortfolioJsonLd();

  return (
    <html lang="en-GB">
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
        {jsonLd.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className={`${newsreader.variable} ${ibmPlexSans.variable}`}>
        {children}
        {GA_MEASUREMENT_ID && process.env.NODE_ENV === "production" ? (
          <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
        ) : null}
      </body>
    </html>
  );
}