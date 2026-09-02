import type { MetadataRoute } from "next";
import { systems } from "@/data/systems";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/work", priority: 0.9 },
    { path: "/research", priority: 0.9 },
    { path: "/open-source", priority: 0.7 },
    { path: "/about", priority: 0.7 },
  ].map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const systemRoutes = systems.map((system) => ({
    url: `${SITE_URL}/work/${system.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...systemRoutes];
}
