"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { Boundary, Defs, Edge, Label, Node, Packet } from "./parts";

/**
 * WorkforceGuard AI — a pipeline, drawn as a pipeline.
 *
 * Public reference data and the employer's own payroll converge at the
 * internal mart; the answer that leaves carries the provenance of both. The
 * governance log hangs off the answer because that is what makes it usable.
 */
export function PayGapExplainer() {
  const sources = [
    { label: "Labour force", detail: "employment · LFS" },
    { label: "Vacancies", detail: "demand · JVS" },
    { label: "Earnings", detail: "pay gap · SES" },
  ];

  const left = 24;
  const colSource = left;
  const colModel = 250;
  const colMart = 424;
  const colOut = 566;

  const wSource = 148;
  const wModel = 140;
  const wMart = 108;
  const wOut = 130;

  const srcY = (i: number) => 74 + i * 58;
  const srcMid = (i: number) => srcY(i) + 23;
  const axis = srcMid(1);

  return (
    <ExplainerFrame
      kicker="Data path"
      caption="Public reference data and the employer's own payroll meet in one model, so the benchmark and the answer share a single provenance."
      description="Three Eurostat sources — labour force survey, job vacancy statistics and structure of earnings survey — are ingested and modelled through a layered transformation: staging, then a core layer covering all 27 member states and 13 sectors. The employer's uploaded payroll joins at the internal mart. The result is an evidence bundle in which every figure carries its source dataset, formula version and review status. Each decision is written to a hash-chained governance log whose integrity is verified on every request."
    >
      {({ motion }) => (
        <svg
          viewBox="0 0 720 330"
          className="explainer-svg"
          role="img"
          aria-label="WorkforceGuard pipeline from public data and payroll to a benchmarked answer"
        >
          <Defs />

          {/* ---- Public reference data ---- */}
          <Label x={colSource} y={54} step="s1">
            Public reference data · EU27
          </Label>
          {sources.map((source, i) => (
            <Node
              key={source.label}
              x={colSource}
              y={srcY(i)}
              w={wSource}
              h={46}
              label={source.label}
              detail={source.detail}
              kind="external"
              step={`s${i + 1}`}
            />
          ))}

          {/* Converge into the model layer. */}
          {sources.map((_, i) => {
            const d = `M ${colSource + wSource},${srcMid(i)} H ${colModel - 26} V ${axis} H ${colModel}`;
            return (
              <g key={`src-${i}`}>
                <Edge d={d} kind="sync" head={i === 1} flow={i === 1} />
                <Packet path={d} dur={2} begin={i * 0.6} enabled={motion} />
              </g>
            );
          })}

          {/* ---- Model layers ---- */}
          <Node
            x={colModel}
            y={axis - 23}
            w={wModel}
            h={46}
            label="Modelled"
            detail="staging → core marts"
            kind="service"
            state="active"
            active
            step="s4"
          />

          <Edge d={`M ${colModel + wModel},${axis} H ${colMart}`} kind="sync" flow />
          <Packet
            path={`M ${colModel + wModel},${axis} H ${colMart}`}
            dur={1.2}
            begin={1.2}
            enabled={motion}
          />

          {/* ---- The employer's own payroll joins ---- */}
          <Node
            x={colModel}
            y={224}
            w={wModel}
            h={46}
            label="Your payroll"
            detail="uploaded, never shared"
            kind="external"
            step="s5"
          />

          <Edge
            d={`M ${colModel + wModel},247 H ${colMart + wMart / 2} V ${axis + 23}`}
            kind="sync"
            flow
          />
          <Packet
            path={`M ${colModel + wModel},247 H ${colMart + wMart / 2} V ${axis + 23}`}
            dur={1.6}
            begin={1.8}
            tone="live"
            enabled={motion}
          />

          {/* ---- Where they meet ---- */}
          <Node
            x={colMart}
            y={axis - 23}
            w={wMart}
            h={46}
            label="Benchmark"
            detail="you × market"
            kind="gate"
            state="active"
            active
            phase="q3"
            step="s6"
            centre
          />

          <Edge d={`M ${colMart + wMart},${axis} H ${colOut}`} kind="sync" flow />
          <Packet
            path={`M ${colMart + wMart},${axis} H ${colOut}`}
            dur={1.2}
            begin={2.4}
            enabled={motion}
          />

          {/* ---- The answer, with its provenance ---- */}
          <Boundary x={colOut} y={62} w={130} h={128} label="Answer" step="s7" />

          <text className="dg-note-strong dg-in s7" x={colOut + 14} y={96}>
            you · 21.4%
          </text>
          <text className="dg-note dg-in s8" x={colOut + 14} y={118}>
            sector · 25.0%
          </text>
          <text className="dg-note dg-in s8" x={colOut + 14} y={136}>
            all sectors · 10.9%
          </text>
          <text className="dg-note dg-in s9" x={colOut + 14} y={164}>
            source dataset
          </text>
          <text className="dg-note dg-in s9" x={colOut + 14} y={180}>
            formula version
          </text>

          {/* ---- Governance ---- */}
          <Edge d={`M ${colOut + 65},190 V 224`} kind="sync" flow />
          <Packet
            path={`M ${colOut + 65},190 V 224`}
            dur={1}
            begin={3}
            tone="live"
            enabled={motion}
          />

          <Node
            x={colOut}
            y={224}
            w={wOut}
            h={46}
            label="Governance log"
            detail="hash-chained"
            kind="store"
            state="verified"
            step="s10"
          />

          <text className="dg-note dg-in s11" x={colSource} y={294}>
            Every figure traces to its source dataset and formula version.
          </text>
          <text className="dg-note dg-in s11" x={colSource} y={310}>
            Every decision is logged, and the chain is verified on each request.
          </text>
        </svg>
      )}
    </ExplainerFrame>
  );
}
