import { profile } from "@/data/profile";
import { Highlight } from "@/lib/highlight";

const proofLines = [
  "WorkforceGuard — dbt + DuckDB EU labour-market platform; MPRA working paper on the same warehouse.",
  "EU AI Assurance OS + Evgraph — Spring Boot / Next.js governance control plane and Python Evidence Graph libraries.",
  "Aequitas + MaSoVa — nation-scale GTFS equity analytics (M.Sc. lineage) and Java 21 / RabbitMQ multi-service systems.",
  "Innosolv — production RAG (FAISS, BM25, Gemini 2.5 Flash) and trading infrastructure.",
] as const;

export function Hero() {
  return (
    <section className="hero" id="top">
      <p className="hero-eyebrow">{profile.heroEyebrow}</p>

      <h1 className="hero-title">
        AI and data platform engineer building production systems and
        research-backed analytics.
      </h1>

      <ul className="hero-proof">
        {proofLines.map((line) => (
          <li key={line}>
            <Highlight text={line} />
          </li>
        ))}
      </ul>

      <p className="hero-meta">
        <Highlight
          text={`Python · Java 17/21 · Spring Boot 3 · dbt · DuckDB · FastAPI · Next.js · Vertex AI · Azure · GCP. M.Sc. Data Science, University of Greenwich (Merit). Azure DP-203. Targeting ${profile.targetRoles}. Based in ${profile.location}.`}
        />
      </p>

      <div className="hero-actions">
        <a href="#work" className="btn btn-primary">
          View selected work
        </a>
        <a href={profile.cvPath} className="btn btn-secondary" download>
          Download CV
        </a>
        <a href={`mailto:${profile.email}`} className="btn btn-secondary">
          Email me
        </a>
      </div>
    </section>
  );
}
