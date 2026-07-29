import type { Metadata } from "next";
import { ServicesPage } from "@/components/ServicesPage";

const title = "Web design and custom software services";
const description =
  "Landing pages, business websites, e-commerce and custom systems developed by Vantix in Córdoba, Argentina. Real projects and direct support.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/en/services",
    languages: {
      "es-AR": "/servicios",
      en: "/en/services",
      "x-default": "/servicios",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_AR"],
    url: "/en/services",
    title,
    description,
    images: [
      {
        url: "/images/perfiles-americanos-desktop.png",
        width: 1425,
        height: 891,
        alt: "Website project developed by Vantix Design Studio",
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

export default function ServicesRoute() {
  return <ServicesPage locale="en" />;
}
