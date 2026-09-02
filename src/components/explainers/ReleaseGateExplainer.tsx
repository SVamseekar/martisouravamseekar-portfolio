"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { Boundary, Defs, Label, Node, Route } from "./parts";

/**
 * EU AI Assurance OS — a release meeting the gate.
 *
 * The gate sits centre with one route in and two out: rejected back to the
 * team, sealed down to the ledger. Routes are laid out in their own lanes so
 * the rejection never crosses a box it has nothing to do with.
 */
export function ReleaseGateExplainer() {
  const checks = [
    { label: "Technical documentation", ok: true },
    { label: "Data governance", ok: true },
    { label: "Logging & traceability", ok: true },
    { label: "Human oversight evidence", ok: false },
  ];

  const gateX = 250;
  const gateW = 224;
  const gateY = 60;
  const gateH = 176;
  const axis = gateY + 64;

  return (
    <ExplainerFrame
      kicker="Release gate"
      caption="A release is classified, checked against the obligations that class carries, and stopped on the one it cannot evidence."
      description="A deploy pipeline posts release v2.4 to the assurance gate. The gate classifies it as high risk and checks four obligations: technical documentation, data governance, and logging and traceability pass; human oversight evidence is missing. The gate returns blocked, and the release travels back to the team with the reason attached. Cited evidence is retrieved from a vector index over the tenant's own documents. The decision and its evidence are sealed into an evidence pack and appended to a hash-chained ledger."
    >
      {({ motion }) => (
        <svg
          viewBox="0 0 720 360"
          className="explainer-svg"
          role="img"
          aria-label="Release gate blocking a high-risk model deployment"
        >
          <Defs />

          {/* ---- Inbound ---- */}
          <Label x={24} y={44} step="s1">
            Deploy pipeline
          </Label>
          <Node
            x={24}
            y={axis - 24}
            w={150}
            h={48}
            label="Release v2.4"
            detail="POST /gate"
            kind="external"
            step="s1"
          />

          <Route
            d={`M 174,${axis} H ${gateX}`}
            motion={motion}
            dur={1.3}
            count={2}
          />

          {/* ---- The gate ---- */}
          <Boundary x={gateX} y={gateY} w={gateW} h={gateH} label="Assurance gate" step="s2" />

          <text className="dg-note-strong dg-in s2" x={gateX + 18} y={gateY + 38}>
            Risk class · HIGH
          </text>

          {checks.map((check, i) => (
            <g key={check.label} className={`dg-in s${3 + i}`}>
              <text
                className={check.ok ? "dg-note dg-text-live" : "dg-note dg-text-warn"}
                x={gateX + 18}
                y={gateY + 66 + i * 25}
              >
                {check.ok ? "✓" : "✕"}
              </text>
              <text
                className={check.ok ? "dg-note" : "dg-note dg-text-warn"}
                x={gateX + 36}
                y={gateY + 66 + i * 25}
              >
                {check.label}
              </text>
            </g>
          ))}

          {/* Evidence supports the decision — a lineage edge, no runtime traffic. */}
          <Node
            x={gateX}
            y={262}
            w={gateW}
            h={40}
            label="Cited evidence"
            detail="vector index · tenant docs"
            kind="store"
            active
            phase="q2"
            step="s7"
          />
          <Route
            d={`M ${gateX + gateW / 2},262 V ${gateY + gateH}`}
            kind="lineage"
            motion={motion}
          />

          {/* ---- Verdict ---- */}
          <Route
            d={`M ${gateX + gateW},${axis} H 528`}
            kind="rejected"
            motion={motion}
            dur={1.2}
            begin={1.2}
          />

          <Node
            x={528}
            y={axis - 26}
            w={168}
            h={52}
            label="BLOCKED"
            detail="1 obligation unmet"
            kind="gate"
            state="warn"
            step="s8"
            centre
          />

          {/* Rejected: back to the team, in a clear lane below the gate. */}
          <Route
            d={`M 612,${axis + 26} V 330 H 99 V ${axis + 24}`}
            kind="rejected"
            motion={motion}
            dur={3}
            begin={2}
          />
          <text className="dg-note-strong dg-text-warn dg-in s9" x={360} y={348} textAnchor="middle">
            ✕ shipping blocked — returned with the reason attached
          </text>

          {/* Sealed: down its own lane, clear of the evidence box. */}
          <Route
            d={`M 640,${axis + 26} V 262`}
            motion={motion}
            dur={1.1}
            begin={2.6}
            tone="live"
          />
          <Node
            x={528}
            y={262}
            w={168}
            h={40}
            label="Evidence pack"
            detail="sealed → ledger"
            kind="store"
            state="verified"
            step="s10"
          />
        </svg>
      )}
    </ExplainerFrame>
  );
}
