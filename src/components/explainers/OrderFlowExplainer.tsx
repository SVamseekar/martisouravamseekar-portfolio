"use client";

import { ExplainerFrame } from "./ExplainerFrame";

/**
 * MaSoVa — one order at rush hour.
 *
 * The operator's pain is four tablets and four sets of rules. The diagram
 * shows the convergence — many channels into one queue — then the fan-out
 * that follows a single state change, with tax decided by context rather
 * than by whoever is standing at the till.
 */
export function OrderFlowExplainer() {
  const channels = [
    { label: "Wolt", y: 40 },
    { label: "Deliveroo", y: 82 },
    { label: "Uber Eats", y: 124 },
    { label: "own storefront", y: 166 },
  ];

  const fanout = [
    { label: "kitchen display", y: 62, note: "per-item timers" },
    { label: "driver app", y: 124, note: "assignment + OTP" },
    { label: "customer", y: 186, note: "live status" },
  ];

  return (
    <ExplainerFrame
      caption="Four channels, one queue. Each state change fans out to the kitchen, the driver and the customer at once."
      description="Orders from Wolt, Deliveroo, Uber Eats and the restaurant's own storefront are normalised into a single queue. Each order moves through an eleven-state lifecycle, and every transition publishes an event that reaches the kitchen display, the driver app and the customer simultaneously. VAT is resolved from country, order type and item category across twelve markets, with fiscal signing applied at completion where required."
    >
      <svg
        viewBox="0 0 720 300"
        className="explainer-svg"
        role="img"
        aria-label="Orders from multiple channels converging into one kitchen queue"
      >
        <text className="gx-label mv-d1" x="16" y="22">CHANNELS</text>

        {/* ---- Many in ---- */}
        {channels.map((channel, i) => (
          <g key={channel.label} className={`mv-chan mv-d${i + 1}`}>
            <rect x="16" y={channel.y} width="118" height="30" rx="3" />
            <text className="gx-sub" x="30" y={channel.y + 20}>
              {channel.label}
            </text>
            <path
              className="mv-wire"
              d={`M138 ${channel.y + 15} Q 176 ${channel.y + 15} 190 118`}
            />
          </g>
        ))}

        {/* ---- One queue ---- */}
        <g className="mv-queue mv-d5">
          <rect x="196" y="70" width="150" height="98" rx="3" />
          <text className="gx-label" x="212" y="92">ONE QUEUE</text>
          <text className="mv-state" x="212" y="120">
            #4182 · PREPARING
          </text>
          <text className="gx-hash" x="212" y="140">
            state 4 of 11
          </text>
          <text className="gx-hash" x="212" y="157">
            vat · DE 7% takeaway
          </text>
        </g>

        {/* ---- Fan-out on a single transition ---- */}
        {fanout.map((target, i) => (
          <g key={target.label} className={`mv-out mv-d${6 + i}`}>
            <path
              className="mv-wire"
              d={`M350 119 Q 400 119 424 ${target.y + 16}`}
            />
            <rect x="430" y={target.y} width="176" height="34" rx="3" />
            <text className="gx-sub" x="446" y={target.y + 15}>
              {target.label}
            </text>
            <text className="gx-hash" x="446" y={target.y + 28}>
              {target.note}
            </text>
          </g>
        ))}

        {/* ---- What is written down, and in what order ---- */}
        <g className="mv-persist mv-d9">
          <text className="gx-hash" x="196" y="216">
            postgres committed first · mongo follows · fiscal signature at completion
          </text>
        </g>
      </svg>
    </ExplainerFrame>
  );
}
