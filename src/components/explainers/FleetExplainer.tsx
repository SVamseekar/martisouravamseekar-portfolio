"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { Defs, Label, Node, Route } from "./parts";

/**
 * MaSoVa Enterprise Fleet — an agent system, drawn as an agent flow.
 *
 * One conductor fans out to seven specialists and everything converges on an
 * approval gate. Fan-out and convergence are the composition because they are
 * the argument: the manager keeps the decision.
 */
export function FleetExplainer() {
  const agents = [
    ["Demand", "forecast"],
    ["Inventory", "reorder"],
    ["Churn", "prevention"],
    ["Review", "responses"],
    ["Shift", "rostering"],
    ["Kitchen", "coaching"],
    ["Dynamic", "pricing"],
  ];

  const colW = 92;
  const colGap = 4;
  const left = 24;
  const agentY = 162;
  const agentH = 46;
  const gateY = 244;

  // The fan-out bus runs below the section label, never through it.
  const busY = 140;

  const colX = (i: number) => left + i * (colW + colGap);
  const colMid = (i: number) => colX(i) + colW / 2;

  return (
    <ExplainerFrame
      kicker="Agent fleet"
      caption="One conductor, seven specialists, and a gate nothing gets past. Every agent drafts; the manager decides."
      description="A manager asks a question by voice or text. The conductor agent grounds policy answers in the operations manual using retrieval, and routes work to any of seven specialists: demand forecast, inventory reorder, churn prevention, review responses, shift rostering, kitchen coaching and dynamic pricing. Every agent emits a draft proposal rather than executing. Proposals converge on an approval queue, where nothing reaches a price, a purchase order, a refund or a customer until a manager accepts it. Each run is written to a hash-chained log with its reasoning trace."
    >
      {({ motion }) => (
        <svg
          viewBox="0 0 720 350"
          className="explainer-svg"
          role="img"
          aria-label="Manager copilot fanning out to seven agents behind an approval gate"
        >
          <Defs />

          {/* ---- The manager asks ---- */}
          <Label x={left} y={40} step="s1">
            Manager
          </Label>
          <Node
            x={left}
            y={56}
            w={172}
            h={46}
            label="Voice or text"
            detail="asks in plain language"
            kind="client"
            step="s1"
          />

          <Route d="M 196,79 H 244" motion={motion} dur={1.3} count={2} />

          {/* ---- The conductor ---- */}
          <Node
            x={244}
            y={56}
            w={204}
            h={46}
            label="Conductor agent"
            detail="routes · compares · answers"
            kind="gate"
            state="active"
            active
            step="s2"
          />

          {/* Grounded, not improvised: the conductor retrieves from the manual
              on the way to an answer, so the edge carries traffic. */}
          <Route d="M 448,79 H 486" motion={motion} dur={1.1} begin={1.8} />
          <Node
            x={486}
            y={56}
            w={210}
            h={46}
            label="Operations manual"
            detail="retrieval · grounded answers"
            kind="store"
            step="s3"
          />

          {/* ---- Fan-out ---- */}
          <Label x={left} y={126} step="s4">
            Seven specialists — none executes
          </Label>

          {agents.map((agent, i) => {
            const d = `M 346,102 V ${busY} H ${colMid(i)} V ${agentY}`;
            return (
              <g key={agent[0]}>
                <Route d={d} head={false} motion={motion} dur={1.5} begin={0.8 + i * 0.22} />
                <Node
                  x={colX(i)}
                  y={agentY}
                  w={colW}
                  h={agentH}
                  label={agent[0]}
                  detail={agent[1]}
                  kind="service"
                  active
                  phase={`q${i}`}
                  step={`s${4 + i}`}
                />
                {/* Convergence: every agent drops a draft into the queue. */}
                <Route
                  d={`M ${colMid(i)},${agentY + agentH} V ${gateY}`}
                  kind="async"
                  head={false}
                  motion={motion}
                  dur={1.4}
                  begin={2.4 + i * 0.18}
                />
              </g>
            );
          })}

          {/* ---- The gate ---- */}
          <Node
            x={left}
            y={gateY}
            w={672}
            h={46}
            label="Approval queue — nothing executes until a manager accepts"
            detail="prices · purchase orders · refunds · campaigns"
            kind="queue"
            active
            phase="q5"
            step="s12"
          />

          {/* ---- Audit ---- */}
          <Route d="M 360,290 V 310" motion={motion} dur={0.9} begin={3.4} tone="live" />

          <Node
            x={186}
            y={310}
            w={348}
            h={34}
            label="Run log · reasoning trace · hash-chained"
            kind="store"
            state="verified"
            step="s13"
            centre
          />
        </svg>
      )}
    </ExplainerFrame>
  );
}
