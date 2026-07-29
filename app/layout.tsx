import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Lora, Nunito } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const bodyFont = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Lora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const siteUrl = "https://www.vantixdigitalweb.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VantixApp | Atención con IA para WhatsApp",
    template: "%s | Vantix",
  },
  description:
    "Centralizá conversaciones, automatizá respuestas con IA y mantené a tu equipo en control desde VantixApp.",
  applicationName: "VantixApp",
  authors: [{ name: "Vantix" }],
  icons: {
    icon: [{ url: "/brand/favicon.png", type: "image/png" }],
    apple: "/brand/favicon.png",
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1115" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-vantix-locale") === "en" ? "en" : "es-AR";

  return (
    <html
      lang={locale}
      className={`${bodyFont.variable} ${displayFont.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <Script src="/theme-init.js" strategy="beforeInteractive" />
      </head>
      <body>{children}</body>
    </html>
  );
}
