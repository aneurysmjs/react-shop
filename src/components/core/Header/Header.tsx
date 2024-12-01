'use client';
import type { FC } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { usePathname } from 'next/navigation';

import { ABOUT_ROUTE } from '@/constants';
import UserMenu from '@/components/core/Header/UserMenu';

interface Navigation {
  href: string;
  i18nPath: string;
}

const Logo = () => {
  return (
    <Link href="/" className="flex-shrink-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
        />
      </svg>
    </Link>
  );
};

interface NavLinksProps {
  navigation: Navigation[];
  pathname: string;
}

const NavLinks: FC<NavLinksProps> = ({ navigation, pathname }) => {
  const t = useTranslations('components.core.header.links');

  return (
    <div
      className={`
        hidden

        sm:ml-6 sm:block
      `}
    >
      <div className="flex space-x-4">
        {navigation.map((item) => (
          <Link
            key={item.i18nPath}
            href={item.href}
            className={clsx(
              'rounded-md px-3 py-2 text-sm font-medium',
              pathname === item.href
                ? `
                  bg-neutral-200

                  dark:bg-neutral-800
                `
                : `
                  dark:hover:bg-neutral-800

                  hover:bg-neutral-200
                `,
            )}
            aria-current={pathname === item.href ? 'page' : undefined}
          >
            {t(item.i18nPath)}
          </Link>
        ))}
      </div>
    </div>
  );
};

const Header: FC = () => {
  const pathname = usePathname();

  const navigation = [{ href: ABOUT_ROUTE, i18nPath: 'about' }];

  return (
    <header
      className={`
        sticky top-0 w-full border-b border-neutral-200

        dark:border-neutral-700
      `}
    >
      <div
        className={`
          mx-auto px-4

          lg:px-8

          sm:px-6
        `}
      >
        <div className="relative flex h-16 items-center justify-between">
          <div
            className={`
              flex flex-1 items-center justify-center

              sm:justify-start
            `}
          >
            <Logo />
            <NavLinks navigation={navigation} pathname={pathname} />
          </div>
          <div
            className={`
              absolute inset-y-0 right-0 flex items-center pr-2

              sm:static sm:inset-auto sm:ml-6 sm:pr-0
            `}
          >
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
