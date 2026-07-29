import { Suspense } from "react";
import { ArrowIcon, CheckIcon } from "@/components/ArrowIcon";
import { ContactForm } from "@/components/ContactForm";
import { Faq } from "@/components/Faq";
import { HeroCarousel } from "@/components/HeroCarousel";
import {
  IntegrationIcon,
  type IntegrationIconName,
} from "@/components/IntegrationIcon";
import { PricingSection } from "@/components/PricingSection";
import { ProductScreenshot } from "@/components/ProductScreenshot";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TestimonialRail } from "@/components/TestimonialRail";
import {
  COMPARISON,
  FAQS,
  FEATURES,
  FEATURE_STORIES,
  HERO_SCREENSHOT_IDS,
  INTEGRATIONS,
  INTEGRATION_STATUS_LABELS,
  LANDING_COPY,
  PLANS,
  PROBLEMS,
  PRODUCT_SIGNALS,
  PUBLISHED_TESTIMONIALS,
  SCREENSHOTS_BY_ID,
  USE_CASES,
  getTranslations,
  type FeatureId,
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

function getFeature(id: FeatureId) {
  const feature = FEATURES.find((item) => item.id === id);
  if (!feature) throw new Error(`Missing feature configuration: ${id}`);
  return feature;
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

function FeatureStatus({
  status,
  locale,
}: {
  status: "available" | "beta" | "comingSoon";
  locale: Locale;
}) {
  return (
    <span className={`status-pill status-${status}`}>
      <i aria-hidden="true" />
      {INTEGRATION_STATUS_LABELS[status][locale]}
    </span>
  );
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

function ProductShowcase({ locale }: { locale: Locale }) {
  const copy = LANDING_COPY.product;
  const screenshot = SCREENSHOTS_BY_ID["conversations-overview"];

  return (
    <section className="section product-showcase" id="producto">
      <div className="section-shell">
        <div className="product-showcase-heading" data-reveal>
          <div className="section-heading section-heading-left">
            <span className="eyebrow">{copy.eyebrow[locale]}</span>
            <h2>{copy.title[locale]}</h2>
            <p>{copy.description[locale]}</p>
          </div>
          <div className="product-signal-list" aria-label={copy.title[locale]}>
            {PRODUCT_SIGNALS.map((signal) => (
              <div className="product-signal" key={signal.title.en}>
                <span aria-hidden="true" />
                <div>
                  <strong>{signal.title[locale]}</strong>
                  <small>{signal.description[locale]}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="product-frame product-frame-main" data-reveal>
          <div className="product-frame-bar" aria-hidden="true">
            <span />
            <span />
            <span />
            <strong>VantixApp</strong>
          </div>
          <ProductScreenshot
            source={screenshotSource("conversations-overview")}
            alt={screenshot.alt[locale]}
            eager
          />
        </div>
      </div>
    </section>
  );
}

function FeatureStories({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <section className="section feature-section" id="funciones">
      <div className="section-shell">
        <div className="section-heading" data-reveal>
          <span className="eyebrow">{t.features.eyebrow}</span>
          <h2>{t.features.title}</h2>
          <p>{t.features.description}</p>
        </div>

        <div className="feature-stories">
          {FEATURE_STORIES.map((story, storyIndex) => {
            const primary = getFeature(story.featureIds[0]);
            const screenshot = SCREENSHOTS_BY_ID[story.screenshotId];
            const companions = story.featureIds
              .slice(1)
              .map((id) => getFeature(id));

            return (
              <article
                className={`feature-story feature-story-${story.layout}`}
                key={story.id}
                data-reveal
              >
                <div className="feature-story-copy">
                  <div className="feature-kicker">
                    <span>{String(storyIndex + 1).padStart(2, "0")}</span>
                    <FeatureStatus status={primary.status} locale={locale} />
                  </div>
                  <p className="feature-eyebrow">{primary.eyebrow[locale]}</p>
                  <h3>{primary.title[locale]}</h3>
                  <p>{primary.description[locale]}</p>
                  <ul className="feature-bullets">
                    {primary.bullets.map((bullet) => (
                      <li key={bullet.en}>
                        <CheckIcon />
                        {bullet[locale]}
                      </li>
                    ))}
                  </ul>
                  {companions.length ? (
                    <div className="story-capabilities">
                      <span>{LANDING_COPY.capabilities.label[locale]}</span>
                      {companions.map((feature) => (
                        <div key={feature.id}>
                          <strong>{feature.eyebrow[locale]}</strong>
                          <small>{feature.title[locale]}</small>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>

                <div className="feature-story-visual">
                  <ProductScreenshot
                    source={screenshotSource(story.screenshotId)}
                    alt={screenshot.alt[locale]}
                    eager={(
                      HERO_SCREENSHOT_IDS as readonly ScreenshotId[]
                    ).includes(story.screenshotId)}
                  />
                  {story.layout === "metrics" ? (
                    <div className="metrics-mosaic">
                      {(
                        [
                          "metrics-conversations-day",
                          "metrics-hourly",
                          "metrics-ai-human",
                        ] as const
                      ).map((id) => (
                        <ProductScreenshot
                          key={id}
                          className={`metric-shot metric-shot-${id}`}
                          source={screenshotSource(id)}
                          alt={SCREENSHOTS_BY_ID[id].alt[locale]}
                        />
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Integrations({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <section className="section integrations-section" id="integraciones">
      <div className="section-shell">
        <div className="integration-heading" data-reveal>
          <div className="section-heading section-heading-left">
            <span className="eyebrow">{t.integrations.eyebrow}</span>
            <h2>{t.integrations.title}</h2>
            <p>{t.integrations.description}</p>
          </div>
          <p className="integration-truth-note">
            {LANDING_COPY.integrations.betaNote[locale]}
          </p>
        </div>

        <div className="integrations-list" data-reveal>
          {INTEGRATIONS.map((integration) => (
            <article className="integration-row" key={integration.id}>
              <span className="integration-mark">
                <IntegrationIcon name={integrationIconName(integration.id)} />
              </span>
              <div>
                <h3>{integration.name[locale]}</h3>
                <p>{integration.description[locale]}</p>
                {"note" in integration && integration.note ? (
                  <small>{integration.note[locale]}</small>
                ) : null}
              </div>
              <FeatureStatus status={integration.status} locale={locale} />
            </article>
          ))}
        </div>

        <p className="billing-clarification">
          {t.integrations.billingClarification}
        </p>
      </div>
    </section>
  );
}

function HowItWorks({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <section className="section how-section" id="como-funciona">
      <div className="section-shell">
        <div className="section-heading section-heading-left" data-reveal>
          <span className="eyebrow">{t.howItWorks.eyebrow}</span>
          <h2>{t.howItWorks.title}</h2>
          <p>{t.howItWorks.description}</p>
        </div>
        <ol className="steps-list" data-reveal>
          {t.howItWorks.steps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function UseCasesAndComparison({ locale }: { locale: Locale }) {
  const copy = LANDING_COPY;

  return (
    <>
      <section className="section use-cases-section" id="casos">
        <div className="section-shell">
          <div className="section-heading section-heading-left" data-reveal>
            <span className="eyebrow">{copy.useCases.eyebrow[locale]}</span>
            <h2>{copy.useCases.title[locale]}</h2>
            <p>{copy.useCases.description[locale]}</p>
          </div>
          <div className="use-case-list">
            {USE_CASES.map((useCase, index) => (
              <article className="use-case-row" key={useCase.sector.en} data-reveal>
                <span className="use-case-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{useCase.sector[locale]}</h3>
                <div>
                  <small>{copy.useCases.problemLabel[locale]}</small>
                  <p>{useCase.problem[locale]}</p>
                </div>
                <div>
                  <small>{copy.useCases.outcomeLabel[locale]}</small>
                  <p>{useCase.outcome[locale]}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section comparison-section">
        <div className="section-shell comparison-layout">
          <div className="section-heading section-heading-left" data-reveal>
            <span className="eyebrow">{copy.comparison.eyebrow[locale]}</span>
            <h2>{copy.comparison.title[locale]}</h2>
          </div>
          <div className="comparison-table" data-reveal>
            <div className="comparison-labels" aria-hidden="true">
              <span>{copy.comparison.beforeLabel[locale]}</span>
              <span>{copy.comparison.afterLabel[locale]}</span>
            </div>
            {COMPARISON.map((item) => (
              <div className="comparison-row" key={item.before.en}>
                <p>
                  <span aria-hidden="true">—</span>
                  {item.before[locale]}
                </p>
                <p>
                  <CheckIcon />
                  {item.after[locale]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Testimonials({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <section className="section testimonials-section" aria-labelledby="testimonials-title">
      <div className="section-shell">
        <div className="section-heading" data-reveal>
          <span className="eyebrow">{t.testimonials.eyebrow}</span>
          <h2 id="testimonials-title">{t.testimonials.title}</h2>
          <p>{t.testimonials.description}</p>
          <small className="demo-disclosure">{t.testimonials.demoNotice}</small>
        </div>
      </div>
      <TestimonialRail testimonials={PUBLISHED_TESTIMONIALS} locale={locale} />
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
    <section className="section contact-section" id="contacto">
      <div className="section-shell contact-layout">
        <div className="contact-copy" data-reveal>
          <span className="eyebrow">{t.contact.eyebrow}</span>
          <h2>{t.contact.title}</h2>
          <p>{t.contact.description}</p>
          <div className="contact-actions">
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
        </div>
        <div className="contact-form-panel" data-reveal>
          <ContactForm locale={locale} />
        </div>
      </div>
    </section>
  );
}

export function LandingPage({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);
  const heroSlides = HERO_SCREENSHOT_IDS.map((id) => {
    const screenshot = SCREENSHOTS_BY_ID[id];
    return {
      id,
      light: screenshot.assets.light.src,
      dark: screenshot.assets.dark.src,
      alt: screenshot.alt,
      caption:
        id === "conversations-overview"
          ? {
              es: "Bandeja, conversación y datos del cliente en una misma vista.",
              en: "Inbox, active conversation and customer details in one view.",
            }
          : {
              es: "Atención humana con historial, responsable, etiquetas y notas.",
              en: "Human service with history, ownership, labels and notes.",
            },
      width: screenshot.assets.light.width,
      height: screenshot.assets.light.height,
    };
  });

  return (
    <>
      <a className="skip-link" href="#contenido">
        {t.accessibility.skipToContent}
      </a>
      <SiteHeader locale={locale} variant="landing" />

      <main id="contenido">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="section-shell hero-copy" data-reveal>
            <span className="eyebrow hero-eyebrow">
              <i aria-hidden="true" />
              {t.hero.eyebrow}
            </span>
            <h1 id="hero-title">{t.hero.title}</h1>
            <p>{t.hero.description}</p>
            <div className="hero-actions">
              <a className="button" href="#contacto">
                {t.hero.primaryCta}
                <ArrowIcon />
              </a>
              <a className="button button-secondary" href="#funciones">
                {t.hero.secondaryCta}
              </a>
            </div>
            <small>{t.hero.trust}</small>
          </div>
          <div className="section-shell hero-showcase" data-reveal>
            <HeroCarousel slides={heroSlides} locale={locale} />
          </div>
        </section>

        <section className="section problems-section" aria-labelledby="problems-title">
          <div className="section-shell">
            <div className="section-heading section-heading-left" data-reveal>
              <span className="eyebrow">{t.problems.eyebrow}</span>
              <h2 id="problems-title">{t.problems.title}</h2>
              <p>{t.problems.description}</p>
            </div>
            <div className="problem-list" data-reveal>
              {PROBLEMS.map((problem) => (
                <article key={problem.number}>
                  <span>{problem.number}</span>
                  <h3>{problem.title[locale]}</h3>
                  <p>{problem.description[locale]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ProductShowcase locale={locale} />
        <FeatureStories locale={locale} />
        <HowItWorks locale={locale} />
        <Integrations locale={locale} />
        <UseCasesAndComparison locale={locale} />
        <Testimonials locale={locale} />

        <section className="section pricing-section" id="precios">
          <div className="section-shell">
            <div className="section-heading" data-reveal>
              <span className="eyebrow">{t.pricing.eyebrow}</span>
              <h2>{t.pricing.title}</h2>
              <p>{t.pricing.description}</p>
            </div>
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

        <section className="section faq-section" id="preguntas">
          <div className="section-shell faq-layout">
            <div className="section-heading section-heading-left" data-reveal>
              <span className="eyebrow">{t.faq.eyebrow}</span>
              <h2>{t.faq.title}</h2>
              <p>{t.faq.description}</p>
            </div>
            <Faq locale={locale} items={FAQS} />
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
