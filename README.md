# דאשבורד ניתוח מניות

כלי פנימי מקומי לניתוח מניות, המאגד נתונים פיננסיים מובְנים של חברות ציבוריות
ומציג אותם בדאשבורד אחד בעברית (RTL). המערכת בנויה כך שתתמוך בהוספת חברות רבות
לאורך זמן — כל חברה נוספת דרך שכבת הנתונים בלבד, ללא שינוי בקוד הרכיבים.

מקור האמת לכל חברה הוא קובץ JSON שמופק ב‑Perplexity (איסוף נתונים בלבד) ומיובא
לתוך שכבת הנתונים. **המערכת לא מושכת נתונים פיננסיים חיים ולא ממציאה נתונים.**

---

## דרישות מוקדמות

- Node.js 18+ (פותח ונבדק על Node 24)
- npm

התקנת תלויות (פעם אחת):

```bash
npm install
```

---

## פקודות npm

| פקודה | מה היא עושה |
| --- | --- |
| `npm run dev` | מריץ את הדאשבורד מקומית עם Vite (ברירת מחדל: http://localhost:5173) |
| `npm run build` | בונה גרסת production לתיקיית `dist/` |
| `npm run validate` | מריץ ולידציה על כל ה‑snapshots (סכמה, 26 KPIs, 5 שכבות וכו') |
| `npm run import -- <file>` | מייבא חברה מקובץ Perplexity (`.md` או `.json`) לשכבת הנתונים |
| `npm run sanity` | בדיקת sanity: שכל חברה תופיע בבית, העמוד נפתח, 5 הטאבים קיימים, ואזהרת גרף חסר מוגדרת |
| `npm run preview` | תצוגה מקדימה של תוצרי ה‑build |

---

## הרצה מקומית

```bash
npm install
npm run dev
```

פותחים את הכתובת שמודפסת בטרמינל (בדרך כלל http://localhost:5173).

- **מסך הבית** — כל החברות ככרטיסים, עם חיפוש וסינון לפי טיקר, שם חברה, סקטור
  וסטטוס רמזור.
- **עמוד חברה** — כותרת עם רמזורים וציון כולל, כרטיס ציונים, תקציר מנהלים, חמש
  שכבות ניתוח (טאבים), וסעיף מקורות ואיכות נתונים בתחתית.

---

## ייבוא חברה חדשה מקובץ Perplexity

1. הפק את ה‑JSON של החברה ב‑Perplexity לפי הסכמה שב‑[docs/DATA_SCHEMA.md](docs/DATA_SCHEMA.md).
2. שמור את הפלט כקובץ בתיקיית הפרויקט (למשל `NVDA.md` או `NVDA.json`).
3. הרץ:

   ```bash
   npm run import -- NVDA.md
   ```

   הסקריפט:
   - מנקה סימוני ציטוט של Perplexity (כמו `[^1]`) ותווי escape לא חוקיים (כמו `\&`).
   - מאתר את ה‑JSON של הנתונים בתוך הקובץ.
   - קורא `ticker` ו‑`as_of_date` מתוך `meta`.
   - שומר את ה‑snapshot, מעדכן את `current.json`, יוצר `company.json`, ומוסיף את
     הטיקר ל‑`companyRegistry.json`.

4. ודא תקינות:

   ```bash
   npm run validate
   npm run sanity
   ```

5. הרץ מחדש את הדאשבורד (אם אינו רץ) וודא שהחברה מופיעה במסך הבית:

   ```bash
   npm run dev
   ```

> אם לא מעבירים נתיב קובץ, `npm run import` ינסה לייבא כל קובץ `.md`/`.json`
> בשורש הפרויקט. עדיף תמיד לציין קובץ ספציפי.

---

## ולידציה

```bash
npm run validate
```

הבדיקה עוברת על כל snapshot ומוודאת:

1. קיום `ticker`, `company_name`, `as_of_date`
2. קיום כל 5 השכבות (`profitability`, `valuation`, `cash_flow`, `financial_health`, `forward_signals`)
3. קיום כל 26 סעיפי ה‑KPI
4. קיום `sources` כמערך
5. קיום `dashboard_summary` ו‑`traffic_lights`
6. קיום `chart_data` כמערך (גם אם ריק)
7. קיום `data_quality_warnings` כמערך (גם אם ריק)

אם ולידציה נכשלת — הפקודה מסתיימת בקוד שגיאה ומפרטת אילו שדות חסרים. בנוסף,
הדאשבורד עצמו מציג אזהרת ולידציה בראש עמוד החברה כשחסרים שדות נדרשים.

הכללים מוגדרים פעם אחת ב‑`src/data/validateSnapshot.js` ומשותפים בין סקריפט
הוולידציה לבין ה‑UI, כך שהם לעולם לא מתפצלים.

---

## מבנה התיקיות

```
src/
  data/
    companies/
      <TICKER>/
        company.json          # זהות סטטית: ticker, שם, סקטור, תעשייה, בורסה
        current.json          # מצביע ל-snapshot העדכני ביותר
        snapshots/
          <AS_OF_DATE>.json   # ה-JSON המלא מ-Perplexity לאותו תאריך
    companyRegistry.json      # רשימת כל הטיקרים שנוספו
    peerGroups.json           # קבוצות בנות-השוואה לשימוש חוזר
    sectorBenchmarks.json     # חציוני סקטור (fallback אופציונלי)
    index.js                  # שכבת טעינת הנתונים (מגלה חברות אוטומטית)
    validateSnapshot.js       # כללי הוולידציה המשותפים
  components/                 # רכיבים לשימוש חוזר (מקבלים data ב-props)
  pages/                      # HomePage, CompanyPage
  utils/                      # פורמט, תוויות, עזרי גרפים
scripts/
  importCompany.mjs           # npm run import
  validate.mjs                # npm run validate
  sanity.mjs                  # npm run sanity
docs/
  DATA_SCHEMA.md              # מבנה ה-JSON הנדרש מ-Perplexity
```

שכבת הנתונים (`src/data/index.js`) מגלה את כל החברות אוטומטית באמצעות
`import.meta.glob`, כך שהוספת חברה היא רק עניין של הפלת קבצים תחת
`companies/<TICKER>/` (מה שסקריפט הייבוא עושה). אף רכיב אינו מקודד לטיקר מסוים.

---

## ההבדל בין `current.json` ל‑`snapshots/`

- **`snapshots/<AS_OF_DATE>.json`** — ה‑JSON המלא של הניתוח עבור תאריך מסוים.
  זוהי ההיסטוריה: כל ייבוא חדש מוסיף קובץ snapshot חדש, **ו‑snapshots ישנים
  לעולם לא נמחקים**. כך אפשר בעתיד להשוות בין תקופות ניתוח של אותה חברה.

- **`current.json`** — קובץ קטן שמצביע ל‑snapshot העדכני ביותר, למשל:

  ```json
  { "latest_snapshot": "2026-05-30", "updated_at": "2026-05-30T12:00:00.000Z" }
  ```

  הדאשבורד מציג כברירת מחדל את ה‑snapshot שאליו `current.json` מצביע. בעמוד
  החברה יש בורר תאריכים שמאפשר לעבור בין snapshots היסטוריים כשקיים יותר מאחד.

> כדי לעדכן חברה קיימת עם ניתוח חדש: מייבאים קובץ Perplexity חדש עם `as_of_date`
> מאוחר יותר. נוצר snapshot חדש, `current.json` מתעדכן אליו, וההיסטוריה נשמרת.
