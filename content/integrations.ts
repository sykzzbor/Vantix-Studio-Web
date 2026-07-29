import type {
  AvailabilityStatus,
  IntegrationDefinition,
} from "@/content/types";

export const INTEGRATIONS = [
  {
    id: "whatsapp-business",
    name: { es: "WhatsApp Business", en: "WhatsApp Business" },
    description: {
      es: "Canal oficial para recibir y responder conversaciones desde la bandeja de VantixApp.",
      en: "Official channel for receiving and replying to conversations from the VantixApp inbox.",
    },
    status: "available",
    category: "channel",
    logoAlt: {
      es: "Logo de WhatsApp Business",
      en: "WhatsApp Business logo",
    },
  },
  {
    id: "tiendanube",
    name: { es: "Tiendanube", en: "Tiendanube" },
    description: {
      es: "Sincronización de solo lectura de productos, variantes, clientes y pedidos para consultarlos en VantixApp.",
      en: "Read-only sync of products, variants, customers and orders for review inside VantixApp.",
    },
    status: "available",
    category: "commerce",
    logoSrc: "/integrations/tiendanube.svg",
    logoAlt: { es: "Logo de Tiendanube", en: "Tiendanube logo" },
  },
  {
    id: "google-sheets",
    name: { es: "Google Sheets", en: "Google Sheets" },
    description: {
      es: "Exportación manual y unidireccional de clientes, conversaciones y métricas a una planilla.",
      en: "Manual, one-way export of customers, conversations and analytics to a spreadsheet.",
    },
    status: "available",
    category: "data",
    logoAlt: { es: "Logo de Google Sheets", en: "Google Sheets logo" },
  },
  {
    id: "google-calendar",
    name: { es: "Google Calendar", en: "Google Calendar" },
    description: {
      es: "Disponibilidad real para crear, reprogramar y cancelar turnos desde una conversación.",
      en: "Live availability to create, reschedule and cancel appointments from a conversation.",
    },
    status: "available",
    category: "calendar",
    logoAlt: {
      es: "Logo de Google Calendar",
      en: "Google Calendar logo",
    },
  },
  {
    id: "woocommerce",
    name: { es: "WooCommerce", en: "WooCommerce" },
    description: {
      es: "Sincronización de solo lectura de productos y datos operativos para consultarlos en VantixApp.",
      en: "Read-only sync of products and operational data for review inside VantixApp.",
    },
    status: "available",
    category: "commerce",
    logoAlt: { es: "Logo de WooCommerce", en: "WooCommerce logo" },
  },
  {
    id: "mercado-pago",
    name: { es: "Mercado Pago", en: "Mercado Pago" },
    description: {
      es: "Disponible únicamente para la facturación y el pago de planes de VantixApp.",
      en: "Available only for VantixApp plan billing and payments.",
    },
    status: "available",
    category: "billing",
    logoAlt: { es: "Logo de Mercado Pago", en: "Mercado Pago logo" },
    note: {
      es: "No procesa cobros de los clientes del negocio ni funciona como herramienta comercial dentro de las conversaciones.",
      en: "It does not process the business's customer payments and is not a sales tool inside conversations.",
    },
  },
  {
    id: "pdf",
    name: { es: "Documentos PDF", en: "PDF documents" },
    description: {
      es: "Los PDF se incorporan a la base de conocimiento para que el agente consulte su contenido.",
      en: "PDF files become part of the knowledge base so the agent can use their content.",
    },
    status: "available",
    category: "knowledge",
    icon: "document",
    logoAlt: {
      es: "Ícono de documento PDF",
      en: "PDF document icon",
    },
  },
  {
    id: "ai-images",
    name: {
      es: "Interpretación de imágenes",
      en: "Image understanding",
    },
    description: {
      es: "Comprensión de imágenes recibidas durante una conversación.",
      en: "Understanding images received during a conversation.",
    },
    status: "available",
    category: "knowledge",
    icon: "image",
    logoAlt: {
      es: "Ícono de interpretación de imágenes",
      en: "Image understanding icon",
    },
  },
  {
    id: "audio-understanding",
    name: { es: "Comprensión de audios", en: "Audio understanding" },
    description: {
      es: "Interpretación de mensajes de voz para incorporarlos al contexto del chat.",
      en: "Voice-message understanding to add their content to the chat context.",
    },
    status: "available",
    category: "knowledge",
    icon: "audio",
    logoAlt: {
      es: "Ícono de comprensión de audios",
      en: "Audio understanding icon",
    },
  },
  {
    id: "n8n",
    name: { es: "n8n", en: "n8n" },
    description: {
      es: "Flujos para seguimientos y acciones conectadas con la operación.",
      en: "Workflows for follow-ups and actions connected to your operation.",
    },
    status: "available",
    category: "automation",
    logoAlt: { es: "Logo de n8n", en: "n8n logo" },
  },
] as const satisfies readonly IntegrationDefinition[];

export const INTEGRATION_STATUS_LABELS = {
  available: { es: "Disponible", en: "Available" },
  beta: { es: "En beta", en: "Beta" },
  comingSoon: { es: "Próximamente", en: "Coming soon" },
} as const satisfies Readonly<
  Record<AvailabilityStatus, Readonly<Record<"es" | "en", string>>>
>;
