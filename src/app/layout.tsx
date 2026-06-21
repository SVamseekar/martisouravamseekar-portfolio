import type { Metadata } from "next";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import "./globals.css";

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
  title: "Marti Soura Vamseekar — AI & Infrastructure Engineer",
  description:
    "AI and infrastructure engineer building RAG pipelines, event-driven microservices, and EU compliance platforms: WorkforceGuard AI, EU AI Assurance OS, Aequitas. EU Blue Card eligible.",
  keywords: [
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
  authors: [{ name: "Marti Soura Vamseekar" }],
  openGraph: {
    title: "Marti Soura Vamseekar — AI & Infrastructure Engineer",
    description:
      "Production RAG, microservices, and EU compliance analytics. Live products at souravamseekar.com.",
    type: "website",
    locale: "en_GB",
    url: "https://souravamseekar.com",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark")document.documentElement.setAttribute("data-theme","dark");}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${newsreader.variable} ${ibmPlexSans.variable}`}>
        {children}
      </body>
    </html>
  );
}