"use client";

import { GRID, nodeClass, edgeClass, edgeMarker } from "./system";
import type { NodeKind, EdgeKind, State } from "./system";

/**
 * Shared SVG primitives implementing the diagram grammar in ./system.ts.
 *
 * Every diagram builds from these, so shape, line weight, colour and motion
 * mean the same thing on every page. Layout stays free.
 */

/* ---------------------------------------------------------------- markers */

/**
 * Arrowhead definitions, declared once per diagram.
 *
 * Heads are filled and generously sized: an outline arrowhead at this scale
 * disappears against the page.
 */
export function Defs() {
  return (
    <defs>
      <marker
        id="dg-head"
        viewBox="0 0 12 12"
        refX="10"
        refY="6"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M1,1 L11,6 L1,11 Z" className="dg-head" />
      </marker>

      <marker
        id="dg-head-soft"
        viewBox="0 0 12 12"
        refX="10"
        refY="6"
        markerWidth="6"
        markerHeight="6"
        orient="auto-start-reverse"
      >
        <path d="M1,1 L11,6 L1,11 Z" className="dg-head-soft" />
      </marker>

      <marker
        id="dg-head-warn"
        viewBox="0 0 12 12"
        refX="10"
        refY="6"
        markerWidth="7.5"
        markerHeight="7.5"
        orient="auto-start-reverse"
      >
        <path d="M1,1 L11,6 L1,11 Z" className="dg-head-warn" />
      </marker>
    </defs>
  );
}

/* ------------------------------------------------------------------ edges */

type EdgeProps = {
  /** SVG path data. */
  d: string;
  kind?: EdgeKind;
  /** Draw the arrowhead. Off for edges that only imply a relationship. */
  head?: boolean;
  /** Show travelling traffic along the route. */
  flow?: boolean;
};

/**
 * A relationship between two components.
 *
 * `kind` sets both the stroke pattern and the arrowhead, so a dashed line
 * always means an asynchronous event and can never be drawn with a
 * synchronous head by accident.
 */
export function Edge({ d, kind = "sync", head = true, flow = false }: EdgeProps) {
  return (
    <path
      className={`${edgeClass[kind]}${flow ? " dg-flow" : ""}`}
      d={d}
      markerEnd={head ? edgeMarker[kind] : undefined}
    />
  );
}

/* ---------------------------------------------------------------- packets */

type PacketProps = {
  /** Route to travel — pass the same `d` as the Edge it follows. */
  path: string;
  dur?: number;
  begin?: number;
  /** What is travelling: a request, a committed write, a rejection. */
  tone?: "signal" | "live" | "warn";
  radius?: number;
  /** Set false to omit entirely (reduced motion). */
  enabled?: boolean;
  /** Number of evenly-spaced packets on this route. */
  count?: number;
};

/**
 * Traffic travelling a route.
 *
 * A packet always follows a real edge, and `count` spaces several along the
 * same path so a busy route reads as busy rather than as one lonely dot.
 */
export function Packet({
  path,
  dur = 2.2,
  begin = 0,
  tone = "signal",
  radius = 4.5,
  enabled = true,
  count = 1,
}: PacketProps) {
  if (!enabled) return null;

  return (
    <>
      {Array.from({ length: count }, (_, i) => {
        const offset = begin + (dur / count) * i;
        return (
          <circle key={i} className={`dg-packet dg-packet-${tone}`} r={radius}>
            <animateMotion
              dur={`${dur}s`}
              begin={`${offset}s`}
              repeatCount="indefinite"
              path={path}
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.06;0.88;1"
              dur={`${dur}s`}
              begin={`${offset}s`}
              repeatCount="indefinite"
            />
          </circle>
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------------ nodes */

type NodeProps = {
  x: number;
  y: number;
  w: number;
  h?: number;
  /** Primary name. Say what it does, not what it is called internally. */
  label: string;
  /** One line of supporting detail. */
  detail?: string;
  kind?: NodeKind;
  state?: State;
  /** Show an execution pulse. */
  active?: boolean;
  /** Pulse phase class (q0–q7) so siblings do not blink in unison. */
  phase?: string;
  /** Reveal order class (s1–s16). */
  step?: string;
  /** Centre the text instead of left-aligning it. */
  centre?: boolean;
};

/** A component: a service, a store, a client surface, a queue, a gate. */
export function Node({
  x,
  y,
  w,
  h = GRID.nodeH,
  label,
  detail,
  kind = "service",
  state = "idle",
  active = false,
  phase = "q0",
  step = "s1",
  centre = false,
}: NodeProps) {
  const tx = centre ? x + w / 2 : x + GRID.padX;
  const anchor = centre ? "middle" : "start";
  const baseline = detail ? y + h / 2 - 3 : y + h / 2 + 4;

  return (
    <g className={`dg-node ${nodeClass[kind]} dg-${state} dg-in ${step}`}>
      <rect x={x} y={y} width={w} height={h} rx={GRID.radius} className="dg-shape" />

      {/* Stores carry a left accent bar, so persistence reads at a glance. */}
      {kind === "store" && (
        <rect x={x} y={y + 1} width={3} height={h - 2} className="dg-store-bar" />
      )}

      {active && (
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx={GRID.radius}
          className={`dg-pulse ${phase}`}
        />
      )}

      <text className="dg-label" x={tx} y={baseline} textAnchor={anchor}>
        {label}
      </text>
      {detail && (
        <text className="dg-detail" x={tx} y={baseline + 15} textAnchor={anchor}>
          {detail}
        </text>
      )}
    </g>
  );
}

/** An entity in a graph. */
export function GraphNode({
  x,
  y,
  label,
  state = "idle",
  step = "s1",
  anchor = "start",
}: {
  x: number;
  y: number;
  label: string;
  state?: State;
  step?: string;
  anchor?: "start" | "end" | "middle";
}) {
  const dx = anchor === "end" ? -14 : anchor === "middle" ? 0 : 14;
  return (
    <g className={`dg-graphnode dg-${state} dg-pop ${step}`}>
      <circle cx={x} cy={y} r="7" className="dg-dot" />
      <text className="dg-label" x={x + dx} y={y + 4} textAnchor={anchor}>
        {label}
      </text>
    </g>
  );
}

/* ------------------------------------------------------- boundary + label */

/** A labelled container marking a trust, deployment or method boundary. */
export function Boundary({
  x,
  y,
  w,
  h,
  label,
  step = "s1",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  step?: string;
}) {
  return (
    <g className={`dg-boundary dg-in ${step}`}>
      <rect x={x} y={y} width={w} height={h} rx={GRID.radius} className="dg-bound-shape" />
      {label && (
        <text className="dg-bound-label" x={x + 12} y={y + 16}>
          {label}
        </text>
      )}
    </g>
  );
}

/** A group heading inside a diagram. */
export function Label({
  x,
  y,
  children,
  step = "s1",
  tone,
  anchor = "start",
}: {
  x: number;
  y: number;
  children: string;
  step?: string;
  tone?: "warn" | "live" | "signal";
  anchor?: "start" | "end" | "middle";
}) {
  return (
    <text
      className={`dg-group dg-in ${step}${tone ? ` dg-text-${tone}` : ""}`}
      x={x}
      y={y}
      textAnchor={anchor}
    >
      {children}
    </text>
  );
}

/** A line of supporting note text inside a diagram. */
export function Note({
  x,
  y,
  children,
  step = "s1",
  tone,
  anchor = "start",
  strong = false,
}: {
  x: number;
  y: number;
  children: string;
  step?: string;
  tone?: "warn" | "live" | "signal";
  anchor?: "start" | "end" | "middle";
  strong?: boolean;
}) {
  return (
    <text
      className={`${strong ? "dg-note-strong" : "dg-note"} dg-in ${step}${
        tone ? ` dg-text-${tone}` : ""
      }`}
      x={x}
      y={y}
      textAnchor={anchor}
    >
      {children}
    </text>
  );
}
