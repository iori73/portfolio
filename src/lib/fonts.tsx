'use client';
import { useLocale } from 'next-intl';

/**
 * Font utility hooks for language-specific typography
 * Separated from translation logic for better maintainability
 */

/**
 * Hook for responsive font sizing with optional Japanese-specific sizes
 * @param mobileBaseClass - Mobile font size class for English
 * @param desktopBaseClass - Desktop font size class for English
 * @param mobileJpClass - Optional mobile font size class for Japanese (defaults to mobileBaseClass)
 * @param desktopJpClass - Optional desktop font size class for Japanese (defaults to desktopBaseClass)
 * @returns Tailwind class string with responsive sizing
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
      // Japanese-specific sizes or fallback to base
      const jpMobile = mobileJpClass || mobileBaseClass;
      const jpDesktop = desktopJpClass || desktopBaseClass;
      return `${jpMobile} md:${jpDesktop}`;
    }
    return `${mobileBaseClass} md:${desktopBaseClass}`;
  };

  return { jpFontSize };
};

/**
 * Hook for language-appropriate body text fonts
 * English: Helvetica Neue Regular (400)
 * Japanese: Noto Sans JP Light (300)
 * @returns Font class string based on current locale
 */
export const useBodyFont = () => {
  const locale = useLocale();

  const getBodyFontClass = () => {
    if (locale === 'jp') {
      return 'font-noto-sans-jp font-light';
    }
    return 'font-helvetica-neue';
  };

  // Deprecated: Returns undefined for backward compatibility
  const getBodyFontStyle = () => {
    return undefined;
  };

  return { getBodyFontClass, getBodyFontStyle };
};

/**
 * Hook for language-appropriate heading fonts
 * English: Helvetica Neue Medium (500) - via @layer base in globals.css
 * Japanese: Noto Sans JP Medium (500)
 * @returns Font class string based on current locale
 */
export const useHeadingFont = () => {
  const locale = useLocale();

  const getHeadingFontClass = () => {
    if (locale === 'jp') {
      return 'font-noto-sans-jp font-medium';
    }
    // English uses @layer base defaults from globals.css
    return '';
  };

  // Deprecated: Returns undefined for backward compatibility
  const getHeadingFontStyle = () => {
    return undefined;
  };

  return { getHeadingFontClass, getHeadingFontStyle };
};

