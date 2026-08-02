import { Fragment } from "react";

/**
 * Terms emphasized in portfolio copy for EU AI / Data Platform + research readers.
 * Longer phrases first (sorted below) so regex prefers "Spring Boot 3.3" over "Spring Boot 3".
 * Keep this list job-relevant — no product/SaaS stuffing.
 */
const KEYWORDS = [
  // Stack versions (long first)
  "Spring Boot 3.3",
  "Spring Boot 3",
  "Spring Cloud Gateway",
  "React Native 0.83",
  "React Native 0.81",
  "React Native",
  "React 19",
  "React 18",
  "React",
  "Next.js 16",
  "Next.js",
  "Java 21",
  "Java 17",
  "Python 3.10+",
  "Python",
  "TypeScript",
  "Gemini 2.5 Flash",
  "Gemini",
  "Google ADK",
  "Vertex AI",
  "ONNX Runtime",
  "GCP Cloud Run",
  "GitHub Actions",
  "HuggingFace tokenizers",
  "sentence-transformers",
  "cross-encoder",
  "IndexFlatIP",
  "HMAC-SHA-256",
  "SHA-256",
  // Frameworks & data
  "FastAPI",
  "dbt",
  "DuckDB",
  "Flyway",
  "PostgreSQL",
  "pgvector",
  "MongoDB",
  "Redis",
  "RabbitMQ",
  "Supabase",
  "Eurostat",
  "GTFS",
  "FAISS",
  "BM25",
  "RAG",
  "DJL",
  "MLflow",
  "SARIF",
  "OSCAL",
  "HDBSCAN",
  "Isolation Forest",
  "Random Forest",
  "2SFCA",
  "SHAP",
  "MapLibre GL",
  "D3.js",
  "Vite",
  "MUI",
  "Redux Toolkit",
  "shadcn/ui",
  "TanStack Query",
  "Tailwind CSS",
  "Azure Data Factory",
  "Databricks",
  // Infra
  "Docker",
  "Kubernetes",
  "Terraform",
  "AWS S3",
  "Vercel",
  "Pact",
  "Playwright",
  "pytest",
  "Stripe",
  // Regulation / evidence (light)
  "EU AI Act",
  "Pay Transparency Directive",
  "EU Pay Transparency Directive 2023/970/EU",
  "Evidence Graph",
  "MPRA",
].sort((a, b) => b.length - a.length);

const pattern = new RegExp(
  `(${KEYWORDS.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  "g",
);

export function Highlight({ text }: { text: string }) {
  const parts = text.split(pattern);
  return (
    <>
      {parts.map((part, i) =>
        KEYWORDS.includes(part) ? (
          <mark key={i} className="keyword">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
