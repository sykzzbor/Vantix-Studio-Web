import type { Locale } from "@/content/types";

export const TRANSLATIONS = {
  es: {
    metadata: {
      title: "VantixApp | Atención, ventas y gestión con IA",
      description:
        "Centralizá tus conversaciones, respondé con la información de tu negocio y combiná atención con IA y humana desde VantixApp.",
      ogAlt: "VantixApp, plataforma de atención y gestión con IA",
    },
    accessibility: {
      skipToContent: "Saltar al contenido principal",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      selectLanguage: "Seleccionar idioma",
      switchToLight: "Usar modo claro",
      switchToDark: "Usar modo oscuro",
    },
    common: {
      available: "Disponible",
      beta: "En beta",
      comingSoon: "Próximamente",
      learnMore: "Conocer más",
      startTrial: "Probar gratis",
      bookDemo: "Agendar una demo",
      login: "Iniciar sesión",
      contactSales: "Hablar con soporte",
      mostChosen: "Más elegido",
      updated: "Actualizado",
    },
    hero: {
      eyebrow: "Atención y ventas con IA",
      titleLead: "Convertí tus conversaciones en ",
      titleHighlight: "clientes atendidos, organizados y listos para avanzar.",
      description:
        "VantixApp responde con la información de tu negocio, organiza cada contacto y permite que tu equipo tome el control cuando sea necesario.",
      primaryCta: "Probar gratis",
      secondaryCta: "Agendar una demo",
    },
    carousel: {
      label: "Capturas reales de VantixApp",
      previous: "Ver captura anterior",
      next: "Ver captura siguiente",
      goToSlide: "Ir a la captura",
      pause: "Pausar carrusel",
      play: "Reanudar carrusel",
    },
    problems: {
      eyebrow: "Atención sin desorden",
      title: "Cada consulta queda visible, respondida y lista para seguir.",
      description:
        "VantixApp reúne la operación que hoy se reparte entre teléfonos, chats, planillas y memoria.",
    },
    features: {
      eyebrow: "Producto real",
      title: "IA para responder. Herramientas para gestionar.",
      description:
        "Funciones conectadas entre sí para que la atención avance sin perder contexto.",
    },
    howItWorks: {
      eyebrow: "Puesta en marcha",
      title: "Empezá sin cambiar de golpe la forma de trabajar.",
      description:
        "Configuramos el espacio con tu información y acompañamos la conexión de los canales.",
      steps: [
        {
          title: "Creá tu negocio",
          description:
            "Registrá tu cuenta y completá los datos principales de la operación.",
        },
        {
          title: "Cargá productos, servicios y conocimiento",
          description:
            "Sumá la información que el agente necesita para responder con precisión.",
        },
        {
          title: "Conectá canales e integraciones",
          description:
            "Vinculá WhatsApp, agenda y las herramientas que correspondan a tu caso.",
        },
        {
          title: "Activá el agente",
          description:
            "Probá las respuestas, ajustá instrucciones y ponelo a atender.",
        },
        {
          title: "Supervisá conversaciones y resultados",
          description:
            "Tu equipo controla la bandeja, toma conversaciones y consulta métricas.",
        },
      ],
    },
    integrations: {
      eyebrow: "Integraciones",
      title: "Conectado con las herramientas que usa tu negocio.",
      description:
        "Canales, agenda, comercio, documentos y automatizaciones conectados a una misma operación.",
      billingClarification:
        "Mercado Pago se usa para pagar planes de VantixApp; no para cobrar ventas dentro de las conversaciones.",
    },
    pricing: {
      eyebrow: "Planes",
      title: "Elegí la capacidad que necesita tu operación.",
      description:
        "Todos los límites están centralizados y se muestran sin promesas ni costos ocultos.",
      monthly: "por mes",
      custom: "Precio personalizado",
      currencyLabel: "Moneda",
      exchangeUpdated: "Cotización actualizada",
      exchangeUnavailable:
        "ARS no está disponible temporalmente. Mostramos los precios en USD.",
      trial: "5 días de prueba",
      limitsTitle: "Capacidad incluida",
      featuresTitle: "Funciones incluidas",
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Lo importante antes de empezar.",
      description:
        "Respuestas concretas sobre el agente, WhatsApp, seguridad, pagos y soporte.",
    },
    contact: {
      eyebrow: "Demo y contacto",
      title: "Veamos cómo VantixApp encaja en tu negocio.",
      description:
        "Contanos cómo atendés hoy y coordinamos una demostración enfocada en tu operación.",
      submit: "Enviar consulta",
      sending: "Enviando…",
      success:
        "Recibimos tu consulta. El equipo de Vantix se va a contactar con vos.",
      error:
        "No pudimos enviar la consulta. Revisá los datos o intentá nuevamente.",
      fields: {
        name: "Nombre",
        business: "Negocio",
        email: "Email",
        phone: "Teléfono",
        conversationVolume: "Conversaciones aproximadas por mes",
        message: "Mensaje",
      },
      placeholders: {
        name: "Tu nombre",
        business: "Nombre de tu negocio",
        email: "nombre@negocio.com",
        phone: "+54 9…",
        conversationVolume: "Ej.: 500",
        message: "Contanos qué querés mejorar en la atención.",
      },
      validation: {
        required: "Completá este campo.",
        invalidEmail: "Ingresá un email válido.",
        invalidPhone: "Ingresá un teléfono válido.",
        invalidVolume: "Ingresá una cantidad válida.",
        messageTooLong: "El mensaje es demasiado largo.",
        rateLimited:
          "Recibimos varios intentos. Esperá unos minutos antes de volver a enviar.",
      },
    },
    footer: {
      tagline:
        "Atención, seguimiento y gestión de conversaciones con IA y control humano.",
      product: "Producto",
      company: "Vantix",
      legal: "Legal",
      privacy: "Privacidad",
      terms: "Términos",
      rights: "Todos los derechos reservados.",
    },
  },
  en: {
    metadata: {
      title: "VantixApp | AI-powered customer service, sales and management",
      description:
        "Centralize conversations, reply with your business information and combine AI and human service with VantixApp.",
      ogAlt: "VantixApp, an AI-powered customer service platform",
    },
    accessibility: {
      skipToContent: "Skip to main content",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      selectLanguage: "Select language",
      switchToLight: "Use light mode",
      switchToDark: "Use dark mode",
    },
    common: {
      available: "Available",
      beta: "Beta",
      comingSoon: "Coming soon",
      learnMore: "Learn more",
      startTrial: "Start free trial",
      bookDemo: "Book a demo",
      login: "Log in",
      contactSales: "Talk to support",
      mostChosen: "Most popular",
      updated: "Updated",
    },
    hero: {
      eyebrow: "AI-powered customer service and sales",
      titleLead: "Turn your conversations into ",
      titleHighlight: "customers who are served, organized and ready to move forward.",
      description:
        "VantixApp replies with your business information, organizes every contact and lets your team take control whenever needed.",
      primaryCta: "Start free",
      secondaryCta: "Book a demo",
    },
    carousel: {
      label: "Real VantixApp screenshots",
      previous: "View previous screenshot",
      next: "View next screenshot",
      goToSlide: "Go to screenshot",
      pause: "Pause carousel",
      play: "Resume carousel",
    },
    problems: {
      eyebrow: "Organized customer service",
      title: "Every inquiry stays visible, answered and ready for follow-up.",
      description:
        "VantixApp brings together the operation currently scattered across phones, chats, spreadsheets and memory.",
    },
    features: {
      eyebrow: "The real product",
      title: "AI for answering. Tools for managing.",
      description:
        "Connected features that keep customer service moving without losing context.",
    },
    howItWorks: {
      eyebrow: "Getting started",
      title: "Start without changing the way your team works overnight.",
      description:
        "We set up the workspace with your information and support you while connecting your channels.",
      steps: [
        {
          title: "Create your business",
          description:
            "Register your account and add the core details of your operation.",
        },
        {
          title: "Add products, services and knowledge",
          description:
            "Provide the information the agent needs to answer accurately.",
        },
        {
          title: "Connect channels and integrations",
          description:
            "Link WhatsApp, your calendar and the tools that fit your use case.",
        },
        {
          title: "Activate the agent",
          description:
            "Test its answers, adjust its instructions and put it to work.",
        },
        {
          title: "Monitor conversations and results",
          description:
            "Your team controls the inbox, takes over conversations and reviews analytics.",
        },
      ],
    },
    integrations: {
      eyebrow: "Integrations",
      title: "Connected to the tools your business uses.",
      description:
        "Channels, scheduling, commerce, documents and automations connected to one operation.",
      billingClarification:
        "Mercado Pago is used to pay for VantixApp plans, not to collect sales inside conversations.",
    },
    pricing: {
      eyebrow: "Plans",
      title: "Choose the capacity your operation needs.",
      description:
        "All limits are centralized and presented without vague promises or hidden costs.",
      monthly: "per month",
      custom: "Custom pricing",
      currencyLabel: "Currency",
      exchangeUpdated: "Exchange rate updated",
      exchangeUnavailable:
        "ARS is temporarily unavailable. Prices are displayed in USD.",
      trial: "5-day trial",
      limitsTitle: "Included capacity",
      featuresTitle: "Included features",
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "What matters before you start.",
      description:
        "Clear answers about the agent, WhatsApp, security, payments and support.",
    },
    contact: {
      eyebrow: "Demo and contact",
      title: "Let's see how VantixApp fits your business.",
      description:
        "Tell us how you handle customer service today and we'll schedule a demo focused on your operation.",
      submit: "Send inquiry",
      sending: "Sending…",
      success:
        "We received your inquiry. The Vantix team will get in touch with you.",
      error:
        "We could not send your inquiry. Check your details or try again.",
      fields: {
        name: "Name",
        business: "Business",
        email: "Email",
        phone: "Phone",
        conversationVolume: "Approximate conversations per month",
        message: "Message",
      },
      placeholders: {
        name: "Your name",
        business: "Your business name",
        email: "name@business.com",
        phone: "+1…",
        conversationVolume: "For example: 500",
        message: "Tell us what you want to improve in customer service.",
      },
      validation: {
        required: "Complete this field.",
        invalidEmail: "Enter a valid email.",
        invalidPhone: "Enter a valid phone number.",
        invalidVolume: "Enter a valid amount.",
        messageTooLong: "The message is too long.",
        rateLimited: "Too many attempts. Wait a few minutes and try again.",
      },
    },
    footer: {
      tagline:
        "AI-powered customer service, follow-up and conversation management with human control.",
      product: "Product",
      company: "Vantix",
      legal: "Legal",
      privacy: "Privacy",
      terms: "Terms",
      rights: "All rights reserved.",
    },
  },
} as const;

export type TranslationDictionary = (typeof TRANSLATIONS)["es"];

export function getTranslations(locale: Locale) {
  return TRANSLATIONS[locale];
}
