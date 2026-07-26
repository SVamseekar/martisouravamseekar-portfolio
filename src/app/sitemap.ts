import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const BLOG_URL = "https://blog.souravamseekar.com";

/** Portfolio sitemap only — article URLs live on engineering-blog */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: BLOG_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
