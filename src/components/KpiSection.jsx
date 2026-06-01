import MetricCard from './MetricCard.jsx';
import PeerComparisonTable from './PeerComparisonTable.jsx';
import FinancialChart from './FinancialChart.jsx';
import DataQualityBadge from './DataQualityBadge.jsx';
import { KPI_LABELS, fieldLabel, prettifyKey } from '../utils/labels.js';
import { isPercentKey } from '../utils/format.js';
import { resolveDataQuality, DATA_STATUS } from '../utils/dataQuality.js';

const USD_KEY = /market_cap|enterprise_value|total_debt|(^|_)cash($|_)|short_term_investments|ltm_fcf|revenue/i;

function metricKind(key) {
  if (USD_KEY.test(key)) return 'usd';
  if (isPercentKey(key)) return 'percent';
  return 'number';
}

const isRecordArray = (v) => Array.isArray(v) && v.length > 0 && typeof v[0] === 'object';
const isPlainObject = (v) =>
  v && typeof v === 'object' && !Array.isArray(v);

// Renders a single KPI section generically from its JSON object. No KPI-specific
// logic, so it works for all 26 sections of any company.
export default function KpiSection({ kpiKey, kpi, chartData = [] }) {
  const title = KPI_LABELS[kpiKey] ?? prettifyKey(kpiKey);

  // A prompt is never hidden: when its data object is entirely absent, show the
  // title with an explicit "missing" state instead of rendering nothing.
  if (!kpi || typeof kpi !== 'object') {
    return (
      <div className="kpi">
        <div className="kpi-title">
          {title}
          <DataQualityBadge status={DATA_STATUS.MISSING} note="הנתון לא נשלף במקור הנתונים הקיים." />
        </div>
        <p className="muted">
          חסר נתון: סעיף זה לא נכלל במקור הנתונים הקיים עבור חברה זו.
        </p>
      </div>
    );
  }

  const { status, note } = resolveDataQuality(kpi);

  const scalarMetrics = [];
  const recordArrays = [];
  let peerRows = null;
  const nestedObjects = [];
  const texts = [];
  let sectorMedian = null;

  for (const [key, value] of Object.entries(kpi)) {
    if (key === 'chart_recommendation' || key === 'data_quality') continue;
    if (key === 'sector_median' && typeof value === 'number') {
      sectorMedian = value;
      continue;
    }
    if (key.endsWith('_hebrew')) {
      if (typeof value === 'string' && value.trim()) texts.push([key, value]);
    } else if (typeof value === 'number') {
      scalarMetrics.push([key, value]);
    } else if (key === 'peer_comparison' && isRecordArray(value)) {
      peerRows = value;
    } else if (isRecordArray(value)) {
      recordArrays.push([key, value]);
    } else if (isPlainObject(value)) {
      const entries = Object.entries(value).filter(([, v]) => typeof v === 'number');
      if (entries.length > 0) nestedObjects.push([key, entries]);
    }
  }

  // Locate a chart referenced by this KPI.
  const chartId = kpi.chart_recommendation?.chart_id;
  const chart = chartId ? chartData.find((c) => c.chart_id === chartId) : null;

  return (
    <div className="kpi">
      <div className="kpi-title">
        {title}
        <DataQualityBadge status={status} note={note} />
      </div>

      {note && status !== DATA_STATUS.COMPLETE && (
        <div className="dq-note">{note}</div>
      )}

      {(scalarMetrics.length > 0 || sectorMedian != null) && (
        <div className="metric-row">
          {scalarMetrics.map(([key, value]) => (
            <MetricCard key={key} label={fieldLabel(key)} value={value} kind={metricKind(key)} />
          ))}
          {sectorMedian != null && (
            <MetricCard label="חציון סקטור" value={sectorMedian} kind={metricKind(kpiKey)} />
          )}
        </div>
      )}

      {recordArrays.map(([key, rows]) => (
        <PeerComparisonTable key={key} rows={rows} title={fieldLabel(key)} />
      ))}

      {chart && <FinancialChart chart={chart} />}

      {peerRows && <PeerComparisonTable rows={peerRows} />}

      {nestedObjects.map(([key, entries]) => (
        <div className="metric-row" key={key}>
          {entries.map(([k, v]) => (
            <MetricCard key={k} label={fieldLabel(k)} value={v} kind={metricKind(k)} />
          ))}
        </div>
      ))}

      {texts.map(([key, value]) => (
        <div className="interp" key={key}>
          <div className="interp-label">{prettifyKey(key)}</div>
          <p>{value}</p>
        </div>
      ))}
    </div>
  );
}
