"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { Boundary, Defs, Label, Node, Route } from "./parts";

/**
 * EU AI Assurance OS — one release, one decision.
 *
 * The route is the product: system, pinned corpus, queued proposal, then
 * evidence, eval, contract, and the pinned Evgraph 0.1.2 scan. Those meet
 * at one shared gap. The gap feeds PASS, REVIEW, or BLOCKED. Motion follows
 * that order.
 */
export function ReleaseGateExplainer() {
  const inputs = [
    { label: "System", detail: "owner · purpose", x: 16 },
    { label: "Pinned corpus", detail: "risk class", x: 188 },
    { label: "Queued proposal", detail: "person accepts", x: 360 },
  ];

  const checks = [
    { label: "Evidence", detail: "cited", x: 16 },
    { label: "Eval", detail: "score", x: 188 },
    { label: "Contract", detail: "open BREACH", x: 360 },
    { label: "Evgraph 0.1.2", detail: "pinned scan", x: 532 },
  ];

  const decisions = [
    { label: "PASS", detail: "INFORMATIONAL", x: 16, state: "verified" as const },
    { label: "REVIEW", detail: "WARNING · APPROVAL_REQUIRED", x: 252, state: "active" as const },
    { label: "BLOCKED", detail: "BLOCKING", x: 488, state: "warn" as const },
  ];

  return (
    <ExplainerFrame
      kicker="Release gate"
      caption="A system is classified against a pinned corpus. Mapping proposals wait for a person. The pack and an Evgraph 0.1.2 scan share one gap, then the gate returns PASS, REVIEW, or BLOCKED."
      description="The system enters with its owner and purpose. Risk is classified against a pinned legal corpus. Control mappings stay in a queue until a person accepts them. Cited evidence, the eval score, an open contract breach, and a pinned Evgraph 0.1.2 scan then meet at one shared gap. In-force controls apply INFORMATIONAL, WARNING, APPROVAL_REQUIRED, or BLOCKING. The gate returns PASS, REVIEW, or BLOCKED. It does not certify the system."
    >
      {({ motion }) => (
        <svg
          viewBox="0 0 720 400"
          className="explainer-svg"
          role="img"
          aria-label="Release flow from system and pinned corpus through a queued proposal, evidence, eval, contract, and Evgraph 0.1.2 scan to a shared gap and PASS, REVIEW, or BLOCKED"
        >
          <Defs />

          <Label x={16} y={28} step="s1">
            Classify, then queue
          </Label>
          {inputs.map((item, i) => (
            <Node
              key={item.label}
              x={item.x}
              y={40}
              w={156}
              h={44}
              label={item.label}
              detail={item.detail}
              kind={i === 0 ? "external" : "service"}
              step={`s${i + 1}`}
            />
          ))}
          <Route d="M 172,62 H 188" motion={motion} dur={1.1} />
          <Route d="M 344,62 H 360" motion={motion} dur={1.1} begin={0.4} />

          <Route d="M 438,84 V 118 H 360" motion={motion} dur={1.2} begin={0.8} />

          <Label x={16} y={128} step="s4">
            What the gate reads
          </Label>
          {checks.map((item, i) => (
            <Node
              key={item.label}
              x={item.x}
              y={140}
              w={156}
              h={44}
              label={item.label}
              detail={item.detail}
              kind="store"
              step={`s${i + 4}`}
            />
          ))}
          <Route d="M 94,184 V 214 H 360" motion={motion} dur={1.2} begin={1.2} />
          <Route d="M 266,184 V 214 H 360" motion={motion} dur={1.2} begin={1.4} />
          <Route d="M 438,184 V 214 H 360" motion={motion} dur={1.2} begin={1.6} />
          <Route d="M 610,184 V 214 H 360" motion={motion} dur={1.2} begin={1.8} />

          <Boundary x={248} y={214} w={224} h={52} label="Shared gap" step="s8" />
          <text className="dg-note dg-in s8" x={360} y={246} textAnchor="middle">
            pack = live 0.1.2 scan
          </text>

          <Route d="M 360,266 V 292" motion={motion} dur={0.9} begin={2.4} />

          <Label x={16} y={300} step="s9">
            Control mode, then decision
          </Label>
          {decisions.map((item, i) => (
            <g key={item.label}>
              <Route
                d={`M 360,292 H ${item.x + 78} V 318`}
                motion={motion}
                dur={1.1}
                begin={2.6 + i * 0.2}
                kind={item.label === "BLOCKED" ? "rejected" : undefined}
                tone={item.label === "PASS" ? "live" : undefined}
              />
              <Node
                x={item.x}
                y={318}
                w={200}
                h={48}
                label={item.label}
                detail={item.detail}
                kind="gate"
                state={item.state}
                step={`s${9 + i}`}
                centre
              />
            </g>
          ))}
        </svg>
      )}
    </ExplainerFrame>
  );
}
