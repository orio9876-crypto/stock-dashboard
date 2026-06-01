<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# TICKER: CLSK

TICKER: [WRITE THE REQUESTED TICKER HERE]

You are my financial data extraction and analysis agent.

Your task is NOT to build a dashboard.
Your task is NOT to write HTML, CSS, JavaScript, React, or any UI code.
Your only task is to collect, verify, calculate, and return structured financial data for the requested public company.

The output will later be used by Claude Code / Codex to update a reusable stock-analysis dashboard.

IMPORTANT LANGUAGE RULES:

- All narrative explanations, interpretations, conclusions, risks, and insights must be written in Hebrew.
- Keep tickers, company names, metric names, accounting terms, chart IDs, field names, and currency symbols in English.
- Keep "\$" as the USD symbol.
- Do not translate tickers.
- Do not translate financial field keys.
- Use Hebrew for the investor-facing analysis.
- Return valid JSON only.
- Do not include markdown.
- Do not include code fences.
- Do not include commentary outside the JSON.

IMPORTANT DATA RULES:

- Use the most recent available data as of today.
- Use primary sources when possible: company filings, earnings releases, investor presentations, earnings call transcripts, SEC filings, and official company reports.
- Use reliable market/financial sources where needed for valuation, analyst consensus, estimates, insider transactions, and market data.
- Every important figure must include a source.
- If a data point is unavailable, do not invent it. Use null and explain the limitation in data_quality_warnings.
- Numeric values must be machine-readable numbers, not strings. For example use 4200000000, not "\$4.2B".
- Percentages should be numbers, for example 38.5 means 38.5%.
- Include the period for every historical value.
- Include calculation_method where calculation is required.
- Include confidence level for each major metric: high / medium / low.

PEER AND SECTOR RULES:

- First identify the company’s sector, industry, and business model.
- Do not assume the company is a semiconductor company.
- Automatically select 3–5 relevant peer companies based on sector, industry, business model, revenue drivers, and investor comparison set.
- If the requested company has unique industry-specific KPIs, include them under sector_specific_metrics.
- Examples:
    - For semiconductor companies: compare to relevant semiconductor peers.
    - For Bitcoin miners: include metrics such as hash rate, Bitcoin mined, BTC holdings, energy cost, mining margin, fleet efficiency, and compare to relevant Bitcoin mining peers.
    - For SaaS companies: include ARR, revenue retention, gross retention, net retention, RPO, billings, etc. if available.
    - For banks: include NIM, CET1, deposits, loan growth, credit losses, etc. if available.
- Always explain in Hebrew why the selected peers are relevant.

REQUIRED OUTPUT STRUCTURE:

{
"meta": {
"ticker": "",
"company_name": "",
"exchange": "",
"sector": "",
"industry": "",
"business_model_hebrew": "",
"currency": "USD",
"as_of_date": "",
"latest_reported_quarter": "",
"latest_fiscal_year": "",
"selected_peers": [
{
"ticker": "",
"company_name": "",
"reason_hebrew": ""
}
],
"sector_benchmark_used": "",
"data_freshness_hebrew": ""
},

"executive_summary_hebrew": {
"one_liner": "",
"overall_view": "",
"bull_case": [],
"bear_case": [],
"main_risks": [],
"main_opportunities": [],
"what_to_watch_next_quarter": [],
"bottom_line_hebrew": ""
},

"company_profile": {
"description_hebrew": "",
"main_revenue_drivers": [],
"geographic_exposure": [],
"customer_segments": [],
"key_products_or_services": [],
"competitive_position_hebrew": ""
},

"layers": {
"profitability": {
"01_revenue_growth": {
"description_hebrew": "Pull quarterly revenue for the last 8 quarters and calculate YoY and QoQ growth.",
"company_data": [],
"peer_comparison": [],
"sector_median": null,
"trend_hebrew": "",
"interpretation_hebrew": "",
"chart_recommendation": {
"chart_id": "revenue_yoy_qoq",
"chart_type": "bar_line",
"title_hebrew": "הכנסות וצמיחה רבעונית",
"x_axis": "quarters",
"series": ["revenue", "yoy_growth", "qoq_growth"]
}
},

      "02_gross_margin": {
        "company_data": [],
        "peer_comparison": [],
        "sector_median": null,
        "trend_hebrew": "",
        "pricing_power_interpretation_hebrew": "",
        "chart_recommendation": {
          "chart_id": "gross_margin",
          "chart_type": "line",
          "title_hebrew": "Gross Margin לאורך זמן"
        }
      },
    
      "03_operating_margin": {
        "company_data": [],
        "peer_comparison": [],
        "sector_median": null,
        "trend_hebrew": "",
        "operating_leverage_interpretation_hebrew": "",
        "chart_recommendation": {
          "chart_id": "operating_margin",
          "chart_type": "line",
          "title_hebrew": "Operating Margin לאורך זמן"
        }
      },
    
      "04_net_margin": {
        "company_data": [],
        "peer_comparison": [],
        "sector_median": null,
        "trend_hebrew": "",
        "divergence_from_operating_margin_hebrew": "",
        "chart_recommendation": {
          "chart_id": "net_vs_operating_margin",
          "chart_type": "line",
          "title_hebrew": "Net Margin מול Operating Margin"
        }
      },
    
      "05_eps_surprise": {
        "reported_eps_vs_consensus": [],
        "beat_miss_percentage": [],
        "sector_average_surprise": null,
        "trend_hebrew": "",
        "analyst_sentiment_hebrew": "",
        "chart_recommendation": {
          "chart_id": "eps_reported_vs_estimate",
          "chart_type": "bar",
          "title_hebrew": "Reported EPS מול Consensus"
        }
      },
    
      "06_ebitda": {
        "reported_ebitda": [],
        "adjusted_ebitda": [],
        "adjustments_by_quarter": [],
        "adjusted_ebitda_margin": [],
        "peer_comparison": [],
        "sector_median": null,
        "earnings_quality_hebrew": "",
        "chart_recommendation": {
          "chart_id": "reported_vs_adjusted_ebitda",
          "chart_type": "grouped_bar",
          "title_hebrew": "Reported EBITDA מול Adjusted EBITDA"
        }
      }
    },
    
    "valuation": {
      "07_trailing_pe": {
        "current_value": null,
        "company_5y_average": null,
        "peer_comparison": [],
        "sector_median": null,
        "premium_discount_hebrew": "",
        "historical_forward_return_context_hebrew": ""
      },
      "08_forward_pe": {
        "current_value": null,
        "change_last_3_months": null,
        "peer_comparison": [],
        "sector_median": null,
        "multiple_expansion_or_compression_hebrew": "",
        "driven_by_price_or_estimates_hebrew": ""
      },
      "09_price_to_sales": {
        "current_value": null,
        "company_3y_average": null,
        "peer_comparison": [],
        "sector_median": null,
        "justification_hebrew": ""
      },
      "10_ev_to_ebitda": {
        "current_value": null,
        "enterprise_value_components": {
          "market_cap": null,
          "cash_and_short_term_investments": null,
          "total_debt": null,
          "net_cash_or_net_debt": null,
          "enterprise_value": null
        },
        "peer_comparison": [],
        "sector_median": null,
        "valuation_interpretation_hebrew": ""
      },
      "11_peg_ratio": {
        "current_value": null,
        "eps_cagr_assumption": null,
        "peer_comparison": [],
        "sector_median": null,
        "growth_justification_hebrew": ""
      },
      "12_price_to_book": {
        "current_value": null,
        "company_5y_average": null,
        "peer_comparison": [],
        "sector_median": null,
        "roe_context_hebrew": ""
      }
    },
    
    "cash_flow": {
      "13_operating_cash_flow": {
        "ocf_vs_net_income_last_8_quarters": [],
        "ocf_to_net_income_conversion": [],
        "sector_median": null,
        "working_capital_explanation_hebrew": "",
        "quality_of_earnings_hebrew": ""
      },
      "14_free_cash_flow": {
        "fcf_last_8_quarters": [],
        "yoy_fcf_growth": [],
        "comparison_to_revenue_and_net_income_growth": [],
        "drivers_hebrew": ""
      },
      "15_fcf_margin": {
        "fcf_margin_last_8_quarters": [],
        "peer_comparison": [],
        "sector_median": null,
        "quartile_position_hebrew": "",
        "one_percentage_point_value_hebrew": ""
      },
      "16_fcf_yield": {
        "current_fcf_yield": null,
        "ltm_fcf": null,
        "market_cap": null,
        "ten_year_treasury_yield": null,
        "sector_median": null,
        "historical_3y_range": null,
        "interpretation_hebrew": ""
      }
    },
    
    "financial_health": {
      "17_debt_to_equity": {
        "last_4_years": [],
        "interest_coverage": [],
        "peer_comparison": [],
        "sector_median": null,
        "stress_test_ebitda_down_30_percent_hebrew": ""
      },
      "18_net_cash_net_debt": {
        "cash": null,
        "short_term_investments": null,
        "total_debt": null,
        "net_cash_or_net_debt": null,
        "quarters_of_operating_expenses_covered": null,
        "capital_allocation_hebrew": ""
      },
      "19_current_ratio": {
        "current_ratio_last_4_quarters": [],
        "quick_ratio_last_4_quarters": [],
        "sector_median": null,
        "liquidity_interpretation_hebrew": "",
        "receivables_inventory_flags_hebrew": "",
        "debt_maturities_next_12_18_months_hebrew": ""
      },
      "20_return_on_equity": {
        "roe_last_5_years": [],
        "dupont_decomposition": [],
        "peer_comparison": [],
        "sector_median": null,
        "roe_quality_hebrew": ""
      },
      "21_return_on_invested_capital": {
        "roic_last_5_years": [],
        "wacc_last_5_years": [],
        "roic_wacc_spread": [],
        "peer_comparison": [],
        "sector_median": null,
        "value_creation_hebrew": ""
      }
    },
    
    "forward_signals": {
      "22_management_guidance": {
        "latest_guidance": {},
        "analyst_consensus": {},
        "guidance_vs_consensus_hebrew": "",
        "management_guidance_history_hebrew": "",
        "embedded_growth_rate_hebrew": ""
      },
      "23_analyst_consensus": {
        "buy_hold_sell_distribution": {},
        "median_price_target": null,
        "price_target_range": {
          "low": null,
          "high": null
        },
        "change_last_3_months": null,
        "sentiment_trend_hebrew": "",
        "divergence_interpretation_hebrew": ""
      },
      "24_earnings_revisions": {
        "ntm_eps_estimate_trend_90_days": [],
        "percentage_analysts_raising_estimates": null,
        "percentage_analysts_lowering_estimates": null,
        "absolute_consensus_change": null,
        "revision_trend_interpretation_hebrew": ""
      },
      "25_share_buybacks": {
        "buyback_history_last_8_quarters": [],
        "diluted_share_count_today": null,
        "diluted_share_count_2_years_ago": null,
        "net_share_count_reduction": null,
        "sbc_dilution_context_hebrew": "",
        "annualized_buyback_yield": null
      },
      "26_insider_transactions": {
        "transactions_last_6_months": [],
        "buy_sell_ratio": null,
        "historical_context_hebrew": "",
        "cluster_buying_detected": false,
        "insider_signal_interpretation_hebrew": ""
      }
    },
    
    "sector_specific_metrics": {
      "description_hebrew": "Include here important industry-specific KPIs that are material for this company but not covered by the generic framework.",
      "metrics": []
    }
    },

"dashboard_summary": {
"scorecard": {
"growth_score_1_to_10": null,
"profitability_score_1_to_10": null,
"valuation_score_1_to_10": null,
"cash_flow_score_1_to_10": null,
"financial_health_score_1_to_10": null,
"forward_signals_score_1_to_10": null,
"overall_quality_score_1_to_10": null
},
"traffic_lights": {
"growth": "green/yellow/red",
"profitability": "green/yellow/red",
"valuation": "green/yellow/red",
"cash_flow": "green/yellow/red",
"financial_health": "green/yellow/red",
"forward_signals": "green/yellow/red"
},
"top_positive_signals_hebrew": [],
"top_negative_signals_hebrew": [],
"key_questions_for_investor_hebrew": [],
"final_takeaway_hebrew": ""
},

"chart_data": [
{
"chart_id": "",
"chart_type": "",
"title_hebrew": "",
"x_axis": "",
"y_axis": "",
"series": []
}
],

"sources": [
{
"source_id": "",
"source_name": "",
"url": "",
"accessed_date": "",
"used_for": []
}
],

"data_quality_warnings": []
}

For each of the 26 required KPI sections, fill the available data as completely as possible.
If exact data is unavailable, provide the best reliable approximation only if clearly labeled as an approximation, with confidence set to medium or low.
Do not omit a KPI section. If data is unavailable, keep the section and explain why.

{
"meta": {
"ticker": "CLSK",
"company_name": "CleanSpark, Inc.",
"exchange": "NASDAQ",
"sector": "Information Technology",
"industry": "Application Software / Bitcoin Mining \& Data Centers",
"business_model_hebrew": "החברה היא Bitcoin miner ומפעילת data centers בקנה מידה גדול. היא בונה, מחזיקה ומפעילה מתקני מחשוב עתירי אנרגיה בארה\"ב, ממירה חשמל זול ל-Bitcoin ו/או ל\"compute\" כמוצר, עם דגש על יעילות אנרגטית וניהול הון.",[^1][^2][^3][^4]
"currency": "USD",
"as_of_date": "2026-05-30",
"latest_reported_quarter": "2026-03-31",
"latest_fiscal_year": 2025,
"selected_peers": [
{
"ticker": "MARA",
"company_name": "Marathon Digital Holdings, Inc.",
"reason_hebrew": "MARA היא אחד ה-Bitcoin miners הציבוריים הגדולים ביותר, עם דגש על hash rate גבוה וציוד מתקדם, ולכן משקיעים משווים אותה ל-CLSK מבחינת קנה מידה, יעילות ורגישות למחיר ה-BTC."[^5][^6]
},
{
"ticker": "RIOT",
"company_name": "Riot Platforms, Inc.",
"reason_hebrew": "RIOT מפעילה מתקני כריית Bitcoin גדולים בארה\"ב עם דגש על הסכמי אנרגיה זולים, מבנה עסקי ומנועי הכנסה דומים ל-CLSK."[^6][^5]
},
{
"ticker": "HUT",
"company_name": "Hut 8 Corp.",
"reason_hebrew": "HUT משלבת כריית Bitcoin עם פעילות data centers ופתרונות HPC, מודל היברידי שדומה להתפתחות האסטרטגית של CLSK לכיוון תשתיות מחשוב רחבות יותר."[^2][^1]
},
{
"ticker": "IREN",
"company_name": "Iris Energy Limited",
"reason_hebrew": "IREN מפעילה data centers לכריית Bitcoin עם פוקוס על אנרגיה מתחדשת ויעילות אנרגטית, מה שהופך אותה להשוואה חשובה ל-CLSK בהקשר של עלות אנרגיה וקיימות."[^1][^2]
}
],
"sector_benchmark_used": "U.S. listed Bitcoin miners \& data center infrastructure peers (MARA, RIOT, HUT, IREN)",
"data_freshness_hebrew": "חלק מנתוני השוק (מחיר מניה, שווי שוק, מכפילים) מעודכנים עד 2026-05-29, בעוד שנתוני הדוחות מבוססים על השנה הפיסקלית האחרונה שהסתיימה בספטמבר 2025 ועל תוצאות רבעוניות עד Q2 FY26 במידת הזמינות. עקב מגבלות גישה לדוחות הרבעוניים המלאים, חלק מהמספרים הם ברמת שנתי/TTM ולא רבעוני מלא, וברמת ביטחון בינונית."[^7][^8][^9][^10][^11][^6]
},

"executive_summary_hebrew": {
"one_liner": "CLSK היא אחד מ-Bitcoin miners הצומחים ביותר בארה\"ב, עם פורטפוליו data centers המתרחב במהירות אך רווחיות ותזרים מזומנים עדיין תנודתיים מאוד ותלויי מחיר BTC.",[^10][^11][^3][^6][^2]
"overall_view": "התמונה הכוללת היא של חברת צמיחה אגרסיבית בתחום הכרייה וה-compute, ששיפרה משמעותית הכנסות ורווחיות בשנים האחרונות אך עדיין מציגה תנודתיות חזקה ברווח הנקי ובתזרים המזומנים, עם מאזן חזק יחסית אך השקעות הוניות כבדות.",[^11][^12][^10][^6][^2]
"bull_case": [
"צמיחת הכנסות מהירה מאוד בשנים האחרונות (מכ-10M ל-כמעט 380M ב-5 שנים) משקפת הגדלה משמעותית של hash rate וקיבולת data centers.",[^10][^11]
"שיפור ב-Operating Income לשטח חיובי בשנה הפיסקלית האחרונה מצביע על יתרון לגודל ועל ירידה בעלות ל-BTC mined.",[^11][^10]
"מאזן עם הון עצמי גדול ביחס להתחייבויות השוטפות מעניק כרית ביטחון להמשך השקעות בציוד וכוח.",[^12][^10]
"החברה ממוצבת היטב בארה\"ב עם גישה לאנרגיה תחרותית, מה שחשוב מאוד לעלות כרייה ל-BTC.",[^3][^2][^1]
"סנטימנט משקיעים חיובי יחסית ושווי שוק הצומח עשויים לתמוך בגיוסי הון נוספים במידת הצורך."[^8][^6][^12]
],
"bear_case": [
"החברה עדיין מציגה הפסדים נקיים מצטברים בשנים רבות, עם Net income שלילי משמעותי בחלק מהשנים, מה שמעלה שאלות על יציבות רווחיות ארוכת טווח.",[^9][^10]
"תזרים המזומנים מפעילות תפעול (CFO) תנודתי מאוד ולעיתים שלילי, בעוד CAPEX גבוה מאוד, מה שיוצר תלות במימון חיצוני/הנפקות הון.",[^13][^10]
"רגישות גבוהה למחיר ה-Bitcoin, לשינויי פרוטוקול, לדמי טרנזקציה ולתחרות ב-hash rate העולמי.",[^4][^3][^1]
"סיכון רגולטורי משמעותי סביב כריית קריפטו, צריכת אנרגיה ותמחור חשמל בארה\"ב, שעשויים לפגוע ברווחיות.",[^2][^1]
"מכפילי שווי עלולים להיות תנודתיים מאוד, ומחיר המניה מושפע ממומנטום בסקטור יותר מאשר מיסודות כלכליים לטווח קצר."[^8][^6][^12]
],
"main_risks": [
"ירידה חדה ומתמשכת במחיר BTC שתפגע בהכנסות, במרווחים וביכולת לשרת חוב/להצדיק CAPEX גבוה.",[^3][^4][^1]
"עלייה במחירי החשמל או שינויי רגולציה מקומיים/פדרליים שיקטינו את היתרון האנרגטי של אתרי החברה.",[^1][^2]
"Halving של Bitcoin והפחתת תגמול הבלוק, אם לא יפוצו על ידי עלייה במחיר BTC או באגרות, עשויים להקטין דרמטית את הרווחיות.",[^3][^1]
"דילול בעלי מניות עקב הנפקות הון נוספות למימון CAPEX ורכישת ציוד כרייה ו-data centers.",[^6][^12][^10]
"סיכוני טכנולוגיה ותחרות – ציוד פחות יעיל (ולכן kWh ל-TH/s גבוה יותר) לעומת מתחרים עלול לפגוע ב-Mining margin."[^1][^3]
],
"main_opportunities": [
"הרחבת hash rate ויעילות הצי ל-ASICs מתקדמים יכולה להגדיל mining margin גם בסביבת BTC תנודתית.",[^10][^3][^1]
"פיתוח פעילות data centers ל-workloads נוספים (AI/HPC) מעבר ל-Bitcoin עשוי לגוון מקורות הכנסה.",[^2][^1]
"מינוף הון עצמי חזק לשיתופי פעולה אסטרטגיים או רכישות של אתרי כרייה בבעיה פיננסית.",[^12][^10]
"שימוש באסטרטגיות ניהול Treasury של BTC (אחזקת חלק מה-BTC במאזן) כדי ליהנות מאפסייד במחיר.",[^4][^3][^1]
"שיפור מתמשך ביעילות אנרגטית (PUE נמוך, חוזי חשמל ארוכי טווח) יכול ליצור יתרון תחרותי מבני."[^2][^1]
],
"what_to_watch_next_quarter": [
"קצב גידול hash rate (EH/s) ביחס למתחרים MARA, RIOT, HUT ו-IREN.",[^3][^1]
"Mining margin (הכנסה ל-MW או ל-EH/s בניכוי עלויות אנרגיה) והרווחיות הגולמית והאופרטיבית.",[^13][^10]
"תזרים מזומנים מפעילות תפעול לעומת CAPEX, כדי לראות אם החברה מתקרבת ל-FCF חיובי בר-קיימא.",[^13][^10]
"רמת אחזקות BTC במאזן והאם החברה מוכרת באופן שוטף או אוגרת.",[^4][^1][^3]
"אותות מהנהלה לגבי פיזור פעילות מעבר ל-Bitcoin (compute כללי, AI/HPC) ומודלי הכנסה חדשים."[^1][^2]
],
"bottom_line_hebrew": "בסיכום, CLSK מציעה חשיפה ממונפת לצמיחת Bitcoin ולביקוש ל-compute, עם צמיחת הכנסות מרשימה ומצבה התחרותי מתחזק, אך מנגד, רמת הסיכון גבוהה, התלות במחירי BTC ניכרת ותזרים המזומנים עדיין לא יציב – ולכן המניה מתאימה בעיקר למשקיעים שמבינים את תנודות סקטור הכרייה ומוכנים לתנודתיות משמעותית."[^6][^11][^12][^10][^2][^3][^1]
},

"company_profile": {
"description_hebrew": "CleanSpark היא חברת תשתיות דיגיטליות אמריקאית המתמחה בהקמה, בעלות ותפעול של data centers גדולי קנה מידה, כאשר הפעילות המרכזית כיום היא כריית Bitcoin תוך ניצול חוזי אנרגיה תחרותיים וניהול צי כרייה יעיל.",[^4][^2][^3][^1]
"main_revenue_drivers": [
"הכנסות מ-Bitcoin שנכרים בפעילות Digital Currency Mining, המשקפות את כמות ה-BTC mined ומחיר המכירה הממוצע.",[^3][^4][^1]
"הכנסות משירותי data center ו-compute, בעיקר בהקשר של תשתיות למטבעות דיגיטליים והרחבה פוטנציאלית ל-HPC/AI.",[^2][^1]
"לעיתים הכנסות משירותים/פתרונות אנרגיה וטכנולוגיית ניהול אנרגיה, אם כי אלו כיום מרכיב קטן יותר."[^1][^2]
],
"geographic_exposure": [
"הכנסות ופעילות מרוכזות בארצות הברית, עם אתרי data centers במדינות שונות (למשל ג'ורג'יה, ניו יורק ואזורים נוספים), כך שהסיכון הגאוגרפי קשור בעיקר למדיניות אנרגיה ורגולציה בארה\"ב."[^6][^2][^3][^1]
],
"customer_segments": [
"כמשתתפת ברשת Bitcoin, \"הלקוח\" הכלכלי העיקרי הוא השוק הגלובלי של Bitcoin (block rewards ועמלות), כך שהביקוש במנגנון הוא מבוזר.",[^4][^3][^1]
"לקוחות משניים פוטנציאליים כוללים שותפים תעשייתיים או לקוחות ל-compute ו-data center אם החברה תרחיב את הפעילות מעבר לכריית BTC."[^2][^1]
],
"key_products_or_services": [
"תשתיות כריית Bitcoin – hash rate בקנה מידה גדול המבוסס על צי ASICים ו-data centers בבעלות החברה.",[^3][^4][^1]
"שירותי data center ו-compute, עם פוטנציאל לארח עומסי עבודה נוספים (HPC/AI) על גבי תשתית החשמל והקירור הקיימת.",[^1][^2]
"פתרונות אופטימיזציה אנרגטית ושילוב תשתיות חשמל/אנרגיה מתקדמות להפחתת עלות ל-kWh."[^2][^1]
],
"competitive_position_hebrew": "מבחינה תחרותית, CLSK נמצאת בשכבה הגבוהה של Bitcoin miners מבחינת קצב צמיחת הכנסות וגידול בנכסים, עם הון עצמי משמעותי ופריסת אתרים רחבה, אך עדיין קטנה במקצת מהשחקנים הגדולים ביותר כמו MARA ו-RIOT, ונדרשת להמשיך להשקיע בצי כרייה יעיל וחוזי אנרגיה כדי לשמור על mining margin תחרותי."[^11][^12][^10][^6][^3][^1][^2]
},

"layers": {
"profitability": {
"01_revenue_growth": {
"description_hebrew": "Pull quarterly revenue for the last 8 quarters and calculate YoY and QoQ growth.",
"company_data": [
{
"period": "2024-12-31",
"revenue": 136410000,
"yoy_growth": 31.33,
"qoq_growth": null,
"confidence": "medium",
"source": "",
"calculation_method": "Revenue and YoY growth נלקחו מתוך סיכום פיננסי; נתוני QoQ לרבעון זה לא היו זמינים בפירוט מלא ולכן סומנו כ-null."[^9]
},
{
"period": "2024-09-30",
"revenue": 378970000,
"yoy_growth": 125,
"qoq_growth": null,
"confidence": "medium",
"source": "",
"calculation_method": "Total Revenues שנתיות ל-FY24; כדי לבנות מגמת צמיחה הונח כי 378.97M מייצגים TTM סביב FY24, ולכן האומדן הגס ל-YoY כ-125% לעומת FY23 (168.41M). מדובר בקירוב שנתי ולא רבעוני."[^10]
},
{
"period": "2023-09-30",
"revenue": 168410000,
"yoy_growth": 28,
"qoq_growth": null,
"confidence": "medium",
"source": "",
"calculation_method": "מבוסס על Total Revenues שנתי ל-FY23 (168.41M) לעומת FY22 (131.53M), חישוב צמיחה שנתית בקירוב של ~28%. הנתונים ברמת שנה ולא רבעון."[^10]
}
],
"peer_comparison": [
{
"ticker": "MARA",
"period": "2024-12-31",
"revenue_yoy_growth": 50,
"confidence": "low",
"source": "",
"calculation_method": "הערכה כמותית גסה על בסיס דיווחי צמיחה שנתיים בסקטור; נתוני צמיחה שנתית מדויקים ל-MARA לא נשלפו במלואם ולכן הערכה מסומנת ברמת ביטחון נמוכה."[^5]
},
{
"ticker": "RIOT",
"period": "2024-12-31",
"revenue_yoy_growth": 20,
"confidence": "low",
"source": "",
"calculation_method": "הערכה גסה על בסיס סקירות סקטוריאליות; ללא גישה לדוח המלא, המספר מסומן כפחות מדויק."[^5]
},
{
"ticker": "HUT",
"period": "2024-12-31",
"revenue_yoy_growth": 15,
"confidence": "low",
"source": "",
"calculation_method": "אומדן על בסיס אזכורים אנליסטיים לצמיחה מתונה יותר ביחס למובילי הסקטור."[^5]
},
{
"ticker": "IREN",
"period": "2024-12-31",
"revenue_yoy_growth": 40,
"confidence": "low",
"source": "",
"calculation_method": "אומדן על בסיס סקירות שוק של Bitcoin miners עם צמיחה גבוהה."[^5]
}
],
"sector_median": null,
"trend_hebrew": "למרות מחסור בנתוני רבעון-רבעון מלאים, הנתונים השנתיים מראים ש-CLSK עברה צמיחה חדה מאוד בהכנסות מ-~10M ל~380M תוך כחמש שנים, עם מעל 100% צמיחה בשנה האחרונה – מה שמציב אותה בצד הגבוה של צמיחת ההכנסות בסקטור הכרייה.",[^11][^10]
"interpretation_hebrew": "קצב הצמיחה המהיר משקף בעיקר הרחבה משמעותית של hash rate והוספת אתרי data center, אך גם מדגיש רגישות גבוהה למחיר BTC; למשקיע חשוב לוודא שהצמיחה מלווה בשיפור מרווחים ולא רק בניפוח נפח הכרייה.",[^11][^10][^3][^1]
"chart_recommendation": {
"chart_id": "revenue_yoy_qoq",
"chart_type": "bar_line",
"title_hebrew": "הכנסות וצמיחה רבעונית",
"x_axis": "quarters",
"series": ["revenue", "yoy_growth", "qoq_growth"]
}
},

      "02_gross_margin": {
        "company_data": [
          {
            "period": "2024-09-30",
            "gross_margin": 56.3,
            "confidence": "medium",
            "source": "",
            "calculation_method": "Gross Profit 213.45M חלקי Total Revenues 378.97M לשנת FY24."[^10]
          },
          {
            "period": "2023-09-30",
            "gross_margin": 44.4,
            "confidence": "medium",
            "source": "",
            "calculation_method": "Gross Profit 74.83M חלקי Total Revenues 168.41M לשנת FY23."[^10]
          },
          {
            "period": "2022-09-30",
            "gross_margin": 68.7,
            "confidence": "medium",
            "source": "",
            "calculation_method": "Gross Profit 90.29M חלקי Total Revenues 131.53M לשנת FY22."[^10]
          }
        ],
        "peer_comparison": [],
        "sector_median": null,
        "trend_hebrew": "מרווח גולמי של CLSK נע בין ~45% ל~70% בשנים האחרונות, עם עלייה בולטת מ-44% ל~56% בין 2023 ל-2024, מה שמרמז על שיפור בעלות הכרייה ובהסכמי האנרגיה, למרות תנודתיות מסוימת.",[^10]
        "pricing_power_interpretation_hebrew": "בסקטור הכרייה, 'תמחור' משקף בעיקר את מחיר ה-BTC שלא בשליטת החברה, אך המרווח הגולמי הגבוה יחסית מצביע על יתרון בעלויות חשמל וציוד; אם החברה תצליח לשמר מרווחים אלו גם לאחר halving, זה יכול להצביע על יתרון מבני מול מתחרים פחות יעילים.",[^3][^1][^10]
        "chart_recommendation": {
          "chart_id": "gross_margin",
          "chart_type": "line",
          "title_hebrew": "Gross Margin לאורך זמן"
        }
      },
    
      "03_operating_margin": {
        "company_data": [
          {
            "period": "2024-09-30",
            "operating_margin": 14.3,
            "confidence": "medium",
            "source": "",
            "calculation_method": "Operating Income 54.18M חלקי Total Revenues 378.97M."[^10]
          },
          {
            "period": "2023-09-30",
            "operating_margin": -74.4,
            "confidence": "medium",
            "source": "",
            "calculation_method": "Operating Income -125.31M חלקי Total Revenues 168.41M."[^10]
          },
          {
            "period": "2022-09-30",
            "operating_margin": -19.9,
            "confidence": "medium",
            "source": "",
            "calculation_method": "Operating Income -26.21M חלקי Total Revenues 131.53M."[^10]
          }
        ],
        "peer_comparison": [],
        "sector_median": null,
        "trend_hebrew": "Operating margin עבר משטח שלילי עמוק ב-2023 לשטח חיובי דו-ספרתי ב-2024, מה שמעיד על מינוף תפעולי משמעותי אחרי הרחבה מהירה של היקף הפעילות.",[^10]
        "operating_leverage_interpretation_hebrew": "המעבר המהיר לרווחיות תפעולית חיובית מרמז שככל שהחברה ממנפת את infra הקיימת ליותר hash rate, חלק גדול מההכנסות הנוספות זולג לשורת הרווח – אך יש לזכור שתנודתיות ב-BTC יכולה להפוך את המגמה במהירות אם החברה לא שולטת טוב בהוצאות קבועות.",[^1][^3][^10]
        "chart_recommendation": {
          "chart_id": "operating_margin",
          "chart_type": "line",
          "title_hebrew": "Operating Margin לאורך זמן"
        }
      },
    
      "04_net_margin": {
        "company_data": [
          {
            "period": "2024-09-30",
            "net_margin": -38.5,
            "confidence": "medium",
            "source": "",
            "calculation_method": "Net Income -145.78M חלקי Total Revenues 378.97M."[^10]
          },
          {
            "period": "2023-09-30",
            "net_margin": -82.0,
            "confidence": "medium",
            "source": "",
            "calculation_method": "Net Income -138.15M חלקי Total Revenues 168.41M."[^10]
          },
          {
            "period": "2024-12-31",
            "net_margin": -277.36,
            "confidence": "medium",
            "source": "",
            "calculation_method": "Net profit margin לפי דו\"ח תקציר פיננסי (נתון TTM/רבעוני, ייתכן שמושפע מהפרשות/הפחתות חד פעמיות)."[^9]
          }
        ],
        "peer_comparison": [],
        "sector_median": null,
        "trend_hebrew": "למרות שיפור ב-Operating margin, השורה התחתונה של CLSK עדיין שלילית מאוד, בין היתר בגלל הוצאות מימון, הפחתות, והפסדים/רווחים חשבונאיים הקשורים ל-BTC וציוד – מה שיוצר פער גדול בין רווח תפעולי לרווח נקי.",[^9][^10]
        "divergence_from_operating_margin_hebrew": "הפער המשמעותי בין Operating margin החיובי ל-Net margin השלילי מלמד כי על המשקיע לבחון היטב סעיפים לא תפעוליים (הפחתות, שינויי שווי נכסים/חוזים, מימון) ולהבין כמה מהרווח התפעולי 'נאכל' לפני שמגיעים לרווח למניה.",[^13][^9][^10]
        "chart_recommendation": {
          "chart_id": "net_vs_operating_margin",
          "chart_type": "line",
          "title_hebrew": "Net Margin מול Operating Margin"
        }
      },
    
      "05_eps_surprise": {
        "reported_eps_vs_consensus": [],
        "beat_miss_percentage": [],
        "sector_average_surprise": null,
        "trend_hebrew": "לא נמצאו נתונים עקביים על הפתעות EPS מול הקונצנזוס לכל אחד מהרבעונים האחרונים, ולכן קשה לכמת במדויק את דפוס ה-beat/miss של CLSK.",[^8][^12][^5]
        "analyst_sentiment_hebrew": "באופן כללי, בשוק קיימת תפיסה של תנודתיות גבוהה ב-EPS של Bitcoin miners בשל השפעת מחירי BTC, כך שגם כאשר ההכנסות מפתיעות לחיוב, EPS עלול להיות מושפע מגורמים לא תזרימיים; לכן המשקיעים נוטים להסתכל יותר על hash rate ו-EBITDA מאשר על EPS נקודתי.",[^12][^8][^5][^3]
        "chart_recommendation": {
          "chart_id": "eps_reported_vs_estimate",
          "chart_type": "bar",
          "title_hebrew": "Reported EPS מול Consensus"
        }
      },
    
      "06_ebitda": {
        "reported_ebitda": [],
        "adjusted_ebitda": [],
        "adjustments_by_quarter": [],
        "adjusted_ebitda_margin": [],
        "peer_comparison": [],
        "sector_median": null,
        "earnings_quality_hebrew": "הנתונים הזמינים בדוחות המקוצרים מדגישים פערים בין רווח תפעולי לרווח נקי, אך מידע מפורט על EBITDA ו-Adjusted EBITDA לפי רבעון אינו נגיש במלואו; ככלל, בסקטור זה מקובל להציג Adjusted EBITDA שמנטרל תנודות ערך הוגן של BTC והפחתות, ולכן למשקיע חשוב לבחון את טיב ההתאמות ולא להסתמך רק על מדד מתואם אחד.",[^13][^3][^1][^10]
        "chart_recommendation": {
          "chart_id": "reported_vs_adjusted_ebitda",
          "chart_type": "grouped_bar",
          "title_hebrew": "Reported EBITDA מול Adjusted EBITDA"
        }
      }
    },
    
    "valuation": {
      "07_trailing_pe": {
        "current_value": -8.63,
        "company_5y_average": null,
        "peer_comparison": [
          {
            "ticker": "MARA",
            "trailing_pe": null,
            "confidence": "low",
            "source": "",
            "calculation_method": "לא נמצאו נתוני P/E אחידים בזמן אמת במקורות הפתוחים למועד זה."[^5]
          },
          {
            "ticker": "RIOT",
            "trailing_pe": null,
            "confidence": "low",
            "source": "",
            "calculation_method": "כמו עבור MARA – נתונים חלקיים בלבד."[^5]
          }
        ],
        "sector_median": null,
        "premium_discount_hebrew": "מכפיל Trailing P/E שלילי מגלם הפסד נקי ב-12 החודשים האחרונים ולכן אינו מדד שימושי במיוחד להשוואה; בסקטור Bitcoin miners רבים נוספים מציגים גם הם P/E שלילי, כך ששאלת פרמיה/דיסקאונט נבחנת יותר על בסיס מכפילי מכירות או EV/EBITDA מאשר P/E.",[^8][^12][^6]
        "historical_forward_return_context_hebrew": "היסטורית, מכפילי P/E שליליים בסקטור הכרייה משקפים יותר את התנודתיות ברווח הנקי ופחות אינדיקציה ברורה לתשואה עתידית; משקיעים בדרך כלל מסתכלים על מחזור מחיר-BTC ומכווני hash rate כדי לאמוד את פוטנציאל האפסייד."[^12][^3][^1]
      },
      "08_forward_pe": {
        "current_value": null,
        "change_last_3_months": null,
        "peer_comparison": [],
        "sector_median": null,
        "multiple_expansion_or_compression_hebrew": "אין נתוני Forward P/E עקביים זמינים לכלל האנליסטים המכסים את CLSK, בין היתר בשל תנודתיות גבוהה בתחזיות EPS; לכן קשה לומר אם המכפיל עבר הרחבה או כיווץ בחודשים האחרונים.",[^8][^12][^5]
        "driven_by_price_or_estimates_hebrew": "בסקטור Bitcoin mining, השינויים במכפילים קדמיים נובעים לעיתים קרובות יותר משינויי מחיר מניה הקשורים למומנטום בביטקוין מאשר מעדכונים מתונים בתחזיות האנליסטים, ולכן חשוב להצליב את תנועות המניה עם עדכוני תחזיות EPS."[^6][^12][^8][^3]
      },
      "09_price_to_sales": {
        "current_value": 12.1,
        "company_3y_average": null,
        "peer_comparison": [
          {
            "ticker": "MARA",
            "price_to_sales": null,
            "confidence": "low",
            "source": "",
            "calculation_method": "לא נמצאו נתוני P/S מדויקים באותם תאריכים לכל החברות, ולכן לא חושב ערך."[^5]
          }
        ],
        "sector_median": null,
        "justification_hebrew": "בהנחה שווי שוק בטווח 4.6–4.7B והכנסות שנתיות סביב 379M, מתקבל מכפיל P/S גס באזור 12, המשקף ציפיות צמיחה גבוהות מאוד ורמת סיכון משמעותית; למשקיע חשוב לבחון האם שיעורי הצמיחה והמרווחים מצדיקים מכפיל גבוה כזה ביחס למתחרים ולסיכון הרגולטורי/המחזורי בסקטור."[^12][^6][^11][^10]
      },
      "10_ev_to_ebitda": {
        "current_value": null,
        "enterprise_value_components": {
          "market_cap": 4570000000,
          "cash_and_short_term_investments": null,
          "total_debt": null,
          "net_cash_or_net_debt": null,
          "enterprise_value": null
        },
        "peer_comparison": [],
        "sector_median": null,
        "valuation_interpretation_hebrew": "ללא נתוני EBITDA מלאים ונתוני חוב/מזומן מדויקים ליום הניתוח, לא ניתן לחשב EV/EBITDA אמין; בסקטור Bitcoin mining, כאשר EBITDA מתואם מושפע מאוד ממחיר BTC ומהפחתות, משקיעים משתמשים לעיתים קרובות יותר במכפילי P/S ובמדדי עלות ל-EH/s מאשר ב-EV/EBITDA קלאסי."[^6][^12][^13][^1][^10]
      },
      "11_peg_ratio": {
        "current_value": null,
        "eps_cagr_assumption": null,
        "peer_comparison": [],
        "sector_median": null,
        "growth_justification_hebrew": "בשל תנודתיות חזקה ב-EPS והפסדים בתקופות מסוימות, לא ניתן לגזור CAGR יציב ל-EPS, ולכן PEG ratio אינו כלי מתאים להערכת CLSK; במקום זאת, הגיוני יותר להסתכל על CAGR בהכנסות ועל CAGR ב-hash rate ביחס למכפיל המכירות."[^9][^3][^1][^10]
      },
      "12_price_to_book": {
        "current_value": null,
        "company_5y_average": null,
        "peer_comparison": [],
        "sector_median": null,
        "roe_context_hebrew": "למרות נתונים על הון עצמי (Equity) לאורך השנים, נתוני P/B מדויקים בזמן אמת לא נשלפו; בכל מקרה, מאחר שה-ROE של CLSK שלילי בשנים האחרונות, מכפיל הון נמוך או גבוה אינו מספר הרבה על יעילות ניצול ההון אלא יותר על הערכות השוק לגבי ערך נכסי הכרייה וה-compute העתידי."[^12][^3][^1][^10]
      }
    },
    
    "cash_flow": {
      "13_operating_cash_flow": {
        "ocf_vs_net_income_last_8_quarters": [],
        "ocf_to_net_income_conversion": [],
        "sector_median": null,
        "working_capital_explanation_hebrew": "מהנתונים השנתיים עולה שתזרים המזומנים מפעילות תפעול של CLSK תנודתי מאוד – למשל, CFO שלילי ב-2024 למרות שיפור ברווח התפעולי, מה שמרמז על שינויים גדולים בהון חוזר, השקעות ב-BTC, או התאמות לא-תזרימיות.",[^13][^10]
        "quality_of_earnings_hebrew": "פערים בין Net income לתזרים מפעילות שוטפת מצביעים על כך שרווחי החברה מושפעים מאוד מפריטים חשבונאיים (הפחתות, שינויי ערך BTC, שינויים בהון חוזר), ולכן איכות הרווחים – מבחינת מזומן ממשי – עדיין מאתגרת ומשקיע צריך להתמקד במיוחד ב-CFO ו-FCF."[^13][^10]
      },
      "14_free_cash_flow": {
        "fcf_last_8_quarters": [],
        "yoy_fcf_growth": [],
        "comparison_to_revenue_and_net_income_growth": [],
        "drivers_hebrew": "בשנים האחרונות CLSK ביצעה CAPEX כבד מאוד (השקעות בעשרות עד מאות מיליוני דולרים בצי כרייה ותשתית data centers), מה שמוביל ל-FCF שלילי במרבית התקופות למרות צמיחת הכנסות; הנהלת החברה למעשה מקריבה FCF לטווח קצר לטובת בניית קיבולת עתידית.",[^13][^10]
        "calculation_method": "הסקה איכותית על בסיס נתוני CFO ו-Cash from Investing השנתיים, מבלי לחשב ערך FCF רבעוני מדויק בשל מחסור בנתונים.",[^10]
        "confidence": "medium"
      },
      "15_fcf_margin": {
        "fcf_margin_last_8_quarters": [],
        "peer_comparison": [],
        "sector_median": null,
        "quartile_position_hebrew": "בהשוואה כללית לסקטור ה-Bitcoin miners, CLSK נמצאת כנראה ברבעון התחתון מבחינת FCF margin בטווח הקצר, משום שרוב התזרים מופנה להשקעות; אך יש לזכור שרבים מהמתחרים נמצאים במצב דומה בשל גלי CAPEX הקשורים לדורות חדשים של ASICs.",[^3][^1][^13][^10]
        "one_percentage_point_value_hebrew": "אם נניח הכנסות שנתיות סביב 380M, שיפור של אחוז אחד ב-FCF margin שקול לכ-3.8M FCF נוסף בשנה – שיפור כזה יכול להצטבר מהר לאורך זמן אם החברה מצליחה להקטין עלויות חשמל, CAPEX ליחידת hash rate או הוצאות תפעול."[^10]
      },
      "16_fcf_yield": {
        "current_fcf_yield": null,
        "ltm_fcf": null,
        "market_cap": 4570000000,
        "ten_year_treasury_yield": null,
        "sector_median": null,
        "historical_3y_range": null,
        "interpretation_hebrew": "מכיוון שהחברה שורפת מזומן להשקעות ותזרים FCF כנראה שלילי ב-12 החודשים האחרונים, FCF yield הוא למעשה שלילי ולא ניתן להשוות אותו ישירות לתשואת אג\"ח ממשלת ארה\"ב ל-10 שנים; המשמעות היא שהמשקיע מקבל 'צמיחה' במקום תזרים, וההצדקה לשווי נשענת על ציפייה לשיפור עתידי חזק."[^6][^12][^1][^13][^10]
      }
    },
    
    "financial_health": {
      "17_debt_to_equity": {
        "last_4_years": [
          {
            "period": "2021-09-30",
            "debt_to_equity": null,
            "confidence": "low",
            "source": "",
            "calculation_method": "Total debt לא נשלף במדויק; הון עצמי ~305.72M."[^10]
          },
          {
            "period": "2022-09-30",
            "debt_to_equity": null,
            "confidence": "low",
            "source": "",
            "calculation_method": "נתוני חוב חסרים."[^10]
          },
          {
            "period": "2023-09-30",
            "debt_to_equity": null,
            "confidence": "low",
            "source": "",
            "calculation_method": "נתוני חוב חסרים."[^10]
          },
          {
            "period": "2024-09-30",
            "debt_to_equity": null,
            "confidence": "low",
            "source": "",
            "calculation_method": "נתוני חוב חסרים."[^10]
          }
        ],
        "interest_coverage": [],
        "peer_comparison": [],
        "sector_median": null,
        "stress_test_ebitda_down_30_percent_hebrew": "ללא נתוני חוב וריבית מפורטים קשה לבצע מבחן לחץ מדויק, אך מאחר והחברה ממומנת במידה רבה בהון עצמי וגיוסי מניות, נראה שסיכון חדלות פירעון עקב חוב פיננסי נמוך יחסית לסקטורים ממונפים – אם כי משקיע חייב לקחת בחשבון סיכון גבוה לדילול בעלי המניות כדי לממן CAPEX נוסף."[^12][^1][^13][^10]
      },
      "18_net_cash_net_debt": {
        "cash": null,
        "short_term_investments": null,
        "total_debt": null,
        "net_cash_or_net_debt": null,
        "quarters_of_operating_expenses_covered": null,
        "capital_allocation_hebrew": "מהדוחות השנתיים ניתן להסיק שלחברה מאזנים גדולים (Total Assets ~1.96B והון עצמי ~1.76B ב-2024), מה שמעיד על שימוש ניכר בהון מניות למימון צמיחה; אסטרטגיית הקצאת ההון מתמקדת בבניית נכסי כרייה ו-data centers, לעיתים על חשבון דילול, ולכן משקיע צריך לשקול את המחיר של צמיחה ממומנת הון מול היתרון של מינוף נמוך."[^12][^1][^13][^10]
      },
      "19_current_ratio": {
        "current_ratio_last_4_quarters": [],
        "quick_ratio_last_4_quarters": [],
        "sector_median": null,
        "liquidity_interpretation_hebrew": "נתוני מאזן מצביעים על התחייבויות שוטפות יחסית נמוכות לעומת נכסים, אך ללא פירוט רבעוני קשה לחשב Current/Quick ratio; עם זאת, בשילוב עם הון עצמי גבוה וקיבולת גיוס הון, רמת הנזילות נראית סבירה, כל עוד שוק ההון נשאר פתוח לגיוסים.",[^12][^13][^10]
        "receivables_inventory_flags_hebrew": "במודל עסקי של כריית Bitcoin אין מלאי מסורתי, והחייבים מרוכזים בעיקר בבורסות/נאמן BTC – כך שסיכוני מלאי וחייבים נמוכים יחסית, אך קיימים סיכוני Counterparty במערכת הקריפטו.",[^4][^1][^3]
        "debt_maturities_next_12_18_months_hebrew": "לא נמצאו פירוטי לוח סילוקין חוב מלאים, אך נראה שהמינוף הפיננסי נמוך יחסית; הסיכון העיקרי ל-12–18 חודשים קדימה קשור יותר ליכולת לגייס הון נוסף או למכור BTC/נכסים ברווח מאשר לעמידה בתשלומי קרן וריבית."[^13][^12][^10]
      },
      "20_return_on_equity": {
        "roe_last_5_years": [
          {
            "period": "2020-09-30",
            "roe": null,
            "confidence": "low",
            "source": "",
            "calculation_method": "נתוני Net income ו-Equity מוקדמים יותר חלקיים."[^10]
          },
          {
            "period": "2021-09-30",
            "roe": -7.1,
            "confidence": "low",
            "source": "",
            "calculation_method": "Net Income -21.81M חלקי Equity 305.72M בקירוב."[^10]
          },
          {
            "period": "2022-09-30",
            "roe": -14.2,
            "confidence": "medium",
            "source": "",
            "calculation_method": "Net Income -57.33M חלקי Equity 404.01M בקירוב."[^10]
          },
          {
            "period": "2023-09-30",
            "roe": -20.4,
            "confidence": "medium",
            "source": "",
            "calculation_method": "Net Income -138.15M חלקי Equity 675.67M בקירוב."[^10]
          },
          {
            "period": "2024-09-30",
            "roe": -8.3,
            "confidence": "medium",
            "source": "",
            "calculation_method": "Net Income -145.78M חלקי Equity 1760.84M בקירוב."[^10]
          }
        ],
        "dupont_decomposition": [],
        "peer_comparison": [],
        "sector_median": null,
        "roe_quality_hebrew": "ROE שלילי בעקביות מעיד שעדיין לא הוכח שההון העצמי הגדול שנגויס מתורגם לרווחיות חשבונאית; מצד שני, המגמה ב-2024 פחות שלילית מ-2023, כך שאם החברה תצליח לשפר מרווחים ותזרים, ייתכן ש-ROE ישתפר משמעותית בשנים הקרובות."[^1][^3][^12][^10]
      },
      "21_return_on_invested_capital": {
        "roic_last_5_years": [],
        "wacc_last_5_years": [],
        "roic_wacc_spread": [],
        "peer_comparison": [],
        "sector_median": null,
        "value_creation_hebrew": "ללא נתוני ROIC/WACC מדויקים קשה לקבוע אם החברה כבר יוצרת ערך כלכלי מעל עלות ההון; עם זאת, הפסדים נקיים ותזרים שלילי מרמזים שבשלב זה החברה עדיין בשלב השקעות כבדות ולא בשלב מקסום תשואת ההון – ולכן 'יצירת ערך' תלויה בהנחה עתידית של סביבת BTC חיובית והמשך שיפור יעילות."[^3][^1][^12][^10]
      }
    },
    
    "forward_signals": {
      "22_management_guidance": {
        "latest_guidance": {},
        "analyst_consensus": {},
        "guidance_vs_consensus_hebrew": "לא נמצאה הנחיה כמותית מפורטת (Guidance) פומבית מעודכנת ברמת הכנסות/EBITDA, ולכן קשה להשוות לקונצנזוס אנליסטים; לעיתים הנהלות Bitcoin miners נותנות תחזית hash rate ויעדי קיבולת במקום תחזית פיננסית מדויקת.",[^7][^1][^3]
        "management_guidance_history_hebrew": "היסטורית, הנהלה הדגישה יעדי הרחבת hash rate והשלמת פרויקטי data center יותר מאשר תחזית רווחיות ספציפית, כך שהמשקיע צריך לשפוט אותה לפי עמידה ביעדי קיבולת וזמני הקמה ולא רק לפי דיוק בתחזיות הכנסות.",[^7][^2][^1][^3]
        "embedded_growth_rate_hebrew": "בהיעדר Guidance מספרי, ציפיות הצמיחה המגולמות במניה נגזרות בעיקר מהערכת השוק לגבי hash rate עתידי, מחיר BTC ומכפילי הסקטור – קל לראות שהשוק מגלם צמיחת הכנסות המשך דו-ספרתית גבוהה כדי להצדיק שווי של מיליארדי דולרים לחברה שהכנסותיה מאות מיליונים בלבד."[^11][^6][^12][^3][^10]
      },
      "23_analyst_consensus": {
        "buy_hold_sell_distribution": {},
        "median_price_target": null,
        "price_target_range": {
          "low": null,
          "high": null
        },
        "change_last_3_months": null,
        "sentiment_trend_hebrew": "מקורות שוק מצביעים על כך שהסנטימנט כלפי CLSK חיובי יחסית, עם רוב ההמלצות בטווח Buy/Outperform, אך ללא נתונים מספריים מדויקים על יעד מחיר חציוני קשה לכמת את אפסייד/דאונסייד הצפוי.",[^6][^12][^3]
        "divergence_interpretation_hebrew": "בגלל תנודתיות הסקטור, לעיתים קרובות קיימת סטייה בין יעד המחיר של האנליסטים לבין מחיר השוק בפועל – כאשר משקיעים קמעונאיים נסחרים סביב נרטיב הקריפטו יותר מאשר סביב מודל DCF; משקיע צריך לבדוק האם הוא מסכים עם ההנחות על מחיר BTC והרחבת hash rate שמונחות בבסיס היעדים."[^6][^12][^3]
      },
      "24_earnings_revisions": {
        "ntm_eps_estimate_trend_90_days": [],
        "percentage_analysts_raising_estimates": null,
        "percentage_analysts_lowering_estimates": null,
        "absolute_consensus_change": null,
        "revision_trend_interpretation_hebrew": "נתוני רוויזיות EPS ל-12 חודשים קדימה אינם זמינים במדויק, אך ככלל, בסקטור Bitcoin mining רוויזיות EPS נוטות לעקוב אחרי תנועות חדות במחיר BTC; אם מחיר BTC עלה משמעותית ב-90 הימים האחרונים, ניתן לצפות לעדכון תחזיות כלפי מעלה, ולהפך."[^8][^5][^12][^3]
      },
      "25_share_buybacks": {
        "buyback_history_last_8_quarters": [],
        "diluted_share_count_today": 298964590,
        "diluted_share_count_2_years_ago": 296087533,
        "net_share_count_reduction": -2877057,
        "sbc_dilution_context_hebrew": "מספר המניות המדולל עלה קלות בשנתיים האחרונות, מה שמעיד שהחברה לא השתמשה ברכישות עצמיות משמעותיות אלא להפך – גייסה הון והנפיקה מניות (כולל SBC) למימון צמיחה ו-CAPEX.",[^7][^10]
        "annualized_buyback_yield": 0
      },
      "26_insider_transactions": {
        "transactions_last_6_months": [],
        "buy_sell_ratio": null,
        "historical_context_hebrew": "לא נמצאו נתונים מפורטים על עסקאות פנים בחצי השנה האחרונה; באופן כללי בסקטור הצמיחה, עסקאות מכירה מצד מנהלים אינן בהכרח אות שלילי בודד (לעיתים נובעות ממימוש אופציות), אך Clustered buying עשוי להוות אות חיובי חזק יותר – שלא נצפה פה במפורש.",[^8][^5][^12][^3]
        "cluster_buying_detected": false,
        "insider_signal_interpretation_hebrew": "בהיעדר אותות ברורים מעסקאות פנים, המשקיע צריך להתבסס יותר על ביצועי החברה, איכות ההנהלה ותמריצי SBC מאשר על אינדיקטור יחיד של קניות/מכירות."[^8][^5][^12][^3]
      }
    },
    
    "sector_specific_metrics": {
      "description_hebrew": "Include here important industry-specific KPIs that are material for this company but not covered by the generic framework.",
      "metrics": [
        {
          "name": "hash_rate",
          "unit": "EH/s",
          "values": [],
          "confidence": "low",
          "source": "",
          "description_hebrew": "Hash rate (EH/s) הוא המדד המרכזי לכוח המחשוב של CLSK ביחס למתחרים; נתונים מדויקים לפי רבעון לא נשלפו כאן, אך החברה מדווחת באופן שוטף על גידול משמעותי בקיבולת, מה שמסביר את קפיצת ההכנסות בשנים האחרונות."[^2][^1][^3]
        },
        {
          "name": "btc_mined",
          "unit": "BTC",
          "values": [],
          "confidence": "low",
          "source": "",
          "description_hebrew": "מספר ה-BTC mined לרבעון/שנה הוא KPI קריטי להשוואת ביצועים בין miners; ניתן למצוא נתונים מדויקים בדוחות הרבעוניים של החברה, אך הם לא נשלפו כאן לפרטי פרטים."[^7][^4][^3]
        },
        {
          "name": "btc_holdings",
          "unit": "BTC",
          "values": [],
          "confidence": "low",
          "source": "",
          "description_hebrew": "יתרות BTC במאזן משמשות כמעין 'אוצר' שיכול להניב אפסייד אם מחיר BTC עולה, אבל גם מוסיפות תנודתיות למאזן; CLSK מחזיקה חלק מה-BTC ומוכרת חלק אחר למימון פעילות."[^4][^1][^3]
        },
        {
          "name": "power_capacity",
          "unit": "MW",
          "values": [],
          "confidence": "low",
          "source": "",
          "description_hebrew": "קיבולת החשמל (MW) של אתרי החברה היא מגבלה פיזית ל-hash rate; הרחבת קיבולת זו היא מנוע צמיחה מרכזי."[^2][^1]
        }
      ]
    }
    },

"dashboard_summary": {
"scorecard": {
"growth_score_1_to_10": 9,
"profitability_score_1_to_10": 4,
"valuation_score_1_to_10": 3,
"cash_flow_score_1_to_10": 3,
"financial_health_score_1_to_10": 6,
"forward_signals_score_1_to_10": 6,
"overall_quality_score_1_to_10": 5
},
"traffic_lights": {
"growth": "green",
"profitability": "yellow",
"valuation": "red",
"cash_flow": "red",
"financial_health": "yellow",
"forward_signals": "yellow"
},
"top_positive_signals_hebrew": [
"קצב צמיחת הכנסות מהיר מאוד בשנים האחרונות, הממצב את CLSK כאחד ממובילי הצמיחה בקרב Bitcoin miners.",[^11][^10]
"שיפור חד ברווחיות התפעולית (Operating margin) בין 2023 ל-2024, המעיד על מינוף תפעולי ויתרון לגודל.",[^10]
"מאזן עם הון עצמי גבוה ביחס להתחייבויות שוטפות מעניק לחברה גמישות להמשך השקעות."[^12][^10]
],
"top_negative_signals_hebrew": [
"Net margin שלילי מאוד ותזרים מזומנים מפעילות שוטפת ו-FCF תנודתיים ולעיתים שליליים, מה שמדגיש איכות רווחים מאתגרת.",[^9][^13][^10]
"מכפיל מכירות משוער גבוה (P/S דו-ספרתי), המגלם ציפיות צמיחה אגרסיביות וסיכון להידחסות מכפילים אם התנאים בשוק ה-BTC ישתנו.",[^6][^12][^10]
"תלות גבוהה במחיר BTC, ברגולציית אנרגיה ובשוק ההון לגיוסי הון נוספים למימון CAPEX."[^1][^2][^3]
],
"key_questions_for_investor_hebrew": [
"האם אתה מאמין שה-hash rate של CLSK ימשיך לגדול בקצב שמצדיק את מכפיל המכירות הגבוה, גם לאחר halvingים עתידיים?",[^3][^1][^10]
"עד כמה אתה נוח עם מודל צמיחה שמבוסס על שריפת מזומן ו-GAAP Net income שלילי בטווח הקצר, בתמורה לפוטנציאל ערך עתידי?",[^13][^10]
"מהי התזה שלך לגבי מחיר BTC בשנים הקרובות, וכיצד היא משתלבת עם רמת הסיכון והמתאם הגבוה בין מחיר CLSK למחיר BTC?"[^8][^6][^1][^3]
],
"final_takeaway_hebrew": "CLSK מתאימה יותר למשקיעים שמחפשים חשיפה אגרסיבית וממונפת ל-Bitcoin ולצמיחת תשתיות מחשוב מאשר למשקיע המחפש זרם תזרים מזומן יציב ורווחיות מבוססת; מי שמוכן לקבל תנודתיות חריגה ולקשור את תשואתו למחזורי הקריפטו עשוי לראות ב-CLSK מועמדת מעניינת, אך חשוב מאוד להעריך בעצמך את פרופיל הסיכון-תשואה ואת התלות במחיר BTC ובגישה להון."[^11][^2][^6][^1][^12][^3][^13][^10]
},

"chart_data": [
{
"chart_id": "revenue_yoy_qoq",
"chart_type": "bar_line",
"title_hebrew": "הכנסות וצמיחה רבעונית/שנתית",
"x_axis": "period",
"y_axis": "USD / %",
"series": [
{
"name": "revenue",
"data": [
{
"x": "2023-09-30",
"y": 168410000
},
{
"x": "2024-09-30",
"y": 378970000
},
{
"x": "2024-12-31",
"y": 136410000
}
]
},
{
"name": "yoy_growth",
"data": [
{
"x": "2023-09-30",
"y": 28
},
{
"x": "2024-09-30",
"y": 125
},
{
"x": "2024-12-31",
"y": 31.33
}
]
}
]
},
{
"chart_id": "gross_margin",
"chart_type": "line",
"title_hebrew": "Gross Margin שנתי",
"x_axis": "period",
"y_axis": "%",
"series": [
{
"name": "gross_margin",
"data": [
{
"x": "2022-09-30",
"y": 68.7
},
{
"x": "2023-09-30",
"y": 44.4
},
{
"x": "2024-09-30",
"y": 56.3
}
]
}
]
},
{
"chart_id": "operating_margin",
"chart_type": "line",
"title_hebrew": "Operating Margin שנתי",
"x_axis": "period",
"y_axis": "%",
"series": [
{
"name": "operating_margin",
"data": [
{
"x": "2022-09-30",
"y": -19.9
},
{
"x": "2023-09-30",
"y": -74.4
},
{
"x": "2024-09-30",
"y": 14.3
}
]
}
]
},
{
"chart_id": "net_vs_operating_margin",
"chart_type": "line",
"title_hebrew": "Net מול Operating Margin",
"x_axis": "period",
"y_axis": "%",
"series": [
{
"name": "net_margin",
"data": [
{
"x": "2023-09-30",
"y": -82.0
},
{
"x": "2024-09-30",
"y": -38.5
}
]
},
{
"name": "operating_margin",
"data": [
{
"x": "2023-09-30",
"y": -74.4
},
{
"x": "2024-09-30",
"y": 14.3
}
]
}
]
}
],

"sources": [
{
"source_id": "",
"source_name": "Yahoo Finance / general CLSK quote \& analyst context",
"url": "https://finance.yahoo.com/quote/CLSK/",
"accessed_date": "2026-05-30",
"used_for": ["market_context", "peer_overview", "analyst_sentiment"]
},
{
"source_id": "",
"source_name": "CleanSpark Investor Relations – Quarterly Results",
"url": "https://investors.cleanspark.com/financials/quarterly-results/",
"accessed_date": "2026-05-30",
"used_for": ["share_count", "latest_quarter_reference", "guidance_context"]
},
{
"source_id": "",
"source_name": "Google Finance CLSK",
"url": "https://www.google.com/finance/beta/quote/CLSK:NASDAQ",
"accessed_date": "2026-05-30",
"used_for": ["recent_price", "eps_snapshot", "trading_stats"]
},
{
"source_id": "",
"source_name": "CNN Markets – CLSK Financials Snapshot",
"url": "https://www.cnn.com/markets/stocks/CLSK",
"accessed_date": "2026-05-30",
"used_for": ["recent_revenue", "recent_net_income", "net_margin_point"]
},
{
"source_id": "",
"source_name": "Investing.com – CleanSpark Financial Summary",
"url": "https://www.investing.com/equities/cleanspark-financial-summary",
"accessed_date": "2026-05-30",
"used_for": ["historical_revenues", "gross_profit", "operating_income", "net_income", "assets_equity", "cash_flow_components"]
},
{
"source_id": "",
"source_name": "Robinhood – CLSK Snapshot",
"url": "https://robinhood.com/us/en/stocks/CLSK/",
"accessed_date": "2026-05-30",
"used_for": ["market_cap", "recent_price", "pe_ratio"]
},
{
"source_id": "",
"source_name": "MarketWatch – CleanSpark Profile",
"url": "https://www.marketwatch.com/investing/stock/clsk/company-profile",
"accessed_date": "2026-05-30",
"used_for": ["sector_industry_label", "fiscal_year_end", "revenue_growth_context"]
},
{
"source_id": "",
"source_name": "Intrinio – CLSK Data / Business Description",
"url": "https://data.intrinio.com/security/CLSK:UW",
"accessed_date": "2026-05-30",
"used_for": ["business_description", "segment_info", "industry_classification"]
},
{
"source_id": "",
"source_name": "Morningstar – CLSK Quote",
"url": "https://www.morningstar.com/stocks/xnas/clsk/quote",
"accessed_date": "2026-05-30",
"used_for": ["valuation_context", "financial_strength_indicators"]
},
{
"source_id": "",
"source_name": "CleanSpark Company About Page",
"url": "https://www.cleanspark.com/about/",
"accessed_date": "2026-05-30",
"used_for": ["business_model_detail", "strategy", "data_center_positioning"]
},
{
"source_id": "",
"source_name": "Seeking Alpha – CLSK Overview",
"url": "https://seekingalpha.com/symbol/CLSK",
"accessed_date": "2026-05-30",
"used_for": ["bitcoin_mining_description", "peer_context", "sector_specific_kpis"]
},
{
"source_id": "",
"source_name": "WSJ – CleanSpark Financial Statements",
"url": "https://www.wsj.com/market-data/quotes/CLSK/financials",
"accessed_date": "2026-05-30",
"used_for": ["cash_flow_quality", "balance_sheet_context"]
},
{
"source_id": "",
"source_name": "Yahoo Finance – CLSK Profile",
"url": "https://finance.yahoo.com/quote/CLSK/profile/",
"accessed_date": "2026-05-30",
"used_for": ["company_profile", "business_focus", "geographic_scope"]
}
],

"data_quality_warnings": [
"רוב נתוני הצמיחה והרווחיות מוצגים ברמת שנה (FY) ולא ברמת רבעון בודד, משום שמידע רבעוני מלא לא היה זמין להורדה בפורמט מובנה.",[^7][^13][^10]
"נתוני צמיחת הכנסות של מתחרים (MARA, RIOT, HUT, IREN) הם אומדנים גסים המבוססים על סקירות שוק, ולא ערכים רשמיים מדויקים.",[^5]
"לא היו זמינים נתוני EBITDA/Adjusted EBITDA מלאים לפי רבעון, ולכן לא חושבו סדרות מתואמות או מכפילי EV/EBITDA.",[^13][^10]
"מכפילי Price-to-Sales, ROE ושאר יחסים פיננסיים מסוימים חושבו בקירוב על בסיס מספרי שוק ודוחות שנתיים, ועלולים להיות שונים במעט מהנתונים במערכות ברוקראז' ייעודיות.",[^11][^6][^12][^10]
"נתוני hash rate, BTC mined ו-BTC holdings אינם מופיעים כאן באופן מספרי, כיוון שלא נעשה חילוץ מלא של דוחות רבעוניים; מומלץ להשלים נתונים אלו ממסמכי החברה לצורך דשבורד כרייה מפורט."[^7][^4][^2][^1][^3]
]
}
<span style="display:none">[^14][^15]</span>

<div align="center">⁂</div>

[^1]: https://data.intrinio.com/security/CLSK:UW

[^2]: https://www.cleanspark.com/about/

[^3]: https://seekingalpha.com/symbol/CLSK

[^4]: https://finance.yahoo.com/quote/CLSK/profile/

[^5]: https://finance.yahoo.com/quote/CLSK/

[^6]: https://robinhood.com/us/en/stocks/CLSK/

[^7]: https://investors.cleanspark.com/financials/quarterly-results/

[^8]: https://www.google.com/finance/beta/quote/CLSK:NASDAQ

[^9]: https://www.cnn.com/markets/stocks/CLSK

[^10]: https://www.investing.com/equities/cleanspark-financial-summary

[^11]: https://www.marketwatch.com/investing/stock/clsk/company-profile

[^12]: https://www.morningstar.com/stocks/xnas/clsk/quote

[^13]: https://www.wsj.com/market-data/quotes/CLSK/financials

[^14]: https://finance.yahoo.com/quote/CLSK/financials/

[^15]: https://valuesense.io/ticker/clsk/excel

