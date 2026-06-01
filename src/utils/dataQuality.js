// Generic, company-agnostic data-quality model. Every KPI section can declare an
// explicit `data_quality` object:
//   { "status": "complete" | "partial" | "estimated" | "missing", "note_hebrew": "..." }
// When it is absent, the status is inferred from the shape of the data so that a
// KPI is never silently shown as if it were complete. This logic lives in one
// place and is shared by all companies — nothing here is hardcoded to a ticker.

export const DATA_STATUS = {
  COMPLETE: 'complete',
  PARTIAL: 'partial',
  ESTIMATED: 'estimated',
  MISSING: 'missing',
  // "Not applicable" — the metric exists but is not meaningful in the current
  // context (e.g. P/E when earnings are negative, EV/EBITDA when EBITDA is
  // negative, ROE when equity is volatile / loss is BTC-FV-driven).
  NA: 'na',
};

export const STATUS_LABEL_HE = {
  complete: 'נתון מלא',
  partial: 'נתון חלקי',
  estimated: 'מחושב בקירוב',
  missing: 'חסר נתון',
  na: 'לא רלוונטי',
};

// Fallback Hebrew explanation when a KPI declares a status without a note.
export const STATUS_DEFAULT_NOTE_HE = {
  complete: '',
  partial: 'הנתון חלקי: חלק מהתקופות/הרכיבים אינם זמינים במקור הנתונים הקיים.',
  estimated: 'הנתון חושב בקירוב מתוך נתונים קיימים ולא נשלף כערך רשמי מדויק.',
  missing: 'הנתון לא נשלף במקור הנתונים הקיים. אין להציג ערך מומצא במקומו.',
  na: 'המדד לא משמעותי בהקשר הנוכחי (למשל P/E כש-Earnings שליליים, או EV/EBITDA כש-EBITDA שלילי).',
};

const VALID = new Set(Object.values(DATA_STATUS));

// Keys that are interpretation/metadata, not data values.
const isMetaKey = (k) =>
  k === 'chart_recommendation' ||
  k === 'data_quality' ||
  k === 'confidence' ||
  k === 'source' ||
  k === 'calculation_method' ||
  k === 'frequency' ||
  k.endsWith('_hebrew');

const isRecordArray = (v) => Array.isArray(v) && v.some((x) => x && typeof x === 'object');

// Does a record array contain at least one real numeric data point?
function recordArrayHasNumber(arr) {
  return arr.some(
    (row) =>
      row &&
      typeof row === 'object' &&
      Object.entries(row).some(([k, v]) => !isMetaKey(k) && typeof v === 'number' && !Number.isNaN(v)),
  );
}

// Walk a KPI object and summarize how much real numeric data it carries.
function summarize(kpi) {
  let numbers = 0;
  let nullSlots = 0;
  let emptyArrays = 0;
  let lowConfidence = false;

  const visit = (obj) => {
    for (const [key, value] of Object.entries(obj)) {
      if (key === 'confidence' && value === 'low') lowConfidence = true;
      if (isMetaKey(key)) continue;
      if (value === null) {
        nullSlots += 1;
      } else if (typeof value === 'number' && !Number.isNaN(value)) {
        numbers += 1;
      } else if (Array.isArray(value)) {
        if (value.length === 0) emptyArrays += 1;
        else if (isRecordArray(value)) {
          if (recordArrayHasNumber(value)) numbers += 1;
          else emptyArrays += 1;
        }
      } else if (value && typeof value === 'object') {
        visit(value);
      }
    }
  };

  visit(kpi);
  return { numbers, nullSlots, emptyArrays, lowConfidence };
}

// Best-effort status when a KPI does not declare one explicitly.
export function inferKpiStatus(kpi) {
  if (!kpi || typeof kpi !== 'object') return DATA_STATUS.MISSING;
  const { numbers, nullSlots, emptyArrays, lowConfidence } = summarize(kpi);
  if (numbers === 0) return DATA_STATUS.MISSING;
  if (nullSlots > 0 || emptyArrays > 0 || lowConfidence) return DATA_STATUS.PARTIAL;
  return DATA_STATUS.COMPLETE;
}

// Resolve the status + Hebrew note for a KPI, preferring an explicit declaration.
export function resolveDataQuality(kpi) {
  const dq = kpi?.data_quality;
  if (dq && typeof dq === 'object' && VALID.has(dq.status)) {
    return {
      status: dq.status,
      note: dq.note_hebrew || STATUS_DEFAULT_NOTE_HE[dq.status] || '',
    };
  }
  const status = inferKpiStatus(kpi);
  return { status, note: status === DATA_STATUS.COMPLETE ? '' : STATUS_DEFAULT_NOTE_HE[status] };
}
