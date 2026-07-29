import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  // Skip all internal paths (_next), API routes, and static assets.
  // `print` is excluded so /print/<locale>/... resolves to app/print/ instead of
  // being rewritten into the [locale] tree (which would 404 via [...rest]).
  // The print tree passes its locale explicitly, so it needs no middleware.
  matcher: ['/((?!api|print|_next|_vercel|.*\\..*).*)', '/']
};
