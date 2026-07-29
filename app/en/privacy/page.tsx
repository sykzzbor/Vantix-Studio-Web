import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

const title = "Privacy policy";
const description =
  "How Vantix handles information submitted through the public website, contact form and communication channels.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/privacy",
    languages: {
      "es-AR": "/privacidad",
      en: "/en/privacy",
      "x-default": "/privacidad",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_AR"],
    url: "/en/privacy",
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
  return <LegalPage locale="en" document="privacy" />;
}
