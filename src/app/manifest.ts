import type { MetadataRoute } from "next";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: DEFAULT_TITLE,
    short_name: "Marti Soura Vamseekar",
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#f6f4ef",
    theme_color: "#f6f4ef",
    lang: "en-GB",
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