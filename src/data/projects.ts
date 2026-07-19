export type Project = {
  name: string;
  tagline: string;
  regulation?: string;
  metrics: string[];
  stack: string[];
  period: string;
  liveUrl: string;
  githubUrl?: string;
  priority: "primary" | "secondary";
};

export const projects: Project[] = [
  {
    name: "WorkforceGuard AI",
    tagline:
      "EU pay transparency and workforce intelligence — dbt + DuckDB + FastAPI + React 19 · MPRA 129330",
    regulation: "EU Pay Transparency Directive 2023/970/EU",
    metrics: [
      "16 Eurostat datasets (LFS, JVS, SES) across 27 EU member states; 13 NACE sectors live (11-sector SES research panel)",
      "Multi-layer dbt + DuckDB pipeline: HPI, LR, ERS, TR composite indices with formula versioning",
      "SHA-256 hash-chained governance log; Directive thresholds 5% / 10% / 2% market delta",
      "Published research: r ≈ +0.44 employment–GPG correlation (27-country panel); EU27 finance gap ~25%",
      "Live paper figures at /app/research — same warehouse as compliance workflows",
    ],
    stack: [
      "Python",
      "FastAPI",
      "dbt",
      "DuckDB",
      "React 19",
      "TypeScript",
      "TanStack Query",
      "Tailwind CSS 4",
      "Vite",
      "axe-core (a11y testing)",
      "GCP",
      "Vercel",
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
      "Governance control plane for EU AI Act compliance — risk classification, cited-evidence RAG, eval gates, and audit-ready evidence packs.",
    regulation: "EU AI Act · technical documentation & conformity assessment",
    metrics: [
      "AI system registry with automated EU AI Act risk classification",
      "Cited-evidence RAG: DJL + ONNX Runtime embeddings, pgvector HNSW, PASS / REVIEW / BLOCKED eval gates",
      "HMAC-SHA-256 signed audit event stream and Evidence Pack JSON export",
      "Spring Boot 3.3 backend: Flyway V1–V6, multi-tenant JPA isolation, eval worker queue",
      "Next.js 16 dashboard with interactive DAG lineage graph (@xyflow/react)",
    ],
    stack: [
      "Java 17",
      "Spring Boot 3.3",
      "PostgreSQL",
      "pgvector",
      "Next.js 16",
      "DJL",
      "ONNX Runtime",
      "HuggingFace tokenizers",
      "AWS S3",
      "Apache Tika",
      "@xyflow/react",
    ],
    period: "2024 – Present",
    liveUrl: "https://euassuranceai.souravamseekar.com",
    githubUrl: "https://github.com/SVamseekar/eu-ai-assurance-os",
    priority: "primary",
  },
  {
    name: "Aequitas",
    tagline:
      "Public transport equity intelligence — M.Sc. dissertation extended to production. Applicable to EU, UK, Australia, NZ, and USA GTFS networks.",
    metrics: [
      "1.75M GTFS trips · 13,099 routes · 274,719 stops · 33,755 LSOAs (56.5M population)",
      "103 quality checks · 0 failures · spatial join at 99.9993% accuracy",
      "Gini 0.5741 · Palma 5.702 · 4,245 zero-stop LSOAs · 612 triple-deprived communities",
      "ML: Random Forest (R² 0.472), HDBSCAN, Isolation Forest, 2SFCA accessibility scoring",
      "FAISS RAG chatbot across 55 analytical sections and 8 policy dimensions",
    ],
    stack: [
      "Python",
      "FastAPI",
      "DuckDB",
      "React",
      "FAISS",
      "sentence-transformers",
      "Gemini 2.5 Flash",
      "SHAP",
      "MapLibre GL",
      "D3.js",
      "Observable Plot",
      "Postgres session auth",
    ],
    period: "Oct 2021 – Present",
    liveUrl: "https://aequitas.souravamseekar.com",
    githubUrl: "https://github.com/SVamseekar/aequitas",
    priority: "primary",
  },
  {
    name: "MaSoVa",
    tagline:
      "Cloud-native agentic restaurant OS — 8 AI assistants, 6 Spring Boot microservices, staff web + customer/crew React Native. EU-primary (Stripe, VAT, fiscal adapters).",
    metrics: [
      "8 assistants (1 Google ADK chat + 7 ops agents) via LiteLLM; demo uses free-tier Groq; propose-only ops writes",
      "6 Spring Boot 3 / Java 21 services · 207 REST controller mappings · 11-state order machine",
      "Dual-write PostgreSQL + MongoDB · 3 RabbitMQ topic exchanges with DLQ · JWT + Redis",
      "Crew app RN 0.83 + customer app RN 0.81 · POS/KDS/manager web · masova.souravamseekar.com",
      "EU VAT config (12 markets) · fiscal adapters DE TSE · FR NF525 · IT RT · BE FDM · HU NTCA · GB MTD",
    ],
    stack: [
      "Java 21",
      "Spring Boot 3",
      "Spring Cloud Gateway",
      "Google ADK 1.25",
      "LiteLLM / Groq",
      "RabbitMQ",
      "React 19",
      "MUI",
      "Redux Toolkit",
      "Stripe (EU)",
      "React Native 0.83 / 0.81",
      "Pact",
      "GCP Cloud Run",
    ],
    period: "Feb 2023 – Present",
    liveUrl: "https://masova.souravamseekar.com",
    githubUrl: "https://github.com/SVamseekar/masova-platform",
    priority: "primary",
  },
  {
    name: "EmployerFlow",
    tagline:
      "Visa-aware employer discovery SaaS — deterministic shortlist scoring with template-based outreach, OpenAI-assisted application audits, and Stripe subscriptions.",
    metrics: [
      "15,000+ employer directory with visa filters",
      "Deterministic shortlist scoring (Pro / Premium tiers)",
      "CRM with application pack generation and AI-assisted audit",
      "$0/month production stack (Render + Neon)",
    ],
    stack: [
      "FastAPI",
      "SQLAlchemy 2.0",
      "Alembic",
      "PostgreSQL",
      "OpenAI",
      "Stripe",
      "JWT auth (python-jose, bcrypt)",
      "Sentry",
      "WeasyPrint",
      "Vanilla JS",
      "Docker",
    ],
    period: "2025 – Present",
    liveUrl: "https://employerflow.souravamseekar.com",
    githubUrl: "https://github.com/SVamseekar/employerflow",
    priority: "primary",
  },
  {
    name: "Bharat Alpha",
    tagline:
      "Institutional equity research terminal for 10 NSE sectors — hybrid RAG over annual reports with Tier-1/Tier-2 fundamental screening.",
    metrics: [
      "143K-chunk RAG pipeline: FAISS + BM25 + reciprocal rank fusion + cross-encoder reranking",
      "305 annual reports · 52 Nifty 50 companies · FY2020–FY2025",
      "Gemini 2.5 Flash with 10 Tier-1 filters and 100-point Tier-2 scoring model",
      "SSE streaming with Supabase Auth and Postgres conversation history",
    ],
    stack: [
      "Python",
      "FastAPI",
      "FAISS",
      "BM25",
      "tiktoken",
      "structlog",
      "yfinance",
      "React 18",
      "shadcn/ui",
      "Radix UI",
      "Supabase",
      "pgvector",
      "Gemini",
    ],
    period: "Jun 2024 – Present",
    liveUrl: "https://bharatalpha.souravamseekar.com",
    githubUrl: "https://github.com/SVamseekar/bharat-alpha",
    priority: "secondary",
  },
];

export const primaryProjects = projects.filter((p) => p.priority === "primary");