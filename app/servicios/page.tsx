import type { Metadata } from "next";
import { ServicesPage } from "@/components/ServicesPage";

const title = "Servicios web y sistemas a medida";
const description =
  "Landing pages, sitios web, e-commerce y sistemas personalizados desarrollados por Vantix en Córdoba. Proyectos reales y trato directo.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/servicios",
    languages: {
      "es-AR": "/servicios",
      en: "/en/services",
      "x-default": "/servicios",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    alternateLocale: ["en_US"],
    url: "/servicios",
    title,
    description,
    images: [
      {
        url: "/images/perfiles-americanos-desktop.png",
        width: 1425,
        height: 891,
        alt: "Proyecto web desarrollado por Vantix Design Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/perfiles-americanos-desktop.png"],
  },
};

export default function ServiciosRoute() {
  return <ServicesPage locale="es" />;
}
