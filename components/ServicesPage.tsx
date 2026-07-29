import Image from "next/image";
import { ArrowIcon } from "@/components/ArrowIcon";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { Locale } from "@/content";
import { whatsAppLink } from "@/lib/site";

interface ServicesPageProps {
  locale: Locale;
}

const copy = {
  es: {
    skip: "Saltar al contenido",
    label: "Vantix Design Studio",
    titleBefore: "También construimos la",
    titleEmphasis: "presencia digital",
    titleAfter: " de tu negocio.",
    lead:
      "Además de VantixApp, diseñamos y desarrollamos proyectos web a medida. Cada proyecto se define y cotiza por alcance, por separado de los planes mensuales del producto.",
    serviceCta: "Consultar este servicio",
    services: [
      {
        number: "01",
        title: "Landing pages",
        text: "Una página enfocada en una oferta, una campaña o una acción concreta. Ordena el mensaje y facilita la consulta.",
        image: "/images/landingpagelopezpaz-poster.jpg",
        alt: "Landing page real de Estudio López & Paz",
        imagePosition: "center top",
      },
      {
        number: "02",
        title: "Sitios web",
        text: "Una presencia institucional clara para explicar servicios, mostrar experiencia y generar confianza antes del contacto.",
        image: "/images/landingpageteby-poster.jpg",
        alt: "Sitio web real de Auxilios El Teby",
        imagePosition: "center top",
      },
      {
        number: "03",
        title: "E-commerce",
        text: "Catálogo, compra y contacto ordenados para que vender online no dependa de conversaciones manuales.",
        image: "/images/perfiles-americanos-desktop.png",
        alt: "Proyecto web real con catálogo de productos para Perfiles Americanos",
        imagePosition: "center top",
      },
      {
        number: "04",
        title: "Sistemas personalizados",
        text: "Herramientas internas para organizar clientes, turnos, operaciones y datos sin depender de planillas dispersas.",
        image: "/images/vantix-hero-1280w.webp",
        alt: "Identidad de Vantix aplicada a software a medida",
        imagePosition: "center",
      },
    ],
    projects: {
      eyebrow: "Proyectos",
      title: "Trabajo real para empresas reales.",
      intro:
        "Conservamos los proyectos publicados y sus enlaces originales. Todo lo que mostramos existe y funciona.",
      view: "Ver proyecto",
      viewLabel: "Ver",
      items: [
        {
          name: "Perfiles Americanos",
          category: "Sitio institucional · Catálogo",
          description:
            "Sitio para una empresa de perfiles de aluminio y accesorios, con líneas de productos, información comercial y contacto directo.",
          image: "/images/perfiles-americanos-desktop.png",
          alt: "Vista desktop del sitio de Perfiles Americanos",
          href: "https://perfiles-americanos.vercel.app/",
        },
        {
          name: "Estudio López & Paz",
          category: "Landing page · Servicios profesionales",
          description:
            "Landing profesional para explicar servicios contables con seriedad y convertir visitas en consultas.",
          image: "/images/landingpagelopezpaz-poster.jpg",
          alt: "Vista desktop del sitio de Estudio López & Paz",
          href: "https://www.estudiolopezpaz.com.ar/",
        },
        {
          name: "Auxilios El Teby",
          category: "Sitio web · SEO local",
          description:
            "Web rápida para un servicio de auxilio vehicular, con información esencial y acceso inmediato a WhatsApp.",
          image: "/images/landingpageteby-poster.jpg",
          alt: "Vista desktop del sitio de Auxilios El Teby",
          href: "https://www.auxilioselteby.com.ar/",
        },
      ],
    },
    process: {
      eyebrow: "Proceso",
      title: "Un proceso claro, sin cajas negras.",
      steps: [
        {
          number: "01",
          title: "Diagnóstico",
          text: "Entendemos el negocio, el público y el objetivo concreto del proyecto.",
        },
        {
          number: "02",
          title: "Estructura y contenido",
          text: "Ordenamos la información y definimos el recorrido de cada visitante.",
        },
        {
          number: "03",
          title: "Diseño y desarrollo",
          text: "Construimos la experiencia visual y la adaptamos a cada pantalla.",
        },
        {
          number: "04",
          title: "Revisión y lanzamiento",
          text: "Probamos enlaces, formularios y responsive antes de publicar con el dominio configurado.",
        },
      ],
    },
    contact: {
      eyebrow: "Contacto",
      title: "Contanos qué querés construir.",
      text: "Te respondemos de forma directa, con una mirada concreta sobre alcance, tiempos y próximos pasos.",
      whatsapp: "Consultar por WhatsApp",
      whatsappMessage: "Hola, quiero consultar por un proyecto web.",
    },
  },
  en: {
    skip: "Skip to content",
    label: "Vantix Design Studio",
    titleBefore: "We also build your business’s",
    titleEmphasis: "digital presence",
    titleAfter: ".",
    lead:
      "Alongside VantixApp, we design and develop custom web projects. Each project is scoped and quoted separately from the product’s monthly plans.",
    serviceCta: "Ask about this service",
    services: [
      {
        number: "01",
        title: "Landing pages",
        text: "A focused page for one offer, campaign or action. It organizes the message and makes it easier for visitors to enquire.",
        image: "/images/landingpagelopezpaz-poster.jpg",
        alt: "Live landing page for Estudio López & Paz",
        imagePosition: "center top",
      },
      {
        number: "02",
        title: "Business websites",
        text: "A clear company presence that explains services, demonstrates experience and builds trust before the first conversation.",
        image: "/images/landingpageteby-poster.jpg",
        alt: "Live website for Auxilios El Teby",
        imagePosition: "center top",
      },
      {
        number: "03",
        title: "E-commerce",
        text: "An organized catalogue, purchase flow and contact experience so online sales do not depend on manual conversations.",
        image: "/images/perfiles-americanos-desktop.png",
        alt: "Live product catalogue project for Perfiles Americanos",
        imagePosition: "center top",
      },
      {
        number: "04",
        title: "Custom systems",
        text: "Internal tools that organize customers, appointments, operations and data without relying on scattered spreadsheets.",
        image: "/images/vantix-hero-1280w.webp",
        alt: "Vantix identity applied to custom software",
        imagePosition: "center",
      },
    ],
    projects: {
      eyebrow: "Projects",
      title: "Real work for real businesses.",
      intro:
        "We keep the published projects and their original links. Everything shown here exists and works.",
      view: "View project",
      viewLabel: "View",
      items: [
        {
          name: "Perfiles Americanos",
          category: "Company website · Catalogue",
          description:
            "A website for an aluminium profiles and accessories company, with product lines, commercial information and direct contact.",
          image: "/images/perfiles-americanos-desktop.png",
          alt: "Desktop view of the Perfiles Americanos website",
          href: "https://perfiles-americanos.vercel.app/",
        },
        {
          name: "Estudio López & Paz",
          category: "Landing page · Professional services",
          description:
            "A professional landing page that explains accounting services clearly and turns visits into qualified enquiries.",
          image: "/images/landingpagelopezpaz-poster.jpg",
          alt: "Desktop view of the Estudio López & Paz website",
          href: "https://www.estudiolopezpaz.com.ar/",
        },
        {
          name: "Auxilios El Teby",
          category: "Website · Local SEO",
          description:
            "A fast website for a roadside assistance service, with essential information and immediate access to WhatsApp.",
          image: "/images/landingpageteby-poster.jpg",
          alt: "Desktop view of the Auxilios El Teby website",
          href: "https://www.auxilioselteby.com.ar/",
        },
      ],
    },
    process: {
      eyebrow: "Process",
      title: "A clear process, with no black boxes.",
      steps: [
        {
          number: "01",
          title: "Discovery",
          text: "We understand the business, its audience and the project’s concrete goal.",
        },
        {
          number: "02",
          title: "Structure and content",
          text: "We organize the information and define the path for each visitor.",
        },
        {
          number: "03",
          title: "Design and development",
          text: "We build the visual experience and adapt it to every screen size.",
        },
        {
          number: "04",
          title: "Review and launch",
          text: "We test links, forms and responsive behaviour before publishing with the configured domain.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Tell us what you want to build.",
      text: "We reply directly with a practical view of scope, timing and the next steps.",
      whatsapp: "Ask on WhatsApp",
      whatsappMessage: "Hi, I would like to discuss a web project.",
    },
  },
} as const;

export function ServicesPage({ locale }: ServicesPageProps) {
  const text = copy[locale];

  return (
    <>
      <a className="skip-link" href="#contenido">
        {text.skip}
      </a>
      <SiteHeader locale={locale} variant="services" />

      <main id="contenido">
        <section className="section studio-hero" id="servicios">
          <div className="container">
            <p className="product-label">
              <span /> {text.label}
            </p>
            <h1>
              {text.titleBefore} <em>{text.titleEmphasis}</em>
              {text.titleAfter}
            </h1>
            <p className="hero-lead">{text.lead}</p>
          </div>
        </section>

        <section className="section services-section" aria-label={text.label}>
          <div className="container">
            <div className="services-list">
              {text.services.map((service) => (
                <article className="service-item" key={service.number}>
                  <div className="service-copy">
                    <span>{service.number}</span>
                    <h2>{service.title}</h2>
                    <p>{service.text}</p>
                    <a href="#contacto-servicios">
                      {text.serviceCta} <ArrowIcon />
                    </a>
                  </div>
                  <div className="service-image">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(max-width: 767px) 100vw, 58vw"
                      style={{ objectPosition: service.imagePosition }}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section projects-section" id="proyectos">
          <div className="container">
            <div className="split-heading">
              <div>
                <p className="eyebrow">{text.projects.eyebrow}</p>
                <h2>{text.projects.title}</h2>
              </div>
              <p>{text.projects.intro}</p>
            </div>
            <div className="client-projects">
              {text.projects.items.map((project, index) => (
                <article
                  className={`project project-${index + 1}`}
                  key={project.name}
                >
                  <a
                    className="project-image"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${text.projects.viewLabel} ${project.name}`}
                  >
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      sizes={
                        index === 0
                          ? "(max-width: 767px) 100vw, 62vw"
                          : "(max-width: 767px) 100vw, 40vw"
                      }
                    />
                  </a>
                  <div className="project-copy">
                    <span>{project.category}</span>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <a href={project.href} target="_blank" rel="noreferrer">
                      {text.projects.view} <ArrowIcon />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section process-section" id="proceso">
          <div className="container">
            <header className="section-intro">
              <p className="eyebrow">{text.process.eyebrow}</p>
              <h2>{text.process.title}</h2>
            </header>
            <ol className="steps-list">
              {text.process.steps.map((step) => (
                <li key={step.number}>
                  <span className="step-number">{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="section contact-section"
          id="contacto-servicios"
        >
          <div className="container contact-layout">
            <div className="contact-copy">
              <p className="eyebrow">{text.contact.eyebrow}</p>
              <h2>{text.contact.title}</h2>
              <p>{text.contact.text}</p>
              <a
                className="button button-secondary"
                href={whatsAppLink(text.contact.whatsappMessage)}
                target="_blank"
                rel="noreferrer"
              >
                {text.contact.whatsapp} <ArrowIcon />
              </a>
            </div>
            <ContactForm locale={locale} />
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} variant="services" />
    </>
  );
}
