"use client";

import { useEffect, useState } from "react";
import { ArrowIcon, CheckIcon } from "@/components/ArrowIcon";
import {
  PLAN_LIMIT_LABELS,
  PLANS,
  PRICING_SETTINGS,
  getTranslations,
  type Locale,
  type PlanLimits,
} from "@/content";
import { track } from "@/lib/analytics";
import {
  convertUsdToArs,
  isValidPlansExchangeRate,
  type PlansExchangeRate,
} from "@/lib/plans-pricing";
import {
  APP_REGISTER_URL,
  whatsAppLink,
} from "@/lib/site";

type Currency = "USD" | "ARS";

type PricingSectionProps = {
  exchange: PlansExchangeRate;
  locale?: Locale;
};

const CURRENCY_STORAGE_KEY = "vantix-plans-currency";
const LIMIT_KEYS = [
  "businesses",
  "users",
  "monthlyConversations",
  "monthlyAiMessages",
] as const satisfies readonly (keyof PlanLimits)[];

function formatMoney(
  value: number,
  currency: Currency,
  locale: Locale,
): string {
  return new Intl.NumberFormat(locale === "es" ? "es-AR" : "en-US", {
    style: "currency",
    currency,
    currencyDisplay: "code",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "es" ? "es-AR" : "en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

function formatLimitLabel(
  key: keyof PlanLimits,
  value: number,
  locale: Locale,
): string {
  if (value !== 1) return PLAN_LIMIT_LABELS[key][locale];
  if (key === "businesses") return locale === "es" ? "negocio" : "business";
  if (key === "users") return locale === "es" ? "usuario" : "user";
  return PLAN_LIMIT_LABELS[key][locale];
}

function formatRate(rate: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === "es" ? "es-AR" : "en-US", {
    style: "currency",
    currency: "ARS",
    currencyDisplay: "code",
    maximumFractionDigits: 2,
  }).format(rate);
}

function formatUpdatedAt(value: string | null, locale: Locale): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat(locale === "es" ? "es-AR" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(date);
}

function exchangeSourceLabel(
  source: PlansExchangeRate["source"],
  locale: Locale,
): string | null {
  if (!source) return null;
  if (locale === "es") return source;

  if (source === "Configuración") return "Configuration";
  if (source === "Último valor válido") return "Last valid value";
  return source;
}

export function PricingSection({
  exchange,
  locale = "es",
}: PricingSectionProps) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const translations = getTranslations(locale);
  const exchangeRate =
    exchange.rate !== null && isValidPlansExchangeRate(exchange.rate)
      ? exchange.rate
      : null;
  const updatedAt = formatUpdatedAt(exchange.updatedAt, locale);
  const source = exchangeSourceLabel(exchange.source, locale);

  useEffect(() => {
    const restore = window.setTimeout(() => {
      try {
        const stored =
          window.localStorage.getItem(CURRENCY_STORAGE_KEY) ??
          window.sessionStorage.getItem(CURRENCY_STORAGE_KEY);
        if (stored === "ARS" && exchangeRate) setCurrency("ARS");
      } catch {
        // If storage is unavailable, USD remains the safe default.
      }
    }, 0);

    return () => window.clearTimeout(restore);
  }, [exchangeRate]);

  function changeCurrency(next: Currency) {
    if (next === "ARS" && !exchangeRate) return;
    setCurrency(next);
    track({ name: "pricing_currency_change", currency: next });

    try {
      window.localStorage.setItem(CURRENCY_STORAGE_KEY, next);
      window.sessionStorage.setItem(CURRENCY_STORAGE_KEY, next);
    } catch {
      // The selector still works even when the preference cannot be stored.
    }
  }

  function renderPlan(
    plan: (typeof PLANS)[number],
    layout: "card" | "custom" = "card",
  ) {
    const custom = plan.monthlyUsd === null;
    const displayedPrice =
      !custom && currency === "ARS" && exchangeRate
        ? formatMoney(
            convertUsdToArs(plan.monthlyUsd, exchangeRate),
            "ARS",
            locale,
          )
        : !custom
          ? formatMoney(plan.monthlyUsd, "USD", locale)
          : PRICING_SETTINGS.customPriceLabel[locale];
    const ctaHref =
      plan.cta === "contactSales"
        ? whatsAppLink(
            locale === "es"
              ? "Hola, quiero consultar por un plan personalizado de VantixApp."
              : "Hi, I would like to discuss a custom VantixApp plan.",
          )
        : APP_REGISTER_URL;
    const ctaLabel =
      plan.cta === "contactSales"
        ? translations.common.contactSales
        : translations.common.startTrial;

    return (
      <article
        className={`plan${plan.featured ? " featured" : ""}${
          layout === "custom" ? " plan-custom" : ""
        }`}
        key={plan.id}
      >
        {plan.featured ? (
          <span className="plan-flag">{translations.common.mostChosen}</span>
        ) : null}

        <div className="plan-top">
          <h3>{plan.name[locale]}</h3>
          <p>{plan.description[locale]}</p>
        </div>

        <div className="plan-price">
          <strong>{displayedPrice}</strong>
          {!custom ? (
            <>
              <span>{PRICING_SETTINGS.billingPeriod[locale]}</span>
              {currency === "ARS" && exchangeRate ? (
                <small>
                  {formatMoney(plan.monthlyUsd, "USD", locale)}{" "}
                  {locale === "es" ? "facturados en USD" : "billed in USD"}
                </small>
              ) : null}
            </>
          ) : null}
        </div>

        <a
          className={plan.featured ? "button" : "button button-secondary"}
          href={ctaHref}
          target="_blank"
          rel="noreferrer"
          aria-label={`${ctaLabel}: ${plan.name[locale]}`}
          onClick={() => {
            track({ name: "pricing_plan_select", plan: plan.id });
            if (plan.cta === "contactSales") {
              track({ name: "whatsapp_open", location: "pricing" });
            } else {
              track({ name: "cta_trial", location: "pricing" });
            }
          }}
        >
          {ctaLabel}
          <ArrowIcon />
        </a>

        {!custom ? (
          <p className="plan-trial">
            {translations.pricing.trial} ·{" "}
            {locale === "es" ? "sin tarjeta" : "no card required"}
          </p>
        ) : null}

        {!custom ? (
          <div className="plan-capacity">
            <h4>{translations.pricing.limitsTitle}</h4>
            <ul>
              {LIMIT_KEYS.map((limitKey) => {
                const limit = plan.limits[limitKey];
                if (limit === null) return null;

                return (
                  <li key={limitKey}>
                    <CheckIcon />
                    <span>
                      {formatNumber(limit, locale)}{" "}
                      {formatLimitLabel(limitKey, limit, locale)}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        <div className="plan-includes">
          <h4>{translations.pricing.featuresTitle}</h4>
          <ul>
            {plan.highlights.map((highlight) => (
              <li key={highlight.es}>
                <CheckIcon />
                <span>{highlight[locale]}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    );
  }

  const primaryPlans = PLANS.filter((plan) => plan.monthlyUsd !== null);
  const customPlan = PLANS.find((plan) => plan.monthlyUsd === null);

  return (
    <div className="pricing-block">
      <div className="pricing-controls">
        <span>{translations.pricing.currencyLabel}</span>
        <div
          className="currency-toggle"
          role="group"
          aria-label={translations.pricing.currencyLabel}
        >
          {PRICING_SETTINGS.currencies.map((option) => (
            <button
              key={option}
              type="button"
              disabled={option === "ARS" && !exchangeRate}
              aria-pressed={currency === option}
              aria-describedby="exchange-rate-note"
              title={
                option === "ARS" && !exchangeRate
                  ? PRICING_SETTINGS.exchangeRateUnavailable[locale]
                  : undefined
              }
              onClick={() => changeCurrency(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <p
        id="exchange-rate-note"
        className="exchange-note"
        aria-live="polite"
      >
        {exchangeRate ? (
          <>
            {currency === "USD"
              ? locale === "es"
                ? "También podés ver valores estimados en ARS."
                : "You can also view estimated prices in ARS."
              : `${translations.pricing.exchangeUpdated}: ${formatRate(exchangeRate, locale)}`}
            {source ? ` · ${source}` : ""}
            {updatedAt ? ` · ${updatedAt}` : ""}
          </>
        ) : (
          translations.pricing.exchangeUnavailable
        )}
      </p>

      <div className="plans-grid">
        {primaryPlans.map((plan) => renderPlan(plan))}
      </div>

      {customPlan ? (
        <div className="custom-plan-wrap">
          {renderPlan(customPlan, "custom")}
        </div>
      ) : null}

      <p className="pricing-note">
        {PRICING_SETTINGS.variableCostsNote[locale]}
      </p>
    </div>
  );
}
