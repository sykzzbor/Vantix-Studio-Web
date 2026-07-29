import type { LocalizedText } from "@/content/types";

export const LANDING_COPY = {
  metrics: {
    eyebrow: { es: "Métricas", en: "Analytics" },
    title: {
      es: "La atención, vista como una operación completa.",
      en: "Customer service, viewed as one complete operation.",
    },
    description: {
      es: "Volumen, actividad, tiempos de respuesta y participación de la IA reunidos en un solo panel.",
      en: "Volume, activity, response times and AI participation brought together in one dashboard.",
    },
    capabilities: [
      {
        icon: "inbox",
        title: { es: "Bandeja y CRM", en: "Inbox and CRM" },
        description: {
          es: "Conversaciones, clientes, etiquetas y notas con contexto.",
          en: "Conversations, customers, labels and notes in context.",
        },
      },
      {
        icon: "agent",
        title: { es: "IA y control humano", en: "AI and human control" },
        description: {
          es: "La IA atiende y el equipo interviene.",
          en: "AI handles service and people step in.",
        },
      },
      {
        icon: "team",
        title: { es: "Equipo y seguimiento", en: "Team and follow-up" },
        description: {
          es: "Responsables, roles, permisos e historial.",
          en: "Owners, roles, permissions and history.",
        },
      },
      {
        icon: "automation",
        title: {
          es: "Conocimiento y automatizaciones",
          en: "Knowledge and automations",
        },
        description: {
          es: "Información real y acciones conectadas.",
          en: "Real information and connected actions.",
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
    capabilities: readonly {
      icon: "inbox" | "agent" | "team" | "automation";
      title: LocalizedText;
      description: LocalizedText;
    }[];
  };
  steps: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
    items: readonly {
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
  contact: {
    whatsapp: LocalizedText;
    note: LocalizedText;
  };
};
