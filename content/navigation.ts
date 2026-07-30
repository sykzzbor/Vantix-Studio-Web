import type {
  NavigationAction,
  NavigationItem,
} from "@/content/types";

export const NAVIGATION = [
  {
    id: "product",
    href: "#inicio",
    label: { es: "Producto", en: "Product" },
  },
  {
    id: "features",
    href: "#metricas",
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
] as const satisfies readonly NavigationItem[];

export const SOLUTION_NAVIGATION = [
  {
    id: "vantixapp",
    href: { es: "/", en: "/en" },
    label: { es: "VantixApp", en: "VantixApp" },
  },
  {
    id: "web-design",
    href: { es: "/servicios", en: "/en/services" },
    label: { es: "Diseño web", en: "Web design" },
  },
] as const;

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
