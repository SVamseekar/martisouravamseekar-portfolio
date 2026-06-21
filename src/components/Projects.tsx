import { profile } from "@/data/profile";
import { primaryProjects } from "@/data/projects";
import { Highlight } from "@/lib/highlight";

export function Projects() {
  return (
    <section className="section" id="work">
      <div className="section-head">
        <h2 className="section-title">Live products</h2>
        <p className="section-desc">
          Each project runs on its own subdomain at {profile.domain}. Click
          through to the live deployment.
        </p>
      </div>

      <ol className="project-list">
        {primaryProjects.map((project) => (
          <li key={project.name} className="project-item">
            <div className="project-item-head">
              <div>
                <h3 className="project-name">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="project-live-link"
                  >
                    {project.name}
                  </a>
                </h3>
                <p className="project-tagline">
                  <Highlight text={project.tagline} />
                </p>
              </div>
              <div className="project-item-meta">
                <span className="live-status">
                  <span className="live-status-dot" aria-hidden="true" />
                  Live
                </span>
                <span className="project-period">{project.period}</span>
              </div>
            </div>

            {project.regulation && (
              <p className="project-regulation">{project.regulation}</p>
            )}

            <ul className="project-metrics">
              {project.metrics.map((metric) => (
                <li key={metric}>
                  <Highlight text={metric} />
                </li>
              ))}
            </ul>

            <div className="project-footer">
              <div className="project-stack">
                {project.stack.map((tech) => (
                  <span key={tech} className="stack-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="project-links">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link text-link-arrow"
                >
                  {project.liveUrl.replace("https://", "")}
                  <span className="text-link-arrow-glyph" aria-hidden="true">
                    →
                  </span>
                </a>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-link text-link-muted text-link-arrow"
                  >
                    Source
                    <span className="text-link-arrow-glyph" aria-hidden="true">
                      →
                    </span>
                  </a>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}