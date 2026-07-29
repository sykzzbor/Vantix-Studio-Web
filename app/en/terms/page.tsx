import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

const title = "Terms of use";
const description =
  "Terms for using the public Vantix website and enquiring about VantixApp or development services.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/terms",
    languages: {
      "es-AR": "/terminos",
      en: "/en/terms",
      "x-default": "/terminos",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_AR"],
    url: "/en/terms",
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
  return <LegalPage locale="en" document="terms" />;
}
