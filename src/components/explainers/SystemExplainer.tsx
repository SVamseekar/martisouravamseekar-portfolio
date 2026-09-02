import { PayGapExplainer } from "./PayGapExplainer";
import { ReleaseGateExplainer } from "./ReleaseGateExplainer";
import { EquityExplainer } from "./EquityExplainer";
import { EvidenceGraphExplainer } from "./EvidenceGraphExplainer";
import { OrderFlowExplainer } from "./OrderFlowExplainer";
import { MasovaArchitecture } from "./MasovaArchitecture";
import { FleetExplainer } from "./FleetExplainer";
import { MoveqExplainer } from "./MoveqExplainer";
import { AequitasArchitecture } from "./AequitasArchitecture";

/**
 * Maps a system's explainer key to its diagram.
 *
 * Each system gets a bespoke explainer rather than one parameterised
 * component: a release being blocked, an order walking a state machine and a
 * rule traversing a graph are different ideas, and a shared abstraction would
 * flatten all three into the same three boxes.
 */
const EXPLAINERS = {
  PayGapExplainer,
  ReleaseGateExplainer,
  EquityExplainer,
  EvidenceGraphExplainer,
  OrderFlowExplainer,
  MasovaArchitecture,
  FleetExplainer,
  MoveqExplainer,
  AequitasArchitecture,
} as const;

export function SystemExplainer({ name }: { name: string }) {
  const Explainer = EXPLAINERS[name as keyof typeof EXPLAINERS];
  if (!Explainer) return null;
  return <Explainer />;
}
