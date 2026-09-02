"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { Boundary, Defs, Edge, GraphNode, Label, Node, Packet } from "./parts";

/**
 * Evgraph — a graph system, drawn as a graph.
 *
 * Loose artifacts on the left, a connected graph on the right, and a rule
 * traversing it. The missing edge uses the rejected line because that is what
 * the scan is looking for: an expectation the evidence does not meet.
 */
export function EvidenceGraphExplainer() {
  const artifacts = [
    "model_card.json",
    "approval.json",
    "deployment.json",
    "mlflow registry",
  ];

  // Graph layout — a real shape, not a row of boxes.
  const card = { x: 430, y: 92 };
  const appr = { x: 600, y: 66 };
  const depl = { x: 600, y: 176 };
  const run = { x: 430, y: 200 };

  const artY = (i: number) => 62 + i * 46;

  return (
    <ExplainerFrame
      kicker="Scan"
      caption="Loose artifacts become one graph. Rules walk it and report what they find — including the link that should exist and does not."
      description="Four adapters read a model card, an approval record, a deployment record and an MLflow registry entry, and assemble them into a single evidence graph. Rules traverse the graph: the model card links to its approval, and the MLflow run links to the deployment. The deployment has no linked approval, so a rule emits a finding at structural certainty citing deployment.json. Certainty runs from structural through consistency and heuristic to interpretive, and is only ever lowered as reasoning becomes less certain, never raised."
    >
      {({ motion }) => (
        <svg
          viewBox="0 0 720 330"
          className="explainer-svg"
          role="img"
          aria-label="Adapters assembling an evidence graph, with a rule finding a missing link"
        >
          <Defs />

          {/* ---- Loose artifacts ---- */}
          <Label x={24} y={40} step="s1">
            What you already have
          </Label>
          {artifacts.map((artifact, i) => (
            <Node
              key={artifact}
              x={24}
              y={artY(i)}
              w={158}
              h={34}
              label={artifact}
              kind="external"
              step={`s${i + 1}`}
            />
          ))}

          {/* Adapters read them into the builder. */}
          {artifacts.map((_, i) => {
            const d = `M 182,${artY(i) + 17} H 224 V 148 H 262`;
            return (
              <g key={`read-${i}`}>
                <Edge d={d} kind="sync" head={i === 1} flow={i === 1} />
                <Packet path={d} dur={1.8} begin={i * 0.45} enabled={motion} />
              </g>
            );
          })}

          <Node
            x={262}
            y={125}
            w={110}
            h={46}
            label="Adapters"
            detail="build graph"
            kind="service"
            state="active"
            active
            step="s5"
            centre
          />

          {/* ---- The graph ---- */}
          <Boundary x={396} y={40} w={300} h={190} label="Evidence graph" step="s6" />

          {/* Edges that exist. */}
          <Edge d={`M ${card.x},${card.y} L ${appr.x},${appr.y}`} kind="sync" head={false} />
          <Edge d={`M ${card.x},${card.y} L ${run.x},${run.y}`} kind="sync" head={false} />
          <Edge d={`M ${run.x},${run.y} L ${depl.x},${depl.y}`} kind="sync" head={false} />

          {/* The edge the rule expects and cannot find. */}
          <Edge d={`M ${appr.x},${appr.y + 12} L ${depl.x},${depl.y - 12}`} kind="rejected" head={false} />
          <text className="dg-note dg-text-warn dg-in s9" x={614} y={126}>
            no link
          </text>

          <GraphNode x={card.x} y={card.y} label="model card" step="s6" />
          <GraphNode x={appr.x} y={appr.y} label="approval" step="s7" anchor="end" />
          <GraphNode x={depl.x} y={depl.y} label="deployment" step="s8" anchor="end" />
          <GraphNode x={run.x} y={run.y} label="mlflow run" step="s7" />

          {/* Edge into the graph, and the rule walking it. */}
          <Edge d={`M 372,148 H ${card.x - 10}`} kind="sync" flow />
          <Packet path={`M 372,148 H ${card.x - 10}`} dur={1.1} begin={1.4} enabled={motion} />
          <Packet
            path={`M ${card.x},${card.y} L ${appr.x},${appr.y}`}
            dur={1.3}
            begin={2}
            enabled={motion}
          />
          <Packet
            path={`M ${card.x},${card.y} L ${run.x},${run.y} L ${depl.x},${depl.y}`}
            dur={2}
            begin={2.4}
            enabled={motion}
          />
          <Packet
            path={`M ${appr.x},${appr.y + 12} L ${depl.x},${depl.y - 12}`}
            dur={1.2}
            begin={3.6}
            tone="warn"
            enabled={motion}
          />

          {/* ---- Finding ---- */}
          <Boundary x={262} y={248} w={434} h={62} label="Finding" step="s10" />
          <text className="dg-note-strong dg-text-signal dg-in s10" x={280} y={284}>
            STRUCTURAL
          </text>
          <text className="dg-note-strong dg-in s10" x={372} y={284}>
            deployment has no linked approval
          </text>
          <text className="dg-note dg-in s11" x={280} y={302}>
            cited · deployment.json → approval
          </text>

          {/* ---- Certainty ladder ---- */}
          <Label x={24} y={264} step="s11">
            Certainty
          </Label>
          <text className="dg-note dg-in s11" x={24} y={286}>
            structural → consistency
          </text>
          <text className="dg-note dg-in s12" x={24} y={302}>
            → heuristic → interpretive
          </text>
        </svg>
      )}
    </ExplainerFrame>
  );
}
