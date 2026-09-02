"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { ArrowDefs, Caption, NodeBox, Packet } from "./parts";

/**
 * MaSoVa Enterprise Fleet — one conductor, seven specialists, nothing
 * auto-executes.
 *
 * The agent names are the ones in src/masova_agent/agents/. The point of the
 * diagram is the approval gate: every agent proposes, the manager decides, and
 * the run is hash-chained. That is what separates it from an autonomous
 * "platform brain".
 */
export function FleetExplainer() {
  const agents = [
    "demand forecast",
    "inventory reorder",
    "churn prevention",
    "review response",
    "shift optimisation",
    "kitchen coach",
    "dynamic pricing",
  ];

  const colW = 94;
  const colGap = 7;
  const agentY = 150;

  return (
    <ExplainerFrame
      kicker="Agent fleet"
      caption="The Copilot fans out to seven specialists. Each one proposes; nothing reaches a price, a purchase order or a customer without a manager approving it."
      description="A manager asks the Manager Copilot a question by text or voice. The Copilot grounds answers in an operations manual using retrieval, and can trigger any of seven specialist agents: demand forecast, inventory reorder, churn prevention, review response, shift optimisation, kitchen coach and dynamic pricing. Every agent emits a draft proposal rather than executing. Proposals queue for manager approval, and each run is written to a SHA-256 hash-chained audit log with its reasoning trace."
    >
      {({ motion }) => (
        <svg
          viewBox="0 0 720 330"
          className="explainer-svg"
          role="img"
          aria-label="Manager Copilot conducting seven specialist agents behind an approval gate"
        >
          <ArrowDefs />

          {/* ---- Manager in ---- */}
          <Caption x={16} y={24} delay="d1">
            MANAGER
          </Caption>
          <NodeBox
            x={16}
            y={34}
            w={128}
            h={44}
            title="voice or text"
            meta="Gemini STT / TTS"
            delay="d1"
          />

          <path className="ex-wire ex-flow" d="M 144,56 Q 210,56 210,74" markerEnd="url(#ex-arrow)" />
          <Packet path="M 144,56 Q 210,56 210,74" dur={1.2} enabled={motion} />

          {/* ---- Copilot ---- */}
          <NodeBox
            x={150}
            y={78}
            w={172}
            h={46}
            title="Manager Copilot"
            meta="conductor agent"
            variant="accent"
            pulse
            delay="d2"
          />

          {/* RAG grounding */}
          <NodeBox
            x={358}
            y={78}
            w={148}
            h={46}
            title="ops manual"
            meta="RAG · data/knowledge"
            variant="sunk"
            delay="d3"
          />
          <path className="ex-wire ex-flow" d="M 322,101 H 358" markerEnd="url(#ex-arrow)" />
          <Packet path="M 322,101 H 358" dur={1} begin={1.2} enabled={motion} />

          {/* ---- Fan-out to the specialists ---- */}
          {agents.map((agent, i) => {
            const x = 16 + i * (colW + colGap);
            const mid = x + colW / 2;
            return (
              <g key={agent}>
                <path
                  className="ex-wire-soft"
                  d={`M 236,124 Q ${mid},128 ${mid},${agentY}`}
                />
                <NodeBox
                  x={x}
                  y={agentY}
                  w={colW}
                  h={46}
                  title={agent.split(" ")[0]}
                  sub={agent.split(" ").slice(1).join(" ")}
                  pulse
                  phase={`p${i}`}
                  delay={`d${4 + i}`}
                />
                {/* Every agent emits a proposal, never an action. */}
                <path
                  className="ex-wire-soft"
                  d={`M ${mid},${agentY + 46} V 226`}
                />
              </g>
            );
          })}

          <Packet path="M 236,124 Q 63,146 63,150" dur={1.4} begin={1.8} enabled={motion} />
          <Packet path="M 236,124 Q 657,146 657,150" dur={1.4} begin={2.4} enabled={motion} />

          <Caption x={16} y={142} delay="d4">
            SEVEN SPECIALIST OPS AGENTS
          </Caption>

          {/* ---- Approval gate ---- */}
          <g className="ex-step d11">
            <rect x={16} y={226} width={688} height={42} rx="3" className="ex-box-accent" />
            <text className="ex-label" x={32} y={244}>
              PROPOSAL QUEUE · DRAFT
            </text>
            <text className="ex-mono-strong" x={32} y={260}>
              nothing executes until a manager approves
            </text>
            <text className="ex-mono ex-end" x={688} y={252}>
              prices · purchase orders · refunds · campaigns
            </text>
          </g>

          <Packet path="M 360,226 V 268" dur={0.9} begin={3} tone="warn" enabled={motion} />

          {/* ---- Audit ---- */}
          <path className="ex-wire ex-flow" d="M 360,268 V 286" markerEnd="url(#ex-arrow)" />
          <g className="ex-step d12">
            <rect x={196} y={290} width={328} height={30} rx="3" className="ex-box-sunk" />
            <text className="ex-mono ex-mid" x={360} y={309}>
              run log · reasoning trace · SHA-256 chain verified
            </text>
          </g>
        </svg>
      )}
    </ExplainerFrame>
  );
}
