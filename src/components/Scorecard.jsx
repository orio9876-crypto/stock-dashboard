import { SCORECARD_LABELS } from '../utils/labels.js';

function colorForScore(score) {
  if (score == null) return 'var(--text-faint)';
  if (score >= 7) return 'var(--green)';
  if (score >= 4) return 'var(--yellow)';
  return 'var(--red)';
}

export default function Scorecard({ scorecard }) {
  if (!scorecard) return null;
  const keys = Object.keys(SCORECARD_LABELS).filter((k) => k in scorecard);
  return (
    <div className="card">
      <div className="section-title">כרטיס ציונים</div>
      <div className="scorecard">
        {keys.map((key) => {
          const score = scorecard[key];
          const isOverall = key === 'overall_quality_score_1_to_10';
          const pct = score == null ? 0 : (score / 10) * 100;
          return (
            <div key={key} className={`score-cell ${isOverall ? 'overall' : ''}`}>
              <div className="label">{SCORECARD_LABELS[key]}</div>
              <div className="value" style={{ color: colorForScore(score) }}>
                {score == null ? '—' : `${score}/10`}
              </div>
              <div className="score-bar">
                <span style={{ width: `${pct}%`, background: colorForScore(score) }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
