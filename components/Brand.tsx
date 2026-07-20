import Image from "next/image";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <span className={`brand-lockup${footer ? " brand-lockup-footer" : ""}`}>
      <Image
        src={footer ? "/images/vantix-lockup-horizontal-800w.webp" : "/images/vantix-mark-256w.webp"}
        alt=""
        width={footer ? 108 : 30}
        height={footer ? 36 : 30}
        sizes={footer ? "108px" : "30px"}
        priority={!footer}
      />
      {footer ? null : <strong>VANTIX</strong>}
    </span>
  );
}
