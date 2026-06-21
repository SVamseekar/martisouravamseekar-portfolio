import { profile } from "@/data/profile";
import { Highlight } from "@/lib/highlight";

export function Hero() {
  return (
    <section className="hero" id="top">
      <p className="hero-eyebrow">
        {profile.blueCard} · Open to relocation: {profile.relocation}
      </p>

      <h1 className="hero-title">
        AI and infrastructure engineer building production RAG pipelines,
        event-driven microservices, and EU compliance analytics.
      </h1>

      <p className="hero-lead">
        <Highlight
          text={`Delivery spans fintech AI research (Bharat Alpha), EU pay transparency analytics (WorkforceGuard), government-scale geospatial intelligence (Aequitas), and EU AI Act governance tooling — on Google Vertex AI, Java / Spring Boot, Python, Azure Data Factory, Databricks, and GCP. M.Sc. Data Science, University of Greenwich (Merit). Microsoft Azure Data Engineer Associate (DP-203). Targeting ${profile.targetRoles}. Based in ${profile.location}.`}
        />
      </p>

      <div className="hero-actions">
        <a href="#work" className="btn btn-primary">
          View live products
        </a>
        <a href={profile.cvPath} className="btn btn-secondary" download>
          Download CV
        </a>
      </div>
    </section>
  );
}