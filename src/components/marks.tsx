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
