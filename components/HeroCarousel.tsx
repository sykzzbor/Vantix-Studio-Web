"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Locale = "es" | "en";

type HeroSlide = {
  id: string;
  light: string;
  dark: string;
  alt: Record<Locale, string>;
  caption: Record<Locale, string>;
  width: number;
  height: number;
};

export function HeroCarousel({
  slides,
  locale,
}: {
  slides: readonly HeroSlide[];
  locale: Locale;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const pointerStart = useRef<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || paused || slides.length < 2) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  function move(direction: -1 | 1) {
    setActive((current) => (current + direction + slides.length) % slides.length);
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") {
      pointerStart.current = event.clientX;
      setPaused(true);
    }
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (pointerStart.current === null) return;
    const delta = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(delta) > 44) move(delta > 0 ? -1 : 1);
    setPaused(false);
  }

  const labels =
    locale === "es"
      ? {
          region: "Capturas reales de VantixApp",
          previous: "Captura anterior",
          next: "Captura siguiente",
          goTo: "Ir a la captura",
        }
      : {
          region: "Real VantixApp screenshots",
          previous: "Previous screenshot",
          next: "Next screenshot",
          goTo: "Go to screenshot",
        };

  return (
    <div
      className="hero-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={labels.region}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        pointerStart.current = null;
        setPaused(false);
      }}
    >
      <div
        className="hero-carousel-stage"
        style={{ aspectRatio: `${slides[0].width} / ${slides[0].height}` }}
      >
        {slides.map((slide, index) => (
          <figure
            className={`hero-slide${active === index ? " is-active" : ""}`}
            aria-hidden={active !== index}
            key={slide.id}
          >
            <Image
              className="theme-shot theme-shot-light"
              src={slide.light}
              alt={slide.alt[locale]}
              fill
              sizes="(max-width: 760px) 94vw, (max-width: 1280px) 92vw, 1240px"
              loading="eager"
              fetchPriority={index === 0 ? "high" : undefined}
            />
            <Image
              className="theme-shot theme-shot-dark"
              src={slide.dark}
              alt=""
              aria-hidden="true"
              fill
              sizes="(max-width: 760px) 94vw, (max-width: 1280px) 92vw, 1240px"
              loading="eager"
              fetchPriority={index === 0 ? "high" : undefined}
            />
            <figcaption>{slide.caption[locale]}</figcaption>
          </figure>
        ))}

        <button
          className="carousel-arrow carousel-arrow-previous"
          type="button"
          aria-label={labels.previous}
          onClick={() => move(-1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m14.5 5-7 7 7 7" />
          </svg>
        </button>
        <button
          className="carousel-arrow carousel-arrow-next"
          type="button"
          aria-label={labels.next}
          onClick={() => move(1)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9.5 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="carousel-dots">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`${labels.goTo} ${index + 1}`}
            aria-current={active === index ? "true" : undefined}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </div>
  );
}
