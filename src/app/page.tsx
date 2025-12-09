'use client';

import React, { useEffect, useState, useRef } from 'react';

// ============================================
// ARCHITECTURE DIAGRAM COMPONENTS
// ============================================

// Interactive Architecture Node Component
interface ArchNode {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  subtitle: string;
  gradient: string;
  details: string;
}

const InteractiveNode = ({
  node,
  hoveredNode,
  setHoveredNode,
  setSelectedNode
}: {
  node: ArchNode;
  hoveredNode: string | null;
  setHoveredNode: (id: string | null) => void;
  setSelectedNode: (node: ArchNode | null) => void;
}) => {
  const isHovered = hoveredNode === node.id;
  return (
    <g
      className="cursor-pointer transition-all duration-300"
      style={{
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        transformOrigin: `${node.x + node.width/2}px ${node.y + node.height/2}px`
      }}
      onMouseEnter={() => setHoveredNode(node.id)}
      onMouseLeave={() => setHoveredNode(null)}
      onClick={() => setSelectedNode(node)}
    >
      <rect
        x={node.x}
        y={node.y}
        width={node.width}
        height={node.height}
        rx="8"
        fill={`url(#${node.gradient})`}
        opacity={isHovered ? 1 : 0.85}
        stroke={isHovered ? '#fff' : 'transparent'}
        strokeWidth={isHovered ? 2 : 0}
      />
      <text x={node.x + node.width/2} y={node.y + node.height/2 - 5} textAnchor="middle" className="fill-white font-semibold pointer-events-none" style={{fontSize: '11px'}}>{node.title}</text>
      <text x={node.x + node.width/2} y={node.y + node.height/2 + 12} textAnchor="middle" className="fill-white/70 pointer-events-none" style={{fontSize: '9px'}}>{node.subtitle}</text>
    </g>
  );
};

// MaSoVa Microservices Architecture Diagram - Interactive Version
const MaSoVaArchitectureDiagram = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<ArchNode | null>(null);

  const clientNodes: ArchNode[] = [
    { id: 'react', x: 160, y: 90, width: 110, height: 50, title: 'React 18', subtitle: 'RTK Query', gradient: 'clientGrad', details: 'Modern React SPA with Redux Toolkit Query for efficient data fetching, caching, and state management.' },
    { id: 'kitchen', x: 290, y: 90, width: 110, height: 50, title: 'Kitchen Display', subtitle: 'Real-time', gradient: 'clientGrad', details: 'Real-time kitchen display system for order management with WebSocket updates for instant notifications.' },
    { id: 'driver', x: 420, y: 90, width: 110, height: 50, title: 'Driver App', subtitle: 'GPS Tracking', gradient: 'clientGrad', details: 'Mobile-first driver application with real-time GPS tracking, route optimization, and delivery status updates.' },
    { id: 'customer', x: 550, y: 90, width: 110, height: 50, title: 'Customer App', subtitle: 'Order Tracking', gradient: 'clientGrad', details: 'Customer-facing app with live order tracking, push notifications, and delivery ETA updates.' },
  ];

  const serviceNodes: ArchNode[] = [
    { id: 'user', x: 30, y: 310, width: 120, height: 60, title: 'User Service', subtitle: 'Auth • Roles • JWT', gradient: 'serviceGrad', details: 'Handles authentication, role-based access control, JWT token management, and user profile operations.' },
    { id: 'order', x: 165, y: 310, width: 120, height: 60, title: 'Order Service', subtitle: '6-Stage Lifecycle', gradient: 'serviceGrad', details: 'Manages complete order lifecycle: RECEIVED → PREPARING → OVEN → BAKED → DISPATCHED → DELIVERED with event sourcing.' },
    { id: 'menu', x: 300, y: 310, width: 120, height: 60, title: 'Menu Service', subtitle: 'Items • Pricing', gradient: 'serviceGrad', details: 'Dynamic menu management with real-time pricing, item availability, and customization options.' },
    { id: 'payment', x: 435, y: 310, width: 120, height: 60, title: 'Payment Service', subtitle: 'Transactions', gradient: 'serviceGrad', details: 'Secure payment processing with multiple payment methods, refunds, and transaction history.' },
    { id: 'delivery', x: 570, y: 310, width: 120, height: 60, title: 'Delivery Service', subtitle: 'GPS • ETA', gradient: 'serviceGrad', details: 'Delivery tracking with GPS integration, ETA calculation, and driver assignment optimization.' },
    { id: 'analytics', x: 705, y: 310, width: 120, height: 60, title: 'Analytics Service', subtitle: 'Metrics • Reports', gradient: 'serviceGrad', details: 'Business analytics with real-time dashboards, sales metrics, and predictive insights.' },
    { id: 'inventory', x: 165, y: 385, width: 120, height: 60, title: 'Inventory Service', subtitle: 'Stock • Alerts', gradient: 'serviceGrad', details: 'Real-time inventory tracking with low stock alerts, automated reordering, and supplier integration.' },
    { id: 'customerSvc', x: 300, y: 385, width: 120, height: 60, title: 'Customer Service', subtitle: 'Loyalty • Stats', gradient: 'serviceGrad', details: 'Customer loyalty program, order history, preferences, and personalized recommendations.' },
    { id: 'store', x: 435, y: 385, width: 120, height: 60, title: 'Store Service', subtitle: 'Multi-tenant', gradient: 'serviceGrad', details: 'Multi-tenant store management with location-based settings, operating hours, and staff management.' },
  ];

  const dbNodes: ArchNode[] = [
    { id: 'mongo', x: 200, y: 510, width: 150, height: 55, title: 'MongoDB', subtitle: 'Documents • Sharding', gradient: 'dbGrad', details: 'Primary datastore with sharding for horizontal scaling, supporting complex queries and document relationships.' },
    { id: 'redis', x: 375, y: 510, width: 150, height: 55, title: 'Redis Cache', subtitle: 'Sessions • Queues', gradient: 'dbGrad', details: 'In-memory caching for sessions, real-time leaderboards, and message queuing with pub/sub support.' },
    { id: 'eventStore', x: 550, y: 510, width: 150, height: 55, title: 'Event Store', subtitle: 'Audit • Analytics', gradient: 'dbGrad', details: 'Event sourcing store for complete audit trails, analytics events, and system replay capabilities.' },
  ];

  return (
    <div className="relative">
      <svg viewBox="0 0 900 600" className="w-full h-auto" style={{ maxHeight: '500px' }}>
        <defs>
          <linearGradient id="gatewayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="serviceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="dbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
          <linearGradient id="clientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="wsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
          </marker>
        </defs>

        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148,163,184,0.05)" strokeWidth="1"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />

        <text x="450" y="35" textAnchor="middle" className="fill-white text-lg font-bold" style={{fontSize: '18px'}}>MaSoVa Restaurant Platform - Microservices Architecture</text>
        <text x="450" y="55" textAnchor="middle" className="fill-cyan-300/70" style={{fontSize: '11px'}}>Click on any component to see details</text>

        <text x="410" y="75" textAnchor="middle" className="fill-slate-400 text-xs font-semibold" style={{fontSize: '11px'}}>CLIENT LAYER</text>

        {clientNodes.map(node => (
          <InteractiveNode key={node.id} node={node} hoveredNode={hoveredNode} setHoveredNode={setHoveredNode} setSelectedNode={setSelectedNode} />
        ))}

        <line x1="215" y1="140" x2="215" y2="185" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)"/>
        <line x1="345" y1="140" x2="345" y2="185" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)"/>
        <line x1="475" y1="140" x2="475" y2="185" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)"/>
        <line x1="605" y1="140" x2="605" y2="185" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)"/>

        <text x="450" y="175" textAnchor="middle" className="fill-slate-400 text-xs font-semibold" style={{fontSize: '11px'}}>API GATEWAY</text>

        <g
          className="cursor-pointer"
          onMouseEnter={() => setHoveredNode('gateway')}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={() => setSelectedNode({ id: 'gateway', x: 150, y: 190, width: 600, height: 55, title: 'Spring Cloud Gateway', subtitle: 'WebFlux', gradient: 'gatewayGrad', details: 'Reactive API Gateway built on Spring WebFlux. Handles JWT authentication, rate limiting (token bucket), route security with predicates, and load balancing across service instances.' })}
        >
          <rect
            x="150" y="190" width="600" height="55" rx="10"
            fill="url(#gatewayGrad)"
            opacity={hoveredNode === 'gateway' ? 1 : 0.9}
            stroke={hoveredNode === 'gateway' ? '#fff' : 'transparent'}
            strokeWidth={hoveredNode === 'gateway' ? 2 : 0}
          />
          <text x="450" y="215" textAnchor="middle" className="fill-white font-bold pointer-events-none" style={{fontSize: '14px'}}>Spring Cloud Gateway (WebFlux)</text>
          <text x="450" y="232" textAnchor="middle" className="fill-white/70 pointer-events-none" style={{fontSize: '10px'}}>JWT Authentication • Rate Limiting • Route Security • Load Balancing</text>
        </g>

        <g
          className="cursor-pointer"
          onMouseEnter={() => setHoveredNode('websocket')}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={() => setSelectedNode({ id: 'websocket', x: 770, y: 90, width: 110, height: 50, title: 'WebSocket', subtitle: 'STOMP + SockJS', gradient: 'wsGrad', details: 'Real-time bidirectional communication using STOMP protocol over SockJS. Powers live order updates, kitchen notifications, and delivery tracking.' })}
        >
          <rect
            x="770" y="90" width="110" height="50" rx="8"
            fill="url(#wsGrad)"
            opacity={hoveredNode === 'websocket' ? 1 : 0.9}
            stroke={hoveredNode === 'websocket' ? '#fff' : 'transparent'}
            strokeWidth={hoveredNode === 'websocket' ? 2 : 0}
          />
          <text x="825" y="112" textAnchor="middle" className="fill-white font-semibold pointer-events-none" style={{fontSize: '11px'}}>WebSocket</text>
          <text x="825" y="128" textAnchor="middle" className="fill-white/70 pointer-events-none" style={{fontSize: '9px'}}>STOMP + SockJS</text>
        </g>
        <line x1="770" y1="115" x2="750" y2="217" stroke="#ec4899" strokeWidth="2" strokeDasharray="5,3"/>

        <line x1="450" y1="245" x2="450" y2="280" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>

        <text x="450" y="295" textAnchor="middle" className="fill-slate-400 text-xs font-semibold" style={{fontSize: '11px'}}>MICROSERVICES LAYER</text>

        {serviceNodes.map(node => (
          <InteractiveNode key={node.id} node={node} hoveredNode={hoveredNode} setHoveredNode={setHoveredNode} setSelectedNode={setSelectedNode} />
        ))}

        <g
          className="cursor-pointer"
          onMouseEnter={() => setHoveredNode('stateMachine')}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={() => setSelectedNode({ id: 'stateMachine', x: 600, y: 385, width: 250, height: 60, title: 'Order State Machine', subtitle: '6 States', gradient: 'dbGrad', details: 'Spring State Machine implementation managing order lifecycle: RECEIVED (new order) → PREPARING (kitchen started) → OVEN (cooking) → BAKED (ready) → DISPATCHED (out for delivery) → DELIVERED (completed). Each transition triggers events and notifications.' })}
        >
          <rect
            x="600" y="385" width="250" height="60" rx="8"
            fill="rgba(16,185,129,0.15)"
            stroke={hoveredNode === 'stateMachine' ? '#fff' : '#10b981'}
            strokeWidth={hoveredNode === 'stateMachine' ? 2 : 1.5}
          />
          <text x="725" y="405" textAnchor="middle" className="fill-emerald-300 font-semibold pointer-events-none" style={{fontSize: '10px'}}>ORDER STATE MACHINE</text>
          <text x="725" y="422" textAnchor="middle" className="fill-emerald-400/80 pointer-events-none" style={{fontSize: '8px'}}>RECEIVED → PREPARING → OVEN → BAKED</text>
          <text x="725" y="436" textAnchor="middle" className="fill-emerald-400/80 pointer-events-none" style={{fontSize: '8px'}}>→ DISPATCHED → DELIVERED</text>
        </g>

        <line x1="450" y1="445" x2="450" y2="480" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>

        <text x="450" y="495" textAnchor="middle" className="fill-slate-400 text-xs font-semibold" style={{fontSize: '11px'}}>DATA LAYER</text>

        {dbNodes.map(node => (
          <InteractiveNode key={node.id} node={node} hoveredNode={hoveredNode} setHoveredNode={setHoveredNode} setSelectedNode={setSelectedNode} />
        ))}

        <g transform="translate(30, 510)">
          <text x="0" y="10" className="fill-slate-500 font-semibold" style={{fontSize: '9px'}}>LEGEND</text>
          <rect x="0" y="20" width="12" height="12" rx="2" fill="url(#clientGrad)"/>
          <text x="18" y="30" className="fill-slate-400" style={{fontSize: '8px'}}>Client Apps</text>
          <rect x="0" y="38" width="12" height="12" rx="2" fill="url(#serviceGrad)"/>
          <text x="18" y="48" className="fill-slate-400" style={{fontSize: '8px'}}>Microservices</text>
          <rect x="0" y="56" width="12" height="12" rx="2" fill="url(#dbGrad)"/>
          <text x="18" y="66" className="fill-slate-400" style={{fontSize: '8px'}}>Data Stores</text>
        </g>
      </svg>

      {/* Detail Panel */}
      {selectedNode && (
        <div className="absolute top-4 right-4 w-80 rounded-xl border border-white/20 bg-black/90 p-4 backdrop-blur-xl shadow-2xl">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="text-lg font-bold text-white">{selectedNode.title}</h4>
              <p className="text-sm text-cyan-300">{selectedNode.subtitle}</p>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{selectedNode.details}</p>
        </div>
      )}
    </div>
  );
};

// F&O Trading Platform Architecture Diagram - Interactive Version
const FnOTradingArchitectureDiagram = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<ArchNode | null>(null);

  const frontendNodes: ArchNode[] = [
    { id: 'strategyUI', x: 80, y: 90, width: 140, height: 50, title: 'Strategy Scanner UI', subtitle: 'Thymeleaf', gradient: 'clientGrad', details: 'Server-side rendered interface for real-time strategy discovery. Displays Bull/Bear spreads and Iron Condors with live margin calculations and profitability rankings.' },
    { id: 'positionUI', x: 240, y: 90, width: 140, height: 50, title: 'Position Analysis', subtitle: 'Dashboard', gradient: 'clientGrad', details: 'Real-time position tracking dashboard showing P&L, break-even points, max profit/loss, and net exposure across all open positions.' },
    { id: 'orderUI', x: 400, y: 90, width: 140, height: 50, title: 'Order Management', subtitle: 'Execution UI', gradient: 'clientGrad', details: 'Order placement interface with basket management, quantity controls, and real-time order status tracking with recursive polling.' },
    { id: 'oiUI', x: 560, y: 90, width: 140, height: 50, title: 'OI Analysis', subtitle: 'Put-Call Ratio', gradient: 'clientGrad', details: 'Open Interest visualization showing Put-Call ratios, OI distribution across strikes, and support/resistance identification.' },
  ];

  const serviceNodes: ArchNode[] = [
    { id: 'strategyScanner', x: 50, y: 300, width: 155, height: 65, title: 'Strategy Scanner', subtitle: 'Multi-threaded', gradient: 'serviceGrad', details: 'Parallel processing engine evaluating 100+ strike pairs in 3 seconds. 10-thread ExecutorService for margin calculations. Filters by profitability (>2% ROI) and liquidity (trades in last minute).' },
    { id: 'orderExecution', x: 225, y: 300, width: 155, height: 65, title: 'Order Execution', subtitle: 'Position-Aware', gradient: 'serviceGrad', details: 'Intelligent order routing: longs → shorts → futures. Dynamic quantity allocation based on available margin. Automatic hedge protection preventing naked exposures. Recursive order polling with exponential backoff.' },
    { id: 'riskMgmt', x: 400, y: 300, width: 155, height: 65, title: 'Risk Management', subtitle: 'Automated Square-Off', gradient: 'serviceGrad', details: 'Multi-trigger system: profit targets, trailing stop-losses (50%/75%/90% milestones), index boundary exits. Runs every 2 seconds during market hours. Square-off orders execute within milliseconds.' },
    { id: 'positionAnalyzer', x: 575, y: 300, width: 155, height: 65, title: 'Position Analyzer', subtitle: 'P&L Calculator', gradient: 'serviceGrad', details: 'Calculates max profit/loss, dual break-even points, weighted averages, net credits/debits. Real-time MTM tracking. Handles complex multi-leg positions (spreads, Iron Condors).' },
  ];

  const integrationNodes: ArchNode[] = [
    { id: 'zerodha', x: 120, y: 480, width: 200, height: 60, title: 'Zerodha KiteConnect SDK', subtitle: 'Market Data & Orders', gradient: 'dbGrad', details: 'Live market quotes (LTP, bid-ask, OI), order placement/modification, margin calculations, position fetching. Rate limited to 10 req/sec with Bucket4j token bucket.' },
    { id: 'bucket4j', x: 340, y: 480, width: 180, height: 60, title: 'Bucket4j Rate Limiter', subtitle: '10 calls/sec', gradient: 'dbGrad', details: 'Token bucket algorithm enforcing 10 requests/second limit. Prevents API blocks with exponential backoff (1s → 2s → 4s) on 429 errors. Request batching for combined margin calls.' },
    { id: 'mongodb', x: 540, y: 480, width: 180, height: 60, title: 'MongoDB', subtitle: 'Config & History', gradient: 'dbGrad', details: 'Stores strategy configurations, order history, position snapshots, and auto square-off settings. Used for backtesting framework and performance analytics.' },
  ];

  return (
    <div className="relative">
      <svg viewBox="0 0 800 580" className="w-full h-auto" style={{ maxHeight: '500px' }}>
        <defs>
          <linearGradient id="gatewayGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="serviceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="dbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
          <linearGradient id="clientGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
          </marker>
        </defs>

        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148,163,184,0.05)" strokeWidth="1"/>
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />

        <text x="400" y="35" textAnchor="middle" className="fill-white text-lg font-bold" style={{fontSize: '18px'}}>Innosolv F&O Trading Platform - Algorithmic Options Trading</text>
        <text x="400" y="55" textAnchor="middle" className="fill-cyan-300/70" style={{fontSize: '11px'}}>Click on any component to see details</text>

        <text x="400" y="75" textAnchor="middle" className="fill-slate-400 text-xs font-semibold" style={{fontSize: '11px'}}>FRONTEND LAYER (Thymeleaf + HTML/CSS/JS)</text>

        {frontendNodes.map(node => (
          <InteractiveNode key={node.id} node={node} hoveredNode={hoveredNode} setHoveredNode={setHoveredNode} setSelectedNode={setSelectedNode} />
        ))}

        <line x1="150" y1="140" x2="150" y2="175" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)"/>
        <line x1="310" y1="140" x2="310" y2="175" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)"/>
        <line x1="470" y1="140" x2="470" y2="175" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)"/>
        <line x1="630" y1="140" x2="630" y2="175" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)"/>

        <text x="400" y="165" textAnchor="middle" className="fill-slate-400 text-xs font-semibold" style={{fontSize: '11px'}}>SPRING BOOT APPLICATION</text>

        <g
          className="cursor-pointer"
          onMouseEnter={() => setHoveredNode('springBoot')}
          onMouseLeave={() => setHoveredNode(null)}
          onClick={() => setSelectedNode({ id: 'springBoot', x: 100, y: 180, width: 600, height: 55, title: 'Spring Boot 2.5.11 + Java 17', subtitle: 'REST Controllers', gradient: 'gatewayGrad', details: 'Enterprise Java framework managing request routing, dependency injection, and scheduled tasks. Hosts REST controllers for strategy scanning, order execution, position analysis, and risk management. Automated cron jobs run at 7 PM IST for data refresh.' })}
        >
          <rect
            x="100" y="180" width="600" height="55" rx="10"
            fill="url(#gatewayGrad)"
            opacity={hoveredNode === 'springBoot' ? 1 : 0.9}
            stroke={hoveredNode === 'springBoot' ? '#fff' : 'transparent'}
            strokeWidth={hoveredNode === 'springBoot' ? 2 : 0}
          />
          <text x="400" y="205" textAnchor="middle" className="fill-white font-bold pointer-events-none" style={{fontSize: '14px'}}>Spring Boot 2.5.11 + Java 17</text>
          <text x="400" y="222" textAnchor="middle" className="fill-white/70 pointer-events-none" style={{fontSize: '10px'}}>REST Controllers • Scheduled Tasks • Dependency Injection • OkHttp Client</text>
        </g>

        <line x1="400" y1="235" x2="400" y2="270" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)"/>

        <text x="400" y="285" textAnchor="middle" className="fill-slate-400 text-xs font-semibold" style={{fontSize: '11px'}}>SERVICE LAYER</text>

        {serviceNodes.map(node => (
          <InteractiveNode key={node.id} node={node} hoveredNode={hoveredNode} setHoveredNode={setHoveredNode} setSelectedNode={setSelectedNode} />
        ))}

        <line x1="127" y1="365" x2="220" y2="475" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)"/>
        <line x1="302" y1="365" x2="430" y2="475" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)"/>
        <line x1="477" y1="365" x2="430" y2="475" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)"/>
        <line x1="652" y1="365" x2="630" y2="475" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowhead)"/>

        <text x="400" y="465" textAnchor="middle" className="fill-slate-400 text-xs font-semibold" style={{fontSize: '11px'}}>INTEGRATION & PERSISTENCE LAYER</text>

        {integrationNodes.map(node => (
          <InteractiveNode key={node.id} node={node} hoveredNode={hoveredNode} setHoveredNode={setHoveredNode} setSelectedNode={setSelectedNode} />
        ))}

        <g transform="translate(30, 520)">
          <text x="0" y="10" className="fill-slate-500 font-semibold" style={{fontSize: '9px'}}>LEGEND</text>
          <rect x="0" y="20" width="12" height="12" rx="2" fill="url(#clientGrad)"/>
          <text x="18" y="30" className="fill-slate-400" style={{fontSize: '8px'}}>Frontend UI</text>
          <rect x="0" y="38" width="12" height="12" rx="2" fill="url(#serviceGrad)"/>
          <text x="18" y="48" className="fill-slate-400" style={{fontSize: '8px'}}>Business Logic</text>
          <rect x="0" y="56" width="12" height="12" rx="2" fill="url(#dbGrad)"/>
          <text x="18" y="66" className="fill-slate-400" style={{fontSize: '8px'}}>Integration/Storage</text>
        </g>
      </svg>

      {/* Detail Panel */}
      {selectedNode && (
        <div className="absolute top-4 right-4 w-80 rounded-xl border border-white/20 bg-black/90 p-4 backdrop-blur-xl shadow-2xl">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="text-lg font-bold text-white">{selectedNode.title}</h4>
              <p className="text-sm text-cyan-300">{selectedNode.subtitle}</p>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{selectedNode.details}</p>
        </div>
      )}
    </div>
  );
};

// UK Bus Analytics Pipeline Diagram
const BusAnalyticsDiagram = () => (
  <svg viewBox="0 0 900 550" className="w-full h-auto" style={{ maxHeight: '480px' }}>
    <defs>
      {/* Gradients */}
      <linearGradient id="sourceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
      <linearGradient id="etlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
      <linearGradient id="mlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#f43f5e" />
      </linearGradient>
      <linearGradient id="outputGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#14b8a6" />
      </linearGradient>
      <linearGradient id="storageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
      {/* Glow filter */}
      <filter id="glowBus">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      {/* Arrow marker */}
      <marker id="arrowBus" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
      </marker>
      <marker id="arrowPink" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#ec4899" />
      </marker>
    </defs>

    {/* Background grid */}
    <pattern id="gridBus" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148,163,184,0.05)" strokeWidth="1"/>
    </pattern>
    <rect width="100%" height="100%" fill="url(#gridBus)" />

    {/* Title */}
    <text x="450" y="35" textAnchor="middle" className="fill-white text-lg font-bold" style={{fontSize: '18px'}}>UK Bus Analytics Platform - ML Pipeline Architecture</text>
    <text x="450" y="52" textAnchor="middle" className="fill-slate-400" style={{fontSize: '11px'}}>779,262 stops • 9 regions • 57 policy insights</text>

    {/* DATA SOURCES */}
    <text x="90" y="85" textAnchor="middle" className="fill-slate-400 text-xs font-semibold" style={{fontSize: '11px'}}>DATA SOURCES</text>

    <g filter="url(#glowBus)">
      <rect x="30" y="100" width="120" height="50" rx="8" fill="url(#sourceGrad)" opacity="0.9"/>
      <text x="90" y="122" textAnchor="middle" className="fill-white font-semibold" style={{fontSize: '11px'}}>BODS API</text>
      <text x="90" y="138" textAnchor="middle" className="fill-white/70" style={{fontSize: '9px'}}>GTFS • TransXChange</text>
    </g>

    <g filter="url(#glowBus)">
      <rect x="30" y="160" width="120" height="50" rx="8" fill="url(#sourceGrad)" opacity="0.9"/>
      <text x="90" y="182" textAnchor="middle" className="fill-white font-semibold" style={{fontSize: '11px'}}>NaPTAN</text>
      <text x="90" y="198" textAnchor="middle" className="fill-white/70" style={{fontSize: '9px'}}>Stop Coordinates</text>
    </g>

    <g filter="url(#glowBus)">
      <rect x="30" y="220" width="120" height="50" rx="8" fill="url(#sourceGrad)" opacity="0.9"/>
      <text x="90" y="242" textAnchor="middle" className="fill-white font-semibold" style={{fontSize: '11px'}}>ONS Census</text>
      <text x="90" y="258" textAnchor="middle" className="fill-white/70" style={{fontSize: '9px'}}>Demographics 2021</text>
    </g>

    <g filter="url(#glowBus)">
      <rect x="30" y="280" width="120" height="50" rx="8" fill="url(#sourceGrad)" opacity="0.9"/>
      <text x="90" y="302" textAnchor="middle" className="fill-white font-semibold" style={{fontSize: '11px'}}>IMD 2019</text>
      <text x="90" y="318" textAnchor="middle" className="fill-white/70" style={{fontSize: '9px'}}>Deprivation Index</text>
    </g>

    <g filter="url(#glowBus)">
      <rect x="30" y="340" width="120" height="50" rx="8" fill="url(#sourceGrad)" opacity="0.9"/>
      <text x="90" y="362" textAnchor="middle" className="fill-white font-semibold" style={{fontSize: '11px'}}>NOMIS</text>
      <text x="90" y="378" textAnchor="middle" className="fill-white/70" style={{fontSize: '9px'}}>Labour Stats</text>
    </g>

    {/* Arrows from sources to ETL */}
    <line x1="150" y1="125" x2="195" y2="180" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowBus)"/>
    <line x1="150" y1="185" x2="195" y2="200" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowBus)"/>
    <line x1="150" y1="245" x2="195" y2="220" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowBus)"/>
    <line x1="150" y1="305" x2="195" y2="240" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowBus)"/>
    <line x1="150" y1="365" x2="195" y2="260" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowBus)"/>

    {/* ETL PIPELINE */}
    <text x="290" y="85" textAnchor="middle" className="fill-slate-400 text-xs font-semibold" style={{fontSize: '11px'}}>ETL PIPELINE</text>

    <g filter="url(#glowBus)">
      <rect x="200" y="100" width="180" height="200" rx="12" fill="url(#etlGrad)" opacity="0.85"/>
      <text x="290" y="130" textAnchor="middle" className="fill-white font-bold" style={{fontSize: '13px'}}>Data Processing</text>

      <rect x="215" y="145" width="150" height="35" rx="6" fill="rgba(255,255,255,0.15)"/>
      <text x="290" y="167" textAnchor="middle" className="fill-white" style={{fontSize: '10px'}}>BallTree Spatial Join</text>

      <rect x="215" y="190" width="150" height="35" rx="6" fill="rgba(255,255,255,0.15)"/>
      <text x="290" y="212" textAnchor="middle" className="fill-white" style={{fontSize: '10px'}}>LSOA Assignment</text>

      <rect x="215" y="235" width="150" height="35" rx="6" fill="rgba(255,255,255,0.15)"/>
      <text x="290" y="257" textAnchor="middle" className="fill-white" style={{fontSize: '10px'}}>Deduplication</text>

      <text x="290" y="285" textAnchor="middle" className="fill-white/60" style={{fontSize: '9px'}}>5km threshold • Validation</text>
    </g>

    {/* Arrow from ETL to Storage */}
    <line x1="290" y1="300" x2="290" y2="350" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowBus)"/>

    {/* STORAGE */}
    <g filter="url(#glowBus)">
      <rect x="200" y="360" width="180" height="60" rx="10" fill="url(#storageGrad)" opacity="0.85"/>
      <text x="290" y="387" textAnchor="middle" className="fill-white font-bold" style={{fontSize: '12px'}}>Parquet Data Lake</text>
      <text x="290" y="405" textAnchor="middle" className="fill-white/70" style={{fontSize: '10px'}}>Regional Summaries</text>
    </g>

    {/* Arrow from ETL to ML */}
    <line x1="380" y1="200" x2="430" y2="200" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowBus)"/>

    {/* ML LAYER */}
    <text x="540" y="85" textAnchor="middle" className="fill-slate-400 text-xs font-semibold" style={{fontSize: '11px'}}>ML & ANALYTICS</text>

    <g filter="url(#glowBus)">
      <rect x="435" y="100" width="210" height="260" rx="12" fill="url(#mlGrad)" opacity="0.85"/>
      <text x="540" y="128" textAnchor="middle" className="fill-white font-bold" style={{fontSize: '13px'}}>Intelligence Engine</text>

      {/* Route Clustering */}
      <rect x="450" y="140" width="180" height="55" rx="6" fill="rgba(255,255,255,0.15)"/>
      <text x="540" y="160" textAnchor="middle" className="fill-white font-semibold" style={{fontSize: '10px'}}>Route Clustering</text>
      <text x="540" y="175" textAnchor="middle" className="fill-white/70" style={{fontSize: '8px'}}>Sentence-Transformers</text>
      <text x="540" y="188" textAnchor="middle" className="fill-white/70" style={{fontSize: '8px'}}>HDBSCAN • Auto-naming</text>

      {/* Forecasting */}
      <rect x="450" y="205" width="180" height="45" rx="6" fill="rgba(255,255,255,0.15)"/>
      <text x="540" y="225" textAnchor="middle" className="fill-white font-semibold" style={{fontSize: '10px'}}>Demand Forecasting</text>
      <text x="540" y="240" textAnchor="middle" className="fill-white/70" style={{fontSize: '8px'}}>Time-series • Confidence</text>

      {/* Anomaly Detection */}
      <rect x="450" y="260" width="180" height="45" rx="6" fill="rgba(255,255,255,0.15)"/>
      <text x="540" y="280" textAnchor="middle" className="fill-white font-semibold" style={{fontSize: '10px'}}>Anomaly Detection</text>
      <text x="540" y="295" textAnchor="middle" className="fill-white/70" style={{fontSize: '8px'}}>PyOD • Disruption alerts</text>

      {/* BCR Calculator */}
      <rect x="450" y="315" width="180" height="35" rx="6" fill="rgba(255,255,255,0.15)"/>
      <text x="540" y="338" textAnchor="middle" className="fill-white font-semibold" style={{fontSize: '10px'}}>BCR Calculator</text>
    </g>

    {/* Arrow from ML to Output */}
    <line x1="645" y1="200" x2="695" y2="200" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowBus)"/>

    {/* OUTPUT LAYER */}
    <text x="790" y="85" textAnchor="middle" className="fill-slate-400 text-xs font-semibold" style={{fontSize: '11px'}}>OUTPUT LAYER</text>

    <g filter="url(#glowBus)">
      <rect x="700" y="100" width="180" height="70" rx="8" fill="url(#outputGrad)" opacity="0.9"/>
      <text x="790" y="128" textAnchor="middle" className="fill-white font-bold" style={{fontSize: '12px'}}>Streamlit Dashboard</text>
      <text x="790" y="148" textAnchor="middle" className="fill-white/70" style={{fontSize: '9px'}}>Plotly Choropleths</text>
      <text x="790" y="162" textAnchor="middle" className="fill-white/70" style={{fontSize: '9px'}}>8 Analytical Categories</text>
    </g>

    <g filter="url(#glowBus)">
      <rect x="700" y="185" width="180" height="70" rx="8" fill="url(#outputGrad)" opacity="0.9"/>
      <text x="790" y="213" textAnchor="middle" className="fill-white font-bold" style={{fontSize: '12px'}}>NL Query Interface</text>
      <text x="790" y="233" textAnchor="middle" className="fill-white/70" style={{fontSize: '9px'}}>LangChain + LLM</text>
      <text x="790" y="247" textAnchor="middle" className="fill-white/70" style={{fontSize: '9px'}}>Policy Q&A</text>
    </g>

    <g filter="url(#glowBus)">
      <rect x="700" y="270" width="180" height="70" rx="8" fill="url(#outputGrad)" opacity="0.9"/>
      <text x="790" y="298" textAnchor="middle" className="fill-white font-bold" style={{fontSize: '12px'}}>Policy Reports</text>
      <text x="790" y="318" textAnchor="middle" className="fill-white/70" style={{fontSize: '9px'}}>57 Insights Generated</text>
      <text x="790" y="332" textAnchor="middle" className="fill-white/70" style={{fontSize: '9px'}}>Equity • Coverage • Economic</text>
    </g>

    {/* Regions visualization */}
    <g transform="translate(450, 380)">
      <rect x="0" y="0" width="430" height="80" rx="10" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="1"/>
      <text x="215" y="22" textAnchor="middle" className="fill-emerald-300 font-semibold" style={{fontSize: '11px'}}>9 ENGLISH REGIONS COVERED</text>
      <text x="215" y="45" textAnchor="middle" className="fill-emerald-400/80" style={{fontSize: '9px'}}>North East • North West • Yorkshire • East Midlands • West Midlands</text>
      <text x="215" y="62" textAnchor="middle" className="fill-emerald-400/80" style={{fontSize: '9px'}}>East of England • Greater London • South East • South West</text>
    </g>

    {/* Data flow annotation */}
    <g transform="translate(30, 430)">
      <text x="0" y="0" className="fill-slate-500 font-semibold" style={{fontSize: '9px'}}>DATA FLOW</text>
      <line x1="0" y1="15" x2="60" y2="15" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowBus)"/>
      <text x="70" y="19" className="fill-slate-400" style={{fontSize: '8px'}}>Ingestion</text>
      <line x1="120" y1="15" x2="180" y2="15" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowBus)"/>
      <text x="190" y="19" className="fill-slate-400" style={{fontSize: '8px'}}>Transform</text>
      <line x1="240" y1="15" x2="300" y2="15" stroke="#ec4899" strokeWidth="2" markerEnd="url(#arrowBus)"/>
      <text x="310" y="19" className="fill-slate-400" style={{fontSize: '8px'}}>Analyze</text>
    </g>

    {/* Tech stack */}
    <g transform="translate(30, 480)">
      <text x="0" y="0" className="fill-slate-500 font-semibold" style={{fontSize: '9px'}}>TECH STACK</text>
      <text x="0" y="18" className="fill-slate-400" style={{fontSize: '8px'}}>Python • Pandas • Scikit-learn • Sentence-Transformers • HDBSCAN • Streamlit • Plotly • Azure</text>
    </g>
  </svg>
);

// Trading Backend Architecture Diagram
const TradingArchitectureDiagram = () => (
  <svg viewBox="0 0 900 480" className="w-full h-auto" style={{ maxHeight: '420px' }}>
    <defs>
      <linearGradient id="marketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
      <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#14b8a6" />
      </linearGradient>
      <linearGradient id="riskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
      <linearGradient id="execGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
      <linearGradient id="dataGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
      <filter id="glowTrade">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <marker id="arrowTrade" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
      </marker>
    </defs>

    <pattern id="gridTrade" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148,163,184,0.05)" strokeWidth="1"/>
    </pattern>
    <rect width="100%" height="100%" fill="url(#gridTrade)" />

    <text x="450" y="35" textAnchor="middle" className="fill-white text-lg font-bold" style={{fontSize: '18px'}}>Stock & F&O Trading Backend - Low-Latency Architecture</text>
    <text x="450" y="52" textAnchor="middle" className="fill-emerald-400" style={{fontSize: '11px'}}>Production System • Real Revenue • Live Trading</text>

    {/* Market Data Sources */}
    <text x="90" y="85" textAnchor="middle" className="fill-slate-400 text-xs font-semibold" style={{fontSize: '11px'}}>MARKET DATA</text>

    <g filter="url(#glowTrade)">
      <rect x="30" y="100" width="120" height="55" rx="8" fill="url(#marketGrad)" opacity="0.9"/>
      <text x="90" y="125" textAnchor="middle" className="fill-white font-semibold" style={{fontSize: '11px'}}>Broker APIs</text>
      <text x="90" y="143" textAnchor="middle" className="fill-white/70" style={{fontSize: '9px'}}>Price • Order Book</text>
    </g>

    <g filter="url(#glowTrade)">
      <rect x="30" y="170" width="120" height="55" rx="8" fill="url(#marketGrad)" opacity="0.9"/>
      <text x="90" y="195" textAnchor="middle" className="fill-white font-semibold" style={{fontSize: '11px'}}>Exchange Feed</text>
      <text x="90" y="213" textAnchor="middle" className="fill-white/70" style={{fontSize: '9px'}}>Trades • Quotes</text>
    </g>

    {/* Arrows to ingestion */}
    <line x1="150" y1="127" x2="200" y2="160" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowTrade)"/>
    <line x1="150" y1="197" x2="200" y2="180" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowTrade)"/>

    {/* Core Services */}
    <text x="350" y="85" textAnchor="middle" className="fill-slate-400 text-xs font-semibold" style={{fontSize: '11px'}}>SPRING BOOT MICROSERVICES</text>

    {/* Market Data Service */}
    <g filter="url(#glowTrade)">
      <rect x="205" y="100" width="130" height="130" rx="10" fill="url(#coreGrad)" opacity="0.85"/>
      <text x="270" y="125" textAnchor="middle" className="fill-white font-bold" style={{fontSize: '11px'}}>Market Data</text>
      <text x="270" y="142" textAnchor="middle" className="fill-white font-bold" style={{fontSize: '11px'}}>Service</text>
      <rect x="215" y="155" width="110" height="25" rx="4" fill="rgba(255,255,255,0.15)"/>
      <text x="270" y="172" textAnchor="middle" className="fill-white/80" style={{fontSize: '9px'}}>Normalization</text>
      <rect x="215" y="185" width="110" height="25" rx="4" fill="rgba(255,255,255,0.15)"/>
      <text x="270" y="202" textAnchor="middle" className="fill-white/80" style={{fontSize: '9px'}}>Streaming</text>
    </g>

    {/* Order Router */}
    <g filter="url(#glowTrade)">
      <rect x="350" y="100" width="130" height="130" rx="10" fill="url(#execGrad)" opacity="0.85"/>
      <text x="415" y="125" textAnchor="middle" className="fill-white font-bold" style={{fontSize: '11px'}}>Order Router</text>
      <text x="415" y="142" textAnchor="middle" className="fill-white font-bold" style={{fontSize: '11px'}}>Service</text>
      <rect x="360" y="155" width="110" height="25" rx="4" fill="rgba(255,255,255,0.15)"/>
      <text x="415" y="172" textAnchor="middle" className="fill-white/80" style={{fontSize: '9px'}}>Execution Logic</text>
      <rect x="360" y="185" width="110" height="25" rx="4" fill="rgba(255,255,255,0.15)"/>
      <text x="415" y="202" textAnchor="middle" className="fill-white/80" style={{fontSize: '9px'}}>Retry Semantics</text>
    </g>

    {/* Risk Engine */}
    <g filter="url(#glowTrade)">
      <rect x="495" y="100" width="130" height="130" rx="10" fill="url(#riskGrad)" opacity="0.85"/>
      <text x="560" y="125" textAnchor="middle" className="fill-white font-bold" style={{fontSize: '11px'}}>Risk Engine</text>
      <rect x="505" y="145" width="110" height="25" rx="4" fill="rgba(255,255,255,0.15)"/>
      <text x="560" y="162" textAnchor="middle" className="fill-white/80" style={{fontSize: '9px'}}>Position Sizing</text>
      <rect x="505" y="175" width="110" height="25" rx="4" fill="rgba(255,255,255,0.15)"/>
      <text x="560" y="192" textAnchor="middle" className="fill-white/80" style={{fontSize: '9px'}}>Stop Loss Logic</text>
      <rect x="505" y="205" width="110" height="20" rx="4" fill="rgba(255,255,255,0.15)"/>
      <text x="560" y="219" textAnchor="middle" className="fill-white/80" style={{fontSize: '8px'}}>PnL Guards</text>
    </g>

    {/* Auth Service */}
    <g filter="url(#glowTrade)">
      <rect x="640" y="100" width="110" height="65" rx="8" fill="url(#dataGrad)" opacity="0.85"/>
      <text x="695" y="125" textAnchor="middle" className="fill-white font-bold" style={{fontSize: '11px'}}>Auth Service</text>
      <text x="695" y="145" textAnchor="middle" className="fill-white/70" style={{fontSize: '9px'}}>JWT • Sessions</text>
    </g>

    {/* Portfolio Service */}
    <g filter="url(#glowTrade)">
      <rect x="640" y="175" width="110" height="55" rx="8" fill="url(#dataGrad)" opacity="0.85"/>
      <text x="695" y="198" textAnchor="middle" className="fill-white font-bold" style={{fontSize: '11px'}}>Portfolio</text>
      <text x="695" y="215" textAnchor="middle" className="fill-white/70" style={{fontSize: '9px'}}>Holdings • PnL</text>
    </g>

    {/* Connections between services */}
    <line x1="335" y1="165" x2="350" y2="165" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowTrade)"/>
    <line x1="480" y1="165" x2="495" y2="165" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#arrowTrade)"/>
    <line x1="625" y1="132" x2="640" y2="132" stroke="#64748b" strokeWidth="1.5"/>

    {/* Exchange Connection */}
    <g filter="url(#glowTrade)">
      <rect x="770" y="135" width="110" height="55" rx="8" fill="url(#marketGrad)" opacity="0.9"/>
      <text x="825" y="158" textAnchor="middle" className="fill-white font-semibold" style={{fontSize: '11px'}}>Exchange</text>
      <text x="825" y="175" textAnchor="middle" className="fill-white/70" style={{fontSize: '9px'}}>Order Execution</text>
    </g>
    <line x1="625" y1="165" x2="770" y2="162" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arrowTrade)"/>

    {/* Data Layer */}
    <text x="350" y="265" textAnchor="middle" className="fill-slate-400 text-xs font-semibold" style={{fontSize: '11px'}}>DATA & MONITORING</text>

    <g filter="url(#glowTrade)">
      <rect x="205" y="280" width="130" height="55" rx="8" fill="url(#dataGrad)" opacity="0.85"/>
      <text x="270" y="303" textAnchor="middle" className="fill-white font-semibold" style={{fontSize: '11px'}}>PostgreSQL</text>
      <text x="270" y="320" textAnchor="middle" className="fill-white/70" style={{fontSize: '9px'}}>Orders • Trades</text>
    </g>

    <g filter="url(#glowTrade)">
      <rect x="350" y="280" width="130" height="55" rx="8" fill="url(#dataGrad)" opacity="0.85"/>
      <text x="415" y="303" textAnchor="middle" className="fill-white font-semibold" style={{fontSize: '11px'}}>Time-Series DB</text>
      <text x="415" y="320" textAnchor="middle" className="fill-white/70" style={{fontSize: '9px'}}>Market History</text>
    </g>

    <g filter="url(#glowTrade)">
      <rect x="495" y="280" width="130" height="55" rx="8" fill="url(#dataGrad)" opacity="0.85"/>
      <text x="560" y="303" textAnchor="middle" className="fill-white font-semibold" style={{fontSize: '11px'}}>Monitoring</text>
      <text x="560" y="320" textAnchor="middle" className="fill-white/70" style={{fontSize: '9px'}}>Latency • Alerts</text>
    </g>

    {/* Connections to data layer */}
    <line x1="270" y1="230" x2="270" y2="280" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowTrade)"/>
    <line x1="415" y1="230" x2="415" y2="280" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowTrade)"/>
    <line x1="560" y1="230" x2="560" y2="280" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#arrowTrade)"/>

    {/* Key metrics box */}
    <g transform="translate(640, 280)">
      <rect x="0" y="0" width="240" height="90" rx="10" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="1"/>
      <text x="120" y="22" textAnchor="middle" className="fill-emerald-300 font-semibold" style={{fontSize: '11px'}}>PRODUCTION METRICS</text>
      <text x="120" y="45" textAnchor="middle" className="fill-emerald-400/80" style={{fontSize: '9px'}}>• Real money trading active</text>
      <text x="120" y="60" textAnchor="middle" className="fill-emerald-400/80" style={{fontSize: '9px'}}>• Sub-100ms execution paths</text>
      <text x="120" y="75" textAnchor="middle" className="fill-emerald-400/80" style={{fontSize: '9px'}}>• 99.9% uptime SLA</text>
    </g>

    {/* Legend */}
    <g transform="translate(30, 380)">
      <text x="0" y="0" className="fill-slate-500 font-semibold" style={{fontSize: '9px'}}>LEGEND</text>
      <rect x="0" y="15" width="12" height="12" rx="2" fill="url(#marketGrad)"/>
      <text x="18" y="24" className="fill-slate-400" style={{fontSize: '8px'}}>External</text>
      <rect x="70" y="15" width="12" height="12" rx="2" fill="url(#coreGrad)"/>
      <text x="88" y="24" className="fill-slate-400" style={{fontSize: '8px'}}>Core Service</text>
      <rect x="160" y="15" width="12" height="12" rx="2" fill="url(#riskGrad)"/>
      <text x="178" y="24" className="fill-slate-400" style={{fontSize: '8px'}}>Risk</text>
      <rect x="210" y="15" width="12" height="12" rx="2" fill="url(#dataGrad)"/>
      <text x="228" y="24" className="fill-slate-400" style={{fontSize: '8px'}}>Data/Support</text>
    </g>

    {/* Tech stack */}
    <g transform="translate(30, 420)">
      <text x="0" y="0" className="fill-slate-500 font-semibold" style={{fontSize: '9px'}}>TECH STACK</text>
      <text x="0" y="15" className="fill-slate-400" style={{fontSize: '8px'}}>Java 17 • Spring Boot 3 • PostgreSQL • Redis • WebSocket • REST APIs</text>
    </g>
  </svg>
);

// HSI Research Architecture Diagram
const HSIArchitectureDiagram = () => (
  <svg viewBox="0 0 900 450" className="w-full h-auto" style={{ maxHeight: '400px' }}>
    <defs>
      <linearGradient id="inputGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
      <linearGradient id="waveletGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
      <linearGradient id="attentionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#f43f5e" />
      </linearGradient>
      <linearGradient id="classifyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#14b8a6" />
      </linearGradient>
      <filter id="glowHSI">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      <marker id="arrowHSI" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
      </marker>
    </defs>

    <pattern id="gridHSI" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(148,163,184,0.05)" strokeWidth="1"/>
    </pattern>
    <rect width="100%" height="100%" fill="url(#gridHSI)" />

    <text x="450" y="35" textAnchor="middle" className="fill-white text-lg font-bold" style={{fontSize: '18px'}}>Hyperspectral Image Classification - Wavelet + Attention Pipeline</text>
    <text x="450" y="52" textAnchor="middle" className="fill-blue-400" style={{fontSize: '11px'}}>Taylor & Francis Publication Target • 6 Benchmark Datasets</text>

    {/* Input Stage */}
    <text x="90" y="90" textAnchor="middle" className="fill-slate-400 text-xs font-semibold" style={{fontSize: '11px'}}>HSI DATASETS</text>

    <g filter="url(#glowHSI)">
      <rect x="30" y="105" width="120" height="180" rx="10" fill="url(#inputGrad)" opacity="0.9"/>
      <text x="90" y="130" textAnchor="middle" className="fill-white font-bold" style={{fontSize: '11px'}}>Benchmarks</text>
      <rect x="40" y="140" width="100" height="22" rx="4" fill="rgba(255,255,255,0.15)"/>
      <text x="90" y="155" textAnchor="middle" className="fill-white/80" style={{fontSize: '9px'}}>Indian Pines</text>
      <rect x="40" y="167" width="100" height="22" rx="4" fill="rgba(255,255,255,0.15)"/>
      <text x="90" y="182" textAnchor="middle" className="fill-white/80" style={{fontSize: '9px'}}>Salinas</text>
      <rect x="40" y="194" width="100" height="22" rx="4" fill="rgba(255,255,255,0.15)"/>
      <text x="90" y="209" textAnchor="middle" className="fill-white/80" style={{fontSize: '9px'}}>Pavia U & Center</text>
      <rect x="40" y="221" width="100" height="22" rx="4" fill="rgba(255,255,255,0.15)"/>
      <text x="90" y="236" textAnchor="middle" className="fill-white/80" style={{fontSize: '9px'}}>WHU-Hi</text>
      <rect x="40" y="248" width="100" height="22" rx="4" fill="rgba(255,255,255,0.15)"/>
      <text x="90" y="263" textAnchor="middle" className="fill-white/80" style={{fontSize: '9px'}}>KSU</text>
    </g>

    <line x1="150" y1="195" x2="200" y2="195" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowHSI)"/>

    {/* Wavelet Transform Stage */}
    <text x="310" y="90" textAnchor="middle" className="fill-slate-400 text-xs font-semibold" style={{fontSize: '11px'}}>WAVELET TRANSFORMS</text>

    <g filter="url(#glowHSI)">
      <rect x="205" y="105" width="210" height="180" rx="10" fill="url(#waveletGrad)" opacity="0.85"/>
      <text x="310" y="130" textAnchor="middle" className="fill-white font-bold" style={{fontSize: '12px'}}>Feature Extraction</text>

      <g transform="translate(215, 145)">
        <rect x="0" y="0" width="90" height="30" rx="4" fill="rgba(255,255,255,0.15)"/>
        <text x="45" y="20" textAnchor="middle" className="fill-white/80" style={{fontSize: '9px'}}>EWT</text>
      </g>
      <g transform="translate(215, 180)">
        <rect x="0" y="0" width="90" height="30" rx="4" fill="rgba(255,255,255,0.15)"/>
        <text x="45" y="20" textAnchor="middle" className="fill-white/80" style={{fontSize: '9px'}}>SWT</text>
      </g>
      <g transform="translate(215, 215)">
        <rect x="0" y="0" width="90" height="30" rx="4" fill="rgba(255,255,255,0.15)"/>
        <text x="45" y="20" textAnchor="middle" className="fill-white/80" style={{fontSize: '9px'}}>DWT</text>
      </g>

      <g transform="translate(315, 145)">
        <rect x="0" y="0" width="90" height="30" rx="4" fill="rgba(255,255,255,0.15)"/>
        <text x="45" y="20" textAnchor="middle" className="fill-white/80" style={{fontSize: '9px'}}>DEDWT</text>
      </g>
      <g transform="translate(315, 180)">
        <rect x="0" y="0" width="90" height="30" rx="4" fill="rgba(255,255,255,0.15)"/>
        <text x="45" y="20" textAnchor="middle" className="fill-white/80" style={{fontSize: '9px'}}>DTCWT</text>
      </g>
      <g transform="translate(315, 215)">
        <rect x="0" y="0" width="90" height="30" rx="4" fill="rgba(255,255,255,0.15)"/>
        <text x="45" y="20" textAnchor="middle" className="fill-white/80" style={{fontSize: '9px'}}>Hybrid</text>
      </g>

      <text x="310" y="270" textAnchor="middle" className="fill-white/60" style={{fontSize: '9px'}}>Modular • Plug-and-play</text>
    </g>

    <line x1="415" y1="195" x2="465" y2="195" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowHSI)"/>

    {/* Attention Stage */}
    <text x="560" y="90" textAnchor="middle" className="fill-slate-400 text-xs font-semibold" style={{fontSize: '11px'}}>ATTENTION MECHANISM</text>

    <g filter="url(#glowHSI)">
      <rect x="470" y="105" width="180" height="180" rx="10" fill="url(#attentionGrad)" opacity="0.85"/>
      <text x="560" y="130" textAnchor="middle" className="fill-white font-bold" style={{fontSize: '12px'}}>Deep Learning</text>

      <rect x="485" y="145" width="150" height="35" rx="4" fill="rgba(255,255,255,0.15)"/>
      <text x="560" y="165" textAnchor="middle" className="fill-white/80" style={{fontSize: '10px'}}>Spectral Attention</text>

      <rect x="485" y="190" width="150" height="35" rx="4" fill="rgba(255,255,255,0.15)"/>
      <text x="560" y="210" textAnchor="middle" className="fill-white/80" style={{fontSize: '10px'}}>Spatial Attention</text>

      <rect x="485" y="235" width="150" height="35" rx="4" fill="rgba(255,255,255,0.15)"/>
      <text x="560" y="255" textAnchor="middle" className="fill-white/80" style={{fontSize: '10px'}}>Cross-Band Fusion</text>
    </g>

    <line x1="650" y1="195" x2="700" y2="195" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowHSI)"/>

    {/* Output Stage */}
    <text x="790" y="90" textAnchor="middle" className="fill-slate-400 text-xs font-semibold" style={{fontSize: '11px'}}>CLASSIFICATION</text>

    <g filter="url(#glowHSI)">
      <rect x="705" y="105" width="170" height="180" rx="10" fill="url(#classifyGrad)" opacity="0.85"/>
      <text x="790" y="130" textAnchor="middle" className="fill-white font-bold" style={{fontSize: '12px'}}>Evaluation</text>

      <rect x="720" y="145" width="140" height="30" rx="4" fill="rgba(255,255,255,0.15)"/>
      <text x="790" y="165" textAnchor="middle" className="fill-white/80" style={{fontSize: '9px'}}>OA / AA / Kappa</text>

      <rect x="720" y="185" width="140" height="30" rx="4" fill="rgba(255,255,255,0.15)"/>
      <text x="790" y="205" textAnchor="middle" className="fill-white/80" style={{fontSize: '9px'}}>Per-class Accuracy</text>

      <rect x="720" y="225" width="140" height="30" rx="4" fill="rgba(255,255,255,0.15)"/>
      <text x="790" y="245" textAnchor="middle" className="fill-white/80" style={{fontSize: '9px'}}>Robustness Score</text>

      <text x="790" y="275" textAnchor="middle" className="fill-white/60" style={{fontSize: '9px'}}>Cross-dataset validation</text>
    </g>

    {/* Research output box */}
    <g transform="translate(200, 310)">
      <rect x="0" y="0" width="500" height="70" rx="10" fill="rgba(168,85,247,0.1)" stroke="#a855f7" strokeWidth="1"/>
      <text x="250" y="22" textAnchor="middle" className="fill-cyan-300 font-semibold" style={{fontSize: '11px'}}>RESEARCH CONTRIBUTION</text>
      <text x="250" y="42" textAnchor="middle" className="fill-cyan-400/80" style={{fontSize: '9px'}}>Systematic comparison of wavelet transforms for HSI classification</text>
      <text x="250" y="58" textAnchor="middle" className="fill-cyan-400/80" style={{fontSize: '9px'}}>Focus: Robustness across terrain types • Uncertainty quantification</text>
    </g>

    {/* Legend */}
    <g transform="translate(30, 320)">
      <text x="0" y="0" className="fill-slate-500 font-semibold" style={{fontSize: '9px'}}>PIPELINE FLOW</text>
      <line x1="0" y1="15" x2="40" y2="15" stroke="#f59e0b" strokeWidth="2"/>
      <text x="50" y="19" className="fill-slate-400" style={{fontSize: '8px'}}>Input</text>
      <line x1="80" y1="15" x2="120" y2="15" stroke="#8b5cf6" strokeWidth="2"/>
      <text x="130" y="19" className="fill-slate-400" style={{fontSize: '8px'}}>Transform</text>
    </g>

    <g transform="translate(30, 360)">
      <text x="0" y="0" className="fill-slate-500 font-semibold" style={{fontSize: '9px'}}>TECH STACK</text>
      <text x="0" y="15" className="fill-slate-400" style={{fontSize: '8px'}}>PyTorch • NumPy • PyWavelets • Scikit-learn • Matplotlib</text>
    </g>
  </svg>
);

type ProjectCategory = 'data-ml' | 'systems' | 'research' | 'all';

type Project = {
  title: string;
  tagline: string;
  category: ProjectCategory;
  stack: string[];
  focus: string;
  details: string;
  link?: string;
  period: string;
  gradient: string;
};

type ArchitectureId = 'fno' | 'hsi' | 'masova' | 'bus';

const projects: Project[] = [
  {
    title: 'UK Bus Analytics ML Platform',
    tagline: 'Production-grade geospatial analytics platform analyzing 779,262 bus stops across England with ML-powered policy insights.',
    category: 'data-ml',
    stack: [
      'Python',
      'Sentence-Transformers',
      'HDBSCAN',
      'PyOD',
      'Scikit-learn',
      'Plotly',
      'LangChain',
      'Streamlit',
      'Azure',
      'GeoPandas',
    ],
    focus: 'Transport analytics · Policy impact · ML for social good · Equity analysis',
    details:
      'Research-grade platform integrating 779,262 stops with Census 2021, IMD 2019, NOMIS data (97-99% match rate). Three ML models: route clustering (198 types via HDBSCAN), anomaly detection (571 underserved areas identified), coverage prediction (R²=0.089 proving 91% is policy-driven). TAG 2024 & HM Treasury Green Book compliant. 22 novel capabilities vs existing £100k+ consulting reports. Delivers 57 policy insights across 8 analytical categories with BCR calculations for investment prioritization.',
    period: '2022 – Present',
    gradient: 'from-blue-500 via-cyan-500 to-teal-400',
  },
  {
    title: 'SAINTS: Uncertainty-Aware Deep Learning for HSI Classification',
    tagline: 'Bayesian neural networks that know when they might be wrong - first validated uncertainty quantification for hyperspectral imaging.',
    category: 'research',
    stack: ['PyTorch', 'Bayesian Deep Learning', 'MC Dropout', 'DWT Compression', 'LSTM', 'CNN', 'Temperature Scaling'],
    focus: 'Uncertainty quantification · Safe AI deployment · Robust classification · Reproducible science',
    details:
      'SAINTS (Spatially-Aware Interpretable Neural Uncertainty System) achieves 94.73% accuracy with 0.45 uncertainty-error correlation on agricultural datasets. Novel contributions: (1) First validated UQ for HSI with 6.5× higher uncertainty for errors, (2) Wavelet-based spectral compression (100× parameter reduction), (3) Spatial leakage prevention methodology, (4) Multi-dataset validation (6 benchmarks: WHU-Hi, Indian Pines, Salinas, KSU, Pavia U/Center). Targeting Taylor & Francis publication. Enables safe deployment: 21.3% workload reduction via confidence filtering while improving accuracy to 98.06%.',
    period: '2023 – Present',
    gradient: 'from-blue-500 via-cyan-500 to-teal-400',
  },
  {
    title: 'Intelligent Wealth Management Platform (Contract, Live)',
    tagline: 'AI-driven investment optimization with algorithmic risk management - handling real money in production for UK-based client focused on Indian markets.',
    category: 'systems',
    stack: ['Java 17', 'Spring Boot 3.2', 'MongoDB', 'Kite Connect API', 'Technical Analysis', 'BigDecimal Precision'],
    focus: 'FinTech infrastructure · Quantitative finance · ML for trading · Risk management',
    details:
      'Production backend for UK-based wealth management startup targeting Indian equity markets. 60,000+ data points (Nifty 50 × 5 years × 250 trading days) via Kite Connect API. Technical analysis engine: 50/100/200-day SMAs, Golden/Death Cross detection, volume analysis. Automated data pipeline with cron jobs, Indian market holiday calendar integration, rate-limited API compliance (2.8 req/sec). Phased capital deployment algorithm optimizing investments over 5-year horizons targeting 14-15% CAGR through ML-driven fund selection from Indian mutual funds and equities. Research contributions: Algorithmic portfolio rebalancing strategies, time-series forecasting models for market prediction, sentiment analysis integration, and anomaly detection frameworks for risk monitoring.',
    period: 'Jan 2023 – Present',
    gradient: 'from-emerald-500 via-green-500 to-lime-400',
  },
  {
    title: 'MaSoVa Restaurant Management System',
    tagline: 'Production-grade microservices platform - Domino\'s-style operations at scale with real-time orchestration.',
    category: 'systems',
    stack: [
      'Java 21',
      'Spring Boot 3',
      'Spring Cloud Gateway',
      'MongoDB',
      'Redis',
      'WebSocket (STOMP)',
      'React 18',
      'Redux Toolkit',
      'Docker',
    ],
    focus: 'Microservices architecture · Real-time systems · Production engineering · Scalability',
    details:
      '9 microservices with Spring Cloud Gateway (WebFlux): User, Menu, Order, Payment, Delivery, Analytics, Inventory, Customer, Store. 6-stage order state machine (RECEIVED→PREPARING→OVEN→BAKED→DISPATCHED→DELIVERED) with Spring State Machine. Real-time WebSocket (STOMP+SockJS) for Kitchen Display, Driver App, Customer tracking. React 18 + RTK Query with 16 API slices, neumorphic UI. JWT auth with role hierarchy (Customer/Staff/Driver/Manager). Multi-tenant store isolation. Production-ready: Docker Compose, health actuators, rate limiting (100 req/min), comprehensive logging. 13/17 phases complete (backend+frontend). Designed for real chain operations, not demo.',
    link: 'https://github.com/souramarti/masova',
    period: '2024 – Present',
    gradient: 'from-orange-500 via-amber-500 to-yellow-400',
  },
  {
    title: 'AgrBIG – Precision Agriculture Big Data Architecture',
    tagline: 'MSc big data module project treated as a systems case study.',
    category: 'data-ml',
    stack: ['Big Data', 'Batch + Streaming', 'IoT', 'Satellite', 'Security'],
    focus: 'Data architectures · Scalability · Agriculture',
    details:
      'Designed ingestion from IoT sensors, satellite/drone imagery, social feeds, and market data into a dual-layer batch + streaming architecture. Focus on confidentiality, PETabyte-scale storage, and decision-support analytics for agricultural stakeholders.',
    period: '2021 – 2022',
    gradient: 'from-green-500 via-emerald-500 to-teal-400',
  },
];

const architectures: Record<
  ArchitectureId,
  {
    label: string;
    headline: string;
    bulletsData: string[];
    bulletsSystem: string[];
    bulletsImpact: string[];
  }
> = {
  fno: {
    label: 'Innosolv F&O Trading Platform',
    headline: 'Algorithmic options trading system with intelligent strategy discovery and automated risk management for Indian derivatives markets.',
    bulletsData: [
      'Real-time strategy scanner: Evaluates Bull/Bear spreads and Iron Condors across all NSE strike prices with parallel margin calculation (10-thread processing).',
      'Position analysis engine: Calculates max profit/loss, dual break-even points, net credits/debits for complex multi-leg positions.',
      'Open Interest analysis: Put-Call ratio tracking, OI distribution visualization for support/resistance identification.',
    ],
    bulletsSystem: [
      'Spring Boot 2.5.11 + Java 17 with Zerodha KiteConnect SDK integration, Bucket4j rate limiting (10 req/sec), OkHttp for broker API.',
      'Intelligent order execution: Position-aware routing (longs → shorts → futures), dynamic quantity allocation based on available margin, automatic hedge protection.',
      'Automated risk management: Multi-trigger square-off system (profit targets, trailing stop-losses at 50%/75%/90% milestones, index boundary exits).',
    ],
    bulletsImpact: [
      'Research contributions: Multi-stage filtering pipeline (15× speed improvement), position-aware execution algorithms preventing naked exposures, multi-milestone trailing stop-loss optimization.',
      'Technical innovations: Combined margin calculation leveraging broker offsets, predictive make-table notifications (2-min window), recursive order polling with exponential backoff.',
      'Production metrics: 98%+ order success rate, zero naked shorts since launch, 18% profit improvement and 31% drawdown reduction vs fixed stops.',
    ],
  },
  hsi: {
    label: 'SAINTS - Uncertainty-Aware HSI Classification',
    headline: 'First validated uncertainty quantification for hyperspectral imaging with Bayesian deep learning.',
    bulletsData: [
      '6 benchmark datasets: WHU-HanChuan/HongHu/LongKou, Indian Pines, Salinas, Pavia U (AVIRIS, ROSIS, WHU sensors).',
      'DWT spectral compression: 200 bands → 67 features, 100× parameter reduction (17K vs 1M+ for transformers).',
      'Spatial leakage prevention: Fixed spatial splitting with min_distance = patch_size × 10 for realistic accuracy.',
      '94.73% accuracy on Salinas with 0.4479 uncertainty-error correlation (ρ) - model knows when it\'s wrong.',
    ],
    bulletsSystem: [
      'SAINTS architecture: Dual-branch (LSTM spectral + CNN spatial) with Bayesian layers and MC Dropout.',
      'Uncertainty quantification: Epistemic (MC Dropout) + Aleatoric (learned per sample) + Temperature scaling.',
      'Errors have 6.5× higher uncertainty than correct predictions - enables confidence filtering.',
      'PyTorch implementation with comprehensive logging, proper train/test splits, multi-dataset validation.',
    ],
    bulletsImpact: [
      'Novel contribution: First validated UQ for HSI classification. Targeting Taylor & Francis publication.',
      'Safe AI deployment: 21.3% workload reduction via confidence filtering while improving accuracy to 98.06%.',
      'Applications: Precision agriculture (crop disease detection), environmental monitoring, urban planning.',
      'Research maturity: Systematic progression (Phase 1-4), rigorous validation, production-oriented mindset.',
    ],
  },
  masova: {
    label: 'MaSoVa platform',
    headline: 'Production microservices with 6-stage order lifecycle and WebSocket real-time.',
    bulletsData: [
      '9 microservices (Gateway, User, Menu, Order, Payment, Delivery, Analytics, Inventory, Customer) with MongoDB persistence.',
      '6-stage order state machine: RECEIVED → PREPARING → OVEN → BAKED → DISPATCHED → DELIVERED with quality checkpoints.',
      'Multi-tenant store isolation with JWT-based auth and role hierarchy (Customer, Staff, Driver, Manager).',
    ],
    bulletsSystem: [
      'Spring Cloud Gateway (WebFlux) with JWT filter chain, rate limiting, and route-level security.',
      'Real-time WebSocket (STOMP + SockJS) broadcasting order updates to Kitchen Display, Driver App, and Customer tracking.',
      'React 18 + Redux Toolkit with 16 RTK Query API slices, lazy-loaded routes, and neumorphic UI components.',
    ],
    bulletsImpact: [
      'Full order analytics: avg preparation time, staff performance metrics, quality checkpoint tracking.',
      'Delivery orchestration with GPS tracking, ETA calculation, and auto-dispatch algorithms.',
      'Production-ready with Docker Compose, health actuators, and multi-store scalability.',
    ],
  },
  bus: {
    label: 'Bus analytics',
    headline: 'End-to-end ML platform: 9 regions, 779K stops, policy-ready insights.',
    bulletsData: [
      'Dynamic ETL pipeline ingesting BODS (GTFS + TransXchange), NaPTAN, ONS Census 2021, IMD 2019, NOMIS labour stats.',
      'Automated NaPTAN coordinate enrichment + BallTree spatial matching for LSOA assignment (5km threshold).',
      'Cross-region deduplication preserving highest data quality records; demographic merge validation.',
    ],
    bulletsSystem: [
      'Route clustering via Sentence-Transformers (all-MiniLM-L6-v2) embeddings → HDBSCAN with auto-naming (Urban Core, Rural Feeder, etc.).',
      'Streamlit dashboard with Plotly choropleths, ONS region boundaries, and 8 analytical categories (Coverage, Equity, Economic Impact).',
      'Configurable via YAML: region priorities, demographic sources, cache durations, parallel downloads with retry logic.',
    ],
    bulletsImpact: [
      'Answers 57 policy questions across coverage gaps, deprivation correlations, and service equity.',
      'BCR calculator for route optimisation scenarios; identifies underserved areas with high socioeconomic need.',
      'Deployed on HF Spaces; generalises to any UK region or international GTFS-compatible transit system.',
    ],
  },
};

const codeSnippets = {
  reactComponent: `# Azure Databricks - ETL Transformation with PySpark
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, when, sum, avg

# Read from Azure Data Lake Gen2
df = spark.read.format("delta").load(
    "abfss://raw@datalake.dfs.core.windows.net/sales/"
)

# Transform: Clean, aggregate, derive KPIs
sales_kpi = (df
    .filter(col("order_status") == "COMPLETED")
    .groupBy("region", "product_category")
    .agg(
        sum("revenue").alias("total_revenue"),
        avg("order_value").alias("avg_order_value"),
        count("*").alias("order_count")
    )
    .withColumn("performance_tier",
        when(col("total_revenue") > 100000, "High")
        .otherwise("Standard"))
)

# Write to Synapse Analytics for Power BI
sales_kpi.write.format("synapse").save("warehouse.sales_kpi")`,
  apiDesign: `// MaSoVa Order State Machine (6 stages + quality gates)
@Transactional
public Order moveOrderToNextStage(String orderId) {
  Order order = getOrderById(orderId);
  OrderStatus next = switch (order.getStatus()) {
    case RECEIVED -> PREPARING;
    case PREPARING -> OVEN;
    case OVEN -> BAKED;     // triggers quality checkpoint
    case BAKED -> DISPATCHED;
    case DISPATCHED -> DELIVERED;
  };
  updateStatusTimestamps(order, next);
  webSocketController.sendKitchenQueueUpdate(order);
  customerServiceClient.updateOrderStats(order);
  return orderRepository.save(order);
}`,
  pipeline: `# UK Bus Analytics - Spatial Join & Clustering
def process_bus_data(stops_df: pd.DataFrame,
                     census_df: pd.DataFrame) -> pd.DataFrame:
    # BallTree for efficient spatial matching (5km threshold)
    tree = BallTree(np.radians(census_df[['lat','lon']]),
                    metric='haversine')
    distances, indices = tree.query(
        np.radians(stops_df[['lat','lon']]), k=1)

    # Assign LSOA codes to stops
    stops_df['lsoa_code'] = census_df.iloc[indices.flatten()]['lsoa']

    # Route clustering with Sentence-Transformers
    model = SentenceTransformer('all-MiniLM-L6-v2')
    embeddings = model.encode(stops_df['route_desc'].tolist())
    stops_df['cluster'] = HDBSCAN(min_cluster_size=15)\\
        .fit_predict(embeddings)

    # Merge demographics for equity analysis
    return stops_df.merge(census_df, on='lsoa_code')`,
};

const sectionIds = ['top', 'projects', 'architecture', 'craft', 'education', 'contact'] as const;

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState<string>('top');
  const [filter, setFilter] = useState<ProjectCategory>('all');
  const [activeArch, setActiveArch] = useState<ArchitectureId>('fno');
  const [snippetTab, setSnippetTab] = useState<'react' | 'api' | 'pipeline'>('react');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const scrollPos = window.scrollY + 140;
      let current = 'top';
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
          current = id;
        }
      });
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  const currentArch = architectures[activeArch];

  const snippet =
    snippetTab === 'react'
      ? codeSnippets.reactComponent
      : snippetTab === 'api'
      ? codeSnippets.apiDesign
      : codeSnippets.pipeline;

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-slate-100 overflow-hidden">
      {/* Custom Cursor - Removed for better UX */}

      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-0"
      />

      {/* Gradient Orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-blue-600/30 blur-[120px]"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        <div
          className="absolute right-0 top-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[120px]"
          style={{
            transform: `translate(-50%, ${-scrollY * 0.1}px)`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col px-6 pb-20 pt-6">
        {/* TOP NAV */}
        <header className="sticky top-4 z-40 mb-8">
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 px-6 py-4 shadow-2xl backdrop-blur-2xl transition-all hover:border-white/20">
            {/* Animated border gradient */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 opacity-20 blur-xl"></div>
            </div>

            <div className="relative flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-tr from-blue-500 via-cyan-500 to-teal-400 blur-md"></div>
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 via-cyan-500 to-teal-400 text-xl font-bold">
                    MS
                  </div>
                </div>
                <div>
                  <div className="text-base font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                    Marti Soura Vamseekar
                  </div>
                  <div className="text-xs text-slate-400">
                    ML Engineer · Data Scientist · Systems Architect
                  </div>
                </div>
              </div>

              {/* Desktop nav */}
              <nav className="hidden items-center gap-2 text-sm md:flex">
                {[
                  ['#top', 'Home', 'top'],
                  ['#projects', 'Projects', 'projects'],
                  ['#architecture', 'Architecture', 'architecture'],
                  ['#craft', 'Code', 'craft'],
                  ['#education', 'Education', 'education'],
                  ['#contact', 'Contact', 'contact'],
                ].map(([href, label, id]) => (
                  <a
                    key={id}
                    href={href}
                    className={[
                      'group relative overflow-hidden rounded-xl px-4 py-2 transition-all',
                      activeSection === id
                        ? 'text-white'
                        : 'text-slate-400 hover:text-white',
                    ].join(' ')}
                  >
                    {activeSection === id && (
                      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm"></span>
                    )}
                    <span className="relative z-10">{label}</span>
                  </a>
                ))}
              </nav>

              <a
                href="/SouraVamseekarMarti_CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/50 md:inline-flex"
              >
                <span>Download CV</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>

              {/* Mobile toggle */}
              <button
                type="button"
                onClick={() => setMobileNavOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-200 transition-all hover:border-white/20 hover:bg-white/5 md:hidden"
                aria-label="Toggle navigation"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {mobileNavOpen && (
              <nav className="mt-4 flex flex-col gap-2 text-sm md:hidden">
                {[
                  ['#top', 'Home', 'top'],
                  ['#projects', 'Projects', 'projects'],
                  ['#architecture', 'Architecture', 'architecture'],
                  ['#craft', 'Code', 'craft'],
                  ['#education', 'Education', 'education'],
                  ['#contact', 'Contact', 'contact'],
                ].map(([href, label, id]) => (
                  <a
                    key={id}
                    href={href}
                    onClick={() => setMobileNavOpen(false)}
                    className={[
                      'rounded-xl px-4 py-3 transition-all',
                      activeSection === id
                        ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-white'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10',
                    ].join(' ')}
                  >
                    {label}
                  </a>
                ))}
                <a
                  href="/SouraVamseekarMarti_CV.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3 text-center font-semibold text-white"
                >
                  Download CV
                </a>
              </nav>
            )}
          </div>
        </header>

        {/* HERO SECTION */}
        <section
          id="top"
          className="relative mb-20 min-h-[85vh] flex items-center"
        >
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left side */}
            <div className="space-y-8">
              <div
                className="inline-flex items-center gap-2 animate-fade-in-up rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300"
                style={{ animationDelay: '0.1s' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                Available for PhD & Research Roles
              </div>

              <div className="space-y-6">
                <h1
                  className="animate-fade-in-up text-5xl font-bold leading-tight tracking-tight lg:text-7xl"
                  style={{ animationDelay: '0.2s' }}
                >
                  Building{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                      intelligent
                    </span>
                    <span className="absolute bottom-0 left-0 h-3 w-full bg-gradient-to-r from-blue-600/30 to-cyan-600/30 blur-xl"></span>
                  </span>{' '}
                  systems
                </h1>
                <p
                  className="animate-fade-in-up max-w-2xl text-lg leading-relaxed text-slate-300 lg:text-xl"
                  style={{ animationDelay: '0.3s' }}
                >
                  ML Engineer & Data Scientist specializing in{' '}
                  <span className="font-semibold text-cyan-300">transport analytics</span>,{' '}
                  <span className="font-semibold text-blue-300">hyperspectral imaging</span>,
                  and{' '}
                  <span className="font-semibold text-cyan-300">FinTech infrastructure</span>.
                  Turning complex data into production-ready intelligence.
                </p>
              </div>

              <div
                className="animate-fade-in-up flex flex-wrap gap-4"
                style={{ animationDelay: '0.4s' }}
              >
                <a
                  href="#projects"
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/50 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/50"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Projects
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </a>
                <a
                  href="#contact"
                  className="group rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10"
                >
                  <span className="flex items-center gap-2">
                    Get in Touch
                    <svg className="h-4 w-4 transition-transform group-hover:translate-y-[-1px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </a>
              </div>

              <div
                className="animate-fade-in-up flex flex-wrap gap-3"
                style={{ animationDelay: '0.5s' }}
              >
                {['Python', 'Java', 'TypeScript', 'Machine Learning', 'Spring Boot', 'Next.js', 'Azure'].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Right side - Key Stats/Metrics */}
            <div
              className="animate-fade-in-up relative"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 opacity-20 blur-3xl"></div>

                {/* Card */}
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-2xl">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <div className="h-3 w-3 rounded-full bg-cyan-500"></div>
                    </div>
                    <span className="text-sm text-slate-400">Engineering Philosophy</span>
                  </div>

                  <div className="space-y-5">
                    <div className="grid grid-cols-1 gap-5">
                      <div className="group rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-blue-500/30 hover:bg-white/10">
                        <div className="mb-2 flex items-center gap-3">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20 text-sm font-bold text-blue-400">01</span>
                          <h4 className="text-base font-semibold text-white">Research-Driven Innovation</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400">
                          Literature review and SOTA analysis. Solutions grounded in peer-reviewed methodologies.
                        </p>
                      </div>

                      <div className="group rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-cyan-500/30 hover:bg-white/10">
                        <div className="mb-2 flex items-center gap-3">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 text-sm font-bold text-cyan-400">02</span>
                          <h4 className="text-base font-semibold text-white">Reproducible Science</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400">
                          Version-controlled experiments with proper train/test splits and cross-validation.
                        </p>
                      </div>

                      <div className="group rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-emerald-500/30 hover:bg-white/10">
                        <div className="mb-2 flex items-center gap-3">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-sm font-bold text-emerald-400">03</span>
                          <h4 className="text-base font-semibold text-white">End-to-End Ownership</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400">
                          Azure Data Factory orchestrates, Databricks transforms, Power BI delivers insights.
                        </p>
                      </div>

                      <div className="group rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-purple-500/30 hover:bg-white/10">
                        <div className="mb-2 flex items-center gap-3">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-sm font-bold text-purple-400">04</span>
                          <h4 className="text-base font-semibold text-white">Cloud-Native by Default</h4>
                        </div>
                        <p className="text-sm leading-relaxed text-slate-400">
                          Data Lake Gen2 for storage, Synapse for analytics, Databricks for compute.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="mb-20 scroll-mt-32">
          <div className="mb-12 space-y-4">
            <div className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-blue-300">
              Featured Work
            </div>
            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Projects & Research
            </h2>
            <p className="max-w-2xl text-lg text-slate-400">
              From ML research to production systems handling real revenue. Each project demonstrates end-to-end thinking.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-3">
            {[
              { id: 'all', label: 'All Projects', count: projects.length },
              { id: 'data-ml', label: 'Data & ML', count: projects.filter(p => p.category === 'data-ml').length },
              { id: 'systems', label: 'Systems', count: projects.filter(p => p.category === 'systems').length },
              { id: 'research', label: 'Research', count: projects.filter(p => p.category === 'research').length },
            ].map(({ id, label, count }) => (
              <button
                key={id}
                type="button"
                onClick={() => setFilter(id as ProjectCategory)}
                className={[
                  'group relative overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold transition-all',
                  filter === id
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white',
                ].join(' ')}
              >
                {filter === id && (
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm"></span>
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {label}
                  <span className={filter === id ? 'text-cyan-300' : 'text-slate-500'}>({count})</span>
                </span>
              </button>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredProjects.map((project, idx) => (
              <article
                key={project.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-2xl transition-all hover:border-white/20 hover:shadow-2xl"
                style={{
                  animation: 'fade-in-up 0.6s ease-out',
                  animationDelay: `${idx * 0.1}s`,
                  animationFillMode: 'both',
                }}
              >
                {/* Gradient border effect on hover */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${project.gradient} opacity-10 blur-xl`}></div>
                </div>

                <div className="relative space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold leading-tight">{project.title}</h3>
                      <p className="text-sm text-slate-400">{project.tagline}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full bg-gradient-to-r ${project.gradient} px-3 py-1 text-xs font-semibold text-white`}
                    >
                      {project.category === 'data-ml' ? 'ML' : project.category === 'systems' ? 'Systems' : 'Research'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-semibold text-cyan-300">Focus:</span>{' '}
                      <span className="text-slate-300">{project.focus}</span>
                    </p>
                    <p className="text-sm leading-relaxed text-slate-400">{project.details}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 5 && (
                      <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                        +{project.stack.length - 5} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-slate-500">{project.period}</span>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="group/link inline-flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white"
                      >
                        View Project
                        <svg className="h-4 w-4 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ARCHITECTURE SECTION */}
        <section id="architecture" className="mb-20 scroll-mt-32">
          <div className="mb-12 space-y-4">
            <div className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">
              System Design
            </div>
            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Architecture Deep Dive
            </h2>
            <p className="max-w-2xl text-lg text-slate-400">
              Interactive architecture diagrams showing how I design production systems - from data ingestion through ML pipelines to user-facing applications.
            </p>
          </div>

          <div className="mb-8 flex flex-wrap gap-3">
            {(
              [
                ['fno', 'F&O Trading'],
                ['hsi', 'HSI Research'],
                ['masova', 'MaSoVa'],
                ['bus', 'UK Bus Analytics'],
              ] as [ArchitectureId, string][]
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveArch(id)}
                className={[
                  'group relative overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold transition-all',
                  activeArch === id ? 'text-white' : 'text-slate-400 hover:text-white',
                ].join(' ')}
              >
                {activeArch === id && (
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-600/20 to-blue-600/20 backdrop-blur-sm"></span>
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>

          {/* Architecture Diagram */}
          <div className="mb-8 overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="inline-block rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                System Architecture Diagram
              </div>
              <span className="text-xs text-slate-500">Click tabs above to switch architectures</span>
            </div>
            <div className="rounded-xl bg-slate-950/50 p-4">
              {activeArch === 'fno' && <FnOTradingArchitectureDiagram />}
              {activeArch === 'hsi' && <HSIArchitectureDiagram />}
              {activeArch === 'masova' && <MaSoVaArchitectureDiagram />}
              {activeArch === 'bus' && <BusAnalyticsDiagram />}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Overview */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-2xl">
              <div className="mb-4 inline-block rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                Overview
              </div>
              <h3 className="mb-2 text-2xl font-bold">{currentArch.label}</h3>
              <p className="text-slate-400">{currentArch.headline}</p>
            </div>

            {/* Data Layer */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-2xl lg:col-span-2">
              <div className="mb-4 inline-block rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
                Data Layer
              </div>
              <ul className="space-y-3">
                {currentArch.bulletsData.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm text-slate-400">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"></span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* System Design */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-2xl lg:col-span-3">
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <div className="mb-4 inline-block rounded-lg bg-gradient-to-r from-emerald-600/20 to-green-600/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300">
                    System Design
                  </div>
                  <ul className="space-y-3">
                    {currentArch.bulletsSystem.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm text-slate-400">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-emerald-400 to-green-400"></span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="mb-4 inline-block rounded-lg bg-gradient-to-r from-fuchsia-600/20 to-pink-600/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-fuchsia-300">
                    Real-World Impact
                  </div>
                  <ul className="space-y-3">
                    {currentArch.bulletsImpact.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm text-slate-400">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-fuchsia-400 to-pink-400"></span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CODE & CRAFT SECTION */}
        <section id="craft" className="mb-20 scroll-mt-32">
          <div className="mb-12 space-y-4">
            <div className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">
              Code Samples
            </div>
            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Code & Craft
            </h2>
            <p className="max-w-2xl text-lg text-slate-400">
              A peek into my thinking across React components, API design, and data pipelines.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.5fr,1fr]">
            {/* Code Viewer */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl">
              <div className="border-b border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-rose-500"></div>
                      <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                      <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSnippetTab('react')}
                        className={[
                          'rounded-lg px-3 py-1.5 text-sm transition-all',
                          snippetTab === 'react'
                            ? 'bg-white/10 text-white'
                            : 'text-slate-400 hover:text-white',
                        ].join(' ')}
                      >
                        PySpark ETL
                      </button>
                      <button
                        type="button"
                        onClick={() => setSnippetTab('api')}
                        className={[
                          'rounded-lg px-3 py-1.5 text-sm transition-all',
                          snippetTab === 'api'
                            ? 'bg-white/10 text-white'
                            : 'text-slate-400 hover:text-white',
                        ].join(' ')}
                      >
                        Java API
                      </button>
                      <button
                        type="button"
                        onClick={() => setSnippetTab('pipeline')}
                        className={[
                          'rounded-lg px-3 py-1.5 text-sm transition-all',
                          snippetTab === 'pipeline'
                            ? 'bg-white/10 text-white'
                            : 'text-slate-400 hover:text-white',
                        ].join(' ')}
                      >
                        ML Pipeline
                      </button>
                    </div>
                  </div>
                  <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                    {snippetTab === 'react' ? 'PySpark + Delta Lake' : snippetTab === 'api' ? 'Spring Boot' : 'Python + ML'}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <pre className="overflow-auto text-sm leading-relaxed">
                  <code className="text-slate-300">{snippet}</code>
                </pre>
              </div>
            </div>

            {/* Philosophy & Skills */}
            <div className="space-y-6">
              {/* Tech Stack - Organized by Category */}
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-2xl">
                <h3 className="mb-4 text-xl font-bold">Tech Stack</h3>
                <div className="space-y-4">
                  {/* Programming Languages */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-violet-400 mb-2">Languages</p>
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'SQL', 'Java', 'TypeScript', 'C/C++'].map((tech) => (
                        <span key={tech} className="rounded-lg bg-gradient-to-r from-violet-600 to-purple-500 px-3 py-1.5 text-xs font-semibold text-white">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* ML & Data Science */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-fuchsia-400 mb-2">ML & Data Science</p>
                    <div className="flex flex-wrap gap-2">
                      {['TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'LangChain', 'HDBSCAN', 'PyOD'].map((tech) => (
                        <span key={tech} className="rounded-lg bg-gradient-to-r from-fuchsia-600 to-pink-500 px-3 py-1.5 text-xs font-semibold text-white">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Big Data & Cloud */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">Big Data & Cloud</p>
                    <div className="flex flex-wrap gap-2">
                      {['Apache Spark', 'PySpark', 'Databricks', 'Azure Data Factory', 'Synapse Analytics', 'Data Lake Gen2', 'MongoDB', 'Redis'].map((tech) => (
                        <span key={tech} className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 px-3 py-1.5 text-xs font-semibold text-white">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Visualization */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">Visualization</p>
                    <div className="flex flex-wrap gap-2">
                      {['Power BI', 'Tableau', 'Streamlit', 'Plotly', 'Matplotlib'].map((tech) => (
                        <span key={tech} className="rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 px-3 py-1.5 text-xs font-semibold text-white">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Backend & Web */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-orange-400 mb-2">Backend & Web</p>
                    <div className="flex flex-wrap gap-2">
                      {['Spring Boot', 'Next.js', 'React', 'FastAPI', 'REST APIs', 'WebSocket', 'Git'].map((tech) => (
                        <span key={tech} className="rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 px-3 py-1.5 text-xs font-semibold text-white">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Certification Badge */}
              <div className="overflow-hidden rounded-2xl border border-blue-500/30 bg-blue-500/5 p-4 backdrop-blur-2xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Azure Data Engineer Associate</p>
                    <p className="text-xs text-slate-400">Microsoft Certified (DP-203) • March 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="mb-20 scroll-mt-32">
          <div className="mb-12 space-y-4">
            <div className="inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-cyan-300">
              Academic Background
            </div>
            <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
              Research-Driven Education
            </h2>
            <p className="max-w-2xl text-lg text-slate-400">
              Approached my MSc as a research-intensive experience — each module was an opportunity for experimental design, reproducible results, and professional presentation.
            </p>
          </div>

          {/* MSc Card */}
          <div className="mb-8 overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl">
            <div className="border-b border-white/10 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="mb-2 inline-block rounded-lg bg-cyan-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300">
                    Master's Degree
                  </div>
                  <h3 className="text-2xl font-bold text-white">MSc Data Science</h3>
                  <p className="text-lg text-cyan-300">University of Greenwich, London, UK</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-white">2021 – 2022</p>
                  <p className="text-sm text-emerald-400">Graduated with Merit</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <p className="mb-6 text-slate-300">
                Treated the MSc program as a <span className="font-semibold text-cyan-300">research-intensive experience</span> rather than standard coursework. Each major module was approached as an opportunity to conduct mini-research studies requiring experimental design, reproducible results, and professional presentation formats.
              </p>

              {/* Research Projects Grid */}
              <div className="space-y-6">
                {/* Data Visualization */}
                <div className="rounded-xl border border-white/10 bg-black/30 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Data Visualisation & Exploratory Analytics (COMP1800)</h4>
                      <p className="text-sm text-emerald-300">Retail Dataset Investigation</p>
                    </div>
                  </div>
                  <p className="mb-3 text-sm text-slate-400">
                    Systematic exploration of large, messy retail datasets — 8 distinct visualizations with narrative analysis, translating quantitative findings into actionable business insights.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Interactive Jupyter', '8 Visualizations', 'Business Insights', 'Stakeholder Reports'].map(tag => (
                      <span key={tag} className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-xs text-emerald-300">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Big Data Systems */}
                <div className="rounded-xl border border-white/10 bg-black/30 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Big Data Systems & Architectures (COMP1702)</h4>
                      <p className="text-sm text-blue-300">AgrBIG — Precision Agriculture Platform</p>
                    </div>
                  </div>
                  <p className="mb-3 text-sm text-slate-400">
                    End-to-end architecture design for agricultural data management — IoT sensors, satellite imagery, drone surveillance, real-time streaming, and petabyte-scale storage.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['IoT Integration', 'MapReduce', 'Real-time Streaming', 'Petabyte Scale', 'Architecture Design'].map(tag => (
                      <span key={tag} className="rounded-full bg-blue-500/20 px-2.5 py-1 text-xs text-blue-300">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Applied Machine Learning */}
                <div className="rounded-xl border border-white/10 bg-black/30 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Applied Machine Learning (COMP1804)</h4>
                      <p className="text-sm text-purple-300">Facial Attribute Recognition System</p>
                    </div>
                  </div>
                  <p className="mb-3 text-sm text-slate-400">
                    TensorFlow-based multi-label classification system for 5 facial attributes (wrinkles, freckles, glasses, hair color/style) with manual annotation pipeline and comprehensive evaluation.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['TensorFlow', 'Multi-task Learning', 'Computer Vision', 'Data Annotation', 'Deep Learning'].map(tag => (
                      <span key={tag} className="rounded-full bg-purple-500/20 px-2.5 py-1 text-xs text-purple-300">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Machine Learning */}
                <div className="rounded-xl border border-white/10 bg-black/30 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-orange-500">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Machine Learning (COMP1801)</h4>
                      <p className="text-sm text-rose-300">Supervised & Unsupervised Learning Research</p>
                    </div>
                  </div>
                  <p className="mb-3 text-sm text-slate-400">
                    Comprehensive research in ML foundations covering regression, classification, clustering, optimization, and kernel methods with rigorous mathematical analysis and practical implementations.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Scikit-learn', 'Statistical Learning', 'Optimization', 'LaTeX Documentation', 'IEEE Format'].map(tag => (
                      <span key={tag} className="rounded-full bg-rose-500/20 px-2.5 py-1 text-xs text-rose-300">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Clouds Grids Virtualization */}
                <div className="rounded-xl border border-white/10 bg-black/30 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Clouds, Grids & Virtualization (COMP1680)</h4>
                      <p className="text-sm text-indigo-300">HPC & Parallel Programming</p>
                    </div>
                  </div>
                  <p className="mb-3 text-sm text-slate-400">
                    Cloud platform analysis and parallel programming with OpenMP — performance benchmarking, scalability analysis, and distributed computing architectures for ML workloads.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['OpenMP', 'Parallel Computing', 'Cloud Architecture', 'Performance Analysis', 'HPC'].map(tag => (
                      <span key={tag} className="rounded-full bg-indigo-500/20 px-2.5 py-1 text-xs text-indigo-300">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Graph and Databases */}
                <div className="rounded-xl border border-white/10 bg-black/30 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-green-500">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Graph & Modern Databases (COMP1835)</h4>
                      <p className="text-sm text-teal-300">NoSQL & Graph Database Systems</p>
                    </div>
                  </div>
                  <p className="mb-3 text-sm text-slate-400">
                    Designed and implemented NoSQL systems across 4 paradigms (document, key-value, column-family, graph) with Neo4j, MongoDB, Redis — polyglot persistence for big data.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Neo4j', 'MongoDB', 'Redis', 'Graph Theory', 'Polyglot Persistence'].map(tag => (
                      <span key={tag} className="rounded-full bg-teal-500/20 px-2.5 py-1 text-xs text-teal-300">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Programming Fundamentals */}
                <div className="rounded-xl border border-white/10 bg-black/30 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-yellow-500">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Programming Fundamentals for Data Science (COMP1832)</h4>
                      <p className="text-sm text-amber-300">Python & R Ecosystems</p>
                    </div>
                  </div>
                  <p className="mb-3 text-sm text-slate-400">
                    Mastered data science programming with NumPy, Pandas, Matplotlib, NetworkX in Python and R — portfolio-based assessment covering data structures, processing, and visualization.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Python', 'R', 'NumPy/Pandas', 'Data Wrangling', 'Visualization'].map(tag => (
                      <span key={tag} className="rounded-full bg-amber-500/20 px-2.5 py-1 text-xs text-amber-300">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* MSc Project */}
                <div className="rounded-xl border border-white/10 bg-black/30 p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white">MSc Dissertation Project</h4>
                      <p className="text-sm text-cyan-300">UK Transportation Network Analysis</p>
                    </div>
                  </div>
                  <p className="mb-3 text-sm text-slate-400">
                    National-scale GTFS analysis of UK public transportation (10 regions) — route classification by urban typology using NUTS framework, geospatial integration, and statistical profiling.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['GTFS Data', 'Geospatial Analysis', 'Transportation Analytics', 'Python', 'Statistical Analysis'].map(tag => (
                      <span key={tag} className="rounded-full bg-cyan-500/20 px-2.5 py-1 text-xs text-cyan-300">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* B.Tech Card */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl">
            <div className="border-b border-white/10 bg-gradient-to-r from-orange-600/20 to-amber-600/20 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="mb-2 inline-block rounded-lg bg-orange-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-300">
                    Bachelor's Degree
                  </div>
                  <h3 className="text-2xl font-bold text-white">B.Tech Electronics & Communication Engineering</h3>
                  <p className="text-lg text-orange-300">GITAM Institute of Science and Technology, Visakhapatnam, India</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-white">2016 – 2020</p>
                  <p className="text-sm text-emerald-400">8.3 CGPA</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4 rounded-xl border border-white/10 bg-black/30 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
                    <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Dissertation: Hyperspectral Image Analysis</h4>
                    <p className="text-sm text-orange-300">Research in Remote Sensing & Image Processing</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400">
                  Applied signal processing and machine learning techniques to hyperspectral imagery — foundation for later work in computer vision and data-intensive research.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['C/C++', 'Data Structures', 'Computer Networks', 'Digital Signal Processing', 'Digital Logic Design'].map(tag => (
                  <span key={tag} className="rounded-full bg-orange-500/20 px-2.5 py-1 text-xs text-orange-300">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="scroll-mt-32">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
            {/* Contact Info */}
            <div className="h-full">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-2xl h-full">
                <h3 className="mb-4 text-xl font-bold">Contact Information</h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      ),
                      label: 'Email',
                      value: 'martisoura@gmail.com',
                      href: 'mailto:martisoura@gmail.com',
                    },
                    {
                      icon: (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      ),
                      label: 'LinkedIn',
                      value: 'souramarti',
                      href: 'https://www.linkedin.com/in/souramarti',
                    },
                    {
                      icon: (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      ),
                      label: 'GitHub',
                      value: 'SVamseekar',
                      href: 'https://github.com/SVamseekar',
                    },
                    {
                      icon: (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      ),
                      label: 'Location',
                      value: 'Hyderabad, India',
                      href: null,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between border-b border-white/10 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-cyan-300">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">{item.label}</div>
                          {item.href ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm font-medium text-slate-300 hover:text-cyan-300"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <div className="text-sm font-medium text-slate-300">{item.value}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* References */}
            <div className="h-full">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-2xl h-full flex flex-col">
                <h3 className="mb-6 text-xl font-bold">References Available</h3>
                <ul className="space-y-6 text-sm text-slate-400 flex-1">
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"></span>
                    <div>
                      <p className="mb-1"><strong className="text-white text-base">Stef Garasto</strong></p>
                      <p className="text-sm text-slate-400">Senior Lecturer in Data Science at University of Greenwich. MSc thesis supervisor for UK bus analytics research and ML platform development.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-emerald-400 to-green-400"></span>
                    <div>
                      <p className="mb-1"><strong className="text-white text-base">Innosolv Private Limited, London, UK</strong></p>
                      <p className="text-sm text-slate-400">Industry reference for live trading backend systems and production engineering quality. Direct experience with high-frequency financial systems.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"></span>
                    <div>
                      <p className="mb-1"><strong className="text-white text-base">Dr. Ladi Sandeep Kumar</strong></p>
                      <p className="text-sm text-slate-400">Assistant Professor at Gandhi Institute of Technology & Management (GITAM) University, Visakhapatnam. B.Tech supervisor for hyperspectral imaging research and signal processing expertise.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-16 border-t border-white/10 pt-8 text-center">
            <div className="mb-4 flex justify-center gap-4">
              <a
                href="https://github.com/SVamseekar"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-cyan-500 hover:text-cyan-300"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/souramarti"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-cyan-500 hover:text-cyan-300"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="mailto:martisoura@gmail.com"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-cyan-500 hover:text-cyan-300"
                aria-label="Email"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Marti Soura Vamseekar. Built with Next.js, TypeScript & Tailwind CSS.
            </p>
          </footer>
        </section>
      </div>

    </div>
  );
}
