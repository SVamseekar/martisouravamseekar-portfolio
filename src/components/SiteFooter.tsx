import Link from "next/link";
import { profile } from "@/data/profile";

const ELSEWHERE = [
  { href: profile.github, label: "GitHub" },
  { href: profile.linkedin, label: "LinkedIn" },
  { href: profile.orcid, label: "ORCID" },
  { href: "https://blog.souravamseekar.com", label: "Blog" },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-foot">
      <div className="shell shell-wide foot-grid">
        <div>
          <p className="t-small ink-strong" style={{ marginBottom: "0.35rem" }}>
            {profile.name}
          </p>
          <p className="t-small">
            Open to engineering and research roles worldwide.{" "}
            <Link href="/about" className="go">
              How to reach me
            </Link>
          </p>
        </div>

        <nav aria-label="Elsewhere" className="foot-links">
          {ELSEWHERE.map(({ href, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer">
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div className="shell shell-wide">
        <p className="t-mono ink-faint" style={{ marginTop: "2rem" }}>
          © {new Date().getFullYear()} {profile.name} · Every figure on this
          site links to its source.
        </p>
      </div>
    </footer>
  );
}
