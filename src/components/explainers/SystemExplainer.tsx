import { PayGapExplainer } from "./PayGapExplainer";
import { ReleaseGateExplainer } from "./ReleaseGateExplainer";
import { EquityExplainer } from "./EquityExplainer";
import { EvidenceGraphExplainer } from "./EvidenceGraphExplainer";
import { OrderFlowExplainer } from "./OrderFlowExplainer";

/**
 * Maps a system's `explainer` key to its diagram.
 *
 * Each system gets a bespoke explainer rather than one parameterised
 * component: a release being blocked and an order reaching a kitchen are
 * different ideas, and a shared abstraction would flatten both into the same
 * three boxes.
 */
const EXPLAINERS = {
  PayGapExplainer,
  ReleaseGateExplainer,
  EquityExplainer,
  EvidenceGraphExplainer,
  OrderFlowExplainer,
} as const;

export function SystemExplainer({ name }: { name: string }) {
  const Explainer = EXPLAINERS[name as keyof typeof EXPLAINERS];
  if (!Explainer) return null;
  return <Explainer />;
}
