"use client";

import { useCallback, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

/**
 * Theme switch.
 *
 * The document's data-theme attribute is the source of truth — it is set by
 * the bootstrap script in the layout before first paint, so there is no flash.
 * This component subscribes to that attribute rather than keeping a parallel
 * copy in state, which keeps the button label honest even if the theme is
 * changed from somewhere else.
 */
function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  // The server cannot know the theme; it renders the light-mode label and the
  // client corrects during hydration.
  const theme = useSyncExternalStore(subscribeToTheme, readTheme, () => "light" as Theme);

  const toggle = useCallback(() => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing can reject writes; the theme still applies for this page.
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      <span aria-hidden="true">{theme === "dark" ? "☾" : "☀"}</span>
    </button>
  );
}
