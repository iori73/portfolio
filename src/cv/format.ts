// Date formatting shared by the /cv page and the print/PDF tree.
// Pure functions with no React and no 'use client', so server components can
// use them too.

const MONTH_NAMES_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/** "2024-07" → "July 2024" / "2024年7月" */
export function formatDate(dateStr: string, lang: 'en' | 'jp'): string {
  const [year, month] = dateStr.split('-');
  return lang === 'en'
    ? `${MONTH_NAMES_EN[parseInt(month) - 1]} ${year}`
    : `${year}年${parseInt(month)}月`;
}

/** "2024-07" + "2025-01" → "July 2024 - January 2025" */
export function formatDateRange(
  startDate: string,
  endDate: string | 'Present',
  lang: 'en' | 'jp',
): string {
  const start = formatDate(startDate, lang);
  const end = endDate === 'Present' ? (lang === 'en' ? 'Present' : '現在') : formatDate(endDate, lang);
  return `${start} - ${end}`;
}

/** Same as formatDateRange, but collapses a single-month period to one side. */
export function formatProjectPeriod(
  period: { start: string; end: string | 'Present' },
  lang: 'en' | 'jp',
): string {
  const range = formatDateRange(period.start, period.end, lang);
  return period.start === period.end ? range.split(' - ')[0] : range;
}
