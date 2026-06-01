#!/usr/bin/env node
// Validation script. Checks every stored snapshot against the required schema
// and prints a clear report. Exits non-zero if any snapshot fails so the build
// pipeline / user is alerted. Rules live in src/data/validateSnapshot.js and are
// shared with the dashboard UI.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const COMPANIES_DIR = path.join(ROOT, 'src', 'data', 'companies');

const { validateSnapshot } = await import(
  pathToFileURL(path.join(ROOT, 'src', 'data', 'validateSnapshot.js')).href
);

function main() {
  if (!fs.existsSync(COMPANIES_DIR)) {
    console.error('No companies directory found.');
    process.exit(1);
  }
  const tickers = fs
    .readdirSync(COMPANIES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  let totalSnapshots = 0;
  let failed = 0;

  for (const ticker of tickers) {
    const snapshotsDir = path.join(COMPANIES_DIR, ticker, 'snapshots');
    if (!fs.existsSync(snapshotsDir)) continue;
    const files = fs.readdirSync(snapshotsDir).filter((f) => f.endsWith('.json'));
    for (const file of files) {
      totalSnapshots += 1;
      const data = JSON.parse(fs.readFileSync(path.join(snapshotsDir, file), 'utf8'));
      const { valid, errors, warnings } = validateSnapshot(data);
      const label = `${ticker} / ${file}`;
      if (valid) {
        console.log(`PASS  ${label}${warnings.length ? `  (${warnings.join('; ')})` : ''}`);
      } else {
        failed += 1;
        console.log(`FAIL  ${label}`);
        for (const e of errors) console.log(`        - ${e}`);
      }
    }
  }

  console.log(`\n${totalSnapshots} snapshots checked, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

main();
