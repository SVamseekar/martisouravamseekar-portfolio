"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { ArrowDefs, Caption, NodeBox, Packet } from "./parts";

/**
 * EU AI Assurance OS — a release meeting the gate.
 *
 * The moment worth showing is the refusal: a release arrives from CI, the gate
 * checks it against the obligations for its risk class, and stops it with the
 * reason attached. The rejected packet turning back at the gate is the whole
 * product in one movement.
 */
export function ReleaseGateExplainer() {
  const checks = [
    { label: "technical documentation", ok: true },
    { label: "data governance", ok: true },
    { label: "logging & traceability", ok: true },
    { label: "human oversight evidence", ok: false },
  ];

  return (
    <ExplainerFrame
      kicker="Release gate"
      caption="A release reaches the gate, is classified high risk, and is stopped on the one obligation it cannot evidence — with the decision sealed alongside it."
      description="A deployment pipeline sends release v2.4 to the assurance gate. The gate classifies it as high risk and checks four obligations: technical documentation, data governance, and logging and traceability all pass; human oversight evidence is missing. The gate returns BLOCKED. Cited evidence is retrieved from a pgvector index, and the decision plus its evidence is sealed into an evidence pack and appended to a hash-chained ledger."
    >
      {({ motion }) => (
        <svg
          viewBox="0 0 720 350"
          className="explainer-svg"
          role="img"
          aria-label="Release gate blocking a high-risk model deployment"
        >
          <ArrowDefs />
          <defs>
            <marker
              id="ex-arrow-warn"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="5.5"
              markerHeight="5.5"
              orient="auto"
            >
              <path
                d="M0,1 L9,5 L0,9"
                fill="none"
                stroke="var(--blocked)"
                strokeWidth="1.8"
              />
            </marker>
          </defs>

          {/* ---- CI sends a release ---- */}
          <Caption x={16} y={24} delay="d1">
            CI PIPELINE
          </Caption>
          <NodeBox
            x={16}
            y={118}
            w={116}
            h={48}
            title="ship v2.4"
            meta="POST /gate"
            delay="d1"
          />

          <path className="ex-wire ex-flow" d="M 132,142 H 202" markerEnd="url(#ex-arrow)" />
          <Packet path="M 132,142 H 200" dur={1.4} enabled={motion} />

          {/* ---- The gate ---- */}
          <g className="ex-step d2">
            <rect x={210} y={54} width={224} height={182} rx="3" className="ex-box" />
            <text className="ex-label" x={228} y={78}>
              ASSURANCE GATE
            </text>
            <text className="ex-mono-strong" x={228} y={102}>
              risk class · HIGH
            </text>
          </g>

          {/* Obligations resolve one at a time */}
          {checks.map((check, i) => (
            <g key={check.label} className={`ex-step d${3 + i}`}>
              <text
                className={check.ok ? "ex-ok" : "ex-fail"}
                x={228}
                y={130 + i * 24}
              >
                {check.ok ? "✓" : "✕"}
              </text>
              <text
                className={check.ok ? "ex-text" : "ex-text ex-text-warn"}
                x={248}
                y={130 + i * 24}
              >
                {check.label}
              </text>
            </g>
          ))}

          {/* Evidence retrieval feeding the decision */}
          <NodeBox
            x={210}
            y={250}
            w={224}
            h={34}
            title="cited evidence"
            meta="pgvector HNSW · ONNX"
            variant="sunk"
            pulse
            phase="p2"
            delay="d7"
          />
          <path className="ex-wire-soft" d="M 322,250 V 236" markerEnd="url(#ex-arrow)" />

          {/* ---- Verdict ---- */}
          <path className="ex-wire ex-flow" d="M 434,142 H 494" markerEnd="url(#ex-arrow)" />
          <Packet path="M 434,142 H 492" dur={1.2} begin={1.6} tone="warn" enabled={motion} />

          <g className="ex-step d8">
            <rect x={502} y={112} width={132} height={60} rx="3" className="ex-verdict" />
            <text className="ex-verdict-text" x={568} y={141}>
              BLOCKED
            </text>
            <text className="ex-mono ex-mid" x={568} y={159}>
              1 obligation unmet
            </text>
          </g>

          {/* The release is turned back */}
          <path
            className="ex-reject"
            d="M 568,178 v 122 q 0,12 -12,12 H 86 q -12,0 -12,-12 V 172"
            markerEnd="url(#ex-arrow-warn)"
          />
          <text className="ex-reject-label ex-mid ex-step d9" x={300} y={330}>
            ✕ shipping blocked — returned with the reason attached
          </text>
          <Packet
            path="M 568,178 v 122 q 0,12 -12,12 H 86 q -12,0 -12,-12 V 176"
            dur={2.4}
            begin={2.2}
            radius={4.5}
            tone="warn"
            enabled={motion}
          />

          {/* ---- Sealed record ---- */}
          <path className="ex-wire ex-flow" d="M 568,172 V 254" markerEnd="url(#ex-arrow)" />
          <Packet path="M 568,176 V 252" dur={1} begin={3.4} tone="warn" enabled={motion} />

          <g className="ex-step d10">
            <rect x={470} y={258} width={234} height={40} rx="3" className="ex-box-sunk" />
            <text className="ex-mono-strong ex-mid" x={587} y={276}>
              evidence pack sealed
            </text>
            <text className="ex-mono ex-mid" x={587} y={290}>
              sha256·a91f… → append-only ledger
            </text>
          </g>
        </svg>
      )}
    </ExplainerFrame>
  );
}
