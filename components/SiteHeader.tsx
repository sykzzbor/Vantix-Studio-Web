"use client";

import { useEffect, useState } from "react";
import { ArrowIcon } from "./ArrowIcon";
import { Brand } from "./Brand";
import { track } from "@/lib/analytics";
import { TRIAL_DAYS } from "@/lib/plans";
import { APP_LOGIN_URL, APP_REGISTER_URL } from "@/lib/site";

const navItems = [
  ["Producto", "#producto"],
  ["Funciones", "#funciones"],
  ["Integraciones", "#integraciones"],
  ["Precios", "#precios"],
  ["Preguntas frecuentes", "#faq"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close, { passive: true });
    return () => window.removeEventListener("resize", close);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner">
        <a className="brand-link" href="#inicio" aria-label="VantixApp, ir al inicio">
          <Brand />
        </a>

        <nav className="desktop-nav" aria-label="Navegación principal">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>

        <div className="header-actions">
          <a
            className="login-link"
            href={APP_LOGIN_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => track({ name: "cta_login", location: "nav" })}
          >
            Iniciar sesión
          </a>
          <a
            className="button button-compact"
            href={APP_REGISTER_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => track({ name: "cta_trial", location: "nav" })}
          >
            Probar gratis <ArrowIcon />
          </a>
          <button
            className="menu-button"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        className="mobile-nav"
        data-open={open}
        aria-hidden={!open}
        inert={!open}
        aria-label="Navegación móvil"
      >
        <div className="mobile-nav-inner">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <div className="mobile-nav-actions">
            <a
              href={APP_LOGIN_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                track({ name: "cta_login", location: "mobile_nav" });
                setOpen(false);
              }}
            >
              Iniciar sesión
            </a>
            <a
              className="button"
              href={APP_REGISTER_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                track({ name: "cta_trial", location: "mobile_nav" });
                setOpen(false);
              }}
            >
              Probar gratis por {TRIAL_DAYS} días
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
