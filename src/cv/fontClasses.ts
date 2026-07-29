// Locale → font class mapping, as pure functions so server components (the
// print tree) can use the same rules as the client-side useFonts hook.
// src/hooks/useFonts.ts delegates here, keeping the CLAUDE.md rule that font
// styles live in one place rather than as inline fontFamily styles.

export function bodyFontClass(lang: 'en' | 'jp'): string {
  return lang === 'jp' ? 'font-noto-sans-jp font-light' : 'font-helvetica-neue';
}

export function headingFontClass(lang: 'en' | 'jp'): string {
  // EN headings inherit Switzer from the @layer base h1–h6 rule in globals.css.
  return lang === 'jp' ? 'font-noto-sans-jp font-medium' : '';
}
