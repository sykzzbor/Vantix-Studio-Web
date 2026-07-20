import Link from "next/link";
import { Brand } from "./Brand";
import { TrackedLink } from "./Tracked";
import {
  APP_LOGIN_URL,
  APP_REGISTER_URL,
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  whatsAppLink,
} from "@/lib/site";

export function SiteFooter({ variant = "landing" }: { variant?: "landing" | "servicios" }) {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          {variant === "landing" ? (
            <a href="#inicio" aria-label="Vantix, ir al inicio">
              <Brand footer />
            </a>
          ) : (
            <Link href="/" aria-label="Vantix, ir al inicio">
              <Brand footer />
            </Link>
          )}
          <p>
            VantixApp es la plataforma de atención con IA, CRM y agenda de turnos
            desarrollada por Vantix en Córdoba, Argentina.
          </p>
          <span>Jesús María · Córdoba</span>
        </div>
        <div className="footer-links">
          <div>
            <span>Producto</span>
            <Link href={variant === "landing" ? "#producto" : "/#producto"}>Producto</Link>
            <Link href={variant === "landing" ? "#funciones" : "/#funciones"}>Funciones</Link>
            <Link href={variant === "landing" ? "#precios" : "/#precios"}>Precios</Link>
            <Link href={variant === "landing" ? "#faq" : "/#faq"}>Preguntas frecuentes</Link>
          </div>
          <div>
            <span>Cuenta</span>
            <a href={APP_REGISTER_URL} target="_blank" rel="noreferrer">
              Probar gratis
            </a>
            <TrackedLink
              event={{ name: "cta_login", location: "footer" }}
              href={APP_LOGIN_URL}
              target="_blank"
              rel="noreferrer"
            >
              Iniciar sesión
            </TrackedLink>
            <a href="/politicas/privacidad.html">Privacidad</a>
          </div>
          <div>
            <span>Contacto</span>
            <TrackedLink
              event={{ name: "whatsapp_open", location: "footer" }}
              href={whatsAppLink("Hola, quiero hacer una consulta sobre VantixApp.")}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </TrackedLink>
            <a href={`mailto:${CONTACT_EMAIL}`}>Email</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="container footer-studio">
        {variant === "landing" ? (
          <p>
            ¿Buscás una web o un sistema personalizado?{" "}
            <Link href="/servicios">Conocé Vantix Design Studio</Link>.
          </p>
        ) : (
          <p>
            ¿Querés automatizar la atención de tu negocio?{" "}
            <Link href="/">Conocé VantixApp</Link>.
          </p>
        )}
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Vantix</span>
        <span>Desarrollado por Vantix · Software argentino</span>
      </div>
    </footer>
  );
}
