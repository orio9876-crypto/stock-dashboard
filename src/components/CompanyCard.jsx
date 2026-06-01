import { useNavigate } from 'react-router-dom';
import TrafficLightBadge from './TrafficLightBadge.jsx';
import { TRAFFIC_LIGHT_KEYS, TRAFFIC_LIGHT_LABELS } from '../utils/labels.js';

export default function CompanyCard({ company }) {
  const navigate = useNavigate();
  const { ticker, company_name, sector, one_liner, overall_score, traffic_lights, as_of_date } =
    company;

  return (
    <div
      className="card company-card"
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/company/${ticker}`)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/company/${ticker}`)}
    >
      <div className="cc-head">
        <div>
          <span className="ticker-chip">{ticker}</span>
          <div className="cc-name" style={{ marginTop: 6 }}>
            {company_name}
          </div>
          <div className="faint">{sector}</div>
        </div>
        <div className="score-pill">
          <span className="num" style={{ color: 'var(--accent)' }}>
            {overall_score ?? '—'}
          </span>
          <span className="den">/10</span>
        </div>
      </div>

      {one_liner && <div className="cc-one-liner">{one_liner}</div>}

      <div className="cc-lights">
        {TRAFFIC_LIGHT_KEYS.map((key) => (
          <TrafficLightBadge
            key={key}
            status={traffic_lights?.[key]}
            label={TRAFFIC_LIGHT_LABELS[key]}
          />
        ))}
      </div>

      <div className="cc-foot">
        <span className="faint">עודכן: {as_of_date ?? '—'}</span>
        <span style={{ color: 'var(--accent)', fontWeight: 600 }}>צפייה בניתוח ←</span>
      </div>
    </div>
  );
}
