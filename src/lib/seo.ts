import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { systems } from "@/data/systems";
import { research } from "@/data/profile";
import { counts } from "@/data/evidence";

export const SITE_URL = `https://${profile.domain}`;
export const SITE_NAME = profile.name;
export const SITE_LOCALE = "en_GB";

export const DEFAULT_TITLE = `${profile.name} — ${profile.title}`;

/**
 * Written for the two audiences that matter: recruiters scanning a result
 * list, and researchers checking whether the work is real. Both need the
 * countable proof up front.
 */
export const DEFAULT_DESCRIPTION =
  `AI and data platform engineer. ${counts.liveSystems} systems live in production, ` +
  `${counts.packages} open-source Python packages, and a working paper on EU labour markets. ` +
  `Regulated-domain software where the audit trail is the product.`;

export const SITE_KEYWORDS = [
  profile.name,
  "AI Engineer",
  "Data Platform Engineer",
  "Machine Learning Engineer",
  "EU AI Act",
  "Pay Transparency Directive",
  "AI governance",
  "RAG",
  "dbt",
  "DuckDB",
  "Spring Boot",
  "FastAPI",
  "Next.js",
  "transport equity",
  "EU Blue Card",
];

export const OG_IMAGE_PATH = "/opengraph-image";
export const OG_IMAGE_ALT = `${profile.name} — ${profile.title}`;

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** Base metadata for the root layout. */
export function buildMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: DEFAULT_TITLE,
      template: `%s — ${profile.name}`,
    },
    description: DEFAULT_DESCRIPTION,
    keywords: SITE_KEYWORDS,
    authors: [{ name: profile.name, url: SITE_URL }],
    creator: profile.name,
    alternates: { canonical: SITE_URL },
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
      description: DEFAULT_DESCRIPTION,
      type: "profile",
      locale: SITE_LOCALE,
      url: SITE_URL,
      siteName: profile.name,
      images: [
        { url: OG_IMAGE_PATH, width: 1200, height: 630, alt: OG_IMAGE_ALT },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      images: [OG_IMAGE_PATH],
    },
    category: "technology",
  };
}

/** Per-page metadata helper, keeping canonical URLs correct across routes. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${profile.name}`,
      description,
      url,
      type: "article",
      images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${profile.name}`,
      description,
    },
  };
}

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
      "AI governance",
      "EU AI Act",
      "Pay Transparency Directive",
      "Retrieval-augmented generation",
      "Data engineering",
      "Event-driven microservices",
      "Transport equity analysis",
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

/** Software systems, expressed for search engines as an ordered list. */
export function buildSystemsItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Selected engineering systems",
    itemListElement: systems.map((system, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: system.name,
        description: system.whatItIs,
        url: system.liveUrl ?? system.githubUrl,
        applicationCategory:
          system.status === "packages"
            ? "DeveloperApplication"
            : "BusinessApplication",
      },
    })),
  };
}

/**
 * ScholarlyArticle schema — this is what makes the working paper legible to
 * Google Scholar and to university search, which matters for the PI audience.
 */
export function buildScholarlyArticleSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: research.title,
    author: { "@id": PERSON_ID },
    datePublished: "2026",
    inLanguage: "en",
    isAccessibleForFree: true,
    identifier: "https://doi.org/10.5281/zenodo.20455974",
    url: `${SITE_URL}/research`,
    publisher: {
      "@type": "Organization",
      name: "Munich Personal RePEc Archive",
    },
  };
}

export function buildHomeJsonLd() {
  return [
    buildPersonSchema(),
    buildWebSiteSchema(),
    buildSystemsItemListSchema(),
  ];
}
