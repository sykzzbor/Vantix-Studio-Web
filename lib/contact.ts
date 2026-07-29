export const CONTACT_FIELD_LIMITS = {
  name: { min: 2, max: 80 },
  business: { min: 2, max: 120 },
  email: { max: 254 },
  phone: { min: 6, max: 40 },
  conversationVolume: { min: 1, max: 80 },
  message: { min: 10, max: 2_000 },
  submissionId: { min: 8, max: 128 },
  website: { max: 200 },
} as const;

export const CONTACT_RATE_LIMIT = {
  maxRequests: 4,
  windowMs: 10 * 60 * 1_000,
} as const;

export type ContactLocale = "es" | "en";

export type ContactValidationErrorCode =
  | "required"
  | "invalid"
  | "too_short"
  | "too_long";

export type ContactField =
  | "name"
  | "business"
  | "email"
  | "phone"
  | "conversationVolume"
  | "message"
  | "submissionId";

export type ContactFieldErrors = Partial<
  Record<ContactField, ContactValidationErrorCode>
>;

export interface ContactSubmission {
  name: string;
  business: string;
  email: string;
  phone: string;
  conversationVolume: string;
  message: string;
  locale: ContactLocale;
  submissionId: string;
}

export type ContactValidationResult =
  | {
      ok: true;
      data: ContactSubmission;
    }
  | {
      ok: false;
      reason: "validation";
      errors: ContactFieldErrors;
    }
  | {
      ok: false;
      reason: "honeypot";
      errors: ContactFieldErrors;
    };

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

export interface ContactRateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
  resetAt: number;
}

const rateLimitBuckets = new Map<string, RateLimitBucket>();
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+\d\s().-]+$/;
const SUBMISSION_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function stringValue(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function sanitizeContactText(
  value: unknown,
  options: { multiline?: boolean } = {},
): string {
  const normalized = stringValue(value).normalize("NFKC");

  if (options.multiline) {
    return normalized
      .replace(/\r\n?/g, "\n")
      .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/g, "")
      .split("\n")
      .map((line) => line.trim())
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  return normalized
    .replace(/[\u0000-\u001f\u007f-\u009f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function escapeContactHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character] ?? character,
  );
}

function validateLength(
  field: ContactField,
  value: string,
  min: number,
  max: number,
  errors: ContactFieldErrors,
) {
  if (!value) {
    errors[field] = "required";
  } else if (value.length < min) {
    errors[field] = "too_short";
  } else if (value.length > max) {
    errors[field] = "too_long";
  }
}

export function validateContactSubmission(
  input: unknown,
): ContactValidationResult {
  const source = isRecord(input) ? input : {};
  const website = sanitizeContactText(source.website).slice(
    0,
    CONTACT_FIELD_LIMITS.website.max + 1,
  );

  if (website) {
    return { ok: false, reason: "honeypot", errors: {} };
  }

  const data: ContactSubmission = {
    name: sanitizeContactText(source.name),
    business: sanitizeContactText(source.business),
    email: sanitizeContactText(source.email).toLowerCase(),
    phone: sanitizeContactText(source.phone),
    conversationVolume: sanitizeContactText(source.conversationVolume),
    message: sanitizeContactText(source.message, { multiline: true }),
    locale: source.locale === "en" ? "en" : "es",
    submissionId: sanitizeContactText(source.submissionId),
  };
  const errors: ContactFieldErrors = {};

  validateLength(
    "name",
    data.name,
    CONTACT_FIELD_LIMITS.name.min,
    CONTACT_FIELD_LIMITS.name.max,
    errors,
  );
  validateLength(
    "business",
    data.business,
    CONTACT_FIELD_LIMITS.business.min,
    CONTACT_FIELD_LIMITS.business.max,
    errors,
  );
  validateLength(
    "phone",
    data.phone,
    CONTACT_FIELD_LIMITS.phone.min,
    CONTACT_FIELD_LIMITS.phone.max,
    errors,
  );
  validateLength(
    "conversationVolume",
    data.conversationVolume,
    CONTACT_FIELD_LIMITS.conversationVolume.min,
    CONTACT_FIELD_LIMITS.conversationVolume.max,
    errors,
  );
  validateLength(
    "message",
    data.message,
    CONTACT_FIELD_LIMITS.message.min,
    CONTACT_FIELD_LIMITS.message.max,
    errors,
  );
  validateLength(
    "submissionId",
    data.submissionId,
    CONTACT_FIELD_LIMITS.submissionId.min,
    CONTACT_FIELD_LIMITS.submissionId.max,
    errors,
  );

  if (!data.email) {
    errors.email = "required";
  } else if (
    data.email.length > CONTACT_FIELD_LIMITS.email.max ||
    !EMAIL_PATTERN.test(data.email)
  ) {
    errors.email =
      data.email.length > CONTACT_FIELD_LIMITS.email.max
        ? "too_long"
        : "invalid";
  }

  if (
    data.phone &&
    (!PHONE_PATTERN.test(data.phone) ||
      data.phone.replace(/\D/g, "").length < CONTACT_FIELD_LIMITS.phone.min)
  ) {
    errors.phone = "invalid";
  }

  if (
    data.submissionId &&
    !errors.submissionId &&
    !SUBMISSION_ID_PATTERN.test(data.submissionId)
  ) {
    errors.submissionId = "invalid";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, reason: "validation", errors };
  }

  return { ok: true, data };
}

/**
 * Protección best-effort para una instancia de servidor. En un despliegue
 * serverless no reemplaza un rate limiter compartido entre regiones.
 */
export function consumeContactRateLimit(
  identifier: string,
  options: {
    now?: number;
    maxRequests?: number;
    windowMs?: number;
  } = {},
): ContactRateLimitResult {
  const now = options.now ?? Date.now();
  const maxRequests = options.maxRequests ?? CONTACT_RATE_LIMIT.maxRequests;
  const windowMs = options.windowMs ?? CONTACT_RATE_LIMIT.windowMs;
  const key = sanitizeContactText(identifier).slice(0, 160) || "anonymous";
  const current = rateLimitBuckets.get(key);

  if (!current || current.resetAt <= now) {
    const resetAt = now + windowMs;
    rateLimitBuckets.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      remaining: Math.max(0, maxRequests - 1),
      retryAfterSeconds: 0,
      resetAt,
    };
  }

  if (current.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)),
      resetAt: current.resetAt,
    };
  }

  current.count += 1;
  rateLimitBuckets.set(key, current);

  if (rateLimitBuckets.size > 1_000) {
    for (const [bucketKey, bucket] of rateLimitBuckets) {
      if (bucket.resetAt <= now) {
        rateLimitBuckets.delete(bucketKey);
      }
    }
  }

  return {
    allowed: true,
    remaining: Math.max(0, maxRequests - current.count),
    retryAfterSeconds: 0,
    resetAt: current.resetAt,
  };
}

export function resetContactRateLimiterForTests() {
  rateLimitBuckets.clear();
}
