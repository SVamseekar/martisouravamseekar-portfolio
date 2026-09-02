"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { Boundary, Defs, Edge, Label, Node, Packet } from "./parts";

/**
 * MaSoVa — one order walking its real lifecycle.
 *
 * A single token travels the whole chain as one continuous path: it enters at
 * RECEIVED, runs the top row left to right, wraps down at the end, and
 * continues along the bottom row to COMPLETED. One order, one journey — not
 * two independent left-to-right passes.
 */
export function OrderFlowExplainer() {
  const row1 = ["RECEIVED", "PREPARING", "OVEN", "BAKED", "READY"];
  const row2 = ["DISPATCHED", "OUT FOR DELIVERY", "DELIVERED", "SERVED", "COMPLETED"];

  const cellW = 126;
  const cellH = 38;
  const gap = 9;
  const left = 24;

  const y1 = 86;
  const y2 = 166;
  const mid1 = y1 + cellH / 2;

  const cellX = (i: number) => left + i * (cellW + gap);
  const lastRight = cellX(4) + cellW;

  /**
   * The full journey as one path: across row 1, around the right-hand turn,
   * back along row 2. The packet follows exactly this, so it always ends at
   * COMPLETED rather than restarting mid-row.
   */
  const journey =
    `M ${left + 12},${mid1} H ${lastRight - 12} ` +
    `q 26,0 26,26 v 14 q 0,26 -26,26 ` +
    `H ${left + 12}`;

  return (
    <ExplainerFrame
      kicker="Order lifecycle"
      caption="One order, eleven states. Each transition publishes an event; tax and fiscal rules resolve from the order's own context as it advances."
      description="An order moves through eleven states. The top row runs received, preparing, oven, baked, ready. The order then wraps to the second row: dispatched, out for delivery, delivered, served, completed. Cancelled is a terminal branch available from the early states. Every transition publishes an event. VAT is resolved from country, order type and item category across twelve markets, and a fiscal signature is applied at completion in the six countries that require one."
    >
      {({ motion }) => (
        <svg
          viewBox="0 0 720 340"
          className="explainer-svg"
          role="img"
          aria-label="Eleven-state order lifecycle with tax resolution"
        >
          <Defs />

          <Label x={left} y={40} step="s1">
            Order 4182 · store DE-02 · takeaway
          </Label>

          {/* The route the order travels, drawn once. */}
          <Edge d={journey} kind="sync" head={false} flow />

          {/* ---- Row 1 ---- */}
          {row1.map((state, i) => (
            <Node
              key={state}
              x={cellX(i)}
              y={y1}
              w={cellW}
              h={cellH}
              label={state}
              kind="service"
              state={i === 1 ? "active" : "idle"}
              step={`s${i + 1}`}
              centre
            />
          ))}

          {/* ---- Row 2 ---- */}
          {row2.map((state, i) => (
            <Node
              key={state}
              // Row 2 is drawn right-to-left so it reads in travel order.
              x={cellX(4 - i)}
              y={y2}
              w={cellW}
              h={cellH}
              label={state}
              kind="service"
              state={i === 4 ? "verified" : "idle"}
              step={`s${6 + i}`}
              centre
            />
          ))}

          {/* One order, travelling the whole chain. */}
          <Packet path={journey} dur={9} enabled={motion} radius={5} />

          {/* Direction cues, since row 2 runs right to left. */}
          <Label x={lastRight} y={70} step="s6" anchor="end">
            → continues
          </Label>
          <Label x={left} y={222} step="s11">
            ← completes
          </Label>

          {/* Terminal branch. */}
          <Edge
            d={`M ${cellX(1) + cellW / 2},${y1 + cellH} V 246`}
            kind="rejected"
          />
          <Node
            x={cellX(1) - 14}
            y={246}
            w={cellW}
            h={32}
            label="CANCELLED"
            kind="external"
            state="warn"
            step="s12"
            centre
          />

          {/* ---- Resolved per order ---- */}
          <Boundary x={330} y={232} w={366} h={86} label="Resolved per order" step="s13" />

          <text className="dg-note-strong dg-in s13" x={348} y={268}>
            VAT
          </text>
          <text className="dg-note dg-in s13" x={348} y={284}>
            country × order type × item category
          </text>
          <text className="dg-note dg-text-signal dg-in s13" x={678} y={268} textAnchor="end">
            12 markets
          </text>

          <text className="dg-note-strong dg-in s14" x={348} y={306}>
            Fiscal signature
          </text>
          <text className="dg-note dg-in s14" x={462} y={306}>
            applied at completion
          </text>
          <text className="dg-note dg-text-signal dg-in s14" x={678} y={306} textAnchor="end">
            6 countries
          </text>
        </svg>
      )}
    </ExplainerFrame>
  );
}
