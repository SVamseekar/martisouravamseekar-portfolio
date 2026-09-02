import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { systems, getSystem } from "@/data/systems";
import { pageMetadata } from "@/lib/seo";
import { SystemExplainer } from "@/components/explainers/SystemExplainer";

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

export default async function SystemPage({ params }: Params) {
  const { slug } = await params;
  const system = getSystem(slug);
  if (!system) notFound();

  return (
    <article>
      <header className="shell shell-wide detail-head">
        <p className="t-label" style={{ marginBottom: "1rem" }}>
          <Link href="/work" style={{ textDecoration: "none" }}>
            Work
          </Link>{" "}
          / {system.name}
        </p>

        <h1 className="t-title" style={{ marginBottom: "1rem" }}>
          {system.name}
        </h1>

        <p className="t-lead measure">{system.whatItIs}</p>

        <div className="detail-meta">
          <span className="status">
            {system.status === "live" ? (
              <>
                <span className="dot dot-live" aria-hidden="true" />
                Live
              </>
            ) : (
              "Published packages"
            )}
          </span>
          <span className="t-mono ink-faint">{system.period}</span>
          {system.regulation && (
            <span className="t-mono ink-faint">{system.regulation}</span>
          )}
        </div>

        <div className="detail-meta">
          {system.liveUrl && (
            <a
              href={system.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="go"
            >
              {system.liveUrl.replace("https://", "")}
            </a>
          )}
          {system.githubUrl && (
            <a
              href={system.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="go"
            >
              Source
            </a>
          )}
        </div>
      </header>

      {/* The problem, in the user's terms, before any solution is described. */}
      <section className="shell shell-wide" style={{ paddingBottom: "2.5rem" }}>
        <div className="split">
          <div>
            <div className="eyebrow">
              <span className="t-label">The problem</span>
            </div>
            <p className="t-body measure">{system.problem}</p>
          </div>
          <aside>
            <p className="t-label" style={{ marginBottom: "0.5rem" }}>
              Built for
            </p>
            {/* The stored string opens with "For …" so it reads as a sentence
                in the index; the heading here already says it. */}
            <p className="t-small">{system.forWhom.replace(/^For /, "")}</p>
          </aside>
        </div>
      </section>

      {/* The explainer — the thing a PDF cannot do. */}
      <section className="shell shell-wide" style={{ paddingBottom: "3rem" }}>
        <SystemExplainer name={system.explainer} />

        <div className="figures">
          {system.figures.map((figure) => (
            <div key={figure.label}>
              <p className="figure-value ink-strong">{figure.value}</p>
              <p className="t-label" style={{ marginTop: "0.4rem" }}>
                {figure.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works for the person using it — sequential, so numbered. */}
      <section className="shell shell-wide section section-rule">
        <div className="eyebrow">
          <span className="t-label">How it works</span>
        </div>

        <ol className="steps measure">
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

      {/* The engineering, for the reader assessing the build. */}
      <section className="shell shell-wide section section-rule">
        <div className="split">
          <div>
            <div className="eyebrow">
              <span className="t-label">Engineering notes</span>
            </div>
            <ul className="notes">
              {system.build.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>

          <aside>
            <p className="t-label" style={{ marginBottom: "0.75rem" }}>
              Stack
            </p>
            <div className="stack-list">
              {system.stack.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <nav className="shell shell-wide section section-rule">
        <Link href="/work" className="go">
          All systems
        </Link>
      </nav>
    </article>
  );
}
