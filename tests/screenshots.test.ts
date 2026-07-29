import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import {
  LANDING_SCREENSHOT_PLACEMENTS,
  SCREENSHOTS_BY_ID,
} from "../content/screenshots";
import type { Theme } from "../content/types";

const THEMES = ["light", "dark"] as const satisfies readonly Theme[];

function publicAssetPath(src: string) {
  assert.match(
    src,
    /^\/screenshots\//,
    `La captura debe vivir dentro de /public/screenshots: ${src}`,
  );

  return join(process.cwd(), "public", src.replace(/^\/+/, ""));
}

function sha256(src: string) {
  return createHash("sha256")
    .update(readFileSync(publicAssetPath(src)))
    .digest("hex");
}

test("la landing asigna una captura conceptual distinta a cada ubicación", () => {
  assert.deepEqual(LANDING_SCREENSHOT_PLACEMENTS, {
    hero: "conversations-overview",
    metricsSummary: "metrics-summary",
    metricsDay: "metrics-conversations-day",
    metricsHourly: "metrics-hourly",
    metricsAiHuman: "metrics-ai-human",
  });

  const screenshotIds = Object.values(LANDING_SCREENSHOT_PLACEMENTS);

  assert.equal(
    new Set(screenshotIds).size,
    screenshotIds.length,
    "Una misma captura conceptual está asignada a más de una ubicación",
  );
  assert.equal(
    screenshotIds.some((id) => String(id) === "conversations-ai"),
    false,
    "conversations-ai no debe usarse: su variante oscura duplica overview",
  );
});

test("las capturas usadas tienen rutas y contenidos únicos en cada tema", () => {
  const screenshotIds = Object.values(LANDING_SCREENSHOT_PLACEMENTS);
  const allSources: string[] = [];

  for (const theme of THEMES) {
    const sources = screenshotIds.map(
      (id) => SCREENSHOTS_BY_ID[id].assets[theme].src,
    );
    const hashes = sources.map(sha256);

    assert.equal(
      new Set(sources).size,
      sources.length,
      `Hay rutas de captura repetidas en el tema ${theme}`,
    );
    assert.equal(
      new Set(hashes).size,
      hashes.length,
      `Hay archivos de captura con contenido repetido en el tema ${theme}`,
    );

    allSources.push(...sources);
  }

  assert.equal(
    new Set(allSources).size,
    allSources.length,
    "Una ruta de captura se comparte entre variantes de tema",
  );
});
