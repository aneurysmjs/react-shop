/**
 * @see https://dev.to/yutakusuno/nextjs14-firebase-authentication-with-google-sign-in-using-cookies-middleware-and-server-actions-48h4
 */
import { type NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { DASHBOARD_ROUTE, SESSION_COOKIE_NAME, SIGN_IN_ROUTE } from '@/constants';
import { routing } from '@/i18n/routing';

const protectedRoutes = [DASHBOARD_ROUTE];

const i18nMiddleware = createMiddleware(routing);

/**
 * TODO:
 * @see https://www.reddit.com/r/Firebase/comments/y4hts8/nextjs_middleware/
 */
export default function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE_NAME)?.value ?? '';

  // Redirect to login if session is not set
  if (!session && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL(SIGN_IN_ROUTE, request.nextUrl.origin);

    return NextResponse.redirect(absoluteURL.toString());
  }

  // Redirect to dashboard if session is set and user tries to access root
  if (session && request.nextUrl.pathname === SIGN_IN_ROUTE) {
    const absoluteURL = new URL(DASHBOARD_ROUTE, request.nextUrl.origin);

    return NextResponse.redirect(absoluteURL.toString());
  }

  return i18nMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|es|ru)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
