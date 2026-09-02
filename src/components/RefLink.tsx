/**
 * External references, set as document metadata rather than social buttons.
 *
 * Each variant is shaped by what the link actually is:
 *   deploy   a live product — carries a status dot and the bare host
 *   source   a repository — set as a path, the way a repo is written down
 *   package  an installable — carries its version, like a lockfile line
 *   record   a citation — an identifier with its registry, like a footnote
 *   contact  a person — plain, quiet, no chrome
 *
 * None of them are circular icon buttons; all of them inherit page ink and
 * work in either theme without inversion tricks.
 */

type Variant = "deploy" | "source" | "package" | "record" | "contact";

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
  return (
    <a
      className={`ref ref-${variant}`}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {variant === "deploy" && <span className="ref-dot" aria-hidden="true" />}
      {variant === "source" && (
        <span className="ref-sigil" aria-hidden="true">
          /
        </span>
      )}
      {variant === "package" && (
        <span className="ref-sigil" aria-hidden="true">
          ↓
        </span>
      )}
      {variant === "record" && (
        <span className="ref-sigil" aria-hidden="true">
          §
        </span>
      )}
      <span className="ref-label">{label}</span>
      {meta && <span className="ref-meta">{meta}</span>}
    </a>
  );
}
