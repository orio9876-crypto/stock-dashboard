# מבנה ה‑JSON הנדרש מ‑Perplexity

מסמך זה מתאר את מבנה ה‑JSON שכל חברה צריכה לספק. ה‑JSON הוא **מקור האמת היחיד**
של הדאשבורד עבור אותה חברה. תפקיד Perplexity הוא איסוף, אימות וחישוב נתונים בלבד
— לא בניית דאשבורד ולא כתיבת קוד.

## כללים כלליים

- **שפה:** כל הטקסט הפרשני (interpretation, conclusions, risks, insights) בעברית.
  טיקרים, שמות חברות, שמות מטריקות, מונחים חשבונאיים, מזהי גרפים, שמות שדות וסימן
  המטבע `$` — נשארים באנגלית / בפורמט המקור.
- **מספרים:** ערכים מספריים הם מספרים קריאים‑למכונה, לא מחרוזות. למשל
  `4200000000`, לא `"$4.2B"`. אחוזים הם מספרים: `38.5` פירושו 38.5%.
- **נתונים חסרים:** אם נתון אינו זמין — `null`, בתוספת הסבר ב‑`data_quality_warnings`.
  **אין להמציא נתונים.**
- **ביטחון:** לכל מטריקה מהותית יש `confidence` ברמת `high` / `medium` / `low`.
- **מקורות:** לכל נתון חשוב יש מקור.

## ניקוי אוטומטי בעת ייבוא

הפלט של Perplexity לרוב אינו JSON תקין כפי שהוא. סקריפט הייבוא
(`scripts/importCompany.mjs`) מנקה אוטומטית:

1. **סימוני ציטוט** כמו `[^1]`, `[^12]` — מוסרים.
2. **תווי escape לא חוקיים** של markdown כמו `\&`, `\$`, `\%`, `\_` — ה‑backslash
   מוסר תוך שמירה על escapes חוקיים (`\"`, `\\`, `\n`, `\uXXXX` וכו').
3. הסקריפט מאתר בתוך הקובץ את אובייקט הנתונים (זה שיש בו `meta.ticker` לא ריק),
   כך שאפשר להדביק גם markdown שמכיל גם את ה‑prompt וגם את ה‑JSON.

לכן אפשר לייבא ישירות קובץ `.md` של Perplexity ללא ניקוי ידני.

## מבנה ברמה העליונה

```jsonc
{
  "meta": { ... },
  "executive_summary_hebrew": { ... },
  "company_profile": { ... },
  "layers": {
    "profitability": { ... },        // KPIs 01–06
    "valuation": { ... },            // KPIs 07–12
    "cash_flow": { ... },            // KPIs 13–16
    "financial_health": { ... },     // KPIs 17–21
    "forward_signals": { ... },      // KPIs 22–26
    "sector_specific_metrics": { ... }
  },
  "dashboard_summary": { ... },
  "chart_data": [ ... ],
  "sources": [ ... ],
  "data_quality_warnings": [ ... ]
}
```

### `meta` (חובה)

שדות הזהות שמניעים את מסך הבית ואת כותרת עמוד החברה:

```jsonc
{
  "ticker": "CLSK",                  // חובה — מזהה את תיקיית החברה
  "company_name": "CleanSpark, Inc.",// חובה
  "exchange": "NASDAQ",
  "sector": "Information Technology",
  "industry": "...",
  "business_model_hebrew": "...",
  "currency": "USD",
  "as_of_date": "2026-05-30",        // חובה — שם קובץ ה-snapshot
  "latest_reported_quarter": "2026-03-31",
  "latest_fiscal_year": 2025,
  "selected_peers": [
    { "ticker": "MARA", "company_name": "...", "reason_hebrew": "..." }
  ],
  "sector_benchmark_used": "...",
  "data_freshness_hebrew": "..."
}
```

> `ticker` ו‑`as_of_date` הם השדות הקריטיים לייבוא: הם קובעים את שם התיקייה ואת
> שם קובץ ה‑snapshot.

### `executive_summary_hebrew`

```jsonc
{
  "one_liner": "...",               // מוצג ככותרת משנה בעמוד החברה ובכרטיס בבית
  "overall_view": "...",
  "bull_case": ["..."],
  "bear_case": ["..."],
  "main_risks": ["..."],
  "main_opportunities": ["..."],
  "what_to_watch_next_quarter": ["..."],
  "bottom_line_hebrew": "..."
}
```

### `company_profile`

```jsonc
{
  "description_hebrew": "...",
  "main_revenue_drivers": ["..."],
  "geographic_exposure": ["..."],
  "customer_segments": ["..."],
  "key_products_or_services": ["..."],
  "competitive_position_hebrew": "..."
}
```

### `layers` — 5 שכבות, 26 סעיפי KPI

חובה שכל 5 השכבות יתקיימו, וכל 26 הסעיפים יופיעו (גם אם הנתונים בפנים `null` או
מערכים ריקים — אין להשמיט סעיף).

| שכבה | סעיפי KPI |
| --- | --- |
| `profitability` | `01_revenue_growth`, `02_gross_margin`, `03_operating_margin`, `04_net_margin`, `05_eps_surprise`, `06_ebitda` |
| `valuation` | `07_trailing_pe`, `08_forward_pe`, `09_price_to_sales`, `10_ev_to_ebitda`, `11_peg_ratio`, `12_price_to_book` |
| `cash_flow` | `13_operating_cash_flow`, `14_free_cash_flow`, `15_fcf_margin`, `16_fcf_yield` |
| `financial_health` | `17_debt_to_equity`, `18_net_cash_net_debt`, `19_current_ratio`, `20_return_on_equity`, `21_return_on_invested_capital` |
| `forward_signals` | `22_management_guidance`, `23_analyst_consensus`, `24_earnings_revisions`, `25_share_buybacks`, `26_insider_transactions` |

בנוסף `sector_specific_metrics` (לא נספר ב‑26) למדדים ייחודיים לסקטור:

```jsonc
"sector_specific_metrics": {
  "description_hebrew": "...",
  "metrics": [
    { "name": "hash_rate", "unit": "EH/s", "values": [], "confidence": "low", "description_hebrew": "..." }
  ]
}
```

#### איך הדאשבורד מציג כל סעיף KPI

הרכיב הגנרי `KpiSection` מרנדר כל סעיף ללא לוגיקה ייעודית, לפי טיפוסי השדות:

- **שדות מספריים סקלריים** (כמו `current_value`, `sector_median`) → כרטיסי מטריקה.
- **מערכי רשומות** (כמו `company_data`, `last_4_years`, `roe_last_5_years`) → טבלה.
- **`peer_comparison`** → טבלת השוואה לבנות‑השוואה.
- **שדות שמסתיימים ב‑`_hebrew`** → פסקאות פרשנות.
- **`chart_recommendation.chart_id`** → אם קיים גרף תואם ב‑`chart_data`, הוא מוצג.

לכן מבנה כל סעיף KPI גמיש; כל עוד שמות השדות עקביים, התצוגה עובדת לכל חברה.

### `dashboard_summary` (חובה)

```jsonc
{
  "scorecard": {
    "growth_score_1_to_10": 9,
    "profitability_score_1_to_10": 4,
    "valuation_score_1_to_10": 3,
    "cash_flow_score_1_to_10": 3,
    "financial_health_score_1_to_10": 6,
    "forward_signals_score_1_to_10": 6,
    "overall_quality_score_1_to_10": 5
  },
  "traffic_lights": {            // חובה — ערכים: "green" / "yellow" / "red"
    "growth": "green",
    "profitability": "yellow",
    "valuation": "red",
    "cash_flow": "red",
    "financial_health": "yellow",
    "forward_signals": "yellow"
  },
  "top_positive_signals_hebrew": ["..."],
  "top_negative_signals_hebrew": ["..."],
  "key_questions_for_investor_hebrew": ["..."],
  "final_takeaway_hebrew": "..."
}
```

### `chart_data` (חובה — מערך, יכול להיות ריק)

כל גרף בפורמט סדרות. אם לסדרות אין נתונים מספריים, הדאשבורד מציג במקום הגרף את
ההודעה: **"אין מספיק נתונים להצגת הגרף"**.

```jsonc
[
  {
    "chart_id": "revenue_yoy_qoq",          // חייב להתאים ל-chart_recommendation בסעיף KPI
    "chart_type": "bar_line",               // line | bar | grouped_bar | bar_line
    "title_hebrew": "הכנסות וצמיחה רבעונית/שנתית",
    "x_axis": "period",
    "y_axis": "USD / %",
    "series": [
      { "name": "revenue",    "data": [ { "x": "2024-09-30", "y": 378970000 } ] },
      { "name": "yoy_growth", "data": [ { "x": "2024-09-30", "y": 125 } ] }
    ]
  }
]
```

### `sources` (חובה — מערך)

```jsonc
[
  {
    "source_id": "",
    "source_name": "Investing.com – CleanSpark Financial Summary",
    "url": "https://...",
    "accessed_date": "2026-05-30",
    "used_for": ["historical_revenues", "gross_profit"]
  }
]
```

### `data_quality_warnings` (חובה — מערך, יכול להיות ריק)

מערך מחרוזות בעברית המתאר מגבלות נתונים. מוצג בתחתית עמוד החברה. אם יש פער בנתונים
— יש לתעד אותו כאן ולא להשלים במספרים מומצאים.

```jsonc
[
  "רוב נתוני הצמיחה והרווחיות מוצגים ברמת שנה (FY) ולא ברמת רבעון בודד.",
  "נתוני צמיחת הכנסות של מתחרים הם אומדנים גסים, לא ערכים רשמיים מדויקים."
]
```

## רשימת תיוג לפני ייבוא

- [ ] כל 5 השכבות קיימות
- [ ] כל 26 סעיפי ה‑KPI קיימים (גם אם עם `null`/מערכים ריקים)
- [ ] `meta.ticker`, `meta.company_name`, `meta.as_of_date` מלאים
- [ ] `dashboard_summary.traffic_lights` עם ערכי `green`/`yellow`/`red`
- [ ] `chart_data`, `sources`, `data_quality_warnings` קיימים כמערכים
- [ ] אין נתונים מומצאים; פערים מתועדים ב‑`data_quality_warnings`

לאחר הייבוא, `npm run validate` יאמת את כל אלה אוטומטית.
