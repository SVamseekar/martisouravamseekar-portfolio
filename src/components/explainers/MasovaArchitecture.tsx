"use client";

import { ExplainerFrame } from "./ExplainerFrame";
import { ArrowDefs, Caption, NodeBox, Packet } from "./parts";

/**
 * MaSoVa — the whole platform, not just the order queue.
 *
 * Six Spring Boot services behind one gateway, with their real ports and
 * controller counts, the dual-write data path, the event exchange, and the
 * five client surfaces that consume it. Requests travel the actual routes:
 * client → gateway → service → store, and events fan out to the apps.
 */
export function MasovaArchitecture() {
  // Routes packets travel. Kept as constants so the wires and the motion
  // paths can never drift apart.
  const toGateway = "M 150,150 H 236";
  const gatewayToCore = "M 322,132 H 392";
  const gatewayToCommerce = "M 322,150 H 392";
  const gatewayToPayment = "M 322,168 H 392";
  const coreToPg = "M 500,132 H 566";
  const busFanout = "M 260,375 H 428";

  const services = [
    { title: "core", meta: ":8085 · 15 controllers", y: 60, phase: "p0" },
    { title: "commerce", meta: ":8084 · 11 controllers", y: 112, phase: "p1" },
    { title: "payment", meta: ":8089 · 4 controllers", y: 164, phase: "p2" },
    { title: "logistics", meta: ":8086 · 6 controllers", y: 216, phase: "p3" },
  ];

  return (
    <ExplainerFrame
      kicker="Architecture"
      caption="Six services behind one gateway. Orders commit to PostgreSQL first, then fan out as events to the kitchen, crew and customer apps."
      description="MaSoVa architecture. Five client surfaces — customer web, customer mobile, crew app, kitchen display and POS — call a Spring Cloud Gateway on port 8080. The gateway routes to six Spring Boot services: core on 8085 with 15 controllers, commerce on 8084 with 11, payment on 8089 with 4, logistics on 8086 with 6, and intelligence on 8087. Services dual-write to PostgreSQL synchronously for financial truth and MongoDB asynchronously for read models, with Redis holding auth sessions. Every order state transition publishes to a RabbitMQ topic exchange, which fans out to the kitchen display, crew app and customer notifications."
    >
      {({ motion }) => (
        <svg
          viewBox="0 0 720 400"
          className="explainer-svg"
          role="img"
          aria-label="MaSoVa platform architecture with six services and event fan-out"
        >
          <ArrowDefs />

          {/* ---- Clients ---- */}
          <Caption x={16} y={20} delay="d1">
            CLIENTS
          </Caption>
          <NodeBox x={16} y={30} w={118} h={30} title="customer web" delay="d1" />
          <NodeBox x={16} y={66} w={118} h={30} title="customer app" sub="" delay="d2" />
          <NodeBox x={16} y={102} w={118} h={30} title="crew app" delay="d3" />
          <NodeBox x={16} y={138} w={118} h={30} title="kitchen display" delay="d4" />
          <NodeBox x={16} y={174} w={118} h={30} title="POS" delay="d5" />

          {/* Client traffic converging on the gateway */}
          <path className="ex-wire" d="M 134,45 Q 190,45 190,150" />
          <path className="ex-wire" d="M 134,81 Q 190,81 190,150" />
          <path className="ex-wire" d="M 134,117 Q 190,117 190,150" />
          <path className="ex-wire" d="M 134,153 H 190" />
          <path className="ex-wire" d="M 134,189 Q 190,189 190,150" />
          <path className="ex-wire" d={toGateway} markerEnd="url(#ex-arrow)" />

          <Packet path="M 134,45 Q 190,45 190,150 L 236,150" dur={2.6} enabled={motion} />
          <Packet path="M 134,117 Q 190,117 190,150 L 236,150" dur={2.6} begin={1.3} enabled={motion} />

          {/* ---- Gateway ---- */}
          <NodeBox
            x={236}
            y={122}
            w={86}
            h={56}
            title="gateway"
            meta=":8080 · JWT"
            variant="accent"
            pulse
            delay="d6"
          />

          {/* ---- Services ---- */}
          <Caption x={392} y={48} delay="d7">
            SERVICES · SPRING BOOT 3 · JAVA 21
          </Caption>
          {services.map((service, i) => (
            <NodeBox
              key={service.title}
              x={392}
              y={service.y}
              w={108}
              h={40}
              title={service.title}
              meta={service.meta}
              pulse
              phase={service.phase}
              delay={`d${7 + i}`}
            />
          ))}
          <NodeBox
            x={392}
            y={268}
            w={108}
            h={40}
            title="intelligence"
            meta=":8087 · 8 agents"
            pulse
            phase="p4"
            delay="d11"
          />

          {/* Gateway → services */}
          <path className="ex-wire" d={gatewayToCore} markerEnd="url(#ex-arrow)" />
          <path className="ex-wire" d={gatewayToCommerce} markerEnd="url(#ex-arrow)" />
          <path className="ex-wire" d={gatewayToPayment} markerEnd="url(#ex-arrow)" />
          <path className="ex-wire" d="M 322,160 Q 356,236 392,236" markerEnd="url(#ex-arrow)" />
          <path className="ex-wire-soft" d="M 322,172 Q 350,288 392,288" markerEnd="url(#ex-arrow)" />

          <Packet path={gatewayToCore} dur={1.1} begin={0.6} enabled={motion} />
          <Packet path={gatewayToCommerce} dur={1.1} begin={1.4} enabled={motion} />
          <Packet path={gatewayToPayment} dur={1.1} begin={2.1} enabled={motion} />

          {/* ---- Stores: dual write ---- */}
          <Caption x={566} y={48} delay="d9">
            DATA
          </Caption>
          <NodeBox
            x={566}
            y={60}
            w={138}
            h={40}
            title="PostgreSQL"
            meta="financial · sync"
            delay="d9"
          />
          <NodeBox
            x={566}
            y={110}
            w={138}
            h={38}
            title="MongoDB"
            meta="read models · async"
            variant="sunk"
            delay="d10"
          />
          <NodeBox
            x={566}
            y={158}
            w={138}
            h={38}
            title="Redis"
            meta="sessions"
            variant="sunk"
            delay="d10"
          />

          <path className="ex-wire" d={coreToPg} markerEnd="url(#ex-arrow)" />
          <path className="ex-wire-soft" d="M 500,142 Q 534,130 566,130" markerEnd="url(#ex-arrow)" />
          <path className="ex-wire-soft" d="M 500,152 Q 534,177 566,177" markerEnd="url(#ex-arrow)" />
          <Packet path={coreToPg} dur={0.9} begin={0.9} tone="live" enabled={motion} />

          {/* ---- Event bus and fan-out, on its own band ---- */}
          <line className="ex-grid" x1={16} y1={330} x2={704} y2={330} />
          <Caption x={16} y={352} delay="d12">
            EVENTS · EVERY STATE TRANSITION PUBLISHES
          </Caption>
          <NodeBox
            x={16}
            y={358}
            w={244}
            h={34}
            title="RabbitMQ topic exchange"
            meta="masova.orders.exchange"
            variant="accent"
            pulse
            phase="p5"
            delay="d12"
          />

          <path className="ex-wire" d="M 260,375 H 430" markerEnd="url(#ex-arrow)" />
          <text className="ex-mono ex-step d13" x={438} y={370}>
            kitchen display · crew · driver
          </text>
          <text className="ex-mono ex-step d14" x={438} y={384}>
            customer push · analytics
          </text>

          <Packet path={busFanout} dur={1.4} tone="live" enabled={motion} />
          <Packet path={busFanout} dur={1.4} begin={0.5} tone="live" enabled={motion} />

          {/* Services publish into the bus */}
          <path
            className="ex-wire-soft"
            d="M 446,308 Q 446,344 260,368"
            markerEnd="url(#ex-arrow)"
          />
        </svg>
      )}
    </ExplainerFrame>
  );
}
