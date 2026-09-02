import type { Metadata } from "next";
import Link from "next/link";
import { systems } from "@/data/systems";
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
      <section className="shell shell-wide detail-head">
        <h1 className="t-title" style={{ marginBottom: "1rem" }}>
          Five systems
        </h1>
        <p className="t-lead measure">
          Each one exists because a decision had to be defensible to someone
          else — a regulator, an auditor, a transport authority. Open any of
          them to see how it works for the people who use it.
        </p>
      </section>

      <section className="shell shell-wide" style={{ paddingBottom: "3rem" }}>
        <div className="rows">
          {systems.map((system) => (
            <article key={system.slug} className="row">
              <div>
                <Link
                  href={`/work/${system.slug}`}
                  className="t-heading"
                  style={{ textDecoration: "none" }}
                >
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
                {system.status === "live" ? (
                  <>
                    <span className="dot dot-live" aria-hidden="true" />
                    Live
                  </>
                ) : (
                  "PyPI"
                )}
              </span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
