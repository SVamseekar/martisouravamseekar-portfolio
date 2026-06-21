export const profile = {
  name: "Marti Soura Vamseekar",
  title: "AI & Infrastructure Engineer",
  targetRoles: "EU-based AI Engineer or Data Platform Engineer roles",
  location: "Hyderabad, India",
  relocation: "Germany · Netherlands · Ireland · Austria",
  blueCard: "EU Blue Card eligible",
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
    "Why Tight Labour Markets Do Not Close Gender Pay Gaps: Evidence from a 20-Country Eurostat Panel",
  author: "Marti, S. V. (2026)",
  venue: "May 2026",
  summary:
    "Panel data econometrics and ML across a 20-country Eurostat dataset (2019–2024, 11 NACE sectors). Labour market tightness correlates positively with gender pay gaps (r = +0.41), contradicting competitive equalisation theory. Introduces the Combined Risk Quadrant (HPI × ERS) and four composite panel indices (HPI, LR, ERS, TR) via PCA-informed weighting. Implemented in WorkforceGuard with SHA-256 hash-chained governance log.",
  publications: [
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
      label: "MPRA",
      href: "https://mpra.ub.uni-muenchen.de/129330/",
      icon: "mpra",
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
    "Owning end-to-end AI platform delivery for Bharat Alpha across 10 NSE sectors: Gemini 2.5 Flash enforces 10 Tier-1 screening filters and a 100-point Tier-2 scoring model with SSE streaming, Supabase Auth, and Postgres conversation history.",
    "Production RAG over 305 annual report filings for 52 Nifty 50 companies (FY2020–FY2025): FAISS IndexFlatIP, BM25, reciprocal rank fusion, and cross-encoder reranking into a 143K-chunk pipeline with sector-aware routing.",
    "Algorithmic trading engine (Java 17, Spring Boot, MongoDB) with AsyncOrderProcessor, Bucket4j at 10 req/s, Iron Condor P&L analytics, multi-leg spread margin engine, basket orders, and participant-wise OI tracking.",
    "GCP production infrastructure: WebSocket coordination, Redis caching, pgvector + Supabase persistence, Cloud Run deployments via GitHub Actions CI/CD and Docker.",
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

export const skillGroups = [
  {
    label: "AI & GenAI",
    items: [
      "Google Vertex AI",
      "Gemini 2.5 Flash",
      "Google ADK",
      "RAG (FAISS, BM25, cross-encoder reranking)",
      "LangChain",
      "LLM agents",
      "scikit-learn",
      "TensorFlow",
    ],
  },
  {
    label: "Cloud & infrastructure",
    items: [
      "Azure Data Factory",
      "Synapse Analytics",
      "Databricks",
      "Data Lake Gen2",
      "GCP Cloud Run",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
    ],
  },
  {
    label: "Data engineering",
    items: [
      "Python",
      "PySpark",
      "dbt",
      "ETL/ELT",
      "Apache Spark",
      "DuckDB",
      "Parquet",
      "Power BI",
    ],
  },
  {
    label: "Backend & distributed systems",
    items: [
      "Java 17/21",
      "Spring Boot 3",
      "FastAPI",
      "Spring WebFlux",
      "RabbitMQ",
      "WebSockets (STOMP/SockJS)",
      "Flyway",
      "Bucket4j",
    ],
  },
  {
    label: "Databases",
    items: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "pgvector",
      "Supabase",
      "ChromaDB",
      "SQLite",
      "DuckDB",
    ],
  },
  {
    label: "Frontend & mobile",
    items: [
      "TypeScript",
      "React 18/19",
      "Next.js",
      "React Native 0.83",
      "Redux Toolkit",
      "shadcn/ui",
      "Tailwind CSS",
    ],
  },
] as const;