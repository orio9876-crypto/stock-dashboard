// Number/label formatting helpers. Numbers and "$" stay in source/English form.

export function formatUsd(value) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  const abs = Math.abs(value);
  if (abs >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `$${(value / 1e3).toFixed(2)}K`;
  return `$${value.toLocaleString('en-US')}`;
}

export function formatPercent(value, digits = 1) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  return `${value.toFixed(digits)}%`;
}

export function formatNumber(value, digits = 2) {
  if (value === null || value === undefined || Number.isNaN(value)) return '—';
  return value.toLocaleString('en-US', { maximumFractionDigits: digits });
}

// Best-effort display of an arbitrary scalar value coming from the JSON.
export function formatScalar(value) {
  if (value === null || value === undefined || value === '') return '—';
  if (typeof value === 'number') return formatNumber(value);
  if (typeof value === 'boolean') return value ? 'כן' : 'לא';
  return String(value);
}

// True for keys whose numeric values represent percentages.
export function isPercentKey(key = '') {
  return /margin|growth|yield|roe|roic|wacc|rate|percent|ratio_pct|surprise/i.test(key);
}
