import type { FeatureId, LocalizedText, ScreenshotId } from "@/content/types";

export const LANDING_COPY = {
  product: {
    eyebrow: { es: "La operación, a la vista", en: "Your operation, in view" },
    title: {
      es: "Todas las conversaciones, sin perder el control.",
      en: "Every conversation, without losing control.",
    },
    description: {
      es: "VantixApp centraliza la atención del negocio. La IA responde automáticamente y una persona puede tomar la conversación cuando sea necesario.",
      en: "VantixApp centralizes customer service. AI replies automatically, and a person can take over whenever needed.",
    },
  },
  capabilities: {
    label: {
      es: "Capacidades incluidas en este flujo",
      en: "Capabilities included in this workflow",
    },
  },
  integrations: {
    betaNote: {
      es: "Las integraciones beta se habilitan según el caso. Tiendanube y WooCommerce son de consulta; Google Sheets exporta datos de forma manual y unidireccional.",
      en: "Beta integrations are enabled case by case. Tiendanube and WooCommerce are read-only; Google Sheets exports data manually in one direction.",
    },
  },
  useCases: {
    eyebrow: { es: "Casos de uso", en: "Use cases" },
    title: {
      es: "La misma plataforma, configurada para operaciones distintas.",
      en: "One platform, configured for different operations.",
    },
    description: {
      es: "VantixApp se adapta al conocimiento, el equipo y los procesos de cada negocio.",
      en: "VantixApp adapts to each business's knowledge, team and processes.",
    },
    problemLabel: { es: "Lo que pasa hoy", en: "What happens today" },
    outcomeLabel: { es: "Con VantixApp", en: "With VantixApp" },
  },
  comparison: {
    eyebrow: { es: "Antes y después", en: "Before and after" },
    title: {
      es: "Menos tareas sueltas. Más contexto para decidir.",
      en: "Fewer disconnected tasks. More context for decisions.",
    },
    beforeLabel: { es: "Sin centralizar", en: "Without centralization" },
    afterLabel: { es: "Con VantixApp", en: "With VantixApp" },
  },
  contact: {
    whatsapp: { es: "Consultar por WhatsApp", en: "Message us on WhatsApp" },
    note: {
      es: "También podés crear una cuenta y explorar VantixApp durante 5 días, sin tarjeta.",
      en: "You can also create an account and explore VantixApp for 5 days, with no card required.",
    },
  },
} as const;

export const PROBLEMS = [
  {
    number: "01",
    title: {
      es: "Consultas que llegan cuando nadie está conectado",
      en: "Inquiries that arrive while nobody is online",
    },
    description: {
      es: "El agente mantiene la atención activa con información real del negocio y deriva lo que necesita una persona.",
      en: "The agent keeps customer service active with real business information and hands off anything that needs a person.",
    },
  },
  {
    number: "02",
    title: {
      es: "Chats repartidos y seguimiento de memoria",
      en: "Scattered chats and memory-based follow-up",
    },
    description: {
      es: "La bandeja reúne conversaciones, contactos, estados, responsables, etiquetas y notas internas.",
      en: "The inbox brings together conversations, contacts, statuses, owners, labels and internal notes.",
    },
  },
  {
    number: "03",
    title: {
      es: "El equipo repite las mismas respuestas",
      en: "Your team repeats the same answers",
    },
    description: {
      es: "Productos, servicios, preguntas frecuentes y documentos forman una única base de conocimiento.",
      en: "Products, services, FAQs and documents become one shared knowledge base.",
    },
  },
] as const;

export const PRODUCT_SIGNALS = [
  {
    title: { es: "IA activa", en: "AI active" },
    description: {
      es: "Responde con el conocimiento cargado.",
      en: "Replies with the knowledge you provide.",
    },
  },
  {
    title: { es: "Atención humana", en: "Human service" },
    description: {
      es: "El equipo toma el control con un clic.",
      en: "Your team takes over with one click.",
    },
  },
  {
    title: { es: "Cliente identificado", en: "Customer identified" },
    description: {
      es: "Datos y contexto junto a la conversación.",
      en: "Details and context next to the conversation.",
    },
  },
  {
    title: { es: "Responsable visible", en: "Visible owner" },
    description: {
      es: "Cada consulta tiene seguimiento.",
      en: "Every inquiry has clear ownership.",
    },
  },
] as const satisfies readonly {
  title: LocalizedText;
  description: LocalizedText;
}[];

export const FEATURE_STORIES = [
  {
    id: "service",
    featureIds: ["inbox", "ai-human-mode", "history"] as const,
    screenshotId: "conversations-overview",
    layout: "wide",
  },
  {
    id: "knowledge",
    featureIds: ["ai-agent", "knowledge"] as const,
    screenshotId: "agent-playground",
    layout: "split",
  },
  {
    id: "customer",
    featureIds: ["crm", "notes-and-labels", "team"] as const,
    screenshotId: "conversations-human",
    layout: "reverse",
  },
  {
    id: "analytics",
    featureIds: ["metrics", "automations"] as const,
    screenshotId: "metrics-summary",
    layout: "metrics",
  },
] as const satisfies readonly {
  id: string;
  featureIds: readonly FeatureId[];
  screenshotId: ScreenshotId;
  layout: "wide" | "split" | "reverse" | "metrics";
}[];

export const USE_CASES = [
  {
    sector: { es: "Comercios y e-commerce", en: "Retail and e-commerce" },
    problem: {
      es: "Stock, precios, envíos y pedidos concentran consultas repetidas.",
      en: "Stock, pricing, shipping and orders generate repeated inquiries.",
    },
    outcome: {
      es: "El agente responde lo que conoce y el equipo recibe ordenado lo que necesita seguimiento.",
      en: "The agent answers what it knows and your team receives anything that needs follow-up in an organized way.",
    },
  },
  {
    sector: { es: "Negocios con turnos", en: "Appointment-based businesses" },
    problem: {
      es: "Coordinar disponibilidad por mensaje consume tiempo y genera idas y vueltas.",
      en: "Coordinating availability over chat takes time and creates unnecessary back-and-forth.",
    },
    outcome: {
      es: "Google Calendar permite consultar disponibilidad, crear, reprogramar y cancelar turnos.",
      en: "Google Calendar makes it possible to check availability and create, reschedule or cancel appointments.",
    },
  },
  {
    sector: { es: "Servicios profesionales", en: "Professional services" },
    problem: {
      es: "El equipo explica la misma información antes de saber si una consulta puede avanzar.",
      en: "The team repeats the same information before knowing whether an inquiry can move forward.",
    },
    outcome: {
      es: "La IA resuelve lo frecuente y deriva con el historial completo cuando hace falta criterio.",
      en: "AI handles common questions and hands off the complete history when judgment is required.",
    },
  },
  {
    sector: { es: "Equipos de atención y ventas", en: "Service and sales teams" },
    problem: {
      es: "Sin responsables ni estados claros, las oportunidades quedan sin retomar.",
      en: "Without clear ownership and statuses, opportunities are left behind.",
    },
    outcome: {
      es: "Cada conversación conserva contacto, responsable, estado, notas y etiquetas.",
      en: "Every conversation keeps its contact, owner, status, notes and labels together.",
    },
  },
] as const;

export const COMPARISON = [
  {
    before: {
      es: "Mensajes repartidos entre teléfonos",
      en: "Messages scattered across phones",
    },
    after: {
      es: "Una bandeja compartida con contexto",
      en: "One shared inbox with context",
    },
  },
  {
    before: {
      es: "Respuestas repetidas a mano",
      en: "Repeated answers written manually",
    },
    after: {
      es: "IA basada en la información del negocio",
      en: "AI grounded in business information",
    },
  },
  {
    before: {
      es: "Seguimiento que depende de la memoria",
      en: "Follow-up that depends on memory",
    },
    after: {
      es: "CRM, estados, responsables, notas y etiquetas",
      en: "CRM, statuses, owners, notes and labels",
    },
  },
  {
    before: {
      es: "Elegir entre automatización o atención personal",
      en: "Choosing between automation and personal service",
    },
    after: {
      es: "Modo IA y humano dentro de la misma conversación",
      en: "AI and human mode inside the same conversation",
    },
  },
] as const;
