"use client";

import { useEffect, useRef } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type TrackedLinkProps = React.ComponentPropsWithoutRef<"a"> & {
  event: AnalyticsEvent;
};

export function TrackedLink({ event, onClick, ...props }: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(clickEvent) => {
        track(event);
        onClick?.(clickEvent);
      }}
    />
  );
}

const SCROLL_THRESHOLDS = [25, 50, 75, 100] as const;

export function ScrollDepth() {
  const reported = useRef(new Set<number>());

  useEffect(() => {
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const percent = (window.scrollY / max) * 100;
      for (const threshold of SCROLL_THRESHOLDS) {
        if (percent >= threshold && !reported.current.has(threshold)) {
          reported.current.add(threshold);
          track({ name: "scroll_depth", percent: threshold });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
