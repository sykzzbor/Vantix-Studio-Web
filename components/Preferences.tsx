"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

type Locale = "es" | "en";
type Theme = "light" | "dark";

const THEME_KEY = "vantix-theme";
const LANGUAGE_KEY = "vantix-language";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribeTheme(onStoreChange: () => void) {
  window.addEventListener("vantix:theme", onStoreChange);
  return () => window.removeEventListener("vantix:theme", onStoreChange);
}

export function ThemeToggle({
  locale,
  compact = false,
}: {
  locale: Locale;
  compact?: boolean;
}) {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "light");

  function toggleTheme() {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;

    try {
      window.localStorage.setItem(THEME_KEY, next);
    } catch {
      // El cambio visual sigue funcionando aunque storage esté bloqueado.
    }

    window.dispatchEvent(new CustomEvent("vantix:theme", { detail: next }));
  }

  const label =
    locale === "es"
      ? theme === "dark"
        ? "Cambiar a modo claro"
        : "Cambiar a modo oscuro"
      : theme === "dark"
        ? "Switch to light mode"
        : "Switch to dark mode";

  return (
    <button
      className={`theme-toggle${compact ? " is-compact" : ""}`}
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <svg className="theme-icon theme-icon-sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3.75" />
        <path d="M12 2.25v2.1M12 19.65v2.1M4.5 4.5l1.5 1.5M18 18l1.5 1.5M2.25 12h2.1M19.65 12h2.1M4.5 19.5 6 18M18 6l1.5-1.5" />
      </svg>
      <svg className="theme-icon theme-icon-moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.25 15.2A8.55 8.55 0 0 1 8.8 3.75a8.6 8.6 0 1 0 11.45 11.45Z" />
      </svg>
    </button>
  );
}

export function LanguageSwitch({
  locale,
  spanishHref,
  englishHref,
}: {
  locale: Locale;
  spanishHref: string;
  englishHref: string;
}) {
  function remember(next: Locale) {
    document.documentElement.lang = next === "es" ? "es-AR" : "en";

    try {
      window.localStorage.setItem(LANGUAGE_KEY, next);
    } catch {
      // La navegación sigue funcionando aunque storage esté bloqueado.
    }

    try {
      document.cookie = `vantix-language=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
    } catch {
      // El enlace sigue resolviendo la ruta aunque las cookies estén bloqueadas.
    }
  }

  return (
    <span
      className="language-switch"
      role="group"
      aria-label={locale === "es" ? "Elegir idioma" : "Choose language"}
    >
      <Link
        href={spanishHref}
        hrefLang="es-AR"
        aria-current={locale === "es" ? "page" : undefined}
        onClick={() => remember("es")}
      >
        ES
      </Link>
      <i aria-hidden="true">/</i>
      <Link
        href={englishHref}
        hrefLang="en"
        aria-current={locale === "en" ? "page" : undefined}
        onClick={() => remember("en")}
      >
        EN
      </Link>
    </span>
  );
}
