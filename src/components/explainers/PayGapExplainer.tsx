"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { ArrowDefs, Caption, NodeBox, Packet } from "./parts";

/**
 * WorkforceGuard AI — the pipeline that makes a pay-gap answer defensible.
 *
 * Eurostat series and the company's own payroll travel through the real dbt
 * layers (staging → core → internal → public marts) into the benchmark the
 * employer is measured against, with provenance carried the whole way.
 */
export function PayGapExplainer() {
  const sources = [
    { title: "LFS", sub: "labour force", y: 44 },
    { title: "JVS", sub: "vacancies", y: 92 },
    { title: "SES", sub: "earnings", y: 140 },
  ];

  const layers = [
    { title: "staging", meta: "typed + tested", x: 306 },
    { title: "core", meta: "EU27 × 13 NACE", x: 306 },
  ];

  return (
    <ExplainerFrame
      kicker="Data path"
      caption="Eurostat series and the company's own payroll meet in the same models, so the benchmark and the answer carry one shared provenance."
      description="Three Eurostat sources — Labour Force Survey, Job Vacancy Statistics and Structure of Earnings Survey — are ingested as Parquet into a DuckDB warehouse, then modelled through layered dbt: staging, core covering all 27 member states and 13 NACE sectors, then internal and public benchmark marts. A company's uploaded payroll joins at the internal layer. The API assembles an evidence bundle where every figure carries its Eurostat dataset id, formula version and review status, and writes each decision to a SHA-256 hash-chained governance log."
    >
      {({ motion }) => (
        <svg
          viewBox="0 0 720 300"
          className="explainer-svg"
          role="img"
          aria-label="WorkforceGuard data pipeline from Eurostat through dbt to a benchmarked answer"
        >
          <ArrowDefs />

          {/* ---- Public sources ---- */}
          <Caption x={16} y={26} delay="d1">
            EUROSTAT · 16 DATASETS
          </Caption>
          {sources.map((source, i) => (
            <NodeBox
              key={source.title}
              x={16}
              y={source.y}
              w={112}
              h={38}
              title={source.title}
              sub={source.sub}
              pulse
              phase={`p${i}`}
              delay={`d${i + 1}`}
            />
          ))}

          {/* Ingest */}
          <path className="ex-wire" d="M 128,63 Q 176,63 176,112" />
          <path className="ex-wire" d="M 128,111 H 176" />
          <path className="ex-wire" d="M 128,159 Q 176,159 176,112" />
          <path className="ex-wire" d="M 176,112 H 216" markerEnd="url(#ex-arrow)" />

          <Packet path="M 128,63 Q 176,63 176,112 L 214,112" dur={2.2} enabled={motion} />
          <Packet path="M 128,159 Q 176,159 176,112 L 214,112" dur={2.2} begin={1.1} enabled={motion} />

          <NodeBox
            x={224}
            y={92}
            w={62}
            h={40}
            title="Parquet"
            variant="sunk"
            delay="d4"
          />

          {/* ---- dbt layers ---- */}
          <Caption x={306} y={26} delay="d5">
            dbt ON DUCKDB · ~31 MODELS
          </Caption>
          {layers.map((layer, i) => (
            <NodeBox
              key={layer.title}
              x={layer.x}
              y={44 + i * 52}
              w={140}
              h={40}
              title={layer.title}
              meta={layer.meta}
              pulse
              phase={`p${i + 3}`}
              delay={`d${5 + i}`}
            />
          ))}
          <NodeBox
            x={306}
            y={148}
            w={140}
            h={40}
            title="internal mart"
            meta="company × market"
            variant="accent"
            pulse
            phase="p5"
            delay="d7"
          />

          <path className="ex-wire" d="M 286,112 Q 296,112 296,64 H 306" markerEnd="url(#ex-arrow)" />
          <path className="ex-wire" d="M 376,84 V 96" markerEnd="url(#ex-arrow)" />
          <path className="ex-wire" d="M 376,136 V 148" markerEnd="url(#ex-arrow)" />

          <Packet path="M 376,84 V 146" dur={1.6} begin={2.2} enabled={motion} />

          {/* ---- The employer's own payroll joins ---- */}
          <NodeBox
            x={306}
            y={226}
            w={140}
            h={40}
            title="your payroll"
            meta="CSV upload"
            variant="dashed"
            delay="d8"
          />
          <path className="ex-wire-soft" d="M 376,226 V 188" markerEnd="url(#ex-arrow)" />
          <Packet path="M 376,224 V 190" dur={1.3} begin={3} tone="live" enabled={motion} />

          {/* ---- The answer, with provenance ---- */}
          <path className="ex-wire" d="M 446,168 H 496" markerEnd="url(#ex-arrow)" />
          <Packet path="M 446,168 H 494" dur={1.2} begin={3.6} enabled={motion} />

          <g className="ex-step d9">
            <rect x={504} y={92} width={200} height={110} rx="3" className="ex-box" />
            <text className="ex-label" x={520} y={114}>
              EVIDENCE BUNDLE
            </text>
            <text className="ex-mono-strong" x={520} y={138}>
              you · 21.4%
            </text>
            <text className="ex-mono" x={520} y={156}>
              finance benchmark · 25.0%
            </text>
            <text className="ex-mono" x={520} y={170}>
              all-sector mean · 10.9%
            </text>
            <text className="ex-mono" x={520} y={190}>
              earn_gr_gpgr2 · formula v3
            </text>
          </g>

          {/* Governance log */}
          <path className="ex-wire" d="M 604,202 V 232" markerEnd="url(#ex-arrow)" />
          <g className="ex-step d10">
            <rect x={504} y={236} width={200} height={34} rx="3" className="ex-box-sunk" />
            <text className="ex-mono ex-mid" x={604} y={257}>
              SHA-256 chain · verified per call
            </text>
          </g>
        </svg>
      )}
    </ExplainerFrame>
  );
}
