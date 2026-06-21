import Image from "next/image";

export type BrandIconName =
  | "ssrn"
  | "zenodo"
  | "mpra"
  | "orcid"
  | "gmail"
  | "github"
  | "linkedin"
  | "phone"
  | "microsoft";

const iconSrc: Record<BrandIconName, string> = {
  ssrn: "/icons/ssrn.svg",
  zenodo: "/icons/zenodo.svg",
  mpra: "/icons/mpra.png",
  orcid: "/icons/orcid.svg",
  gmail: "/icons/gmail.svg",
  github: "/icons/github.svg",
  linkedin: "/icons/linkedin.svg",
  phone: "/icons/phone.svg",
  microsoft: "/icons/microsoft.svg",
};

type BrandIconProps = {
  name: BrandIconName;
  size?: number;
  className?: string;
};

export function BrandIcon({ name, size = 20, className = "" }: BrandIconProps) {
  return (
    <Image
      src={iconSrc[name]}
      alt=""
      width={size}
      height={size}
      className={`brand-icon ${className}`.trim()}
      data-icon={name}
      aria-hidden
    />
  );
}