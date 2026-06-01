import TrafficLightBadge from './TrafficLightBadge.jsx';
import { TRAFFIC_LIGHT_KEYS, TRAFFIC_LIGHT_LABELS } from '../utils/labels.js';

function MetaItem({ label, value }) {
  if (!value) return null;
  return (
    <span>
      <span className="k">{label}: </span>
      <span className="v">{value}</span>
    </span>
  );
}

export default function CompanyHeader({ data }) {
  const meta = data?.meta ?? {};
  const summary = data?.dashboard_summary ?? {};
  const lights = summary.traffic_lights ?? {};
  const overall = summary.scorecard?.overall_quality_score_1_to_10;
  const oneLiner = data?.executive_summary_hebrew?.one_liner;

  return (
    <div className="company-header card">
      <div className="ch-top">
        <div className="ch-id">
          <h1>
            <span className="ticker-chip">{meta.ticker}</span>
            {meta.company_name}
          </h1>
          <div className="ch-meta-row">
            <MetaItem label="בורסה" value={meta.exchange} />
            <MetaItem label="סקטור" value={meta.sector} />
            <MetaItem label="תעשייה" value={meta.industry} />
            <MetaItem label="רבעון מדווח" value={meta.latest_reported_quarter} />
            <MetaItem label="נכון לתאריך" value={meta.as_of_date} />
          </div>
        </div>
        {overall != null && (
          <div className="score-pill">
            <span className="num" style={{ color: 'var(--accent)' }}>
              {overall}
            </span>
            <span className="den">/10 ציון כולל</span>
          </div>
        )}
      </div>

      {oneLiner && <div className="ch-oneliner">{oneLiner}</div>}

      <div className="ch-lights">
        {TRAFFIC_LIGHT_KEYS.map((key) => (
          <div className="ch-light-cell" key={key}>
            <span className="k">{TRAFFIC_LIGHT_LABELS[key]}</span>
            <TrafficLightBadge status={lights[key]} />
          </div>
        ))}
      </div>
    </div>
  );
}
