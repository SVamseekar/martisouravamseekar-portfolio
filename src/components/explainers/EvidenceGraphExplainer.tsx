"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { Boundary, Defs, GraphNode, Label, Node, Route } from "./parts";

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
  // Laid out as a diamond with the labels above each dot, so an edge between
  // two nodes never passes through a third node's text.
  const card = { x: 530, y: 102 };
  const appr = { x: 660, y: 158 };
  const depl = { x: 530, y: 214 };
  const run = { x: 400, y: 158 };

  const artY = (i: number) => 62 + i * 46;

  return (
    <ExplainerFrame
      kicker="Scan"
      caption="Loose artifacts become one graph. A missing approval stays inconclusive. Assurance OS pins this same 0.1.2 scan in the evidence pack."
      description="Four adapters read a model card, an approval record, a deployment record and an MLflow registry entry, and assemble them into a single evidence graph. Rules traverse the graph: the model card links to its approval, and the MLflow run links to the deployment. The deployment has no linked approval, so a rule emits a finding at structural certainty citing deployment.json. Certainty runs from structural through consistency and heuristic to interpretive, and is only ever lowered as reasoning becomes less certain, never raised."
    >
      {({ motion }) => (
        <svg
          viewBox="0 0 720 340"
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
          {artifacts.map((artifact, i) => (
            <Route
              key={`read-${artifact}`}
              d={`M 182,${artY(i) + 17} H 210 V 158 H 232`}
              head={i === 1}
              motion={motion}
              dur={1.8}
              begin={i * 0.4}
            />
          ))}

          <Node
            x={232}
            y={135}
            w={104}
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
          <Boundary x={362} y={68} w={334} h={182} label="Evidence graph" step="s6" />

          {/* Edges that exist — the rule walks each of them. */}
          <Route
            d={`M ${run.x},${run.y} L ${card.x},${card.y}`}
            head={false}
            motion={motion}
            dur={1.5}
            begin={1.6}
          />
          <Route
            d={`M ${card.x},${card.y} L ${appr.x},${appr.y}`}
            head={false}
            motion={motion}
            dur={1.5}
            begin={2.2}
          />
          <Route
            d={`M ${run.x},${run.y} L ${depl.x},${depl.y}`}
            head={false}
            motion={motion}
            dur={1.5}
            begin={2.8}
          />

          {/* The edge the rule expects and cannot find. */}
          <Route
            d={`M ${appr.x},${appr.y} L ${depl.x},${depl.y}`}
            kind="rejected"
            head={false}
            motion={motion}
            dur={1.6}
            begin={3.4}
          />
          <text className="dg-note dg-text-warn dg-in s9" x={600} y={202}>
            no link
          </text>

          <GraphNode x={card.x} y={card.y} label="model card" step="s6" anchor="middle" />
          <GraphNode x={appr.x} y={appr.y} label="approval" step="s7" anchor="middle" />
          <GraphNode x={depl.x} y={depl.y} label="deployment" step="s8" anchor="middle" />
          <GraphNode x={run.x} y={run.y} label="mlflow run" step="s7" anchor="middle" />

          <Route
            d={`M 336,158 H ${run.x - 16}`}
            motion={motion}
            dur={1.1}
            begin={1.2}
          />

          {/* ---- Finding ---- */}
          <Boundary x={262} y={256} w={434} h={62} label="Finding" step="s10" />
          <text className="dg-note-strong dg-text-signal dg-in s10" x={280} y={292}>
            STRUCTURAL
          </text>
          <text className="dg-note-strong dg-in s10" x={372} y={292}>
            deployment has no linked approval
          </text>
          <text className="dg-note dg-in s11" x={280} y={310}>
            cited · deployment.json → approval
          </text>

          {/* ---- Certainty ladder ---- */}
          <Label x={24} y={272} step="s11">
            Certainty
          </Label>
          <text className="dg-note dg-in s11" x={24} y={294}>
            structural → consistency
          </text>
          <text className="dg-note dg-in s12" x={24} y={310}>
            → heuristic → interpretive
          </text>
        </svg>
      )}
    </ExplainerFrame>
  );
}
