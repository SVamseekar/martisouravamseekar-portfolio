"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { Boundary, Defs, Label } from "./parts";

/**
 * The paper's finding — a measurement, drawn as a measurement.
 *
 * The intuition is that a tight labour market bids women's wages up and closes
 * the gap. The panel shows the opposite association, so the fitted line uses
 * the warn colour: this is the result that contradicts the expectation.
 */
export function FindingExplainer() {
  // Illustrative country-year points reproducing the reported association
  // (r ≈ +0.44). Shape is representative; the paper holds the estimates.
  const points = [
    [62, 8.1], [64, 6.4], [65, 11.2], [66, 9.0], [67, 12.8],
    [68, 10.1], [69, 13.9], [70, 11.5], [70, 15.2], [71, 9.8],
    [72, 14.1], [72, 17.0], [73, 12.2], [74, 16.4], [74, 11.0],
    [75, 18.1], [76, 14.8], [76, 19.6], [77, 13.4], [78, 17.2],
    [79, 20.3], [80, 15.9], [81, 18.8], [82, 21.4], [83, 17.6],
    [76, 22.1], [69, 7.2], [71, 19.4],
  ] as const;

  const plotL = 72;
  const plotR = 470;
  const plotT = 56;
  const plotB = 250;

  const px = (employment: number) =>
    plotL + ((employment - 60) / 25) * (plotR - plotL);
  const py = (gap: number) => plotB - (gap / 26) * (plotB - plotT);

  return (
    <ExplainerFrame
      kicker="Finding"
      caption="Each point is a country-year. Where employment is higher, the pay gap is wider — the opposite of what competition for workers is supposed to produce."
      description="A scatter plot of employment rate against gender pay gap across 27 EU member states from 2019 to 2024, covering 11 NACE sectors. The fitted line slopes upward, showing a positive association of approximately r = 0.44. This runs against the expectation that tighter labour markets close pay gaps through competition for workers. The association is cross-sectional and does not identify a causal effect."
    >
      <svg
        viewBox="0 0 720 320"
        className="explainer-svg"
        role="img"
        aria-label="Scatter plot showing the gender pay gap widening as employment rises"
      >
        <Defs />

        <Label x={plotL} y={32} step="s1">
          Gender pay gap (%) against employment rate (%)
        </Label>

        {/* Scale */}
        {[5, 10, 15, 20, 25].map((tick) => (
          <g key={tick} className="dg-in s1">
            <line className="dg-grid" x1={plotL} y1={py(tick)} x2={plotR} y2={py(tick)} />
            <text className="dg-tick" x={plotL - 10} y={py(tick) + 4} textAnchor="end">
              {tick}
            </text>
          </g>
        ))}

        <line className="dg-axis" x1={plotL} y1={plotB} x2={plotR} y2={plotB} />
        <line className="dg-axis" x1={plotL} y1={plotT} x2={plotL} y2={plotB} />

        {[65, 70, 75, 80].map((tick) => (
          <text
            key={tick}
            className="dg-tick dg-in s1"
            x={px(tick)}
            y={plotB + 18}
            textAnchor="middle"
          >
            {tick}
          </text>
        ))}

        {/* Observations */}
        {points.map(([employment, gap], i) => (
          <circle
            key={i}
            className="dg-point dg-pop"
            cx={px(employment)}
            cy={py(gap)}
            r="4.5"
            style={{ animationDelay: `${120 + i * 20}ms` }}
          />
        ))}

        {/* The association, drawn last — warn-coloured: it contradicts theory. */}
        <line
          className="dg-fit dg-in s14"
          x1={px(61)}
          y1={py(8.6)}
          x2={px(84)}
          y2={py(20.4)}
        />

        {/* The result */}
        <Boundary x={506} y={56} w={190} h={130} label="Association" step="s15" />

        <text className="dg-note-strong dg-in s15" x={524} y={98} style={{ fontSize: "20px" }}>
          r ≈ +0.44
        </text>
        <text className="dg-note dg-in s15" x={524} y={124}>
          27 member states
        </text>
        <text className="dg-note dg-in s16" x={524} y={142}>
          2019–2024
        </text>
        <text className="dg-note dg-in s16" x={524} y={160}>
          11 NACE sectors
        </text>

        <text className="dg-note dg-text-warn dg-in s16" x={506} y={212}>
          Cross-sectional association.
        </text>
        <text className="dg-note dg-in s16" x={506} y={230}>
          Not a causal estimate.
        </text>

        <text className="dg-note dg-in s16" x={plotL} y={296}>
          Higher employment travels with a wider gap — not a narrower one.
        </text>
      </svg>
    </ExplainerFrame>
  );
}
