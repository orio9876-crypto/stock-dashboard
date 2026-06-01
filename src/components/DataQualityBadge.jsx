import { STATUS_LABEL_HE } from '../utils/dataQuality.js';

// Small status pill shown next to a KPI title: נתון מלא / חלקי / מחושב בקירוב / חסר.
// `note` is surfaced as a hover tooltip; the visible caption is rendered
// separately by the caller so it is never hidden from the reader.
export default function DataQualityBadge({ status, note }) {
  if (!status) return null;
  const label = STATUS_LABEL_HE[status] ?? status;
  return (
    <span className={`dq-badge dq-${status}`} title={note || label}>
      {label}
    </span>
  );
}
