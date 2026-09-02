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
                <div className="ref-stack">
                  <Link href={stack.detail} className="go">
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
