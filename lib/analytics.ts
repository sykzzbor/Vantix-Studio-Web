// Abstracción de analítica sin proveedor externo: no instala scripts,
// no usa cookies y no envía datos a terceros. Si en el futuro se agrega
// un proveedor, solo hay que implementar `deliver`.

export type AnalyticsEvent =
  | { name: "cta_trial"; location: "hero" | "nav" | "pricing" | "final" | "mobile_nav" }
  | { name: "cta_how_it_works"; location: "hero" }
  | { name: "cta_demo"; location: "final" | "pricing" }
  | { name: "cta_login"; location: "nav" | "mobile_nav" | "footer" }
  | { name: "pricing_currency_change"; currency: "USD" | "ARS" }
  | { name: "pricing_plan_select"; plan: string }
  | { name: "whatsapp_open"; location: string }
  | { name: "scroll_depth"; percent: 25 | 50 | 75 | 100 };

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

function deliver(payload: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  const dataLayer = (window as DataLayerWindow).dataLayer;
  if (Array.isArray(dataLayer)) {
    dataLayer.push(payload);
  }

}

export function track(event: AnalyticsEvent): void {
  try {
    const { name, ...data } = event;
    deliver({ event: name, ...data, ts: Date.now() });
  } catch {
    // La analítica nunca debe romper la página.
  }
}
