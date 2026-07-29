"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Brand } from "@/components/Brand";
import {
  LanguageSwitch,
  ThemeToggle,
} from "@/components/Preferences";
import {
  NAVIGATION,
  NAVIGATION_ACTIONS,
  getTranslations,
  type Locale,
} from "@/content";
import { track } from "@/lib/analytics";
import { APP_LOGIN_URL } from "@/lib/site";

type HeaderVariant = "landing" | "servicios" | "services" | "legal";

type SiteHeaderProps = {
  locale?: Locale;
  variant?: HeaderVariant;
  languagePaths?: Readonly<Record<Locale, string>>;
};

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function defaultLanguagePaths(
  variant: HeaderVariant,
): Readonly<Record<Locale, string>> {
  if (variant === "servicios" || variant === "services") {
    return { es: "/servicios", en: "/en/services" };
  }

  return { es: "/", en: "/en" };
}

export function SiteHeader({
  locale = "es",
  variant = "landing",
  languagePaths,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavigationRef = useRef<HTMLElement>(null);
  const translations = getTranslations(locale);
  const localizedHome = locale === "es" ? "/" : "/en";
  const paths = languagePaths ?? defaultLanguagePaths(variant);
  const isLanding = variant === "landing";
  const loginAction = NAVIGATION_ACTIONS.find((action) => action.id === "login");
  const demoAction = NAVIGATION_ACTIONS.find(
    (action) => action.id === "bookDemo",
  );

  function sectionHref(href: string) {
    return isLanding ? href : `${localizedHome}${href}`;
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 73.75rem)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    const backgroundElements = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer"),
    );
    document.body.classList.toggle("menu-open", open);
    backgroundElements.forEach((element) => {
      element.inert = open;
    });

    if (!open) {
      return () => {
        document.body.classList.remove("menu-open");
        backgroundElements.forEach((element) => {
          element.inert = false;
        });
      };
    }

    const navigation = mobileNavigationRef.current;
    const focusable = Array.from(
      navigation?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? [],
    );
    window.requestAnimationFrame(() => focusable[0]?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      backgroundElements.forEach((element) => {
        element.inert = false;
      });
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const demoHref = sectionHref(demoAction?.href ?? "#contacto");

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner">
        <Link
          className="brand-link"
          href={isLanding ? "#inicio" : localizedHome}
          aria-label={
            locale === "es"
              ? "Vantix, ir al inicio"
              : "Vantix, go to home page"
          }
        >
          <Brand />
        </Link>

        <nav
          className="desktop-nav"
          aria-label={
            locale === "es" ? "Navegación principal" : "Main navigation"
          }
        >
          {NAVIGATION.map((item) => (
            <Link key={item.id} href={sectionHref(item.href)}>
              {item.label[locale]}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <div className="header-preferences desktop-preferences">
            <LanguageSwitch
              locale={locale}
              spanishHref={paths.es}
              englishHref={paths.en}
            />
            <ThemeToggle locale={locale} compact />
          </div>

          <a
            className="login-link"
            href={APP_LOGIN_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => track({ name: "cta_login", location: "nav" })}
          >
            {loginAction?.label[locale] ?? translations.common.login}
          </a>

          <Link
            className="button button-compact header-demo-button"
            href={demoHref}
          >
            {demoAction?.label[locale] ?? translations.common.bookDemo}
            <ArrowIcon />
          </Link>

          <button
            ref={menuButtonRef}
            className="menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={
              open
                ? translations.accessibility.closeMenu
                : translations.accessibility.openMenu
            }
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav
        ref={mobileNavigationRef}
        id="mobile-navigation"
        className="mobile-nav"
        data-open={open}
        aria-hidden={!open}
        inert={!open}
        aria-label={
          locale === "es" ? "Navegación móvil" : "Mobile navigation"
        }
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) {
            setOpen(false);
            window.requestAnimationFrame(() => menuButtonRef.current?.focus());
          }
        }}
      >
        <div className="mobile-nav-inner">
          {NAVIGATION.map((item) => (
            <Link key={item.id} href={sectionHref(item.href)}>
              {item.label[locale]}
            </Link>
          ))}

          <div className="mobile-preferences">
            <LanguageSwitch
              locale={locale}
              spanishHref={paths.es}
              englishHref={paths.en}
            />
            <ThemeToggle locale={locale} />
          </div>

          <div className="mobile-nav-actions">
            <a
              href={APP_LOGIN_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                track({ name: "cta_login", location: "mobile_nav" })
              }
            >
              {loginAction?.label[locale] ?? translations.common.login}
            </a>
            <Link
              className="button"
              href={demoHref}
            >
              {demoAction?.label[locale] ?? translations.common.bookDemo}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
