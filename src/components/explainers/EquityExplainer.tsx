"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { Defs, Label } from "./parts";

/**
 * Aequitas — the finding, for all four countries.
 *
 * Grouped bars: for each deprivation decile, one bar per live country. The
 * shared pattern (coverage rises with affluence) is visible, while the four
 * series stay separated because the underlying indices are not comparable.
 */
export function EquityExplainer() {
  // Coverage by decile, per country. Each series is scored inside its own
  // country against its own national deprivation index.
  const series = [
    {
      country: "England",
      index: "IMD 2025",
      score: "80.0",
      data: [0.61, 0.66, 0.7, 0.74, 0.77, 0.8, 0.84, 0.87, 0.9, 0.93],
    },
    {
      country: "Ireland",
      index: "Pobal HP 2022",
      score: "55.5",
      data: [0.34, 0.38, 0.42, 0.45, 0.49, 0.53, 0.58, 0.62, 0.67, 0.72],
    },
    {
      country: "Netherlands",
      index: "CBS SES-WOA",
      score: "69.6",
      data: [0.52, 0.56, 0.6, 0.63, 0.67, 0.7, 0.74, 0.78, 0.82, 0.86],
    },
    {
      country: "France",
      index: "F-EDI 2021",
      score: "47.7",
      data: [0.28, 0.32, 0.35, 0.39, 0.42, 0.46, 0.5, 0.54, 0.59, 0.64],
    },
  ];

  const left = 56;
  const baseY = 246;
  const chartH = 176;
  const groupW = 60;
  const groupGap = 4;
  const barW = 12;
  const barGap = 2;

  const groupX = (d: number) => left + d * (groupW + groupGap);
  const scale = (v: number) => v * chartH;

  // Series are distinguished by fill opacity rather than by hue: introducing
  // four new colours would break the grammar, where colour means state.
  const opacity = [0.55, 0.4, 0.28, 0.16];

  return (
    <ExplainerFrame
      kicker="Finding"
      caption="Every country shows the same gradient — the least deprived are best served — but each is scored against its own national index."
      description="A grouped bar chart of transport coverage by deprivation decile for four countries. In every country coverage rises from the most deprived decile to the least deprived: England from 61 to 93 percent, Ireland from 34 to 72, the Netherlands from 52 to 86, and France from 28 to 64. National scores are England 80.0 on IMD 2025, Ireland 55.5 on Pobal HP 2022, the Netherlands 69.6 on CBS SES-WOA and France 47.7 on F-EDI 2021. The scores are not comparable across countries because each deprivation index is constructed differently."
    >
      <svg
        viewBox="0 0 720 400"
        className="explainer-svg"
        role="img"
        aria-label="Transport coverage by deprivation decile across four countries"
      >
        <Defs />

        <Label x={left} y={30} step="s1">
          People within 400 m of a stop · by deprivation decile
        </Label>

        {/* Y scale */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const y = baseY - (tick / 100) * chartH;
          return (
            <g key={tick} className="dg-in s1">
              <line className="dg-grid" x1={left} y1={y} x2={696} y2={y} />
              <text className="dg-tick" x={left - 10} y={y + 4} textAnchor="end">
                {tick}%
              </text>
            </g>
          );
        })}

        <line className="dg-axis" x1={left} y1={baseY} x2={696} y2={baseY} />

        {/* Grouped bars: one group per decile, four series inside it. */}
        {Array.from({ length: 10 }, (_, d) => (
          <g key={d}>
            {series.map((s, si) => {
              const h = scale(s.data[d]);
              return (
                <rect
                  key={s.country}
                  className="dg-bar dg-grow"
                  style={{
                    animationDelay: `${80 + d * 45 + si * 12}ms`,
                    fillOpacity: opacity[si],
                  }}
                  x={groupX(d) + si * (barW + barGap)}
                  y={baseY - h}
                  width={barW}
                  height={h}
                />
              );
            })}
            <text
              className="dg-tick dg-in"
              style={{ animationDelay: `${120 + d * 45}ms` }}
              x={groupX(d) + (4 * (barW + barGap) - barGap) / 2}
              y={baseY + 18}
              textAnchor="middle"
            >
              {d + 1}
            </text>
          </g>
        ))}

        <text className="dg-note dg-in s12" x={left} y={baseY + 40}>
          most deprived
        </text>
        <text className="dg-note dg-in s12" x={696} y={baseY + 40} textAnchor="end">
          least deprived
        </text>

        {/* Legend: series identity plus the index each is scored against. */}
        {series.map((s, i) => {
          const x = left + i * 166;
          return (
            <g key={s.country} className={`dg-in s${13 + Math.min(i, 3)}`}>
              <rect
                className="dg-bar"
                style={{ fillOpacity: opacity[i] }}
                x={x}
                y={314}
                width={11}
                height={11}
              />
              <text className="dg-note-strong" x={x + 18} y={324}>
                {s.country}
              </text>
              <text className="dg-note" x={x + 18} y={342}>
                {s.index}
              </text>
              <text className="dg-note-strong dg-text-signal" x={x + 18} y={362}>
                {s.score}
              </text>
            </g>
          );
        })}

        <text className="dg-note dg-text-warn dg-in s16" x={left} y={386}>
          Scored inside each country — the indices are not comparable, so these numbers never share an axis.
        </text>
      </svg>
    </ExplainerFrame>
  );
}
