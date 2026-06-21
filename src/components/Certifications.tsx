import { BrandIcon } from "@/components/BrandIcon";
import { certifications } from "@/data/profile";

export function Certifications() {
  return (
    <div className="background-block background-block-wide">
      <h3 className="background-label">Certifications</h3>
      {certifications.map((cert) => (
        <div key={cert.id} className="background-entry certification-entry">
          <div className="background-entry-head">
            <strong>
              {cert.name} ({cert.exam})
            </strong>
            <span>{cert.date}</span>
          </div>
          <div className="background-entry-org background-entry-org-with-logo">
            <span className="university-logo-frame certification-logo-frame">
              <BrandIcon name={cert.issuerLogo} size={20} />
            </span>
            <span className="education-school-name">
              {cert.issuer} · Valid until {cert.expires}
            </span>
          </div>
          <p className="background-entry-text">
            Credential ID: {cert.credentialId} · Certification no.{" "}
            {cert.certificationNumber}
          </p>
          <div className="background-entry-links">
            <a
              href={cert.document.href}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              {cert.document.label}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}