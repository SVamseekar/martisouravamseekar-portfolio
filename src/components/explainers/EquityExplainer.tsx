"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { ArrowDefs, Caption, NodeBox, Packet } from "./parts";

/**
 * Aequitas — official sources in, one briefing out, four times over.
 *
 * Three bands, stacked and never overlapping: the pipeline across the top,
 * the coverage-by-decile chart in the middle, and the per-country scores on
 * the right behind a wall. The wall is the method rule drawn — scores are
 * computed inside a country and never share an axis.
 */
export function EquityExplainer() {
  const deciles = [0.52, 0.58, 0.61, 0.66, 0.7, 0.73, 0.79, 0.83, 0.88, 0.91];

  const countries = [
    { name: "England", index: "IMD 2025", score: "80.0" },
    { name: "Ireland", index: "Pobal HP 2022", score: "55.5" },
    { name: "Netherlands", index: "CBS SES-WOA", score: "69.6" },
    { name: "France", index: "F-EDI 2021", score: "47.7" },
  ];

  // Chart geometry. Baseline sits well below the pipeline band.
  const chartLeft = 48;
  const barW = 28;
  const barGap = 12;
  const baseY = 366;
  const chartH = 128;

  // The wall divides the page; the score column lives to its right.
  const wallX = 470;

  return (
    <ExplainerFrame
      kicker="Method"
      caption="Official sources in, one briefing per country. Coverage rises with affluence — and scores never share an axis, because the indices are not comparable."
      description="Official GTFS timetables, census small-area geography and the national deprivation index are ingested per country into a DuckDB warehouse where all analytics are pre-computed, so the API is only a lookup layer. A bar chart shows the share of people within 400 metres of a stop by deprivation decile: 52 percent in the most deprived decile rising to 91 percent in the least deprived. Four countries are live, each with its own deprivation index and score: England 80.0 using IMD 2025, Ireland 55.5 using Pobal HP 2022, the Netherlands 69.6 using CBS SES-WOA, and France 47.7 using F-EDI 2021."
    >
      {({ motion }) => (
        <svg
          viewBox="0 0 720 420"
          className="explainer-svg"
          role="img"
          aria-label="Aequitas pipeline, coverage by deprivation decile, and per-country scores"
        >
          <ArrowDefs />

          {/* ================= BAND 1 · pipeline ================= */}
          <Caption x={24} y={22} delay="d1">
            OFFICIAL SOURCES ONLY
          </Caption>

          <NodeBox x={24} y={34} w={140} h={30} title="GTFS timetables" delay="d1" />
          <NodeBox x={24} y={70} w={140} h={30} title="census geography" delay="d2" />
          <NodeBox x={24} y={106} w={140} h={30} title="deprivation index" delay="d3" />

          {/* Converge on the warehouse */}
          <path className="ex-wire" d="M 164,49 Q 200,49 200,85" />
          <path className="ex-wire" d="M 164,85 H 200" />
          <path className="ex-wire" d="M 164,121 Q 200,121 200,85" />
          <path className="ex-wire ex-flow" d="M 200,85 H 236" markerEnd="url(#ex-arrow)" />

          <Packet path="M 164,49 Q 200,49 200,85 L 234,85" dur={2} enabled={motion} />
          <Packet path="M 164,121 Q 200,121 200,85 L 234,85" dur={2} begin={1} enabled={motion} />

          <NodeBox
            x={244}
            y={62}
            w={150}
            h={46}
            title="pre-compute"
            meta="DuckDB warehouse"
            variant="accent"
            pulse
            delay="d4"
          />

          <g className="ex-step d5">
            <text className="ex-mono" x={244} y={128}>
              analytics are pre-computed at build time —
            </text>
            <text className="ex-mono" x={244} y={144}>
              the API is a lookup layer, so it cannot invent a figure
            </text>
          </g>

          {/* Band divider */}
          <line className="ex-grid" x1={24} y1={162} x2={696} y2={162} />

          {/* ================= BAND 2 · coverage chart ================= */}
          <Caption x={24} y={190} delay="d6">
            PEOPLE WITHIN 400 m OF A STOP · BY DEPRIVATION DECILE
          </Caption>

          {/* Y scale */}
          {[0, 50, 100].map((tick) => {
            const y = baseY - (tick / 100) * chartH;
            return (
              <g key={tick} className="ex-step d6">
                <line className="ex-grid" x1={chartLeft} y1={y} x2={wallX - 30} y2={y} />
                <text className="ex-mono ex-end" x={chartLeft - 8} y={y + 4}>
                  {tick}%
                </text>
              </g>
            );
          })}

          <line className="ex-axis" x1={chartLeft} y1={baseY} x2={wallX - 30} y2={baseY} />

          {deciles.map((coverage, i) => {
            const h = coverage * chartH;
            return (
              <g key={i} className={`ex-grow d${i + 1}`}>
                <rect
                  x={chartLeft + i * (barW + barGap)}
                  y={baseY - h}
                  width={barW}
                  height={h}
                  className="ex-bar"
                />
              </g>
            );
          })}

          {/* Decile numbers under each bar */}
          {deciles.map((_, i) => (
            <text
              key={`lab-${i}`}
              className={`ex-mono ex-mid ex-step d${i + 1}`}
              x={chartLeft + i * (barW + barGap) + barW / 2}
              y={baseY + 16}
            >
              {i + 1}
            </text>
          ))}

          <g className="ex-step d9">
            <text className="ex-mono" x={chartLeft} y={baseY + 36}>
              most deprived
            </text>
            <text className="ex-mono ex-end" x={wallX - 30} y={baseY + 36}>
              least deprived
            </text>
          </g>

          {/* ================= The wall ================= */}
          <line
            className="ex-wire"
            x1={wallX}
            y1={24}
            x2={wallX}
            y2={400}
            strokeDasharray="5 5"
          />

          {/* ================= BAND 3 · per-country scores ================= */}
          <Caption x={wallX + 26} y={22} delay="d10">
            SCORED SEPARATELY
          </Caption>

          {countries.map((country, i) => {
            const y = 56 + i * 62;
            return (
              <g key={country.name} className={`ex-step d${10 + i}`}>
                <text className="ex-name" x={wallX + 26} y={y}>
                  {country.name}
                </text>
                <text className="ex-mono" x={wallX + 26} y={y + 16}>
                  {country.index}
                </text>
                <text className="ex-mono-strong ex-end" x={696} y={y + 6}>
                  {country.score}
                </text>
                <line
                  className="ex-grid"
                  x1={wallX + 26}
                  y1={y + 30}
                  x2={696}
                  y2={y + 30}
                />
              </g>
            );
          })}

          <g className="ex-step d14">
            <text className="ex-mono" x={wallX + 26} y={332}>
              one formula, applied
            </text>
            <text className="ex-mono" x={wallX + 26} y={348}>
              inside each country
            </text>
            <text className="ex-mono ex-text-warn" x={wallX + 26} y={378}>
              never one axis
            </text>
          </g>
        </svg>
      )}
    </ExplainerFrame>
  );
}
