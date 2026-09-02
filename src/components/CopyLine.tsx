"use client";

import { useState } from "react";

/**
 * A shell command with a copy button.
 *
 * Someone evaluating a library wants the install line, not a description of
 * how to find it. The button falls back silently when the clipboard API is
 * unavailable — the text is still selectable.
 */
export function CopyLine({
  label,
  command,
}: {
  label: string;
  command: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked; the command stays selectable either way.
    }
  };

  return (
    <div className="copyline">
      <span className="t-label copyline-label">{label}</span>
      <code className="copyline-code">{command}</code>
      <button
        type="button"
        onClick={copy}
        className="copyline-btn"
        aria-label={`Copy: ${command}`}
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}
