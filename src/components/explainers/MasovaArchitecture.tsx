"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { Boundary, Defs, Label, Node, Route } from "./parts";

/**
 * MaSoVa — the platform as one symmetric left-to-right machine.
 *
 * Every connection is a Route, so every arrow carries traffic: a reader can
 * follow any path and see it used, rather than wondering why one branch moves
 * and its neighbour does not.
 */
export function MasovaArchitecture() {
  const colClient = 24;
  const colGateway = 220;
  const colService = 376;
  const colStore = 566;

  const wClient = 148;
  const wGateway = 112;
  const wService = 150;
  const wStore = 130;

  const clients = [
    { label: "Customer web", detail: "browse · order" },
    { label: "Customer app", detail: "React Native" },
    { label: "Crew app", detail: "driver · cashier" },
    { label: "Kitchen display", detail: "live queue" },
    { label: "Point of sale", detail: "in-store" },
  ];

  const services = [
    { label: "Orders & menu", detail: "catalogue · carts" },
    { label: "Commerce", detail: "pricing · VAT" },
    { label: "Payments", detail: "Stripe · refunds" },
    { label: "Delivery", detail: "tracking · OTP" },
    { label: "Intelligence", detail: "forecasts · agents" },
  ];

  const rowH = 46;
  const rowGap = 12;
  const pitch = rowH + rowGap;
  const topY = 72;
  const axis = topY + (5 * pitch - rowGap) / 2;

  const rowY = (i: number) => topY + i * pitch;
  const rowMid = (i: number) => rowY(i) + rowH / 2;

  // Bus geometry: clients gather on one vertical, the gateway fans out on another.
  const busIn = colGateway - 30;
  const busOut = colService - 30;

  const inPath = (i: number) =>
    `M ${colClient + wClient},${rowMid(i)} H ${busIn} V ${axis} H ${colGateway}`;
  const outPath = (i: number) =>
    `M ${colGateway + wGateway},${axis} H ${busOut} V ${rowMid(i)} H ${colService}`;

  return (
    <ExplainerFrame
      kicker="Architecture"
      caption="Five surfaces, one gateway, five services. Money commits synchronously; everything else learns by event."
      description="Five client surfaces — customer web, customer mobile app, crew app, kitchen display and point of sale — call a single API gateway handling authentication and routing. The gateway fans out to five services: orders and menu, commerce, payments, delivery and intelligence. Orders commit to PostgreSQL synchronously for financial truth, project to MongoDB asynchronously for read models, and use Redis for sessions. Every order state transition publishes to a topic exchange that fans out to the kitchen and crew apps, customer notifications and analytics."
    >
      {({ motion }) => (
        <svg
          viewBox="0 0 720 460"
          className="explainer-svg"
          role="img"
          aria-label="MaSoVa platform architecture: clients, gateway, services and stores"
        >
          <Defs />

          {/* ---------- Clients ---------- */}
          <Label x={colClient} y={54} step="s1">
            Client surfaces
          </Label>
          {clients.map((client, i) => (
            <Node
              key={client.label}
              x={colClient}
              y={rowY(i)}
              w={wClient}
              label={client.label}
              detail={client.detail}
              kind="client"
              step={`s${i + 1}`}
            />
          ))}

          {/* Every surface calls the gateway, and every one shows it. */}
          {clients.map((client, i) => (
            <Route
              key={`in-${client.label}`}
              d={inPath(i)}
              head={i === 2}
              motion={motion}
              dur={2.2}
              begin={i * 0.4}
            />
          ))}

          {/* ---------- Gateway ---------- */}
          <Node
            x={colGateway}
            y={axis - 29}
            w={wGateway}
            h={58}
            label="API gateway"
            detail="auth · routing"
            kind="gate"
            state="active"
            active
            step="s6"
            centre
          />

          {/* ---------- Services ---------- */}
          <Label x={colService} y={54} step="s7">
            Services
          </Label>

          {services.map((service, i) => (
            <Route
              key={`out-${service.label}`}
              d={outPath(i)}
              motion={motion}
              dur={1.7}
              begin={0.3 + i * 0.34}
            />
          ))}

          {services.map((service, i) => (
            <Node
              key={service.label}
              x={colService}
              y={rowY(i)}
              w={wService}
              label={service.label}
              detail={service.detail}
              kind="service"
              active
              phase={`q${i}`}
              step={`s${7 + i}`}
            />
          ))}

          {/* ---------- State ---------- */}
          <Label x={colStore} y={54} step="s12">
            State
          </Label>

          {/* Money commits first, synchronously. */}
          <Route
            d={`M ${colService + wService},${rowMid(0)} H ${colStore}`}
            motion={motion}
            dur={1.1}
            tone="live"
          />
          {/* Read models and sessions follow asynchronously — and are shown doing so. */}
          <Route
            d={`M ${colService + wService},${rowMid(1)} H ${colStore}`}
            kind="async"
            motion={motion}
            dur={1.4}
            begin={0.5}
          />
          <Route
            d={`M ${colService + wService},${rowMid(2)} H ${colStore}`}
            kind="async"
            motion={motion}
            dur={1.4}
            begin={1}
          />

          <Node
            x={colStore}
            y={rowY(0)}
            w={wStore}
            label="PostgreSQL"
            detail="financial · sync"
            kind="store"
            state="verified"
            step="s12"
          />
          <Node
            x={colStore}
            y={rowY(1)}
            w={wStore}
            label="MongoDB"
            detail="read models"
            kind="store"
            step="s13"
          />
          <Node
            x={colStore}
            y={rowY(2)}
            w={wStore}
            label="Redis"
            detail="sessions"
            kind="store"
            step="s13"
          />

          {/* ---------- Events ---------- */}
          <Boundary x={24} y={352} w={672} h={84} label="Events" step="s14" />

          {/* Services publish into the exchange, down the right of the column. */}
          <Route
            d={`M ${colService + wService / 2},${rowY(4) + rowH} V 336 H 118 V 374`}
            kind="async"
            motion={motion}
            dur={2.2}
            begin={0.4}
          />

          <Node
            x={44}
            y={374}
            w={188}
            label="Order exchange"
            detail="11 states · topic fan-out"
            kind="queue"
            active
            phase="q5"
            step="s14"
          />

          {/* The exchange fans out to both consumer groups. */}
          <Route
            d="M 232,397 H 404"
            kind="async"
            motion={motion}
            dur={1.5}
            count={2}
            tone="live"
          />
          <Route
            d="M 536,397 H 548"
            kind="async"
            motion={motion}
            dur={0.7}
            tone="live"
          />

          <Node
            x={404}
            y={374}
            w={132}
            label="Kitchen · crew"
            detail="live updates"
            kind="client"
            step="s15"
          />
          <Node
            x={548}
            y={374}
            w={132}
            label="Customer · analytics"
            detail="push · reporting"
            kind="client"
            step="s16"
          />
        </svg>
      )}
    </ExplainerFrame>
  );
}
