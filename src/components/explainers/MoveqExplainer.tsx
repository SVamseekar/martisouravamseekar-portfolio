"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { Boundary, Defs, Label, Node, Route } from "./parts";

/**
 * moveq — the four packages, and what each one is for.
 *
 * The stack is the subject: core computes, catalogue governs cross-country
 * method, cli drives it, and the meta package installs the pair. Showing only
 * the core made it look like a single-module library, which undersold it.
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

  const colIn = 24;
  const wIn = 150;
  const colCore = 196;
  const wCore = 138;
  const colOut = 366;
  const wOut = 152;
  const colCat = 536;
  const wCat = 160;

  const outY = (i: number) => 74 + i * 46;
  const outMid = (i: number) => outY(i) + 19;
  const axis = 150;

  return (
    <ExplainerFrame
      kicker="Library"
      caption="Four packages: a NumPy core that computes, a catalogue that governs how methods travel, a CLI that drives them, and a meta package that installs the pair."
      description="A CSV of trips per area, population counts and deprivation ranks is read by moveq-core, a pure NumPy layer with no required input-output or geospatial dependencies. It computes population-weighted Gini, the Palma ratio, the Wagstaff concentration index and a configurable composite accessibility score. moveq-catalogue holds a harmonization registry where each measure in a cross-country study is declared as the same, replaced by a national equivalent, or omitted, so omissions are explicit. moveq-cli exposes the same functions as a command line, and the moveq meta package installs core and catalogue together."
    >
      {({ motion }) => (
        <svg
          viewBox="0 0 720 360"
          className="explainer-svg"
          role="img"
          aria-label="The four moveq packages and the measures they compute"
        >
          <Defs />

          {/* ---- Input ---- */}
          <Label x={colIn} y={44} step="s1">
            Input
          </Label>
          <Node
            x={colIn}
            y={axis - 29}
            w={wIn}
            h={58}
            label="areas.csv"
            detail="trips · population"
            kind="external"
            step="s1"
          />

          <Route
            d={`M ${colIn + wIn},${axis} H ${colCore}`}
            motion={motion}
            dur={1.2}
          />

          {/* ---- Core ---- */}
          <Node
            x={colCore}
            y={axis - 29}
            w={wCore}
            h={58}
            label="moveq-core"
            detail="pure NumPy"
            kind="service"
            state="active"
            active
            step="s2"
          />

          {/* ---- Measures: every branch carries traffic ---- */}
          <Label x={colOut} y={44} step="s3">
            Measures
          </Label>
          {measures.map((measure, i) => (
            <Route
              key={`to-${measure.label}`}
              d={`M ${colCore + wCore},${axis} H ${colOut - 24} V ${outMid(i)} H ${colOut}`}
              motion={motion}
              dur={1.6}
              begin={0.3 + i * 0.35}
            />
          ))}
          {measures.map((measure, i) => (
            <Node
              key={measure.label}
              x={colOut}
              y={outY(i)}
              w={wOut}
              h={38}
              label={measure.label}
              detail={measure.detail}
              kind="service"
              active
              phase={`q${i}`}
              step={`s${3 + i}`}
            />
          ))}

          {/* ---- Catalogue: the cross-country contract ---- */}
          <Boundary x={colCat} y={62} w={wCat} h={196} label="Catalogue" step="s8" />
          <text className="dg-note dg-in s8" x={colCat + 14} y={98}>
            cross-country
          </text>

          <Route
            d={`M ${colOut + wOut},${outMid(1)} H ${colCat}`}
            motion={motion}
            dur={1.2}
            begin={2.8}
          />

          {contracts.map((contract, i) => (
            <g key={contract.key} className={`dg-in s${9 + i}`}>
              <circle
                cx={colCat + 20}
                cy={128 + i * 42}
                r="5"
                className={`dg-dot dg-packet-${contract.tone}`}
              />
              <text
                className={`dg-note-strong dg-text-${contract.tone}`}
                x={colCat + 34}
                y={132 + i * 42}
              >
                {contract.key}
              </text>
              <text className="dg-note" x={colCat + 14} y={148 + i * 42}>
                {contract.detail}
              </text>
            </g>
          ))}

          {/* ---- The stack ---- */}
          <Boundary x={colIn} y={272} w={672} h={72} label="Four packages on PyPI" step="s12" />

          {[
            { name: "moveq-core", role: "algorithms" },
            { name: "moveq-catalogue", role: "method contracts" },
            { name: "moveq-cli", role: "command line" },
            { name: "moveq", role: "installs the pair" },
          ].map((pkg, i) => (
            <g key={pkg.name} className={`dg-in s${12 + Math.min(i, 3)}`}>
              <text className="dg-note-strong" x={colIn + 18 + i * 166} y={306}>
                {pkg.name}
              </text>
              <text className="dg-note" x={colIn + 18 + i * 166} y={324}>
                {pkg.role}
              </text>
            </g>
          ))}
        </svg>
      )}
    </ExplainerFrame>
  );
}
