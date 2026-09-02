/**
 * Technology marks.
 *
 * Rather than fetching brand logos — which would drag a rainbow of corporate
 * colour into a deliberately restrained page, and which age badly — each
 * technology carries a single glyph drawn from its own world: the language's
 * conventional symbol, a file extension, a shell sigil. The mark is set in the
 * mono face and inherits page ink, so it reads as a specimen label rather than
 * a sticker.
 *
 * `kind` groups technologies by layer, which is what the colour accent encodes.
 */

export type TechKind =
  | "language"
  | "framework"
  | "data"
  | "infra"
  | "interface"
  | "method";

export type Mark = { readonly glyph: string; readonly kind: TechKind };

const MARKS: Readonly<Record<string, Mark>> = {
  // Languages
  Python: { glyph: "py", kind: "language" },
  "Java 17": { glyph: "jv", kind: "language" },
  "Java 21": { glyph: "jv", kind: "language" },
  TypeScript: { glyph: "ts", kind: "language" },
  NumPy: { glyph: "np", kind: "language" },

  // Frameworks and runtimes
  "Spring Boot 3": { glyph: "sb", kind: "framework" },
  "Spring Boot 3.3": { glyph: "sb", kind: "framework" },
  "Spring Cloud Gateway": { glyph: "gw", kind: "framework" },
  FastAPI: { glyph: "fa", kind: "framework" },
  "Next.js": { glyph: "nx", kind: "framework" },
  React: { glyph: "re", kind: "framework" },
  "React Native": { glyph: "rn", kind: "framework" },
  "Google ADK": { glyph: "adk", kind: "framework" },
  Gemini: { glyph: "gm", kind: "framework" },

  // Data stores and transformation
  PostgreSQL: { glyph: "pg", kind: "data" },
  MongoDB: { glyph: "mg", kind: "data" },
  Redis: { glyph: "rd", kind: "data" },
  DuckDB: { glyph: "dk", kind: "data" },
  dbt: { glyph: "dbt", kind: "data" },
  pgvector: { glyph: "vec", kind: "data" },
  RabbitMQ: { glyph: "mq", kind: "data" },

  // Infrastructure
  Docker: { glyph: "dc", kind: "infra" },
  GCP: { glyph: "gcp", kind: "infra" },
  PyPI: { glyph: "pypi", kind: "infra" },
  pytest: { glyph: "test", kind: "infra" },

  // Interfaces and formats
  MapLibre: { glyph: "map", kind: "interface" },
  GTFS: { glyph: "gtfs", kind: "interface" },
  SARIF: { glyph: "sarif", kind: "method" },
  OSCAL: { glyph: "oscal", kind: "method" },
  MLflow: { glyph: "ml", kind: "method" },
  FAISS: { glyph: "faiss", kind: "method" },
};

/** Falls back to the first two letters, so an unlisted technology still works. */
export function techMark(tech: string): Mark {
  return (
    MARKS[tech] ?? {
      glyph: tech.replace(/[^A-Za-z]/g, "").slice(0, 2).toLowerCase(),
      kind: "method",
    }
  );
}
