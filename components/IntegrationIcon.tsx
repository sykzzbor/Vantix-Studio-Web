import {
  siGooglecalendar,
  siGooglesheets,
  siMercadopago,
  siN8n,
  siWhatsapp,
  siWoocommerce,
  type SimpleIcon,
} from "simple-icons";

const brandIcons = {
  googleCalendar: siGooglecalendar,
  googleSheets: siGooglesheets,
  mercadoPago: siMercadopago,
  n8n: siN8n,
  whatsapp: siWhatsapp,
  woocommerce: siWoocommerce,
} satisfies Record<string, SimpleIcon>;

export type IntegrationIconName =
  | keyof typeof brandIcons
  | "audio"
  | "documents"
  | "images"
  | "tiendanube";

export function IntegrationIcon({ name }: { name: IntegrationIconName }) {
  const icon = name in brandIcons ? brandIcons[name as keyof typeof brandIcons] : null;

  if (icon) {
    return (
      <svg className="integration-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d={icon.path} />
      </svg>
    );
  }

  if (name === "tiendanube") {
    return (
      // El archivo proviene del repositorio oficial del design system de Tiendanube.
      // eslint-disable-next-line @next/next/no-img-element
      <img className="integration-icon integration-logo" src="/integrations/tiendanube.svg" alt="" />
    );
  }

  return (
    <svg className="integration-icon" viewBox="0 0 24 24" aria-hidden="true">
      {name === "documents" ? (
        <path
          d="M7 2.75h6.7L18.25 7.3V21.25H7V2.75Zm6 1.5V8h3.75M9.5 12h6.25M9.5 15.5h6.25M9.5 19h4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
      ) : name === "images" ? (
        <>
          <rect x="3.25" y="4.25" width="17.5" height="15.5" rx="2.25" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="8.4" cy="9" r="1.45" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="m5.5 17 4.2-4.1 2.65 2.55 2.1-2.05 4.05 3.6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
        </>
      ) : (
        <path
          d="M5.25 9.5v5M8.5 6.75v10.5M11.75 4.5v15M15 7.5v9M18.25 10v4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
      )}
    </svg>
  );
}
