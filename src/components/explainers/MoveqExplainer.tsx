"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { Boundary, Defs, Edge, Label, Node, Packet } from "./parts";

/**
 * moveq — a library, drawn as a function.
 *
 * Data in on the left, measures out on the right, and the harmonization
 * contract as a boundary around the cross-country case. The contract is the
 * distinctive idea: an omission has to be declared, not silently dropped.
 */
export function MoveqExplainer() {
  const measures = [
    { label: "Gini", detail: "population-weighted" },
    { label: "Palma", detail: "top 10% ÷ bottom 40%" },
    { label: "Concentration", detail: "Wagstaff index" },
    { label: "Composite", detail: "configurable weights" },
  ];

  const contracts = [
    { key: "same", detail: "directly comparable", tone: "live" as const },
    { key: "replace", detail: "national equivalent", tone: "signal" as const },
    { key: "omit", detail: "declared, not hidden", tone: "warn" as const },
  ];

  const colOut = 372;
  const wOut = 168;
  const outY = (i: number) => 56 + i * 58;
  const outMid = (i: number) => outY(i) + 23;

  return (
    <ExplainerFrame
      kicker="Library"
      caption="A CSV in, standard measures out. Cross-country work must declare how each measure travels — so an omission appears in the output."
      description="A CSV of trips per area, population counts and deprivation ranks is read by a pure NumPy core with no required input-output or geospatial dependencies. It computes population-weighted Gini, the Palma ratio, the Wagstaff concentration index and a configurable composite accessibility score. For cross-country work, a catalogue holds a harmonization contract where each measure is declared as the same, replaced by a national equivalent, or omitted, so omissions are explicit rather than silent. A command-line interface exposes the same functions."
    >
      {({ motion }) => (
        <svg
          viewBox="0 0 720 330"
          className="explainer-svg"
          role="img"
          aria-label="moveq computing inequality measures under a harmonization contract"
        >
          <Defs />

          {/* ---- Input ---- */}
          <Label x={24} y={40} step="s1">
            Input
          </Label>
          <Node
            x={24}
            y={110}
            w={150}
            h={58}
            label="areas.csv"
            detail="trips · population · rank"
            kind="external"
            step="s1"
          />

          <Edge d="M 174,139 H 216" kind="sync" flow />
          <Packet path="M 174,139 H 216" dur={1.2} count={2} enabled={motion} />

          {/* ---- Core ---- */}
          <Node
            x={216}
            y={110}
            w={130}
            h={58}
            label="moveq-core"
            detail="pure NumPy"
            kind="service"
            state="active"
            active
            step="s2"
          />

          {/* ---- Measures ---- */}
          <Label x={colOut} y={40} step="s3">
            Measures
          </Label>
          {measures.map((measure, i) => {
            const d = `M 346,139 H ${colOut - 24} V ${outMid(i)} H ${colOut}`;
            return (
              <g key={measure.label}>
                <Edge d={d} kind="sync" head flow={i === 1} />
                <Node
                  x={colOut}
                  y={outY(i)}
                  w={wOut}
                  h={40}
                  label={measure.label}
                  detail={measure.detail}
                  kind="service"
                  active
                  phase={`q${i}`}
                  step={`s${3 + i}`}
                />
              </g>
            );
          })}

          <Packet
            path={`M 346,139 H ${colOut - 24} V ${outMid(0)} H ${colOut}`}
            dur={1.5}
            begin={0.8}
            enabled={motion}
          />
          <Packet
            path={`M 346,139 H ${colOut - 24} V ${outMid(3)} H ${colOut}`}
            dur={1.5}
            begin={1.4}
            enabled={motion}
          />

          {/* ---- Harmonization contract ---- */}
          <Boundary x={566} y={40} w={130} h={238} label="Catalogue" step="s8" />

          <text className="dg-note dg-in s8" x={580} y={78}>
            cross-country
          </text>
          <text className="dg-note dg-in s8" x={580} y={94}>
            contract
          </text>

          {contracts.map((contract, i) => (
            <g key={contract.key} className={`dg-in s${9 + i}`}>
              <circle
                cx={588}
                cy={128 + i * 48}
                r="5"
                className={`dg-dot dg-packet-${contract.tone}`}
              />
              <text className={`dg-note-strong dg-text-${contract.tone}`} x={602} y={132 + i * 48}>
                {contract.key}
              </text>
              <text className="dg-note" x={580} y={148 + i * 48}>
                {contract.detail}
              </text>
            </g>
          ))}

          <Edge d="M 540,139 H 566" kind="lineage" />

          {/* ---- CLI ---- */}
          <Node
            x={24}
            y={272}
            w={516}
            h={40}
            label="moveq gini areas.csv --population pop --value trips"
            kind="external"
            step="s12"
          />
          <text className="dg-note dg-in s12" x={556} y={296} textAnchor="end">
            moveq-cli
          </text>
        </svg>
      )}
    </ExplainerFrame>
  );
}
