import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { isPercentKey, formatPercent, formatNumber } from '../utils/format.js';
import { CHART_EMPTY_MSG, buildDataset, hasNumericData, normalizeSeries } from '../utils/chart.js';

const PALETTE = ['#1f4e79', '#1b8a5a', '#b7791f', '#c0392b', '#6b4fa3', '#0e7490'];

const fmtY = (name, y) =>
  typeof y === 'number' ? (isPercentKey(name) ? formatPercent(y) : formatNumber(y)) : '—';

// Optional caption under the title: data frequency + any clarifying note. Lets
// the JSON state e.g. that a series is annual (FY) rather than quarterly, so
// different frequencies are never silently presented as the same cadence.
function ChartCaption({ chart }) {
  const parts = [chart?.frequency_hebrew, chart?.note_hebrew].filter(Boolean);
  if (parts.length === 0) return null;
  return <div className="chart-note">{parts.join(' · ')}</div>;
}

export default function FinancialChart({ chart }) {
  const series = normalizeSeries(chart);

  if (!chart || series.length === 0 || !hasNumericData(series)) {
    return (
      <div className="chart-card">
        {chart?.title_hebrew && <div className="chart-title">{chart.title_hebrew}</div>}
        <ChartCaption chart={chart} />
        <div className="chart-empty">{CHART_EMPTY_MSG}</div>
      </div>
    );
  }

  const dataset = buildDataset(series);

  // A single x-point is not a trend: show the value(s) as a note instead of
  // drawing a one-point line that would look like a slope.
  if (dataset.length === 1) {
    const row = dataset[0];
    return (
      <div className="chart-card">
        {chart.title_hebrew && <div className="chart-title">{chart.title_hebrew}</div>}
        <ChartCaption chart={chart} />
        <div className="chart-single">
          <div className="cs-x">{row.x}</div>
          {series.map((s) => (
            <div className="cs-item" key={s.name}>
              <span className="cs-name">{s.name}</span>
              <span className="cs-val">{fmtY(s.name, row[s.name])}</span>
            </div>
          ))}
          <div className="cs-hint">נקודת נתון בודדת — אין מספיק נקודות להצגת מגמה.</div>
        </div>
      </div>
    );
  }

  const type = chart.chart_type ?? 'line';

  const pctFlags = series.map((s) => isPercentKey(s.name));
  const mixedAxes = pctFlags.some(Boolean) && pctFlags.some((f) => !f);

  const renderSeries = (s, i) => {
    const color = PALETTE[i % PALETTE.length];
    const axisId = mixedAxes ? (pctFlags[i] ? 'pct' : 'val') : 'val';
    const asBar =
      type === 'bar' || type === 'grouped_bar' || (type === 'bar_line' && i === 0);
    if (asBar) {
      return <Bar key={s.name} yAxisId={axisId} dataKey={s.name} fill={color} radius={[3, 3, 0, 0]} />;
    }
    return (
      <Line
        key={s.name}
        yAxisId={axisId}
        type="monotone"
        dataKey={s.name}
        stroke={color}
        strokeWidth={2}
        dot={{ r: 3 }}
      />
    );
  };

  return (
    <div className="chart-card">
      {chart.title_hebrew && <div className="chart-title">{chart.title_hebrew}</div>}
      <ChartCaption chart={chart} />
      <div dir="ltr" style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer>
          <ComposedChart data={dataset} margin={{ top: 8, right: 12, left: 12, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eceff3" />
            <XAxis dataKey="x" tick={{ fontSize: 12 }} />
            <YAxis yAxisId="val" tick={{ fontSize: 12 }} width={60} />
            {mixedAxes && (
              <YAxis yAxisId="pct" orientation="right" tick={{ fontSize: 12 }} width={50} />
            )}
            <Tooltip />
            <Legend />
            {series.map(renderSeries)}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
