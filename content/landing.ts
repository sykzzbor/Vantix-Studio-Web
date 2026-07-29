import type { FeatureId, LocalizedText } from "@/content/types";

export const LANDING_COPY = {
  trust: [
    { es: "Prueba de 5 días", en: "5-day trial" },
    { es: "Credenciales cifradas", en: "Encrypted credentials" },
    {
      es: "Equipos, roles y permisos",
      en: "Teams, roles and permissions",
    },
    {
      es: "IA y control humano",
      en: "AI and human control",
    },
    {
      es: "Implementación acompañada",
      en: "Guided implementation",
    },
  ],
  product: {
    eyebrow: { es: "Todo en un solo lugar", en: "Everything in one place" },
    title: {
      es: "Una bandeja para atender, organizar y avanzar.",
      en: "One inbox to serve, organize and move forward.",
    },
    description: {
      es: "Cada conversación reúne el mensaje, los datos del contacto, el responsable y el historial. La IA atiende y tu equipo interviene sin perder contexto.",
      en: "Every conversation brings together the message, contact details, owner and history. AI handles service and your team steps in without losing context.",
    },
    benefits: [
      {
        title: { es: "Atención centralizada", en: "Centralized service" },
        description: {
          es: "Todos los chats en una bandeja compartida.",
          en: "Every chat in one shared inbox.",
        },
      },
      {
        title: {
          es: "Conocimiento real",
          en: "Real business knowledge",
        },
        description: {
          es: "Respuestas basadas en tu información.",
          en: "Replies grounded in your information.",
        },
      },
      {
        title: { es: "Control humano", en: "Human control" },
        description: {
          es: "Tu equipo toma la conversación cuando hace falta.",
          en: "Your team takes over whenever needed.",
        },
      },
      {
        title: { es: "Seguimiento completo", en: "Complete follow-up" },
        description: {
          es: "Estado, responsable, notas e historial a la vista.",
          en: "Status, owner, notes and history in view.",
        },
      },
    ],
  },
  features: {
    eyebrow: { es: "Funciones conectadas", en: "Connected features" },
    title: {
      es: "Menos herramientas sueltas. Más contexto para trabajar.",
      en: "Fewer disconnected tools. More context for getting work done.",
    },
    description: {
      es: "VantixApp combina atención, clientes, conocimiento y equipo dentro del mismo flujo.",
      en: "VantixApp combines service, customers, knowledge and teamwork in one workflow.",
    },
    security: {
      title: { es: "Seguridad y permisos", en: "Security and permissions" },
      description: {
        es: "Cada negocio mantiene su información separada y cada integrante accede según su rol.",
        en: "Each business keeps its information separate and every teammate gets role-based access.",
      },
      items: [
        { es: "Credenciales cifradas", en: "Encrypted credentials" },
        {
          es: "Roles Owner, Admin, Agent y Viewer",
          en: "Owner, Admin, Agent and Viewer roles",
        },
        {
          es: "Acceso separado por negocio",
          en: "Access separated by business",
        },
      ],
    },
    agentCaption: {
      es: "Probá y ajustá las respuestas antes de activar el agente.",
      en: "Test and refine replies before activating the agent.",
    },
  },
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
  trust: readonly LocalizedText[];
  product: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
    benefits: readonly {
      title: LocalizedText;
      description: LocalizedText;
    }[];
  };
  features: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
    security: {
      title: LocalizedText;
      description: LocalizedText;
      items: readonly LocalizedText[];
    };
    agentCaption: LocalizedText;
  };
  metrics: {
    eyebrow: LocalizedText;
    title: LocalizedText;
    description: LocalizedText;
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

export const FEATURE_BENTO = [
  {
    id: "inbox",
    icon: "inbox",
    featureIds: ["inbox", "crm", "notes-and-labels"],
    size: "wide",
  },
  {
    id: "agent",
    icon: "agent",
    featureIds: ["ai-agent", "ai-human-mode"],
    size: "hero",
  },
  {
    id: "team",
    icon: "team",
    featureIds: ["team", "history"],
    size: "standard",
  },
  {
    id: "knowledge",
    icon: "knowledge",
    featureIds: ["knowledge"],
    size: "standard",
  },
  {
    id: "automations",
    icon: "automation",
    featureIds: ["automations"],
    size: "standard",
  },
] as const satisfies readonly {
  id: string;
  icon: "inbox" | "agent" | "team" | "knowledge" | "automation";
  featureIds: readonly FeatureId[];
  size: "wide" | "hero" | "standard";
}[];
