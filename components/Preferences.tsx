"use client";

import Link from "next/link";
import {
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

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
  const [open, setOpen] = useState(false);
  const switchRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const isSpanish = locale === "es";

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!switchRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.requestAnimationFrame(() => {
      menuRef.current
        ?.querySelector<HTMLElement>('[role="menuitem"]')
        ?.focus();
    });

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

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

    setOpen(false);
  }

  function handleMenuKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;

    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [],
    );
    if (items.length === 0) return;

    event.preventDefault();
    const currentIndex = items.indexOf(document.activeElement as HTMLElement);
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? items.length - 1
          : event.key === "ArrowUp"
            ? (currentIndex - 1 + items.length) % items.length
            : (currentIndex + 1) % items.length;

    items[nextIndex]?.focus();
  }

  return (
    <div
      ref={switchRef}
      className="language-switch"
      aria-label={locale === "es" ? "Elegir idioma" : "Choose language"}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={triggerRef}
        className="language-trigger"
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-label={
          locale === "es"
            ? `Idioma actual: ${isSpanish ? "Español" : "Inglés"}. Cambiar idioma`
            : `Current language: ${isSpanish ? "Spanish" : "English"}. Change language`
        }
        onClick={() => setOpen((value) => !value)}
      >
        <span className="language-flag" aria-hidden="true">
          {isSpanish ? "🇪🇸" : "🇺🇸"}
        </span>
        <span>{isSpanish ? "ES" : "EN"}</span>
        <svg
          className="language-chevron"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="m4.5 6 3.5 3.5L11.5 6" />
        </svg>
      </button>

      <div
        ref={menuRef}
        id={menuId}
        className="language-menu"
        role="menu"
        aria-label={locale === "es" ? "Idiomas" : "Languages"}
        hidden={!open}
        onKeyDown={handleMenuKeyDown}
      >
        <Link
          className="language-option"
          href={spanishHref}
          hrefLang="es-AR"
          role="menuitem"
          aria-current={isSpanish ? "page" : undefined}
          onClick={() => remember("es")}
        >
          <span className="language-flag" aria-hidden="true">
            🇪🇸
          </span>
          <span className="language-option-copy">
            <strong>Español</strong>
            <small>Argentina</small>
          </span>
          <span className="language-check" aria-hidden="true">
            {isSpanish ? "✓" : ""}
          </span>
        </Link>

        <Link
          className="language-option"
          href={englishHref}
          hrefLang="en"
          role="menuitem"
          aria-current={!isSpanish ? "page" : undefined}
          onClick={() => remember("en")}
        >
          <span className="language-flag" aria-hidden="true">
            🇺🇸
          </span>
          <span className="language-option-copy">
            <strong>English</strong>
            <small>United States</small>
          </span>
          <span className="language-check" aria-hidden="true">
            {!isSpanish ? "✓" : ""}
          </span>
        </Link>
      </div>
    </div>
  );
}
