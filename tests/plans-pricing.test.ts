import assert from "node:assert/strict";
import test from "node:test";
import {
  convertUsdToArs,
  isValidPlansExchangeRate,
  roundArsCommercial,
} from "../lib/plans-pricing";
import { PLANS } from "../content/pricing";

test("valida, convierte y redondea la cotización como VantixApp", () => {
  assert.equal(isValidPlansExchangeRate(1_250), true);
  assert.equal(isValidPlansExchangeRate(99), false);
  assert.equal(roundArsCommercial(112_001), 113_000);
  assert.equal(convertUsdToArs(89, 1_250), 112_000);
  assert.equal(convertUsdToArs(89, Number.NaN), 0);
});

test("mantiene los cuatro planes públicos centralizados", () => {
  assert.deepEqual(
    PLANS.map(({ id, monthlyUsd, featured }) => ({
      id,
      monthlyUsd,
      featured,
    })),
    [
      { id: "standard", monthlyUsd: 89, featured: false },
      { id: "professional", monthlyUsd: 179, featured: true },
      { id: "business", monthlyUsd: 349, featured: false },
      { id: "custom", monthlyUsd: null, featured: false },
    ]
  );
});
