"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  CONTACT_FIELD_LIMITS,
  validateContactSubmission,
  type ContactField,
  type ContactFieldErrors,
  type ContactLocale,
  type ContactValidationErrorCode,
} from "@/lib/contact";
import { getTranslations } from "@/content";
import { ArrowIcon } from "./ArrowIcon";

interface ContactFormProps {
  locale?: ContactLocale;
  variant?: "vantixapp" | "web-services";
}

interface FormValues {
  name: string;
  business: string;
  email: string;
  phone: string;
  conversationVolume: string;
  message: string;
  website: string;
}

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

const INITIAL_VALUES: FormValues = {
  name: "",
  business: "",
  email: "",
  phone: "",
  conversationVolume: "",
  message: "",
  website: "",
};

const FORM_COPY = {
  es: {
    validationError: "Revisá los campos indicados antes de enviar.",
    serviceUnavailable:
      "El formulario todavía no está configurado. Podés contactarnos por los canales del sitio.",
    privacy:
      "Usamos estos datos únicamente para responder tu consulta y los enviamos de forma segura al correo del equipo.",
    validation: {
      required: "Este campo es obligatorio.",
      invalid: "Revisá el formato de este campo.",
      too_short: "Ingresá un poco más de información.",
      too_long: "El contenido supera el máximo permitido.",
    },
  },
  en: {
    validationError: "Review the highlighted fields before sending.",
    serviceUnavailable:
      "The form is not configured yet. You can reach us through the contact channels on this site.",
    privacy:
      "We only use these details to reply to your enquiry and send them securely to the team's email.",
    validation: {
      required: "This field is required.",
      invalid: "Check the format of this field.",
      too_short: "Please provide a little more information.",
      too_long: "This content exceeds the maximum length.",
    },
  },
} as const;

const WEB_SERVICES_COPY = {
  es: {
    businessLabel: "Negocio o proyecto",
    businessPlaceholder: "Nombre del negocio o proyecto",
    projectLabel: "Tipo de proyecto",
    projectPlaceholder: "Landing, sitio web, e-commerce o sistema",
    messageLabel: "Contanos qué necesitás",
    messagePlaceholder:
      "Contanos el objetivo, el alcance o el plazo que tenés en mente.",
    submit: "Enviar consulta",
  },
  en: {
    businessLabel: "Business or project",
    businessPlaceholder: "Business or project name",
    projectLabel: "Project type",
    projectPlaceholder: "Landing page, website, e-commerce or system",
    messageLabel: "Tell us what you need",
    messagePlaceholder:
      "Tell us about your goal, scope or the timeline you have in mind.",
    submit: "Send enquiry",
  },
} as const;

function createSubmissionId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function ContactForm({
  locale = "es",
  variant = "vantixapp",
}: ContactFormProps) {
  const contactTranslations = getTranslations(locale).contact;
  const webServicesCopy = WEB_SERVICES_COPY[locale];
  const isWebServices = variant === "web-services";
  const copy = {
    labels: {
      ...contactTranslations.fields,
      ...(isWebServices
        ? {
            business: webServicesCopy.businessLabel,
            conversationVolume: webServicesCopy.projectLabel,
            message: webServicesCopy.messageLabel,
          }
        : {}),
    },
    placeholders: {
      ...contactTranslations.placeholders,
      ...(isWebServices
        ? {
            business: webServicesCopy.businessPlaceholder,
            conversationVolume: webServicesCopy.projectPlaceholder,
            message: webServicesCopy.messagePlaceholder,
          }
        : {}),
    },
    submit: isWebServices ? webServicesCopy.submit : contactTranslations.submit,
    submitting: contactTranslations.sending,
    success: contactTranslations.success,
    error: contactTranslations.error,
    rateLimited: contactTranslations.validation.rateLimited,
    ...FORM_COPY[locale],
  };
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const submissionIdRef = useRef<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function focusFirstError() {
    window.requestAnimationFrame(() => {
      formRef.current
        ?.querySelector<HTMLElement>('[aria-invalid="true"]')
        ?.focus();
    });
  }

  function updateValue(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    submissionIdRef.current = null;

    if (field !== "website") {
      setErrors((current) => {
        if (!current[field]) {
          return current;
        }

        const next = { ...current };
        delete next[field];
        return next;
      });
    }

    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  function errorMessage(code: ContactValidationErrorCode) {
    return copy.validation[code];
  }

  function fieldDescription(field: ContactField) {
    return errors[field] ? `contact-${field}-error` : undefined;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "submitting") {
      return;
    }

    submissionIdRef.current ??= createSubmissionId();
    const payload = {
      ...values,
      locale,
      interest: variant,
      submissionId: submissionIdRef.current,
    };
    const validation = validateContactSubmission(payload);

    if (!validation.ok) {
      if (validation.reason === "validation") {
        setErrors(validation.errors);
        focusFirstError();
      }
      setStatus("error");
      setStatusMessage(copy.validationError);
      return;
    }

    setErrors({});
    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result: unknown = await response.json().catch(() => null);

      if (!response.ok || !isObject(result) || result.ok !== true) {
        const serverFields =
          isObject(result) && isObject(result.fields)
            ? (result.fields as ContactFieldErrors)
            : {};
        const code = isObject(result) ? result.code : undefined;

        setErrors(serverFields);
        if (Object.keys(serverFields).length > 0) {
          focusFirstError();
        }
        setStatus("error");
        setStatusMessage(
          code === "service_unavailable"
            ? copy.serviceUnavailable
            : code === "rate_limited"
              ? copy.rateLimited
              : copy.error,
        );
        return;
      }

      setStatus("success");
      setStatusMessage(copy.success);
    } catch {
      setStatus("error");
      setStatusMessage(copy.error);
    }
  }

  return (
    <form
      ref={formRef}
      className="contact-form"
      onSubmit={submit}
      aria-busy={status === "submitting"}
      noValidate
    >
      <label htmlFor="contact-name">
        <span>{copy.labels.name}</span>
        <input
          id="contact-name"
          name="name"
          value={values.name}
          onChange={(event) => updateValue("name", event.target.value)}
          placeholder={copy.placeholders.name}
          autoComplete="name"
          maxLength={CONTACT_FIELD_LIMITS.name.max}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={fieldDescription("name")}
          required
        />
        {errors.name ? (
          <small id="contact-name-error">{errorMessage(errors.name)}</small>
        ) : null}
      </label>

      <label htmlFor="contact-business">
        <span>{copy.labels.business}</span>
        <input
          id="contact-business"
          name="business"
          value={values.business}
          onChange={(event) => updateValue("business", event.target.value)}
          placeholder={copy.placeholders.business}
          autoComplete="organization"
          maxLength={CONTACT_FIELD_LIMITS.business.max}
          aria-invalid={Boolean(errors.business)}
          aria-describedby={fieldDescription("business")}
          required
        />
        {errors.business ? (
          <small id="contact-business-error">
            {errorMessage(errors.business)}
          </small>
        ) : null}
      </label>

      <label htmlFor="contact-email">
        <span>{copy.labels.email}</span>
        <input
          id="contact-email"
          name="email"
          type="email"
          value={values.email}
          onChange={(event) => updateValue("email", event.target.value)}
          placeholder={copy.placeholders.email}
          autoComplete="email"
          maxLength={CONTACT_FIELD_LIMITS.email.max}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={fieldDescription("email")}
          required
        />
        {errors.email ? (
          <small id="contact-email-error">{errorMessage(errors.email)}</small>
        ) : null}
      </label>

      <label htmlFor="contact-phone">
        <span>{copy.labels.phone}</span>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={(event) => updateValue("phone", event.target.value)}
          placeholder={copy.placeholders.phone}
          autoComplete="tel"
          maxLength={CONTACT_FIELD_LIMITS.phone.max}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={fieldDescription("phone")}
          required
        />
        {errors.phone ? (
          <small id="contact-phone-error">{errorMessage(errors.phone)}</small>
        ) : null}
      </label>

      <label htmlFor="contact-conversation-volume">
        <span>{copy.labels.conversationVolume}</span>
        <input
          id="contact-conversation-volume"
          name="conversationVolume"
          value={values.conversationVolume}
          onChange={(event) =>
            updateValue("conversationVolume", event.target.value)
          }
          placeholder={copy.placeholders.conversationVolume}
          inputMode={isWebServices ? "text" : "numeric"}
          maxLength={CONTACT_FIELD_LIMITS.conversationVolume.max}
          aria-invalid={Boolean(errors.conversationVolume)}
          aria-describedby={fieldDescription("conversationVolume")}
          required
        />
        {errors.conversationVolume ? (
          <small id="contact-conversation-volume-error">
            {errorMessage(errors.conversationVolume)}
          </small>
        ) : null}
      </label>

      <label htmlFor="contact-message">
        <span>{copy.labels.message}</span>
        <textarea
          id="contact-message"
          name="message"
          value={values.message}
          onChange={(event) => updateValue("message", event.target.value)}
          placeholder={copy.placeholders.message}
          rows={5}
          maxLength={CONTACT_FIELD_LIMITS.message.max}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={fieldDescription("message")}
          required
        />
        {errors.message ? (
          <small id="contact-message-error">
            {errorMessage(errors.message)}
          </small>
        ) : null}
      </label>

      <div hidden aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          value={values.website}
          onChange={(event) => updateValue("website", event.target.value)}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

      <button
        className="button button-dark"
        type="submit"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? copy.submitting : copy.submit}
        <ArrowIcon />
      </button>

      {statusMessage ? (
        <p
          role={status === "error" ? "alert" : "status"}
          aria-live={status === "error" ? "assertive" : "polite"}
        >
          {statusMessage}
        </p>
      ) : (
        <p>{copy.privacy}</p>
      )}
    </form>
  );
}
