// Shared snapshot validation, used both by the Node validation script and by
// the dashboard UI so the rules never drift apart.

export const REQUIRED_LAYERS = [
  'profitability',
  'valuation',
  'cash_flow',
  'financial_health',
  'forward_signals',
];

// The 26 required KPI sections, grouped by their layer.
export const REQUIRED_KPIS = {
  profitability: [
    '01_revenue_growth',
    '02_gross_margin',
    '03_operating_margin',
    '04_net_margin',
    '05_eps_surprise',
    '06_ebitda',
  ],
  valuation: [
    '07_trailing_pe',
    '08_forward_pe',
    '09_price_to_sales',
    '10_ev_to_ebitda',
    '11_peg_ratio',
    '12_price_to_book',
  ],
  cash_flow: [
    '13_operating_cash_flow',
    '14_free_cash_flow',
    '15_fcf_margin',
    '16_fcf_yield',
  ],
  financial_health: [
    '17_debt_to_equity',
    '18_net_cash_net_debt',
    '19_current_ratio',
    '20_return_on_equity',
    '21_return_on_invested_capital',
  ],
  forward_signals: [
    '22_management_guidance',
    '23_analyst_consensus',
    '24_earnings_revisions',
    '25_share_buybacks',
    '26_insider_transactions',
  ],
};

export function validateSnapshot(data) {
  const errors = [];
  const warnings = [];

  if (!data?.meta?.ticker) errors.push('meta.ticker חסר');
  if (!data?.meta?.company_name) errors.push('meta.company_name חסר');
  if (!data?.meta?.as_of_date) errors.push('meta.as_of_date חסר');

  const layers = data?.layers ?? {};
  for (const layer of REQUIRED_LAYERS) {
    if (!layers[layer]) {
      errors.push(`שכבה חסרה: layers.${layer}`);
      continue;
    }
    for (const kpi of REQUIRED_KPIS[layer]) {
      if (!(kpi in layers[layer])) errors.push(`KPI חסר: layers.${layer}.${kpi}`);
    }
  }

  if (!Array.isArray(data?.sources)) errors.push('sources חייב להיות מערך');
  if (!data?.dashboard_summary) errors.push('dashboard_summary חסר');
  if (!data?.dashboard_summary?.traffic_lights) errors.push('traffic_lights חסר');
  if (!Array.isArray(data?.chart_data)) errors.push('chart_data חייב להיות מערך');
  if (!Array.isArray(data?.data_quality_warnings)) {
    errors.push('data_quality_warnings חייב להיות מערך');
  } else if (data.data_quality_warnings.length > 0) {
    warnings.push(`${data.data_quality_warnings.length} אזהרות איכות נתונים מהמקור`);
  }

  return { valid: errors.length === 0, errors, warnings };
}
