import { ArrowIcon, CheckIcon } from "@/components/ArrowIcon";
import { DemoFlow } from "@/components/DemoFlow";
import { Faq } from "@/components/Faq";
import { IntegrationIcon, type IntegrationIconName } from "@/components/IntegrationIcon";
import { PricingSection } from "@/components/PricingSection";
import { ProductView } from "@/components/ProductViews";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ScrollDepth, TrackedLink } from "@/components/Tracked";
import { getPlansExchangeRate } from "@/lib/exchange-rate";
import { PLANS, TRIAL_DAYS } from "@/lib/plans";
import {
  APP_URL,
  APP_REGISTER_URL,
  DEMO_WHATSAPP_MESSAGE,
  SITE_URL,
  WHATSAPP_NUMBER,
  whatsAppLink,
} from "@/lib/site";

const problems = [
  {
    title: "Consultas fuera de horario",
    text: "Los clientes escriben de noche o el fin de semana y la respuesta llega tarde, cuando ya compraron en otro lado.",
  },
  {
    title: "Preguntas repetidas",
    text: "Precios, horarios, stock y formas de pago se responden a mano decenas de veces por semana.",
  },
  {
    title: "Conversaciones desordenadas",
    text: "Todo pasa por un teléfono: no se sabe qué se respondió, quién lo hizo ni qué quedó pendiente.",
  },
  {
    title: "Clientes sin seguimiento",
    text: "Las consultas que no cierran en el momento se pierden porque nadie las retoma después.",
  },
  {
    title: "Atención dependiente de una persona",
    text: "Si quien atiende no está disponible, el negocio deja de responder.",
  },
] as const;

const featureBlocks = [
  {
    id: "01",
    title: "Atiende automáticamente",
    text: "El agente responde con la información real que cargás en tu espacio: datos del negocio, horarios, productos con precios, servicios, preguntas frecuentes y documentos. Si algo no está cargado, no lo inventa.",
    bullets: [
      "Respuestas con el contexto de cada conversación",
      "Base de conocimiento con PDF, DOCX y TXT",
      "Deriva al equipo cuando falta información",
    ],
    variant: "knowledge" as const,
  },
  {
    id: "02",
    title: "Convierte conversaciones en oportunidades",
    text: "Cada consulta genera un contacto con historial, estado y responsable. El seguimiento deja de depender de la memoria y queda visible para todo el equipo.",
    bullets: [
      "CRM con contactos e historial completo",
      "Estados y responsables por conversación",
      "Seguimientos para retomar consultas abiertas",
    ],
    variant: "crm" as const,
  },
  {
    id: "03",
    title: "Agenda turnos desde la conversación",
    text: "Con Google Calendar conectado, el agente consulta la disponibilidad real y puede crear, reprogramar o cancelar turnos sin salir del chat.",
    bullets: [
      "Disponibilidad y duración configurables",
      "Creación, reprogramación y cancelación",
      "Turnos vinculados a cada cliente",
    ],
    variant: "appointment" as const,
  },
  {
    id: "04",
    title: "Tu equipo mantiene el control",
    text: "La IA atiende primero y una persona puede tomar la conversación cuando hace falta. Los roles definen qué puede ver y hacer cada integrante.",
    bullets: [
      "Modo IA / atención humana por conversación",
      "Asignación de conversaciones al equipo",
      "Roles OWNER, ADMIN, AGENT y VIEWER",
    ],
    variant: "team" as const,
  },
  {
    id: "05",
    title: "Medí cómo atiende tu negocio",
    text: "Las métricas muestran conversaciones, actividad y tiempos de respuesta por período y canal, con datos reales de tu organización.",
    bullets: [
      "Actividad por período y canal",
      "Tiempos de respuesta del equipo",
      "Rendimiento de la atención con IA",
    ],
    variant: "metrics" as const,
  },
] as const;

const integrations = [
  {
    name: "WhatsApp API oficial",
    icon: "whatsapp" as IntegrationIconName,
    description: "El canal principal de atención, conectado mediante la infraestructura oficial de WhatsApp Business.",
    status: "Disponible",
  },
  {
    name: "Claude",
    icon: "anthropic" as IntegrationIconName,
    description: "El motor de IA que responde usando la información cargada por tu negocio.",
    status: "Disponible",
  },
  {
    name: "Google Calendar",
    icon: "googleCalendar" as IntegrationIconName,
    description: "Disponibilidad real para crear, reprogramar y cancelar turnos desde la conversación.",
    status: "Disponible",
  },
  {
    name: "Documentos",
    icon: "documents" as IntegrationIconName,
    description: "PDF, DOCX y TXT procesados dentro de la base de conocimiento de tu organización.",
    status: "Disponible",
  },
  {
    name: "Automatizaciones con n8n",
    icon: "n8n" as IntegrationIconName,
    description: "Seguimientos automáticos y alertas al equipo mediante flujos conectados a la plataforma.",
    status: "Beta",
  },
  {
    name: "Google Sheets",
    icon: "googleSheets" as IntegrationIconName,
    description: "Lectura y registro de datos en planillas del negocio.",
    status: "Próximamente",
  },
  {
    name: "Instagram",
    icon: "instagram" as IntegrationIconName,
    description: "Mensajes directos en la misma bandeja de atención.",
    status: "Próximamente",
  },
  {
    name: "Tiendanube",
    icon: "store" as IntegrationIconName,
    description: "Catálogo, stock y pedidos dentro de la conversación.",
    status: "En desarrollo",
  },
  {
    name: "WooCommerce",
    icon: "woocommerce" as IntegrationIconName,
    description: "Productos y pedidos de tiendas WordPress.",
    status: "Próximamente",
  },
] as const;

const steps = [
  {
    number: "1",
    title: "Creá tu espacio",
    text: "Registrás tu cuenta, completás los datos del negocio y tu organización queda lista con la prueba de 5 días activa.",
    detail: "Registro guiado · Sin tarjeta",
  },
  {
    number: "2",
    title: "Cargá tu información y conectá tus canales",
    text: "Sumás productos, servicios, preguntas frecuentes y documentos. La conexión del WhatsApp del negocio se hace con un proceso guiado.",
    detail: "Base de conocimiento · WhatsApp API",
  },
  {
    number: "3",
    title: "Activá y supervisá tu agente",
    text: "Probás las respuestas en el chat de prueba, ajustás la configuración y seguís todo desde la bandeja: la IA atiende y tu equipo supervisa.",
    detail: "Chat de prueba · Bandeja compartida",
  },
] as const;

const useCases = [
  {
    title: "Comercios y e-commerce",
    problem: "Consultas por stock, precios y envíos que se repiten todo el día.",
    usage: "El agente responde con el catálogo y los datos cargados, y registra a cada interesado en el CRM.",
    outcome: "Menos tiempo respondiendo lo mismo y menos consultas sin atender.",
  },
  {
    title: "Negocios con turnos",
    problem: "La agenda se coordina a mano, mensaje por mensaje.",
    usage: "La IA consulta la disponibilidad real de Google Calendar y agenda, reprograma o cancela desde la conversación.",
    outcome: "Turnos confirmados sin idas y vueltas, incluso fuera de horario.",
  },
  {
    title: "Servicios profesionales",
    problem: "Cada consulta nueva requiere explicar lo mismo antes de avanzar.",
    usage: "El agente responde las preguntas frecuentes y deriva al profesional las consultas que necesitan criterio.",
    outcome: "El tiempo se concentra en los clientes listos para avanzar.",
  },
  {
    title: "Equipos de ventas",
    problem: "Los interesados se enfrían porque el seguimiento depende de cada vendedor.",
    usage: "Cada conversación tiene estado, responsable e historial compartido en la bandeja del equipo.",
    outcome: "Seguimiento ordenado y visibilidad de toda la operación.",
  },
] as const;

const withoutVantix = [
  "Consultas sin responder fuera de horario",
  "Información dispersa entre teléfonos y planillas",
  "Clientes sin seguimiento después de la primera consulta",
  "Atención dependiente de una sola persona",
  "Conversaciones desordenadas y sin historial",
] as const;

const withVantix = [
  "Atención automática con la información del negocio",
  "Conocimiento centralizado en un solo lugar",
  "CRM con historial y estado de cada cliente",
  "Colaboración IA / humano con un clic",
  "Bandeja compartida para todo el equipo",
] as const;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Vantix",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/images/vantix-lockup-horizontal-800w.webp`,
      email: "vantixdigitalweb@gmail.com",
      telephone: "+543525617652",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jesús María",
        addressRegion: "Córdoba",
        addressCountry: "AR",
      },
      sameAs: [
        "https://www.instagram.com/vantixdesign.studio/",
        `https://wa.me/${WHATSAPP_NUMBER}`,
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#vantixapp`,
      name: "VantixApp",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Plataforma de atención para WhatsApp con agente de IA, CRM, turnos, base de conocimiento y trabajo en equipo.",
      url: APP_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      featureList: [
        "Agente de IA con conocimiento del negocio",
        "Bandeja compartida de conversaciones",
        "Atención automática y humana",
        "CRM de clientes",
        "Base de conocimiento con documentos",
        "Turnos con Google Calendar",
        "Métricas de atención",
        "Roles y permisos de equipo",
      ],
      offers: PLANS.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        price: String(plan.usdMonthly),
        priceCurrency: "USD",
      })),
    },
  ],
};

export default async function HomePage() {
  const exchange = await getPlansExchangeRate();

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <SiteHeader />
      <ScrollDepth />
      <main id="contenido">
        {/* ===== HERO ===== */}
        <section className="hero section" id="inicio">
          <div className="container hero-layout">
            <div className="hero-copy">
              <p className="product-label">
                <span /> Atención y ventas con IA para WhatsApp
              </p>
              <h1>
                Convertí las consultas de WhatsApp en clientes,{" "}
                <em>incluso cuando no estás conectado.</em>
              </h1>
              <p className="hero-lead">
                VantixApp responde consultas, conoce tu negocio, organiza cada
                conversación y deriva a tu equipo cuando hace falta. Todo desde
                una única bandeja.
              </p>
              <div className="hero-actions">
                <TrackedLink
                  event={{ name: "cta_trial", location: "hero" }}
                  className="button button-large"
                  href={APP_REGISTER_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Probar gratis por {TRIAL_DAYS} días <ArrowIcon />
                </TrackedLink>
                <TrackedLink
                  event={{ name: "cta_how_it_works", location: "hero" }}
                  className="button button-secondary button-large"
                  href="#demostracion"
                >
                  Ver cómo funciona <ArrowIcon direction="down" />
                </TrackedLink>
              </div>
              <p className="hero-note">
                Sin tarjeta de crédito · Configuración guiada · Podés tomar el
                control en cualquier momento
              </p>
            </div>

            <div className="hero-product" aria-label="Vista representativa de la bandeja de VantixApp">
              <div className="hero-product-frame">
                <ProductView variant="hero" />
              </div>
              <div className="hero-badges" aria-hidden="true">
                <span className="badge-ia">Agente de IA</span>
                <span className="badge-humano">Atención humana</span>
                <span className="badge-crm">CRM</span>
                <span className="badge-turnos">Turnos</span>
              </div>
              <p className="demo-disclaimer">
                Vista representativa basada en las funciones implementadas de
                VantixApp. Los nombres son ilustrativos.
              </p>
            </div>
          </div>
        </section>

        {/* ===== PROBLEMA ===== */}
        <section className="section problem-section" id="problema">
          <div className="container">
            <div className="split-heading">
              <div>
                <p className="eyebrow">El problema</p>
                <h2>Cada mensaje sin responder puede ser una venta perdida.</h2>
              </div>
              <p>
                WhatsApp trae clientes, pero atenderlo a pulmón tiene un costo
                que no siempre se ve.
              </p>
            </div>
            <div className="problem-grid">
              {problems.map((problem, index) => (
                <article
                  className={`problem-card${index === 0 ? " problem-card-wide" : ""}`}
                  key={problem.title}
                >
                  <h3>{problem.title}</h3>
                  <p>{problem.text}</p>
                </article>
              ))}
              <aside className="problem-solution">
                <p className="eyebrow">La salida</p>
                <p>
                  VantixApp centraliza la atención en una sola bandeja y
                  responde con la información real de tu negocio, para que
                  ninguna consulta dependa de quién esté mirando el teléfono.
                </p>
                <a href="#producto">
                  Ver cómo lo hace <ArrowIcon direction="down" />
                </a>
              </aside>
            </div>
          </div>
        </section>

        {/* ===== PRODUCTO / BANDEJA ===== */}
        <section className="section product-section" id="producto">
          <div className="container">
            <header className="section-intro centered-intro">
              <p className="eyebrow">El producto</p>
              <h2>Una sola bandeja para todas las conversaciones.</h2>
              <p>
                Chats, ficha del cliente, estado y responsable en la misma
                vista. La IA responde primero y tu equipo decide cuándo
                intervenir.
              </p>
            </header>
            <div className="status-list" aria-label="Estados de una conversación">
              <span><i className="dot dot-blue" /> IA activa</span>
              <span><i className="dot dot-light" /> Atención humana</span>
              <span><i className="dot dot-grey" /> Conversación asignada</span>
              <span><i className="dot dot-green" /> Cliente identificado</span>
            </div>
            <div className="inbox-product">
              <ProductView variant="inbox" />
            </div>
            <p className="demo-disclaimer">
              Vista representativa basada en la bandeja de tres paneles
              implementada en VantixApp.
            </p>
          </div>
        </section>

        {/* ===== DEMOSTRACIÓN ===== */}
        <section className="section demo-section" id="demostracion">
          <div className="container">
            <div className="split-heading">
              <div>
                <p className="eyebrow">Demostración</p>
                <h2>Qué pasa cuando un cliente escribe.</h2>
              </div>
              <p>
                Un ejemplo del flujo completo: la consulta llega, el agente
                responde con datos reales y el negocio queda ordenado.
              </p>
            </div>
            <DemoFlow />
          </div>
        </section>

        {/* ===== FUNCIONES ===== */}
        <section className="section functions-section" id="funciones">
          <div className="container">
            <header className="section-intro functions-intro">
              <p className="eyebrow">Funciones</p>
              <h2>Herramientas agrupadas por resultado, no por menú.</h2>
            </header>
            <div className="feature-blocks">
              {featureBlocks.map((block, index) => (
                <article
                  className={`feature-block${index % 2 === 1 ? " is-reversed" : ""}`}
                  key={block.id}
                >
                  <div className="feature-copy">
                    <span className="feature-number">{block.id}</span>
                    <h3>{block.title}</h3>
                    <p>{block.text}</p>
                    <ul>
                      {block.bullets.map((bullet) => (
                        <li key={bullet}>
                          <CheckIcon />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="feature-visual">
                    <ProductView variant={block.variant} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== INTEGRACIONES ===== */}
        <section className="section integrations-section" id="integraciones">
          <div className="container">
            <div className="split-heading">
              <div>
                <p className="eyebrow">Integraciones</p>
                <h2>Conectá las herramientas que ya usa tu negocio.</h2>
              </div>
              <p>
                Los estados distinguen con claridad qué funciona hoy y qué está
                en desarrollo.
              </p>
            </div>
            <div className="integrations-list">
              {integrations.map((integration) => (
                <article className="integration-item" key={integration.name}>
                  <div className="integration-main">
                    <span className="integration-mark">
                      <IntegrationIcon name={integration.icon} />
                    </span>
                    <div>
                      <h3>{integration.name}</h3>
                      <p>{integration.description}</p>
                    </div>
                  </div>
                  <span
                    className={
                      integration.status === "Disponible"
                        ? "available"
                        : integration.status === "Beta"
                          ? "beta"
                          : "soon"
                    }
                  >
                    {integration.status}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CÓMO FUNCIONA ===== */}
        <section className="section steps-section" id="como-funciona">
          <div className="container">
            <header className="section-intro">
              <p className="eyebrow">Cómo funciona</p>
              <h2>De registrarte a atender, en tres pasos.</h2>
            </header>
            <ol className="steps-list">
              {steps.map((step) => (
                <li key={step.number}>
                  <span className="step-number">{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                    <small>{step.detail}</small>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ===== CASOS DE USO ===== */}
        <section className="section usecases-section" id="casos">
          <div className="container">
            <div className="split-heading">
              <div>
                <p className="eyebrow">Casos de uso</p>
                <h2>Pensado para negocios que atienden por WhatsApp.</h2>
              </div>
              <p>
                El mismo sistema, aplicado al problema concreto de cada tipo de
                negocio.
              </p>
            </div>
            <div className="usecases-grid">
              {useCases.map((useCase) => (
                <article className="usecase-card" key={useCase.title}>
                  <h3>{useCase.title}</h3>
                  <dl>
                    <div>
                      <dt>El problema</dt>
                      <dd>{useCase.problem}</dd>
                    </div>
                    <div>
                      <dt>Con VantixApp</dt>
                      <dd>{useCase.usage}</dd>
                    </div>
                    <div>
                      <dt>El resultado</dt>
                      <dd>{useCase.outcome}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ===== COMPARACIÓN ===== */}
        <section className="section compare-section" id="comparacion">
          <div className="container">
            <header className="section-intro centered-intro">
              <p className="eyebrow">Antes y después</p>
              <h2>La diferencia entre atender y tener un sistema de atención.</h2>
            </header>
            <div className="compare-grid">
              <div className="compare-card compare-without">
                <h3>Sin VantixApp</h3>
                <ul>
                  {withoutVantix.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="compare-card compare-with">
                <h3>Con VantixApp</h3>
                <ul>
                  {withVantix.map((item) => (
                    <li key={item}>
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PRECIOS ===== */}
        <section className="section pricing-section" id="precios">
          <div className="container">
            <header className="section-intro centered-intro pricing-intro">
              <p className="eyebrow">Precios</p>
              <h2>Planes claros, prueba gratuita real.</h2>
              <p>
                Empezás con {TRIAL_DAYS} días gratis en cualquier plan. Sin
                letra chica.
              </p>
            </header>
            <PricingSection exchange={exchange} />
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="section faq-section" id="faq">
          <div className="container faq-layout">
            <div className="faq-heading">
              <p className="eyebrow">Preguntas frecuentes</p>
              <h2>Lo que vas a querer saber antes de empezar.</h2>
              <p>
                Respuestas basadas en cómo funciona VantixApp hoy, sin promesas
                de funciones que no existen.
              </p>
            </div>
            <Faq />
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <section className="section final-section" id="empezar">
          <div className="container final-cta">
            <h2>Empezá a responder mejor desde hoy.</h2>
            <p>
              Configurá tu espacio, cargá la información de tu negocio y probá
              VantixApp durante {TRIAL_DAYS} días.
            </p>
            <div className="final-actions">
              <TrackedLink
                event={{ name: "cta_trial", location: "final" }}
                className="button button-large"
                href={APP_REGISTER_URL}
                target="_blank"
                rel="noreferrer"
              >
                Probar VantixApp gratis <ArrowIcon />
              </TrackedLink>
              <TrackedLink
                event={{ name: "cta_demo", location: "final" }}
                className="button button-secondary button-large"
                href={whatsAppLink(DEMO_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noreferrer"
              >
                Agendar una demostración <ArrowIcon />
              </TrackedLink>
            </div>
            <p className="final-note">
              La demostración se coordina por WhatsApp con el equipo de Vantix.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter variant="landing" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
