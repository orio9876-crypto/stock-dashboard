TICKER:

The attached Perplexity Markdown data pack is the primary and only data source for this update.

I am attaching a Perplexity Markdown data pack for the ticker written above.

Update or add this ticker in the local stock-analysis dashboard using the attached data pack.

Do not start by editing files.

First:
1. Read the full Perplexity Markdown data pack.
2. Inspect the existing project structure.
3. Inspect existing company data files and snapshot schema.
4. Run a data audit.
5. Only then update files.

Critical rules:

- Do not use the internet.
- Do not invent data.
- Do not fill missing values with assumptions.
- Do not use 0 for missing values.
- Do not mix data between tickers.
- Do not copy data from any other company into this ticker.
- Do not change the design unless required to display data quality correctly.
- Do not break existing companies.
- Do not break old snapshots.
- Do not break mobile.
- Do not break RTL.
- Do not deploy unless explicitly asked.

Pre-flight:

Run:

```bash
git status
```

Then inspect:
- current branch
- changed files
- uncommitted changes
- company registry
- existing snapshots
- current snapshot schema
- data loader behavior
- validation scripts
- sanity scripts

If the ticker already exists:
- create a new snapshot using the Perplexity report date
- keep old snapshots as history
- update current.json to the new snapshot
- update companyRegistry metadata if needed

If the ticker does not exist:
- create a company folder
- create company.json
- create current.json
- create the first snapshot
- register the company in companyRegistry
- add a peer group only if reliable peer data exists

Before integration, audit the Perplexity data pack.

Look for:
- contradictions between tables and JSON
- conflicting values from different sources
- formulas that do not match values
- estimated values described as complete
- secondary-source values marked too confidently
- annual / quarterly / TTM / monthly / point-in-time mixing
- missing source dates
- placeholder text
- assumptions disguised as data
- null / undefined / NaN / fake zero risks
- accounting distortions
- one-time items
- incomplete sector KPIs
- peer comparison values that were not actually researched

For every red flag:
- preserve it in data_quality_warnings
- mark the affected KPI as partial / estimated / missing / n/a
- explain it in Hebrew in the UI

If the data pack contains a conflict:
- do not choose one value unless clearly supported
- show both values if useful
- mark the KPI as partial/conflict in notes
- explain what needs manual verification

Data quality statuses:

Use exactly these statuses:

```text
complete
partial
missing
estimated
n/a
```

Definitions:

```text
complete = reliable, available, consistent, and period/frequency is clear.
partial = available but incomplete, conflicting, secondary-only, or not full-period.
missing = not found or not disclosed.
estimated = calculated or inferred; formula must be shown.
n/a = not meaningful or not applicable.
```

Every KPI must also include:

```text
confidence: high / medium / low
```

Rules:
- Primary-source financial statement data can be high confidence.
- Secondary-source data should usually be medium or low unless cross-verified.
- Estimated values should usually not be high confidence.
- Conflicting data should not be complete.
- Negative P/E or EV/EBITDA should usually be n/a if not analytically meaningful.
- Every non-complete KPI must show a Hebrew explanation in the UI.

Frequency rules:

- Do not mix annual and quarterly in the same trend chart.
- Do not mix TTM and quarterly in the same trend chart.
- Do not show one data point as a trend.
- Do not show estimated values as official values.
- If estimated points are included, label them clearly or show them in a separate table.
- If there are not enough points for a chart, show a missing/partial state instead of a misleading chart.

Dashboard structure required:

Company header:
- ticker
- company name
- exchange
- sector
- industry
- latest reported period
- report date
- stock price if available
- market cap if available
- overall score

Scorecard:
- growth
- profitability
- valuation
- cash flow
- financial health
- forward signals
- overall quality score

Narrative sections:
- Executive Summary
- Bull Case
- Bear Case
- Key Risks
- Key Opportunities
- What to Watch Next Quarter
- Bottom Line
- Company Profile
- Revenue Drivers
- Products / Services
- Geographic Exposure
- Customer Segments
- Competitive Positioning

Narrative rules:
- Do not make strong claims unsupported by data.
- Use cautious wording when data is partial.
- Mention material accounting distortions.
- Mention major conflicts.
- Do not write promotional language.
- Do not copy narrative from another company.

Build or update the 26 KPI sections:

Layer 01 — Profitability:
01 Revenue Growth
02 Gross Margin
03 Operating Margin
04 Net Margin
05 EPS Beat / Miss History
06 Adjusted EBITDA

Layer 02 — Valuation:
07 Trailing P/E
08 Forward P/E
09 Price-to-Sales
10 EV/EBITDA
11 PEG Ratio
12 Price-to-Book

Layer 03 — Cash Flow:
13 Operating Cash Flow
14 Free Cash Flow
15 FCF Margin
16 FCF Yield

Layer 04 — Financial Health:
17 Debt-to-Equity
18 Net Cash / Net Debt Position
19 Current Ratio
20 Return on Equity / DuPont
21 ROIC

Layer 05 — Forward Signals:
22 Management Guidance
23 Analyst Consensus
24 Earnings & Price Target Revisions
25 Share Buybacks / Dilution
26 Insider Transactions

Each KPI should include where relevant:
- title
- data_quality
- confidence
- description
- tables
- charts
- peer comparison if reliable
- trend
- interpretation
- missing data notes
- source notes
- calculation formula

Add sector-specific KPIs based on the company's industry.

Examples:

Bitcoin miner:
- BTC produced monthly
- BTC produced annual
- operational hashrate
- average operating hashrate
- fleet efficiency
- deployed fleet count
- cost to mine BTC
- energy cost per kWh
- power capacity
- BTC holdings
- BTC sold vs held
- global hashrate share
- mining utilization proxy
- data center locations
- AI/HPC status
- peer hashrate ranking

Semiconductor / AI infrastructure:
- data center revenue
- segment revenue split
- accelerator demand
- export control exposure
- customer concentration
- R&D intensity
- SBC expense
- buyback run-rate

SaaS:
- ARR
- NRR
- gross retention
- churn
- RPO
- billings
- Rule of 40
- CAC payback

Bank:
- NIM
- CET1
- loan growth
- deposit growth
- NPL ratio
- provision expense
- efficiency ratio
- tangible book value

Retail:
- same-store sales
- store count
- inventory turnover
- traffic
- average ticket
- e-commerce penetration

If sector-specific metrics are unavailable, show missing. Do not invent them.

Sources and warnings:

Add or update:
- data_quality_warnings
- sources
- missing_metrics

Warnings should include:
- accounting distortions
- one-time items
- fair-value accounting
- conflicts
- source limitations
- missing periods
- secondary-source dependence
- peer comparison gaps
- valuation caveats

UI rules:

Preserve existing design.

Allowed UI changes:
- data quality badge
- tooltip
- short explanatory note
- missing state
- estimated/calculated marker
- source note
- warning box

Do not:
- redesign the dashboard
- change colors broadly
- change layout
- break RTL
- break mobile
- remove existing companies
- remove old snapshots unless instructed

Charts:
- no misleading empty chart
- no annual/quarterly/TTM mixing
- no trend with only one point
- estimated points must be labeled
- missing values must not appear as zero

Tables:
- no undefined
- no NaN
- no fake zero
- missing cells should show "חסר נתון" or "—" with explanation
- calculated values should show "מחושב"
- n/a values should show "לא רלוונטי"

After updating, run:

```bash
npm run validate
npm run sanity
npm run build
npm run lint
```

If npm run lint does not exist, report that it does not exist.

Manual checks:
1. Open the company page for the ticker.
2. Confirm the latest snapshot date is selected.
3. Go through all 5 tabs:
   - רווחיות
   - תמחור
   - תזרים מזומנים
   - איתנות פיננסית
   - אותות צופי פני עתיד
4. Confirm all 26 KPIs appear.
5. Confirm data-quality statuses display correctly.
6. Confirm sector-specific KPIs display correctly.
7. Confirm missing/partial/estimated/n/a are clearly marked.
8. Confirm no undefined, null, NaN, or fake zeros appear.
9. Confirm charts do not mix annual/quarterly/TTM.
10. Confirm old snapshots still work if applicable.
11. Confirm other companies still load.
12. Confirm no data from this ticker leaks into another ticker.
13. Confirm mobile and desktop layouts are intact.
14. Check browser console errors.

Final report in Hebrew must include:

1. Which files changed.
2. Whether this was a new ticker or updated ticker.
3. Snapshot date created/updated.
4. What data was added.
5. What remained missing.
6. What was marked partial.
7. What was marked estimated.
8. What was marked n/a.
9. What conflicts were found in the Perplexity data.
10. How conflicts were handled.
11. Whether manual verification is still required.
12. Whether existing companies remained unchanged.
13. Test commands run and results.
14. Local preview URL.
15. Direct URL to the ticker page.
16. Recommendations for additional research.

Final reminder:
Do not optimize for looking complete. Optimize for being correct, transparent, and source-aware.

If a value is questionable, mark partial.
If a value is not found, mark missing.
If a metric is not meaningful, mark n/a.
If a value is calculated, mark estimated and show the formula.
Do not deploy unless explicitly instructed.
