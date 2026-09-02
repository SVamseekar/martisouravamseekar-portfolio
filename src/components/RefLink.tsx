import {
  DocMark,
  GithubMark,
  LinkedinMark,
  LiveMark,
  MailMark,
  OrcidMark,
  PackageMark,
} from "@/components/marks";

/**
 * External references, set as marked chips.
 *
 * Each link carries a real glyph for its destination and a shape that reflects
 * what the link is — a live deployment, a repository, an installable package, a
 * citation, a person. The glyph is inline SVG inheriting `currentColor`, so one
 * definition works in both themes without inversion.
 *
 * These are deliberately not circular icon buttons: the label stays visible, so
 * a reader always knows where a link goes before clicking it.
 */

type Variant = "deploy" | "source" | "package" | "record" | "contact";

/**
 * Identifies the destination from its URL, falling back to the variant.
 *
 * The returned tone drives the mark's own colour, so a GitHub link is GitHub's
 * ink and a PyPI link is PyPI's yellow — the marks are recognisable at a glance
 * rather than being a row of identical grey shapes.
 */
type Tone =
  | "github"
  | "linkedin"
  | "mail"
  | "orcid"
  | "pypi"
  | "live"
  | "doc";

function toneFor(variant: Variant, href: string): Tone {
  if (href.startsWith("mailto:")) return "mail";
  if (href.includes("github.com")) return "github";
  if (href.includes("linkedin.com")) return "linkedin";
  if (href.includes("orcid.org")) return "orcid";
  if (href.includes("pypi.org") || variant === "package") return "pypi";
  if (variant === "deploy") return "live";
  return "doc";
}

function Mark({ tone }: { tone: Tone }) {
  switch (tone) {
    case "github":
      return <GithubMark />;
    case "linkedin":
      return <LinkedinMark />;
    case "mail":
      return <MailMark />;
    case "orcid":
      return <OrcidMark />;
    case "pypi":
      return <PackageMark />;
    case "live":
      return <LiveMark />;
    default:
      return <DocMark />;
  }
}

export function RefLink({
  href,
  variant,
  label,
  meta,
  external = true,
}: {
  href: string;
  variant: Variant;
  /** The visible text. For source links, a repo path reads best. */
  label: string;
  /** Version, registry, or status shown alongside. */
  meta?: string;
  external?: boolean;
}) {
  const tone = toneFor(variant, href);
  return (
    <a
      className={`ref ref-${variant}`}
      data-tone={tone}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <span className="ref-mark" aria-hidden="true">
        <Mark tone={tone} />
        {variant === "deploy" && <span className="ref-pulse" />}
      </span>
      <span className="ref-label">{label}</span>
      {meta && <span className="ref-meta">{meta}</span>}
    </a>
  );
}
