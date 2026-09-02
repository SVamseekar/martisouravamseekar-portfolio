"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { Boundary, Defs, Edge, Label, Node, Packet } from "./parts";

/**
 * EU AI Assurance OS — a release meeting the gate.
 *
 * Composition is a decision, so the gate sits at the centre with one route in
 * and two routes out: rejected back to the team, sealed down to the ledger.
 * The refusal is the product, so the rejected edge carries the heaviest line
 * in the grammar.
 */
export function ReleaseGateExplainer() {
  const checks = [
    { label: "Technical documentation", ok: true },
    { label: "Data governance", ok: true },
    { label: "Logging & traceability", ok: true },
    { label: "Human oversight evidence", ok: false },
  ];

  const inbound = "M 168,124 H 250";
  const verdict = "M 470,124 H 552";
  const sealed = "M 610,178 V 236";
  const rejected = "M 552,150 V 300 H 100 V 148";

  return (
    <ExplainerFrame
      kicker="Release gate"
      caption="A release is classified, checked against the obligations that class carries, and stopped on the one it cannot evidence."
      description="A continuous integration pipeline posts release v2.4 to the assurance gate. The gate classifies it as high risk and checks four obligations: technical documentation, data governance, and logging and traceability all pass; human oversight evidence is missing. The gate returns blocked and the release travels back to the team with the reason attached. Cited evidence is retrieved from a vector index over the tenant's own documents. The decision and its evidence are sealed into an evidence pack and appended to a hash-chained ledger."
    >
      {({ motion }) => (
        <svg
          viewBox="0 0 720 330"
          className="explainer-svg"
          role="img"
          aria-label="Release gate blocking a high-risk model deployment"
        >
          <Defs />

          {/* ---- Inbound ---- */}
          <Label x={24} y={54} step="s1">
            Deploy pipeline
          </Label>
          <Node
            x={24}
            y={100}
            w={144}
            h={48}
            label="Release v2.4"
            detail="POST /gate"
            kind="external"
            step="s1"
          />

          <Edge d={inbound} kind="sync" flow />
          <Packet path={inbound} dur={1.4} count={2} enabled={motion} />

          {/* ---- The gate ---- */}
          <Boundary x={250} y={44} w={220} h={186} label="Assurance gate" step="s2" />

          <text className="dg-note-strong dg-in s2" x={268} y={82}>
            Risk class · HIGH
          </text>

          {checks.map((check, i) => (
            <g key={check.label} className={`dg-in s${3 + i}`}>
              <text
                className={check.ok ? "dg-note dg-text-live" : "dg-note dg-text-warn"}
                x={268}
                y={110 + i * 26}
              >
                {check.ok ? "✓" : "✕"}
              </text>
              <text
                className={check.ok ? "dg-note" : "dg-note dg-text-warn"}
                x={286}
                y={110 + i * 26}
              >
                {check.label}
              </text>
            </g>
          ))}

          {/* Evidence retrieval supports the decision. */}
          <Edge d="M 360,262 V 230" kind="lineage" />
          <Node
            x={250}
            y={262}
            w={220}
            h={38}
            label="Cited evidence"
            detail="vector index · tenant documents"
            kind="store"
            active
            phase="q2"
            step="s7"
          />

          {/* ---- Verdict ---- */}
          <Edge d={verdict} kind="rejected" flow />
          <Packet path={verdict} dur={1.3} begin={1.4} tone="warn" enabled={motion} />

          <Node
            x={552}
            y={100}
            w={144}
            h={48}
            label="BLOCKED"
            detail="1 obligation unmet"
            kind="gate"
            state="warn"
            step="s8"
            centre
          />

          {/* Rejected: back to the team. The heaviest line on the page. */}
          <Edge d={rejected} kind="rejected" flow />
          <Packet path={rejected} dur={3} begin={2} tone="warn" radius={5} enabled={motion} />

          <text className="dg-note-strong dg-text-warn dg-in s9" x={326} y={318}>
            ✕ shipping blocked — returned with the reason attached
          </text>

          {/* Sealed: down to the ledger. */}
          <Edge d={sealed} kind="sync" flow />
          <Packet path={sealed} dur={1.1} begin={2.6} tone="live" enabled={motion} />

          <Node
            x={504}
            y={236}
            w={192}
            h={44}
            label="Evidence pack"
            detail="sealed → hash-chained ledger"
            kind="store"
            state="verified"
            step="s10"
          />
        </svg>
      )}
    </ExplainerFrame>
  );
}
