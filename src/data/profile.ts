export const profile = {
  name: "Marti Soura Vamseekar",
  title: "AI & Infrastructure Engineer",
  targetRoles: "EU-based AI Engineer or Data Platform Engineer roles",
  location: "Hyderabad, India",
  /** EU-level only — no country list on homepage / hero */
  relocation: "Open to relocation within the EU",
  blueCard: "EU Blue Card eligible",
  openTo:
    "Open to AI Engineer and Data Platform Engineer roles in the European Union. EU Blue Card eligible.",
  heroEyebrow: "EU Blue Card eligible · Open to relocation within the EU",
  email: "martisoura@gmail.com",
  phone: "+91-9121661281",
  linkedin: "https://www.linkedin.com/in/souramarti",
  github: "https://github.com/SVamseekar",
  orcid: "https://orcid.org/0009-0005-4884-1292",
  cvPath: "/Marti_Soura_Vamseekar_CV.pdf",
  domain: "souravamseekar.com",
} as const;

export const research = {
  title:
    "Why Tight Labour Markets Do Not Close Gender Pay Gaps: Evidence from a 27-Country Eurostat Panel",
  author: "Marti, S. V. (2026)",
  venue: "MPRA working paper No. 129330 · 2026",
  summary:
    "Built a 27-country Eurostat panel (2019–2024, 11 NACE sectors) and estimated employment–gender pay gap association (r ≈ +0.44 cross-sectionally), challenging competitive equalisation as a sole mechanism. Defined composite indices HPI, LR, ERS, TR and a Combined Risk Quadrant (HPI × ERS). Implemented the same metrics and live figures in WorkforceGuard AI with a SHA-256 hash-chained governance log — research methods in a production analytics system.",
  methodology: {
    name: "Combined Risk Quadrant",
    detail:
      "HPI × ERS typology; finance-sector GPG ~25% vs ~10.9% all-sector panel mean. Working paper (MPRA/SSRN/Zenodo), not peer-reviewed.",
  },
  publications: [
    {
      label: "MPRA",
      href: "https://mpra.ub.uni-muenchen.de/129330/",
      icon: "mpra",
    },
    {
      label: "SSRN",
      href: "https://ssrn.com/abstract=6826361",
      icon: "ssrn",
    },
    {
      label: "Zenodo",
      href: "https://doi.org/10.5281/zenodo.20455974",
      icon: "zenodo",
    },
    {
      label: "ORCID",
      href: "https://orcid.org/0009-0005-4884-1292",
      icon: "orcid",
    },
  ],
} as const;

export const experience = {
  role: "Software Development Engineer — AI / Full-Stack",
  company: "Innosolv Private Limited",
  location: "London, UK (remote)",
  sector: "Fintech — algorithmic trading and AI-powered equity research for NSE cash and F&O markets",
  period: "Sep 2025 – Present",
  highlights: [
    "Own end-to-end delivery of Bharat Alpha, an institutional equity research terminal for 10 NSE sectors: Gemini 2.5 Flash with 10 Tier-1 filters and a 100-point Tier-2 scoring model, SSE streaming, Supabase Auth, and PostgreSQL conversation history.",
    "Built production hybrid RAG over 305 annual reports for 52 Nifty 50 companies (FY2020–FY2025): FAISS IndexFlatIP, BM25, reciprocal rank fusion, and cross-encoder reranking into a ~143K-chunk pipeline with sector-aware retrieval and inline citations.",
    "Designed a Java 17 / Spring Boot 3 trading engine on MongoDB with non-blocking order dispatch, Bucket4j rate limiting (10 req/s), multi-leg spread margin, basket orders, and participant-wise open-interest analytics.",
    "Operated GCP production path: Redis caching, WebSocket coordination, pgvector + Supabase persistence, and GCP Cloud Run deploys via Docker and GitHub Actions.",
  ],
  links: [
    {
      label: "Bharat Alpha",
      href: "https://bharatalpha.souravamseekar.com",
    },
    {
      label: "nifty50-stock-analyzer",
      href: "https://github.com/SVamseekar/nifty50-stock-analyzer",
    },
    {
      label: "high-frequency-trading",
      href: "https://github.com/SVamseekar/high-frequency-trading",
    },
  ],
} as const;

export const education = [
  {
    degree: "M.Sc. Data Science",
    school: "University of Greenwich, London, United Kingdom",
    result: "Merit",
    period: "Jan 2021 – Apr 2022",
    note: "Dissertation: UK Bus Data Analysis (Aequitas). Modules: Big Data, Applied ML, Data Visualisation, Cloud Grids and Virtualisation.",
    logo: "greenwich",
    documents: [
      {
        label: "Degree certificate",
        href: "/credentials/uog-msc-degree.pdf",
      },
      {
        label: "Full transcript",
        href: "/credentials/uog-msc-transcript.pdf",
      },
    ],
  },
  {
    degree: "B.Tech. Electronics and Communication Engineering",
    school: "GITAM Institute of Science and Technology, Visakhapatnam, India",
    result: "8.3 CGPA",
    period: "Jun 2016 – Mar 2020",
    note: "Dissertation: Hyperspectral Image Analysis with Deep Learning. Modules: Data Structures and Algorithms, Digital Signal Processing, Computer Networks.",
    logo: "gitam",
    documents: [
      {
        label: "Provisional certificate & grades",
        href: "/credentials/gitam-btech-pcmg.pdf",
      },
      {
        label: "Transfer certificate",
        href: "/credentials/gitam-btech-transfer-certificate.pdf",
      },
    ],
  },
] as const;

export const certifications = [
  {
    id: "dp-203",
    name: "Microsoft Certified: Azure Data Engineer Associate",
    exam: "DP-203",
    issuer: "Microsoft",
    issuerLogo: "microsoft",
    date: "12 March 2025",
    expires: "13 March 2026",
    credentialId: "CEA6999835BAD6E",
    certificationNumber: "0FB756-C158AR",
    document: {
      label: "Certificate",
      href: "/credentials/azure-data-engineer-associate.pdf",
    },
  },
] as const;

/**
 * Skills for EU AI Engineer / Data Platform hiring (+ PhD-adjacent stack).
 * Featured = proven by selected work or Innosolv experience — not research-only methods.
 * Sources: WorkforceGuard, EU AI Assurance OS, Evident, Aequitas, MaSoVa, Bharat Alpha (exp).
 */
/** Six groups → even 2×3 / 3×2 grid (no orphan last card). */
export const skillGroups = [
  {
    label: "AI & GenAI",
    items: [
      "Google Vertex AI",
      "Gemini 2.5 Flash",
      "RAG (FAISS, BM25, cross-encoder)",
      "Google ADK",
      "DJL / ONNX Runtime",
      "Evidence Graph (Evident)",
      "SARIF / OSCAL",
      "scikit-learn",
    ],
    featured: [
      "RAG (FAISS, BM25, cross-encoder)",
      "Gemini 2.5 Flash",
      "Google Vertex AI",
    ],
  },
  {
    label: "Cloud & infrastructure",
    items: [
      "GCP Cloud Run",
      "Docker",
      "GitHub Actions",
      "Azure Data Factory",
      "Databricks",
      "Data Lake Gen2",
      "Synapse Analytics",
      "Terraform",
    ],
    featured: ["GCP Cloud Run", "Docker", "Azure Data Factory"],
  },
  {
    label: "Data engineering",
    items: [
      "Python",
      "dbt",
      "DuckDB",
      "PySpark",
      "ETL/ELT",
      "Apache Spark",
      "Parquet",
      "Eurostat / public data pipelines",
    ],
    featured: ["Python", "dbt", "DuckDB"],
  },
  {
    label: "Backend & distributed systems",
    items: [
      "Java 17/21",
      "Spring Boot 3",
      "FastAPI",
      "Spring Cloud Gateway",
      "RabbitMQ",
      "Flyway",
      "WebSockets",
      "Hash-chained audit logs",
    ],
    featured: ["Spring Boot 3", "FastAPI", "Java 17/21"],
  },
  {
    label: "Databases",
    items: [
      "PostgreSQL",
      "pgvector",
      "Redis",
      "MongoDB",
      "DuckDB",
      "Supabase",
      "SQLite",
      "MLflow",
    ],
    featured: ["PostgreSQL", "pgvector", "DuckDB"],
  },
  {
    label: "Frontend & mobile",
    items: [
      "TypeScript",
      "React 18/19",
      "Next.js",
      "React Native",
      "Vite",
      "Redux Toolkit",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    featured: ["Next.js", "TypeScript", "React 18/19"],
  },
] as const;