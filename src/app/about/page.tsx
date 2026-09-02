import type { Metadata } from "next";
import { profile, experience, education, certifications } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";
import { RefLink } from "@/components/RefLink";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "AI and data platform engineer. Currently building AI-powered equity research and trading infrastructure. M.Sc. Data Science, University of Greenwich. Open to roles worldwide.",
  path: "/about",
});

/**
 * About.
 *
 * The CV material, kept deliberately last and compact. Eligibility is stated
 * here rather than in the hero: the audience is recruiters across several
 * markets, and leading with one region's visa status narrows the funnel
 * before anyone has seen the work.
 */
export default function AboutPage() {
  return (
    <>
      <header className="shell shell-wide page-head">
        <h1 className="t-title" style={{ marginBottom: "1rem" }}>
          About
        </h1>
        <p className="t-lead measure-wide">
          I work on the part of a system that has to hold up under scrutiny —
          where a number needs provenance, a decision needs a record, and
          &ldquo;trust me&rdquo; is not an acceptable answer.
        </p>
      </header>

      <section className="shell shell-wide band band-rule">
        <div className="split">
          <div>
            <h2 className="t-section eyebrow-line">Now</h2>
            <h2 className="t-heading" style={{ marginBottom: "0.35rem" }}>
              {experience.role}
            </h2>
            <p className="t-small ink-faint" style={{ marginBottom: "1.25rem" }}>
              {experience.company} · {experience.location} · {experience.period}
            </p>
            <ul className="notes">
              {experience.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>

          <aside>
            <p className="t-label" style={{ marginBottom: "0.75rem" }}>
              Sector
            </p>
            <p className="t-small">{experience.sector}</p>
          </aside>
        </div>
      </section>

      <section className="shell shell-wide band band-rule">
        <h2 className="t-section eyebrow-line">Education</h2>
        <div className="rows">
          {education.map((entry) => (
            <div key={entry.degree} className="row">
              <div>
                <p className="t-small ink-strong">{entry.degree}</p>
                <p className="t-mono ink-faint">{entry.period}</p>
              </div>
              <div>
                <p className="t-small">{entry.school}</p>
                <p className="t-small ink-faint">{entry.note}</p>
              </div>
              <span className="t-mono ink-faint">{entry.result}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="shell shell-wide band band-rule">
        <h2 className="t-section eyebrow-line">Certification</h2>
        <div className="rows">
          {certifications.map((cert) => (
            <div key={cert.id} className="row">
              <p className="t-small ink-strong">{cert.exam}</p>
              <div>
                <p className="t-small">{cert.name}</p>
                <p className="t-mono ink-faint">
                  {cert.issuer} · {cert.date}
                </p>
              </div>
              <a href={cert.document.href} className="go">
                Certificate
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Eligibility, stated once and plainly, without narrowing to one market. */}
      <section className="shell shell-wide band band-rule">
        <div className="split">
          <div>
            <h2 className="t-section eyebrow-line">Working together</h2>
            <p className="t-body measure" style={{ marginBottom: "1.5rem" }}>
              Open to engineering and research roles worldwide — remote or
              relocating — at anything from seed-stage to large organisations.
              Based in {profile.location}.
            </p>

            <div className="rows">
              <div className="row">
                <p className="t-label">European Union</p>
                <p className="t-small">
                  EU Blue Card eligible; open to relocation.
                </p>
              </div>
              <div className="row">
                <p className="t-label">United Kingdom</p>
                <p className="t-small">
                  M.Sc. from the University of Greenwich.
                </p>
              </div>
              <div className="row">
                <p className="t-label">US · Australia · NZ · India</p>
                <p className="t-small">
                  Open to sponsorship or remote arrangements.
                </p>
              </div>
              <div className="row">
                <p className="t-label">Universities</p>
                <p className="t-small">
                  Open to PhD positions in AI governance, applied econometrics,
                  or transport equity.
                </p>
              </div>
            </div>
          </div>

          <aside>
            <p className="t-label" style={{ marginBottom: "0.75rem" }}>
              Contact
            </p>
            <p className="t-small" style={{ marginBottom: "1.25rem" }}>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </p>

            <div className="ref-stack">
              <RefLink
                href={profile.cvPath}
                variant="package"
                label="CV"
                meta="pdf"
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
                label={profile.linkedin.replace("https://www.linkedin.com/in/", "linkedin/")}
              />
              <RefLink
                href={profile.orcid}
                variant="record"
                label={profile.orcid.replace("https://orcid.org/", "ORCID ")}
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
