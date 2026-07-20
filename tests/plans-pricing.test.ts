import assert from "node:assert/strict";
import test from "node:test";
import {
  convertUsdToArs,
  isValidPlansExchangeRate,
  roundArsCommercial,
} from "../lib/plans-pricing";
import { PLANS } from "../lib/plans";

test("valida, convierte y redondea la cotización como VantixApp", () => {
  assert.equal(isValidPlansExchangeRate(1_250), true);
  assert.equal(isValidPlansExchangeRate(99), false);
  assert.equal(roundArsCommercial(112_001), 113_000);
  assert.equal(convertUsdToArs(90, 1_250), 113_000);
  assert.equal(convertUsdToArs(90, Number.NaN), 0);
});

test("mantiene los tres precios públicos solicitados", () => {
  assert.deepEqual(
    PLANS.map(({ id, usdMonthly, recommended }) => ({
      id,
      usdMonthly,
      recommended,
    })),
    [
      { id: "STANDARD", usdMonthly: 90, recommended: false },
      { id: "PROFESSIONAL", usdMonthly: 179, recommended: true },
      { id: "ENTERPRISE", usdMonthly: 400, recommended: false },
    ]
  );
});
