import { useState } from 'react';
import KpiSection from './KpiSection.jsx';
import DataQualityBadge from './DataQualityBadge.jsx';
import PeerComparisonTable from './PeerComparisonTable.jsx';
import { LAYER_ORDER, LAYER_LABELS } from '../utils/labels.js';
import { REQUIRED_KPIS } from '../data/validateSnapshot.js';
import { DATA_STATUS } from '../utils/dataQuality.js';

// A sector metric is "missing" when it carries no usable values; otherwise its
// values are shown as a small comparison table. Text disclosures are valid
// sector data too (e.g. hardware type or product families).
// Accepts two schemas:
//   - legacy: { name, unit, values[], confidence, description_hebrew }
//   - extended: { key, label_hebrew, frequency, data_quality:{status,note_hebrew}, values[] }
function SectorMetric({ metric }) {
  const values = Array.isArray(metric.values) ? metric.values : [];
  const hasValues = values.some(
    (v) =>
      v &&
      typeof v === 'object' &&
      Object.values(v).some((x) => x !== null && x !== undefined && x !== ''),
  );

  // Title prefers explicit Hebrew label, then legacy name, then snake_case key.
  const titleBase = metric.label_hebrew || metric.name || metric.key || '';
  const unit = metric.unit ? ` (${metric.unit})` : '';
  const title = `${titleBase}${unit}`;

  // Status priority: explicit data_quality.status, then legacy inference.
  let status;
  let note;
  if (metric.data_quality && typeof metric.data_quality === 'object' && metric.data_quality.status) {
    status = metric.data_quality.status;
    note = metric.data_quality.note_hebrew || metric.description_hebrew;
  } else {
    status = hasValues
      ? metric.confidence === 'low'
        ? DATA_STATUS.PARTIAL
        : DATA_STATUS.COMPLETE
      : DATA_STATUS.MISSING;
    note = metric.description_hebrew;
  }

  return (
    <div className="interp">
      <div className="interp-label">
        {title} <DataQualityBadge status={status} note={note} />
      </div>
      {note && <div className="dq-note">{note}</div>}
      {hasValues && <PeerComparisonTable rows={values} title={title} />}
      {!hasValues && !note && (
        <div className="dq-note">
          מדד סקטוריאלי חסר: הנתון לא נשלף במקור הנתונים הקיים. נדרש להשלים ידנית מדוחות החברה.
        </div>
      )}
      {metric.description_hebrew && metric.data_quality && <p>{metric.description_hebrew}</p>}
    </div>
  );
}

function SectorSpecific({ sectorMetrics }) {
  const metrics = sectorMetrics?.metrics;
  if (!Array.isArray(metrics) || metrics.length === 0) return null;
  return (
    <div className="kpi">
      <div className="kpi-title">מדדים ייחודיים לסקטור</div>
      {sectorMetrics.description_hebrew && (
        <div className="interp">
          <p className="muted">{sectorMetrics.description_hebrew}</p>
        </div>
      )}
      {metrics.map((m, i) => (
        <SectorMetric metric={m} key={m.key ?? m.name ?? i} />
      ))}
    </div>
  );
}

export default function LayerTabs({ layers, chartData }) {
  const [active, setActive] = useState(LAYER_ORDER[0]);
  const layerData = layers?.[active] ?? {};
  // Always render every prompt in canonical order so a KPI is never hidden —
  // KpiSection shows an explicit "missing" state when its data object is absent.
  const kpiKeys = REQUIRED_KPIS[active] ?? Object.keys(layerData);

  return (
    <div className="card">
      <div className="tabs">
        {LAYER_ORDER.map((layer) => (
          <button
            key={layer}
            className={`tab-btn ${active === layer ? 'active' : ''}`}
            onClick={() => setActive(layer)}
          >
            {LAYER_LABELS[layer]}
          </button>
        ))}
      </div>

      <div>
        {kpiKeys.length === 0 && <p className="muted">אין נתונים בשכבה זו.</p>}
        {kpiKeys.map((kpiKey) => (
          <KpiSection key={kpiKey} kpiKey={kpiKey} kpi={layerData[kpiKey]} chartData={chartData} />
        ))}
        {active === 'forward_signals' && (
          <SectorSpecific sectorMetrics={layers?.sector_specific_metrics} />
        )}
      </div>
    </div>
  );
}
