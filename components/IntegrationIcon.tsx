import {
  siAnthropic,
  siGooglecalendar,
  siGooglesheets,
  siInstagram,
  siN8n,
  siWhatsapp,
  siWoocommerce,
  type SimpleIcon,
} from "simple-icons";

const brandIcons = {
  anthropic: siAnthropic,
  googleCalendar: siGooglecalendar,
  googleSheets: siGooglesheets,
  instagram: siInstagram,
  n8n: siN8n,
  whatsapp: siWhatsapp,
  woocommerce: siWoocommerce,
} satisfies Record<string, SimpleIcon>;

export type IntegrationIconName = keyof typeof brandIcons | "documents" | "store";

export function IntegrationIcon({ name }: { name: IntegrationIconName }) {
  const icon = name in brandIcons ? brandIcons[name as keyof typeof brandIcons] : null;

  if (icon) {
    return (
      <svg className="integration-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d={icon.path} />
      </svg>
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
      ) : (
        <path
          d="M4 9.25h16l-1.1-5.5H5.1L4 9.25Zm1.25 0v11h13.5v-11M8.25 20.25v-6h4.5v6"
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
