# next-intl Migration Guide

**Date:** November 24, 2025  
**Status:** ✅ Completed

## Overview

Successfully migrated from custom i18n solution to [next-intl](https://next-intl-docs.vercel.app/) for better developer experience, type safety, and standard implementation.

## What Changed

### Before (Custom i18n)
- All translations in one massive file (`src/lib/i18n.tsx` ~1140 lines)
- No type safety for translation keys
- Font logic mixed with translations
- React Context-based with localStorage

### After (next-intl)
- Separate JSON files per language (`messages/en.json`, `messages/jp.json`)
- Type-safe translation keys (with autocomplete)
- Font hooks separated to `src/hooks/useFonts.ts`
- Next.js App Router integration with middleware
- Cookie-based locale storage

## File Structure

```
├── messages/
│   ├── en.json              # English translations
│   └── jp.json              # Japanese translations
├── i18n/
│   ├── request.ts           # Server-side configuration
│   └── routing.ts           # Routing configuration
├── middleware.ts            # Locale detection & routing
├── src/
│   ├── hooks/
│   │   └── useFonts.ts      # Font-related hooks (separated from i18n)
│   └── lib/
│       └── i18n.tsx.backup  # Old implementation (backed up)
```

## Key Changes

### 1. Translation Files

**English** (`messages/en.json`):
```json
{
  "navigation": {
    "experiment": "Experiment",
    "about": "About",
    "blog": "Blog"
  },
  "hero": {
    "name": "Iori Kawano",
    "description1": "Curiosity drives my work and life."
  }
}
```

**Japanese** (`messages/jp.json`):
```json
{
  "navigation": {
    "experiment": "実験",
    "about": "私について",
    "blog": "ブログ"
  },
  "hero": {
    "name": "Iori Kawano",
    "description1": "好奇心が私の仕事と人生を動かしています。"
  }
}
```

### 2. Component Usage

**Before:**
```tsx
import { useLanguage, useJPFontSize, useBodyFont } from '@/src/lib/i18n';

const { t, language } = useLanguage();
const { jpFontSize } = useJPFontSize();

{t('gymDashboardTitle')}
```

**After:**
```tsx
import { useTranslations, useLocale } from 'next-intl';
import { useJPFontSize, useBodyFont } from '@/src/hooks/useFonts';

const t = useTranslations('projects'); // with namespace
const locale = useLocale();
const { jpFontSize } = useJPFontSize();

{t('gymDashboard.title')}  // Nested keys with autocomplete
```

### 3. Language Switching

**Before:**
```tsx
const { language, setLanguage } = useLanguage();
<button onClick={() => setLanguage('jp')}>JP</button>
```

**After:**
```tsx
const locale = useLocale();
const router = useRouter();

const switchLocale = (newLocale: string) => {
  document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
  router.refresh();
};
<button onClick={() => switchLocale('jp')}>JP</button>
```

### 4. Font Hooks (Separated)

Font-related hooks are now in `src/hooks/useFonts.ts`:

```tsx
import { useJPFontSize, useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';

// These hooks still use locale internally via next-intl's useLocale()
const { jpFontSize } = useJPFontSize();
const { getBodyFontClass } = useBodyFont();
const { getHeadingFontClass } = useHeadingFont();
```

## Configuration

### Middleware (`middleware.ts`)

```ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(en|jp)/:path*'],
};
```

### Routing (`i18n/routing.ts`)

```ts
export const routing = defineRouting({
  locales: ['en', 'jp'],
  defaultLocale: 'en',
  localePrefix: 'as-needed', // No /en or /jp in URLs
});
```

### Next.js Config (`next.config.mjs`)

```js
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

export default withNextIntl(nextConfig);
```

## Migration Steps (Completed)

1. ✅ Installed next-intl
2. ✅ Created message files (en.json, jp.json)
3. ✅ Configured middleware and routing
4. ✅ Separated font hooks from translations
5. ✅ Migrated Homepage and tested
6. ✅ Migrated Header & Footer
7. ✅ Migrated all remaining pages
8. ✅ Backed up old i18n.tsx
9. ✅ Created documentation

## Pages Migrated

- ✅ Homepage (`app/page.tsx`)
- ✅ Header (`src/compositions/Header.tsx`)
- ✅ Footer (`src/compositions/Footer.tsx`)
- ✅ About (`app/about/page.tsx`)
- ✅ Blog (`app/blog/page.tsx`)
- ✅ Experiment (`app/experiment/page.tsx`)
- ✅ Experiment/Spline (`app/experiment/spline.tsx`)
- ✅ Not Found (`app/not-found.tsx`)
- ✅ About/Interests (`app/about/InterestsVisualization.tsx`)
- ✅ Gym Dashboard (`app/work/gym_crowd_status_dashboard/page.tsx`)
- ✅ Google UX Project (`app/work/google_ux_design_certificate_project/page.tsx`)

## Benefits

### For You (Developer)
- ✅ **Cleaner code**: Separate JSON files instead of 1140-line file
- ✅ **Type safety**: Autocomplete for translation keys
- ✅ **Better organization**: Namespaced translations (`projects.gymDashboard.title`)
- ✅ **Standard solution**: Any dev/AI knows next-intl

### For Future Development
- ✅ **Easier to add languages**: Just add `messages/fr.json`
- ✅ **Better for collaboration**: Standard tool, well-documented
- ✅ **Built-in features**: Pluralization, formatting, rich text
- ✅ **Server/Client support**: Works in both environments

## Testing

### Quick Test Checklist
1. Start dev server: `npm run dev`
2. Check homepage loads (both EN/JP text visible)
3. Test language switcher (EN ↔ JP)
4. Verify all pages load without errors
5. Check browser console for warnings

### Expected Behavior
- Homepage shows bilingual hero section
- Language switcher changes navigation items
- All project descriptions appear correctly
- No translation key errors in console
- Font rendering works for both languages

## Troubleshooting

### "Translation key not found" Error
- Check the key exists in `messages/en.json` and `messages/jp.json`
- Verify the namespace matches: `t('navigation.about')` needs `navigation` namespace

### Language not switching
- Check browser cookies for `NEXT_LOCALE`
- Verify middleware is configured correctly
- Try hard refresh (Cmd+Shift+R)

### Font not changing
- Font hooks use `useLocale()` from next-intl
- Verify `src/hooks/useFonts.ts` is imported correctly

## Rollback (if needed)

If you need to rollback:

1. Restore old i18n:
   ```bash
   mv src/lib/i18n.tsx.backup src/lib/i18n.tsx
   ```

2. Revert files (use git):
   ```bash
   git checkout HEAD -- app/ src/compositions/
   ```

3. Remove next-intl:
   ```bash
   npm uninstall next-intl
   rm -rf i18n/ messages/ middleware.ts
   ```

## Future Improvements

- [ ] Add locale switching with URL parameter support (optional)
- [ ] Implement server-side translations for better SEO
- [ ] Add TypeScript types for translation keys
- [ ] Consider using next-intl's date/number formatting
- [ ] Add unit tests for translations

## References

- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Next.js App Router Integration](https://next-intl-docs.vercel.app/docs/getting-started/app-router)
- [Migration Backup](src/lib/i18n.tsx.backup)

