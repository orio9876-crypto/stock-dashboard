export default function SourcesPanel({ sources, meta }) {
  const list = Array.isArray(sources) ? sources : [];
  return (
    <div className="card">
      <div className="section-title">מקורות ואיכות נתונים</div>
      {meta?.data_freshness_hebrew && (
        <div className="interp" style={{ marginBottom: 14 }}>
          <div className="interp-label">טריות הנתונים</div>
          <p>{meta.data_freshness_hebrew}</p>
        </div>
      )}
      {list.length === 0 ? (
        <p className="muted">לא צוינו מקורות.</p>
      ) : (
        <ul className="sources-list">
          {list.map((src, i) => (
            <li key={i}>
              <div className="src-name">
                {src.url ? (
                  <a href={src.url} target="_blank" rel="noreferrer">
                    {src.source_name || src.url}
                  </a>
                ) : (
                  src.source_name || '—'
                )}
              </div>
              {Array.isArray(src.used_for) && src.used_for.length > 0 && (
                <div className="src-use">{src.used_for.join(' · ')}</div>
              )}
              {src.accessed_date && <div className="faint">נצפה: {src.accessed_date}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
