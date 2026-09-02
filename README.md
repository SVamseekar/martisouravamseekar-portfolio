# souravamseekar.com

Personal site. Multi-page, statically generated, built with Next.js 16.

| Surface | Repo | Domain |
|---|---|---|
| Portfolio (this) | `martisouravamseekar-portfolio` | `souravamseekar.com` |
| Engineering publication | [`engineering-blog`](https://github.com/SVamseekar/engineering-blog) | `blog.souravamseekar.com` |
| Editorial desk | same as publication | `desk.souravamseekar.com` |

Apex `/blog` and `/blog/*` issue a 308 redirect to the blog subdomain (see
`src/middleware.ts`).

## The idea

The site's claim is that everything on it is checkable. Four systems are live
in production, eight packages are published on PyPI, and the working paper has
a DOI — so those claims are verified mechanically rather than asserted in prose.

Each system gets its own page with a bespoke explainer: a small SVG diagram
showing how that product works *for the people who use it* — a release being
blocked, an order reaching a kitchen — not its internal source code. Diagrams
draw once when scrolled into view, then hold.

## Routes

```
/                 Thesis, verified proof strip, and routes onward
/work             Index of the five systems
/work/[slug]      One page per system, each with its own explainer
/research         The working paper: finding, method, and limits
/open-source      The two library stacks and their published packages
/about            Experience, education, eligibility, contact
```

## Commands

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # static export of all routes
npm run lint
npm run verify    # re-check every externally verifiable claim
```

## Verified claims

`src/data/evidence.ts` is the single source of truth for anything externally
checkable: live product URLs, PyPI package versions, and publication records.
`npm run verify` re-checks all of them against the network and exits non-zero
when reality has drifted.

Run it before deploying. If a product goes down or a package is republished at
a new version, the check fails rather than the site quietly advertising
something untrue.

Numbers quoted in copy should come from this file, never from a literal typed
into a component.

## Layout

```
src/
  app/
    globals.css        design tokens and component styles
    explainers.css     shared draw-in system for the diagrams
    layout.tsx         fonts, theme bootstrap, masthead and footer
    work/[slug]/       statically generated system pages
  components/
    explainers/        one bespoke diagram per system, plus the shared frame
  data/
    evidence.ts        verified, externally checkable facts
    systems.ts         the five systems, told for their audience
    profile.ts         experience, education, certifications
  hooks/               scroll and motion-preference hooks
  lib/seo.ts           metadata and structured data
scripts/
  verify-claims.mjs    the claim checker behind `npm run verify`
```

## Design notes

The palette is a cool neutral ground with a single signal colour. Colour carries
meaning rather than decoration: the signal blue marks verified facts and primary
actions, amber marks a blocked or attention state. The mono face appears only
where content is genuinely machine-checkable — versions, statuses, identifiers.

Adding a system means adding an entry to `systems.ts`, writing its explainer in
`components/explainers/`, and registering it in `SystemExplainer.tsx`. Anything
externally verifiable about it belongs in `evidence.ts` so the checker covers it.

## Accessibility

Every explainer carries a prose description of what the diagram shows, so the
information is never only available visually. Diagrams render in their final
state under `prefers-reduced-motion`. All pages are keyboard navigable with
visible focus, and ship a single `h1` with no heading-level skips.
