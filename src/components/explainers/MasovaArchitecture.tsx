"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { Boundary, Defs, Edge, Label, Node, Packet } from "./parts";

/**
 * MaSoVa — the platform, laid out as a symmetric left-to-right flow.
 *
 * Services are named for what they do rather than for their module name, and
 * local port numbers are omitted: they describe a developer's laptop, not the
 * architecture. Columns are evenly spaced and vertically centred on a shared
 * axis so the diagram reads as one machine.
 */
export function MasovaArchitecture() {
  // Column geometry — fixed x positions keep the three bands aligned.
  const colClient = 24;
  const colGateway = 214;
  const colService = 376;
  const colStore = 566;

  const wClient = 140;
  const wGateway = 118;
  const wService = 150;
  const wStore = 130;

  // Five clients and five services, both centred on the same axis (y = 190).
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

  return (
    <ExplainerFrame
      kicker="Architecture"
      caption="Five surfaces, one gateway, five services. Money commits synchronously; everything else learns by event."
      description="Five client surfaces — customer web, customer mobile app, crew app, kitchen display and point of sale — call a single API gateway that handles authentication and routing. The gateway fans out to five services: orders and menu, commerce covering pricing and VAT, payments, delivery, and intelligence. Services write to PostgreSQL synchronously for financial records, project to MongoDB asynchronously for read models, and use Redis for sessions. Every order state transition publishes to a topic exchange, which fans out to the kitchen display, crew app, customer notifications and analytics."
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

          {/* Clients converge on the gateway — fan-in. */}
          {clients.map((_, i) => (
            <Edge
              key={`in-${i}`}
              d={`M ${colClient + wClient},${rowMid(i)} H ${colGateway - 28} V ${axis} H ${colGateway}`}
              kind="sync"
              head={i === 2}
              flow={i === 2}
            />
          ))}

          <Packet
            path={`M ${colClient + wClient},${rowMid(0)} H ${colGateway - 28} V ${axis} H ${colGateway}`}
            dur={2.4}
            count={2}
            enabled={motion}
          />
          <Packet
            path={`M ${colClient + wClient},${rowMid(3)} H ${colGateway - 28} V ${axis} H ${colGateway}`}
            dur={2.4}
            begin={0.8}
            enabled={motion}
          />

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

          {/* Gateway fans out to the services. */}
          {services.map((_, i) => (
            <Edge
              key={`out-${i}`}
              d={`M ${colGateway + wGateway},${axis} H ${colService - 28} V ${rowMid(i)} H ${colService}`}
              kind="sync"
              flow={i < 3}
            />
          ))}

          <Packet
            path={`M ${colGateway + wGateway},${axis} H ${colService - 28} V ${rowMid(0)} H ${colService}`}
            dur={1.6}
            begin={0.4}
            enabled={motion}
          />
          <Packet
            path={`M ${colGateway + wGateway},${axis} H ${colService - 28} V ${rowMid(2)} H ${colService}`}
            dur={1.6}
            begin={1.1}
            enabled={motion}
          />
          <Packet
            path={`M ${colGateway + wGateway},${axis} H ${colService - 28} V ${rowMid(4)} H ${colService}`}
            dur={1.6}
            begin={1.8}
            enabled={motion}
          />

          {/* ---------- Services ---------- */}
          <Label x={colService} y={54} step="s7">
            Services
          </Label>
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

          {/* ---------- Stores ---------- */}
          <Label x={colStore} y={54} step="s12">
            State
          </Label>
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

          {/* Money commits synchronously; projections follow asynchronously. */}
          <Edge
            d={`M ${colService + wService},${rowMid(0)} H ${colStore}`}
            kind="sync"
            flow
          />
          <Packet
            path={`M ${colService + wService},${rowMid(0)} H ${colStore}`}
            dur={1.2}
            tone="live"
            enabled={motion}
          />

          <Edge
            d={`M ${colService + wService},${rowMid(1)} H ${colStore}`}
            kind="async"
          />
          <Edge
            d={`M ${colService + wService},${rowMid(2)} H ${colStore}`}
            kind="async"
          />

          {/* ---------- Event band ---------- */}
          <Boundary x={24} y={352} w={672} h={84} label="Events" step="s14" />

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

          {/* Services publish into the exchange. */}
          <Edge
            d={`M ${colService + wService / 2},${rowY(4) + 46} V 338 H 138 V 374`}
            kind="async"
            flow
          />
          <Packet
            path={`M ${colService + wService / 2},${rowY(4) + 46} V 338 H 138 V 374`}
            dur={2}
            begin={0.6}
            enabled={motion}
          />

          {/* The exchange fans out to every surface that cares. */}
          <Edge d="M 232,397 H 396" kind="async" flow />
          <Packet path="M 232,397 H 396" dur={1.5} count={2} tone="live" enabled={motion} />

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

          <Edge d="M 536,397 H 548" kind="async" head={false} />
        </svg>
      )}
    </ExplainerFrame>
  );
}
