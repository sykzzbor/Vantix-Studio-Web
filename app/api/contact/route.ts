import {
  consumeContactRateLimit,
  escapeContactHtml,
  validateContactSubmission,
  type ContactSubmission,
} from "@/lib/contact";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 16_384;
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const RESEND_USER_AGENT = `VantixWebsite/1.0 (+${SITE_URL})`;

interface ContactEmailConfig {
  apiKey: string;
  to: string;
  from: string;
}

function jsonResponse(
  body: Record<string, unknown>,
  status: number,
  headers: Record<string, string> = {},
) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...headers,
    },
  });
}

function getEmailConfig(): ContactEmailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();

  return apiKey && to && from ? { apiKey, to, from } : null;
}

function getClientIdentifier(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown";

  return `contact:${ip}`;
}

function createEmailContent(data: ContactSubmission) {
  const isWebServices = data.interest === "web-services";
  const labels =
    data.locale === "en"
      ? {
          title: isWebServices
            ? "New web services enquiry"
            : "New VantixApp enquiry",
          name: "Name",
          business: "Business",
          email: "Email",
          phone: "Phone",
          volume: isWebServices
            ? "Project type"
            : "Approximate conversations",
          message: "Message",
        }
      : {
          title: isWebServices
            ? "Nueva consulta por servicios web"
            : "Nueva consulta por VantixApp",
          name: "Nombre",
          business: "Negocio",
          email: "Email",
          phone: "Teléfono",
          volume: isWebServices
            ? "Tipo de proyecto"
            : "Conversaciones aproximadas",
          message: "Mensaje",
        };
  const safe = {
    name: escapeContactHtml(data.name),
    business: escapeContactHtml(data.business),
    email: escapeContactHtml(data.email),
    phone: escapeContactHtml(data.phone),
    volume: escapeContactHtml(data.conversationVolume),
    message: escapeContactHtml(data.message).replace(/\n/g, "<br />"),
  };

  return {
    subject: `[Vantix] ${labels.title} · ${data.business}`,
    text: [
      labels.title,
      "",
      `${labels.name}: ${data.name}`,
      `${labels.business}: ${data.business}`,
      `${labels.email}: ${data.email}`,
      `${labels.phone}: ${data.phone}`,
      `${labels.volume}: ${data.conversationVolume}`,
      "",
      `${labels.message}:`,
      data.message,
    ].join("\n"),
    html: `
      <main style="font-family:Arial,sans-serif;line-height:1.55;color:#111827">
        <h1 style="font-size:20px">${labels.title}</h1>
        <table style="border-collapse:collapse">
          <tbody>
            <tr><th align="left" style="padding:4px 16px 4px 0">${labels.name}</th><td>${safe.name}</td></tr>
            <tr><th align="left" style="padding:4px 16px 4px 0">${labels.business}</th><td>${safe.business}</td></tr>
            <tr><th align="left" style="padding:4px 16px 4px 0">${labels.email}</th><td>${safe.email}</td></tr>
            <tr><th align="left" style="padding:4px 16px 4px 0">${labels.phone}</th><td>${safe.phone}</td></tr>
            <tr><th align="left" style="padding:4px 16px 4px 0">${labels.volume}</th><td>${safe.volume}</td></tr>
          </tbody>
        </table>
        <h2 style="font-size:16px;margin-top:24px">${labels.message}</h2>
        <p>${safe.message}</p>
      </main>
    `.trim(),
  };
}

export async function POST(request: Request) {
  const declaredLength = Number(request.headers.get("content-length"));

  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    return jsonResponse({ ok: false, code: "payload_too_large" }, 413);
  }

  let rawBody: string;

  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse({ ok: false, code: "invalid_request" }, 400);
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_REQUEST_BYTES) {
    return jsonResponse({ ok: false, code: "payload_too_large" }, 413);
  }

  let payload: unknown;

  try {
    payload = JSON.parse(rawBody);
  } catch {
    return jsonResponse({ ok: false, code: "invalid_json" }, 400);
  }

  const validation = validateContactSubmission(payload);

  if (!validation.ok) {
    if (validation.reason === "honeypot") {
      return jsonResponse({ ok: true }, 200);
    }

    return jsonResponse(
      { ok: false, code: "validation_error", fields: validation.errors },
      400,
    );
  }

  const emailConfig = getEmailConfig();

  if (!emailConfig) {
    return jsonResponse({ ok: false, code: "service_unavailable" }, 503);
  }

  const rateLimit = consumeContactRateLimit(getClientIdentifier(request));

  if (!rateLimit.allowed) {
    return jsonResponse(
      { ok: false, code: "rate_limited" },
      429,
      { "Retry-After": String(rateLimit.retryAfterSeconds) },
    );
  }

  const content = createEmailContent(validation.data);

  try {
    const resendResponse = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${emailConfig.apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `contact/${validation.data.submissionId}`,
        "User-Agent": RESEND_USER_AGENT,
      },
      body: JSON.stringify({
        from: emailConfig.from,
        to: [emailConfig.to],
        reply_to: validation.data.email,
        subject: content.subject,
        text: content.text,
        html: content.html,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!resendResponse.ok) {
      return jsonResponse({ ok: false, code: "delivery_failed" }, 502);
    }
  } catch {
    return jsonResponse({ ok: false, code: "delivery_failed" }, 502);
  }

  return jsonResponse({ ok: true }, 200);
}
