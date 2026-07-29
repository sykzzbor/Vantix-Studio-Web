export const LOCALES = ["es", "en"] as const;

export type Locale = (typeof LOCALES)[number];
export type LocalizedText = Readonly<Record<Locale, string>>;
export type Theme = "light" | "dark";
export type AvailabilityStatus = "available" | "beta" | "comingSoon";

export type NavigationItem = {
  id:
    | "product"
    | "features"
    | "integrations"
    | "howItWorks"
    | "pricing"
    | "faq"
    | "contact";
  href: string;
  label: LocalizedText;
};

export type NavigationAction = {
  id: "login" | "bookDemo";
  href: string;
  label: LocalizedText;
  external: boolean;
  variant: "secondary" | "primary";
};

export type ScreenshotId =
  | "conversations-overview"
  | "conversations-human"
  | "conversations-ai"
  | "agent-playground"
  | "metrics-summary"
  | "metrics-conversations-day"
  | "metrics-hourly"
  | "metrics-ai-human";

export type ScreenshotAsset = {
  src: string;
  width: number;
  height: number;
};

export type ScreenshotDefinition = {
  id: ScreenshotId;
  alt: LocalizedText;
  assets: Readonly<Record<Theme, ScreenshotAsset>>;
};

export type FeatureId =
  | "inbox"
  | "ai-agent"
  | "ai-human-mode"
  | "crm"
  | "notes-and-labels"
  | "metrics"
  | "team"
  | "knowledge"
  | "automations"
  | "history";

export type FeatureDefinition = {
  id: FeatureId;
  status: AvailabilityStatus;
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  bullets: readonly LocalizedText[];
  screenshotId: ScreenshotId;
};

export type IntegrationId =
  | "whatsapp-business"
  | "tiendanube"
  | "google-sheets"
  | "google-calendar"
  | "woocommerce"
  | "mercado-pago"
  | "pdf"
  | "ai-images"
  | "audio-understanding"
  | "n8n";

export type IntegrationCategory =
  | "channel"
  | "commerce"
  | "calendar"
  | "data"
  | "billing"
  | "knowledge"
  | "automation";

export type IntegrationDefinition = {
  id: IntegrationId;
  name: LocalizedText;
  description: LocalizedText;
  status: AvailabilityStatus;
  category: IntegrationCategory;
  logoSrc?: string;
  icon?: "document" | "image" | "audio";
  logoAlt: LocalizedText;
  note?: LocalizedText;
};

export type PlanId =
  | "standard"
  | "professional"
  | "business"
  | "custom";

export type PlanLimits = {
  businesses: number | null;
  users: number | null;
  monthlyConversations: number | null;
  monthlyAiMessages: number | null;
};

export type PlanDefinition = {
  id: PlanId;
  name: LocalizedText;
  monthlyUsd: number | null;
  description: LocalizedText;
  limits: PlanLimits;
  includedFeatureIds: readonly FeatureId[];
  highlights: readonly LocalizedText[];
  cta: "startTrial" | "contactSales";
  featured: boolean;
};

export type TestimonialDefinition = {
  id: string;
  isDemo: boolean;
  published: boolean;
  badge: LocalizedText;
  name: LocalizedText;
  role: LocalizedText;
  business: LocalizedText;
  quote: LocalizedText;
  result: LocalizedText;
  avatarSrc?: string;
};

export type FaqId =
  | "agent"
  | "setup"
  | "team"
  | "human-takeover"
  | "security"
  | "integrations"
  | "trial"
  | "payments"
  | "cancellation"
  | "support"
  | "whatsapp"
  | "knowledge";

export type FaqDefinition = {
  id: FaqId;
  question: LocalizedText;
  answer: LocalizedText;
};
