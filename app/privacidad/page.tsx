import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

const title = "Política de privacidad";
const description =
  "Cómo Vantix trata los datos enviados desde el sitio público, el formulario de contacto y sus canales de comunicación.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/privacidad",
    languages: {
      "es-AR": "/privacidad",
      en: "/en/privacy",
      "x-default": "/privacidad",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    alternateLocale: ["en_US"],
    url: "/privacidad",
    title,
    description,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function PrivacyRoute() {
  return <LegalPage locale="es" document="privacy" />;
}
