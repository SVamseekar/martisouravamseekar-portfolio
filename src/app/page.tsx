import Link from "next/link";
import { systems } from "@/data/systems";
import { counts } from "@/data/evidence";
import { research } from "@/data/profile";
import { buildHomeJsonLd } from "@/lib/seo";

/**
 * Home.
 *
 * Deliberately short. Its whole job is to say what the work is, prove the
 * claim is checkable, and route the two audiences onward — recruiters to
 * /work, researchers to /research. Depth lives on the pages themselves.
 */
export default function Home() {
  const jsonLd = buildHomeJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="shell shell-wide hero">
        <h1 className="t-display hero-title">
          I build systems that have to prove what they did.
        </h1>

        <p className="t-lead hero-lead">
          Pay-transparency reporting, AI Act release gates, transport equity.
          Regulated domains where the answer is worth little without the
          evidence behind it — so the audit trail is the product, not a
          feature bolted on at the end.
        </p>

        <div className="hero-actions">
          <Link href="/work" className="btn btn-primary">
            See the work
          </Link>
          <Link href="/research" className="btn btn-quiet">
            Read the paper
          </Link>
        </div>
      </section>

      {/* The claim, made countable. Every figure links to where it can be checked. */}
      <section className="shell shell-wide" aria-label="Verified summary">
        <div className="proof">
          <div className="proof-cell">
            <p className="proof-value ink-strong">{counts.liveSystems}</p>
            <p className="t-label proof-label">
              <span className="dot dot-live" aria-hidden="true" />
              systems live in production
            </p>
          </div>
          <div className="proof-cell">
            <p className="proof-value ink-strong">{counts.packages}</p>
            <p className="t-label proof-label">packages published on PyPI</p>
          </div>
          <div className="proof-cell">
            <p className="proof-value ink-strong">1</p>
            <p className="t-label proof-label">working paper, with DOI</p>
          </div>
          <div className="proof-cell">
            <p className="proof-value ink-strong">27</p>
            <p className="t-label proof-label">EU states in the panel</p>
          </div>
        </div>
      </section>

      <section className="shell shell-wide section">
        <div className="eyebrow">
          <span className="t-label">Selected work</span>
        </div>

        <div className="card-grid">
          {systems.map((system) => (
            <Link
              key={system.slug}
              href={`/work/${system.slug}`}
              className="card"
            >
              <div className="card-head">
                <h2 className="card-name">{system.name}</h2>
                <span className="status">
                  {system.status === "live" && (
                    <>
                      <span className="dot dot-live" aria-hidden="true" />
                      Live
                    </>
                  )}
                  {system.status === "packages" && "PyPI"}
                </span>
              </div>
              <p className="t-small">{system.whatItIs}</p>
              <div className="tags">
                {system.stack.slice(0, 4).map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="shell shell-wide section section-rule">
        <div className="split">
          <div>
            <div className="eyebrow">
              <span className="t-label">Research</span>
            </div>
            <h2 className="t-title" style={{ marginBottom: "1rem" }}>
              {research.title}
            </h2>
            <p className="t-body measure" style={{ marginBottom: "1.5rem" }}>
              Tight labour markets are supposed to close gender pay gaps
              through competition for workers. Across 27 member states and six
              years, the association runs the other way. The panel behind that
              finding is the same warehouse that serves WorkforceGuard in
              production.
            </p>
            <Link href="/research" className="go">
              The finding, the method, and the data
            </Link>
          </div>

          <aside>
            <p className="t-label" style={{ marginBottom: "0.75rem" }}>
              Published
            </p>
            <p className="t-mono ink-soft">
              MPRA 129330
              <br />
              Zenodo DOI
              <br />
              ORCID 0009-0005-4884-1292
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
