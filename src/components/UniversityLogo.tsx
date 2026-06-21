import Image from "next/image";

export type UniversityLogoName = "greenwich" | "gitam";

const logoSrc: Record<UniversityLogoName, string> = {
  greenwich: "/icons/greenwich-emblem.png",
  gitam: "/icons/gitam-emblem.svg",
};

const logoDimensions: Record<
  UniversityLogoName,
  { width: number; height: number }
> = {
  greenwich: { width: 68, height: 68 },
  gitam: { width: 82, height: 80 },
};

type UniversityLogoProps = {
  name: UniversityLogoName;
  height?: number;
};

const LOGO_FRAME_SIZE = 24;

export function UniversityLogo({ name, height = LOGO_FRAME_SIZE }: UniversityLogoProps) {
  const { width, height: nativeHeight } = logoDimensions[name];
  const displayWidth = Math.round((width / nativeHeight) * height);

  return (
    <span className="university-logo-frame" style={{ width: LOGO_FRAME_SIZE, height: LOGO_FRAME_SIZE }}>
      <Image
        src={logoSrc[name]}
        alt=""
        width={displayWidth}
        height={height}
        className="university-logo"
        aria-hidden
      />
    </span>
  );
}