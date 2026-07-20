import type { Metadata, Viewport } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const siteUrl = "https://www.vantixdigitalweb.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "VantixApp | Atención con IA y CRM para WhatsApp",
  description:
    "VantixApp responde consultas con IA, organiza clientes con CRM y gestiona turnos desde WhatsApp. Probalo gratis por 5 días, sin tarjeta de crédito.",
  alternates: { canonical: "/" },
  applicationName: "VantixApp",
  authors: [{ name: "Vantix" }],
  icons: {
    icon: [
      { url: "/images/vantix-mark-256w.webp", type: "image/webp" },
    ],
    apple: "/images/vantix-mark-512w.webp",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: "VantixApp",
    title: "VantixApp | Atención con IA y CRM para WhatsApp",
    description:
      "Convertí las consultas de WhatsApp en clientes, incluso cuando no estás conectado. Prueba gratuita de 5 días.",
    images: [
      {
        url: "/images/vantix-hero-1920w.webp",
        width: 1920,
        height: 1080,
        alt: "VantixApp, plataforma de atención con IA para WhatsApp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VantixApp | Atención con IA y CRM para WhatsApp",
    description:
      "Atención automática y humana, CRM y turnos en una sola bandeja. Prueba gratuita de 5 días.",
    images: ["/images/vantix-hero-1920w.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f1115",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
