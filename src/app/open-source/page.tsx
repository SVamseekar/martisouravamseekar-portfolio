import type { Metadata } from "next";
import Link from "next/link";
import { packages } from "@/data/evidence";
import { pageMetadata } from "@/lib/seo";
import { CopyLine } from "@/components/CopyLine";
import { RefLink } from "@/components/RefLink";

export const metadata: Metadata = pageMetadata({
  title: "Open source",
  description:
    "Eight Python packages published on PyPI across two library stacks: Evgraph for executable governance evidence, and moveq for transport-equity analysis.",
  path: "/open-source",
});

/**
 * The two stacks, written for the people who would actually install them:
 * governance and ML engineers for Evgraph, transport researchers and analysts
 * for Moveq. Each says who it is for, what it produces, and where the tool
 * stops — both are libraries that report what the evidence or the data shows
 * and leave the judgment with the reader.
 */
const STACKS = [
  {
    id: "evgraph",
    name: "Evgraph",
    audience: "For AI governance reviewers and ML engineers",
    blurb:
      "Loose artifacts become one Evidence Graph: a Model Card, an approval, a deployment. A missing approval timestamp stays inconclusive. The scan does not invent the field. EU AI Assurance OS pins evgraph-cli 0.1.2 so the evidence pack and the scan share that gap.",
    detail:
      "The evgraph package does not install the evgraph command. evgraph-cli does. Findings cite the nodes they came from. A missing timestamp is not a green or red stamp, and the library does not certify regulatory compliance.",
    facts: [
      "Adapters for Model Card + approval + deployment JSON, dataset manifests, and the MLflow registry",
      "Reports as JSON, Markdown, SARIF or OSCAL Assessment Results",
      "A CI promotion gate that is report-only by default; --gate exits non-zero on unmet expectations",
      "Third-party rule packs register on the evgraph.rules entry point, with no change to core",
    ],
    install: "pip install evgraph evgraph-cli",
    usage: "evgraph scan model_card.json approval.json deployment.json --format sarif",
    repo: "https://github.com/SVamseekar/evgraph",
    docs: "/work/evgraph",
  },
  {
    id: "moveq",
    name: "Moveq",
    audience: "For transport researchers, analysts and transport authorities",
    blurb:
      "Turns raw service and demographic data — trips per area, population counts, deprivation ranks — into the standard inequality measures: population-weighted Gini, the Palma ratio, and the Wagstaff concentration index, plus a configurable composite accessibility score.",
    detail:
      "The core is pure NumPy with no required I/O or GIS dependencies, so it drops into an existing analysis without pulling a stack behind it. For cross-country work, the catalogue registry makes every methodological choice explicit: each measure is declared same, replaced by a national equivalent, or omitted — so omissions are recorded rather than silent.",
    facts: [
      "Gini, Palma ratio and Wagstaff concentration index, all population-weighted",
      "Composite scoring that handles missing terms gracefully rather than dropping the row",
      "A same / replace / omit registry for extending a method to a new country",
      "CSV-in, numbers-out CLI for quick checks and CI; optional pandas helpers via the frames extra",
    ],
    install: "pip install moveq moveq-cli",
    usage: "moveq gini areas.csv --population pop --value trips",
    repo: "https://github.com/SVamseekar/moveq",
    site: "https://moveq.souravamseekar.com",
    docs: "/work/moveq",
  },
] as const;

export default function OpenSourcePage() {
  return (
    <>
      <header className="shell shell-wide page-head">
        <h1 className="t-title" style={{ marginBottom: "0.75rem" }}>
          Open source
        </h1>
        <p className="t-lead measure-wide">
          Two library stacks, eight packages, installable from PyPI — one for
          the people who have to evidence an AI system, one for the people who
          have to measure who a transport network leaves out. Both are
          libraries rather than hosted products, with no framework lock-in:
          they compute what the data shows and leave the judgment to you.
        </p>
      </header>

      {STACKS.map((stack) => {
        const members = packages.filter((pkg) => pkg.stack === stack.id);

        return (
          <section key={stack.id} className="shell shell-wide band band-rule">
            <div className="split">
              <div>
                <h2 className="t-heading" style={{ marginBottom: "0.3rem" }}>
                  {stack.name}
                </h2>
                <p className="t-label" style={{ marginBottom: "0.8rem" }}>
                  {stack.audience}
                </p>
                <p className="t-body measure" style={{ marginBottom: "0.9rem" }}>
                  {stack.blurb}
                </p>
                <p className="t-small ink-soft measure" style={{ marginBottom: "1rem" }}>
                  {stack.detail}
                </p>

                <ul className="notes measure" style={{ marginBottom: "1.25rem" }}>
                  {stack.facts.map((fact) => (
                    <li key={fact} className="t-small">
                      {fact}
                    </li>
                  ))}
                </ul>

                <CopyLine label="Install" command={stack.install} />
                <CopyLine label="Use" command={stack.usage} />
              </div>

              <aside>
                <p className="t-label" style={{ marginBottom: "0.6rem" }}>
                  Links
                </p>
                <div className="ref-stack">
                  <Link href={stack.docs} className="go">
                    How it works
                  </Link>
                  <RefLink
                    href={stack.repo}
                    variant="source"
                    label={stack.repo.replace("https://github.com/", "")}
                  />
                  {"site" in stack && stack.site && (
                    <RefLink
                      href={stack.site}
                      variant="deploy"
                      label={stack.site.replace("https://", "")}
                      meta="live"
                    />
                  )}
                  <RefLink
                    href={`https://pypi.org/project/${stack.id}/`}
                    variant="package"
                    label={`pypi.org/project/${stack.id}`}
                  />
                </div>
              </aside>
            </div>

            <div className="rows" style={{ marginTop: "1.5rem" }}>
              {members.map((pkg) => (
                <div key={pkg.name} className="row">
                  <RefLink
                    href={`https://pypi.org/project/${pkg.name}/`}
                    variant="package"
                    label={pkg.name}
                  />
                  <p className="t-small">{pkg.summary}</p>
                  <span className="t-mono ink-faint">v{pkg.version}</span>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <section className="shell shell-wide band band-rule">
        <p className="t-small ink-faint measure">
          Package versions shown here are checked against the PyPI API on every
          build. If a version drifts, the build fails rather than the page
          quietly going stale.
        </p>
      </section>
    </>
  );
}
