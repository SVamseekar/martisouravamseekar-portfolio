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
    ["Shift", "optimisation"],
    ["Kitchen", "coaching"],
    ["Dynamic", "pricing"],
  ];

  const colW = 92;
  const colGap = 6;
  const left = 24;
  const agentY = 156;
  const agentH = 46;
  const gateY = 240;

  const colX = (i: number) => left + i * (colW + colGap);
  const colMid = (i: number) => colX(i) + colW / 2;

  return (
    <ExplainerFrame
      kicker="Agent fleet"
      caption="One conductor, seven specialists, and a gate nothing gets past. Every agent drafts; the manager decides."
      description="A manager asks a question by voice or text. The conductor agent grounds policy answers in the operations manual using retrieval, and routes work to any of seven specialists: demand forecast, inventory reorder, churn prevention, review responses, shift optimisation, kitchen coaching and dynamic pricing. Every agent emits a draft proposal rather than executing. Proposals converge on an approval queue, where nothing reaches a price, a purchase order, a refund or a customer until a manager accepts it. Each run is written to a hash-chained log with its reasoning trace."
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
            w={150}
            h={46}
            label="Voice or text"
            detail="asks in plain language"
            kind="client"
            step="s1"
          />

<Route d="M 174,79 H 258" motion={motion} dur={1.3} count={2} />

          {/* ---- The conductor ---- */}
          <Node
            x={258}
            y={56}
            w={180}
            h={46}
            label="Conductor agent"
            detail="routes · compares · answers"
            kind="gate"
            state="active"
            active
            step="s2"
          />

          {/* Grounded, not improvised. */}
<Route d="M 438,79 H 522" kind="lineage" motion={motion} />
          <Node
            x={522}
            y={56}
            w={174}
            h={46}
            label="Operations manual"
            detail="retrieval · grounded answers"
            kind="store"
            step="s3"
          />

          {/* ---- Fan-out ---- */}
          <Label x={left} y={138} step="s4">
            Seven specialists — each proposes, none executes
          </Label>

          {agents.map((agent, i) => {
            const d = `M 348,102 V 126 H ${colMid(i)} V ${agentY}`;
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
<Route d="M 360,286 V 306" motion={motion} dur={0.9} begin={3.4} tone="live" />

          <Node
            x={186}
            y={306}
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
