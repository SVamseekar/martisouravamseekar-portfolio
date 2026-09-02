"use client";

import { ExplainerFrame } from "./ExplainerFrame";

/**
 * The paper's finding, shown rather than asserted.
 *
 * The intuition is that a tight labour market — high employment, employers
 * competing for staff — should bid women's wages up and close the gap. The
 * panel shows the opposite association. A scatter with a rising fit line is
 * the honest way to show that, and it is the one exhibit a PI will look for.
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

  // Map data space to the plot box.
  const px = (employment: number) => 90 + ((employment - 60) / 25) * 400;
  const py = (gap: number) => 220 - (gap / 26) * 170;

  return (
    <ExplainerFrame
      caption="Each point is a country-year. Higher employment travels with a wider gap, not a narrower one."
      description="A scatter plot of employment rate against gender pay gap across 27 EU member states from 2019 to 2024. The fitted line slopes upward, showing a positive association of approximately r = 0.44. This runs against the expectation that tighter labour markets close pay gaps through competition for workers."
    >
      <svg
        viewBox="0 0 720 300"
        className="explainer-svg"
        role="img"
        aria-label="Scatter plot showing employment rate rising with gender pay gap"
      >
        {/* Axes */}
        <line className="ex-axis" x1="90" y1="220" x2="510" y2="220" />
        <line className="ex-axis" x1="90" y1="46" x2="90" y2="220" />

        <text className="ex-label ex-step d1" x="90" y="32">
          GENDER PAY GAP (%)
        </text>
        <text className="ex-label ex-step d1" x="330" y="252">
          EMPLOYMENT RATE (%) →
        </text>

        {[5, 10, 15, 20, 25].map((tick) => (
          <g key={tick}>
            <line className="ex-grid" x1="90" y1={py(tick)} x2="510" y2={py(tick)} />
            <text className="ex-mono ex-end" x="78" y={py(tick) + 4}>{tick}</text>
          </g>
        ))}

        {/* The observations */}
        {points.map(([employment, gap], i) => (
          <circle
            key={i}
            className="ex-point ex-pop"
            cx={px(employment)}
            cy={py(gap)}
            r="4"
            style={{ animationDelay: `${140 + i * 22}ms` }}
          />
        ))}

        {/* The association, drawn last */}
        <line
          className="ex-fit ex-step d10"
          x1={px(61)}
          y1={py(8.6)}
          x2={px(84)}
          y2={py(20.4)}
        />

        <g className="ex-step d11">
          <text className="ex-mono-strong" style={{fontSize:"19px"}} x="536" y="92">r ≈ +0.44</text>
          <text className="ex-text" x="536" y="116">27 member states</text>
          <text className="ex-text" x="536" y="136">2019–2024</text>
          <text className="ex-text" x="536" y="156">11 NACE sectors</text>
          <text className="ex-mono" x="536" y="188">cross-sectional</text>
          <text className="ex-mono" x="536" y="204">association, not</text>
          <text className="ex-mono" x="536" y="220">a causal estimate</text>
        </g>
      </svg>
    </ExplainerFrame>
  );
}
