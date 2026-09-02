/**
 * The five systems, told as the people who use them experience them.
 *
 * Each entry carries two registers:
 *   - `story`   what the product does for its audience, in their language
 *   - `build`   what it took to build, for engineers assessing the work
 *
 * The `explainer` field names which bespoke diagram the detail page renders.
 * Diagrams show the working logic a user would recognise — a release being
 * blocked, an order moving through a kitchen — never internal source code.
 *
 * Figures here are load-bearing. Anything externally checkable belongs in
 * evidence.ts and is enforced by `npm run verify`.
 */

export type Audience = "product" | "research" | "both";

export type System = {
  readonly slug: string;
  readonly name: string;
  /** One line, plain language, for someone who has never heard of it. */
  readonly whatItIs: string;
  /** Who this is for and the decision it supports. */
  readonly forWhom: string;
  readonly audience: Audience;
  readonly period: string;
  readonly status: "live" | "packages" | "private";
  readonly liveUrl?: string;
  readonly githubUrl?: string;
  readonly regulation?: string;
  /** Which explainer component the detail page mounts. */
  readonly explainer: string;
  /** The problem, in the user's words, before the product exists. */
  readonly problem: string;
  /** How it works for that user — 3–4 steps, no internals. */
  readonly story: readonly { readonly step: string; readonly detail: string }[];
  /** Engineering substance, for the technical reader. */
  readonly build: readonly string[];
  readonly stack: readonly string[];
  /** Short pull-quote figures shown beside the explainer. */
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
    audience: "both",
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
          "Employment, vacancies and pay-gap series for all 27 member states and 13 sectors are already loaded from Eurostat, so there is a benchmark before anyone uploads anything.",
      },
      {
        step: "Add your payroll",
        detail:
          "Upload internal pay data and it is blended against the matching country and sector benchmark — not a global average that flatters or unfairly damns you.",
      },
      {
        step: "See which gaps need a reason",
        detail:
          "The review queue flags where the company sits outside its benchmark, so effort goes to the roles that will actually be questioned.",
      },
      {
        step: "Export something a regulator accepts",
        detail:
          "Every figure carries its Eurostat source, dataset version and formula version. Decisions are written to a tamper-evident log, exported as one evidence pack.",
      },
    ],
    build: [
      "16 Eurostat datasets (LFS, JVS, SES) ingested as Parquet and modelled through layered dbt (~31 models) on DuckDB — no database server at query time.",
      "A single analytics repository resolves filters, assembles evidence bundles and writes governance events, keeping provenance structural rather than cosmetic.",
      "Governance events are chained with SHA-256, so tampering is detectable and chain integrity is verified on every API call.",
      "The copilot picks its benchmark basis from data coverage and declines to answer confidently when coverage is partial.",
    ],
    stack: ["Python", "dbt", "DuckDB", "FastAPI", "React", "TypeScript", "GCP"],
    figures: [
      { value: "27", label: "member states" },
      { value: "13", label: "NACE sectors" },
      { value: "16", label: "source datasets" },
    ],
  },

  {
    slug: "eu-ai-assurance",
    name: "EU AI Assurance OS",
    whatItIs:
      "A release gate for teams shipping AI into the EU: it decides whether a model is allowed out, and proves why.",
    forWhom:
      "For engineering and governance teams who must show an AI system met its obligations before deployment.",
    audience: "product",
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
          "The AI system is described once and classified with guidance into a risk class, so the obligations that follow are explicit rather than assumed.",
      },
      {
        step: "The gate runs in CI",
        detail:
          "A release calls the gate like any other pipeline check. Evaluations run on a durable queue and report back over signed callbacks.",
      },
      {
        step: "Get a verdict with citations",
        detail:
          "The gate returns pass, review or blocked — and cites the specific evidence behind the decision, so a blocked release comes with the reason attached.",
      },
      {
        step: "Seal the record",
        detail:
          "The decision, its evidence and its approvals are sealed into an evidence pack and appended to a tamper-evident ledger for whoever asks later.",
      },
    ],
    build: [
      "Spring Boot 3.3 API with Flyway V1–V16 and multi-tenant JPA behind JWT and API-key auth — 64 REST endpoints and 190 automated tests.",
      "Cited-evidence retrieval runs on DJL + ONNX Runtime with pgvector HNSW, so answers point back at source documents.",
      "Eval results return over HMAC-SHA-256 signed callbacks; the queue is durable, so a gate decision survives a worker restart.",
      "Append-only audit ledger is hash-chained with verify endpoints, and evidence packs export as JSON with a PDF rendering.",
    ],
    stack: [
      "Java 17",
      "Spring Boot 3.3",
      "PostgreSQL",
      "pgvector",
      "Next.js",
      "Docker",
    ],
    figures: [
      { value: "64", label: "REST endpoints" },
      { value: "190", label: "automated tests" },
      { value: "V16", label: "schema migrations" },
    ],
  },

  {
    slug: "aequitas",
    name: "Aequitas",
    whatItIs:
      "Answers one question the same way in every country: who here is underserved by public transport, and by how much?",
    forWhom:
      "For transport authorities and researchers who need a comparable briefing rather than a bespoke study per region.",
    audience: "both",
    period: "Oct 2021 – Present",
    status: "live",
    liveUrl: "https://aequitas.souravamseekar.com",
    githubUrl: "https://github.com/SVamseekar/aequitas",
    explainer: "EquityExplainer",
    problem:
      "Timetables, small-area geography and a deprivation index are all published already. What is missing is a briefing that asks the same question in each region — so answers from England and Ireland can sit in the same room without being quietly incomparable.",
    story: [
      {
        step: "Take what the country already publishes",
        detail:
          "Official timetables, census geography and the national deprivation measure — no proprietary feeds, no invented travel times.",
      },
      {
        step: "Score inside the country, never across",
        detail:
          "One formula, applied within each country. England's index and the Netherlands' are never plotted on the same axis, because they do not mean the same thing.",
      },
      {
        step: "Read the briefing",
        detail:
          "A map, a quotable score, and a fixed set of exhibits: coverage, evening isolation, service quality, and how service tracks deprivation.",
      },
      {
        step: "Compare like with like",
        detail:
          "Two regions inside one country, side by side. Where evidence is weak the exhibit is omitted rather than filled with an estimate.",
      },
    ],
    build: [
      "Four national warehouses live — England, Ireland, the Netherlands and France — each built from official GTFS, census geography and the national deprivation index.",
      "Analytics are pre-computed when the warehouse is built; the API is a lookup layer, so the interface cannot invent a figure at request time.",
      "Composite score weights coverage, evening service, weekday quality and the deprivation–service correlation, renormalising when a term is unavailable.",
      "Narratives are templated from warehouse numbers; weak evidence is dropped rather than imputed.",
    ],
    stack: [
      "Python",
      "DuckDB",
      "FastAPI",
      "React",
      "MapLibre",
      "GTFS",
      "FAISS",
    ],
    figures: [
      { value: "4", label: "countries live" },
      { value: "1.75M", label: "GTFS trips (England)" },
      { value: "103", label: "quality checks, 0 failures" },
    ],
  },

  {
    slug: "evgraph",
    name: "Evgraph",
    whatItIs:
      "Stops governance reviewers stitching Model Cards, approvals and registry entries together by hand.",
    forWhom:
      "For ML and governance engineers who need repeatable evidence checks in CI, not a hosted platform.",
    audience: "both",
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
          "Deterministic rules traverse it and return findings with citations back into the graph — you always see why, not just a green or red badge.",
      },
      {
        step: "Findings never overclaim",
        detail:
          "Every finding carries how certain it is, from structural fact down to interpretation. Certainty is only ever lowered as reasoning gets softer, never raised.",
      },
    ],
    build: [
      "Four published packages — core types, rule pack, adapters and CLI — versioned together and installable from PyPI.",
      "Rules are pure over the graph: they emit findings without mutating it, so a scan is reproducible and explainable.",
      "Reporters emit JSON, Markdown, SARIF and OSCAL, so results land in code scanning or a compliance toolchain unchanged.",
      "Third-party rule packs register through entry points; promotion scans are report-only by default so CI collects evidence without blocking.",
    ],
    stack: ["Python", "SARIF", "OSCAL", "MLflow", "pytest"],
    figures: [
      { value: "4", label: "packages on PyPI" },
      { value: "4", label: "report formats" },
      { value: "0.1.2", label: "current version" },
    ],
  },

  {
    slug: "masova",
    name: "MaSoVa",
    whatItIs:
      "Runs a multi-store restaurant: orders from every channel land in one kitchen queue, taxed and signed correctly per country.",
    forWhom:
      "For EU restaurant operators running several sites across more than one tax jurisdiction.",
    audience: "product",
    period: "Feb 2023 – Present",
    status: "live",
    liveUrl: "https://masova.souravamseekar.com",
    githubUrl: "https://github.com/SVamseekar/masova-platform",
    explainer: "OrderFlowExplainer",
    problem:
      "At rush, orders arrive from four aggregators on four tablets, the kitchen cannot tell which is urgent, and VAT and fiscal signing differ by country. Every one of those is a place to lose a ticket or fail an inspection.",
    story: [
      {
        step: "Every channel becomes one queue",
        detail:
          "Orders from the storefront and from aggregators are normalised into a single stream, so the kitchen sees one list instead of four tablets.",
      },
      {
        step: "The kitchen sees what is urgent",
        detail:
          "A live display shows per-item timers and status. Each state change fans out to whoever needs it — kitchen, driver, customer.",
      },
      {
        step: "Tax is decided by context, not guesswork",
        detail:
          "VAT depends on country, order type and item category across 12 markets, and fiscal signing runs at completion where the country requires it.",
      },
      {
        step: "Money is written down safely",
        detail:
          "Financial records commit to the transactional store first before anything downstream reads them, so payments and orders cannot drift apart.",
      },
    ],
    build: [
      "Six Spring Boot services on Java 21 behind Spring Cloud Gateway, with 207 canonical endpoints validated by an integration matrix in CI.",
      "An 11-state order lifecycle where every transition publishes to a topic exchange, driving kitchen, logistics and notifications independently.",
      "Dual-write persistence: PostgreSQL synchronously for financial truth, MongoDB asynchronously for read models.",
      "EU VAT across 12 countries, fiscal signing adapters for six, 14 EU allergens enforced before an item can go live, and a GDPR erasure flow across services.",
    ],
    stack: [
      "Java 21",
      "Spring Boot 3",
      "RabbitMQ",
      "PostgreSQL",
      "MongoDB",
      "React",
      "React Native",
    ],
    figures: [
      { value: "207", label: "API endpoints" },
      { value: "12", label: "VAT jurisdictions" },
      { value: "11", label: "order states" },
    ],
  },
];

export const getSystem = (slug: string) =>
  systems.find((system) => system.slug === slug);

/** WorkforceGuard leads: it is the only system carrying both a product and a paper. */
export const leadSystem = systems[0];
export const supportingSystems = systems.slice(1);
