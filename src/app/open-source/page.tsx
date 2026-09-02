import type { Metadata } from "next";
import Link from "next/link";
import { packages } from "@/data/evidence";
import { pageMetadata } from "@/lib/seo";
import { CopyLine } from "@/components/CopyLine";

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
    install: "pip install evgraph evgraph-cli",
    usage: "evgraph scan model_card.json approval.json deployment.json --format sarif",
    repo: "https://github.com/SVamseekar/evgraph",
    detail: "/work/evgraph",
  },
  {
    id: "moveq",
    name: "moveq",
    blurb:
      "Standard inequality measures over service and demographic data — Gini, Palma, concentration index — with a registry that keeps cross-country methods honest.",
    install: "pip install moveq moveq-cli",
    usage: "moveq gini areas.csv --population pop --value trips",
    repo: "https://github.com/SVamseekar/moveq",
    site: "https://moveq.souravamseekar.com",
    detail: "/work/moveq",
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
          Two library stacks, eight packages, installable from PyPI. Both are
          libraries rather than hosted products: they compute what the data
          shows and leave the judgment to you.
        </p>
      </header>

      {STACKS.map((stack) => {
        const members = packages.filter((pkg) => pkg.stack === stack.id);

        return (
          <section key={stack.id} className="shell shell-wide band band-rule">
            <div className="split">
              <div>
                <h2 className="t-heading" style={{ marginBottom: "0.6rem" }}>
                  {stack.name}
                </h2>
                <p className="t-body measure" style={{ marginBottom: "1rem" }}>
                  {stack.blurb}
                </p>

                <CopyLine label="Install" command={stack.install} />
                <CopyLine label="Use" command={stack.usage} />
              </div>

              <aside>
                <p className="t-label" style={{ marginBottom: "0.6rem" }}>
                  Links
                </p>
                <div className="link-stack">
                  <Link href={stack.detail} className="go">
                    How it works
                  </Link>
                  <a href={stack.repo} target="_blank" rel="noreferrer" className="go">
                    Source
                  </a>
                  {"site" in stack && stack.site && (
                    <a href={stack.site} target="_blank" rel="noreferrer" className="go">
                      {stack.site.replace("https://", "")}
                    </a>
                  )}
                  <a
                    href={`https://pypi.org/project/${stack.id}/`}
                    target="_blank"
                    rel="noreferrer"
                    className="go"
                  >
                    PyPI project
                  </a>
                </div>
              </aside>
            </div>

            <div className="rows" style={{ marginTop: "1.5rem" }}>
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
