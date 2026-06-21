import { profile } from "@/data/profile";
import { ThemeToggle } from "@/components/ThemeToggle";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#research", label: "Research" },
  { href: "#background", label: "Background" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <a href="#" className="site-mark">
          <span className="site-mark-name">{profile.name}</span>
          <span className="site-mark-role">{profile.title}</span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="site-nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <a href={profile.cvPath} className="site-cv-link" download>
          CV
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}