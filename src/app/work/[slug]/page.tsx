import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { systems, getSystem } from "@/data/systems";
import { pageMetadata } from "@/lib/seo";
import { SystemExplainer } from "@/components/explainers/SystemExplainer";
import { StackSpec } from "@/components/StackSpec";
import { RefLink } from "@/components/RefLink";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return systems.map((system) => ({ slug: system.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const system = getSystem(slug);
  if (!system) return {};

  return pageMetadata({
    title: system.name,
    description: system.whatItIs,
    path: `/work/${system.slug}`,
  });
}

const STATUS_LABEL = {
  live: "Live",
  packages: "Published packages",
  source: "Source available",
} as const;

export default async function SystemPage({ params }: Params) {
  const { slug } = await params;
  const system = getSystem(slug);
  if (!system) notFound();

  return (
    <article>
      {/* ---- What is it ---- */}
      <header className="shell shell-wide page-head">
        <p className="t-label crumb">
          <Link href="/work">Work</Link> / {system.name}
        </p>

        <h1 className="t-title" style={{ marginBottom: "0.75rem" }}>
          {system.name}
        </h1>

        <p className="t-lead measure-wide">{system.whatItIs}</p>

        <div className="meta-row">
          <span className="status">
            {system.status === "live" && (
              <span className="dot dot-live" aria-hidden="true" />
            )}
            {STATUS_LABEL[system.status]}
          </span>
          <span className="t-mono ink-faint">{system.period}</span>
          {system.regulation && (
            <span className="t-mono ink-faint">{system.regulation}</span>
          )}
          {system.note && (
            <span className="t-mono ink-faint">{system.note}</span>
          )}
        </div>

        <div className="meta-row ref-list">
          {system.liveUrl && (
            <RefLink
              href={system.liveUrl}
              variant="deploy"
              label={system.liveUrl.replace("https://", "")}
              meta="live"
            />
          )}
          {system.githubUrl && (
            <RefLink
              href={system.githubUrl}
              variant="source"
              label={system.githubUrl.replace("https://github.com/", "")}
            />
          )}
        </div>
      </header>

      {/* ---- Problem ---- */}
      <section className="shell shell-wide band">
        <div className="split">
          <div>
            <h2 className="t-section eyebrow-line">The problem</h2>
            <p className="t-body measure">{system.problem}</p>
          </div>
          <aside>
            <p className="t-label" style={{ marginBottom: "0.4rem" }}>
              Built for
            </p>
            {/* The stored string opens with "For …" so it reads as a sentence
                in the index; the heading here already says it. */}
            <p className="t-small">{system.forWhom.replace(/^For /, "")}</p>
          </aside>
        </div>
      </section>

      {/* ---- What actually happens ---- */}
      <section className="shell shell-wide band">
        <SystemExplainer name={system.explainer} />
      </section>

      {/* ---- How it works ---- */}
      <section className="shell shell-wide band band-rule">
        <h2 className="t-section eyebrow-line">How it works</h2>
        <ol className="steps">
          {system.story.map((item, index) => (
            <li key={item.step} className="step">
              <span className="step-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="step-title">{item.step}</p>
                <p className="t-small">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ---- Capabilities, where the surface is broad ---- */}
      {system.capabilities && (
        <section className="shell shell-wide band band-rule">
          <h2 className="t-section eyebrow-line">What it covers</h2>
          <div className="cap-grid">
            {system.capabilities.map((capability) => (
              <div key={capability.area} className="cap">
                <p className="cap-area">{capability.area}</p>
                <p className="t-small">{capability.detail}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---- Engineering notes ---- */}
      <section className="shell shell-wide band band-rule">
        <div className="split split-spec">
          <div>
            <h2 className="t-section eyebrow-line">Engineering notes</h2>
            <ul className="notes">
              {system.build.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
          <aside>
            <p className="t-label" style={{ marginBottom: "0.7rem" }}>
              Built from
            </p>
            <StackSpec stack={system.stack} roles={system.stackRoles} />
          </aside>
        </div>
      </section>

      {/* ---- Architecture, where a second diagram earns its place ---- */}
      {system.architectureExplainer && (
        <section className="shell shell-wide band band-rule">
          <SystemExplainer name={system.architectureExplainer} />
        </section>
      )}

      {/* ---- Trade-offs ---- */}
      {system.tradeoffs && (
        <section className="shell shell-wide band band-rule">
          <h2 className="t-section eyebrow-line">Trade-offs</h2>
          <div className="rows">
            {system.tradeoffs.map((tradeoff) => (
              <div key={tradeoff.choice} className="row row-tradeoff">
                <div>
                  <p className="t-small ink-strong">{tradeoff.choice}</p>
                  <p className="t-mono ink-faint">instead of {tradeoff.instead}</p>
                </div>
                <p className="t-small">{tradeoff.why}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---- Evidence ---- */}
      <section className="shell shell-wide band band-rule">
        <h2 className="t-section eyebrow-line">Evidence</h2>
        <div className="figures">
          {system.figures.map((figure) => (
            <div key={figure.label}>
              <p className="figure-value ink-strong">{figure.value}</p>
              <p className="t-label" style={{ marginTop: "0.3rem" }}>
                {figure.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <nav className="shell shell-wide band band-rule">
        <Link href="/work" className="go">
          All systems
        </Link>
      </nav>
    </article>
  );
}
