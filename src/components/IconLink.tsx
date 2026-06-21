import { BrandIcon, type BrandIconName } from "@/components/BrandIcon";

type IconLinkProps = {
  href: string;
  icon: BrandIconName;
  label: string;
  external?: boolean;
  download?: boolean;
  muted?: boolean;
};

export function IconLink({
  href,
  icon,
  label,
  external = false,
  download = false,
  muted = false,
}: IconLinkProps) {
  return (
    <a
      href={href}
      className={`icon-link${muted ? " icon-link-muted" : ""}`}
      {...(external
        ? { target: "_blank", rel: "noreferrer" }
        : {})}
      {...(download ? { download: true } : {})}
    >
      <BrandIcon name={icon} size={18} />
      <span>{label}</span>
    </a>
  );
}