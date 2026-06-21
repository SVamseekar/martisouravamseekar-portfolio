import { Fragment } from "react";

const KEYWORDS = [
  // Languages & runtimes
  "Java 21",
  "Java 17",
  "Python",
  "TypeScript",
  "Node.js",
  // Frameworks & libraries
  "Spring Boot 3.3",
  "Spring Boot 3.2",
  "Spring Boot 3",
  "Spring Cloud",
  "FastAPI",
  "React 19",
  "React 18",
  "React Native 0.83",
  "Next.js 16",
  "Next.js",
  "dbt",
  "DuckDB",
  "TanStack Query",
  "Tailwind CSS 4",
  "Vite",
  "axe-core",
  "MUI",
  "Redux Toolkit",
  "Framer Motion",
  "react-i18next",
  "shadcn/ui",
  "Radix UI",
  // AI / ML
  "Gemini 2.5 Flash",
  "Gemini",
  "Google ADK 1.25",
  "Google ADK",
  "Vertex AI",
  "LangChain",
  "RAG",
  "FAISS",
  "BM25",
  "DJL",
  "ONNX Runtime",
  "HuggingFace tokenizers",
  "sentence-transformers",
  "SHAP",
  "HDBSCAN",
  "Random Forest",
  "Isolation Forest",
  "tiktoken",
  "scikit-learn",
  "TensorFlow",
  "OpenAI",
  // Data / infra
  "PostgreSQL",
  "pgvector",
  "MongoDB",
  "Redis",
  "RabbitMQ",
  "Docker",
  "Kubernetes",
  "GCP Cloud Run",
  "AWS S3",
  "Apache Tika",
  "GitHub Actions",
  "Vercel",
  "Supabase",
  "Stripe",
  "@xyflow/react",
  "MapLibre GL",
  "D3.js",
  "Observable Plot",
  "JaCoCo",
  "SonarQube",
  "Pact contract testing",
  "Sentry",
  "WeasyPrint",
  "SQLAlchemy 2.0",
  "Alembic",
  "yfinance",
  "structlog",
  // Regulation / compliance
  "EU AI Act",
  "EU Pay Transparency Directive 2023/970/EU",
  "GDPR",
  "SHA-256",
  "HMAC-SHA-256",
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
