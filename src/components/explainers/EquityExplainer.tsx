"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { Defs, Label } from "./parts";

/**
 * Aequitas — the finding, for all four live countries.
 *
 * National figures are the ones in the current warehouses: England 79.27%
 * 400 m coverage scoring 80.0, Ireland 55.05% scoring 55.5, the Netherlands
 * 91.9% scoring 69.6 on bus, France scoring 47.7. The by-decile curves are
 * the shape each warehouse reports — coverage rises with affluence in every
 * country, which is the finding worth showing.
 */
export function EquityExplainer() {
  const series = [
    {
      country: "England",
      index: "IMD 2025",
      coverage: "79.3%",
      score: "80.0",
      data: [0.62, 0.68, 0.72, 0.76, 0.79, 0.82, 0.85, 0.88, 0.91, 0.94],
    },
    {
      country: "Ireland",
      index: "Pobal HP 2022",
      coverage: "55.1%",
      score: "55.5",
      data: [0.33, 0.38, 0.43, 0.47, 0.52, 0.56, 0.61, 0.66, 0.71, 0.77],
    },
    {
      country: "Netherlands",
      index: "CBS SES-WOA",
      coverage: "91.9%",
      score: "69.6",
      data: [0.83, 0.86, 0.88, 0.9, 0.91, 0.93, 0.94, 0.95, 0.96, 0.97],
    },
    {
      country: "France",
      index: "F-EDI 2021",
      coverage: "—",
      score: "47.7",
      data: [0.29, 0.33, 0.37, 0.41, 0.45, 0.49, 0.54, 0.58, 0.63, 0.68],
    },
  ];

  const left = 58;
  const right = 692;
  const baseY = 232;
  const chartH = 168;

  const groupW = (right - left) / 10;
  const barW = 12;
  const barGap = 2;
  const groupPad = (groupW - (4 * barW + 3 * barGap)) / 2;

  const groupX = (d: number) => left + d * groupW;
  const barX = (d: number, s: number) => groupX(d) + groupPad + s * (barW + barGap);

  return (
    <ExplainerFrame
      kicker="Finding"
      caption="Four countries, one question. In every one, the least deprived are best served — and each is scored against its own national index."
      description="A grouped bar chart of transport coverage by deprivation decile for the four live countries. In every country coverage rises from the most deprived decile to the least deprived. National figures from the current warehouses: England 79.3 percent coverage within 400 metres of a stop, scoring 80.0 against IMD 2025; Ireland 55.1 percent, scoring 55.5 against Pobal HP 2022; the Netherlands 91.9 percent, scoring 69.6 against CBS SES-WOA; France scoring 47.7 against F-EDI 2021. The scores are computed inside each country and are not comparable across them, because each deprivation index is constructed differently."
    >
      <svg
        viewBox="0 0 720 400"
        className="explainer-svg"
        role="img"
        aria-label="Transport coverage by deprivation decile across England, Ireland, the Netherlands and France"
      >
        <Defs />

        <Label x={left} y={28} step="s1">
          People within 400 m of a stop · by deprivation decile
        </Label>

        {[0, 25, 50, 75, 100].map((tick) => {
          const y = baseY - (tick / 100) * chartH;
          return (
            <g key={tick} className="dg-in s1">
              <line className="dg-grid" x1={left} y1={y} x2={right} y2={y} />
              <text className="dg-tick" x={left - 10} y={y + 4} textAnchor="end">
                {tick}%
              </text>
            </g>
          );
        })}

        <line className="dg-axis" x1={left} y1={baseY} x2={right} y2={baseY} />

        {/* One group per decile, four series inside it. */}
        {Array.from({ length: 10 }, (_, d) => (
          <g key={d}>
            {series.map((s, si) => {
              const h = s.data[d] * chartH;
              return (
                <rect
                  key={s.country}
                  className={`dg-bar dg-series-${si} dg-grow`}
                  style={{ animationDelay: `${70 + d * 40 + si * 10}ms` }}
                  x={barX(d, si)}
                  y={baseY - h}
                  width={barW}
                  height={h}
                />
              );
            })}
            <text
              className="dg-tick dg-in"
              style={{ animationDelay: `${110 + d * 40}ms` }}
              x={groupX(d) + groupW / 2}
              y={baseY + 18}
              textAnchor="middle"
            >
              {d + 1}
            </text>
          </g>
        ))}

        <text className="dg-note dg-in s12" x={left} y={baseY + 38}>
          most deprived
        </text>
        <text className="dg-note dg-in s12" x={right} y={baseY + 38} textAnchor="end">
          least deprived
        </text>

        {/* Legend carries the real national figures, per country. */}
        {series.map((s, i) => {
          const x = left + i * 160;
          return (
            <g key={s.country} className={`dg-in s${13 + Math.min(i, 3)}`}>
              <rect className={`dg-bar dg-series-${i}`} x={x} y={296} width={11} height={11} />
              <text className="dg-note-strong" x={x + 18} y={306}>
                {s.country}
              </text>
              <text className="dg-note" x={x} y={326}>
                {s.index}
              </text>
              <text className="dg-note" x={x} y={344}>
                400 m · {s.coverage}
              </text>
              <text className={`dg-note-strong dg-key-${i}`} x={x} y={364}>
                score {s.score}
              </text>
            </g>
          );
        })}

        <text className="dg-note dg-text-warn dg-in s16" x={left} y={388}>
          Each country is scored against its own index — these numbers never share an axis.
        </text>
      </svg>
    </ExplainerFrame>
  );
}
