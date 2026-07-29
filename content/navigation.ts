import type {
  NavigationAction,
  NavigationItem,
} from "@/content/types";

export const NAVIGATION = [
  {
    id: "product",
    href: "#producto",
    label: { es: "Producto", en: "Product" },
  },
  {
    id: "features",
    href: "#funciones",
    label: { es: "Funciones", en: "Features" },
  },
  {
    id: "integrations",
    href: "#integraciones",
    label: { es: "Integraciones", en: "Integrations" },
  },
  {
    id: "howItWorks",
    href: "#como-funciona",
    label: { es: "Cómo funciona", en: "How it works" },
  },
  {
    id: "pricing",
    href: "#precios",
    label: { es: "Precios", en: "Pricing" },
  },
  {
    id: "faq",
    href: "#preguntas",
    label: { es: "Preguntas", en: "FAQ" },
  },
  {
    id: "contact",
    href: "#contacto",
    label: { es: "Contacto", en: "Contact" },
  },
] as const satisfies readonly NavigationItem[];

export const NAVIGATION_ACTIONS = [
  {
    id: "login",
    href: "https://www.vantixapp.com.ar",
    label: { es: "Iniciar sesión", en: "Log in" },
    external: true,
    variant: "secondary",
  },
  {
    id: "bookDemo",
    href: "#contacto",
    label: { es: "Agendar una demo", en: "Book a demo" },
    external: false,
    variant: "primary",
  },
] as const satisfies readonly NavigationAction[];
