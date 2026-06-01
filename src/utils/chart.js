// Pure chart-data helpers, shared between the FinancialChart component and the
// sanity script so the "show fallback when data is missing" rule is defined in
// exactly one place.

export const CHART_EMPTY_MSG = 'אין מספיק נתונים להצגת הגרף';

// Flattens series:[{name, data:[{x,y}]}] into a row-per-x dataset for Recharts.
export function buildDataset(series) {
  const rowsByX = new Map();
  const order = [];
  for (const s of series) {
    for (const point of s.data ?? []) {
      const x = String(point.x);
      if (!rowsByX.has(x)) {
        rowsByX.set(x, { x });
        order.push(x);
      }
      const y = point.y;
      if (typeof y === 'number' && !Number.isNaN(y)) rowsByX.get(x)[s.name] = y;
    }
  }
  return order.map((x) => rowsByX.get(x));
}

// True when at least one series has a real numeric data point. When false, the
// UI renders CHART_EMPTY_MSG instead of an empty chart.
export function hasNumericData(series) {
  return (series ?? []).some((s) =>
    (s.data ?? []).some((p) => typeof p.y === 'number' && !Number.isNaN(p.y)),
  );
}

export function normalizeSeries(chart) {
  return Array.isArray(chart?.series) ? chart.series.filter((s) => s && s.name) : [];
}
