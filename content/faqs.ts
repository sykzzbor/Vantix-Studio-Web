import type { FaqDefinition } from "@/content/types";

export const FAQS = [
  {
    id: "agent",
    question: {
      es: "¿Cómo funciona el agente de IA?",
      en: "How does the AI agent work?",
    },
    answer: {
      es: "Responde usando la información que cargás en VantixApp: datos del negocio, productos, servicios, preguntas frecuentes e información de documentos. Si la consulta necesita criterio humano o no tiene información suficiente, puede derivarla al equipo.",
      en: "It replies using the information you add to VantixApp: business details, products, services, frequently asked questions and document content. If an inquiry requires human judgment or lacks enough information, it can hand it off to your team.",
    },
  },
  {
    id: "setup",
    question: {
      es: "¿Cuánto tarda la configuración?",
      en: "How long does setup take?",
    },
    answer: {
      es: "Crear el espacio y empezar a cargar conocimiento lleva pocos minutos. El tiempo total depende del volumen de información y de las integraciones que necesites; la conexión de WhatsApp se coordina según cada caso.",
      en: "Creating your workspace and adding knowledge takes only a few minutes. Total setup time depends on the amount of information and the integrations you need; WhatsApp connection is coordinated case by case.",
    },
  },
  {
    id: "team",
    question: {
      es: "¿VantixApp reemplaza a mi equipo?",
      en: "Does VantixApp replace my team?",
    },
    answer: {
      es: "No. El agente resuelve consultas repetitivas y mantiene la atención activa, mientras el equipo supervisa y toma las conversaciones que requieren decisión, negociación o trato personal.",
      en: "No. The agent handles repetitive inquiries and keeps service active, while your team supervises and takes over conversations that require decisions, negotiation or personal attention.",
    },
  },
  {
    id: "human-takeover",
    question: {
      es: "¿Cómo toma una conversación una persona?",
      en: "How does a person take over a conversation?",
    },
    answer: {
      es: "Desde la bandeja, un integrante autorizado puede tomar la conversación. El modo cambia de IA a atención humana y la persona responde con el contacto, las notas y el historial a la vista.",
      en: "An authorized teammate can take over directly from the inbox. The mode switches from AI to human service, and the person replies with the contact, notes and history in view.",
    },
  },
  {
    id: "security",
    question: {
      es: "¿Cómo se protege la información del negocio?",
      en: "How is business information protected?",
    },
    answer: {
      es: "La información se organiza por negocio y el acceso del equipo se controla mediante usuarios, responsables, roles y permisos. Para requisitos específicos de seguridad o cumplimiento, el equipo de Vantix puede detallar el alcance técnico antes de contratar.",
      en: "Information is organized by business, and team access is controlled through users, ownership, roles and permissions. For specific security or compliance requirements, the Vantix team can explain the technical scope before you subscribe.",
    },
  },
  {
    id: "integrations",
    question: {
      es: "¿Qué integraciones están disponibles?",
      en: "Which integrations are available?",
    },
    answer: {
      es: "WhatsApp Business, Google Calendar y documentos PDF están disponibles. Tiendanube, Google Sheets, WooCommerce y n8n se ofrecen en beta. La interpretación de imágenes y la comprensión de audios están previstas para más adelante. Los estados actualizados se muestran en la sección Integraciones.",
      en: "WhatsApp Business, Google Calendar and PDF documents are available. Tiendanube, Google Sheets, WooCommerce and n8n are offered in beta. Image and audio understanding are planned for a later release. Current statuses are listed in the Integrations section.",
    },
  },
  {
    id: "trial",
    question: {
      es: "¿Hay una prueba gratuita?",
      en: "Is there a free trial?",
    },
    answer: {
      es: "Sí. Podés probar VantixApp durante 5 días y recorrer la plataforma antes de elegir un plan.",
      en: "Yes. You can try VantixApp for 5 days and explore the platform before choosing a plan.",
    },
  },
  {
    id: "payments",
    question: {
      es: "¿Cómo se pagan los planes?",
      en: "How are plans paid?",
    },
    answer: {
      es: "Mercado Pago está disponible para la facturación y el pago de los planes de VantixApp. No es una integración para cobrarles a los clientes de tu negocio dentro de una conversación.",
      en: "Mercado Pago is available for VantixApp plan billing and payments. It is not an integration for charging your business's customers inside a conversation.",
    },
  },
  {
    id: "cancellation",
    question: {
      es: "¿Puedo cancelar el servicio?",
      en: "Can I cancel the service?",
    },
    answer: {
      es: "Sí. Podés solicitar la baja a soporte. Antes de contratar se informan con claridad la vigencia, la renovación y cualquier condición aplicable al plan elegido.",
      en: "Yes. You can request cancellation through support. Term, renewal and any conditions that apply to your chosen plan are clearly explained before subscribing.",
    },
  },
  {
    id: "support",
    question: {
      es: "¿Qué soporte incluye VantixApp?",
      en: "What support does VantixApp include?",
    },
    answer: {
      es: "El equipo acompaña la puesta en marcha y la resolución de consultas de uso. El alcance y los canales de soporte se confirman según el plan y las necesidades de implementación.",
      en: "The team assists with onboarding and product questions. Support scope and channels are confirmed according to your plan and implementation needs.",
    },
  },
  {
    id: "whatsapp",
    question: {
      es: "¿Tengo que cambiar mi número de WhatsApp?",
      en: "Do I need to change my WhatsApp number?",
    },
    answer: {
      es: "La conexión se hace mediante WhatsApp Business y se revisa según la situación de tu número actual. En la demo, el equipo confirma el proceso aplicable antes de realizar cualquier cambio.",
      en: "Connection uses WhatsApp Business and is reviewed based on your current number's situation. During the demo, the team confirms the applicable process before making any changes.",
    },
  },
  {
    id: "knowledge",
    question: {
      es: "¿Qué información puede aprender el agente?",
      en: "What information can the agent learn?",
    },
    answer: {
      es: "Podés cargar información general del negocio, productos, servicios, precios, preguntas frecuentes, instrucciones y documentos PDF, DOCX o TXT. El contenido debe mantenerse actualizado para que las respuestas reflejen la operación real.",
      en: "You can add general business information, products, services, prices, frequently asked questions, instructions and PDF, DOCX or TXT files. Content should be kept up to date so replies reflect the real operation.",
    },
  },
] as const satisfies readonly FaqDefinition[];
