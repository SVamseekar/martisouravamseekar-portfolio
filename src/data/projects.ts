/**
 * Selected work — souravamseekar.com
 *
 * Audience: EU job recruiters (AI / Data Platform) + PhD committees.
 * Voice: CV bullets — action, system, stack, claimable metric.
 *
 * Locked five: WorkforceGuard · EU AI Assurance OS · Evgraph · Aequitas · MaSoVa
 * Bharat Alpha → Experience (Innosolv) only.
 */
export type Project = {
  name: string;
  tagline: string;
  regulation?: string;
  metrics: string[];
  stack: string[];
  period: string;
  liveUrl?: string;
  githubUrl?: string;
  priority: "primary";
};

export const projects: Project[] = [
  {
    name: "WorkforceGuard AI",
    tagline:
      "Built an EU labour-market and pay-transparency analytics platform on dbt + DuckDB; panel research (MPRA) runs on the same warehouse as the product.",
    regulation: "EU Pay Transparency Directive 2023/970/EU · working paper MPRA 129330",
    metrics: [
      "Ingested 16 Eurostat datasets (LFS, JVS, SES) across 27 member states and 13 NACE sectors (11-sector SES research panel, 2019–2024).",
      "Modeled HPI, LR, ERS, and TR in dbt (~31 models) on DuckDB; FastAPI and React 19 serve benchmarks and pay-gap review workflows.",
      "Measured employment–GPG association r ≈ +0.44 (27-country panel); finance-sector GPG ~25% vs ~10.9% all-sector mean; SHA-256 hash-chained governance log.",
      "Shipped live research figures at /app/research from the production warehouse (working paper, not peer-reviewed).",
    ],
    stack: [
      "Python",
      "dbt",
      "DuckDB",
      "FastAPI",
      "React 19",
      "TypeScript",
      "Eurostat",
      "GitHub Actions",
    ],
    period: "Jan 2024 – Present",
    liveUrl: "https://workforceguardai.souravamseekar.com",
    githubUrl: "https://github.com/SVamseekar/workforceguardai",
    priority: "primary",
  },
  {
    name: "EU AI Assurance OS",
    tagline:
      "Designed a multi-tenant AI release-governance control plane (Spring Boot 3.3 + Next.js 16) for guided EU AI Act risk classes, RAG evidence, and sealed evidence packs.",
    regulation:
      "EU AI Act–oriented controls · assisted readiness only (not legal certification / notified body)",
    metrics: [
      "Implemented Spring Boot 3.3 (Java 17) API with Flyway V1–V16, multi-tenant JPA, JWT + API keys — 64 REST endpoints and 190 automated tests.",
      "Built cited-evidence RAG (DJL + ONNX Runtime, all-MiniLM-L6-v2, pgvector HNSW), PASS / REVIEW / BLOCKED release gates, and HMAC-SHA-256 signed eval callbacks.",
      "Shipped hash-chained append-only audit ledger and sealed Evidence Pack exports (JSON + PDF); Next.js 16 dashboard with lineage and readiness views.",
      "Added assisted obligation mapping and certification readiness scoring plus 3 sector packs (insurance, HR, finance) as SPI overlays — not live vendor connectors.",
    ],
    stack: [
      "Java 17",
      "Spring Boot 3.3",
      "Flyway",
      "PostgreSQL",
      "pgvector",
      "Next.js 16",
      "RAG",
      "DJL",
      "ONNX Runtime",
      "Docker",
    ],
    period: "2026 – Present",
    liveUrl: "https://euassuranceai.souravamseekar.com",
    githubUrl: "https://github.com/SVamseekar/eu-ai-assurance-os",
    priority: "primary",
  },
  {
    name: "Evgraph",
    tagline:
      "Open-sourced a Python library stack that turns Model Cards, approvals, and registry metadata into an Evidence Graph with deterministic, explainable findings.",
    regulation: "Library stack · local/CI only · not a SaaS product · not legal certification",
    metrics: [
      "Shipped monorepo v0.1.0: evgraph-core, evgraph-rules, evgraph, and evgraph-cli (Python 3.10+).",
      "Defined Evidence Graph nodes/edges with bounded evidence levels; rules emit cited findings without mutating the graph.",
      "Implemented adapters for Model Card/approval/deployment JSON, dataset manifests, and MLflow; reporters for JSON, Markdown, SARIF, and OSCAL.",
      "Exposed scan() / CLI for local and CI use with pytest; third-party rule packs via entry points.",
    ],
    stack: [
      "Python",
      "Evidence Graph",
      "MLflow",
      "SARIF",
      "OSCAL",
      "pytest",
      "GitHub Actions",
    ],
    period: "2026 – Present",
    githubUrl: "https://github.com/SVamseekar/evgraph",
    priority: "primary",
  },
  {
    name: "Aequitas",
    tagline:
      "Extended M.Sc. dissertation work into open transport-equity analytics on GTFS at nation scale (England reference): DuckDB warehouse, FastAPI, React.",
    metrics: [
      "Processed 1.75M GTFS trips, 13,099 routes, 274,719 stops, and 33,755 LSOAs (56.5M population) into a DuckDB warehouse with FastAPI and React.",
      "Enforced 103 automated quality checks (0 failures) and 99.9993% spatial-join accuracy; Gini 0.5741, Palma 5.702×, 4,245 zero-stop LSOAs.",
      "Delivered 55 analytical sections across 8 policy dimensions, including Random Forest (R² 0.472), HDBSCAN, Isolation Forest, and 2SFCA accessibility scoring.",
      "Added FAISS + Gemini grounded chat over analytics; marketing site live — full dashboard API runs with local warehouse (cloud API deferred).",
    ],
    stack: [
      "Python",
      "DuckDB",
      "FastAPI",
      "React",
      "GTFS",
      "FAISS",
      "Gemini",
      "MapLibre GL",
      "PostgreSQL",
    ],
    period: "Oct 2021 – Present",
    liveUrl: "https://aequitas.souravamseekar.com",
    githubUrl: "https://github.com/SVamseekar/aequitas",
    priority: "primary",
  },
  {
    name: "MaSoVa",
    tagline:
      "Built an event-driven multi-service platform on Java 21 / Spring Boot 3 and RabbitMQ — multi-client web and React Native, dual-write data path, EU VAT and fiscal adapters.",
    metrics: [
      "Delivered 6 Spring Boot 3 services on Java 21 behind Spring Cloud Gateway with 207 canonical REST endpoints and an 11-state order lifecycle.",
      "Ran dual-write PostgreSQL + MongoDB and RabbitMQ topic exchanges for orders/notifications; JWT + Redis for auth sessions.",
      "Shipped multi-client surface: staff/customer web (React 19) plus customer and crew React Native apps; optional Google ADK support agent.",
      "Implemented EU VAT for 12 markets and fiscal signing adapters (DE, FR, IT, BE, HU, GB) with Stripe SCA for EU payments.",
    ],
    stack: [
      "Java 21",
      "Spring Boot 3",
      "Spring Cloud Gateway",
      "RabbitMQ",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "React 19",
      "React Native",
      "GCP Cloud Run",
    ],
    period: "Feb 2023 – Present",
    liveUrl: "https://masova.souravamseekar.com",
    githubUrl: "https://github.com/SVamseekar/masova-platform",
    priority: "primary",
  },
];

export const primaryProjects = projects;
