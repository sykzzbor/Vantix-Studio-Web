import Image from "next/image";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <span className={`brand-lockup${footer ? " brand-lockup-footer" : ""}`}>
      <Image
        src="/brand/vantix-wordmark.png"
        alt=""
        width={360}
        height={41}
        sizes={footer ? "144px" : "120px"}
        loading={footer ? "lazy" : "eager"}
      />
    </span>
  );
}
