import type { TestimonialDefinition } from "@/content/types";

/**
 * Datos exclusivamente demostrativos para validar el componente visual.
 * No representan clientes, empresas ni resultados reales. Se publican solamente
 * con una insignia visible de demostración. Reemplazar y cambiar `isDemo`
 * únicamente cuando Vantix reciba autorización del cliente.
 */
export const TESTIMONIALS = [
  {
    id: "demo-retail",
    isDemo: true,
    published: true,
    badge: {
      es: "Contenido de demostración",
      en: "Demonstration content",
    },
    name: { es: "Perfil demo 01", en: "Demo profile 01" },
    role: {
      es: "Responsable de atención",
      en: "Customer service lead",
    },
    business: {
      es: "Comercio de ejemplo",
      en: "Sample retail business",
    },
    quote: {
      es: "Ejemplo de cómo podría mostrarse un testimonio real sobre bandeja compartida, respuestas y seguimiento.",
      en: "Example of how a real testimonial about the shared inbox, replies and follow-up could be presented.",
    },
    result: {
      es: "Resultado pendiente de validación con un cliente real.",
      en: "Result pending validation with a real customer.",
    },
  },
  {
    id: "demo-appointments",
    isDemo: true,
    published: true,
    badge: {
      es: "Contenido de demostración",
      en: "Demonstration content",
    },
    name: { es: "Perfil demo 02", en: "Demo profile 02" },
    role: {
      es: "Coordinación de turnos",
      en: "Appointment coordinator",
    },
    business: {
      es: "Negocio de servicios de ejemplo",
      en: "Sample service business",
    },
    quote: {
      es: "Ejemplo de cómo podría presentarse una experiencia real usando conversaciones y Google Calendar.",
      en: "Example of how a real experience using conversations and Google Calendar could be presented.",
    },
    result: {
      es: "Resultado pendiente de validación con un cliente real.",
      en: "Result pending validation with a real customer.",
    },
  },
  {
    id: "demo-team",
    isDemo: true,
    published: true,
    badge: {
      es: "Contenido de demostración",
      en: "Demonstration content",
    },
    name: { es: "Perfil demo 03", en: "Demo profile 03" },
    role: {
      es: "Liderazgo comercial",
      en: "Sales lead",
    },
    business: {
      es: "Equipo comercial de ejemplo",
      en: "Sample sales team",
    },
    quote: {
      es: "Ejemplo de cómo podría mostrarse un testimonio real sobre responsables, historial y modo IA / humano.",
      en: "Example of how a real testimonial about ownership, history and AI / human mode could be presented.",
    },
    result: {
      es: "Resultado pendiente de validación con un cliente real.",
      en: "Result pending validation with a real customer.",
    },
  },
] as const satisfies readonly TestimonialDefinition[];

export const PUBLISHED_TESTIMONIALS = TESTIMONIALS.filter(
  (testimonial) => testimonial.published,
);

export const HAS_PUBLISHED_TESTIMONIALS = PUBLISHED_TESTIMONIALS.length > 0;
