import type { FeatureDefinition } from "@/content/types";

export const FEATURES = [
  {
    id: "inbox",
    status: "available",
    eyebrow: { es: "Bandeja compartida", en: "Shared inbox" },
    title: {
      es: "Todas las conversaciones en un solo lugar",
      en: "Every conversation in one place",
    },
    description: {
      es: "El equipo ve los chats, el estado de cada consulta y la información del contacto sin depender de un único teléfono.",
      en: "Your team sees every chat, each inquiry status and the contact details without relying on a single phone.",
    },
    bullets: [
      {
        es: "Lista de conversaciones con filtros y responsables",
        en: "Conversation list with filters and owners",
      },
      {
        es: "Contexto del cliente junto al chat",
        en: "Customer context next to the chat",
      },
      {
        es: "Estados visibles para todo el equipo",
        en: "Statuses visible to the whole team",
      },
    ],
    screenshotId: "conversations-overview",
  },
  {
    id: "ai-agent",
    status: "available",
    eyebrow: { es: "Agente de IA", en: "AI agent" },
    title: {
      es: "Respuestas basadas en la información de tu negocio",
      en: "Answers grounded in your business information",
    },
    description: {
      es: "El agente usa los datos, productos, servicios, preguntas y documentos que cargás. Cuando no puede resolver una consulta, la deriva.",
      en: "The agent uses the data, products, services, questions and documents you provide. When it cannot resolve an inquiry, it hands it off.",
    },
    bullets: [
      {
        es: "Chat de prueba antes de activar el agente",
        en: "Test chat before activating the agent",
      },
      {
        es: "Contexto separado para cada negocio",
        en: "Separate context for each business",
      },
      {
        es: "Derivación cuando hace falta criterio humano",
        en: "Handoff when human judgment is needed",
      },
    ],
    screenshotId: "agent-playground",
  },
  {
    id: "ai-human-mode",
    status: "available",
    eyebrow: { es: "IA + equipo", en: "AI + team" },
    title: {
      es: "La IA atiende; una persona toma el control cuando hace falta",
      en: "AI handles the conversation; a person takes over when needed",
    },
    description: {
      es: "Cada conversación indica quién está atendiendo. El equipo puede tomarla, responder con todo el historial a la vista y devolverla al agente.",
      en: "Every conversation shows who is handling it. Your team can take over, reply with the full history in view and return it to the agent.",
    },
    bullets: [
      {
        es: "Cambio claro entre modo IA y humano",
        en: "Clear switch between AI and human mode",
      },
      {
        es: "Responsable visible por conversación",
        en: "Visible owner for each conversation",
      },
      {
        es: "Historial conservado durante el traspaso",
        en: "History preserved during handoff",
      },
    ],
    screenshotId: "conversations-human",
  },
  {
    id: "crm",
    status: "available",
    eyebrow: { es: "CRM", en: "CRM" },
    title: {
      es: "Cada contacto queda organizado para seguirlo",
      en: "Every contact stays organized for follow-up",
    },
    description: {
      es: "VantixApp reúne los datos del cliente, sus conversaciones, estado y responsable para que el seguimiento no dependa de la memoria.",
      en: "VantixApp brings together customer details, conversations, status and owner so follow-up does not depend on memory.",
    },
    bullets: [
      {
        es: "Ficha de cliente e historial",
        en: "Customer profile and history",
      },
      {
        es: "Estado y responsable",
        en: "Status and owner",
      },
      {
        es: "Seguimiento compartido por el equipo",
        en: "Team-wide follow-up",
      },
    ],
    screenshotId: "conversations-overview",
  },
  {
    id: "notes-and-labels",
    status: "available",
    eyebrow: { es: "Contexto interno", en: "Internal context" },
    title: {
      es: "Etiquetas y notas que ordenan la atención",
      en: "Labels and notes that keep service organized",
    },
    description: {
      es: "Clasificá conversaciones y dejá información interna para el equipo sin enviársela al cliente.",
      en: "Classify conversations and leave internal information for your team without sending it to the customer.",
    },
    bullets: [
      {
        es: "Etiquetas aplicadas a cada conversación",
        en: "Labels applied to each conversation",
      },
      {
        es: "Notas internas que el cliente no recibe",
        en: "Internal notes hidden from the customer",
      },
      {
        es: "Información disponible durante el seguimiento",
        en: "Information available throughout follow-up",
      },
    ],
    screenshotId: "conversations-human",
  },
  {
    id: "metrics",
    status: "available",
    eyebrow: { es: "Métricas", en: "Analytics" },
    title: {
      es: "Medí la atención con datos de tu operación",
      en: "Measure customer service with operational data",
    },
    description: {
      es: "Consultá conversaciones recibidas, respuestas de IA y humanas, primera respuesta, derivaciones y actividad por período.",
      en: "Review conversations received, AI and human replies, first response time, handoffs and activity by period.",
    },
    bullets: [
      {
        es: "Filtros por período y canal",
        en: "Filters by period and channel",
      },
      {
        es: "Actividad por día y horario",
        en: "Activity by day and hour",
      },
      {
        es: "Comparación entre atención con IA y humana",
        en: "AI and human service comparison",
      },
    ],
    screenshotId: "metrics-summary",
  },
  {
    id: "team",
    status: "available",
    eyebrow: { es: "Equipo y permisos", en: "Team and permissions" },
    title: {
      es: "Responsables y permisos para trabajar en conjunto",
      en: "Ownership and permissions for working together",
    },
    description: {
      es: "Asigná conversaciones y definí qué puede ver o administrar cada integrante según su rol.",
      en: "Assign conversations and define what each teammate can view or manage according to their role.",
    },
    bullets: [
      {
        es: "Roles Owner, Admin, Agent y Viewer",
        en: "Owner, Admin, Agent and Viewer roles",
      },
      {
        es: "Asignación de responsables",
        en: "Conversation ownership",
      },
      {
        es: "Acceso controlado por organización",
        en: "Organization-based access control",
      },
    ],
    screenshotId: "conversations-human",
  },
  {
    id: "knowledge",
    status: "available",
    eyebrow: { es: "Conocimiento", en: "Knowledge" },
    title: {
      es: "Una fuente clara para las respuestas del agente",
      en: "One clear source for the agent's answers",
    },
    description: {
      es: "Centralizá la información del negocio, productos, servicios, preguntas frecuentes y documentos que necesita el agente.",
      en: "Centralize the business information, products, services, frequently asked questions and documents the agent needs.",
    },
    bullets: [
      {
        es: "Productos y servicios",
        en: "Products and services",
      },
      {
        es: "Preguntas frecuentes e instrucciones",
        en: "Frequently asked questions and instructions",
      },
      {
        es: "Documentos PDF, DOCX y TXT",
        en: "PDF, DOCX and TXT documents",
      },
    ],
    screenshotId: "agent-playground",
  },
  {
    id: "automations",
    status: "available",
    eyebrow: { es: "Automatizaciones", en: "Automations" },
    title: {
      es: "Acciones conectadas a lo que pasa en cada conversación",
      en: "Actions connected to what happens in each conversation",
    },
    description: {
      es: "Conectá seguimientos y acciones operativas con flujos configurados para la forma de trabajar de tu negocio.",
      en: "Connect follow-ups and operational actions through workflows configured around the way your business works.",
    },
    bullets: [
      {
        es: "Flujos conectados mediante n8n",
        en: "Flows connected through n8n",
      },
      {
        es: "Configuración acompañada por Vantix",
        en: "Setup supported by Vantix",
      },
      {
        es: "Flujos adaptados a cada operación",
        en: "Workflows adapted to each operation",
      },
    ],
    screenshotId: "conversations-ai",
  },
  {
    id: "history",
    status: "available",
    eyebrow: { es: "Historial", en: "History" },
    title: {
      es: "El contexto queda disponible para el próximo paso",
      en: "Context stays available for the next step",
    },
    description: {
      es: "Mensajes, cambios de atención, estados, responsables, notas y etiquetas quedan asociados a la conversación.",
      en: "Messages, handoffs, statuses, owners, notes and labels stay associated with the conversation.",
    },
    bullets: [
      {
        es: "Conversación completa en un mismo lugar",
        en: "Complete conversation in one place",
      },
      {
        es: "Continuidad entre la IA y el equipo",
        en: "Continuity between AI and your team",
      },
      {
        es: "Información útil para retomar cada oportunidad",
        en: "Useful information for resuming every opportunity",
      },
    ],
    screenshotId: "conversations-ai",
  },
] as const satisfies readonly FeatureDefinition[];
