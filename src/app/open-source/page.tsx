import type { Metadata } from "next";
import Link from "next/link";
import { packages } from "@/data/evidence";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Open source",
  description:
    "Eight Python packages published on PyPI across two library stacks: Evgraph for executable governance evidence, and moveq for transport-equity analysis.",
  path: "/open-source",
});

const STACKS = [
  {
    id: "evgraph",
    name: "Evgraph",
    blurb:
      "Turns Model Cards, approvals and registry metadata into one evidence graph, then runs deterministic rules over it and reports findings with citations.",
    repo: "https://github.com/SVamseekar/evgraph",
    detail: "/work/evgraph",
  },
  {
    id: "moveq",
    name: "moveq",
    blurb:
      "Standard inequality measures over service and demographic data — Gini, Palma, concentration index — with a registry for keeping cross-country methods honest.",
    repo: "https://github.com/SVamseekar/moveq",
  },
] as const;

export default function OpenSourcePage() {
  return (
    <>
      <header className="shell shell-wide detail-head">
        <h1 className="t-title" style={{ marginBottom: "1rem" }}>
          Open source
        </h1>
        <p className="t-lead measure">
          Two library stacks, eight packages, installable from PyPI. Both are
          libraries rather than hosted products: they compute what the data
          shows and leave the judgment to you.
        </p>
      </header>

      {STACKS.map((stack) => {
        const members = packages.filter((pkg) => pkg.stack === stack.id);

        return (
          <section
            key={stack.id}
            className="shell shell-wide section section-rule"
          >
            <div className="split">
              <div>
                <h2 className="t-heading" style={{ marginBottom: "0.75rem" }}>
                  {stack.name}
                </h2>
                <p className="t-body measure" style={{ marginBottom: "1.25rem" }}>
                  {stack.blurb}
                </p>
                <div className="detail-meta" style={{ marginTop: 0 }}>
                  <a
                    href={stack.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="go"
                  >
                    Source
                  </a>
                  {"detail" in stack && stack.detail && (
                    <Link href={stack.detail} className="go">
                      How it works
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="rows" style={{ marginTop: "2rem" }}>
              {members.map((pkg) => (
                <div key={pkg.name} className="row">
                  <a
                    href={`https://pypi.org/project/${pkg.name}/`}
                    target="_blank"
                    rel="noreferrer"
                    className="row-name"
                  >
                    {pkg.name}
                  </a>
                  <p className="t-small">{pkg.summary}</p>
                  <span className="t-mono ink-faint">v{pkg.version}</span>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <section className="shell shell-wide section section-rule">
        <p className="t-small ink-faint measure">
          Package versions shown here are checked against the PyPI API on every
          build. If a version drifts, the build fails rather than the page
          quietly going stale.
        </p>
      </section>
    </>
  );
}
