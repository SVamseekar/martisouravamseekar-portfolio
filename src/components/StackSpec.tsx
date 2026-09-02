import { techMark } from "@/data/tech";

/**
 * Stack specimen — the technology marks as a component list, not a tag cloud.
 *
 * Reads like the parts list on an engineering drawing: each entry carries its
 * own glyph, its name, and the role it plays in this particular system. The
 * role is what makes it worth reading — "PostgreSQL" tells you little,
 * "PostgreSQL · financial records" tells you where it sits in the architecture.
 */
export function StackSpec({
  stack,
  roles,
}: {
  stack: readonly string[];
  /** Optional per-technology role, specific to this system. */
  roles?: Readonly<Record<string, string>>;
}) {
  return (
    <ul className="spec">
      {stack.map((tech) => {
        const mark = techMark(tech);
        return (
          <li key={tech} className="spec-row">
            <span className="spec-glyph" aria-hidden="true" data-kind={mark.kind}>
              {mark.glyph}
            </span>
            <span className="spec-name">{tech}</span>
            {roles?.[tech] && <span className="spec-role">{roles[tech]}</span>}
          </li>
        );
      })}
    </ul>
  );
}
