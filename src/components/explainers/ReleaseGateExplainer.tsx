"use client";

import { ExplainerFrame } from "./ExplainerFrame";

/**
 * EU AI Assurance OS — what a team sees when they try to ship.
 *
 * The moment worth showing is the refusal: a release reaches the gate, the
 * gate checks it against the obligations for its risk class, and stops it
 * with the reason attached. Blocking is the product's whole value, so the
 * BLOCKED state is the visual climax rather than something hidden in a list.
 */
export function ReleaseGateExplainer() {
  return (
    <ExplainerFrame
      caption="A release meets the gate. High-risk obligations are unmet, so it is stopped — and the reason is sealed with it."
      description="A deployment pipeline sends a model release to the assurance gate. The gate classifies it as high risk, checks four obligations, finds human oversight evidence missing, and returns BLOCKED. The decision and its cited evidence are sealed into an evidence pack and appended to a tamper-evident ledger."
    >
      <svg
        viewBox="0 0 720 300"
        className="explainer-svg"
        role="img"
        aria-label="Release gate blocking a high-risk model deployment"
      >
        <defs>
          <marker
            id="gate-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path d="M0,1 L9,5 L0,9" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </marker>
        </defs>

        {/* ---- Stage 1: the release leaves CI ---- */}
        <g className="gx-node gx-d1">
          <rect x="8" y="118" width="118" height="52" rx="3" />
          <text className="gx-title" x="24" y="141">
            ship v2.4
          </text>
          <text className="gx-sub" x="24" y="158">
            from CI
          </text>
        </g>

        <path
          className="gx-wire gx-d2"
          d="M132 144 H206"
          markerEnd="url(#gate-arrow)"
        />

        {/* ---- Stage 2: the gate, and what it checks ---- */}
        <g className="gx-node gx-gate gx-d3">
          <rect x="214" y="60" width="188" height="170" rx="3" />
          <text className="gx-label" x="232" y="86">
            ASSURANCE GATE
          </text>

          <text className="gx-risk gx-d4" x="232" y="112">
            risk class · HIGH
          </text>

          {/* Each obligation resolves in turn; the last one fails. */}
          <g className="gx-check gx-d5">
            <text className="gx-tick" x="232" y="140">✓</text>
            <text className="gx-item" x="252" y="140">technical documentation</text>
          </g>
          <g className="gx-check gx-d6">
            <text className="gx-tick" x="232" y="162">✓</text>
            <text className="gx-item" x="252" y="162">data governance</text>
          </g>
          <g className="gx-check gx-d7">
            <text className="gx-tick" x="232" y="184">✓</text>
            <text className="gx-item" x="252" y="184">logging &amp; traceability</text>
          </g>
          <g className="gx-check gx-fail gx-d8">
            <text className="gx-cross" x="232" y="206">✕</text>
            <text className="gx-item" x="252" y="206">human oversight evidence</text>
          </g>
        </g>

        <path
          className="gx-wire gx-d9"
          d="M408 144 H478"
          markerEnd="url(#gate-arrow)"
        />

        {/* ---- Stage 3: the verdict ---- */}
        <g className="gx-node gx-verdict gx-d10">
          <rect x="486" y="112" width="126" height="64" rx="3" />
          <text className="gx-blocked" x="549" y="141">
            BLOCKED
          </text>
          <text className="gx-sub gx-centred" x="549" y="160">
            1 obligation unmet
          </text>
        </g>

        {/* ---- Stage 4: sealed into the record ---- */}
        <path className="gx-wire gx-d11" d="M549 182 V214" markerEnd="url(#gate-arrow)" />
        <g className="gx-node gx-seal gx-d12">
          <rect x="470" y="222" width="158" height="46" rx="3" />
          <text className="gx-sub gx-centred" x="549" y="243">
            evidence pack sealed
          </text>
          <text className="gx-hash gx-centred" x="549" y="259">
            sha256·a91f… → ledger
          </text>
        </g>
      </svg>
    </ExplainerFrame>
  );
}
