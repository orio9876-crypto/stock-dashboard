// Shows two kinds of issues:
// 1. Schema validation failures (missing required fields) — rendered as errors.
// 2. Source-provided data_quality_warnings — rendered as cautions.
export default function DataQualityWarnings({ validation, warnings }) {
  const schemaErrors = validation && !validation.valid ? validation.errors : [];
  const sourceWarnings = Array.isArray(warnings) ? warnings : [];

  if (schemaErrors.length === 0 && sourceWarnings.length === 0) return null;

  return (
    <div className="stack">
      {schemaErrors.length > 0 && (
        <div className="warnings error">
          <strong>אזהרת ולידציה: חסרים שדות נדרשים בסכמה</strong>
          <ul>
            {schemaErrors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}
      {sourceWarnings.length > 0 && (
        <div className="warnings">
          <strong>אזהרות איכות נתונים מהמקור</strong>
          <ul>
            {sourceWarnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
