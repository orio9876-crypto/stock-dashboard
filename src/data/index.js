// Data layer. Discovers every company by globbing the data folder, so adding a
// new company is just dropping files under companies/<TICKER>/ (done by the
// importCompany script). No component references a specific ticker.

const snapshotMods = import.meta.glob('./companies/*/snapshots/*.json', { eager: true });
const currentMods = import.meta.glob('./companies/*/current.json', { eager: true });
const companyMods = import.meta.glob('./companies/*/company.json', { eager: true });

const tickerOf = (key) => key.match(/companies\/([^/]+)\//)?.[1];
const dateOf = (key) => key.match(/snapshots\/([^/]+)\.json$/)?.[1];

const store = {};
const ensure = (t) => (store[t] ??= { snapshots: {} });

for (const [key, mod] of Object.entries(companyMods)) {
  ensure(tickerOf(key)).company = mod.default;
}
for (const [key, mod] of Object.entries(currentMods)) {
  ensure(tickerOf(key)).current = mod.default;
}
for (const [key, mod] of Object.entries(snapshotMods)) {
  ensure(tickerOf(key)).snapshots[dateOf(key)] = mod.default;
}

function snapshotDates(ticker) {
  return Object.keys(store[ticker]?.snapshots ?? {}).sort();
}

export function getLatestDate(ticker) {
  const entry = store[ticker];
  if (!entry) return null;
  const ptr = entry.current?.latest_snapshot;
  if (ptr && entry.snapshots[ptr]) return ptr;
  const dates = snapshotDates(ticker);
  return dates[dates.length - 1] ?? null;
}

export function getSnapshot(ticker, date) {
  return store[ticker]?.snapshots[date] ?? null;
}

export function getLatestSnapshot(ticker) {
  const date = getLatestDate(ticker);
  return date ? store[ticker].snapshots[date] : null;
}

export function getCompanyTickers() {
  return Object.keys(store).sort();
}

export function getSnapshotHistory(ticker) {
  return snapshotDates(ticker)
    .slice()
    .reverse()
    .map((date) => ({ date, data: store[ticker].snapshots[date] }));
}

// Compact summary for the Home page, derived from each company's latest snapshot.
export function getCompanySummaries() {
  return getCompanyTickers().map((ticker) => {
    const data = getLatestSnapshot(ticker);
    const meta = data?.meta ?? store[ticker].company ?? {};
    const summary = data?.dashboard_summary ?? {};
    return {
      ticker,
      company_name: meta.company_name ?? store[ticker].company?.company_name ?? ticker,
      sector: meta.sector ?? store[ticker].company?.sector ?? '',
      industry: meta.industry ?? store[ticker].company?.industry ?? '',
      as_of_date: getLatestDate(ticker),
      one_liner: data?.executive_summary_hebrew?.one_liner ?? '',
      overall_score: summary.scorecard?.overall_quality_score_1_to_10 ?? null,
      traffic_lights: summary.traffic_lights ?? {},
    };
  });
}
