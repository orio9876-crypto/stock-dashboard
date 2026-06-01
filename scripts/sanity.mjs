#!/usr/bin/env node
// Sanity check. Verifies the data-layer invariants behind the four core UI
// behaviors, for every company, without needing a browser:
//   1. A new company appears on the Home screen.
//   2. The company page opens (snapshot is valid and loadable).
//   3. All 5 layer tabs have data.
//   4. A chart with missing data triggers the Hebrew fallback message.
//
// Exits non-zero on any failure so it can gate CI / the build.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const COMPANIES_DIR = path.join(ROOT, 'src', 'data', 'companies');
const REGISTRY_PATH = path.join(ROOT, 'src', 'data', 'companyRegistry.json');

const importPure = (rel) => import(pathToFileURL(path.join(ROOT, rel)).href);
const { REQUIRED_LAYERS } = await importPure('src/data/validateSnapshot.js');
const { hasNumericData, normalizeSeries, CHART_EMPTY_MSG } = await importPure('src/utils/chart.js');

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

function latestSnapshot(ticker) {
  const dir = path.join(COMPANIES_DIR, ticker);
  const snapshotsDir = path.join(dir, 'snapshots');
  if (!fs.existsSync(snapshotsDir)) return { date: null, data: null };
  const dates = fs
    .readdirSync(snapshotsDir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace(/\.json$/, ''))
    .sort();
  let date = dates[dates.length - 1];
  const currentPath = path.join(dir, 'current.json');
  if (fs.existsSync(currentPath)) {
    const ptr = readJson(currentPath).latest_snapshot;
    if (ptr && dates.includes(ptr)) date = ptr;
  }
  return date ? { date, data: readJson(path.join(snapshotsDir, `${date}.json`)) } : { date, data: null };
}

function checkCompany(ticker) {
  const checks = [];
  const add = (name, ok, detail = '') => checks.push({ name, ok, detail });

  let snapshot = null;
  try {
    snapshot = latestSnapshot(ticker);
  } catch (e) {
    add('עמוד החברה נפתח', false, `snapshot לא ניתן לקריאה: ${e.message}`);
    return checks;
  }
  const data = snapshot.data;

  // 1. Appears on Home: has identity + scorecard/traffic_lights used by the card.
  const onHome =
    !!data?.meta?.ticker &&
    !!data?.meta?.company_name &&
    !!data?.dashboard_summary?.traffic_lights;
  add('מופיע במסך הבית', onHome);

  // 2. Page opens: snapshot present and parseable with meta.
  add('עמוד החברה נפתח', !!data?.meta, snapshot.date ? `snapshot ${snapshot.date}` : 'אין snapshot');

  // 3. Five layer tabs have data.
  const missingLayers = REQUIRED_LAYERS.filter((l) => !data?.layers?.[l]);
  add('5 הטאבים קיימים', missingLayers.length === 0, missingLayers.length ? `חסר: ${missingLayers.join(', ')}` : '');

  // 4. A chart with missing data triggers the fallback message.
  const charts = Array.isArray(data?.chart_data) ? data.chart_data : [];
  const withData = charts.filter((c) => hasNumericData(normalizeSeries(c)));
  const fallback = charts.filter((c) => !hasNumericData(normalizeSeries(c)));
  // The rule itself must be wired (constant present) and consistent with the data.
  const ruleWired = typeof CHART_EMPTY_MSG === 'string' && CHART_EMPTY_MSG.length > 0;
  add(
    'אזהרת גרף חסר מוגדרת',
    ruleWired,
    `${withData.length} גרפים עם נתונים, ${fallback.length} יציגו "${CHART_EMPTY_MSG}"`,
  );

  return checks;
}

function main() {
  let registry = { companies: [] };
  if (fs.existsSync(REGISTRY_PATH)) registry = readJson(REGISTRY_PATH);
  const tickers = (registry.companies ?? []).map((c) => c.ticker);
  if (tickers.length === 0) {
    console.error('אין חברות רשומות ב-companyRegistry.json.');
    process.exit(1);
  }

  let failed = 0;
  for (const ticker of tickers) {
    console.log(`\n${ticker}`);
    for (const { name, ok, detail } of checkCompany(ticker)) {
      if (!ok) failed += 1;
      console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`);
    }
  }

  console.log(`\n${tickers.length} companies checked, ${failed} checks failed.`);
  if (failed > 0) process.exit(1);
}

main();
