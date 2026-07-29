import Link from "next/link";
import { Brand } from "@/components/Brand";
import {
  LanguageSwitch,
  ThemeToggle,
} from "@/components/Preferences";
import { TrackedLink } from "@/components/Tracked";
import {
  NAVIGATION,
  getTranslations,
  type Locale,
} from "@/content";
import {
  APP_LOGIN_URL,
  APP_REGISTER_URL,
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  whatsAppLink,
} from "@/lib/site";

type FooterVariant = "landing" | "servicios" | "services" | "legal";

type SiteFooterProps = {
  locale?: Locale;
  variant?: FooterVariant;
  languagePaths?: Readonly<Record<Locale, string>>;
};

function defaultLanguagePaths(
  variant: FooterVariant,
): Readonly<Record<Locale, string>> {
  if (variant === "servicios" || variant === "services") {
    return { es: "/servicios", en: "/en/services" };
  }

  return { es: "/", en: "/en" };
}

export function SiteFooter({
  locale = "es",
  variant = "landing",
  languagePaths,
}: SiteFooterProps) {
  const translations = getTranslations(locale);
  const localizedHome = locale === "es" ? "/" : "/en";
  const servicesHref = locale === "es" ? "/servicios" : "/en/services";
  const privacyHref = locale === "es" ? "/privacidad" : "/en/privacy";
  const termsHref = locale === "es" ? "/terminos" : "/en/terms";
  const isLanding = variant === "landing";
  const paths = languagePaths ?? defaultLanguagePaths(variant);
  const year = new Date().getFullYear();

  function sectionHref(href: string) {
    return isLanding ? href : `${localizedHome}${href}`;
  }

  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Link
            href={isLanding ? "#inicio" : localizedHome}
            aria-label={
              locale === "es"
                ? "Vantix, ir al inicio"
                : "Vantix, go to home page"
            }
          >
            <Brand footer />
          </Link>
          <p>{translations.footer.tagline}</p>
          <span>
            {locale === "es"
              ? "Jesús María · Córdoba · Argentina"
              : "Jesús María · Córdoba · Argentina"}
          </span>
        </div>

        <div className="footer-links">
          <div>
            <span>{translations.footer.product}</span>
            {NAVIGATION.map((item) => (
              <Link key={item.id} href={sectionHref(item.href)}>
                {item.label[locale]}
              </Link>
            ))}
          </div>

          <div>
            <span>{translations.footer.company}</span>
            <a href={APP_REGISTER_URL} target="_blank" rel="noreferrer">
              {translations.common.startTrial}
            </a>
            <TrackedLink
              event={{ name: "cta_login", location: "footer" }}
              href={APP_LOGIN_URL}
              target="_blank"
              rel="noreferrer"
            >
              {translations.common.login}
            </TrackedLink>
            <Link href={servicesHref}>
              {locale === "es" ? "Servicios digitales" : "Digital services"}
            </Link>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>

          <div>
            <span>{locale === "es" ? "Contacto" : "Contact"}</span>
            <TrackedLink
              event={{ name: "whatsapp_open", location: "footer" }}
              href={whatsAppLink(
                locale === "es"
                  ? "Hola, quiero hacer una consulta sobre VantixApp."
                  : "Hi, I would like to ask about VantixApp.",
              )}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </TrackedLink>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>

          <div>
            <span>{translations.footer.legal}</span>
            <Link href={privacyHref}>{translations.footer.privacy}</Link>
            <Link href={termsHref}>{translations.footer.terms}</Link>
            <div className="footer-preferences">
              <LanguageSwitch
                locale={locale}
                spanishHref={paths.es}
                englishHref={paths.en}
              />
              <ThemeToggle locale={locale} compact />
            </div>
          </div>
        </div>
      </div>

      <div className="container footer-studio">
        {isLanding ? (
          <p>
            {locale === "es"
              ? "¿Necesitás una web, e-commerce o sistema a medida? "
              : "Need a website, e-commerce store or custom system? "}
            <Link href={servicesHref}>
              {locale === "es"
                ? "Conocé los servicios de Vantix"
                : "Explore Vantix services"}
            </Link>
            .
          </p>
        ) : (
          <p>
            {locale === "es"
              ? "¿Querés automatizar la atención de tu negocio? "
              : "Want to automate customer service for your business? "}
            <Link href={localizedHome}>
              {locale === "es" ? "Conocé VantixApp" : "Explore VantixApp"}
            </Link>
            .
          </p>
        )}
      </div>

      <div className="container footer-bottom">
        <span>
          © {year} Vantix. {translations.footer.rights}
        </span>
        <span>
          {locale === "es"
            ? "Software desarrollado en Argentina"
            : "Software built in Argentina"}
        </span>
      </div>
    </footer>
  );
}
