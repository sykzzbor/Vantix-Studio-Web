import Image from "next/image";

type ScreenshotSource = {
  light: string;
  dark: string;
  width: number;
  height: number;
};

export function ProductScreenshot({
  source,
  alt,
  className = "",
  eager = false,
}: {
  source: ScreenshotSource;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const sizes = "(max-width: 760px) 94vw, (max-width: 1180px) 88vw, 1120px";

  return (
    <span
      className={`theme-screenshot ${className}`.trim()}
      style={{ aspectRatio: `${source.width} / ${source.height}` }}
    >
      <Image
        className="theme-shot theme-shot-light"
        src={source.light}
        alt={alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
      />
      <Image
        className="theme-shot theme-shot-dark"
        src={source.dark}
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
      />
    </span>
  );
}
