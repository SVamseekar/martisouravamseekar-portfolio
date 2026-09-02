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
  /* Cancellation is permitted from every state up to and including READY —
     RECEIVED, PREPARING, OVEN, BAKED, READY — and from no state after it. The
     branch therefore collects from all five along a rail under the first row,
     then leaves down the right-hand side, clear of the second row: an order
     that has been DISPATCHED can no longer be cancelled. */
  const cancelRail = y1 + cellH + 16;
  /* Kept inside the canvas: the rail turns down just clear of the wrap. */
  const cancelDownX = 706;
  const cancelY = 262;

  return (
    <ExplainerFrame
      kicker="Order lifecycle"
      caption="One order, eleven states. Each transition publishes an event; tax and fiscal rules resolve from the order's own context as it advances."
      description="An order moves through eleven states. The top row runs received, preparing, oven, baked, ready. It then wraps to the second row, read right to left: dispatched, out for delivery, delivered, served, completed. Cancelled is a terminal branch reachable from any state up to and including ready; once an order is dispatched it can no longer be cancelled. Every transition publishes an event. VAT resolves from country, order type and item category across twelve markets, and a fiscal signature is applied at completion in the six countries that require one."
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

          {/* The token is drawn after the boxes: it passes through each state,
              so it has to paint on top of them rather than behind. */}
          <Packet path={journey} dur={9} enabled={motion} radius={5} />

          <Label x={lastRight + 10} y={mid1 - 26} step="s6" anchor="end">
            turns ↓
          </Label>
          <Label x={left} y={232} step="s11">
            ← completes here
          </Label>

          {/* ---- Cancelled: reachable from every state up to READY ---- */}
          {/* Short stubs drop from each cancellable state onto a shared rail. */}
          {[0, 1, 2, 3].map((i) => (
            <path
              key={`cancel-stub-${i}`}
              className="dg-rejected dg-in s12"
              d={`M ${cellX(i) + cellW / 2},${y1 + cellH} V ${cancelRail}`}
              fill="none"
            />
          ))}

          {/* The rail gathers them and leaves to the right of the wrap, so it
              never crosses the second row — which is the point: nothing after
              READY can be cancelled. */}
          <Route
            d={`M ${cellX(0) + cellW / 2},${cancelRail} H ${cancelDownX} V ${cancelY + 17} H ${cancelDownX - 40}`}
            kind="rejected"
            motion={motion}
            dur={2.4}
            begin={1.6}
          />
          {/* READY joins the rail last, being the final cancellable state. */}
          <path
            className="dg-rejected dg-in s12"
            d={`M ${cellX(4) + cellW / 2},${y1 + cellH} V ${cancelRail}`}
            fill="none"
          />

          <Node
            x={cancelDownX - 40 - cellW}
            y={cancelY}
            w={cellW}
            h={34}
            label="CANCELLED"
            kind="external"
            state="warn"
            step="s12"
            centre
          />
          <text
            className="dg-note dg-in s12"
            x={cancelDownX - 40 - cellW / 2}
            y={cancelY + 52}
            textAnchor="middle"
          >
            any state up to ready
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
