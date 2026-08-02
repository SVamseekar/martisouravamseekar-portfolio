import { IconLink } from "@/components/IconLink";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section className="section section-contact" id="contact">
      <div className="section-head">
        <h2 className="section-title">Contact</h2>
        <p className="section-desc">{profile.openTo}</p>
      </div>

      <div className="contact-primary">
        <a href={`mailto:${profile.email}`} className="btn btn-primary">
          Email me
        </a>
        <a href={profile.cvPath} className="btn btn-secondary" download>
          Download CV
        </a>
      </div>

      <div className="icon-link-row icon-link-row-contact">
        <IconLink
          href={`mailto:${profile.email}`}
          icon="gmail"
          label={profile.email}
        />
        <IconLink
          href={profile.linkedin}
          icon="linkedin"
          label="linkedin.com/in/souramarti"
          external
        />
        <IconLink
          href={profile.github}
          icon="github"
          label="github.com/SVamseekar"
          external
        />
      </div>

      <p className="contact-note">
        Phone on request or via CV — email preferred for first contact.
      </p>

      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js and
          TypeScript.
        </p>
      </footer>
    </section>
  );
}
