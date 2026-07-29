import type { Locale, PlanDefinition, PlanLimits } from "@/content/types";

export const PRICING_SETTINGS = {
  trialDays: 5,
  currencies: ["USD", "ARS"],
  billingPeriod: {
    es: "por mes",
    en: "per month",
  },
  customPriceLabel: {
    es: "Hablemos",
    en: "Let's talk",
  },
  exchangeRateUnavailable: {
    es: "La cotización en ARS no está disponible por el momento. Podés continuar viendo los precios en USD.",
    en: "ARS pricing is temporarily unavailable. You can continue viewing prices in USD.",
  },
  variableCostsNote: {
    es: "Las tarifas variables de mensajería de WhatsApp y los consumos extraordinarios se informan antes de contratar.",
    en: "Variable WhatsApp messaging fees and extraordinary usage are disclosed before subscribing.",
  },
} as const;

export const PLANS = [
  {
    id: "standard",
    name: { es: "Standard", en: "Standard" },
    monthlyUsd: 89,
    description: {
      es: "Para centralizar y automatizar la atención de un negocio.",
      en: "For centralizing and automating customer service for one business.",
    },
    limits: {
      businesses: 1,
      users: 3,
      monthlyConversations: 1_000,
      monthlyAiMessages: 5_000,
    },
    includedFeatureIds: [
      "inbox",
      "ai-agent",
      "ai-human-mode",
      "crm",
      "notes-and-labels",
      "knowledge",
      "history",
      "metrics",
    ],
    highlights: [
      {
        es: "Bandeja compartida y modo IA / humano",
        en: "Shared inbox and AI / human mode",
      },
      {
        es: "CRM, notas, etiquetas e historial",
        en: "CRM, notes, labels and history",
      },
      {
        es: "Base de conocimiento y documentos",
        en: "Knowledge base and documents",
      },
    ],
    cta: "startTrial",
    featured: false,
  },
  {
    id: "professional",
    name: { es: "Profesional", en: "Professional" },
    monthlyUsd: 179,
    description: {
      es: "Para equipos que necesitan más capacidad, responsables y permisos.",
      en: "For teams that need more capacity, ownership and permissions.",
    },
    limits: {
      businesses: 3,
      users: 10,
      monthlyConversations: 5_000,
      monthlyAiMessages: 25_000,
    },
    includedFeatureIds: [
      "inbox",
      "ai-agent",
      "ai-human-mode",
      "crm",
      "notes-and-labels",
      "metrics",
      "team",
      "knowledge",
      "automations",
      "history",
    ],
    highlights: [
      {
        es: "Todo lo incluido en Standard",
        en: "Everything in Standard",
      },
      {
        es: "Equipos, responsables, roles y permisos",
        en: "Teams, ownership, roles and permissions",
      },
      {
        es: "Automatizaciones conectadas",
        en: "Connected automations",
      },
    ],
    cta: "startTrial",
    featured: true,
  },
  {
    id: "business",
    name: { es: "Empresarial", en: "Business" },
    monthlyUsd: 349,
    description: {
      es: "Para operaciones con varios negocios, mayor volumen y más integrantes.",
      en: "For operations with multiple businesses, higher volume and larger teams.",
    },
    limits: {
      businesses: 10,
      users: 30,
      monthlyConversations: 20_000,
      monthlyAiMessages: 100_000,
    },
    includedFeatureIds: [
      "inbox",
      "ai-agent",
      "ai-human-mode",
      "crm",
      "notes-and-labels",
      "metrics",
      "team",
      "knowledge",
      "automations",
      "history",
    ],
    highlights: [
      {
        es: "Todo lo incluido en Profesional",
        en: "Everything in Professional",
      },
      {
        es: "Capacidad para hasta 10 negocios y 30 usuarios",
        en: "Capacity for up to 10 businesses and 30 users",
      },
      {
        es: "Mayor volumen de conversaciones y mensajes de IA",
        en: "Higher conversation and AI-message volume",
      },
    ],
    cta: "startTrial",
    featured: false,
  },
  {
    id: "custom",
    name: { es: "Personalizado", en: "Custom" },
    monthlyUsd: null,
    description: {
      es: "Para una operación que necesita límites, implementación o alcance a medida.",
      en: "For operations that need tailored limits, implementation or scope.",
    },
    limits: {
      businesses: null,
      users: null,
      monthlyConversations: null,
      monthlyAiMessages: null,
    },
    includedFeatureIds: [
      "inbox",
      "ai-agent",
      "ai-human-mode",
      "crm",
      "notes-and-labels",
      "metrics",
      "team",
      "knowledge",
      "automations",
      "history",
    ],
    highlights: [
      {
        es: "Límites definidos según la operación",
        en: "Limits defined around your operation",
      },
      {
        es: "Implementación y alcance acordados con el equipo",
        en: "Implementation and scope agreed with the team",
      },
      {
        es: "Hablar con soporte para recibir una propuesta",
        en: "Talk to support for a proposal",
      },
    ],
    cta: "contactSales",
    featured: false,
  },
] as const satisfies readonly PlanDefinition[];

export const PLAN_LIMIT_LABELS = {
  businesses: { es: "negocios", en: "businesses" },
  users: { es: "usuarios", en: "users" },
  monthlyConversations: {
    es: "conversaciones por mes",
    en: "conversations per month",
  },
  monthlyAiMessages: {
    es: "mensajes de IA por mes",
    en: "AI messages per month",
  },
} as const satisfies Readonly<Record<keyof PlanLimits, Record<Locale, string>>>;
