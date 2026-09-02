import Link from "next/link";
import { profile } from "@/data/profile";
import { RefLink } from "@/components/RefLink";

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

        <nav aria-label="Elsewhere" className="ref-list">
          <RefLink
            href={`mailto:${profile.email}`}
            variant="contact"
            label={profile.email}
            external={false}
          />
          <RefLink
            href={profile.github}
            variant="source"
            label={profile.github.replace("https://github.com/", "")}
          />
          <RefLink
            href={profile.linkedin}
            variant="contact"
            label="linkedin"
          />
          <RefLink
            href={profile.orcid}
            variant="record"
            label="ORCID"
          />
          <RefLink
            href="https://blog.souravamseekar.com"
            variant="deploy"
            label="blog"
          />
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
