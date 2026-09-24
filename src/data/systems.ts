/**
 * The systems, told as the people who use them experience them.
 *
 * Each page follows one shape: what it is → the problem → an animated system
 * story → how it works → engineering notes → architecture → trade-offs →
 * evidence. Fields map onto that order.
 *
 * Figures here come from the repositories themselves (controller counts, port
 * numbers, state enums, agent modules), not from prose summaries. Anything
 * externally checkable belongs in evidence.ts and is enforced by
 * `npm run verify`.
 */

export type System = {
  readonly slug: string;
  readonly name: string;
  /** One line, plain language, for someone who has never heard of it. */
  readonly whatItIs: string;
  /** Who this is for and the decision it supports. */
  readonly forWhom: string;
  readonly period: string;
  readonly status: "live" | "packages" | "source";
  readonly liveUrl?: string;
  readonly githubUrl?: string;
  readonly regulation?: string;
  /** Optional badge, e.g. a hackathon entry. */
  readonly note?: string;
  /** Primary diagram, mounted under "What actually happens". */
  readonly explainer: string;
  /** Optional second diagram for the architecture section. */
  readonly architectureExplainer?: string;
  /** The problem, in the user's words, before the product exists. */
  readonly problem: string;
  /** How it works for that user — no internals. */
  readonly story: readonly { readonly step: string; readonly detail: string }[];
  /** Engineering substance, for the technical reader. */
  readonly build: readonly string[];
  /** Named capability areas, for systems whose surface is broad. */
  readonly capabilities?: readonly {
    readonly area: string;
    readonly detail: string;
  }[];
  /** Decisions with a real alternative, and why this one. */
  readonly tradeoffs?: readonly {
    readonly choice: string;
    readonly instead: string;
    readonly why: string;
  }[];
  readonly stack: readonly string[];
  /** What each technology does in this system — the part worth reading. */
  readonly stackRoles?: Readonly<Record<string, string>>;
  /** Countable evidence shown beside the diagram. */
  readonly figures: readonly { readonly value: string; readonly label: string }[];
};

export const systems: readonly System[] = [
  {
    slug: "workforceguard",
    name: "WorkforceGuard AI",
    whatItIs:
      "Turns EU labour-market data and a company's own payroll into a pay-gap position it can defend to a regulator.",
    forWhom:
      "For HR and reward leads at EU employers preparing for the Pay Transparency Directive.",
    period: "Jan 2024 – Present",
    status: "live",
    liveUrl: "https://workforceguardai.souravamseekar.com",
    githubUrl: "https://github.com/SVamseekar/workforceguardai",
    regulation: "EU Pay Transparency Directive 2023/970",
    explainer: "PayGapExplainer",
    problem:
      "From June 2027, employers with 250+ staff must report gender pay gaps and justify them. Most know their own number. Almost none can say whether it is normal for their sector and country — or show the working when asked.",
    story: [
      {
        step: "Start from the market, not a spreadsheet",
        detail:
          "Employment, vacancy and pay-gap series for all 27 member states and 13 sectors are already loaded from Eurostat, so there is a benchmark before anyone uploads anything.",
      },
      {
        step: "Add your payroll",
        detail:
          "Internal pay data is blended against the matching country and sector benchmark — not a global average that flatters or unfairly damns you.",
      },
      {
        step: "See which gaps need a reason",
        detail:
          "The review queue flags where the company sits outside its benchmark, so effort goes to the roles that will actually be questioned.",
      },
      {
        step: "Export something a regulator accepts",
        detail:
          "Every figure carries its Eurostat source, dataset version and formula version. Decisions are written to a tamper-evident log and exported as one evidence pack.",
      },
    ],
    build: [
      "16 Eurostat datasets (LFS, JVS, SES) ingested as Parquet and modelled through layered dbt (~31 models) on DuckDB — no database server at query time.",
      "A single analytics repository resolves filters, assembles evidence bundles and writes governance events, keeping provenance structural rather than cosmetic.",
      "Governance events are chained with SHA-256, so tampering is detectable and chain integrity is verified on every API call.",
      "The copilot selects its benchmark basis from data coverage and declines to answer confidently when coverage is partial.",
    ],
    tradeoffs: [
      {
        choice: "DuckDB over a hosted warehouse",
        instead: "Postgres or BigQuery",
        why: "The analytical workload is read-heavy over a fixed panel. An embedded engine removes a server from the deployment and makes the whole warehouse reproducible from source data.",
      },
      {
        choice: "Layered dbt marts over one wide table",
        instead: "a single denormalised model",
        why: "The EU reference layer and the company layer have different owners and refresh cadences. Separating them means either can be tested or replaced without touching the other.",
      },
      {
        choice: "Refusing to answer over guessing",
        instead: "always returning a number",
        why: "A confident answer on partial coverage is worse than no answer when the output is going to a regulator.",
      },
    ],
    stack: ["Python", "dbt", "DuckDB", "FastAPI", "React", "TypeScript", "GCP"],
    stackRoles: {
      Python: "ingestion and metrics",
      dbt: "layered transformation",
      DuckDB: "embedded warehouse",
      FastAPI: "evidence bundles",
      React: "benchmark workflows",
      TypeScript: "typed client",
      GCP: "container deploys",
    },
    figures: [
      { value: "27", label: "member states" },
      { value: "13", label: "NACE sectors" },
      { value: "16", label: "source datasets" },
      { value: "~31", label: "dbt models" },
    ],
  },

  {
    slug: "eu-ai-assurance",
    name: "EU AI Assurance OS",
    whatItIs:
      "A fail-closed release gate for AI shipped into the EU: a pinned legal corpus, a human proposal queue, and an Evgraph 0.1.2 scan that must match the evidence pack.",
    forWhom:
      "For engineering and governance teams who must show an AI system met its obligations before deployment.",
    period: "2026 – Present",
    status: "live",
    liveUrl: "https://euassuranceai.souravamseekar.com",
    githubUrl: "https://github.com/SVamseekar/eu-ai-assurance-os",
    regulation: "EU AI Act–oriented controls",
    explainer: "ReleaseGateExplainer",
    problem:
      "Under the AI Act, obligations depend on what a system does and who it affects. Teams discover this late — usually in a review meeting, with a launch date already promised and no record of what was checked.",
    story: [
      {
        step: "Register the system",
        detail:
          "The AI system is described once. Risk is classified against a pinned legal corpus, so the obligations that follow are explicit rather than assumed.",
      },
      {
        step: "The gate runs in CI",
        detail:
          "Control mappings are proposals. A person accepts them. They are not auto-applied. In-force controls then use INFORMATIONAL, WARNING, APPROVAL_REQUIRED, or BLOCKING.",
      },
      {
        step: "Get a verdict with citations",
        detail:
          "The gate returns PASS, REVIEW, or BLOCKED. The evidence pack and a live evgraph-cli 0.1.2 scan report the same current gap. A missing approval timestamp stays inconclusive.",
      },
      {
        step: "Seal the record",
        detail:
          "The decision, its evidence and its approvals are sealed into an evidence pack and appended to a tamper-evident ledger for whoever asks later.",
      },
    ],
    build: [
      "Spring Boot 4.1.1 API, Java 17, Tika 4.0.0, and Flyway through V20. Multi-tenant JPA behind JWT and API-key auth.",
      "Cited-evidence retrieval runs on DJL + ONNX Runtime with pgvector HNSW, so answers point back at source documents.",
      "Eval results return over HMAC-SHA-256 signed callbacks; the queue is durable, so a gate decision survives a worker restart.",
      "Append-only audit ledger is hash-chained with verify endpoints, and evidence packs export as JSON with a PDF rendering.",
    ],
    capabilities: [
      {
        area: "Registry and classification",
        detail: "Risk classes — minimal, limited, high, prohibited — classified against a pinned legal corpus. Control mappings stay proposals until a person accepts them.",
      },
      {
        area: "Evidence retrieval",
        detail: "all-MiniLM-L6-v2 embeddings over pgvector HNSW, returning citations rather than unsourced prose.",
      },
      {
        area: "Release gating",
        detail: "PASS / REVIEW / BLOCKED. In-force modes are INFORMATIONAL, WARNING, APPROVAL_REQUIRED, and BLOCKING. The pack and evgraph-cli 0.1.2 share the current gap.",
      },
      {
        area: "Workflows and oversight",
        detail: "Multi-stage approvals with reviewer assignment, human-oversight evidence capture and notifications.",
      },
      {
        area: "Drift and lineage",
        detail: "Data-contract drift monitoring with a lineage graph across registered systems.",
      },
      {
        area: "Sector packs",
        detail: "Insurance, HR and finance overlays as SPI implementations — not live vendor connectors.",
      },
    ],
    tradeoffs: [
      {
        choice: "A person accepts each mapping",
        instead: "auto-applying a control from the corpus",
        why: "Risk is classified against a pinned legal corpus, and the mapping stays a proposal until someone accepts it. The product does not certify, CE-mark, or issue a legal verdict.",
      },
      {
        choice: "Java-native embeddings via DJL + ONNX",
        instead: "calling a hosted embedding API",
        why: "Compliance evidence often cannot leave the tenant boundary. Running the model in-process keeps evidence local and removes a per-call dependency.",
      },
      {
        choice: "Hash-chained append-only ledger",
        instead: "an ordinary audit table",
        why: "An audit table an administrator can edit proves nothing. Chaining makes tampering detectable and gives verify endpoints something to check.",
      },
    ],
    stack: ["Java 17", "Spring Boot 4.1.1", "Tika 4.0.0", "PostgreSQL", "pgvector", "Next.js"],
    stackRoles: {
      "Java 17": "gate and ledger",
      "Spring Boot 4.1.1": "multi-tenant API",
      "Tika 4.0.0": "document extraction",
      PostgreSQL: "registry and audit",
      pgvector: "cited evidence search",
      "Next.js": "dashboard",
    },
    figures: [
      { value: "V20", label: "Flyway migrations, plus postgres V4" },
      { value: "0.1.2", label: "pinned evgraph-cli" },
      { value: "4", label: "control modes" },
      { value: "3", label: "sector packs" },
    ],
  },

  {
    slug: "masova",
    name: "MaSoVa Restaurant OS",
    whatItIs:
      "A full restaurant operating system: ordering, kitchen, delivery, payments, analytics and compliance across multiple stores and tax jurisdictions.",
    forWhom:
      "For EU restaurant operators running several sites across more than one tax jurisdiction.",
    period: "Feb 2023 – Present",
    status: "live",
    liveUrl: "https://masova.souravamseekar.com",
    githubUrl: "https://github.com/SVamseekar/masova-platform",
    explainer: "OrderFlowExplainer",
    architectureExplainer: "MasovaArchitecture",
    problem:
      "A multi-store operator runs on four aggregator tablets, a legacy POS, a spreadsheet for stock and a separate accountant for each country's VAT. Every one of those seams is a place to lose a ticket, misprice an item, or fail an inspection.",
    story: [
      {
        step: "Every channel becomes one queue",
        detail:
          "Orders from the storefront, the POS and the aggregators are normalised into a single stream, so the kitchen sees one list instead of four tablets.",
      },
      {
        step: "The floor gets its own surface",
        detail:
          "Kitchen display, cashier, POS, manager and driver each get a purpose-built screen — web where the work is stationary, React Native where it moves.",
      },
      {
        step: "Tax and compliance resolve per order",
        detail:
          "VAT depends on country, order type and item category across 12 markets; fiscal signing runs at completion where the country requires it; 14 EU allergens are enforced before an item can go live.",
      },
      {
        step: "Money is written down safely",
        detail:
          "Financial records commit to PostgreSQL synchronously before anything downstream reads them, so payments and orders cannot drift apart.",
      },
    ],
    build: [
      "Six Spring Boot 3 services on Java 21 behind Spring Cloud Gateway — 37 controllers across core (:8085), commerce (:8084), payment (:8089), logistics (:8086) and intelligence (:8087), with 207 canonical endpoints validated by an integration matrix in CI.",
      "An 11-state order lifecycle in shared-models — RECEIVED through COMPLETED, with CANCELLED terminal — where every transition publishes to masova.orders.exchange.",
      "Dual-write persistence: PostgreSQL synchronously for financial truth, MongoDB asynchronously for read models, Redis for auth sessions.",
      "Multi-tenancy scoped to storeId with database-level isolation, plus a GDPR erasure flow that spans every service.",
      "Multi-gateway payment routing — Stripe with SCA for EU stores, Razorpay for the India legacy path.",
    ],
    capabilities: [
      {
        area: "Customer surfaces",
        detail: "React 19 storefront plus a React Native app (Expo, TanStack Query, STOMP websockets) covering menu, cart, order tracking, payment, loyalty and support.",
      },
      {
        area: "Crew surfaces",
        detail: "MaSoVaCrewApp ships dedicated kitchen, cashier, POS, driver and manager modules, with OTP-confirmed delivery and active-delivery tracking.",
      },
      {
        area: "Kitchen operations",
        detail: "Live KDS with per-item timers and automatic status propagation as each order advances through the lifecycle.",
      },
      {
        area: "Aggregator hub",
        detail: "Wolt, Deliveroo, Just Eat and Uber Eats normalised into the same order queue as first-party channels.",
      },
      {
        area: "Compliance engine",
        detail: "EU VAT across 12 countries by order type and item category, fiscal signing for DE, FR, IT, BE, HU and GB, and 14 enforced EU allergens.",
      },
      {
        area: "Intelligence",
        detail: "A support agent over the platform APIs handling orders, menu, loyalty, complaints and cancellation requests under JWT auth.",
      },
    ],
    tradeoffs: [
      {
        choice: "Dual-write Postgres then Mongo",
        instead: "a single store, or full event sourcing",
        why: "Financial records need transactional guarantees; read models need shape and speed. Committing Postgres first and projecting asynchronously accepts brief read lag in exchange for money never being wrong.",
      },
      {
        choice: "Event-driven state propagation",
        instead: "services polling each other",
        why: "Kitchen, logistics and notifications all care about the same transition. Publishing once and letting consumers subscribe keeps them independent and removes synchronous coupling at rush.",
      },
      {
        choice: "Server-side VAT and fiscal resolution",
        instead: "computing totals on the client",
        why: "Tax is jurisdictional and audited. Resolving it server-side means one implementation to certify rather than one per client app.",
      },
    ],
    stack: [
      "Java 21",
      "Spring Boot 3",
      "Spring Cloud Gateway",
      "RabbitMQ",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "React",
      "React Native",
      "Docker",
    ],
    stackRoles: {
      "Java 21": "six services",
      "Spring Boot 3": "service runtime",
      "Spring Cloud Gateway": "auth and routing",
      RabbitMQ: "order event fan-out",
      PostgreSQL: "financial truth",
      MongoDB: "read models",
      Redis: "sessions",
      React: "storefront and console",
      "React Native": "customer and crew apps",
      Docker: "local and CI parity",
    },
    figures: [
      { value: "6", label: "microservices" },
      { value: "207", label: "API endpoints" },
      { value: "11", label: "order states" },
      { value: "12", label: "VAT jurisdictions" },
    ],
  },

  {
    slug: "masova-enterprise-fleet",
    name: "MaSoVa Enterprise Fleet",
    whatItIs:
      "A Manager Copilot for a restaurant fleet: one conversational agent that fans out to seven ops specialists and puts every action behind human approval.",
    forWhom:
      "For multi-store managers who want an assistant that drafts decisions, not one that takes them.",
    period: "Aug 2026",
    status: "source",
    githubUrl: "https://github.com/SVamseekar/masova-enterprise-fleet",
    note: "Built for the All Things Agentic Hackathon",
    explainer: "FleetExplainer",
    problem:
      "Agentic ops demos usually assume a manager wants an autonomous brain. Real managers want the analysis done and the decision kept: they are accountable for the price change, the purchase order and the refund, so an agent that executes on its own is unusable.",
    story: [
      {
        step: "Ask in plain language, by voice or text",
        detail:
          "One conversational front door. Gemini transcribes spoken input and can answer aloud, so the manager can ask while walking the floor.",
      },
      {
        step: "The Copilot decides who to ask",
        detail:
          "It routes to whichever of the seven specialists the question needs — forecast, stock, churn, reviews, shifts, kitchen coaching or pricing — and can compare stores in one thread.",
      },
      {
        step: "Answers are grounded, not improvised",
        detail:
          "Policy questions retrieve from the actual operations manual rather than the model's memory, and numbers come from tools that query the platform.",
      },
      {
        step: "Every action waits for a human",
        detail:
          "Agents emit drafts. Prices, purchase orders, refunds and campaigns sit in an approval queue until a manager accepts them, and each run is hash-chained with its reasoning trace.",
      },
    ],
    build: [
      "Built on Google ADK with Gemini: a conductor agent (manager_chat_agent) that can trigger any of seven specialist agents as tools.",
      "Seven ops agents in src/masova_agent/agents/ — demand forecasting, inventory reorder, churn prevention, review response, shift optimisation, kitchen coach and dynamic pricing.",
      "RAG over data/knowledge/ answers operations-manual questions with retrieved context instead of model recall.",
      "A shared AgentRuntime carries policy, reasoning-chain audit and rule-based fallbacks for when the model is unavailable.",
      "Manager console at GET /console shows the live agent registry, run history with traces, a SHA-256 chain integrity badge and the approval queue — over real data, not fixtures.",
    ],
    tradeoffs: [
      {
        choice: "Proposals over autonomous execution",
        instead: "letting agents act directly",
        why: "The manager is accountable for the outcome. An agent that changes a price on its own moves the liability without moving the authority.",
      },
      {
        choice: "A conductor plus specialists",
        instead: "one general agent with every tool",
        why: "Narrow agents are testable and their failures are legible. A single agent holding twenty tools is neither.",
      },
      {
        choice: "Rule-based fallbacks",
        instead: "failing when the model is down",
        why: "A restaurant at rush cannot wait on an API. Deterministic fallbacks keep the operation running with reduced capability rather than none.",
      },
    ],
    stack: ["Python", "Google ADK", "Gemini", "FastAPI", "RAG", "pytest"],
    stackRoles: {
      Python: "agent runtime",
      "Google ADK": "conductor and tools",
      Gemini: "reasoning, voice in/out",
      FastAPI: "console and triggers",
      RAG: "ops-manual grounding",
      pytest: "agent evals",
    },
    figures: [
      { value: "8", label: "agents incl. conductor" },
      { value: "7", label: "ops specialists" },
      { value: "0", label: "actions without approval" },
    ],
  },

  {
    slug: "aequitas",
    name: "Aequitas",
    whatItIs:
      "Answers one question the same way in every country: who here is underserved by public transport, and by how much?",
    forWhom:
      "For transport authorities and researchers in any country with published timetables and an official deprivation index.",
    period: "Oct 2021 – Present",
    status: "live",
    liveUrl: "https://aequitas.souravamseekar.com",
    githubUrl: "https://github.com/SVamseekar/aequitas",
    explainer: "EquityExplainer",
    architectureExplainer: "AequitasArchitecture",
    problem:
      "Your country already publishes the pieces: timetables, small-area geography, and an official deprivation index. What it does not have is a briefing that turns them into the same answer every time. So each region commissions its own study, each study picks its own method, and none of the findings can be set beside another — including the ones from the region next door.",
    story: [
      {
        step: "It starts from what you already publish",
        detail:
          "Your national timetable feed, your census geography, your deprivation index. No proprietary data, no invented travel times, nothing you cannot audit — England runs on IMD, Ireland on Pobal HP, the Netherlands on CBS SES-WOA, France on F-EDI.",
      },
      {
        step: "Your score is yours",
        detail:
          "The same formula runs inside each country against that country's own index. Your regions are ranked against each other, never against another country's — because your index and theirs do not measure the same thing.",
      },
      {
        step: "You get a briefing, not a dataset",
        detail:
          "A map, a quotable national score, and a fixed set of exhibits: who lives near a stop, who is stranded after seven, how service quality tracks deprivation across your own deciles.",
      },
      {
        step: "It travels to your country next",
        detail:
          "Adding a country means supplying its feed, its geography and its index — the analytics, the validation gates and the briefing come with the method. Four are live; the fifth is a data question, not a rebuild.",
      },
    ],
    build: [
      "Four national warehouses live, each with its own ingestion, processing and banding modules: England (IMD 2025, LSOA 2021, 79.3% within 400 m, score 80.0), Ireland (Pobal HP 2022, 18,919 small areas, 55.1%, score 55.5), the Netherlands (CBS SES-WOA 2023, 91.9%, score 69.6 on bus) and France (F-EDI 2021, IGN IRIS, 48,522 areas, score 47.7).",
      "Analytics are pre-computed when the warehouse is built; the API is a lookup layer, so the interface cannot invent a figure at request time.",
      "Composite score weights 400 m coverage, evening service, weekday quality and the deprivation–service correlation, renormalising when a term is unavailable.",
      "Thirteen product surfaces including equity, access, service, network HHI, correlations, scenarios, time series and in-country compare.",
      "Narratives are templated from warehouse numbers; weak evidence is dropped rather than imputed.",
    ],
    tradeoffs: [
      {
        choice: "In-country scores only",
        instead: "one European league table",
        why: "IMD, Pobal HP, SES-WOA and F-EDI are constructed differently. A table ranking your country against another would look authoritative and mean nothing — the most requested feature and the wrong one to build.",
      },
      {
        choice: "Pre-computed warehouse",
        instead: "computing analytics per request",
        why: "It makes the API a lookup layer, which is both fast and honest: nothing can be estimated on the fly to fill a gap.",
      },
      {
        choice: "Omitting weak exhibits",
        instead: "imputing missing values",
        why: "An empty panel tells a transport authority the truth. An imputed one invites a decision the data cannot support.",
      },
    ],
    stack: ["Python", "DuckDB", "FastAPI", "React", "MapLibre", "GTFS", "FAISS"],
    stackRoles: {
      Python: "per-country pipelines",
      DuckDB: "national warehouses",
      FastAPI: "read-only lookup",
      React: "briefing surfaces",
      MapLibre: "small-area maps",
      GTFS: "official timetables",
      FAISS: "grounded chat index",
    },
    figures: [
      { value: "4", label: "national warehouses live" },
      { value: "103", label: "quality checks, 0 failures" },
      { value: "13", label: "product surfaces per country" },
      { value: "1", label: "method, applied per country" },
    ],
  },

  {
    slug: "evgraph",
    name: "Evgraph",
    whatItIs:
      "Turns Model Cards, approvals, and deployments into one Evidence Graph. EU AI Assurance OS pins evgraph-cli 0.1.2 so the evidence pack and the scan share the same gap.",
    forWhom:
      "For ML and governance engineers who need repeatable evidence checks in CI, not a hosted platform.",
    period: "2026 – Present",
    status: "packages",
    githubUrl: "https://github.com/SVamseekar/evgraph",
    explainer: "EvidenceGraphExplainer",
    problem:
      "The artifacts exist — a Model Card here, an approval ticket there, a registry entry somewhere else. Nothing connects them, so a reviewer rebuilds the same picture by hand every time and cannot show how they reached their conclusion.",
    story: [
      {
        step: "Point it at what you already have",
        detail:
          "Adapters read Model Cards, approvals, deployment records, dataset manifests and MLflow registry entries as they are.",
      },
      {
        step: "The pieces become one graph",
        detail:
          "Scattered files link into a single evidence graph, so a claim in a Model Card is connected to the approval and deployment that should support it.",
      },
      {
        step: "Rules read the graph, not the files",
        detail:
          "Deterministic rules traverse it and return cited findings. A missing approval timestamp stays inconclusive. The scan does not invent the field, and it does not paint that gap green or red.",
      },
      {
        step: "Findings never overclaim",
        detail:
          "Certainty runs STRUCTURAL → CONSISTENCY → HEURISTIC → INTERPRETIVE, and is only ever lowered as reasoning gets softer, never raised.",
      },
    ],
    build: [
      "Four packages versioned together at 0.1.2 — evgraph-core, evgraph-rules, evgraph, and evgraph-cli. The evgraph package does not install the evgraph command. EU AI Assurance OS pins evgraph-cli==0.1.2.",
      "Rules are pure over the graph: they emit findings without mutating it, so a scan is reproducible and explainable.",
      "Reporters emit JSON, Markdown, SARIF and OSCAL, so results land in code scanning or a compliance toolchain unchanged.",
      "Third-party rule packs register through entry points; promotion scans are report-only by default so CI collects evidence without blocking a build.",
    ],
    tradeoffs: [
      {
        choice: "Findings over pass/fail stamps",
        instead: "a green or red badge",
        why: "A badge hides its reasoning. A cited finding can be argued with, which is what a reviewer actually needs.",
      },
      {
        choice: "A library, not a platform",
        instead: "a hosted service",
        why: "Governance artifacts are sensitive and CI is where the check belongs. Shipping packages means no data leaves and no vendor is in the path.",
      },
      {
        choice: "Report-only promotion scans by default",
        instead: "blocking the build",
        why: "A tool that breaks CI on day one gets removed on day two. Collecting evidence first lets a team tighten the gate when they trust it.",
      },
    ],
    stack: ["Python", "SARIF", "OSCAL", "MLflow", "pytest"],
    stackRoles: {
      Python: "graph, rules, adapters",
      SARIF: "code-scanning output",
      OSCAL: "compliance toolchains",
      MLflow: "registry adapter",
      pytest: "rule verification",
    },
    figures: [
      { value: "4", label: "packages on PyPI" },
      { value: "4", label: "report formats" },
      { value: "4", label: "certainty levels" },
      { value: "0.1.2", label: "current version" },
    ],
  },

  {
    slug: "moveq",
    name: "Moveq",
    whatItIs:
      "Python libraries that turn service and demographic data into standard inequality measures — and keep cross-country methods honest.",
    forWhom:
      "For researchers and analysts who need defensible inequality numbers without adopting a framework.",
    period: "2026 – Present",
    status: "live",
    liveUrl: "https://moveq.souravamseekar.com",
    githubUrl: "https://github.com/SVamseekar/moveq",
    explainer: "MoveqExplainer",
    problem:
      "Inequality measures get reimplemented per project, slightly differently each time, and cross-country studies quietly drop the measures that do not travel. The omission never makes it into the write-up.",
    story: [
      {
        step: "Bring a CSV",
        detail:
          "Trips per area, population counts and deprivation ranks. No GIS stack, no framework, no service to deploy.",
      },
      {
        step: "Get the standard measures",
        detail:
          "Population-weighted Gini, the Palma ratio, the Wagstaff concentration index and a configurable composite accessibility score.",
      },
      {
        step: "Declare how methods travel",
        detail:
          "For cross-country work the catalogue makes you state, per measure, whether it is the same, replaced by a national equivalent, or omitted.",
      },
      {
        step: "Keep the judgment",
        detail:
          "moveq computes what the data shows and records what was computed. It does not decide policy.",
      },
    ],
    build: [
      "Four packages — moveq-core, moveq-catalogue, moveq, moveq-cli — versioned together and published to PyPI.",
      "moveq-core is pure NumPy with no required I/O or GIS dependencies, so it drops into an existing analysis without pulling a stack behind it.",
      "The catalogue exposes programmatic same / replace / omit contracts, making an omission an explicit declaration rather than a silent gap.",
      "moveq-cli gives a CSV-in, numbers-out interface for quick checks and CI; optional pandas helpers install via the frames extra.",
    ],
    tradeoffs: [
      {
        choice: "Pure NumPy core",
        instead: "pandas or GeoPandas as a hard dependency",
        why: "A statistics core that drags in a GIS stack cannot be used inside someone else's pipeline. Optional extras cover the convenience cases.",
      },
      {
        choice: "An explicit harmonization contract",
        instead: "silently skipping measures that do not apply",
        why: "The silent version is how cross-country studies mislead. Forcing a declaration puts the limitation in the output where a reader can see it.",
      },
    ],
    stack: ["Python", "NumPy", "pytest", "PyPI"],
    stackRoles: {
      Python: "library surface",
      NumPy: "inequality algorithms",
      pytest: "numerical checks",
      PyPI: "four published packages",
    },
    figures: [
      { value: "4", label: "packages on PyPI" },
      { value: "3", label: "inequality measures" },
      { value: "0", label: "required GIS dependencies" },
      { value: "0.1.2", label: "current version" },
    ],
  },
];

export const getSystem = (slug: string) =>
  systems.find((system) => system.slug === slug);

/**
 * Presentation order, grouped by what each thing is.
 *
 * Products a visitor can open come first, then the libraries they can install,
 * then the hackathon entry — which is real work but a different kind of claim,
 * so it does not sit beside the production systems.
 */
export const systemGroups = [
  {
    id: "products",
    label: "Production systems",
    slugs: ["workforceguard", "aequitas", "eu-ai-assurance", "masova"],
  },
  {
    id: "libraries",
    label: "Open-source libraries",
    slugs: ["evgraph", "moveq"],
  },
  {
    id: "prototype",
    label: "Built for a hackathon",
    slugs: ["masova-enterprise-fleet"],
  },
] as const;

/** The systems in presentation order, flattened. */
export const orderedSystems = systemGroups.flatMap((group) =>
  group.slugs
    .map((slug) => systems.find((system) => system.slug === slug))
    .filter((system): system is System => system !== undefined),
);

/** A group with its systems resolved. */
export const groupedSystems = systemGroups.map((group) => ({
  ...group,
  items: group.slugs
    .map((slug) => systems.find((system) => system.slug === slug))
    .filter((system): system is System => system !== undefined),
}));

/**
 * The work index, which is the systems only.
 *
 * The libraries have their own page, where they are described as packages —
 * install lines, the four-package split, what each one computes. Listing them
 * here too made /work a second copy of the home index rather than its own
 * page, and sent a reader looking for a library to the weaker of the two
 * descriptions.
 */
export const workGroups = groupedSystems.filter((group) => group.id !== "libraries");
