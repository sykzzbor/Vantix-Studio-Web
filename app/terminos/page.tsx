import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

const title = "Términos de uso";
const description =
  "Condiciones para usar el sitio público de Vantix y consultar por VantixApp o servicios de desarrollo.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/terminos",
    languages: {
      "es-AR": "/terminos",
      en: "/en/terms",
      "x-default": "/terminos",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    alternateLocale: ["en_US"],
    url: "/terminos",
    title,
    description,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function TermsRoute() {
  return <LegalPage locale="es" document="terms" />;
}
