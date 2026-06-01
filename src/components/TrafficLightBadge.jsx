import { STATUS_LABELS } from '../utils/labels.js';

const CLASS_BY_STATUS = {
  green: 'tl-green',
  yellow: 'tl-yellow',
  red: 'tl-red',
};

// Normalizes values like "green/yellow/red" (template default) to gray.
function normalize(status) {
  if (typeof status !== 'string') return null;
  const s = status.trim().toLowerCase();
  return CLASS_BY_STATUS[s] ? s : null;
}

export default function TrafficLightBadge({ status, label }) {
  const norm = normalize(status);
  const cls = norm ? CLASS_BY_STATUS[norm] : 'tl-gray';
  const text = label ?? (norm ? STATUS_LABELS[norm] : 'לא ידוע');
  return (
    <span className={`tl-badge ${cls}`}>
      <span className="tl-dot" />
      {text}
    </span>
  );
}
