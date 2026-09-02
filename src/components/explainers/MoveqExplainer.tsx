"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { ArrowDefs, Caption, NodeBox, Packet } from "./parts";

/**
 * moveq — CSV in, inequality measures out, with the method recorded.
 *
 * Four packages, and the one idea that makes it more than a stats helper: the
 * harmonization registry, where a cross-country study must declare `same`,
 * `replace` or `omit` for each measure rather than silently dropping it.
 */
export function MoveqExplainer() {
  const measures = [
    { name: "Gini", meta: "population-weighted", y: 60 },
    { name: "Palma", meta: "top 10% ÷ bottom 40%", y: 108 },
    { name: "Concentration index", meta: "Wagstaff", y: 156 },
    { name: "Composite score", meta: "configurable weights", y: 204 },
  ];

  const contracts = [
    { key: "same", detail: "directly comparable", tone: "live" },
    { key: "replace", detail: "national equivalent", tone: "signal" },
    { key: "omit", detail: "declared, not hidden", tone: "warn" },
  ];

  return (
    <ExplainerFrame
      kicker="Library"
      caption="Trips, population and deprivation ranks in; standard inequality measures out. Cross-country work must declare how each measure travels."
      description="A CSV of trips per area, population counts and deprivation ranks is read by moveq-core, a pure NumPy layer with no required I/O or GIS dependencies. It computes population-weighted Gini, the Palma ratio of the top ten percent over the bottom forty, the Wagstaff concentration index, and a configurable composite accessibility score. moveq-catalogue holds a harmonization registry where a cross-country study declares, for each measure, whether it is the same, replaced by a national equivalent, or omitted — so omissions are explicit rather than silent. moveq-cli exposes the same functions as a command-line interface."
    >
      {({ motion }) => (
        <svg
          viewBox="0 0 720 300"
          className="explainer-svg"
          role="img"
          aria-label="moveq computing inequality measures with a harmonization registry"
        >
          <ArrowDefs />

          {/* ---- Input ---- */}
          <Caption x={16} y={26} delay="d1">
            INPUT
          </Caption>
          <NodeBox
            x={16}
            y={92}
            w={132}
            h={64}
            title="areas.csv"
            sub="trips · population"
            meta="deprivation rank"
            variant="dashed"
            delay="d1"
          />

          <path className="ex-wire" d="M 148,124 H 200" markerEnd="url(#ex-arrow)" />
          <Packet path="M 148,124 H 198" dur={1.4} enabled={motion} />

          {/* ---- Core ---- */}
          <NodeBox
            x={208}
            y={92}
            w={116}
            h={64}
            title="moveq-core"
            sub="pure NumPy"
            meta="no I/O, no GIS"
            variant="accent"
            pulse
            delay="d2"
          />

          {/* ---- Measures out ---- */}
          <Caption x={392} y={26} delay="d3">
            MEASURES
          </Caption>
          {measures.map((measure, i) => (
            <g key={measure.name}>
              <path
                className="ex-wire-soft"
                d={`M 324,124 Q 360,124 360,${measure.y + 16} H 390`}
                markerEnd="url(#ex-arrow)"
              />
              <NodeBox
                x={392}
                y={measure.y}
                w={172}
                h={34}
                title={measure.name}
                meta={measure.meta}
                pulse
                phase={`p${i}`}
                delay={`d${3 + i}`}
              />
            </g>
          ))}

          <Packet
            path="M 324,124 Q 360,124 360,76 H 388"
            dur={1.6}
            begin={1.2}
            enabled={motion}
          />
          <Packet
            path="M 324,124 Q 360,124 360,220 H 388"
            dur={1.6}
            begin={2}
            enabled={motion}
          />

          {/* ---- Harmonization registry ---- */}
          <Caption x={584} y={26} delay="d7">
            CATALOGUE
          </Caption>
          <g className="ex-step d7">
            <rect x={584} y={38} width={120} height={196} rx="3" className="ex-box-sunk" />
            <text className="ex-mono" x={598} y={60}>
              cross-country
            </text>
            <text className="ex-mono" x={598} y={74}>
              contract
            </text>
          </g>

          {contracts.map((contract, i) => (
            <g key={contract.key} className={`ex-step d${8 + i}`}>
              <circle
                cx={604}
                cy={104 + i * 42}
                r="4"
                className={
                  contract.tone === "live"
                    ? "ex-live"
                    : contract.tone === "warn"
                      ? "ex-warn"
                      : "ex-signal"
                }
              />
              <text className="ex-mono-strong" x={616} y={108 + i * 42}>
                {contract.key}
              </text>
              <text className="ex-mono" x={598} y={122 + i * 42}>
                {contract.detail}
              </text>
            </g>
          ))}

          <path className="ex-wire-soft" d="M 564,124 H 582" markerEnd="url(#ex-arrow)" />

          {/* ---- CLI surface ---- */}
          <g className="ex-step d11">
            <rect x={16} y={244} width={548} height={34} rx="3" className="ex-box-sunk" />
            <text className="ex-mono-strong" x={32} y={265}>
              $ moveq gini areas.csv --population pop --value trips
            </text>
            <text className="ex-mono ex-end" x={548} y={265}>
              moveq-cli
            </text>
          </g>
        </svg>
      )}
    </ExplainerFrame>
  );
}
