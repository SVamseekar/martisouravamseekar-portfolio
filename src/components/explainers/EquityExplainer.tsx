"use client";

import { ExplainerFrame } from "./ExplainerFrame";

/**
 * Aequitas — who is underserved, and the discipline behind the answer.
 *
 * The visual is deprivation deciles with service coverage laid over them, so
 * the gap between "most deprived" and "served" is something you see rather
 * than read. The in-country rule matters as much as the score, so the barrier
 * between countries is drawn explicitly.
 */
export function EquityExplainer() {
  // Deciles 1 (most deprived) to 10. Coverage falls as deprivation rises —
  // the pattern the briefing exists to quantify.
  const deciles = [
    { d: 1, coverage: 0.52 },
    { d: 2, coverage: 0.58 },
    { d: 3, coverage: 0.61 },
    { d: 4, coverage: 0.66 },
    { d: 5, coverage: 0.7 },
    { d: 6, coverage: 0.73 },
    { d: 7, coverage: 0.79 },
    { d: 8, coverage: 0.83 },
    { d: 9, coverage: 0.88 },
    { d: 10, coverage: 0.91 },
  ];

  return (
    <ExplainerFrame
      caption="Service coverage against deprivation decile — inside one country. Scores are never compared across borders."
      description="A bar chart showing the share of people within 400 metres of a stop, by deprivation decile, inside a single country. Coverage rises from 52 percent in the most deprived decile to 91 percent in the least deprived. Four countries are live — England, Ireland, the Netherlands and France — each scored with the same formula but never plotted on a shared axis, because their deprivation indices are not comparable."
    >
      <svg
        viewBox="0 0 720 300"
        className="explainer-svg"
        role="img"
        aria-label="Transport coverage by deprivation decile within one country"
      >
        <text className="gx-label aq-d1" x="52" y="22">
          PEOPLE WITHIN 400 m OF A STOP · BY DEPRIVATION DECILE
        </text>

        <line className="wg-axis" x1="52" y1="200" x2="470" y2="200" />

        {deciles.map((item, i) => {
          const x = 52 + i * 42;
          const h = item.coverage * 150;
          return (
            <g key={item.d} className={`aq-bar aq-d${i + 1}`}>
              <rect
                x={x}
                y={200 - h}
                width="28"
                height={h}
                style={{ "--h": `${h}px` } as React.CSSProperties}
              />
              <text className="wg-cat" x={x + 14} y="216">
                {item.d}
              </text>
            </g>
          );
        })}

        <text className="gx-hash aq-d11" x="52" y="238">
          most deprived
        </text>
        <text className="gx-hash aq-d11" x="404" y="238">
          least deprived
        </text>

        {/* The in-country rule, drawn as a wall rather than stated as a caveat */}
        <line className="aq-wall aq-d12" x1="512" y1="30" x2="512" y2="270" />

        <g className="aq-countries aq-d12">
          <text className="gx-label" x="536" y="52">SCORED SEPARATELY</text>

          {[
            { c: "England", s: "80.0" },
            { c: "Ireland", s: "55.5" },
            { c: "Netherlands", s: "69.6" },
            { c: "France", s: "47.7" },
          ].map((row, i) => (
            <g key={row.c}>
              <text className="gx-sub" x="536" y={84 + i * 26}>
                {row.c}
              </text>
              <text className="aq-score" x="678" y={84 + i * 26}>
                {row.s}
              </text>
            </g>
          ))}

          <text className="gx-hash" x="536" y="212">
            one formula, applied
          </text>
          <text className="gx-hash" x="536" y="228">
            inside each country —
          </text>
          <text className="gx-hash" x="536" y="244">
            never on one axis
          </text>
        </g>
      </svg>
    </ExplainerFrame>
  );
}
