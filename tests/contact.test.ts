import assert from "node:assert/strict";
import test from "node:test";
import { POST } from "../app/api/contact/route";
import {
  consumeContactRateLimit,
  escapeContactHtml,
  resetContactRateLimiterForTests,
  validateContactSubmission,
} from "../lib/contact";

const VALID_SUBMISSION = {
  name: "  Ana\u0000   Pérez ",
  business: "  Estudio Norte  ",
  email: "  ANA@EXAMPLE.COM ",
  phone: " +54 9 11 5555-1234 ",
  conversationVolume: " 300 por mes ",
  message: "  Necesitamos ordenar las consultas.\r\nQueremos coordinar una demo. ",
  locale: "es",
  submissionId: "123e4567-e89b-12d3-a456-426614174000",
  website: "",
};

test("valida y sanitiza una consulta completa", () => {
  const result = validateContactSubmission(VALID_SUBMISSION);

  assert.equal(result.ok, true);
  if (!result.ok) return;

  assert.deepEqual(result.data, {
    name: "Ana Pérez",
    business: "Estudio Norte",
    email: "ana@example.com",
    phone: "+54 9 11 5555-1234",
    conversationVolume: "300 por mes",
    message:
      "Necesitamos ordenar las consultas.\nQueremos coordinar una demo.",
    locale: "es",
    interest: "vantixapp",
    submissionId: "123e4567-e89b-12d3-a456-426614174000",
  });
});

test("clasifica correctamente una consulta por servicios web", () => {
  const result = validateContactSubmission({
    ...VALID_SUBMISSION,
    conversationVolume: "E-commerce",
    interest: "web-services",
  });

  assert.equal(result.ok, true);
  if (!result.ok) return;

  assert.equal(result.data.interest, "web-services");
  assert.equal(result.data.conversationVolume, "E-commerce");
});

test("rechaza campos inválidos y detecta el honeypot", () => {
  const invalid = validateContactSubmission({
    ...VALID_SUBMISSION,
    email: "correo-invalido",
    phone: "sin teléfono",
    message: "corto",
  });

  assert.equal(invalid.ok, false);
  if (invalid.ok) return;
  assert.equal(invalid.reason, "validation");
  assert.deepEqual(invalid.errors, {
    phone: "invalid",
    message: "too_short",
    email: "invalid",
  });

  const bot = validateContactSubmission({
    ...VALID_SUBMISSION,
    website: "https://spam.example",
  });
  assert.deepEqual(bot, { ok: false, reason: "honeypot", errors: {} });
});

test("escapa contenido antes de insertarlo en el email HTML", () => {
  assert.equal(
    escapeContactHtml(`<script>alert("x")</script> & 'test'`),
    "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;test&#39;",
  );
});

test("limita intentos y vuelve a habilitarlos al terminar la ventana", () => {
  resetContactRateLimiterForTests();
  const options = { now: 1_000, maxRequests: 2, windowMs: 60_000 };

  assert.equal(consumeContactRateLimit("ip:1", options).allowed, true);
  assert.equal(consumeContactRateLimit("ip:1", options).allowed, true);

  const blocked = consumeContactRateLimit("ip:1", options);
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.retryAfterSeconds, 60);

  const reset = consumeContactRateLimit("ip:1", {
    ...options,
    now: 61_000,
  });
  assert.equal(reset.allowed, true);
  assert.equal(reset.remaining, 1);
});

test("el endpoint oculta configuración y usa el contrato REST de Resend", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalEnv = {
    apiKey: process.env.RESEND_API_KEY,
    to: process.env.CONTACT_TO_EMAIL,
    from: process.env.CONTACT_FROM_EMAIL,
  };

  try {
    await t.test("responde de forma segura cuando falta configuración", async () => {
      delete process.env.RESEND_API_KEY;
      delete process.env.CONTACT_TO_EMAIL;
      delete process.env.CONTACT_FROM_EMAIL;

      const response = await POST(
        new Request("http://localhost/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(VALID_SUBMISSION),
        }),
      );

      assert.equal(response.status, 503);
      assert.deepEqual(await response.json(), {
        ok: false,
        code: "service_unavailable",
      });
    });

    await t.test("envía un email idempotente sin exponer secretos", async () => {
      process.env.RESEND_API_KEY = "re_test_secret";
      process.env.CONTACT_TO_EMAIL = "equipo@vantix.test";
      process.env.CONTACT_FROM_EMAIL = "Vantix <web@vantix.test>";
      resetContactRateLimiterForTests();

      let resendRequest: { url: string; init?: RequestInit } | null = null;
      globalThis.fetch = (async (input, init) => {
        resendRequest = { url: String(input), init };
        return Response.json({ id: "email_123" }, { status: 200 });
      }) as typeof fetch;

      const response = await POST(
        new Request("http://localhost/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-forwarded-for": "203.0.113.10",
          },
          body: JSON.stringify(VALID_SUBMISSION),
        }),
      );

      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { ok: true });
      assert.ok(resendRequest);

      const request = resendRequest as { url: string; init?: RequestInit };
      const headers = new Headers(request.init?.headers);
      const body = JSON.parse(String(request.init?.body)) as {
        from: string;
        to: string[];
        reply_to: string;
        html: string;
      };

      assert.equal(request.url, "https://api.resend.com/emails");
      assert.equal(headers.get("authorization"), "Bearer re_test_secret");
      assert.equal(
        headers.get("idempotency-key"),
        "contact/123e4567-e89b-12d3-a456-426614174000",
      );
      assert.match(headers.get("user-agent") ?? "", /^VantixWebsite\/1\.0/);
      assert.equal(body.from, "Vantix <web@vantix.test>");
      assert.deepEqual(body.to, ["equipo@vantix.test"]);
      assert.equal(body.reply_to, "ana@example.com");
      assert.doesNotMatch(body.html, /<script>/);
    });
  } finally {
    globalThis.fetch = originalFetch;

    if (originalEnv.apiKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = originalEnv.apiKey;

    if (originalEnv.to === undefined) delete process.env.CONTACT_TO_EMAIL;
    else process.env.CONTACT_TO_EMAIL = originalEnv.to;

    if (originalEnv.from === undefined) delete process.env.CONTACT_FROM_EMAIL;
    else process.env.CONTACT_FROM_EMAIL = originalEnv.from;
  }
});
