"use client";

import { ExplainerFrame } from "./ExplainerFrame";

/**
 * WorkforceGuard AI — the question an HR lead actually has.
 *
 * Not "what is our pay gap" (they know) but "is ours normal here, and can I
 * defend it?". So the diagram is a comparison: the company's number placed
 * against its own country-and-sector benchmark, with the provenance that
 * makes the comparison defensible shown as part of the result, not a footnote.
 */
export function PayGapExplainer() {
  // Illustrative sector benchmarks drawn from the panel's shape: finance sits
  // far above the all-sector mean, which is the point the comparison makes.
  const sectors = [
    { label: "All sectors", gap: 10.9, x: 96 },
    { label: "Manufacturing", gap: 13.2, x: 216 },
    { label: "Health", gap: 17.5, x: 336 },
    { label: "Finance", gap: 25.0, x: 456 },
  ];

  const scale = (gap: number) => 196 - (gap / 28) * 150;

  return (
    <ExplainerFrame
      caption="The company's gap is placed against its own country and sector — with the source of every number attached."
      description="A bar chart of gender pay gap benchmarks by sector: all sectors 10.9 percent, manufacturing 13.2, health 17.5, finance 25.0. A company's own figure of 21.4 percent is plotted against the finance benchmark, showing it sits below its sector but well above the all-sector mean. Each figure carries its Eurostat dataset source and formula version."
    >
      <svg
        viewBox="0 0 720 300"
        className="explainer-svg"
        role="img"
        aria-label="Company pay gap compared against sector benchmarks"
      >
        {/* Baseline and scale */}
        <line className="wg-axis" x1="60" y1="196" x2="660" y2="196" />
        <text className="gx-label" x="60" y="26">GENDER PAY GAP · EU27 · SES</text>

        {[0, 10, 20].map((tick) => (
          <g key={tick}>
            <line
              className="wg-grid"
              x1="60"
              y1={scale(tick)}
              x2="660"
              y2={scale(tick)}
            />
            <text className="wg-tick" x="46" y={scale(tick) + 4}>
              {tick}%
            </text>
          </g>
        ))}

        {/* Sector benchmarks rise in sequence */}
        {sectors.map((sector, i) => (
          <g key={sector.label} className={`wg-bar wg-d${i + 1}`}>
            <rect
              x={sector.x}
              y={scale(sector.gap)}
              width="58"
              height={196 - scale(sector.gap)}
              style={{ "--h": `${196 - scale(sector.gap)}px` } as React.CSSProperties}
            />
            <text className="wg-val" x={sector.x + 29} y={scale(sector.gap) - 8}>
              {sector.gap.toFixed(1)}%
            </text>
            <text className="wg-cat" x={sector.x + 29} y="212">
              {sector.label}
            </text>
          </g>
        ))}

        {/* The company's own figure, arriving last against its sector */}
        <g className="wg-you wg-d5">
          <line className="wg-youline" x1="60" y1={scale(21.4)} x2="660" y2={scale(21.4)} />
          <rect className="wg-youchip" x="556" y={scale(21.4) - 15} width="104" height="30" rx="3" />
          <text className="wg-youtext" x="608" y={scale(21.4) + 5}>
            you · 21.4%
          </text>
        </g>

        {/* Provenance is part of the answer */}
        <g className="wg-prov wg-d6">
          <text className="gx-hash" x="60" y="252">
            source · earn_gr_gpgr2 · formula v3 · reviewed 2026-02
          </text>
          <text className="gx-hash" x="60" y="270">
            below sector benchmark · above all-sector mean · explanation required
          </text>
        </g>
      </svg>
    </ExplainerFrame>
  );
}
