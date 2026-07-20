import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.vantixdigitalweb.com.ar/",
      lastModified: new Date("2026-07-19"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.vantixdigitalweb.com.ar/servicios",
      lastModified: new Date("2026-07-19"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://www.vantixdigitalweb.com.ar/politicas/privacidad.html",
      lastModified: new Date("2026-07-18"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
