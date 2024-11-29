'use client';
import type { FC } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';

import { ABOUT_ROUTE } from '@/constants';
import UserMenu from '@/components/core/Header/UserMenu';

interface Navigation {
  href: string;
  i18nPath: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MobileMenuButton = () => {
  return (
    <DisclosureButton
      className={`
        group relative inline-flex items-center justify-center rounded-md p-2
        text-gray-400

        focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white

        hover:bg-gray-700 hover:text-white
      `}
    >
      <span className="absolute -inset-0.5" />
      <span className="sr-only">Open main menu</span>
      <Bars3Icon
        aria-hidden="true"
        className={`
          block h-6 w-6

          group-data-[open]:hidden
        `}
      />
      <XMarkIcon
        aria-hidden="true"
        className={`
          hidden h-6 w-6

          group-data-[open]:block
        `}
      />
    </DisclosureButton>
  );
};

const Logo = () => {
  return (
    <Link href="/" className="flex-shrink-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
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
                  bg-neutral-200 text-theme

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
interface MobileNavLinksProps {
  navigation: Navigation[];
  pathname: string;
}

const MobileNavLinks: FC<MobileNavLinksProps> = ({ navigation, pathname }) => {
  const t = useTranslations('components.core.header.links');

  return (
    <div className="space-y-1 px-2 pb-3 pt-2">
      {navigation.map((item) => (
        <DisclosureButton
          key={item.i18nPath}
          as={Link}
          href={item.href}
          className={clsx(
            'block rounded-md px-3 py-2 text-base font-medium',
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
        </DisclosureButton>
      ))}
    </div>
  );
};

const Header: FC = () => {
  const pathname = usePathname();

  const navigation = [{ href: ABOUT_ROUTE, i18nPath: 'about' }];

  return (
    <Disclosure
      as="nav"
      className={`
        fixed top-0 w-full border-b border-neutral-200 bg-theme-primary

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
          {/* <MobileMenuButton /> */}
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

      <DisclosurePanel className="sm:hidden">
        <MobileNavLinks navigation={navigation} pathname={pathname} />
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Header;
