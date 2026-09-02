/**
 * Verified evidence — the single source of truth for every checkable claim.
 *
 * Every figure here is externally verifiable. `npm run verify` re-checks the
 * live URLs, PyPI versions, and publication links in this file and fails if
 * reality has drifted. Numbers quoted in copy MUST come from here, never from
 * a literal typed into a component.
 *
 * Last verified: 2026-09-02
 */

export type EvidenceLink = {
  readonly label: string;
  readonly href: string;
  /** Checked by scripts/verify-claims.mjs. Some hosts 403 bots but work in browsers. */
  readonly check?: "http" | "pypi" | "skip";
  /** Why a check is skipped, shown in the verify report. */
  readonly skipReason?: string;
};

/** Live product surfaces. Verified reachable 2026-09-02. */
export const liveSystems = [
  {
    slug: "workforceguard",
    href: "https://workforceguardai.souravamseekar.com",
  },
  {
    slug: "eu-ai-assurance",
    href: "https://euassuranceai.souravamseekar.com",
  },
  { slug: "aequitas", href: "https://aequitas.souravamseekar.com" },
  { slug: "masova", href: "https://masova.souravamseekar.com" },
] as const;

/**
 * Published Python packages. Two library stacks, four packages each.
 * Versions are asserted here and re-checked against the PyPI JSON API.
 */
export const packages = [
  {
    name: "evgraph",
    stack: "evgraph",
    version: "0.1.2",
    summary: "Adapters, reporters, and rule discovery over an Evidence Graph.",
  },
  {
    name: "evgraph-core",
    stack: "evgraph",
    version: "0.1.2",
    summary: "Core types: graph, nodes, edges, evidence levels, findings.",
  },
  {
    name: "evgraph-rules",
    stack: "evgraph",
    version: "0.1.2",
    summary: "Built-in rule pack, discoverable via entry points.",
  },
  {
    name: "evgraph-cli",
    stack: "evgraph",
    version: "0.1.2",
    summary: "Command-line scanner for local and CI use.",
  },
  {
    name: "moveq",
    stack: "moveq",
    version: "0.1.2",
    summary: "Transport-equity analysis: Gini, Palma, concentration index.",
  },
  {
    name: "moveq-core",
    stack: "moveq",
    version: "0.1.2",
    summary: "Pure-NumPy inequality algorithms, no I/O or GIS dependencies.",
  },
  {
    name: "moveq-catalogue",
    stack: "moveq",
    version: "0.1.2",
    summary: "Harmonization registry for cross-country method contracts.",
  },
  {
    name: "moveq-cli",
    stack: "moveq",
    version: "0.1.2",
    summary: "CSV-in, numbers-out command-line interface.",
  },
] as const;

/** Publication records for the working paper. */
export const publications: readonly EvidenceLink[] = [
  {
    label: "MPRA 129330",
    href: "https://mpra.ub.uni-muenchen.de/129330/",
    check: "http",
  },
  {
    label: "Zenodo DOI",
    href: "https://doi.org/10.5281/zenodo.20455974",
    check: "http",
  },
  {
    label: "ORCID",
    href: "https://orcid.org/0009-0005-4884-1292",
    check: "http",
  },
  {
    label: "SSRN",
    href: "https://ssrn.com/abstract=6826361",
    check: "skip",
    skipReason: "SSRN returns 403 to automated clients; reachable in-browser.",
  },
];

/**
 * Headline counts, derived rather than typed, so the hero can never contradict
 * the lists above.
 */
export const counts = {
  liveSystems: liveSystems.length,
  packages: packages.length,
  papers: 1,
} as const;
