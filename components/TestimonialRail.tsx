"use client";

import { useEffect, useRef, useState } from "react";

type Locale = "es" | "en";

type Testimonial = {
  id: string;
  quote: Record<Locale, string>;
  name: Record<Locale, string>;
  role: Record<Locale, string>;
  business: Record<Locale, string>;
  result?: Record<Locale, string>;
  isDemo: boolean;
};

export function TestimonialRail({
  testimonials,
  locale,
}: {
  testimonials: readonly Testimonial[];
  locale: Locale;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let previous = performance.now();

    const tick = (now: number) => {
      const elapsed = Math.min(now - previous, 32);
      previous = now;

      if (!pausedRef.current) {
        track.scrollLeft += elapsed * 0.025;
        const midpoint = track.scrollWidth / 2;
        if (track.scrollLeft >= midpoint) track.scrollLeft -= midpoint;
      }

      frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const visibleLabel =
    locale === "es"
      ? "Ejemplo de formato · No es un testimonio real"
      : "Format example · Not a real testimonial";

  const cards = [...testimonials, ...testimonials];

  return (
    <div
      ref={trackRef}
      className={`testimonial-rail${dragging ? " is-dragging" : ""}`}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
      onPointerDown={() => {
        pausedRef.current = true;
        setDragging(true);
      }}
      onPointerUp={() => {
        pausedRef.current = false;
        setDragging(false);
      }}
      onPointerCancel={() => {
        pausedRef.current = false;
        setDragging(false);
      }}
      aria-label={locale === "es" ? "Testimonios de demostración" : "Demo testimonials"}
    >
      <div className="testimonial-track">
        {cards.map((testimonial, index) => {
          const duplicated = index >= testimonials.length;

          return (
            <article
              className="testimonial-card"
              key={`${testimonial.id}-${duplicated ? "copy" : "original"}`}
              aria-hidden={duplicated}
            >
              {testimonial.isDemo ? (
                <span className="demo-content-label">{visibleLabel}</span>
              ) : null}
              <blockquote>“{testimonial.quote[locale]}”</blockquote>
              {testimonial.result ? (
                <p className="testimonial-result">{testimonial.result[locale]}</p>
              ) : null}
              <footer>
                <span className="testimonial-avatar" aria-hidden="true">V</span>
                <span>
                  <strong>{testimonial.name[locale]}</strong>
                  <small>
                    {testimonial.role[locale]} · {testimonial.business[locale]}
                  </small>
                </span>
              </footer>
            </article>
          );
        })}
      </div>
    </div>
  );
}
