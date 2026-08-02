"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { ThemeToggle } from "@/components/ThemeToggle";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#research", label: "Research" },
  { href: "/#background", label: "Background" },
  { href: "/#contact", label: "Contact" },
  { href: "https://blog.souravamseekar.com", label: "Blog", external: true },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a href="#top" className="site-mark" onClick={() => setOpen(false)}>
          <span className="site-mark-name">{profile.name}</span>
          <span className="site-mark-role">{profile.title}</span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="site-nav-link"
              {...("external" in item && item.external
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header-actions">
          <a href={profile.cvPath} className="site-cv-link" download>
            CV
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="site-menu-toggle"
            aria-expanded={open}
            aria-controls="site-mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="site-menu-toggle-bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <nav
        id="site-mobile-nav"
        className={`site-nav-mobile${open ? " is-open" : ""}`}
        aria-label="Mobile"
        hidden={!open}
      >
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="site-nav-mobile-link"
            onClick={() => setOpen(false)}
            {...("external" in item && item.external
              ? { target: "_blank", rel: "noreferrer" }
              : {})}
          >
            {item.label}
          </a>
        ))}
        <a
          href={`mailto:${profile.email}`}
          className="site-nav-mobile-link"
          onClick={() => setOpen(false)}
        >
          Email
        </a>
      </nav>
    </header>
  );
}
