import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "@/components/ArrowIcon";
import { Brand } from "@/components/Brand";
import { ContactForm } from "@/components/ContactForm";
import { SiteFooter } from "@/components/SiteFooter";
import { whatsAppLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Servicios de diseño web y sistemas | Vantix Design Studio",
  description:
    "Landing pages, sitios web, e-commerce y sistemas personalizados desarrollados por Vantix en Córdoba. Proyectos reales y trato directo.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/servicios",
    title: "Servicios de diseño web y sistemas | Vantix Design Studio",
    description:
      "Landing pages, sitios web, e-commerce y sistemas personalizados con proyectos reales y trato directo.",
    images: [
      {
        url: "/images/perfiles-americanos-desktop.png",
        width: 1425,
        height: 891,
        alt: "Proyecto web desarrollado por Vantix Design Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios de diseño web y sistemas | Vantix Design Studio",
    description:
      "Landing pages, sitios web, e-commerce y sistemas personalizados desarrollados en Córdoba.",
    images: ["/images/perfiles-americanos-desktop.png"],
  },
};

const services = [
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
] as const;

const clientProjects = [
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
] as const;

const processSteps = [
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
    text: "Probamos enlaces, formularios, responsive y publicamos con el dominio configurado.",
  },
] as const;

export default function ServiciosPage() {
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="studio-header">
        <div className="header-inner">
          <Link className="brand-link" href="/" aria-label="Vantix, ir al inicio">
            <Brand />
          </Link>
          <nav className="studio-nav" aria-label="Navegación de servicios">
            <a href="#proyectos">Proyectos</a>
            <a href="#proceso">Proceso</a>
            <Link href="/">VantixApp</Link>
          </nav>
          <a className="button button-compact" href="#contacto-servicios">
            Iniciar proyecto <ArrowIcon />
          </a>
        </div>
      </header>

      <main id="contenido">
        <section className="section studio-hero" id="servicios">
          <div className="container">
            <p className="product-label">
              <span /> Vantix Design Studio
            </p>
            <h1>
              También construimos la <em>presencia digital</em> de tu negocio.
            </h1>
            <p className="hero-lead">
              Además de VantixApp, diseñamos y desarrollamos proyectos web a
              medida. Cada proyecto se define y cotiza por alcance, por separado
              de los planes mensuales del producto.
            </p>
          </div>
        </section>

        <section className="section services-section">
          <div className="container">
            <div className="services-list">
              {services.map((service) => (
                <article className="service-item" key={service.title}>
                  <div className="service-copy">
                    <span>{service.number}</span>
                    <h2>{service.title}</h2>
                    <p>{service.text}</p>
                    <a href="#contacto-servicios">
                      Consultar este servicio <ArrowIcon />
                    </a>
                  </div>
                  <div className="service-image">
                    <Image
                      src={service.image}
                      alt={service.alt}
                      fill
                      sizes="(max-width: 760px) 100vw, 58vw"
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
                <p className="eyebrow">Proyectos</p>
                <h2>Trabajo real para empresas reales.</h2>
              </div>
              <p>
                Conservamos los proyectos publicados y sus enlaces originales.
                Todo lo que mostramos existe y funciona.
              </p>
            </div>
            <div className="client-projects">
              {clientProjects.map((project, index) => (
                <article className={`project project-${index + 1}`} key={project.name}>
                  <a
                    className="project-image"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Ver ${project.name}`}
                  >
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      sizes={
                        index === 0
                          ? "(max-width: 760px) 100vw, 62vw"
                          : "(max-width: 760px) 100vw, 40vw"
                      }
                    />
                  </a>
                  <div className="project-copy">
                    <span>{project.category}</span>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <a href={project.href} target="_blank" rel="noreferrer">
                      Ver proyecto <ArrowIcon />
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
              <p className="eyebrow">Proceso</p>
              <h2>Un proceso claro, sin cajas negras.</h2>
            </header>
            <ol className="steps-list">
              {processSteps.map((step) => (
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

        <section className="section contact-section" id="contacto-servicios">
          <div className="container contact-layout">
            <div className="contact-copy">
              <p className="eyebrow">Contacto</p>
              <h2>Contanos qué querés construir.</h2>
              <p>
                Te respondemos de forma directa, con una mirada concreta sobre
                alcance, tiempos y próximos pasos.
              </p>
              <a
                className="button button-secondary"
                href={whatsAppLink("Hola, quiero consultar por un proyecto web.")}
                target="_blank"
                rel="noreferrer"
              >
                Consultar por WhatsApp <ArrowIcon />
              </a>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter variant="servicios" />
    </>
  );
}
