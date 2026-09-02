import type { Metadata, Viewport } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import { Masthead } from "@/components/Masthead";
import { SiteFooter } from "@/components/SiteFooter";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";
import "./explainers.css";

/**
 * Type pairing.
 *
 * Newsreader (display) — a text-face-derived serif with real editorial
 * character; carries the "published work" side of the profile without the
 * high-contrast Didone look that reads as generated.
 *
 * Inter (text) — neutral, excellent at small sizes, unobtrusive under the serif.
 *
 * JetBrains Mono (utility) — reserved for machine-checkable content: versions,
 * statuses, identifiers. Earned here, since the subject is instrumentation.
 */
const display = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-face",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const text = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-text-face",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-face",
  weight: ["400", "500"],
});

export const metadata: Metadata = buildMetadata();

// The browser chrome cannot read CSS variables, so --ground is restated here.
// These two values must track --ground in globals.css for each theme.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfc" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1014" },
  ],
};

/**
 * Applies the stored theme before first paint so a dark-mode visitor never
 * sees a flash of the light palette.
 */
const themeBootstrap = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${text.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Masthead />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

export const dynamic = "force-static";
