"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { Boundary, Defs, Label, Node, Packet, Route } from "./parts";

/**
 * MaSoVa — one order walking its real lifecycle.
 *
 * A single token travels the whole chain as one continuous path: in at
 * RECEIVED, along the top row, around the right-hand turn, back along the
 * bottom row to COMPLETED. Connectors meet each box at its vertical centre,
 * and the cancelled branch leaves from the last state that can still cancel.
 */
export function OrderFlowExplainer() {
  const row1 = ["RECEIVED", "PREPARING", "OVEN", "BAKED", "READY"];
  const row2 = ["DISPATCHED", "IN TRANSIT", "DELIVERED", "SERVED", "COMPLETED"];

  const cellW = 118;
  const cellH = 40;
  const gap = 9;
  const left = 22;

  const y1 = 84;
  const y2 = 168;
  // Connectors run through the middle of each row, not along its top edge.
  const mid1 = y1 + cellH / 2;
  const mid2 = y2 + cellH / 2;

  const cellX = (i: number) => left + i * (cellW + gap);
  const lastRight = cellX(4) + cellW;

  // One continuous journey: across, around, back.
  const turnR = (y2 - y1) / 2;
  const turnX = lastRight + 26;
  const journey =
    `M ${left + 14},${mid1} H ${turnX} ` +
    `A ${turnR} ${turnR} 0 0 1 ${turnX},${mid2} ` +
    `H ${left + 14}`;

  // The order can still be cancelled up to READY; the branch leaves from there.
  const cancelFrom = cellX(4) + cellW / 2;

  return (
    <ExplainerFrame
      kicker="Order lifecycle"
      caption="One order, eleven states. Each transition publishes an event; tax and fiscal rules resolve from the order's own context as it advances."
      description="An order moves through eleven states. The top row runs received, preparing, oven, baked, ready. It then wraps to the second row, read right to left: dispatched, out for delivery, delivered, served, completed. Cancelled is a terminal branch reachable until the order is ready. Every transition publishes an event. VAT resolves from country, order type and item category across twelve markets, and a fiscal signature is applied at completion in the six countries that require one."
    >
      {({ motion }) => (
        <svg
          viewBox="0 0 720 350"
          className="explainer-svg"
          role="img"
          aria-label="Eleven-state order lifecycle with tax resolution"
        >
          <Defs />

          <Label x={left} y={40} step="s1">
            Order 4182 · store DE-02 · takeaway
          </Label>

          {/* The route the order travels, drawn once, through box centres. */}
          <Route d={journey} head={false} motion={motion} dur={9} traffic={false} />
          <Packet path={journey} dur={9} enabled={motion} radius={5} />

          {/* ---- Row 1, left to right ---- */}
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

          {/* ---- Row 2, drawn right to left so it reads in travel order ---- */}
          {row2.map((state, i) => (
            <Node
              key={state}
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

          <Label x={lastRight + 10} y={mid1 - 26} step="s6" anchor="end">
            turns ↓
          </Label>
          <Label x={left} y={232} step="s11">
            ← completes here
          </Label>

          {/* ---- Cancelled: a terminal branch off the last cancellable state ---- */}
          <Route
            d={`M ${cancelFrom},${y1 + cellH} V 262`}
            kind="rejected"
            motion={motion}
            dur={1.6}
            begin={2}
          />
          <Node
            x={cancelFrom - cellW / 2}
            y={262}
            w={cellW}
            h={34}
            label="CANCELLED"
            kind="external"
            state="warn"
            step="s12"
            centre
          />
          <text className="dg-note dg-in s12" x={cancelFrom} y={314} textAnchor="middle">
            reachable until ready
          </text>

          {/* ---- Resolved per order ---- */}
          <Boundary x={24} y={252} w={288} h={82} label="Resolved per order" step="s13" />

          <text className="dg-note-strong dg-in s13" x={42} y={288}>
            VAT
          </text>
          <text className="dg-note dg-in s13" x={42} y={304}>
            country × order type × item
          </text>
          <text className="dg-note dg-text-signal dg-in s13" x={294} y={288} textAnchor="end">
            12 markets
          </text>

          <text className="dg-note-strong dg-in s14" x={42} y={324}>
            Fiscal signature
          </text>
          <text className="dg-note dg-text-signal dg-in s14" x={294} y={324} textAnchor="end">
            6 countries
          </text>
        </svg>
      )}
    </ExplainerFrame>
  );
}
