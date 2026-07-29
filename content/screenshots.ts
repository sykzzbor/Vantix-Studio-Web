import type {
  LandingScreenshotPlacementMap,
  ScreenshotDefinition,
  ScreenshotId,
  Theme,
} from "@/content/types";

export const SCREENSHOTS = [
  {
    id: "conversations-overview",
    alt: {
      es: "Bandeja centralizada de conversaciones de VantixApp",
      en: "VantixApp centralized conversation inbox",
    },
    assets: {
      light: {
        src: "/screenshots/light/conversations-overview.jpeg",
        width: 1280,
        height: 647,
      },
      dark: {
        src: "/screenshots/dark/conversations-overview.jpeg",
        width: 1280,
        height: 647,
      },
    },
  },
  {
    id: "conversations-human",
    alt: {
      es: "Conversación atendida por una persona dentro de VantixApp",
      en: "Conversation handled by a person in VantixApp",
    },
    assets: {
      light: {
        src: "/screenshots/light/conversations-human.jpeg",
        width: 1280,
        height: 645,
      },
      dark: {
        src: "/screenshots/dark/conversations-human.jpeg",
        width: 1280,
        height: 645,
      },
    },
  },
  {
    id: "conversations-ai",
    alt: {
      es: "Conversación atendida por el agente de IA de VantixApp",
      en: "Conversation handled by the VantixApp AI agent",
    },
    assets: {
      light: {
        src: "/screenshots/light/conversations-ai.jpeg",
        width: 1280,
        height: 647,
      },
      dark: {
        src: "/screenshots/dark/conversations-ai.jpeg",
        width: 1280,
        height: 647,
      },
    },
  },
  {
    id: "agent-playground",
    alt: {
      es: "Chat de prueba del agente de VantixApp",
      en: "VantixApp agent testing chat",
    },
    assets: {
      light: {
        src: "/screenshots/light/agent-playground.jpeg",
        width: 1280,
        height: 475,
      },
      dark: {
        src: "/screenshots/dark/agent-playground.jpeg",
        width: 1280,
        height: 473,
      },
    },
  },
  {
    id: "metrics-summary",
    alt: {
      es: "Resumen de métricas de atención de VantixApp",
      en: "VantixApp customer service metrics summary",
    },
    assets: {
      light: {
        src: "/screenshots/light/metrics-summary.jpeg",
        width: 1280,
        height: 410,
      },
      dark: {
        src: "/screenshots/dark/metrics-summary.jpeg",
        width: 1280,
        height: 408,
      },
    },
  },
  {
    id: "metrics-conversations-day",
    alt: {
      es: "Gráfico de conversaciones por día en VantixApp",
      en: "VantixApp conversations per day chart",
    },
    assets: {
      light: {
        src: "/screenshots/light/metrics-conversations-day.jpeg",
        width: 644,
        height: 303,
      },
      dark: {
        src: "/screenshots/dark/metrics-conversations-day.jpeg",
        width: 712,
        height: 330,
      },
    },
  },
  {
    id: "metrics-hourly",
    alt: {
      es: "Gráfico de actividad por horario en VantixApp",
      en: "VantixApp activity by hour chart",
    },
    assets: {
      light: {
        src: "/screenshots/light/metrics-hourly.jpeg",
        width: 649,
        height: 304,
      },
      dark: {
        src: "/screenshots/dark/metrics-hourly.jpeg",
        width: 713,
        height: 328,
      },
    },
  },
  {
    id: "metrics-ai-human",
    alt: {
      es: "Comparación de atención con IA y humana en VantixApp",
      en: "VantixApp AI and human service comparison",
    },
    assets: {
      light: {
        src: "/screenshots/light/metrics-ai-human.jpeg",
        width: 640,
        height: 246,
      },
      dark: {
        src: "/screenshots/dark/metrics-ai-human.jpeg",
        width: 710,
        height: 272,
      },
    },
  },
  {
    id: "knowledge-faqs",
    alt: {
      es: "Preguntas frecuentes configuradas en la base de conocimiento de VantixApp",
      en: "Frequently asked questions configured in the VantixApp knowledge base",
    },
    assets: {
      light: {
        src: "/screenshots/light/knowledge-faqs.png",
        width: 2630,
        height: 820,
      },
      dark: {
        src: "/screenshots/dark/knowledge-faqs.png",
        width: 2648,
        height: 808,
      },
    },
  },
  {
    id: "business-services",
    alt: {
      es: "Servicios del negocio configurados en VantixApp",
      en: "Business services configured in VantixApp",
    },
    assets: {
      light: {
        src: "/screenshots/light/business-services.png",
        width: 2658,
        height: 700,
      },
      dark: {
        src: "/screenshots/dark/business-services.png",
        width: 2616,
        height: 696,
      },
    },
  },
] as const satisfies readonly ScreenshotDefinition[];

export const SCREENSHOTS_BY_ID = Object.fromEntries(
  SCREENSHOTS.map((screenshot) => [screenshot.id, screenshot]),
) as Readonly<Record<ScreenshotId, (typeof SCREENSHOTS)[number]>>;

/**
 * Single source of truth for every product screenshot rendered on the landing.
 *
 * `conversations-ai` remains available in SCREENSHOTS, but is intentionally not
 * assigned here because its dark asset has the same contents as
 * `conversations-overview`.
 */
export const LANDING_SCREENSHOT_PLACEMENTS = {
  hero: "conversations-overview",
  metricsSummary: "metrics-summary",
  metricsDay: "metrics-conversations-day",
  metricsHourly: "metrics-hourly",
  metricsAiHuman: "metrics-ai-human",
  knowledgeFaqs: "knowledge-faqs",
  businessServices: "business-services",
} as const satisfies LandingScreenshotPlacementMap;

export function getScreenshotAsset(id: ScreenshotId, theme: Theme) {
  return SCREENSHOTS_BY_ID[id].assets[theme];
}
