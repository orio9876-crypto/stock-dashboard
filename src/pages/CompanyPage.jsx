import { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CompanyHeader from '../components/CompanyHeader.jsx';
import Scorecard from '../components/Scorecard.jsx';
import LayerTabs from '../components/LayerTabs.jsx';
import SourcesPanel from '../components/SourcesPanel.jsx';
import DataQualityWarnings from '../components/DataQualityWarnings.jsx';
import { getSnapshot, getLatestDate, getSnapshotHistory } from '../data/index.js';
import { validateSnapshot } from '../data/validateSnapshot.js';

function BulletList({ title, items, variant = 'neutral' }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <div>
      {title && <div className="bull-bear-title">{title}</div>}
      <ul className={`signal-list ${variant}`}>
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

function TextBlock({ label, text }) {
  if (!text) return null;
  return (
    <div className="interp">
      {label && <div className="interp-label">{label}</div>}
      <p>{text}</p>
    </div>
  );
}

export default function CompanyPage() {
  const { ticker } = useParams();
  const history = useMemo(() => getSnapshotHistory(ticker), [ticker]);
  const [date, setDate] = useState(() => getLatestDate(ticker));
  const latestDate = useMemo(() => getLatestDate(ticker), [ticker]);
  const selectedDate = history.some((snapshot) => snapshot.date === date) ? date : latestDate;

  const data = selectedDate ? getSnapshot(ticker, selectedDate) : null;
  const validation = useMemo(() => (data ? validateSnapshot(data) : null), [data]);

  if (!data) {
    return (
      <div>
        <Link to="/" className="back-link">
          → חזרה לכל החברות
        </Link>
        <div className="empty-state">לא נמצא ניתוח עבור {ticker}.</div>
      </div>
    );
  }

  const exec = data.executive_summary_hebrew ?? {};
  const profile = data.company_profile ?? {};
  const summary = data.dashboard_summary ?? {};

  return (
    <div className="stack">
      <div>
        <Link to="/" className="back-link">
          → חזרה לכל החברות
        </Link>
        {history.length > 1 && (
          <div className="snap-select">
            <span>השוואת תאריך ניתוח:</span>
            <select value={selectedDate} onChange={(e) => setDate(e.target.value)}>
              {history.map((h) => (
                <option key={h.date} value={h.date}>
                  {h.date}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <CompanyHeader data={data} />

      {validation && !validation.valid && <DataQualityWarnings validation={validation} />}

      <Scorecard scorecard={summary.scorecard} />

      {/* Executive summary */}
      <div className="card stack">
        <div className="section-title">תקציר מנהלים</div>
        <TextBlock text={exec.overall_view} />
        <div className="two-col">
          <BulletList title="Bull Case" items={exec.bull_case} variant="pos" />
          <BulletList title="Bear Case" items={exec.bear_case} variant="neg" />
        </div>
        <div className="two-col">
          <BulletList title="סיכונים עיקריים" items={exec.main_risks} variant="neg" />
          <BulletList title="הזדמנויות עיקריות" items={exec.main_opportunities} variant="pos" />
        </div>
        <BulletList
          title="מה לעקוב אחריו ברבעון הבא"
          items={exec.what_to_watch_next_quarter}
          variant="neutral"
        />
        <TextBlock label="שורה תחתונה" text={exec.bottom_line_hebrew} />
      </div>

      {/* Company profile */}
      {(profile.description_hebrew || profile.competitive_position_hebrew) && (
        <div className="card stack">
          <div className="section-title">פרופיל החברה</div>
          <TextBlock text={profile.description_hebrew} />
          <div className="two-col">
            <BulletList title="מנועי הכנסה עיקריים" items={profile.main_revenue_drivers} />
            <BulletList title="מוצרים ושירותים" items={profile.key_products_or_services} />
          </div>
          <div className="two-col">
            <BulletList title="חשיפה גאוגרפית" items={profile.geographic_exposure} />
            <BulletList title="פלחי לקוחות" items={profile.customer_segments} />
          </div>
          <TextBlock label="מיצוב תחרותי" text={profile.competitive_position_hebrew} />
        </div>
      )}

      {/* Five analysis layers */}
      <LayerTabs layers={data.layers} chartData={data.chart_data} />

      {/* Summary signals */}
      <div className="card stack">
        <div className="section-title">סיכום ואותות מרכזיים</div>
        <div className="two-col">
          <BulletList
            title="אותות חיוביים מובילים"
            items={summary.top_positive_signals_hebrew}
            variant="pos"
          />
          <BulletList
            title="אותות שליליים מובילים"
            items={summary.top_negative_signals_hebrew}
            variant="neg"
          />
        </div>
        <BulletList
          title="שאלות מפתח למשקיע"
          items={summary.key_questions_for_investor_hebrew}
          variant="neutral"
        />
        <TextBlock label="המסקנה הסופית" text={summary.final_takeaway_hebrew} />
      </div>

      {/* Sources & data quality (bottom) */}
      <DataQualityWarnings warnings={data.data_quality_warnings} />
      <SourcesPanel sources={data.sources} meta={data.meta} />
    </div>
  );
}
