import assert from "node:assert/strict";
import test from "node:test";
import {
  getPlansExchangeRate,
  parseDolarHoyBlueSellRate,
  resetPlansExchangeRateCacheForTests,
} from "../lib/exchange-rate";

test("extrae únicamente la cotización de venta del dólar blue", () => {
  const html = `
    <main>
      <h1>Dólar blue</h1>
      <div>$ 1.260 Compra</div>
      <div>$ 1.280 Venta</div>
    </main>
  `;

  assert.equal(parseDolarHoyBlueSellRate(html), 1_280);
  assert.equal(parseDolarHoyBlueSellRate("<p>Dólar oficial $ 1.280 Venta</p>"), null);
});

test("prioriza el proveedor y conserva el último valor válido", async () => {
  resetPlansExchangeRateCacheForTests();
  const now = Date.parse("2026-07-19T12:00:00.000Z");
  const fetchOk = (async () =>
    new Response("<h1>Dólar blue</h1><div>$ 1.300 Venta</div>", {
      status: 200,
      headers: { "content-type": "text/html" },
    })) as typeof fetch;

  const provider = await getPlansExchangeRate({ fetchImpl: fetchOk, now });
  assert.deepEqual(provider, {
    rate: 1_300,
    updatedAt: "2026-07-19T12:00:00.000Z",
    source: "DolarHoy",
  });

  const cached = await getPlansExchangeRate({
    fetchImpl: (async () => {
      throw new Error("no debería ejecutarse mientras la caché está vigente");
    }) as typeof fetch,
    now: now + 60_000,
  });
  assert.deepEqual(cached, provider);
});

test("usa configuración segura y devuelve USD si no existe una cotización", async () => {
  const unavailableFetch = (async () => {
    throw new Error("sin proveedor");
  }) as typeof fetch;
  const now = Date.parse("2026-07-19T15:30:00.000Z");

  resetPlansExchangeRateCacheForTests();
  const configured = await getPlansExchangeRate({
    fetchImpl: unavailableFetch,
    env: { PLANS_USD_ARS_RATE: "1275" },
    now,
  });
  assert.deepEqual(configured, {
    rate: 1_275,
    updatedAt: "2026-07-19T15:30:00.000Z",
    source: "Configuración",
  });

  resetPlansExchangeRateCacheForTests();
  const unavailable = await getPlansExchangeRate({
    fetchImpl: unavailableFetch,
    env: {},
    now,
  });
  assert.deepEqual(unavailable, { rate: null, updatedAt: null, source: null });
});
