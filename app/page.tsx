import type { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";
import { getTranslations } from "@/content";
import { SITE_URL } from "@/lib/site";

const t = getTranslations("es");

export const metadata: Metadata = {
  title: { absolute: t.metadata.title },
  description: t.metadata.description,
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      "es-AR": `${SITE_URL}/`,
      en: `${SITE_URL}/en`,
      "x-default": `${SITE_URL}/`,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    alternateLocale: ["en_US"],
    url: `${SITE_URL}/`,
    siteName: "Vantix",
    title: t.metadata.title,
    description: t.metadata.description,
    images: [
      {
        url: "/screenshots/light/conversations-overview.jpeg",
        width: 1280,
        height: 647,
        alt: t.metadata.ogAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: t.metadata.title,
    description: t.metadata.description,
    images: ["/screenshots/light/conversations-overview.jpeg"],
  },
};

export default function HomePage() {
  return <LandingPage locale="es" />;
}
