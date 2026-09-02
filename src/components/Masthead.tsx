"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV = [
  { href: "/work", label: "Work" },
  { href: "/research", label: "Research" },
  { href: "/open-source", label: "Open source" },
  { href: "/about", label: "About" },
] as const;

export function Masthead() {
  const pathname = usePathname();

  return (
    <header className="masthead">
      <div className="shell shell-wide masthead-inner">
        <Link href="/" className="wordmark">
          Marti Soura Vamseekar
        </Link>

        <nav className="nav" aria-label="Primary">
          {NAV.map(({ href, label }) => {
            // A section stays current while browsing its detail pages.
            const active =
              pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className="nav-link nav-link-hideable"
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
