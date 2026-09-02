"use client";

/**
 * Shared SVG parts for the system explainers.
 *
 * These carry the motion vocabulary: a packet that travels a route, a service
 * box that lights up when called, a labelled node. Keeping them here means
 * every diagram animates consistently and each explainer file holds only what
 * is specific to its own system.
 */

type PacketProps = {
  /** Route to travel, as an SVG path `d`. */
  path: string;
  /** Seconds for one traversal. */
  dur?: number;
  /** Seconds before the first traversal. */
  begin?: number;
  radius?: number;
  /** Visual role — signal for normal traffic, warn for a rejected path. */
  tone?: "signal" | "warn" | "live";
  /** Set false to render nothing (used to disable motion). */
  enabled?: boolean;
};

/**
 * A request travelling between components.
 *
 * Uses SMIL animateMotion, which runs independently of the main thread and
 * needs no JS timer. Rendering is skipped entirely when motion is disabled,
 * so no packet is ever frozen mid-route.
 */
export function Packet({
  path,
  dur = 2.4,
  begin = 0,
  radius = 3.5,
  tone = "signal",
  enabled = true,
}: PacketProps) {
  if (!enabled) return null;

  const fill =
    tone === "warn" ? "ex-warn" : tone === "live" ? "ex-live" : "ex-signal";

  return (
    <circle className={`ex-packet ${fill}`} r={radius}>
      <animateMotion
        dur={`${dur}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
        path={path}
        rotate="auto"
      />
      <animate
        attributeName="opacity"
        values="0;1;1;0"
        keyTimes="0;0.08;0.9;1"
        dur={`${dur}s`}
        begin={`${begin}s`}
        repeatCount="indefinite"
      />
    </circle>
  );
}

type NodeBoxProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  /** Mono line under the title — a port, a count, an identifier. */
  meta?: string;
  variant?: "plain" | "accent" | "sunk" | "dashed";
  /** Adds a call-activity glow that pulses while the diagram plays. */
  pulse?: boolean;
  /** Phase class (p0–p7) so parallel components do not blink together. */
  phase?: string;
  /** Reveal-order class (d1–d14). */
  delay?: string;
};

/** A component in the architecture: a service, a store, a client. */
export function NodeBox({
  x,
  y,
  w,
  h,
  title,
  sub,
  meta,
  variant = "plain",
  pulse = false,
  phase = "p0",
  delay = "d1",
}: NodeBoxProps) {
  const boxClass =
    variant === "accent"
      ? "ex-box-accent"
      : variant === "sunk"
        ? "ex-box-sunk"
        : variant === "dashed"
          ? "ex-box-dashed"
          : "ex-box";

  // Vertically centre the text block within the box.
  const lines = [title, sub, meta].filter(Boolean).length;
  const startY = y + h / 2 - (lines - 1) * 7 + 4;

  return (
    <g className={`ex-step ${delay}`}>
      <rect x={x} y={y} width={w} height={h} rx="3" className={boxClass} />
      {pulse && (
        <rect
          x={x}
          y={y}
          width={w}
          height={h}
          rx="3"
          className={`ex-pulse ${phase}`}
          fill="none"
          stroke="var(--signal)"
          strokeWidth="1.5"
        />
      )}
      <text className="ex-name" x={x + 10} y={startY}>
        {title}
      </text>
      {sub && (
        <text className="ex-text" x={x + 10} y={startY + 14}>
          {sub}
        </text>
      )}
      {meta && (
        <text className="ex-mono" x={x + 10} y={startY + (sub ? 28 : 14)}>
          {meta}
        </text>
      )}
    </g>
  );
}

/** An arrowhead definition shared by every diagram. */
export function ArrowDefs({ id = "ex-arrow" }: { id?: string }) {
  return (
    <defs>
      <marker
        id={id}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="5"
        markerHeight="5"
        orient="auto"
      >
        <path
          d="M0,1 L9,5 L0,9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </marker>
    </defs>
  );
}

/** A section heading inside a diagram. */
export function Caption({
  x,
  y,
  children,
  delay = "d1",
}: {
  x: number;
  y: number;
  children: string;
  delay?: string;
}) {
  return (
    <text className={`ex-label ex-step ${delay}`} x={x} y={y}>
      {children}
    </text>
  );
}
