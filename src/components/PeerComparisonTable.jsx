import { fieldLabel } from '../utils/labels.js';
import { formatScalar, formatPercent, isPercentKey } from '../utils/format.js';

const HIDDEN = new Set(['source', 'calculation_method', 'confidence']);

function ConfidenceTag({ value }) {
  if (!value) return null;
  return <span className={`conf-tag conf-${value}`}>{value}</span>;
}

function renderCell(key, value) {
  if (value == null || value === '') {
    return (
      <span className="cell-missing" title="חסר נתון: לא נשלף במקור הנתונים הקיים">
        —
      </span>
    );
  }
  if (typeof value === 'number') {
    return isPercentKey(key) ? formatPercent(value) : formatScalar(value);
  }
  return formatScalar(value);
}

// Generic comparison table for an array of peer records plus optional
// company/sector reference rows. Columns are inferred from the data keys.
export default function PeerComparisonTable({
  rows,
  title = 'השוואה לחברות בנות-השוואה',
  sectorMedian,
}) {
  if (!Array.isArray(rows) || rows.length === 0) return null;

  const columns = [];
  for (const row of rows) {
    for (const key of Object.keys(row)) {
      if (!HIDDEN.has(key) && !columns.includes(key)) columns.push(key);
    }
  }
  if (columns.length === 0) return null;
  const hasConfidence = rows.some((r) => r.confidence);
  const hasCalc = rows.some((r) => r.calculation_method);
  const showMetaCol = hasConfidence || hasCalc;

  return (
    <div className="kpi">
      <div className="interp-label" style={{ marginBottom: 6, fontWeight: 600 }}>
        {title}
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c}>{fieldLabel(c)}</th>
              ))}
              {showMetaCol && <th>ביטחון / הערה</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {columns.map((c) => {
                  const isTicker = c === 'ticker';
                  return (
                    <td key={c} className={typeof row[c] === 'number' || isTicker ? 'num' : ''}>
                      {renderCell(c, row[c])}
                    </td>
                  );
                })}
                {showMetaCol && (
                  <td>
                    <ConfidenceTag value={row.confidence} />
                    {row.calculation_method && (
                      <span className="calc-info" title={row.calculation_method}>
                        מחושב
                      </span>
                    )}
                  </td>
                )}
              </tr>
            ))}
            {sectorMedian != null && (
              <tr>
                <td className="num" style={{ fontWeight: 700 }}>
                  חציון סקטור
                </td>
                <td className="num" colSpan={columns.length - 1 + (showMetaCol ? 1 : 0)}>
                  {formatScalar(sectorMedian)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
