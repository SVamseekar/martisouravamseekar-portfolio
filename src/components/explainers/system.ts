/**
 * Diagram visual grammar.
 *
 * Every architecture diagram on this site draws from one vocabulary, so a
 * reader who learns it on one page can read the next without relearning.
 * Layout is free — a pipeline should look like a pipeline and a graph like a
 * graph — but shape, line, colour and motion always mean the same thing.
 *
 *
 * SHAPE — what kind of thing it is
 *   service    rounded rect, solid border      a process that runs code
 *   store      rounded rect, left accent bar   something that persists state
 *   client     rounded rect, light fill        a surface a person touches
 *   external   rounded rect, dashed border     a system outside the boundary
 *   node       circle                          an entity in a graph
 *   gate       rect with heavier border        a decision point
 *
 * LINE — what kind of relationship
 *   solid      synchronous call, the caller waits
 *   dashed     asynchronous event, fire and continue
 *   dotted     reference or lineage, no runtime traffic
 *   rejected   heavy, warn-coloured, a refused path
 *
 * COLOUR — what state it is in
 *   signal     active, in flight, currently executing
 *   live       verified, committed, succeeded
 *   warn       blocked, failed, requires attention
 *   idle       present but not currently active
 *
 * BOUNDARY — a labelled container marks a trust or deployment boundary.
 *
 * MOTION — every animation carries meaning
 *   packet     one request, event or record travelling a real route
 *   pulse      a component executing
 *   flow       a route carrying traffic
 *   grow       a measured quantity being drawn
 *   No motion is decorative. If it moves, it means something.
 */

/** Canonical geometry so nodes align across diagrams. */
export const GRID = {
  /** Standard node height; keeps rows on a common baseline. */
  nodeH: 46,
  nodeHSm: 34,
  nodeHLg: 58,
  /** Gap between stacked nodes. */
  rowGap: 14,
  /** Corner radius — one value everywhere. */
  radius: 4,
  /** Inner padding inside a node. */
  padX: 12,
  /** Standard canvas width for every diagram. */
  width: 720,
  /** Margin from the canvas edge to content. */
  margin: 24,
} as const;

export type NodeKind =
  | "service"
  | "store"
  | "client"
  | "external"
  | "gate"
  | "queue";

export type EdgeKind = "sync" | "async" | "lineage" | "rejected";

export type State = "idle" | "active" | "verified" | "warn";

/** Maps a node kind to its CSS class. */
export const nodeClass: Record<NodeKind, string> = {
  service: "dg-service",
  store: "dg-store",
  client: "dg-client",
  external: "dg-external",
  gate: "dg-gate",
  queue: "dg-queue",
};

/** Maps an edge kind to its CSS class. */
export const edgeClass: Record<EdgeKind, string> = {
  sync: "dg-edge dg-sync",
  async: "dg-edge dg-async",
  lineage: "dg-edge dg-lineage",
  rejected: "dg-edge dg-rejected",
};

/** Marker id for each edge kind, so arrowheads match their line. */
export const edgeMarker: Record<EdgeKind, string> = {
  sync: "url(#dg-head)",
  async: "url(#dg-head)",
  lineage: "url(#dg-head-soft)",
  rejected: "url(#dg-head-warn)",
};
