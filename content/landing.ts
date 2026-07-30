import type { LocalizedText } from "@/content/types";

export const LANDING_COPY = {
  metrics: {
    eyebrow: { es: "Producto en acción", en: "Product in action" },
    title: {
      es: "Todo el negocio, en una vista más clara.",
      en: "Your whole business, in one clearer view.",
    },
    description: {
      es: "Conversaciones, conocimiento, servicios y actividad reunidos para que tu equipo entienda qué pasa y qué hacer después.",
      en: "Conversations, knowledge, services and activity together so your team understands what is happening and what to do next.",
    },
    cards: [
      {
        key: "summary",
        emoji: "📊",
        title: { es: "La operación, de un vistazo", en: "The operation at a glance" },
        description: {
          es: "Conversaciones, tiempos, derivaciones y actividad.",
          en: "Conversations, response times, handoffs and activity.",
        },
      },
      {
        key: "aiHuman",
        emoji: "🤝",
        title: { es: "IA y atención humana", en: "AI and human service" },
        description: {
          es: "Entendé cómo se reparte la atención.",
          en: "Understand how customer service is shared.",
        },
      },
      {
        key: "knowledge",
        emoji: "🧠",
        title: {
          es: "Preguntas que el agente conoce",
          en: "Questions the agent knows",
        },
        description: {
          es: "Editá respuestas y mantené la información al día.",
          en: "Edit answers and keep information up to date.",
        },
      },
      {
        key: "day",
        emoji: "💬",
        title: { es: "El volumen día por día", en: "Daily conversation volume" },
        description: {
          es: "Detectá cambios en la demanda.",
          en: "Spot changes in demand.",
        },
      },
      {
        key: "hourly",
        emoji: "🕒",
        title: {
          es: "Los horarios con más actividad",
          en: "Your busiest hours",
        },
        description: {
          es: "Organizá mejor la cobertura del equipo.",
          en: "Plan team coverage more effectively.",
        },
      },
      {
        key: "services",
        emoji: "🛠️",
        title: {
          es: "Servicios listos para responder",
          en: "Services ready for replies",
        },
        description: {
          es: "Precios, duración y disponibilidad en contexto.",
          en: "Prices, duration and availability in context.",
        },
      },
    ],
  },
  steps: {
    eyebrow: { es: "Puesta en marcha", en: "Getting started" },
    title: {
      es: "Tu espacio listo en tres movimientos.",
      en: "Your workspace ready in three moves.",
    },
    description: {
      es: "Configuramos el punto de partida y te acompañamos hasta que el agente queda operativo.",
      en: "We set up the starting point and support you until the agent is operational.",
    },
    items: [
      {
        emoji: "🏪",
        title: {
          es: "Elegí y configurá tu espacio",
          en: "Choose and configure your workspace",
        },
        description: {
          es: "Creá el negocio, invitá al equipo y definí roles.",
          en: "Create the business, invite your team and define roles.",
        },
      },
      {
        emoji: "📚",
        title: {
          es: "Cargá el conocimiento del negocio",
          en: "Add your business knowledge",
        },
        description: {
          es: "Sumá productos, servicios, preguntas y documentos.",
          en: "Add products, services, questions and documents.",
        },
      },
      {
        emoji: "🚀",
        title: {
          es: "Conectá tus canales y activá el agente",
          en: "Connect your channels and activate the agent",
        },
        description: {
          es: "Probá las respuestas, conectá las herramientas y empezá a atender.",
          en: "Test replies, connect your tools and start serving customers.",
        },
      },
    ],
  },
  integrations: {
    eyebrow: { es: "Integraciones", en: "Integrations" },
    title: {
      es: "Tu negocio ya usa estas herramientas. VantixApp las conecta.",
      en: "Your business already uses these tools. VantixApp connects them.",
    },
    description: {
      es: "Canales, agenda, comercio, documentos y automatizaciones dentro de una misma operación.",
      en: "Channels, scheduling, commerce, documents and automations within one operation.",
    },
    clarification: {
      es: "Mercado Pago se utiliza para la facturación de los planes de VantixApp.",
      en: "Mercado Pago is used for VantixApp plan billing.",
    },
  },
  webServicesBanner: {
    title: {
      es: "¿Necesitás una página web?",
      en: "Need a website?",
    },
    description: {
      es: "También hacemos landing pages, sitios y e-commerce a medida.",
      en: "We also build custom landing pages, websites and e-commerce stores.",
    },
    cta: {
      es: "Ver servicios web",
      en: "Explore web services",
    },
  },
  contact: {
    whatsapp: { es: "Consultar por WhatsApp", en: "Message us on WhatsApp" },
    note: {
      es: "También podés crear una cuenta y explorar VantixApp durante 5 días, sin tarjeta.",
      en: "You can also create an account and explore VantixApp for 5 days, with no card required.",
    },
  },
} as const satisfies {
  metrics: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
    cards: readonly {
      key: "summary" | "aiHuman" | "knowledge" | "day" | "hourly" | "services";
      emoji: string;
      title: LocalizedText;
      description: LocalizedText;
    }[];
  };
  steps: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
    items: readonly {
      emoji: string;
      title: LocalizedText;
      description: LocalizedText;
    }[];
  };
  integrations: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
    clarification: LocalizedText;
  };
  webServicesBanner: {
    title: LocalizedText;
    description: LocalizedText;
    cta: LocalizedText;
  };
  contact: {
    whatsapp: LocalizedText;
    note: LocalizedText;
  };
};
