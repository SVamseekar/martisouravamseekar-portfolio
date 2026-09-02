"use client";

import type { ReactNode } from "react";
import { useInViewOnce, usePrefersReducedMotion } from "@/hooks/useInViewOnce";

type RenderProps = {
  /** False when the visitor prefers reduced motion — skip SMIL entirely. */
  motion: boolean;
};

type Props = {
  /** What the reader is looking at, in plain language. */
  caption: string;
  /** Prose description, so the diagram is never the only source of the information. */
  description: string;
  /** Optional label above the diagram. */
  kicker?: string;
  children: ReactNode | ((props: RenderProps) => ReactNode);
};

/**
 * Shared container for the system explainers.
 *
 * Publishes play state as `data-play` on the wrapper once the figure scrolls
 * into view; the stylesheet keys every animation off that, so a diagram only
 * runs while it is on screen and no diagram needs its own timing logic.
 *
 * Children may be a render function, which receives `motion: false` when the
 * visitor prefers reduced motion. Diagrams use that to omit travelling
 * packets rather than leaving them frozen on the page.
 */
export function ExplainerFrame({
  caption,
  description,
  kicker,
  children,
}: Props) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();

  return (
    <figure className="explainer" ref={ref} data-play={inView}>
      {kicker && (
        <p className="t-label" style={{ marginBottom: "0.6rem" }}>
          {kicker}
        </p>
      )}
      <div className="explainer-stage">
        {typeof children === "function"
          ? children({ motion: !reduced })
          : children}
      </div>
      <figcaption className="explainer-caption t-small">{caption}</figcaption>
      <p className="sr-only">{description}</p>
    </figure>
  );
}
