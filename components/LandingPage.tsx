import { Suspense } from "react";
import { ArrowIcon } from "@/components/ArrowIcon";
import { ContactForm } from "@/components/ContactForm";
import { Faq } from "@/components/Faq";
import {
  IntegrationIcon,
  type IntegrationIconName,
} from "@/components/IntegrationIcon";
import {
  LandingIcon,
  type LandingIconName,
} from "@/components/LandingIcon";
import { PricingSection } from "@/components/PricingSection";
import { ProductScreenshot } from "@/components/ProductScreenshot";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  FAQS,
  FEATURES,
  INTEGRATIONS,
  LANDING_COPY,
  LANDING_SCREENSHOT_PLACEMENTS,
  PLANS,
  SCREENSHOTS_BY_ID,
  getTranslations,
  type IntegrationId,
  type Locale,
  type ScreenshotId,
} from "@/content";
import { getPlansExchangeRate } from "@/lib/exchange-rate";
import {
  APP_REGISTER_URL,
  APP_URL,
  CONTACT_EMAIL,
  DEMO_WHATSAPP_MESSAGE,
  INSTAGRAM_URL,
  SITE_URL,
  WHATSAPP_NUMBER,
  whatsAppLink,
} from "@/lib/site";

function screenshotSource(id: ScreenshotId) {
  const screenshot = SCREENSHOTS_BY_ID[id];
  return {
    light: screenshot.assets.light.src,
    dark: screenshot.assets.dark.src,
    width: screenshot.assets.light.width,
    height: screenshot.assets.light.height,
  };
}

function integrationIconName(id: IntegrationId): IntegrationIconName {
  switch (id) {
    case "whatsapp-business":
      return "whatsapp";
    case "tiendanube":
      return "tiendanube";
    case "google-sheets":
      return "googleSheets";
    case "google-calendar":
      return "googleCalendar";
    case "woocommerce":
      return "woocommerce";
    case "mercado-pago":
      return "mercadoPago";
    case "pdf":
      return "documents";
    case "ai-images":
      return "images";
    case "audio-understanding":
      return "audio";
    case "n8n":
      return "n8n";
  }
}

function ProductSchema({ locale }: { locale: Locale }) {
  const description =
    locale === "es"
      ? "Plataforma web para centralizar conversaciones, responder con un agente de IA, organizar clientes y combinar atención automática y humana."
      : "Web platform for centralizing conversations, replying with an AI agent, organizing customers and combining automated and human customer service.";

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "Vantix",
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/brand/favicon.png`,
        email: CONTACT_EMAIL,
        telephone: `+${WHATSAPP_NUMBER}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Jesús María",
          addressRegion: "Córdoba",
          addressCountry: "AR",
        },
        sameAs: [INSTAGRAM_URL, `https://wa.me/${WHATSAPP_NUMBER}`],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#vantixapp`,
        name: "VantixApp",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description,
        url: APP_URL,
        publisher: { "@id": `${SITE_URL}/#organization` },
        offers: PLANS.filter((plan) => plan.monthlyUsd !== null).map(
          (plan) => ({
            "@type": "Offer",
            name: plan.name[locale],
            price: String(plan.monthlyUsd),
            priceCurrency: "USD",
          }),
        ),
        featureList: FEATURES.filter(
          (feature) => feature.status === "available",
        ).map((feature) => feature.title[locale]),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replaceAll("<", "\\u003c"),
      }}
    />
  );
}

function MetricsWall({ locale }: { locale: Locale }) {
  const copy = LANDING_COPY.metrics;
  const placements = [
    {
      key: "summary",
      id: LANDING_SCREENSHOT_PLACEMENTS.metricsSummary,
      label: locale === "es" ? "Resumen del período" : "Period summary",
    },
    {
      key: "day",
      id: LANDING_SCREENSHOT_PLACEMENTS.metricsDay,
      label: locale === "es" ? "Conversaciones por día" : "Conversations by day",
    },
    {
      key: "hourly",
      id: LANDING_SCREENSHOT_PLACEMENTS.metricsHourly,
      label: locale === "es" ? "Actividad por horario" : "Hourly activity",
    },
    {
      key: "ai-human",
      id: LANDING_SCREENSHOT_PLACEMENTS.metricsAiHuman,
      label:
        locale === "es"
          ? "IA frente a atención humana"
          : "AI compared with human service",
    },
  ] as const;

  return (
    <section className="section vx-metrics" id="metricas">
      <div className="section-shell">
        <header className="section-heading vx-centered-heading" data-reveal>
          <span className="eyebrow">{copy.eyebrow[locale]}</span>
          <h2>{copy.title[locale]}</h2>
          <p>{copy.description[locale]}</p>
        </header>

        <div className="vx-metric-capabilities" data-reveal>
          {copy.capabilities.map((capability) => (
            <article key={capability.title.en}>
              <span>
                <LandingIcon name={capability.icon} />
              </span>
              <h3>{capability.title[locale]}</h3>
              <p>{capability.description[locale]}</p>
            </article>
          ))}
        </div>

        <div className="vx-metrics-wall" data-reveal>
          {placements.map(({ key, id, label }) => (
            <figure className={`vx-metric vx-metric-${key}`} key={id}>
              <ProductScreenshot
                source={screenshotSource(id)}
                alt={SCREENSHOTS_BY_ID[id].alt[locale]}
              />
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks({ locale }: { locale: Locale }) {
  const copy = LANDING_COPY.steps;
  const icons: readonly LandingIconName[] = [
    "workspace",
    "knowledge",
    "connect",
  ];

  return (
    <section className="section vx-process" id="como-funciona">
      <div className="section-shell">
        <header className="section-heading vx-centered-heading" data-reveal>
          <span className="eyebrow">{copy.eyebrow[locale]}</span>
          <h2>{copy.title[locale]}</h2>
          <p>{copy.description[locale]}</p>
        </header>

        <div className="vx-process-track" data-reveal>
          <span className="vx-process-line" aria-hidden="true">
            <i />
          </span>
          {copy.items.map((item, index) => (
            <article key={item.title.en}>
              <span className="vx-process-icon">
                <LandingIcon name={icons[index]} />
              </span>
              <h3>{item.title[locale]}</h3>
              <p>{item.description[locale]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Integrations({ locale }: { locale: Locale }) {
  const copy = LANDING_COPY.integrations;

  return (
    <section className="section vx-integrations" id="integraciones">
      <div className="section-shell">
        <header className="section-heading vx-centered-heading" data-reveal>
          <span className="eyebrow">{copy.eyebrow[locale]}</span>
          <h2>{copy.title[locale]}</h2>
          <p>{copy.description[locale]}</p>
        </header>

        <div className="vx-integrations-grid" role="list" data-reveal>
          {INTEGRATIONS.map((integration) => (
            <article
              className="vx-integration-item"
              data-integration={integration.id}
              key={integration.id}
              role="listitem"
            >
              <span>
                <IntegrationIcon
                  name={integrationIconName(integration.id)}
                />
              </span>
              <div>
                <h3>{integration.name[locale]}</h3>
                <p>{integration.shortDescription[locale]}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="vx-integration-note">{copy.clarification[locale]}</p>
      </div>
    </section>
  );
}

async function PricingContent({ locale }: { locale: Locale }) {
  const exchange = await getPlansExchangeRate();
  return <PricingSection exchange={exchange} locale={locale} />;
}

function ContactSection({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const message =
    locale === "es"
      ? DEMO_WHATSAPP_MESSAGE
      : "Hello, I would like to book a VantixApp demo.";

  return (
    <section className="section vx-contact" id="contacto">
      <div className="section-shell">
        <header className="section-heading vx-centered-heading" data-reveal>
          <span className="eyebrow">{t.contact.eyebrow}</span>
          <h2>{t.contact.title}</h2>
          <p>{t.contact.description}</p>
          <div className="vx-contact-actions">
            <a
              className="button button-secondary"
              href={whatsAppLink(message)}
              target="_blank"
              rel="noreferrer"
            >
              {LANDING_COPY.contact.whatsapp[locale]}
              <ArrowIcon />
            </a>
            <a
              className="text-link"
              href={APP_REGISTER_URL}
              target="_blank"
              rel="noreferrer"
            >
              {LANDING_COPY.contact.note[locale]}
              <ArrowIcon />
            </a>
          </div>
        </header>
        <div className="vx-contact-form" data-reveal>
          <ContactForm locale={locale} />
        </div>
      </div>
    </section>
  );
}

export function LandingPage({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const heroScreenshotId = LANDING_SCREENSHOT_PLACEMENTS.hero;
  const heroScreenshot = SCREENSHOTS_BY_ID[heroScreenshotId];

  return (
    <>
      <a className="skip-link" href="#contenido">
        {t.accessibility.skipToContent}
      </a>
      <SiteHeader locale={locale} variant="landing" />

      <main id="contenido" className="landing-redesign">
        <section className="vx-hero" id="inicio" aria-labelledby="hero-title">
          <div className="section-shell vx-hero-inner">
            <div className="vx-hero-copy">
              <span className="eyebrow vx-hero-eyebrow">
                <i aria-hidden="true" />
                {t.hero.eyebrow}
              </span>
              <h1 id="hero-title">
                {t.hero.titleLead}
                <strong>{t.hero.titleHighlight}</strong>
              </h1>
              <p>{t.hero.description}</p>
              <div className="vx-hero-actions">
                <a
                  className="button"
                  href={APP_REGISTER_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.hero.primaryCta}
                  <ArrowIcon />
                </a>
                <a className="button button-secondary" href="#contacto">
                  {t.hero.secondaryCta}
                </a>
              </div>
            </div>

            <div className="vx-hero-panel">
              <div className="product-frame-bar" aria-hidden="true">
                <span />
                <span />
                <span />
                <strong>VantixApp</strong>
              </div>
              <ProductScreenshot
                source={screenshotSource(heroScreenshotId)}
                alt={heroScreenshot.alt[locale]}
                eager
              />
            </div>
          </div>
        </section>

        <MetricsWall locale={locale} />
        <HowItWorks locale={locale} />
        <Integrations locale={locale} />

        <section className="section vx-pricing pricing-section" id="precios">
          <div className="section-shell">
            <header className="section-heading vx-centered-heading" data-reveal>
              <span className="eyebrow">{t.pricing.eyebrow}</span>
              <h2>{t.pricing.title}</h2>
              <p>{t.pricing.description}</p>
            </header>
            <Suspense
              fallback={
                <div className="pricing-loading" role="status">
                  {locale === "es"
                    ? "Cargando la cotización de referencia…"
                    : "Loading the reference exchange rate…"}
                </div>
              }
            >
              <PricingContent locale={locale} />
            </Suspense>
          </div>
        </section>

        <section className="section vx-faq" id="preguntas">
          <div className="section-shell">
            <header className="section-heading vx-centered-heading" data-reveal>
              <span className="eyebrow">{t.faq.eyebrow}</span>
              <h2>{t.faq.title}</h2>
              <p>{t.faq.description}</p>
            </header>
            <div className="vx-faq-list" data-reveal>
              <Faq locale={locale} items={FAQS} />
            </div>
          </div>
        </section>

        <ContactSection locale={locale} />
      </main>

      <SiteFooter locale={locale} variant="landing" />
      <ProductSchema locale={locale} />
      <ScrollReveal />
    </>
  );
}
