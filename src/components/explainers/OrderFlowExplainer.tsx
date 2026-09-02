"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { ArrowDefs, Caption, Packet } from "./parts";

/**
 * MaSoVa — an order moving through its real lifecycle.
 *
 * The eleven states are the ones in shared-models OrderStatus. A token walks
 * the chain while the VAT and fiscal context resolve underneath, because that
 * is the part an operator in twelve tax jurisdictions actually cares about.
 */
export function OrderFlowExplainer() {
  const states = [
    "RECEIVED",
    "PREPARING",
    "OVEN",
    "BAKED",
    "READY",
    "DISPATCHED",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
    "SERVED",
    "COMPLETED",
  ];

  // Two rows so the long state names stay legible.
  const row1 = states.slice(0, 5);
  const row2 = states.slice(5);
  const cellW = 128;
  const gap = 8;

  const rowY1 = 92;
  const rowY2 = 168;

  const trackY1 = rowY1 + 15;
  const trackY2 = rowY2 + 15;

  return (
    <ExplainerFrame
      kicker="Order lifecycle"
      caption="Eleven states, each transition publishing an event. VAT and fiscal signing resolve from country, order type and item category as the order advances."
      description="An order advances through eleven states: received, preparing, oven, baked, ready, dispatched, out for delivery, delivered, served, completed, with cancelled as a terminal branch. Each transition publishes to the order exchange. Underneath, VAT is resolved from country, order type and item category across twelve markets, and fiscal signing runs at completion for Germany, France, Italy, Belgium, Hungary and Great Britain."
    >
      {({ motion }) => (
        <svg
          viewBox="0 0 720 290"
          className="explainer-svg"
          role="img"
          aria-label="Eleven-state order lifecycle with VAT and fiscal signing"
        >
          <ArrowDefs />

          <Caption x={16} y={24} delay="d1">
            ORDER #4182 · STORE DE-02 · TAKEAWAY
          </Caption>

          {/* ---- Row 1 ---- */}
          {row1.map((state, i) => (
            <g key={state} className={`ex-step d${i + 1}`}>
              <rect
                x={16 + i * (cellW + gap)}
                y={rowY1}
                width={cellW}
                height={30}
                rx="3"
                className={i === 1 ? "ex-box-accent" : "ex-box"}
              />
              <text
                className="ex-mono-strong ex-mid"
                x={16 + i * (cellW + gap) + cellW / 2}
                y={rowY1 + 19}
              >
                {state}
              </text>
            </g>
          ))}

          {/* Track the token walks along row 1 */}
          <path
            className="ex-wire"
            d={`M 16,${trackY1} H ${16 + 5 * (cellW + gap) - gap}`}
            opacity="0"
          />
          <Packet
            path={`M 24,${trackY1} H ${16 + 4 * (cellW + gap) + cellW - 8}`}
            dur={3.4}
            radius={4}
            enabled={motion}
          />

          {/* Wrap from end of row 1 to start of row 2 */}
          <path
            className="ex-wire-soft"
            d={`M ${16 + 4 * (cellW + gap) + cellW},${trackY1} q 22,0 22,26 v 12 q 0,26 -26,26 H 38`}
            markerEnd="url(#ex-arrow)"
          />

          {/* ---- Row 2 ---- */}
          {row2.map((state, i) => (
            <g key={state} className={`ex-step d${i + 6}`}>
              <rect
                x={16 + i * (cellW + gap)}
                y={rowY2}
                width={cellW}
                height={30}
                rx="3"
                className="ex-box"
              />
              <text
                className="ex-mono-strong ex-mid"
                x={16 + i * (cellW + gap) + cellW / 2}
                y={rowY2 + 19}
              >
                {state}
              </text>
            </g>
          ))}

          <Packet
            path={`M 24,${trackY2} H ${16 + 4 * (cellW + gap) + cellW - 8}`}
            dur={3.4}
            begin={3.4}
            radius={4}
            tone="live"
            enabled={motion}
          />

          {/* Terminal branch */}
          <g className="ex-step d11">
            <rect
              x={16}
              y={228}
              width={cellW}
              height={28}
              rx="3"
              className="ex-box-dashed"
            />
            <text className="ex-mono ex-mid ex-text-warn" x={16 + cellW / 2} y={246}>
              CANCELLED
            </text>
          </g>
          <path
            className="ex-wire-soft ex-stroke-warn"
            d={`M ${16 + cellW / 2},${rowY1 + 30} V 228`}
            strokeDasharray="3 3"
          />

          {/* ---- Tax context resolving underneath ---- */}
          <g className="ex-step d12">
            <rect x={200} y={222} width={504} height={54} rx="3" className="ex-box-sunk" />
            <text className="ex-label" x={216} y={240}>
              RESOLVED PER ORDER
            </text>
            <text className="ex-mono-strong" x={216} y={260}>
              VAT · DE 7% takeaway food
            </text>
            <text className="ex-mono" x={430} y={260}>
              12 markets · DINE_IN / TAKEAWAY / DELIVERY
            </text>
            <text className="ex-mono" x={216} y={272}>
              fiscal signature at COMPLETED · DE FR IT BE HU GB
            </text>
          </g>
        </svg>
      )}
    </ExplainerFrame>
  );
}
