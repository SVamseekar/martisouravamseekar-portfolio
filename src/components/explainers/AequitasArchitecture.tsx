"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { Boundary, Defs, Node, Route } from "./parts";

/**
 * Aequitas — the per-country pipeline, drawn as a pipeline.
 *
 * Four national warehouses are built by the same stages, and each country
 * carries its own ingestion, processing and banding modules. The boundary
 * around the four countries is the method rule: the pipeline is shared, the
 * scores are not comparable across it.
 */
export function AequitasArchitecture() {
  const stages = [
    {
      label: "Ingest",
      detail: "GTFS · census",
      short: "feeds · boundaries",
    },
    {
      label: "Process",
      detail: "joins · dedup",
      short: "geometry · frequency",
    },
    {
      label: "Analytics",
      detail: "equity · access",
      short: "2SFCA · clustering",
    },
    {
      label: "Validate",
      detail: "gates · truth",
      short: "103 checks · 0 fail",
    },
    {
      label: "Warehouse",
      detail: "pre-compute",
      short: "packs · provenance",
    },
  ];

  const stageW = 122;
  const stageGap = 12;
  const left = 24;
  const stageY = 108;
  const stageH = 52;
  const stageX = (i: number) => left + i * (stageW + stageGap);
  const mid = stageY + stageH / 2;

  const countries = ["England", "Ireland", "Netherlands", "France"];

  return (
    <ExplainerFrame
      kicker="Pipeline"
      caption="One pipeline, run once per country. Each nation brings its own sources and deprivation index; the warehouse it produces is queried, never recomputed."
      description="Aequitas runs the same five-stage pipeline separately for each of four countries. Ingest reads official GTFS timetables, census geography and the national deprivation index. Process performs spatial joins, deduplication, route geometry and service frequency. Analytics computes equity, accessibility including 2SFCA, economic bands, and machine learning modules for clustering, anomaly detection and prediction. Validate runs quality gates and ground-truth checks. Warehouse pre-computes every analytical section with provenance. England, Ireland, the Netherlands and France each have their own ingestion, processing and banding modules. A read-only API serves the pre-computed warehouse to the dashboard and a retrieval-augmented chat index."
    >
      {({ motion }) => (
        <svg
          viewBox="0 0 720 400"
          className="explainer-svg"
          role="img"
          aria-label="Aequitas five-stage pipeline run per country, feeding a read-only API"
        >
          <Defs />

          {/* ---- Per-country inputs ---- */}
          <Boundary
            x={left}
            y={26}
            w={672}
            h={54}
            label="Run once per country — sources and index differ"
            step="s1"
          />
          {countries.map((country, i) => (
            <Node
              key={country}
              x={left + 14 + i * 162}
              y={44}
              w={148}
              h={26}
              label={country}
              kind="external"
              step={`s${i + 1}`}
              centre
            />
          ))}

          {/* Each country enters the shared pipeline. */}
          {[88, 250, 412, 574].map((x, i) => (
            <Route
              key={`country-${x}`}
              d={
                i === 0
                  ? `M ${left + 88},80 V ${stageY}`
                  : `M ${left + x},80 V 94 H ${left + 88} V ${stageY}`
              }
              head={i === 0}
              motion={motion}
              dur={1.6}
              begin={i * 0.35}
            />
          ))}

          {/* ---- The pipeline ---- */}
          {stages.map((stage, i) => (
            <g key={stage.label}>
              <Node
                x={stageX(i)}
                y={stageY}
                w={stageW}
                h={stageH}
                label={stage.label}
                detail={stage.detail}
                kind="service"
                active
                phase={`q${i}`}
                step={`s${5 + i}`}
              />
              <text
                className="dg-note dg-in"
                style={{ animationDelay: `${600 + i * 70}ms` }}
                x={stageX(i) + stageW / 2}
                y={stageY + stageH + 18}
                textAnchor="middle"
              >
                {stage.short}
              </text>
            </g>
          ))}

          {/* Stage to stage. */}
          {stages.slice(0, -1).map((_, i) => {
            const d = `M ${stageX(i) + stageW},${mid} H ${stageX(i + 1)}`;
            return (
              <Route key={`link-${i}`} d={d} motion={motion} dur={1.1} begin={0.5 + i * 0.45} />
            );
          })}

          {/* ---- Warehouse output ---- */}
          <Route
            d={`M ${stageX(4) + stageW / 2},${stageY + stageH + 26} V 226`}
            motion={motion}
            dur={1.2}
            begin={2.4}
            tone="live"
          />

          <Node
            x={456}
            y={226}
            w={240}
            label="DuckDB warehouse"
            detail="every section pre-computed"
            kind="store"
            state="verified"
            step="s11"
          />

          {/* ---- Read-only serving layer ---- */}
<Route d="M 456,249 H 372" motion={motion} dur={1.1} begin={2.9} />

          <Node
            x={222}
            y={226}
            w={150}
            label="Read-only API"
            detail="lookup, not compute"
            kind="gate"
            state="active"
            active
            phase="q5"
            step="s12"
          />

<Route d="M 222,249 H 174" motion={motion} dur={1} begin={3.3} />

          <Node
            x={24}
            y={226}
            w={150}
            label="Dashboard"
            detail="13 surfaces · maps"
            kind="client"
            step="s13"
          />

          {/* Grounded chat queries the same warehouse at runtime, so this
              edge carries traffic like any other read path. */}
          <Route d="M 576,272 V 308" motion={motion} dur={1.2} begin={3.6} />
          <Node
            x={456}
            y={308}
            w={240}
            h={38}
            label="Grounded chat"
            detail="FAISS index over sections"
            kind="service"
            step="s14"
          />

          {/* The rule that governs the whole thing. */}
          <text className="dg-note dg-text-warn dg-in s15" x={24} y={300}>
            Scores are computed inside a country.
          </text>
          <text className="dg-note dg-in s15" x={24} y={318}>
            Indices are constructed differently, so they
          </text>
          <text className="dg-note dg-in s16" x={24} y={334}>
            never share an axis and never form a league table.
          </text>
          <text className="dg-note dg-in s16" x={24} y={360}>
            Weak evidence is omitted, never imputed.
          </text>
        </svg>
      )}
    </ExplainerFrame>
  );
}
