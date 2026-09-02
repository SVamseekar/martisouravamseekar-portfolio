"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { ArrowDefs, Caption, NodeBox, Packet } from "./parts";

/**
 * Evgraph — adapters read, the graph assembles, rules traverse it.
 *
 * The motion is the rule walking the graph: a token moves adapter → node →
 * node and stops at the edge that should exist and does not. The certainty
 * ladder is shown because a finding that overclaims is the failure mode this
 * library exists to avoid.
 */
export function EvidenceGraphExplainer() {
  const adapters = [
    { title: "model_card.json", y: 44 },
    { title: "approval.json", y: 86 },
    { title: "deployment.json", y: 128 },
    { title: "mlflow registry", y: 170 },
  ];

  // Graph node positions.
  const card = { x: 402, y: 76 };
  const appr = { x: 556, y: 52 };
  const depl = { x: 556, y: 150 };
  const run = { x: 402, y: 178 };

  return (
    <ExplainerFrame
      kicker="Scan"
      caption="Adapters read what you already have, the graph assembles, then rules walk it — and report the edge that should be there and is not."
      description="Four adapters read a model card, an approval record, a deployment record and an MLflow registry entry, and build a single evidence graph. Rules traverse the graph: the model card links to its approval, and the MLflow run links to the deployment. The deployment has no linked approval, so a rule emits a finding at STRUCTURAL certainty citing deployment.json. Certainty levels run from STRUCTURAL through CONSISTENCY and HEURISTIC to INTERPRETIVE, and are only ever lowered as reasoning gets less certain, never raised. Findings are emitted as JSON, Markdown, SARIF or OSCAL."
    >
      {({ motion }) => (
        <svg
          viewBox="0 0 720 300"
          className="explainer-svg"
          role="img"
          aria-label="Adapters building an evidence graph and a rule finding a missing link"
        >
          <ArrowDefs />

          {/* ---- Adapters ---- */}
          <Caption x={16} y={26} delay="d1">
            ADAPTERS
          </Caption>
          {adapters.map((adapter, i) => (
            <NodeBox
              key={adapter.title}
              x={16}
              y={adapter.y}
              w={150}
              h={32}
              title={adapter.title}
              variant="dashed"
              delay={`d${i + 1}`}
            />
          ))}

          {/* Read into the graph */}
          <path className="ex-wire ex-flow" d="M 166,60 Q 236,60 236,112" />
          <path className="ex-wire ex-flow" d="M 166,102 Q 236,102 236,112" />
          <path className="ex-wire ex-flow" d="M 166,144 Q 236,144 236,112" />
          <path className="ex-wire ex-flow" d="M 166,186 Q 236,186 236,112" />
          <path className="ex-wire" d="M 236,112 H 286" markerEnd="url(#ex-arrow)" />

          <Packet path="M 166,60 Q 236,60 236,112 L 284,112" dur={2} enabled={motion} />
          <Packet path="M 166,186 Q 236,186 236,112 L 284,112" dur={2} begin={1} enabled={motion} />

          <NodeBox
            x={294}
            y={92}
            w={72}
            h={40}
            title="build"
            meta="graph"
            variant="accent"
            pulse
            delay="d5"
          />

          {/* ---- The graph ---- */}
          <Caption x={392} y={26} delay="d6">
            EVIDENCE GRAPH
          </Caption>

          {/* Edges that exist */}
          <line className="ex-wire ex-step d7" x1={card.x} y1={card.y} x2={appr.x} y2={appr.y} />
          <line className="ex-wire ex-step d7" x1={card.x} y1={card.y} x2={run.x} y2={run.y} />
          <line className="ex-wire ex-step d8" x1={run.x} y1={run.y} x2={depl.x} y2={depl.y} />

          {/* The edge that should exist and does not */}
          <line
            className="ex-wire ex-stroke-warn ex-step d9"
            x1={appr.x}
            y1={appr.y + 10}
            x2={depl.x}
            y2={depl.y - 10}
            strokeDasharray="4 4"
          />
          <text className="ex-mono ex-text-warn ex-step d9" x={570} y={106}>
            no link
          </text>

          {/* Nodes */}
          {[
            { ...card, label: "model card", d: "d6" },
            { ...appr, label: "approval", d: "d7" },
            { ...depl, label: "deployment", d: "d8" },
            { ...run, label: "mlflow run", d: "d7" },
          ].map((node) => (
            <g key={node.label} className={`ex-pop ${node.d}`}>
              <circle cx={node.x} cy={node.y} r="6.5" className="ex-signal" />
              <text className="ex-text" x={node.x + 13} y={node.y + 4}>
                {node.label}
              </text>
            </g>
          ))}

          {/* The rule walking the graph */}
          <Packet
            path={`M ${card.x},${card.y} L ${appr.x},${appr.y}`}
            dur={1.4}
            begin={2}
            enabled={motion}
          />
          <Packet
            path={`M ${card.x},${card.y} L ${run.x},${run.y} L ${depl.x},${depl.y}`}
            dur={2.2}
            begin={2.6}
            enabled={motion}
          />
          <Packet
            path={`M ${appr.x},${appr.y + 10} L ${depl.x},${depl.y - 10}`}
            dur={1.2}
            begin={4}
            tone="warn"
            enabled={motion}
          />

          {/* ---- Finding, with its certainty ---- */}
          <g className="ex-step d10">
            <rect x={294} y={216} width={410} height={54} rx="3" className="ex-box-sunk" />
            <text className="ex-label" x={310} y={236} style={{ fill: "var(--signal)" }}>
              STRUCTURAL
            </text>
            <text className="ex-text" x={392} y={236}>
              deployment has no linked approval
            </text>
            <text className="ex-mono" x={310} y={256}>
              cited · deployment.json → approval — expectation not met
            </text>
          </g>

          {/* Certainty ladder */}
          <g className="ex-step d11">
            <text className="ex-label" x={16} y={236}>
              CERTAINTY
            </text>
            <text className="ex-mono" x={16} y={252}>
              STRUCTURAL
            </text>
            <text className="ex-mono" x={16} y={266}>
              ↓ CONSISTENCY
            </text>
            <text className="ex-mono" x={16} y={280}>
              ↓ HEURISTIC ↓ INTERPRETIVE
            </text>
          </g>
        </svg>
      )}
    </ExplainerFrame>
  );
}
