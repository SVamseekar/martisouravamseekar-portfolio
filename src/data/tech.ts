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

/**
 * Each technology carries its own hue, given twice — once for each ground.
 * They are the colours the technologies are actually known by, so the stack
 * reads at a glance, but they are chosen (not inverted) for dark mode so a
 * dark brand ink like Java's does not vanish into the page.
 */
export type Mark = {
  readonly glyph: string;
  readonly kind: TechKind;
  /** [light ground, dark ground] */
  readonly hue: readonly [string, string];
  /** Key into the drawn technology marks; falls back to `glyph` when absent. */
  readonly mark?: string;
};

const MARKS: Readonly<Record<string, Mark>> = {
  // Languages
  Python: { glyph: "py", kind: "language" , hue: ["#3572A5", "#6ba7dd"] , mark: "python" },
  "Java 17": { glyph: "jv", kind: "language" , hue: ["#b07219", "#d8a44f"] , mark: "java" },
  "Java 21": { glyph: "jv", kind: "language" , hue: ["#b07219", "#d8a44f"] , mark: "java" },
  TypeScript: { glyph: "ts", kind: "language" , hue: ["#2f74c0", "#6aa9e9"] , mark: "typescript" },
  NumPy: { glyph: "np", kind: "language" , hue: ["#4d77cf", "#8aa8ee"] , mark: "numpy" },

  // Frameworks and runtimes
  "Spring Boot 3": { glyph: "sb", kind: "framework" , hue: ["#4f9c53", "#7fd06a"] , mark: "spring" },
  "Spring Boot 3.3": { glyph: "sb", kind: "framework" , hue: ["#4f9c53", "#7fd06a"] , mark: "spring" },
  "Spring Cloud Gateway": { glyph: "gw", kind: "framework" , hue: ["#4f9c53", "#7fd06a"] , mark: "gateway" },
  FastAPI: { glyph: "fa", kind: "framework" , hue: ["#059486", "#3fc4b4"] , mark: "fastapi" },
  "Next.js": { glyph: "nx", kind: "framework" , hue: ["#3a3a3a", "#d0d4da"] , mark: "nextjs" },
  React: { glyph: "re", kind: "framework" , hue: ["#0b93b8", "#61dafb"] , mark: "react" },
  "React Native": { glyph: "rn", kind: "framework" , hue: ["#0b93b8", "#61dafb"] , mark: "react" },
  "Google ADK": { glyph: "adk", kind: "framework" , hue: ["#3b7ddd", "#7aa9ef"] , mark: "gcp" },
  Gemini: { glyph: "gm", kind: "framework" , hue: ["#7256d8", "#a390f0"] , mark: "gcp" },

  // Data stores and transformation
  PostgreSQL: { glyph: "pg", kind: "data" , hue: ["#31648c", "#7ba7cc"] , mark: "postgres" },
  MongoDB: { glyph: "mg", kind: "data" , hue: ["#3f8b3f", "#6cc36c"] , mark: "mongodb" },
  Redis: { glyph: "rd", kind: "data" , hue: ["#c0392b", "#ef7a6b"] , mark: "redis" },
  DuckDB: { glyph: "dk", kind: "data" , hue: ["#a37200", "#e9c04c"] , mark: "duckdb" },
  dbt: { glyph: "dbt", kind: "data" , hue: ["#d1553d", "#f0876e"] , mark: "dbt" },
  pgvector: { glyph: "vec", kind: "data" , hue: ["#31648c", "#7ba7cc"] , mark: "postgres" },
  RabbitMQ: { glyph: "mq", kind: "data" , hue: ["#d1682a", "#f09a5e"] , mark: "rabbitmq" },

  // Infrastructure
  Docker: { glyph: "dc", kind: "infra" , hue: ["#1d84c6", "#5cb3e8"] , mark: "docker" },
  GCP: { glyph: "gcp", kind: "infra" , hue: ["#3b7ddd", "#7aa9ef"] , mark: "gcp" },
  PyPI: { glyph: "pypi", kind: "infra" , hue: ["#a37200", "#e9c04c"] },
  pytest: { glyph: "test", kind: "infra" , hue: ["#2b8a8a", "#54c2c2"] },

  // Interfaces and formats
  MapLibre: { glyph: "map", kind: "interface" , hue: ["#2b7a5a", "#59bd91"] },
  GTFS: { glyph: "gtfs", kind: "interface" , hue: ["#5a6b7d", "#9aabbd"] },
  SARIF: { glyph: "sarif", kind: "method" , hue: ["#7256d8", "#a390f0"] },
  OSCAL: { glyph: "oscal", kind: "method" , hue: ["#7256d8", "#a390f0"] },
  MLflow: { glyph: "ml", kind: "method" , hue: ["#0d7fc4", "#5bb0e8"] , mark: "mlflow" },
  FAISS: { glyph: "faiss", kind: "method" , hue: ["#3b7ddd", "#7aa9ef"] },
};

/** Falls back to the first two letters, so an unlisted technology still works. */
export function techMark(tech: string): Mark {
  return (
    MARKS[tech] ?? {
      glyph: tech.replace(/[^A-Za-z]/g, "").slice(0, 2).toLowerCase(),
      kind: "method",
      hue: ["#5a6b7d", "#9aabbd"],
    }
  );
}
