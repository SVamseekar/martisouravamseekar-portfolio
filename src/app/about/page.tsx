import type { Metadata } from "next";
import { profile, experience, education, certifications } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";
import { RefLink } from "@/components/RefLink";
import { InstitutionMark, RegionMark, RegionMarks } from "@/components/marks";

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
                <p className="t-small row-mark">
                  <InstitutionMark name={entry.logo} className="row-mark-glyph" />
                  {entry.school}
                </p>
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
                <p className="t-small row-mark">
                  <InstitutionMark name={cert.issuerLogo} className="row-mark-glyph" />
                  {cert.name}
                </p>
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
                <p className="t-label row-mark">
                  <RegionMark name="eu" className="row-mark-glyph" />
                  European Union
                </p>
                <p className="t-small">
                  EU Blue Card eligible; open to relocation.
                </p>
              </div>
              <div className="row">
                <p className="t-label row-mark">
                  <RegionMark name="uk" className="row-mark-glyph" />
                  United Kingdom
                </p>
                <p className="t-small">
                  M.Sc. from the University of Greenwich.
                </p>
              </div>
              <div className="row">
                <p className="t-label row-mark">
                  <RegionMarks names={["us", "au", "nz", "in"]} className="row-mark-glyph" />
                  US · AU · NZ · IN
                </p>
                <p className="t-small">
                  Open to sponsorship or remote arrangements.
                </p>
              </div>
              {/* Universities are one employer of researchers in Europe, not
                  the only one: the non-university institutes, the EU's own
                  science service and the central banks all run the kind of
                  applied econometric and governance research this work sits
                  in, and several hire outside the academic job market. */}
              <div className="row">
                <p className="t-label">Research posts</p>
                <p className="t-small">
                  Open to PhD and research positions in AI governance, applied
                  econometrics, or transport equity — at universities, at the
                  non-university institutes (Max Planck, Fraunhofer, Helmholtz,
                  Leibniz, CNRS, TNO), at the European Commission&rsquo;s Joint
                  Research Centre, and in central-bank research such as the ECB.
                </p>
              </div>
            </div>
          </div>

          {/* Only the CV. Email, GitHub, LinkedIn and ORCID are in the footer
              on every page, so repeating them here was a second contact block
              competing with the eligibility rows it sits beside. */}
          <aside>
            <p className="t-label" style={{ marginBottom: "0.75rem" }}>
              CV
            </p>
            <div className="ref-stack" style={{ marginTop: "0.25rem" }}>
              <RefLink
                href={profile.cvPath}
                variant="package"
                label="CV"
                meta="pdf"
                external={false}
              />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
