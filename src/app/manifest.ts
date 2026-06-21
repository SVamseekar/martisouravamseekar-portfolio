import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Marti Soura Vamseekar — AI & Infrastructure Engineer",
    short_name: "Marti Soura Vamseekar",
    description:
      "AI and infrastructure engineer building RAG pipelines, event-driven microservices, and EU compliance platforms.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f4ef",
    theme_color: "#f6f4ef",
    icons: [
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
