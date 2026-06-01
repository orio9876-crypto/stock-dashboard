import { formatPercent, formatUsd, formatNumber } from '../utils/format.js';

// Renders a single metric value. `kind` controls formatting: 'percent', 'usd',
// 'number' (default). Highlights positive/negative numeric values.
export default function MetricCard({ label, value, kind = 'number', digits, missingNote }) {
  const isNum = typeof value === 'number' && !Number.isNaN(value);
  // A genuine 0 is shown as 0; only null/undefined/NaN are treated as missing.
  const isMissing = value == null || (typeof value === 'number' && Number.isNaN(value));

  let display;
  if (isMissing) {
    display = (
      <span className="mc-missing" title={missingNote || 'הנתון לא נשלף במקור הנתונים הקיים'}>
        חסר נתון
      </span>
    );
  } else if (kind === 'percent') display = formatPercent(value, digits ?? 1);
  else if (kind === 'usd') display = formatUsd(value);
  else if (kind === 'number') display = isNum ? formatNumber(value, digits ?? 2) : String(value);
  else display = String(value);

  const sign = isNum ? (value > 0 ? 'pos' : value < 0 ? 'neg' : '') : '';
  return (
    <div className={`metric-card ${sign} ${isMissing ? 'missing' : ''}`}>
      <div className="mc-label">{label}</div>
      <div className="mc-value">{display}</div>
    </div>
  );
}
