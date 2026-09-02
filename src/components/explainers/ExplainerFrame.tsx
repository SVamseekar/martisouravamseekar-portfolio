"use client";

import type { ReactNode } from "react";
import { useInViewOnce, usePrefersReducedMotion } from "@/hooks/useInViewOnce";

type Props = {
  /** What the reader is looking at, in plain language. */
  caption: string;
  /** Accessible prose description — the diagram's meaning without the picture. */
  description: string;
  children: ReactNode;
};

/**
 * Shared container for the system explainers.
 *
 * Handles the parts every diagram needs identically: play once on first view,
 * skip the animation entirely under reduced motion, and expose a text
 * description so the diagram is not the only way to get the information.
 *
 * Play state is published as `data-play` on the wrapper; each diagram's CSS
 * keys its own draw-in off that, so no diagram needs its own timing logic.
 */
export function ExplainerFrame({ caption, description, children }: Props) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const play = reduced || inView;

  return (
    <figure className="explainer" ref={ref} data-play={play}>
      <div className="explainer-stage">{children}</div>
      <figcaption className="explainer-caption t-small">{caption}</figcaption>
      <p className="sr-only">{description}</p>
    </figure>
  );
}
