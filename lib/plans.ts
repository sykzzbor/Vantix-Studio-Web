// Fuente única de los precios publicados en la web comercial. Debe mantenerse
// alineada con la definición comercial vigente antes de cada lanzamiento.

export const TRIAL_DAYS = 5;

export type PlanId = "STANDARD" | "PROFESSIONAL" | "ENTERPRISE";

export type PlanDefinition = {
  id: PlanId;
  name: string;
  usdMonthly: number;
  description: string;
  recommended: boolean;
  features: readonly string[];
};

export const PLANS: readonly PlanDefinition[] = [
  {
    id: "STANDARD",
    name: "Standard",
    usdMonthly: 90,
    description: "La base operativa para centralizar la atención de un negocio.",
    recommended: false,
    features: [
      "1 agente de IA",
      "Hasta 350 conversaciones por mes",
      "1 conexión de WhatsApp API",
      "Bandeja compartida y CRM de clientes",
      "Base de conocimiento con documentos",
      "Turnos con Google Calendar",
    ],
  },
  {
    id: "PROFESSIONAL",
    name: "Profesional",
    usdMonthly: 179,
    description:
      "Para equipos que necesitan automatización, agenda y mayor control.",
    recommended: true,
    features: [
      "Todo lo incluido en Standard",
      "Automatizaciones y seguimientos automáticos",
      "Gestión completa de turnos con Google Calendar",
      "Métricas avanzadas",
      "Roles y gestión de equipo",
    ],
  },
  {
    id: "ENTERPRISE",
    name: "Empresarial",
    usdMonthly: 400,
    description:
      "Mayor capacidad y acompañamiento para operaciones consolidadas.",
    recommended: false,
    features: [
      "Todo lo incluido en Profesional",
      "Mayor capacidad operativa",
      "Flujos e integraciones avanzadas",
      "Acompañamiento de implementación",
      "Soporte prioritario",
    ],
  },
] as const;
