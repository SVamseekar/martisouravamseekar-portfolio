"use client";

import { ExplainerFrame } from "./ExplainerFrame";

/**
 * Evgraph — the reviewer's problem, solved visually.
 *
 * Before: four unrelated files. After: one graph where a claim is connected
 * to the approval that should support it, and the missing link is visible as
 * a gap rather than something you notice by reading carefully.
 *
 * The certainty ladder is the distinctive idea worth showing — findings never
 * claim more than their evidence supports.
 */
export function EvidenceGraphExplainer() {
  const artifacts = [
    { label: "model card", x: 40, y: 44 },
    { label: "approval", x: 40, y: 108 },
    { label: "deployment", x: 40, y: 172 },
    { label: "mlflow run", x: 40, y: 236 },
  ];

  // Where each artifact lands once the graph assembles.
  const nodes = [
    { id: "card", label: "model card", x: 300, y: 70 },
    { id: "appr", label: "approval", x: 452, y: 44 },
    { id: "depl", label: "deployment", x: 452, y: 150 },
    { id: "run", label: "mlflow run", x: 300, y: 196 },
  ];

  return (
    <ExplainerFrame
      caption="Loose artifacts become one graph. Rules read the graph and cite what they found — including what is missing."
      description="Four unconnected files — a model card, an approval, a deployment record and an MLflow run — are read by adapters and assembled into a single evidence graph. Rules traverse the graph and emit findings with citations. One edge is missing: the deployment has no linked approval, which is reported as a finding at structural certainty."
    >
      <svg
        viewBox="0 0 720 300"
        className="explainer-svg"
        role="img"
        aria-label="Scattered governance artifacts assembling into an evidence graph"
      >
        {/* ---- Before: unconnected files ---- */}
        <text className="gx-label eg-d1" x="40" y="24">SCATTERED</text>
        {artifacts.map((a, i) => (
          <g key={a.label} className={`eg-loose eg-d${i + 1}`}>
            <rect x={a.x} y={a.y} width="112" height="34" rx="3" />
            <text className="gx-sub" x={a.x + 14} y={a.y + 22}>
              {a.label}
            </text>
          </g>
        ))}

        {/* ---- The assembly ---- */}
        <path className="gx-wire eg-d5" d="M166 140 H236" />
        <text className="gx-label eg-d5" x="176" y="130">READ</text>

        {/* ---- After: one connected graph ---- */}
        <text className="gx-label eg-d6" x="286" y="24">EVIDENCE GRAPH</text>

        {/* Edges that exist */}
        <line className="eg-edge eg-d7" x1="352" y1="70" x2="452" y2="52" />
        <line className="eg-edge eg-d7" x1="330" y1="88" x2="316" y2="180" />
        <line className="eg-edge eg-d8" x1="340" y1="196" x2="452" y2="158" />

        {/* The edge that should be there and is not */}
        <line className="eg-edge eg-missing eg-d9" x1="480" y1="70" x2="480" y2="136" />
        <text className="eg-gap eg-d9" x="492" y="108">no link</text>

        {nodes.map((n, i) => (
          <g key={n.id} className={`eg-node eg-d${6 + i}`}>
            <circle cx={n.x} cy={n.y} r="7" />
            <text className="gx-sub" x={n.x + 14} y={n.y + 4}>
              {n.label}
            </text>
          </g>
        ))}

        {/* ---- The finding, with its certainty ---- */}
        <g className="eg-finding eg-d10">
          <rect x="286" y="228" width="392" height="52" rx="3" />
          <text className="eg-level" x="302" y="250">STRUCTURAL</text>
          <text className="gx-sub" x="382" y="250">
            deployment has no linked approval
          </text>
          <text className="gx-hash" x="302" y="268">
            cited · deployment.json → approval — expectation not met
          </text>
        </g>
      </svg>
    </ExplainerFrame>
  );
}
