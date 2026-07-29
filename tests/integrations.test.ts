import assert from "node:assert/strict";
import test from "node:test";
import { INTEGRATIONS } from "../content/integrations";

test("las explicaciones breves de integraciones usan cinco palabras o menos", () => {
  for (const integration of INTEGRATIONS) {
    for (const locale of ["es", "en"] as const) {
      const words = integration.shortDescription[locale]
        .trim()
        .split(/\s+/);

      assert.ok(
        words.length <= 5,
        `${integration.id} supera cinco palabras en ${locale}`,
      );
    }
  }
});
