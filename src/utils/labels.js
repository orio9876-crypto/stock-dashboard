// Static, company-agnostic Hebrew labels for the generic framework (layer names,
// the 26 KPI sections, scorecard rows, traffic-light statuses). These describe
// the metric framework itself, not any company's data.

export const LAYER_LABELS = {
  profitability: 'רווחיות',
  valuation: 'תמחור',
  cash_flow: 'תזרים מזומנים',
  financial_health: 'איתנות פיננסית',
  forward_signals: 'אותות צופי פני עתיד',
};

export const LAYER_ORDER = [
  'profitability',
  'valuation',
  'cash_flow',
  'financial_health',
  'forward_signals',
];

export const KPI_LABELS = {
  '01_revenue_growth': 'צמיחת הכנסות',
  '02_gross_margin': 'מרווח גולמי (Gross Margin)',
  '03_operating_margin': 'מרווח תפעולי (Operating Margin)',
  '04_net_margin': 'מרווח נקי (Net Margin)',
  '05_eps_surprise': 'הפתעת EPS',
  '06_ebitda': 'EBITDA',
  '07_trailing_pe': 'Trailing P/E',
  '08_forward_pe': 'Forward P/E',
  '09_price_to_sales': 'Price / Sales',
  '10_ev_to_ebitda': 'EV / EBITDA',
  '11_peg_ratio': 'PEG Ratio',
  '12_price_to_book': 'Price / Book',
  '13_operating_cash_flow': 'תזרים מפעילות שוטפת (OCF)',
  '14_free_cash_flow': 'תזרים מזומנים חופשי (FCF)',
  '15_fcf_margin': 'FCF Margin',
  '16_fcf_yield': 'FCF Yield',
  '17_debt_to_equity': 'Debt-to-Equity',
  '18_net_cash_net_debt': 'Net Cash / Net Debt',
  '19_current_ratio': 'Current / Quick Ratio',
  '20_return_on_equity': 'ROE',
  '21_return_on_invested_capital': 'ROIC מול WACC',
  '22_management_guidance': 'תחזית הנהלה (Guidance)',
  '23_analyst_consensus': 'קונצנזוס אנליסטים',
  '24_earnings_revisions': 'רוויזיות תחזיות (Earnings Revisions)',
  '25_share_buybacks': 'רכישות עצמיות (Buybacks)',
  '26_insider_transactions': 'עסקאות פנים (Insider)',
};

export const SCORECARD_LABELS = {
  growth_score_1_to_10: 'צמיחה',
  profitability_score_1_to_10: 'רווחיות',
  valuation_score_1_to_10: 'תמחור',
  cash_flow_score_1_to_10: 'תזרים מזומנים',
  financial_health_score_1_to_10: 'איתנות פיננסית',
  forward_signals_score_1_to_10: 'אותות עתידיים',
  overall_quality_score_1_to_10: 'ציון איכות כולל',
};

export const TRAFFIC_LIGHT_KEYS = [
  'growth',
  'profitability',
  'valuation',
  'cash_flow',
  'financial_health',
  'forward_signals',
];

export const TRAFFIC_LIGHT_LABELS = {
  growth: 'צמיחה',
  profitability: 'רווחיות',
  valuation: 'תמחור',
  cash_flow: 'תזרים מזומנים',
  financial_health: 'איתנות פיננסית',
  forward_signals: 'אותות עתידיים',
};

export const STATUS_LABELS = {
  green: 'תקין',
  yellow: 'בינוני',
  red: 'סיכון',
};

// Hebrew labels for common per-record field keys found in KPI data arrays.
export const FIELD_LABELS = {
  period: 'תקופה',
  frequency: 'תדירות',
  quarter: 'רבעון',
  value: 'ערך',
  revenue: 'הכנסות',
  yoy_growth: 'צמיחה YoY',
  qoq_growth: 'צמיחה QoQ',
  revenue_yoy_growth: 'צמיחת הכנסות YoY',
  gross_margin: 'מרווח גולמי',
  operating_margin: 'מרווח תפעולי',
  net_margin: 'מרווח נקי',
  roe: 'ROE',
  debt_to_equity: 'Debt/Equity',
  trailing_pe: 'Trailing P/E',
  forward_pe: 'Forward P/E',
  price_to_sales: 'Price/Sales',
  ev_to_ebitda: 'EV/EBITDA',
  ticker: 'טיקר',
  confidence: 'רמת ביטחון',
  current_value: 'ערך נוכחי',
  company_5y_average: 'ממוצע 5ש׳',
  company_3y_average: 'ממוצע 3ש׳',
  sector_median: 'חציון סקטור',
  market_cap: 'שווי שוק',
  enterprise_value: 'Enterprise Value',
  total_debt: 'סך חוב',
  cash: 'מזומן',
  net_cash_or_net_debt: 'נטו מזומן/חוב',
  short_term_investments: 'השקעות לזמן קצר',
  quarters_of_operating_expenses_covered: 'רבעונים של הוצאות תפעול מכוסים',
  // EPS / EBITDA
  reported_eps: 'EPS מדווח',
  consensus_eps: 'EPS קונצנזוס',
  surprise_pct: '% הפתעה',
  adjusted_ebitda: 'EBITDA מתואם',
  adjusted_ebitda_margin: 'מרווח EBITDA מתואם',
  // Cash flow
  ocf: 'תזרים מפעילות (OCF)',
  fcf: 'תזרים חופשי (FCF)',
  ltm_fcf: 'FCF (LTM)',
  fcf_margin: 'FCF Margin',
  current_fcf_yield: 'FCF Yield נוכחי',
  ten_year_treasury_yield: 'תשואת אג״ח 10Y',
  capex: 'CapEx',
  // Health / valuation
  current_ratio: 'יחס שוטף',
  quick_ratio: 'יחס מהיר',
  price_to_book: 'Price/Book',
  peg_ratio: 'PEG',
  roic: 'ROIC',
  book_value_usd: 'ערך ספרי',
  net_profit_margin: 'מרווח רווח נקי',
  asset_turnover: 'מחזור נכסים',
  equity_multiplier: 'מכפיל הון',
  // Forward signals
  total_analysts: 'מס׳ אנליסטים',
  bullish_percent: '% המלצות חיוביות',
  average_price_target: 'יעד מחיר ממוצע',
  median_price_target: 'יעד מחיר חציוני',
  upside_percent: '% אפסייד',
  buy: 'קנייה',
  hold: 'החזקה',
  sell: 'מכירה',
  low: 'נמוך',
  high: 'גבוה',
  up: 'העלאות',
  down: 'הורדות',
  maintained: 'ללא שינוי',
  revenue_guidance_usd: 'הנחיית הכנסות',
  consensus_revenue_usd: 'קונצנזוס הכנסות',
  analyst: 'אנליסט',
  action: 'פעולה',
  date: 'תאריך',
  buyback_amount: 'היקף רכישה עצמית',
  total_sell_value_6m: 'סך מכירות (6 ח׳)',
  total_transactions: 'מס׳ עסקאות',
  buy_sell_ratio: 'יחס קנייה/מכירה',
  insider: 'בעל עניין',
  type: 'סוג',
  value_usd: 'שווי ($)',
  price_range: 'טווח מחיר',
  share_pct: '% מההכנסות',
};

export function fieldLabel(key) {
  return FIELD_LABELS[key] ?? key;
}

// Title-case an arbitrary snake_case key (fallback when no Hebrew label exists).
export function prettifyKey(key = '') {
  return key
    .replace(/_hebrew$/, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
