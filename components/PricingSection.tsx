"use client";

import { useEffect, useState } from "react";
import { ArrowIcon, CheckIcon } from "./ArrowIcon";
import { track } from "@/lib/analytics";
import { PLANS, TRIAL_DAYS } from "@/lib/plans";
import {
  convertUsdToArs,
  type PlansExchangeRate,
} from "@/lib/plans-pricing";
import { APP_REGISTER_URL } from "@/lib/site";

type Currency = "USD" | "ARS";

const CURRENCY_STORAGE_KEY = "vantix-plans-currency";

function formatUsd(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatArs(value: number, rate: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(convertUsdToArs(value, rate));
}

function formatRate(rate: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(rate);
}

function formatUpdatedAt(value: string | null): string {
  if (!value) return "Fecha de actualización no informada";
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function PricingSection({ exchange }: { exchange: PlansExchangeRate }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const exchangeRate = exchange.rate;

  useEffect(() => {
    const restore = window.setTimeout(() => {
      try {
        const stored = window.sessionStorage.getItem(CURRENCY_STORAGE_KEY);
        if (stored === "ARS" && exchangeRate) setCurrency("ARS");
      } catch {
        // sessionStorage puede no estar disponible; se mantiene USD.
      }
    }, 0);
    return () => window.clearTimeout(restore);
  }, [exchangeRate]);

  function changeCurrency(next: Currency) {
    if (next === "ARS" && !exchangeRate) return;
    setCurrency(next);
    track({ name: "pricing_currency_change", currency: next });
    try {
      window.sessionStorage.setItem(CURRENCY_STORAGE_KEY, next);
    } catch {
      // Ignorado: la preferencia simplemente no se recuerda.
    }
  }

  return (
    <div className="pricing-block">
      <div
        className="currency-toggle"
        role="group"
        aria-label="Moneda de los precios"
      >
        {(["USD", "ARS"] as const).map((option) => (
          <button
            key={option}
            type="button"
            disabled={option === "ARS" && !exchangeRate}
            aria-pressed={currency === option}
            title={
              option === "ARS" && !exchangeRate
                ? "La cotización ARS todavía no está disponible"
                : undefined
            }
            onClick={() => changeCurrency(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <p className="exchange-note" aria-live="polite">
        {currency === "ARS" && exchangeRate
          ? `Cotización de referencia: ${formatRate(exchangeRate)} por dólar · Fuente: ${exchange.source ?? "No informada"} · ${formatUpdatedAt(exchange.updatedAt)}`
          : exchangeRate
            ? "Podés ver los valores estimados en pesos argentinos."
            : "La cotización en pesos no está disponible en este momento. Los precios se muestran en dólares."}
      </p>

      <div className="plans-grid">
        {PLANS.map((plan) => (
          <article
            className={`plan${plan.recommended ? " featured" : ""}`}
            key={plan.id}
          >
            {plan.recommended ? (
              <span className="plan-flag">Más elegido</span>
            ) : null}
            <div className="plan-top">
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
            </div>
            <div className="plan-price">
              <strong>
                {currency === "ARS" && exchangeRate
                  ? formatArs(plan.usdMonthly, exchangeRate)
                  : formatUsd(plan.usdMonthly)}
              </strong>
              <span>por mes</span>
              {currency === "ARS" && exchangeRate ? (
                <small>{formatUsd(plan.usdMonthly)} facturados en USD</small>
              ) : null}
            </div>
            <a
              className={plan.recommended ? "button" : "button button-secondary"}
              href={APP_REGISTER_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                track({ name: "pricing_plan_select", plan: plan.id });
                track({ name: "cta_trial", location: "pricing" });
              }}
            >
              Comenzar prueba gratis <ArrowIcon />
            </a>
            <p className="plan-trial">{TRIAL_DAYS} días gratis · Sin tarjeta para probar</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <CheckIcon />
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <p className="pricing-note">
        Las tarifas variables de mensajería de WhatsApp y los consumos
        extraordinarios se informan antes de contratar. Al finalizar la prueba,
        tu información se conserva y podés activar un plan para continuar.
      </p>
    </div>
  );
}
