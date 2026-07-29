import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-28");
  const localized = (
    spanishPath: string,
    englishPath: string,
    priority: number,
    changeFrequency: "monthly" | "yearly",
  ): MetadataRoute.Sitemap => {
    const languages = {
      "es-AR": `${SITE_URL}${spanishPath}`,
      en: `${SITE_URL}${englishPath}`,
      "x-default": `${SITE_URL}${spanishPath}`,
    };

    return [
      {
        url: `${SITE_URL}${spanishPath}`,
        lastModified,
        changeFrequency,
        priority,
        alternates: { languages },
      },
      {
        url: `${SITE_URL}${englishPath}`,
        lastModified,
        changeFrequency,
        priority,
        alternates: { languages },
      },
    ];
  };

  return [
    ...localized("/", "/en", 1, "monthly"),
    ...localized("/servicios", "/en/services", 0.6, "monthly"),
    ...localized("/privacidad", "/en/privacy", 0.3, "yearly"),
    ...localized("/terminos", "/en/terms", 0.3, "yearly"),
  ];
}
