import { IconLink } from "@/components/IconLink";
import { research } from "@/data/profile";
import { Highlight } from "@/lib/highlight";

export function Research() {
  return (
    <section className="section" id="research">
      <div className="section-head">
        <h2 className="section-title">Published research</h2>
      </div>

      <article className="research-card">
        <p className="research-venue">
          {research.author} · {research.venue}
        </p>
        <h3 className="research-title">
          <a
            href={research.publications[0].href}
            target="_blank"
            rel="noreferrer"
          >
            {research.title}
          </a>
        </h3>
        <p className="research-summary">
          <Highlight text={research.summary} />
        </p>
        <div className="research-method">
          <span className="research-method-name">{research.methodology.name}</span>
          <span className="research-method-detail">{research.methodology.detail}</span>
        </div>
        <div className="icon-link-row">
          {research.publications.map((pub) => (
            <IconLink
              key={pub.label}
              href={pub.href}
              icon={pub.icon}
              label={pub.label}
              external
            />
          ))}
        </div>
      </article>
    </section>
  );
}