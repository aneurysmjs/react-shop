/* eslint-disable @typescript-eslint/require-await */
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { DASHBOARD_ROUTE, ROOT_ROUTE, SESSION_COOKIE_NAME } from '@/constants';

const ONE_DAY = 60 * 60 * 24; // One day

export async function createSession(uid: string) {
  cookies().set(SESSION_COOKIE_NAME as string, uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: ONE_DAY, // One day
    path: ROOT_ROUTE,
    /**
     * Cookie “SESSION_COOKIE_NAME” does not have a proper “SameSite” attribute value. Soon,
     * cookies without the “SameSite” attribute or with an invalid value will be treated as “Lax”.
     * This means that the cookie will no longer be sent in third-party contexts.
     * If your application depends on this cookie being available in such contexts,
     * please add the “SameSite=None“ attribute to it. To know more about the “SameSite“ attribute,
     * read https://developer.mozilla.org/docs/Web/HTTP/Headers/Set-Cookie/SameSite
     */
    sameSite: 'lax' as const,
  });

  redirect(DASHBOARD_ROUTE as string);
}

export async function removeSession() {
  cookies().delete(SESSION_COOKIE_NAME as string);

  redirect(ROOT_ROUTE as string);
}
