/**
 * Destination marks.
 *
 * Each external destination gets a real glyph rather than a text sigil, drawn
 * inline as SVG so it stays crisp at any size, needs no network request, and
 * inherits `currentColor` — which is what lets one mark work in both themes
 * without inverting a bitmap or shipping two assets.
 *
 * Paths are simplified silhouettes traced to the 24-unit grid the source marks
 * use. They read as the thing they denote at 16px, which is the only size that
 * matters here.
 */

type MarkProps = { className?: string };

const box = {
  viewBox: "0 0 24 24",
  width: 16,
  height: 16,
  "aria-hidden": true as const,
  focusable: "false" as const,
};

export function GithubMark({ className }: MarkProps) {
  return (
    <svg {...box} className={className} fill="currentColor">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.5 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.07.78 2.16v3.2c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function LinkedinMark({ className }: MarkProps) {
  return (
    <svg {...box} className={className} fill="currentColor">
      <path d="M4.98 3.5A2.5 2.5 0 1 1 2.5 6 2.49 2.49 0 0 1 4.98 3.5ZM2.9 8.4h4.15V21H2.9ZM9.7 8.4h3.98v1.72h.06a4.36 4.36 0 0 1 3.92-2.15c4.2 0 4.97 2.76 4.97 6.35V21h-4.14v-5.85c0-1.4-.02-3.19-1.95-3.19s-2.25 1.52-2.25 3.09V21H9.7Z" />
    </svg>
  );
}

export function MailMark({ className }: MarkProps) {
  return (
    <svg {...box} className={className} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinejoin="round">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.2" />
      <path d="m3.4 6.6 7.35 5.5a2.1 2.1 0 0 0 2.5 0l7.35-5.5" />
    </svg>
  );
}

export function OrcidMark({ className }: MarkProps) {
  return (
    <svg {...box} className={className} fill="currentColor">
      <path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0ZM7.37 17.3H5.63V7.53h1.74Zm-.87-11a1.1 1.1 0 1 1 1.1-1.1 1.1 1.1 0 0 1-1.1 1.1Zm5.36 11H9.6V7.53h3.9a4.89 4.89 0 0 1 0 9.77Zm-.02-8.2h-1.5v6.63h1.4a3.32 3.32 0 0 0 .1-6.63Z" />
    </svg>
  );
}

export function PackageMark({ className }: MarkProps) {
  return (
    <svg {...box} className={className} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinejoin="round" strokeLinecap="round">
      <path d="M12 2.6 21 7v10l-9 4.4L3 17V7Z" />
      <path d="M3.3 7.1 12 11.4l8.7-4.3M12 11.4V21.2" />
    </svg>
  );
}

export function DocMark({ className }: MarkProps) {
  return (
    <svg {...box} className={className} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinejoin="round" strokeLinecap="round">
      <path d="M6 2.6h7.5L19 8.1V21.4H6Z" />
      <path d="M13.2 2.8v5.5h5.5M9 13h6M9 16.6h6" />
    </svg>
  );
}

export function LiveMark({ className }: MarkProps) {
  return (
    <svg {...box} className={className} fill="none" stroke="currentColor" strokeWidth={1.9}>
      <circle cx="12" cy="12" r="9.2" />
      <ellipse cx="12" cy="12" rx="4" ry="9.2" />
      <path d="M3.1 12h17.8" />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   Institution marks.

   These are the institutions' own logos, in their own colours, served from
   /public/icons rather than traced here — a university crest is a real mark
   with a defined form, and an approximation of one is just wrong. They are
   the exception to the monochrome rule the rest of this file follows: a
   credential is only worth showing if it is the actual mark.

   Greenwich ships as a PNG (no vector supplied), so it carries explicit
   width/height and is served at 2x the rendered size to stay sharp.
   ------------------------------------------------------------------------ */

/* alt is empty by design: the institution's name is already the text this mark
   sits beside, so a description here would be read out twice.

   `plate` marks a logo whose own colours are too dark to sit on a dark ground.
   Greenwich's compass rose is navy on white, so on the dark theme it gets a
   white plate rather than being recoloured — a real mark keeps its colours. */
const institution: Record<string, { src: string; plate?: boolean }> = {
  gitam: { src: "/icons/gitam-emblem.svg" },
  greenwich: { src: "/icons/greenwich-emblem.png", plate: true },
  microsoft: { src: "/icons/microsoft.svg" },
};

export function InstitutionMark({ name, className }: { name: string; className?: string }) {
  const mark = institution[name];
  if (!mark) return null;
  return (
    /* A 16px icon: next/image would add a loader round-trip and layout
       machinery for no measurable gain at this size. */
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={mark.src}
      alt=""
      width={16}
      height={16}
      className={[className, mark.plate && "row-mark-plate"].filter(Boolean).join(" ")}
      loading="lazy"
      decoding="async"
    />
  );
}

/* ---------------------------------------------------------------------------
   Region marks.

   Real flags in their own colours, served from /public/icons/flags. Like the
   institution logos, these are marks with a defined form — a flag redrawn in
   one ink is not that flag — so they are the second exception to this file's
   monochrome rule.

   Drawn at a 3:2 ratio and given a hairline border, because several of these
   flags carry white to their own edge (the US stripes, the Indian bands) and
   would otherwise bleed into a light ground with no boundary.
   ------------------------------------------------------------------------ */

const region: Record<string, string> = {
  eu: "/icons/flags/eu.svg",
  uk: "/icons/flags/uk.svg",
  us: "/icons/flags/us.svg",
  au: "/icons/flags/au.svg",
  nz: "/icons/flags/nz.svg",
  in: "/icons/flags/in.svg",
};

export function RegionMark({ name, className }: { name: string; className?: string }) {
  const src = region[name];
  if (!src) return null;
  return (
    /* An 18px flag; same reasoning as the institution marks above. */
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      width={18}
      height={12}
      className={[className, "flag"].filter(Boolean).join(" ")}
      loading="lazy"
      decoding="async"
    />
  );
}

/** Several flags for a row that names several countries. */
export function RegionMarks({ names, className }: { names: readonly string[]; className?: string }) {
  return (
    <span className={["flag-group", className].filter(Boolean).join(" ")}>
      {names.map((n) => (
        <RegionMark key={n} name={n} />
      ))}
    </span>
  );
}

/* ---------------------------------------------------------------------------
   Technology marks.

   Simplified silhouettes of each technology's own mark, traced to the same
   24-unit grid. They are single-path monochrome shapes taking `currentColor`
   from the technology's hue, which keeps the set visually coherent — a row of
   full-colour brand logos would pull the page apart — while still being
   recognisable as the thing it denotes.
   ------------------------------------------------------------------------ */

const tech: Record<string, string> = {
  // A two-body shape, the way the language's own mark is built.
  python:
    "M11.9 2c-2.4 0-4.4.5-4.4 2.6v2.1h4.6v.9H5.4C3.3 7.6 2 9 2 11.9c0 2.9 1.2 4.3 3.3 4.3h1.6v-2.5c0-2.3 2-4.2 4.3-4.2h4.5c1.8 0 3.2-1.5 3.2-3.3V4.6C18.9 2.9 17.4 2 15.6 2Zm-2.5 1.4a.9.9 0 1 1-.9.9.9.9 0 0 1 .9-.9Z M12.1 22c2.4 0 4.4-.5 4.4-2.6v-2.1h-4.6v-.9h6.7c2.1 0 3.4-1.4 3.4-4.3 0-2.9-1.2-4.3-3.3-4.3h-1.6v2.5c0 2.3-2 4.2-4.3 4.2H8.3c-1.8 0-3.2 1.5-3.2 3.3v2.6c0 1.7 1.5 2.6 3.3 2.6Zm2.5-1.4a.9.9 0 1 1 .9-.9.9.9 0 0 1-.9.9Z",
  java: "M9.4 18.4s-1 .6.7.8a14.3 14.3 0 0 0 5.4-.2 9 9 0 0 0 1.4.7c-5 2.2-11.4-.1-7.5-1.3ZM8.7 15.3s-1.1.8.6 1a20.3 20.3 0 0 0 7-.3 3.1 3.1 0 0 0 1 .6c-6.1 1.8-12.9.2-8.6-1.3ZM14.6 10a3.4 3.4 0 0 1-.5 4.9s3.4-1.7 1.8-3.9c-1.4-2-2.5-3 3.4-6.4 0 0-9.5 2.4-4.7 5.4ZM21.6 20.7s.8.6-.9 1.1c-3.1 1-13 1.3-15.8 0-1-.4.9-1.1 1.5-1.2a3.9 3.9 0 0 1 1-.1c-1.1-.8-7.2 1.6-3.1 2.2 11.2 1.9 20.4-.8 17.3-2ZM10 12.1s-5.1 1.2-1.8 1.7a38 38 0 0 0 6.7-.1c2.7-.2 5.4-.7 5.4-.7a11 11 0 0 1-1.6.9c-5.2 1.4-15.3.7-12.4-.7a10.9 10.9 0 0 1 3.7-1.1ZM17.9 16.7c5.3-2.7 2.8-5.4 1.1-5-.4.1-.6.2-.6.2a1.3 1.3 0 0 1 .5-.4c3.4-1.2 6.1 3.6-1.1 5.4a1 1 0 0 0 .1-.2Z",
  spring:
    "M20.8 2.6a10.3 10.3 0 0 1-1.2 2.1A11 11 0 1 0 4.4 20.3l.4.4A11 11 0 0 0 22.5 12a12.6 12.6 0 0 0-1.7-9.4ZM5.7 19.6a1 1 0 1 1-.1-1.4 1 1 0 0 1 .1 1.4Zm14.9-3.3c-2.7 3.6-8.5 2.4-12.2 2.6 0 0-.7 0-1.3.1 0 0 .2-.1.5-.2 2.5-.9 3.7-1 5.2-1.8 2.9-1.5 5.7-4.7 6.3-8a24.7 24.7 0 0 1-5.7 6.6c-2.2 1.5-5.3 1.6-5.3 1.6a3.2 3.2 0 0 1-.3-5.6c2.4-1.7 5.4-.9 8.7-2.5a7.4 7.4 0 0 0 3.9-4.4c.7 2.1 1.6 5.4.2 11.6Z",
  react:
    "M12 9.9A2.1 2.1 0 1 0 14.1 12 2.1 2.1 0 0 0 12 9.9Zm0-3.6c3 0 5.7.4 7.7 1.2 2.4.9 3.8 2.3 3.8 3.6s-1.4 2.8-3.8 3.7c-2 .7-4.7 1.1-7.7 1.1s-5.7-.4-7.7-1.1C1.9 14 .5 12.6.5 11.9S1.9 9.2 4.3 8.3c2-.8 4.7-1.2 7.7-1.2Zm0 1.5c-2.8 0-5.4.4-7.2 1-2 .8-2.8 1.7-2.8 2.2s.8 1.4 2.8 2.1c1.8.7 4.4 1 7.2 1s5.4-.3 7.2-1c2-.7 2.8-1.6 2.8-2.1s-.8-1.4-2.8-2.2c-1.8-.6-4.4-1-7.2-1Z M8.5 3.6c.6-.3 1.4-.2 2.3.3s1.9 1.4 2.9 2.5c2 2.2 3.6 4.6 4.6 6.7 1.1 2.4 1.4 4.5.8 5.6s-2.5 1.6-5.1 1.2c-2.3-.3-5-1.4-7.6-2.9S2.1 13.6 1 11.6C-.2 9.4-.4 7.4.2 6.3S2.6 4.7 5.2 5.1l-.3 1.5C2.6 6.3 1.7 6.9 1.5 7.1s-.2 1.3.8 3.1c.9 1.7 2.5 3.6 4.7 5.2s4.6 2.5 6.6 2.8c2 .3 3-.1 3.2-.4s.2-1.3-.8-3.1c-.9-1.7-2.4-4-4.3-6-.9-1-1.8-1.8-2.5-2.2Z",
  typescript:
    "M2 2h20v20H2Zm10.9 16.6a3.6 3.6 0 0 0 3.1 1.4c2 0 3.5-1 3.5-2.9 0-1.7-1-2.5-2.7-3.2l-.5-.2c-.9-.4-1.3-.6-1.3-1.2 0-.5.4-.8 1-.8a1.9 1.9 0 0 1 1.6.9l1.6-1a3.4 3.4 0 0 0-3.2-1.8c-1.9 0-3.1 1.2-3.1 2.8 0 1.7 1 2.5 2.5 3.1l.5.2c1 .4 1.5.7 1.5 1.3s-.5 1-1.4 1a2.2 2.2 0 0 1-2-1.1ZM11 10h-7v1.8h2.4v7h2v-7H11Z",
  duckdb:
    "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm-1.2 6.3a3.7 3.7 0 0 1 3.6 2.8h3.9a1 1 0 0 1 0 1.9h-3.9a3.7 3.7 0 1 1-3.6-4.7Z",
  dbt: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm4.5 5.6a1.3 1.3 0 0 1 .3 1.7l-1.4 1.4a2.8 2.8 0 0 1 0 4l-2.7 2.7a1.3 1.3 0 0 1-1.9-1.8l1.4-1.5a2.8 2.8 0 0 1 0-4l2.7-2.7a1.3 1.3 0 0 1 1.6.2ZM8.6 8.4a2.6 2.6 0 0 1 2 .8l1.1 1.1-1.4 1.4-1.1-1.1a.6.6 0 0 0-.9.9l1.1 1.1L8 14l-1.1-1.1a2.6 2.6 0 0 1 1.7-4.5Z",
  postgres:
    "M17.5 2.3a9.4 9.4 0 0 0-2.6.4 10 10 0 0 0-2.8-.3 7.5 7.5 0 0 0-4.4 1.2A9.4 9.4 0 0 0 3.6 3 2.9 2.9 0 0 0 1 4.6c-.6 1.5.1 4.2.6 6.6a24.4 24.4 0 0 0 1.2 4.2c.5 1.2 1 1.9 1.7 2.1a1.8 1.8 0 0 0 1.8-.6 4.4 4.4 0 0 0 .8.7 3.5 3.5 0 0 0 2 .5 15 15 0 0 0-.1 2.2c.1.9.4 1.6 1 1.9a2.5 2.5 0 0 0 2.6-.3 4 4 0 0 0 1.4-2.6 22 22 0 0 0 .3-3.3 3.9 3.9 0 0 0 1.9.4 3.4 3.4 0 0 0 2.6-1.2 12.8 12.8 0 0 0 2-4.7c.4-1.7.7-3.9.3-5.4a4.2 4.2 0 0 0-3.6-2.8Zm-6 4.4a5.7 5.7 0 0 1 .1 2.9 8.4 8.4 0 0 0-.3 2.7 5.8 5.8 0 0 0 .4 1.5 8.9 8.9 0 0 1-2.5.2 4.5 4.5 0 0 1-.6-2 16 16 0 0 1 .3-4.3 3.6 3.6 0 0 1 2.6-1Z",
  mongodb: "M12 1.5s.6 2.3 1.9 4.1c1.6 2.2 3.3 3.7 3.5 6.7.3 4-2.5 6.6-4.4 7.4l-.4 2.8h-1.2l-.4-2.8c-2-.8-4.7-3.4-4.4-7.4.2-3 1.9-4.5 3.5-6.7C11.4 3.8 12 1.5 12 1.5Zm0 4.3s-.9 1.6-1.8 3.1a8.8 8.8 0 0 0-1.3 4.4 5.4 5.4 0 0 0 3.1 5V5.8Z",
  redis:
    "M21.9 16.6c-.1.4-.7.7-1.6 1.2-1.8.9-8.3 3.5-9.7 4.3-1.4.7-2.2.7-3.2.2S2.5 19.3 1.6 18.8C1.1 18.6.9 18.4.9 18.2v-2.4s8.5-1.9 9.9-2.4 1.8-.5 3-.1 8 1.6 9.2 2.1v1.7ZM21.9 12.7c-.1.4-.7.7-1.6 1.1-1.8 1-8.3 3.5-9.7 4.3-1.4.7-2.2.7-3.2.2S2.5 15.4 1.6 15c-.5-.2-.7-.4-.7-.6v-2.5s8.5-1.8 9.9-2.3 1.8-.6 3-.1 8 1.5 9.2 2v1.6ZM21.9 8.7c-.1.4-.7.7-1.6 1.2C18.5 10.8 12 13.3 10.6 14c-1.4.8-2.2.8-3.2.3S2.5 11.4 1.6 11C1.1 10.8.9 10.6.9 10.4V8s8.5-1.9 9.9-2.4 1.8-.5 3-.1 8 1.6 9.2 2.1v1.6ZM11.6 2.2c2.9 0 5.3 1 5.3 2.1s-2.4 2.2-5.3 2.2S6.2 5.5 6.2 4.3s2.4-2.1 5.4-2.1Z",
  docker:
    "M22.9 9.9a5 5 0 0 0-2.2-1.5 5.5 5.5 0 0 0-.6-2.7l-.4-.6-.5.4a4.2 4.2 0 0 0-1.3 2.1 4 4 0 0 0 .3 2.7H2.4a1 1 0 0 0-1 1 12 12 0 0 0 .8 4.7 6.4 6.4 0 0 0 2.6 3.3 11 11 0 0 0 5.4 1.3 16 16 0 0 0 3-.3 12.7 12.7 0 0 0 3.9-1.4 11 11 0 0 0 2.7-2.2 12 12 0 0 0 2.1-3.6h.4a4.3 4.3 0 0 0 3.2-1.2l.4-.5ZM4.3 8.1H7v2.6H4.3Zm3.5 0h2.7v2.6H7.8Zm3.5 0H14v2.6h-2.7Zm3.6 0h2.7v2.6h-2.7ZM4.3 4.6H7v2.6H4.3Zm3.5 0h2.7v2.6H7.8Zm3.5 0H14v2.6h-2.7Zm-3.5-3.5h2.7v2.6H7.8Z",
  rabbitmq:
    "M21.5 10.4h-6.1a.7.7 0 0 1-.7-.7V3.6a.7.7 0 0 0-.7-.7h-2.3a.7.7 0 0 0-.7.7v6.1a.7.7 0 0 1-.7.7H8.1a.7.7 0 0 1-.7-.7V3.6a.7.7 0 0 0-.7-.7H4.4a.7.7 0 0 0-.7.7v16.8a.7.7 0 0 0 .7.7h17.1a.7.7 0 0 0 .7-.7v-9.3a.7.7 0 0 0-.7-.7Zm-3 6.4a1.5 1.5 0 0 1-1.5 1.5h-1.6a1.5 1.5 0 0 1-1.5-1.5v-1.6a1.5 1.5 0 0 1 1.5-1.5H17a1.5 1.5 0 0 1 1.5 1.5Z",
  nextjs:
    "M12 2a10 10 0 1 0 5.6 18.3L8.6 8.6v7.9H7V7.5h2l9 11.6A10 10 0 0 0 12 2Zm3.4 5.5h1.6v8l-1.6-2Z",
  fastapi:
    "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm-1 16.2v-5.4H7.6L13 5.8v5.4h3.3Z",
  gcp: "M15.3 7.3h.6l1.8-1.8.1-.8a8.1 8.1 0 0 0-13.2 4 1 1 0 0 1 .6 0l3.6-.6.3-.3a4.5 4.5 0 0 1 6.2-.5Z M20 8.7a8.1 8.1 0 0 0-2.4-3.9l-2.5 2.5a4.5 4.5 0 0 1 1.7 3.6v.5a2.3 2.3 0 0 1 0 4.5h-4.5l-.4.5v2.7l.4.4h4.5a5.9 5.9 0 0 0 3.2-10.8Z M7.4 20h4.5v-3.6H7.4a2.2 2.2 0 0 1-.9-.2l-.6.2-1.8 1.8-.2.6A5.8 5.8 0 0 0 7.4 20Z M7.4 8.2a5.9 5.9 0 0 0-3.5 10.5l2.6-2.6a2.3 2.3 0 0 1 3-3l2.6-2.6a5.9 5.9 0 0 0-4.7-2.3Z",
  numpy:
    "m12 1.6 4.4 2.5-4.4 2.6L7.6 4.1Zm6 3.5 4.4 2.5v5.1l-4.4-2.5Zm-12 0v5.1L1.6 12.7V7.6ZM12 8.1l4.4 2.6v5.1L12 13.2l-4.4 2.6v-5.1Zm10.4 8.1v5.1L18 18.8v-5.1Zm-20.8 0 4.4 2.5v5.1l-4.4-2.5ZM12 14.8l4.4 2.6-4.4 2.5-4.4-2.5Z",
  mlflow:
    "M12 2a10 10 0 0 0-8.5 15.3l3.2-1.9A6.3 6.3 0 0 1 12 6.4v3.1l5.5-4L12 1.5Zm8.5 4.7-3.2 1.9A6.3 6.3 0 0 1 12 17.6v-3.1l-5.5 4L12 22.5v-3.6a10 10 0 0 0 8.5-12.2Z",
  gateway:
    "M12 2 3 6v6c0 5 3.8 9.2 9 10 5.2-.8 9-5 9-10V6Zm0 2.2 7 3.1V12a8.3 8.3 0 0 1-7 8.1A8.3 8.3 0 0 1 5 12V7.3ZM8 11h8v2H8Zm2-3h4v2h-4Zm0 6h4v2h-4Z",
};

/** Returns a technology's mark, or null when it has none and text is used. */
export function TechGlyph({ name }: { name: string }) {
  const d = tech[name];
  if (!d) return null;
  return (
    <svg {...box} width={14} height={14} fill="currentColor">
      <path d={d} />
    </svg>
  );
}

export function hasTechGlyph(name: string) {
  return name in tech;
}
