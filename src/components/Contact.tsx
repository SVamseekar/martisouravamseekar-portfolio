import { IconLink } from "@/components/IconLink";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section className="section section-contact" id="contact">
      <div className="section-head">
        <h2 className="section-title">Contact</h2>
        <p className="section-desc">
          Open to AI Engineer and Data Platform Engineer roles in Germany, the
          Netherlands, Ireland, and Austria. EU Blue Card eligible.
        </p>
      </div>

      <div className="icon-link-row icon-link-row-contact">
        <IconLink
          href={`mailto:${profile.email}`}
          icon="gmail"
          label={profile.email}
        />
        <IconLink
          href={`tel:${profile.phone.replace(/\s/g, "")}`}
          icon="phone"
          label={profile.phone}
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

      <div className="contact-cv">
        <a href={profile.cvPath} className="text-link" download>
          Download CV (PDF)
        </a>
      </div>

      <footer className="site-footer">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js and
          TypeScript.
        </p>
      </footer>
    </section>
  );
}