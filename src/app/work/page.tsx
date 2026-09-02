import type { Metadata } from "next";
import Link from "next/link";
import { workGroups } from "@/data/systems";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Five production systems in regulated domains: EU pay transparency, AI Act release gating, transport equity, governance evidence, and multi-country restaurant operations.",
  path: "/work",
});

export default function WorkIndex() {
  return (
    <>
      <section className="shell shell-wide page-head">
        <h1 className="t-title" style={{ marginBottom: "1rem" }}>
          Five systems
        </h1>
        <p className="t-lead measure-wide">
          Each one exists because a decision had to be defensible to someone
          else — a regulator, an auditor, a transport authority. Open any of
          them for the system story, the architecture and the trade-offs. The
          published Python packages are on{" "}
          <Link href="/open-source">Open source</Link>.
        </p>
      </section>

      <section className="shell shell-wide band">
        {workGroups.map((group) => (
          <div key={group.id} className="group-block">
            <p className="t-label group-label">{group.label}</p>
            <div className="rows">
              {group.items.map((system) => (
                <article key={system.slug} className="row row-system">
                  <div>
                    <Link href={`/work/${system.slug}`} className="row-title">
                      {system.name}
                    </Link>
                    <p className="t-mono ink-faint" style={{ marginTop: "0.35rem" }}>
                      {system.period}
                    </p>
                  </div>

                  <div>
                    <p className="t-small ink-soft">{system.whatItIs}</p>
                    <p className="t-small ink-faint" style={{ marginTop: "0.5rem" }}>
                      {system.forWhom}
                    </p>
                  </div>

                  <span className="status">
                    {system.status === "live" && (
                      <span className="dot dot-live" aria-hidden="true" />
                    )}
                    {system.status === "live"
                      ? "Live"
                      : system.status === "packages"
                        ? "PyPI"
                        : "Source"}
                  </span>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
