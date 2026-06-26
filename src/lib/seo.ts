import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

export const SITE_URL = `https://${profile.domain}`;
export const SITE_NAME = profile.name;
export const SITE_LOCALE = "en_GB";

export const DEFAULT_TITLE = `${profile.name} — ${profile.title}`;

export const DEFAULT_DESCRIPTION =
  "AI and infrastructure engineer building RAG pipelines, event-driven microservices, and EU compliance platforms: WorkforceGuard AI, EU AI Assurance OS, Aequitas. EU Blue Card eligible.";

export const SITE_KEYWORDS = [
  profile.name,
  "AI Engineer",
  "Data Platform Engineer",
  "Infrastructure Engineer",
  "EU Blue Card",
  "EU AI Act",
  "Pay Transparency Directive",
  "RAG",
  "Spring Boot",
  "Vertex AI",
  "dbt",
  "FastAPI",
  "Next.js",
  "Hyderabad",
  "Germany",
  "Netherlands",
];

export const OG_IMAGE_PATH = "/opengraph-image";
export const OG_IMAGE_ALT = `${profile.name} — ${profile.title}`;

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    jobTitle: profile.title,
    url: SITE_URL,
    email: `mailto:${profile.email}`,
    sameAs: [profile.linkedin, profile.github, profile.orcid],
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location,
    },
    knowsAbout: [
      "Retrieval-augmented generation",
      "EU AI Act compliance",
      "EU Pay Transparency Directive",
      "Data engineering",
      "Event-driven microservices",
    ],
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en-GB",
    publisher: { "@id": PERSON_ID },
  };
}

export function buildProfilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: SITE_URL,
    name: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en-GB",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
  };
}

export function buildProjectsItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Selected engineering projects",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.name,
        description: project.tagline,
        url: project.liveUrl,
        applicationCategory: "BusinessApplication",
      },
    })),
  };
}

export function buildPortfolioJsonLd() {
  return [
    buildPersonSchema(),
    buildWebSiteSchema(),
    buildProfilePageSchema(),
    buildProjectsItemListSchema(),
  ];
}

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s — ${profile.name}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description:
      "Production RAG, microservices, and EU compliance analytics. Live products at souravamseekar.com.",
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: profile.name,
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description:
      "Production RAG, microservices, and EU compliance analytics. Live products at souravamseekar.com.",
    images: [OG_IMAGE_PATH],
  },
  category: "technology",
};

export const siteViewport = {
  themeColor: "#f6f4ef",
};