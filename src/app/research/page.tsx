import type { Metadata } from "next";
import Link from "next/link";
import { research } from "@/data/profile";
import { publications } from "@/data/evidence";
import { pageMetadata, buildScholarlyArticleSchema } from "@/lib/seo";
import { FindingExplainer } from "@/components/explainers/FindingExplainer";
import { RefLink } from "@/components/RefLink";

export const metadata: Metadata = pageMetadata({
  title: "Research",
  description:
    "Why tight labour markets do not close gender pay gaps: evidence from a 27-country Eurostat panel, 2019–2024. Working paper (MPRA 129330), with the analysis running on the same warehouse as the production platform.",
  path: "/research",
});

/**
 * Research.
 *
 * Written for principal investigators: the finding first, then the method,
 * the limits, and the record. The limits section is deliberate — stating
 * what the paper does not claim is what makes the rest credible.
 */
export default function ResearchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildScholarlyArticleSchema()),
        }}
      />

      <header className="shell shell-wide page-head">
        <p className="t-label" style={{ marginBottom: "1rem" }}>
          Working paper · 2026
        </p>
        <h1 className="t-title measure" style={{ marginBottom: "1.25rem" }}>
          {research.title}
        </h1>
        <p className="t-lead measure-wide">
          Competition for workers is supposed to bid wages up and close the
          gender pay gap. Across 27 member states and six years, employment and
          the pay gap move together instead.
        </p>

        <div className="detail-meta ref-list">
          {publications.map((publication) => (
            <RefLink
              key={publication.label}
              href={publication.href}
              variant="record"
              label={publication.label}
            />
          ))}
        </div>
      </header>

      <section className="shell shell-wide band">
        <FindingExplainer />
      </section>

      <section className="shell shell-wide band band-rule">
        <div className="split">
          <div>
            <h2 className="t-section eyebrow-line">Method</h2>
            <ul className="notes measure">
              <li>
                A 27-country panel built from Eurostat Labour Force Survey, Job
                Vacancy Statistics and Structure of Earnings Survey data,
                covering 2019–2024 across 11 NACE sectors.
              </li>
              <li>
                Four composite indices — HPI, LR, ERS and TR — defined over the
                panel, with a Combined Risk Quadrant typology formed from HPI ×
                ERS.
              </li>
              <li>
                Sector decomposition separates the aggregate: finance carries a
                gap near 25% against an all-sector panel mean near 10.9%, so the
                headline figure hides most of the variation.
              </li>
              <li>
                The same metrics run in production inside WorkforceGuard, on the
                same warehouse, with a SHA-256 hash-chained governance log — the
                published figures and the shipped figures cannot silently
                diverge.
              </li>
            </ul>
          </div>

          <aside>
            <p className="t-label" style={{ marginBottom: "0.75rem" }}>
              At a glance
            </p>
            <div className="rows">
              {[
                ["Panel", "27 member states"],
                ["Period", "2019–2024"],
                ["Sectors", "11 NACE"],
                ["Association", "r ≈ +0.44"],
              ].map(([key, value]) => (
                <div key={key} className="row" style={{ display: "block" }}>
                  <p className="t-label">{key}</p>
                  <p className="t-mono ink-strong">{value}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* Stating the limits plainly is what makes the claims usable. */}
      <section className="shell shell-wide band band-rule">
        <h2 className="t-section eyebrow-line">What this does not claim</h2>
        <ul className="notes measure">
          <li>
            This is a working paper. It has not been peer reviewed, and the
            estimates should be read as provisional.
          </li>
          <li>
            The association is cross-sectional. It does not identify a causal
            effect of labour-market tightness on the pay gap.
          </li>
          <li>
            Composite indices are constructed measures. They are defined in the
            paper and reproducible from it, not standard statistics.
          </li>
        </ul>
      </section>

      <section className="shell shell-wide band band-rule">
        <div className="split">
          <div>
            <h2 className="t-section eyebrow-line">The system behind it</h2>
            <p className="t-body measure" style={{ marginBottom: "1.25rem" }}>
              The panel is not a one-off script. It is the warehouse that
              serves WorkforceGuard in production, so the research figures and
              the product&rsquo;s figures come from the same models.
            </p>
            <Link href="/work/workforceguard" className="go">
              WorkforceGuard AI
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
