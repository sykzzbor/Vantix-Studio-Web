import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VantixApp",
    short_name: "Vantix",
    description:
      "Atención, seguimiento y gestión de conversaciones con IA y control humano.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f1115",
    theme_color: "#4f7cff",
    icons: [
      {
        src: "/brand/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
