import { Certifications } from "@/components/Certifications";
import { UniversityLogo } from "@/components/UniversityLogo";
import { education, experience, skillGroups } from "@/data/profile";

export function Background() {
  return (
    <section className="section" id="background">
      <div className="section-head">
        <h2 className="section-title">Background</h2>
      </div>

      <div className="background-grid">
        <div className="background-block background-block-wide">
          <h3 className="background-label">Experience</h3>
          <div className="background-entry">
            <div className="background-entry-head">
              <strong>{experience.role}</strong>
              <span>{experience.period}</span>
            </div>
            <p className="background-entry-org">
              {experience.company} · {experience.location}
            </p>
            <p className="background-entry-sector">{experience.sector}</p>
            <ul className="background-highlights">
              {experience.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="background-entry-links">
              {experience.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="background-block background-block-wide">
          <h3 className="background-label">Education</h3>
          <div className="education-grid">
            {education.map((item) => (
              <div key={item.degree} className="background-entry education-entry">
                <div className="background-entry-head">
                  <strong>{item.degree}</strong>
                  <span>{item.period}</span>
                </div>
                <div className="background-entry-org background-entry-org-with-logo">
                  <UniversityLogo name={item.logo} />
                  <span className="education-school-name">{item.school}</span>
                </div>
                <p className="education-result">{item.result}</p>
                <div className="background-entry-links">
                  {item.documents.map((doc) => (
                    <a
                      key={doc.href}
                      href={doc.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-link"
                    >
                      {doc.label}
                    </a>
                  ))}
                </div>
                <p className="background-entry-text">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        <Certifications />

        <div className="background-block background-block-wide">
          <h3 className="background-label">Technical skills</h3>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <div key={group.label} className="skills-group">
                <p className="skills-group-label">{group.label}</p>
                <p className="skills-group-items">{group.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}