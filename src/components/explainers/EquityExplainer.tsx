"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { ArrowDefs, Caption, NodeBox, Packet } from "./parts";

/**
 * Aequitas — official sources in, one briefing out, four times over.
 *
 * The discipline is the point: the same pipeline runs per country, and the
 * scores never share an axis because the deprivation indices are not
 * comparable. The wall in the middle of the diagram is that rule, drawn.
 */
export function EquityExplainer() {
  const deciles = [0.52, 0.58, 0.61, 0.66, 0.7, 0.73, 0.79, 0.83, 0.88, 0.91];

  const countries = [
    { name: "England", index: "IMD 2025", score: "80.0" },
    { name: "Ireland", index: "Pobal HP 2022", score: "55.5" },
    { name: "Netherlands", index: "CBS SES-WOA", score: "69.6" },
    { name: "France", index: "F-EDI 2021", score: "47.7" },
  ];

  const baseY = 214;
  const chartH = 132;

  return (
    <ExplainerFrame
      kicker="Method"
      caption="Coverage falls as deprivation rises. The same formula runs in each country — and the scores never share an axis, because the indices are not comparable."
      description="Official GTFS timetables, census small-area geography and the national deprivation index are ingested per country into a DuckDB warehouse where all analytics are pre-computed. A bar chart shows the share of people within 400 metres of a stop by deprivation decile: 52 percent in the most deprived decile rising to 91 percent in the least deprived. Four countries are live with their own deprivation index and score: England 80.0 using IMD 2025, Ireland 55.5 using Pobal HP 2022, the Netherlands 69.6 using CBS SES-WOA, and France 47.7 using F-EDI 2021. Scores are computed inside each country and never plotted on a shared axis."
    >
      {({ motion }) => (
        <svg
          viewBox="0 0 720 300"
          className="explainer-svg"
          role="img"
          aria-label="Transport coverage by deprivation decile, scored separately per country"
        >
          <ArrowDefs />

          {/* ---- Official inputs ---- */}
          <Caption x={16} y={24} delay="d1">
            OFFICIAL SOURCES ONLY
          </Caption>
          <NodeBox x={16} y={34} w={126} h={30} title="GTFS timetables" delay="d1" />
          <NodeBox x={16} y={70} w={126} h={30} title="census geography" delay="d2" />
          <NodeBox x={16} y={106} w={126} h={30} title="deprivation index" delay="d3" />

          <path className="ex-wire" d="M 142,49 Q 176,49 176,85" />
          <path className="ex-wire" d="M 142,85 H 176" />
          <path className="ex-wire" d="M 142,121 Q 176,121 176,85" />
          <path className="ex-wire" d="M 176,85 H 208" markerEnd="url(#ex-arrow)" />

          <Packet path="M 142,49 Q 176,49 176,85 L 206,85" dur={2} enabled={motion} />
          <Packet path="M 142,121 Q 176,121 176,85 L 206,85" dur={2} begin={1} enabled={motion} />

          <NodeBox
            x={216}
            y={64}
            w={128}
            h={42}
            title="pre-compute"
            meta="DuckDB warehouse"
            variant="accent"
            pulse
            delay="d4"
          />
          <text className="ex-mono ex-step d5" x={216} y={124}>
            API is a lookup layer —
          </text>
          <text className="ex-mono ex-step d5" x={216} y={137}>
            it cannot invent a figure
          </text>

          {/* ---- Coverage by decile ---- */}
          <Caption x={16} y={168} delay="d6">
            PEOPLE WITHIN 400 m OF A STOP · BY DEPRIVATION DECILE
          </Caption>

          <line className="ex-axis" x1={16} y1={baseY} x2={392} y2={baseY} />

          {deciles.map((coverage, i) => {
            const h = coverage * chartH;
            return (
              <g key={i} className={`ex-grow d${i + 1}`}>
                <rect
                  x={16 + i * 38}
                  y={baseY - h}
                  width={26}
                  height={h}
                  className="ex-bar"
                />
              </g>
            );
          })}

          <text className="ex-mono ex-step d8" x={16} y={230}>
            most deprived
          </text>
          <text className="ex-mono ex-end ex-step d8" x={392} y={230}>
            least deprived
          </text>
          <text className="ex-mono ex-step d9" x={16} y={252}>
            coverage 52% → 91%
          </text>

          {/* ---- The wall: no cross-country axis ---- */}
          <line
            className="ex-wire"
            x1={430}
            y1={20}
            x2={430}
            y2={286}
            strokeDasharray="4 4"
          />
          <text className="ex-mono ex-text-warn ex-step d10" x={438} y={286}>
            never one axis
          </text>

          {/* ---- Per-country scores ---- */}
          <Caption x={456} y={24} delay="d10">
            SCORED SEPARATELY
          </Caption>
          {countries.map((country, i) => (
            <g key={country.name} className={`ex-step d${10 + i}`}>
              <text className="ex-name" x={456} y={56 + i * 44}>
                {country.name}
              </text>
              <text className="ex-mono" x={456} y={70 + i * 44}>
                {country.index}
              </text>
              <text className="ex-mono-strong ex-end" x={704} y={62 + i * 44}>
                {country.score}
              </text>
              <line
                className="ex-grid"
                x1={456}
                y1={78 + i * 44}
                x2={704}
                y2={78 + i * 44}
              />
            </g>
          ))}

          <text className="ex-mono ex-step d14" x={456} y={252}>
            one formula, applied inside
          </text>
          <text className="ex-mono ex-step d14" x={456} y={266}>
            each country
          </text>
        </svg>
      )}
    </ExplainerFrame>
  );
}
