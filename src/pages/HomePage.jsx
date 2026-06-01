import { useMemo, useState } from 'react';
import CompanyCard from '../components/CompanyCard.jsx';
import { getCompanySummaries } from '../data/index.js';
import { TRAFFIC_LIGHT_KEYS, TRAFFIC_LIGHT_LABELS, STATUS_LABELS } from '../utils/labels.js';

export default function HomePage() {
  const companies = useMemo(() => getCompanySummaries(), []);
  const [query, setQuery] = useState('');
  const [sector, setSector] = useState('');
  const [lightKey, setLightKey] = useState('');
  const [lightStatus, setLightStatus] = useState('');

  const sectors = useMemo(
    () => [...new Set(companies.map((c) => c.sector).filter(Boolean))].sort(),
    [companies],
  );

  const filtered = companies.filter((c) => {
    const q = query.trim().toLowerCase();
    if (q && !`${c.ticker} ${c.company_name}`.toLowerCase().includes(q)) return false;
    if (sector && c.sector !== sector) return false;
    if (lightKey && lightStatus && c.traffic_lights?.[lightKey] !== lightStatus) return false;
    return true;
  });

  return (
    <div>
      <div className="page-head">
        <div>
          <h1>כל החברות</h1>
          <div className="muted">{companies.length} חברות במעקב</div>
        </div>
      </div>

      <div className="filters">
        <input
          type="search"
          placeholder="חיפוש לפי טיקר או שם חברה…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={sector} onChange={(e) => setSector(e.target.value)}>
          <option value="">כל הסקטורים</option>
          {sectors.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select value={lightKey} onChange={(e) => setLightKey(e.target.value)}>
          <option value="">כל המדדים (רמזור)</option>
          {TRAFFIC_LIGHT_KEYS.map((k) => (
            <option key={k} value={k}>
              {TRAFFIC_LIGHT_LABELS[k]}
            </option>
          ))}
        </select>
        <select
          value={lightStatus}
          onChange={(e) => setLightStatus(e.target.value)}
          disabled={!lightKey}
        >
          <option value="">כל הסטטוסים</option>
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          {companies.length === 0
            ? 'עדיין לא נוספו חברות. הרץ npm run import כדי לייבא ניתוח.'
            : 'לא נמצאו חברות התואמות את הסינון.'}
        </div>
      ) : (
        <div className="card-grid">
          {filtered.map((c) => (
            <CompanyCard key={c.ticker} company={c} />
          ))}
        </div>
      )}
    </div>
  );
}
