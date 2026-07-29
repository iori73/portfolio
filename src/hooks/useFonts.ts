'use client';
import { useLocale } from 'next-intl';
// The locale → font-class rules live in src/cv/fontClasses.ts as pure functions
// so the print/PDF tree (server components, no hooks) applies the same mapping.
import { bodyFontClass, headingFontClass } from '@/src/cv/fontClasses';

/**
 * Hook for responsive font sizing with optional language-specific sizes
 * @param mobileBaseClass - Font size class for mobile (English)
 * @param desktopBaseClass - Font size class for desktop (English)
 * @param mobileJpClass - Optional font size class for mobile (Japanese)
 * @param desktopJpClass - Optional font size class for desktop (Japanese)
 * @returns Tailwind classes string for responsive font sizing
 */
export const useJPFontSize = () => {
  const locale = useLocale();

  const jpFontSize = (
    mobileBaseClass: string,
    desktopBaseClass: string,
    mobileJpClass?: string,
    desktopJpClass?: string,
  ) => {
    if (locale === 'jp') {
      // Use Japanese-specific classes if provided, otherwise fall back to English sizes
      const jpMobile = mobileJpClass || mobileBaseClass;
      const jpDesktop = desktopJpClass || desktopBaseClass;
      return `${jpMobile} md:${jpDesktop}`;
    }
    return `${mobileBaseClass} md:${desktopBaseClass}`;
  };

  return { jpFontSize };
};

/**
 * Hook for getting language-appropriate body font classes
 * @returns Object with getBodyFontClass function
 */
export const useBodyFont = () => {
  const locale = useLocale();

  // Body font class based on language (English: Helvetica Neue, Japanese: Noto Sans JP Light)
  const getBodyFontClass = () => bodyFontClass(locale === 'jp' ? 'jp' : 'en');

  // Deprecated: kept for backward compatibility
  const getBodyFontStyle = () => {
    return undefined;
  };

  return { getBodyFontClass, getBodyFontStyle };
};

/**
 * Hook for getting language-appropriate heading font classes
 * @returns Object with getHeadingFontClass function
 */
export const useHeadingFont = () => {
  const locale = useLocale();

  // Heading font class based on language (English: default from @layer base, Japanese: Noto Sans JP Medium)
  const getHeadingFontClass = () => headingFontClass(locale === 'jp' ? 'jp' : 'en');

  // Deprecated: kept for backward compatibility
  const getHeadingFontStyle = () => {
    return undefined;
  };

  return { getHeadingFontClass, getHeadingFontStyle };
};

